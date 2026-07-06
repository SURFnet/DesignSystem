#!/usr/bin/env bash
set -euo pipefail

# Publishes this run's a11y violation screenshots to a dedicated orphan
# branch, so each one gets a stable raw.githubusercontent.com URL that the
# sticky PR comment (scripts/a11y-comment.ts) can embed inline. A PR's
# screenshots fully replace its previous run's — no history is kept, so the
# branch never grows unbounded.
#
# Requires: PR_NUMBER env var, and `contents: write` on the job's
# GITHUB_TOKEN (actions/checkout already persists it for `git push`).

BRANCH="a11y-screenshots"
PR_NUMBER="${PR_NUMBER:?PR_NUMBER env var required}"
TARGET_DIR="pr-${PR_NUMBER}"

shopt -s nullglob
FILES=(packages/*/.a11y-report/screenshots/*.png)
if [ ${#FILES[@]} -eq 0 ]; then
  echo "No a11y screenshots to publish."
  exit 0
fi

WORKTREE="$(mktemp -d "${TMPDIR:-/tmp}/a11y-screenshots.XXXXXX")"
trap 'git worktree remove --force "$WORKTREE" 2>/dev/null || rm -rf "$WORKTREE"' EXIT

git fetch origin "refs/heads/$BRANCH:refs/remotes/origin/$BRANCH" 2>/dev/null || true
if git show-ref --verify --quiet "refs/remotes/origin/$BRANCH"; then
  git worktree add --quiet "$WORKTREE" "$BRANCH"
else
  git worktree add --quiet --detach "$WORKTREE" HEAD
  git -C "$WORKTREE" checkout --orphan "$BRANCH"
  git -C "$WORKTREE" rm -rf . >/dev/null
fi

rm -rf "${WORKTREE:?}/${TARGET_DIR}"
for f in "${FILES[@]}"; do
  # packages/react/.a11y-report/screenshots/foo.png -> pr-123/react/foo.png
  pkg=$(echo "$f" | cut -d/ -f2)
  mkdir -p "$WORKTREE/$TARGET_DIR/$pkg"
  cp "$f" "$WORKTREE/$TARGET_DIR/$pkg/"
done

git -C "$WORKTREE" config user.name "github-actions[bot]"
git -C "$WORKTREE" config user.email "github-actions[bot]@users.noreply.github.com"
git -C "$WORKTREE" add "$TARGET_DIR"
if git -C "$WORKTREE" diff --cached --quiet; then
  echo "No screenshot changes for PR #$PR_NUMBER."
else
  git -C "$WORKTREE" commit --quiet -m "a11y screenshots for PR #$PR_NUMBER"
  git -C "$WORKTREE" push origin "HEAD:$BRANCH"
fi
