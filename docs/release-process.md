# Release process

Don’t run `pnpm changeset`.
Make a new branch from `main` (don’t commit on `main`).
Commit your changes.
Push the branch and open a PR.
Wait for CI to go green, then merge to `main`.
Open **Actions → Release** and confirm the new run.
If this run only opens or updates `chore: version packages`, merge that PR next.
Watch the Release run after that merge — that one should publish.
Confirm on npm that `@surfnet/curve-react` and `@surfnet/curve-angular` exist at the new version.
