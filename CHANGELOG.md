# Changelog

## 0.97 (13/10/2026)

- Header: `@updateURL`, `@downloadURL`, `@homepageURL`, `@supportURL`. Installs from the raw file now auto-update.
- Keyboard shortcuts ignore Cmd/Ctrl/Alt chords. Cmd+F, Cmd+O and Cmd+G reach the browser again. Shortcuts also stay inert in `<select>` and contenteditable fields.
- Hiding the top bar no longer leaves 34px of blank space at the top. Re-enabling it from settings correctly asks for a reload.
- Hover zoom: a slow image response can no longer land in a newer hover preview, and moving between an image and its link no longer flickers or orphans preview elements.
- MD5 hashes are normalised to FoolFuuka's URL-safe form on read, track, import and once on load. The same image read from `data-md5` (raw base64) and from a View Same link (URL-safe) now matches.
- "View Same (All Boards)" searches the archive you are on. archived.moe is offered as a second entry on the other hosts. The MD5 manager's search icon follows the same rule.
- Batch download reports progress on the button, logs failures, and stops with an explanation on a hard error (download whitelist, permissions) instead of failing silently.

## 0.96 (02/05/2026)

- Bug fixes (see git history).
