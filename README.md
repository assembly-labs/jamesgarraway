# James' GOATED Homepage

A personal dashboard website featuring:
- 🏆 **Champions Gallery** - Slideshow of championship photos with confetti
- 📅 **Daily Routine** - Morning checklists, screen time tracker, quotes, and music
- 🎱 **Magic 8 Ball** - Interactive fortune teller

## Quick Start

1. **View Locally:**
   - Open `index.html` in a web browser
   - Navigate to `/day/` for the daily routine page
   - Navigate to `/magic8ball/` for the Magic 8 Ball

2. **Deploy:**
   - Upload entire directory to web host
   - All paths are relative, so it works from any location

## File Structure

```
├── index.html              # Main gallery page
├── day/
│   ├── index.html         # Daily routine dashboard
│   └── quotes.json        # Motivational quotes database
├── magic8ball/
│   └── index.html         # Magic 8 Ball page
├── images/                # Image assets
├── styles/                # CSS files (external)
│   ├── gallery.css
│   ├── routine.css
│   ├── themes.css
│   └── magic8ball.css
└── js/                    # JavaScript files (external)
    ├── gallery.js
    ├── routine.js
    ├── checklist.js
    ├── themes.js
    └── magic8ball.js
```

## Features

### Gallery (index.html)
- Auto-advancing slideshow
- Confetti animations
- Keyboard navigation (arrows, spacebar)
- Touch/swipe support
- Progress indicators

### Daily Routine (day/index.html)
- **Themes:** Choose from 7 themes (Eagles, Packers, Ravens, Steelers, Union, Sith, Boba Fett)
- **Special Effects:** Sith theme has red glow, Boba Fett has blaster beams
- **Morning Checklist:** Track daily tasks
- **Screen Time Tracker:** Earn screen time by completing tasks
- **Quote of the Day:** Motivational quotes with explanations
- **Music Players:** Spotify playlists (Rock Out & Lofi Focus)
- **Time & Date:** Live clock display

### Magic 8 Ball (magic8ball/index.html)
- Realistic 3D-styled ball
- Tap/click to get answers
- Animated liquid and bubbles
- Mobile-optimized

## Customization

### Adding Quotes
Edit `day/quotes.json`:
```json
{
  "author": "Quote Author",
  "quote": "The quote text",
  "explanation": "What it means in kid-friendly language"
}
```

### Adding Themes
Edit `js/themes.js` and add to the `teamColors` object:
```javascript
'New Theme': {
  primary: '#000000',
  secondary: '#FFFFFF',
  accent: '#FF0000',
  background: '#111111',
  cardBg: '#222222',
  text: '#EEEEEE'
}
```

### Modifying Checklists
Edit default items in `js/checklist.js`:
- `defaultMorning` - Morning routine tasks
- `defaultScreen` - Screen time earning tasks

## Technical Details

- **No Build Process:** Pure HTML/CSS/JS, no compilation needed
- **No Dependencies:** No external libraries (vanilla JavaScript)
- **Responsive:** Works on mobile, tablet, and desktop
- **Persistent Storage:** Uses localStorage for settings and progress
- **Modern CSS:** Uses CSS variables, color-mix, clamp, and grid

## Browser Compatibility

- Chrome/Edge (modern versions)
- Firefox (modern versions)
- Safari (modern versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Requirements:**
- JavaScript enabled
- localStorage enabled
- Modern CSS support (CSS variables, grid, color-mix)

## Development

### Making Changes

1. **CSS Changes:** Edit files in `/styles/`
2. **JavaScript Changes:** Edit files in `/js/`
3. **HTML Changes:** Edit respective `.html` files
4. **Always test all three pages** after making changes

### Important Notes

⚠️ **Script load order is critical** for `day/index.html`:
```html
<script src="../js/themes.js"></script>     <!-- MUST be first -->
<script src="../js/checklist.js"></script>  <!-- MUST be second -->
<script src="../js/routine.js"></script>    <!-- MUST be last -->
```

See `CODEBASE_STRUCTURE.md` for complete documentation.

## License

Personal project - All rights reserved.

---

**Last Updated:** October 2024
