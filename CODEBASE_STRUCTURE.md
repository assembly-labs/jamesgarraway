# Codebase Structure & Dependencies

## Directory Structure

```
jamesgarraway/
├── index.html                  # Root — Champion Routine dashboard (main page)
├── verify.html                 # Passcode entry screen (no auth guard — IS the auth page)
├── routine/
│   ├── index.html             # /routine/ — full-page morning/night checklist
│   └── routine.js             # Routine-specific JS
├── schedule/
│   ├── index.html             # /schedule/ — weekly activity + homework calendar
│   ├── schedule.js            # Schedule logic (fetches data.json)
│   ├── schedule.css           # Schedule-specific styles
│   └── data.json              # Event data — edit this to add/update events
├── weather/
│   ├── index.html             # /weather/ — current conditions + 5-day forecast
│   └── weather.js             # Weather logic (Open-Meteo API, no key required)
├── photos/
│   └── index.html             # /photos/ — slideshow (fetches images/manifest.json)
│   (images/ gitignored)
├── flagfootball/
│   └── index.html             # /flagfootball/ — drill tracker + video library
├── math-teacher/
│   └── index.html             # /math-teacher/ — Football Fractions standalone app
│   (has own internal nav, styles, and JS — self-contained)
├── game-22/
│   └── index.html             # /game-22/ — Super 16 trivia game
│   (fully standalone — own style.css, sounds.js, game.js, etc.)
├── minecraft/
│   └── index.html             # /minecraft/ — Minecoins tracker
├── js/                         # Shared JavaScript
│   ├── auth-guard.js          # Auth redirect — REQUIRED on every page except verify.html
│   ├── navigation.js          # Sticky nav, hamburger, active-page detection
│   ├── themes.js              # Theme system (Eagles, Packers, Ravens, Steelers, Union, Sith, Boba Fett)
│   ├── checklist.js           # Checklist data + rendering
│   ├── routine.js             # Root dashboard logic (clock, quote, word of day, checklists)
│   ├── celebrations.js        # Celebration effects (uses confetti-cannon)
│   ├── confetti-cannon.js     # Confetti particle system
│   ├── gallery.js             # (legacy) — gallery logic, not currently used by /photos/
│   └── verify.js              # Passcode logic for verify.html
├── styles/                     # Shared CSS
│   ├── themes.css             # CSS custom properties + theme vars (--primary, --accent, etc.)
│   ├── routine.css            # Widget/card/grid layout used across most pages
│   ├── navigation.css         # Sticky nav styles
│   ├── gallery.css            # Slideshow/photos styles
│   └── verify.css             # Passcode screen styles
├── images/                     # Root-level images (gitignored if sensitive)
├── public/                     # Static assets
├── robots.txt                  # Blocks all crawlers
├── CNAME                       # jamesgarraway.com
└── BOT_BLOCKING.md             # Notes on bot blocking config
```

## Auth Guard Rule

**Every page except `verify.html` must include this as the first script after the nav:**

```html
<script src="/js/auth-guard.js?v=1763735221&bust=v5"></script>
```

Pages without it are publicly accessible. As of the last audit (Apr 2026), all pages are protected.

## Nav Pattern

Every page uses this sticky nav structure:

```html
<nav class="sticky-nav" id="stickyNav">
  <div class="nav-container">
    <button class="nav-hamburger" id="navHamburger" aria-label="Menu">&#9776;</button>
    <div class="nav-brand" id="navBrand">PAGE TITLE</div>
    <ul class="nav-menu" id="navMenu">
      <li><a href="/"             class="nav-link" data-page="champion">CHAMPION ROUTINE</a></li>
      <li><a href="/flagfootball/" class="nav-link" data-page="flagfootball">TRYOUT TRAINING</a></li>
      <li><a href="/math-teacher/" class="nav-link" data-page="math">MATH</a></li>
      <li><a href="/game-22/"     class="nav-link" data-page="super16">SUPER 16</a></li>
      <li><a href="/photos/"      class="nav-link" data-page="photos">PHOTOS</a></li>
      <li><a href="/weather/"     class="nav-link" data-page="weather">WEATHER</a></li>
      <li><a href="/schedule/"    class="nav-link" data-page="schedule">SCHEDULE</a></li>
    </ul>
  </div>
</nav>
<div class="nav-overlay" id="navOverlay"></div>
```

**Rules:**
- All `href` values use absolute paths (`/path/`) — never relative (`../path/`)
- `data-page` value must match a case in `navigation.js > setActivePage()`
- `navigation.js` must be the last script loaded on any page that uses the shared nav
- Do NOT hardcode `class="nav-link active"` — navigation.js sets this automatically

## Asset Version String

All `<link>` and `<script>` tags use this cache-busting string:

