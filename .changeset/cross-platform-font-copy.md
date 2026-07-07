---
'@surfnet/curve-angular': patch
---

Replaced the `rm -rf` / `cp -RL` shell commands in `build:css` with a cross-platform Node script, so the package builds correctly on Windows (previously required a POSIX shell).
