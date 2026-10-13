# Changelog

## 0.98 (13/10/2026)

- Archive host table is data plus a user override field (Settings → Routing → Board Host Overrides, `board=host` pairs, `board=default` undoes a built-in). Every place that assumed archived.moe now reads the table.
- Saved-thread dropdown fills "Thread #N" placeholders with the real OP title from the archive's JSON API (`/_/api/chan/thread/`), a few per open, once per page load.
- `@match` now also covers desuarchive.org and archive.4plebs.org. Untested there beyond the shared FoolFuuka markup; the override field is how you route boards to them.
- `@connect` lists the archive hosts and their known media CDNs ahead of the `*` fallback, so those requests no longer prompt. The fallback stays because each archive's media host could not be verified from the audit environment.
- Setting text for "View Original" now says what it does (links the hosting archive, not 4chan).

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
