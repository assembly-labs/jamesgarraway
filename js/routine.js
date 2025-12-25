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
  // Get today's date string (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  try {
    // Check if we already have a quote for today
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.quote) || 'null');
    if (stored && stored.date === today && stored.text) {
      setQuote(stored);
      return;
    }
  } catch {}

  try {
    const res = await fetch('./quotes.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('quotes.json not found');
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      // Use the date to determine which quote to show
      // This ensures the same quote all day, but changes daily
      const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
      const quoteIndex = dayOfYear % data.length;
      const selectedQuote = data[quoteIndex];

      const quoteData = {
        text: selectedQuote.quote,
        author: selectedQuote.author || '',
        explanation: selectedQuote.explanation || '',
        date: today
      };

      setQuote(quoteData);
      try {
        localStorage.setItem(STORAGE_KEYS.quote, JSON.stringify(quoteData));
      } catch {}
      return;
    }
  } catch (e) {
    // Fallback quote
    setQuote({
      text: "Hard work beats talent when talent doesn't work hard!",
      author: 'Tim Notke',
      explanation: "Even if you're not the best naturally, working hard can help you succeed!",
      date: today
    });
  }
};

// ======= Word of the Day =======
const WORD_STORAGE_KEY = 'champion_word';

const setWord = (w) => {
  $('#wordMain').textContent = w.word || 'Loading...';
  $('#wordPronunciation').textContent = w.pronunciation || '—';
  $('#wordDefinition').textContent = w.definition || 'Loading definition...';
  const exampleWrap = $('#wordExampleWrap');
  if (w.example) {
    $('#wordExample').textContent = ' ' + w.example;
    exampleWrap.style.display = 'block';
  } else {
    exampleWrap.style.display = 'none';
  }
  try { localStorage.setItem(WORD_STORAGE_KEY, JSON.stringify(w)); } catch {}
};

const loadWord = async () => {
  // Get today's date string (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  try {
    // Check if we already have a word for today
    const stored = JSON.parse(localStorage.getItem(WORD_STORAGE_KEY) || 'null');
    if (stored && stored.date === today && stored.word) {
      setWord(stored);
      return;
    }
  } catch {}

  try {
    const res = await fetch('./words.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('words.json not found');
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      // Use the date to determine which word to show
      // This ensures the same word all day, but changes daily
      const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
      const wordIndex = dayOfYear % data.length;
      const selectedWord = data[wordIndex];

      const wordData = {
        word: selectedWord.word,
        pronunciation: selectedWord.pronunciation || '',
        definition: selectedWord.definition || '',
        example: selectedWord.example || '',
        date: today
      };

      setWord(wordData);
      try {
        localStorage.setItem(WORD_STORAGE_KEY, JSON.stringify(wordData));
      } catch {}
    }
  } catch (e) {
    // Fallback word if loading fails
    const fallbackWord = {
      word: 'Perseverance',
      pronunciation: 'per-suh-VEER-uhns',
      definition: 'Never giving up, even when things get tough',
      example: 'Tom Brady showed incredible perseverance when he came back from 28-3 in the Super Bowl.',
      date: today
    };
    setWord(fallbackWord);
    try {
      localStorage.setItem(WORD_STORAGE_KEY, JSON.stringify(fallbackWord));
    } catch {}
  }
};

// ======= Initialize =======
setThemeVars(currentTeam);
applySith(currentTeam === 'Sith');
if (currentTeam === 'Boba Fett') startBlasters();

updateClock();
setInterval(updateClock, 1000);
loadQuote();
loadWord();

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

// ======= Daily Checklist Reset (for tabs left open overnight) =======
// Check every 5 minutes if we've crossed into a new day
setInterval(() => {
  if (typeof performDailyReset === 'function') {
    performDailyReset();
  }
}, 5 * 60 * 1000); // Check every 5 minutes

// ======= Data Export =======
const exportBtn = $('#exportBtn');
if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    // Collect all localStorage data
    const exportData = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      data: {}
    };

    // Get all localStorage keys for this app
    const keysToExport = Object.keys(localStorage).filter(key =>
      key.startsWith('champion_') || key === 'minecoins'
    );

    keysToExport.forEach(key => {
      try {
        const value = localStorage.getItem(key);
        exportData.data[key] = JSON.parse(value);
      } catch {
        exportData.data[key] = localStorage.getItem(key);
      }
    });

    // Create and download the file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `champion-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Visual feedback
    exportBtn.textContent = '✅';
    setTimeout(() => { exportBtn.textContent = '💾'; }, 2000);
  });
}
