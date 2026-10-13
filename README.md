# 4chan Archives Enhancer

Enhancements for FoolFuuka-based 4chan archives: archived.moe, thebarchive.com, archiveofsins.com, desuarchive.org and archive.4plebs.org.

**Version:** 0.98
**License:** MIT

---

## Features

### Image Viewing
- **Image Expansion** — Click any thumbnail to expand it inline. Click again to collapse.
- **Image Hover Zoom** — Hover over a thumbnail to see the full-size image in a floating preview.
- **Fullscreen Gallery** — Double-click any image or press `G` to open a fullscreen gallery with thumbnail sidebar, keyboard navigation, slideshow mode, and trackpad swipe gestures.

### Quoting & Threading
- **Quote Preview** — Hover over any >>quote link to see the quoted post in a floating preview.
- **Quote Backlinks** — Adds >>reply links on posts that have been quoted.
- **Quote Threading** — Nests reply posts underneath the post they quote. Fold controls per post.

### MD5 Image Tracking
- **MD5 Dropdown Menu** — Every image gets a dropdown with View Same, Copy MD5, and Track/Untrack.
- **MD5 Highlighting** — Posts with tracked MD5 hashes are visually highlighted.
- **MD5 Filter Mode** — Press `M` to hide all posts except those with tracked images (and posts that quote them).
- **MD5 Manager** — Bulk import/export, clear, and manage tracked hashes from settings.

### Content Modes
- **Image-Only Mode** — Press `F` to hide all non-image posts.

### Thread Management
- **Saved Threads** — Bookmark threads via the heart icon. Cross-archive-aware links.
- **Auto Title Update** — Saved thread titles update when you visit them.
- **Bulk Import/Export** — Import threads by URL, board/number shorthand, or 4chan links. Export as text file.
- **Thread Promotion** — Saved and MD5-tracked threads are promoted on index/search pages.

### Cross-Archive Routing
- **Automatic Redirect** — Links to boards hosted on other archives are automatically redirected.
- **View on Original Board** — Posts on archived.moe for cross-hosted boards get a link to the original archive.
- **Board Mapping (built in):**
  - `/b/` → thebarchive.com
  - `/h/`, `/hc/`, `/hm/`, `/i/`, `/lgbt/`, `/r/`, `/s/`, `/soc/`, `/t/`, `/u/` → archiveofsins.com
  - Everything else → archived.moe
- **Board Host Overrides** — Settings → Routing. `board=host` pairs, comma-separated, extend or undo the built-in map (e.g. `a=desuarchive.org, pol=archive.4plebs.org, b=default`). Board nav, saved threads, redirects and bulk import all follow the merged table.
- **Saved thread titles from the API** — Threads added by URL or bulk import start as "Thread #N"; the saved-threads dropdown fills in the real OP title from the archive's JSON API.

### Navigation & UI
- **Custom Board Nav** — Configurable board list with cross-archive links.
- **Floating Panel** — Download button, collapse/expand controls, scroll arrows.
- **Header Bar** — Settings, saved threads, and save/unsave toggle. Pin/unpin to auto-hide on scroll.
- **Keyboard Shortcuts** — All configurable: `O` settings, `G` gallery, `F` image-only mode, `M` MD5 filter, arrow keys gallery nav, `Esc` close.

### Display Options
- Text size, thumbnail sizes (index and thread), gallery fit options.

### Data Management
- **Export/Import All** — Settings, tracked MD5s, and saved threads in one JSON file.

---

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Userscripts](https://github.com/quoid/Userscripts)
2. Open the raw script and your manager will offer to install it: [4ArchivesEnhancer.user.js](https://raw.githubusercontent.com/amerruki/4Chan-Archives-Enhancer/main/4ArchivesEnhancer.user.js)
3. Navigate to any supported archive site

Installed this way, the script updates itself: the header carries `@updateURL` and `@downloadURL` pointing at this repository, so each release lands without re-pasting. Pasting the file contents by hand still works but will not auto-update.

## Settings

Click the gear icon in the top-right header bar, or press `O` to open the settings panel.
