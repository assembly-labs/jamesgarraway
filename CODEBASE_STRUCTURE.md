# Codebase Structure & Dependencies

## Directory Structure

```
jamesgarraway/
├── index.html                 # Main gallery page
├── day/
│   ├── index.html            # Daily routine dashboard
│   └── quotes.json           # Quote database
├── magic8ball/
│   └── index.html            # Magic 8 ball interactive
├── images/                    # Image assets
├── styles/                    # External CSS files
│   ├── gallery.css           # Styles for main gallery page
│   ├── magic8ball.css        # Styles for magic 8 ball page
│   ├── routine.css           # Styles for daily routine page
│   └── themes.css            # Theme system styles (Sith, Boba Fett, etc.)
└── js/                        # External JavaScript files
    ├── gallery.js            # Gallery slideshow logic
    ├── magic8ball.js         # Magic 8 ball interaction logic
    ├── themes.js             # Theme management & visual effects
    ├── checklist.js          # Checklist data & rendering
    └── routine.js            # Daily routine coordination
```

## Page Dependencies

### index.html (Gallery)
**CSS:**
- `styles/gallery.css`

**JS:**
- `js/gallery.js`

**No External Dependencies**

---

### day/index.html (Daily Routine)
**CSS:**
- `../styles/themes.css`
- `../styles/routine.css`

**JS (LOAD ORDER CRITICAL):**
1. `../js/themes.js` - Must load FIRST
   - Exports: `teamColors`, `teamNames`, `setThemeVars()`, `applySith()`, `startBlasters()`, `stopBlasters()`
2. `../js/checklist.js` - Must load SECOND
   - Exports: `STORAGE_KEYS`, `morningChecklist`, `screenChecklist`, `renderChecklist()`, `toggleMorning()`, `toggleScreen()`
3. `../js/routine.js` - Must load LAST
   - Depends on: themes.js + checklist.js

**Data:**
- `./quotes.json` (fetched at runtime)

---

### magic8ball/index.html (Magic 8 Ball)
**CSS:**
- `../styles/magic8ball.css`

**JS:**
- `../js/magic8ball.js`

**No External Dependencies**

---

## JavaScript Module Dependencies

### themes.js
**Exports:**
- `teamColors` (object) - Color schemes for all themes
- `teamNames` (array) - List of available theme names
- `setThemeVars(team)` - Apply theme CSS variables
- `applySith(enable)` - Toggle Sith glow effect
- `sithState` (object) - Sith animation state
- `blaster` (object) - Boba Fett blaster effect system
- `startBlasters()` - Start Boba Fett effects
- `stopBlasters()` - Stop Boba Fett effects

**Dependencies:** None

---

### checklist.js
**Exports:**
- `STORAGE_KEYS` (object) - localStorage key constants
- `defaultMorning` (array) - Default morning checklist items
- `defaultScreen` (array) - Default screen time checklist items
- `morningChecklist` (array) - Current morning checklist state
- `screenChecklist` (array) - Current screen time checklist state
- `renderChecklist(container, list, onToggle)` - Render checklist UI
- `toggleMorning(id)` - Toggle morning checklist item
- `toggleScreen(id)` - Toggle screen time checklist item

**Dependencies:** None

---

### routine.js
**Exports:**
- `$()` - jQuery-style DOM selector helper
- `currentTeam` - Currently selected theme
- `setTeam(team)` - Change active theme
- `updateClock()` - Update time/date display
- `loadQuote()` - Fetch and display quote
- `setQuote(q)` - Set quote display

**Dependencies:**
- `themes.js` → Uses: `teamColors`, `teamNames`, `setThemeVars()`, `applySith()`, `startBlasters()`, `stopBlasters()`
- `checklist.js` → Uses: `STORAGE_KEYS`, `morningChecklist`, `screenChecklist`, `renderChecklist()`, `toggleMorning()`, `toggleScreen()`

---

### gallery.js
**Exports:** None (self-contained)

**Internal Functions:**
- `createDots()` - Generate navigation dots
- `updateDots()` - Update active dot state
- `animateProgress()` - Progress ring animation
- `triggerConfetti()` - Spawn confetti particles
- `showSlide(index)` - Show specific slide
- `nextSlide()` - Advance to next slide
- `prevSlide()` - Go to previous slide
- `startAutoPlay()` - Start automatic slideshow
- `stopAutoPlay()` - Stop automatic slideshow

