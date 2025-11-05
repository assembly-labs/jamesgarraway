// ========================================
// DEPENDENCIES:
// - themes.js (teamColors, teamNames, setThemeVars, applySith, startBlasters, stopBlasters)
// - checklist.js (STORAGE_KEYS, morningChecklist, homeChecklist, screenChecklist, renderChecklist, toggleMorning, toggleHome, toggleScreen)
// ========================================

// ======= DOM Helper =======
const $ = s => document.querySelector(s);

// ======= Current Team State =======
let currentTeam = localStorage.getItem(STORAGE_KEYS.team);
if (!currentTeam || !teamColors[currentTeam]) currentTeam = 'Philadelphia Eagles';

// ======= Team Select & Toggle =======
const teamSelect = $('#teamSelect');
teamNames.forEach(n => {
  const opt = document.createElement('option');
  opt.value = n;
  opt.textContent = n;
  teamSelect.appendChild(opt);
});
teamSelect.value = currentTeam;

const setTeam = (team) => {
  currentTeam = teamColors[team] ? team : 'Philadelphia Eagles';
  localStorage.setItem(STORAGE_KEYS.team, currentTeam);
  setThemeVars(currentTeam);
  // Sith effect
  applySith(currentTeam === 'Sith');
  // Boba blasters
  if (currentTeam === 'Boba Fett') startBlasters();
  else stopBlasters();
};

teamSelect.addEventListener('change', (e) => setTeam(e.target.value));

// ======= Time & Date =======
const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const updateClock = () => {
  const now = new Date();
  const month = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  const dayName = daysOfWeek[now.getDay()];

  // Update header with date only (no time)
  $('#headerDateTime').textContent = `${dayName}, ${month} ${day}, ${year}`;

  // Don't update screen allowance text here - it's managed by treasure chest system
  // The treasure chest handles its own text based on locked/unlocked state
};

// ======= Quotes (from ./quotes.json) =======
const setQuote = (q) => {
  $('#quoteText').textContent = `"${q.text}"`;
  $('#quoteAuthor').textContent = q.author ? `— ${q.author}` : '—';
  const explWrap = $('#quoteExplWrap');
  if (q.explanation) {
    $('#quoteExplanation').textContent = ' ' + q.explanation;
    explWrap.style.display = 'block';
  } else {
    explWrap.style.display = 'none';
  }
  try { localStorage.setItem(STORAGE_KEYS.quote, JSON.stringify(q)); } catch {}
};

const loadQuote = async () => {
  try {
    const last = JSON.parse(localStorage.getItem(STORAGE_KEYS.quote) || 'null');
    if (last && last.text) setQuote(last);
  } catch {}
  try {
    const res = await fetch('./quotes.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('quotes.json not found');
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      // Shuffle bag system: track used quotes to prevent repeats
      let usedIndices = JSON.parse(localStorage.getItem(STORAGE_KEYS.usedQuotes) || '[]');

      // If all quotes have been used, reset the bag
      if (usedIndices.length >= data.length) {
        usedIndices = [];
      }

      // Get available quote indices (not yet used)
      const availableIndices = [];
      for (let i = 0; i < data.length; i++) {
        if (!usedIndices.includes(i)) {
          availableIndices.push(i);
        }
      }

      // Pick a random quote from available ones
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      const random = data[randomIndex];

      // Mark this quote as used
      usedIndices.push(randomIndex);
      try {
        localStorage.setItem(STORAGE_KEYS.usedQuotes, JSON.stringify(usedIndices));
      } catch {}

      setQuote({
        text: random.quote,
        author: random.author || '',
        explanation: random.explanation || ''
      });
      return;
    }
  } catch (e) {
    try {
      const r = await fetch('https://api.quotable.io/random?tags=inspirational|sports');
      const d = await r.json();
      if (d && d.content) {
        setQuote({ text: d.content, author: d.author || '', explanation: '' });
        return;
      }
    } catch {}
    setQuote({
      text: "Hard work beats talent when talent doesn't work hard!",
      author: 'Tim Notke',
      explanation: "Even if you're not the best naturally, working hard can help you succeed!"
    });
  }
};

// ======= Initialize =======
setThemeVars(currentTeam);
applySith(currentTeam === 'Sith');
if (currentTeam === 'Boba Fett') startBlasters();

updateClock();
setInterval(updateClock, 1000);
loadQuote();

renderChecklist($('#morningList'), morningChecklist, toggleMorning, $('#morningProgress'));
renderChecklist($('#homeList'),    homeChecklist,    toggleHome,    $('#homeProgress'));
renderChecklist($('#screenList'),  screenChecklist,  toggleScreen,  $('#screenProgress'));

// Set initial treasure chest state
const screenAllowanceEl = $('#screenAllowance');
const allScreenComplete = screenChecklist.every(item => item.done);
const now = new Date();
const isWeekend = now.getDay() === 0 || now.getDay() === 6;

if (!allScreenComplete) {
  screenAllowanceEl.classList.add('chest-locked');
  screenAllowanceEl.textContent = isWeekend
    ? '🏴‍☠️ Complete tasks to unlock two hours!'
    : '🏴‍☠️ Complete tasks to unlock one hour!';
} else {
  // Already unlocked - show unlocked state
  screenAllowanceEl.classList.add('chest-unlocked');
  screenAllowanceEl.textContent = '🎮 SCREEN TIME UNLOCKED! 🎮';
}

// ======= Weekend Chill Mode =======
// Function to check and display weekend overlay
const checkWeekendMode = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const weekendOverlay = $('#weekendChillOverlay');
  if (weekendOverlay) {
    if (isWeekend) {
      // Show weekend chill overlay
      weekendOverlay.classList.remove('hidden');
      weekendOverlay.setAttribute('aria-hidden', 'false');
      console.log('🎉 Weekend Mode: TIME TO CHILL!');
    } else {
      // Hide weekend overlay on weekdays
      weekendOverlay.classList.add('hidden');
      weekendOverlay.setAttribute('aria-hidden', 'true');
    }
  }
};

// Check weekend mode on page load
checkWeekendMode();

// Re-check weekend mode every hour in case user keeps page open past midnight
setInterval(checkWeekendMode, 60 * 60 * 1000);
