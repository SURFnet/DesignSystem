---
'@surfnet/curve-angular': patch
'@surfnet/curve-react': patch
---

Fix --font-sans resolving to no font at all (Figma syncs strip the self-hosted font name Figma doesn't know about); pnpm sync:figma now aliases "Source Sans 3" to the shipped "Source Sans 3 Variable" automatically.