```
?v=1763735221&bust=v5
```

Apply to every CSS and JS include. Example:
```html
<link rel="stylesheet" href="/styles/themes.css?v=1763735221&bust=v5">
<script src="/js/themes.js?v=1763735221&bust=v5"></script>
```

## Script Load Order (root index.html and routine/)

Order is critical — routine.js depends on the others:

```html
<script src="/js/themes.js?v=1763735221&bust=v5"></script>         <!-- 1. FIRST -->
<script src="/js/confetti-cannon.js?v=1763735221&bust=v5"></script><!-- 2. -->
<script src="/js/celebrations.js?v=1763735221&bust=v5"></script>   <!-- 3. -->
<script src="/js/checklist.js?v=1763735221&bust=v5"></script>      <!-- 4. -->
<script src="/js/routine.js?v=1763735221&bust=v5"></script>        <!-- 5. LAST before nav -->
<script src="/js/navigation.js?v=1763735221&bust=v5"></script>     <!-- 6. Always last -->
```

## Page Dependencies

### index.html (Champion Routine dashboard)
- CSS: `themes.css`, `routine.css`, `navigation.css`
- JS (in order): `themes.js`, `confetti-cannon.js`, `celebrations.js`, `checklist.js`, `routine.js`, `navigation.js`
- Auth guard: yes

### routine/index.html
- CSS: `/styles/themes.css`, `/styles/routine.css`, `/styles/navigation.css`
- JS: `/js/themes.js`, `/js/confetti-cannon.js`, `/js/celebrations.js`, `/routine/routine.js`, `/js/navigation.js`
- Auth guard: yes

### schedule/index.html
- CSS: `themes.css`, `routine.css`, `navigation.css`, `/schedule/schedule.css`
- JS: `/schedule/schedule.js`, `navigation.js`
- Data: `/schedule/data.json` (fetched at runtime)
- Auth guard: yes

### weather/index.html
- CSS: `themes.css`, `routine.css`, `navigation.css` + inline `<style>` block
- JS: `/weather/weather.js`, `navigation.js`
- External API: Open-Meteo (no key required)
- Auth guard: yes

### photos/index.html
- CSS: `/styles/navigation.css`, `/styles/gallery.css`
- JS: inline (slideshow logic), `navigation.js`
- Data: `images/manifest.json` (gitignored, generated locally)
- Auth guard: yes

### flagfootball/index.html
- CSS: `/styles/navigation.css` + inline `<style>` block
- JS: inline (drill tracker), `navigation.js`
- Auth guard: yes

### minecraft/index.html
- CSS: `../styles/navigation.css` + inline styles
- JS: inline, `navigation.js`
- Auth guard: yes

### math-teacher/index.html
- Standalone app with its own internal nav, CSS files, and JS
- Auth guard: yes (added Apr 2026)
- Does NOT use shared themes.css, routine.css, or navigation.js

### game-22/index.html
- Standalone trivia game with own style.css, sounds.js, tapping.js, minigames.js, questions.js, game.js
- Auth guard: yes (added Apr 2026)
- No shared nav

## Theme System

Available themes (defined in `js/themes.js`):
- Philadelphia Eagles, Green Bay Packers, Baltimore Ravens, Pittsburgh Steelers, Philadelphia Union
- **Sith** (red glow effects)
- **Boba Fett** (blaster beam effects)

CSS custom properties set per theme: `--primary`, `--secondary`, `--accent`, `--background`, `--cardBg`, `--text`

## localStorage Keys

All defined in `js/checklist.js` under `STORAGE_KEYS`:

```javascript
{
  team:    'aolkids.currentTeam',
  morning: 'aolkids.morningChecklist',
  screen:  'aolkids.screenTimeChecklist',
  quote:   'aolkids.lastQuote'
}
```

## Adding a New Page

1. Create `/<page-name>/index.html`
2. Add auth guard as first script after nav overlay
3. Include shared CSS: `themes.css`, `routine.css`, `navigation.css`
4. Copy full nav HTML from pattern above; update `nav-brand` text
5. Load `navigation.js` last
6. Add a case to `js/navigation.js > setActivePage()` for the new path
7. Add nav link to every other page's nav (all 7 + root index.html)

## Security

- **Cloudflare Access** (One-Time PIN) is the real gate for the entire domain
- **JS passcode** (`verify.html`) is a second fun layer — not the primary security
- `auth-guard.js` on every page is the JS enforcement layer
- `robots.txt` blocks all crawlers
- `noindex` meta on every page
- Photos and manifest.json are gitignored — never committed

## Known Standalone Pages

`math-teacher/` and `game-22/` pre-date the shared nav system and have their own complete UI.
Auth guard was added to both in Apr 2026 but their internal nav was not changed.

---

**Last Updated:** April 2026