**Dependencies:** None

---

### magic8ball.js
**Exports:** None (self-contained)

**Internal Functions:**
- `getRandomResponse()` - Get random answer
- `createRipple(x, y)` - Visual ripple effect
- `shakeAndRespond(event)` - Main interaction handler

**Dependencies:** None

---

## Storage Keys

All localStorage keys are defined in `checklist.js` under `STORAGE_KEYS`:

```javascript
{
  team: 'aolkids.currentTeam',
  morning: 'aolkids.morningChecklist',
  screen: 'aolkids.screenTimeChecklist',
  quote: 'aolkids.lastQuote'
}
```

---

## Theme System

Available themes (defined in `themes.js`):
- Philadelphia Eagles
- Green Bay Packers
- Baltimore Ravens
- Pittsburgh Steelers
- Philadelphia Union
- **Sith** (red glow effects)
- **Boba Fett** (blaster beam effects)

Each theme defines:
- `primary` - Primary color
- `secondary` - Secondary color
- `accent` - Accent color
- `background` - Background color
- `cardBg` - Card background color
- `text` - Text color

---

## Critical Load Order (day/index.html)

⚠️ **IMPORTANT:** Scripts must load in this exact order:

```html
<script src="../js/themes.js"></script>     <!-- 1. FIRST -->
<script src="../js/checklist.js"></script>  <!-- 2. SECOND -->
<script src="../js/routine.js"></script>    <!-- 3. LAST -->
```

Changing this order will cause `ReferenceError` exceptions because `routine.js` depends on variables exported by both `themes.js` and `checklist.js`.

---

## File Paths

### Relative Path Strategy:
- **Root pages** (e.g., `index.html`): Use `./` or no prefix
  - `styles/gallery.css`
  - `js/gallery.js`
  - `images/IMG_4662.jpeg`

- **Subdirectory pages** (e.g., `day/index.html`, `magic8ball/index.html`): Use `../` to go up one level
  - `../styles/routine.css`
  - `../js/routine.js`

- **Data files in same directory**: Use `./`
  - `./quotes.json` (from day/index.html)

---

## Future Development Guidelines

1. **Adding New Themes:**
   - Edit `teamColors` object in `themes.js`
   - Theme will automatically appear in dropdown

2. **Adding New Checklist Items:**
   - Edit `defaultMorning` or `defaultScreen` arrays in `checklist.js`
   - Users can clear their localStorage to get new defaults

3. **Adding New Pages:**
   - Create HTML file
   - Create dedicated CSS file in `/styles/`
   - Create dedicated JS file in `/js/` (if needed)
   - Use relative paths: `../styles/` and `../js/`

4. **Modifying Shared Code:**
   - Theme effects: Edit `themes.js`
   - Checklist logic: Edit `checklist.js`
   - Be careful: changes affect all pages using these modules

5. **Testing Changes:**
   - Test all three pages after changes
   - Clear localStorage to test fresh state
   - Test theme switching on routine page
   - Verify paths work from different directories

---

## Known Limitations

1. **Script Load Order:** routine.js depends on other scripts being loaded first
2. **Global Scope:** All variables are in global scope (no ES modules)
3. **No Bundler:** Files must be loaded separately (no tree-shaking)
4. **Relative Paths:** Different path prefixes needed based on file location

---

## Troubleshooting

### "ReferenceError: teamColors is not defined"
- Check script load order in HTML
- Ensure `themes.js` loads before `routine.js`

### "ReferenceError: STORAGE_KEYS is not defined"
- Check script load order in HTML
- Ensure `checklist.js` loads before `routine.js`

### "Failed to fetch ./quotes.json"
- Verify quotes.json exists in `/day/` directory
- Check network tab for 404 errors

### Styles not applying
- Check CSS file path (use `../styles/` from subdirectories)
- Verify CSS file exists
- Check browser console for 404 errors

### Theme not switching
- Check that page includes `themes.js` and `routine.js`
- Verify `teamSelect` element exists with id="teamSelect"
- Check browser console for JavaScript errors

---

**Last Updated:** October 23, 2024
