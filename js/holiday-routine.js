// ========================================
// DEPENDENCIES:
// - themes.js (teamColors, teamNames, setThemeVars, applySith, startBlasters, stopBlasters)
// - holiday-checklist.js (HOLIDAY_STORAGE_KEYS, holidayMorningChecklist, etc.)
// ========================================

// ======= DOM Helper =======
const $ = s => document.querySelector(s);

// ======= Current Team State =======
let currentTeam = localStorage.getItem(HOLIDAY_STORAGE_KEYS.team);
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
  localStorage.setItem(HOLIDAY_STORAGE_KEYS.team, currentTeam);
  setThemeVars(currentTeam);
  // Sith effect
  applySith(currentTeam === 'Sith');
  // Boba blasters
  if (currentTeam === 'Boba Fett') startBlasters();
  else stopBlasters();
};

teamSelect.addEventListener('change', (e) => setTeam(e.target.value));

// ======= Time & Date =======
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const updateClock = () => {
  const now = new Date();
  const month = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  const dayName = daysOfWeek[now.getDay()];

  // Update header with date only (no time)
  $('#headerDateTime').textContent = `${dayName}, ${month} ${day}, ${year}`;
};

// ======= Quotes (from ../../quotes.json since we're in day/holiday/) =======
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
  try { localStorage.setItem(HOLIDAY_STORAGE_KEYS.quote, JSON.stringify(q)); } catch {}
};

const loadQuote = async () => {
  // Get today's date string (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  try {
    // Check if we already have a quote for today
    const stored = JSON.parse(localStorage.getItem(HOLIDAY_STORAGE_KEYS.quote) || 'null');
    if (stored && stored.date === today && stored.text) {
      setQuote(stored);
      return;
    }
  } catch {}

  try {
    // Path is relative to day/holiday/ folder (go up one level to day/)
    const res = await fetch('../quotes.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('quotes.json not found');
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      // Use the date to determine which quote to show
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
        localStorage.setItem(HOLIDAY_STORAGE_KEYS.quote, JSON.stringify(quoteData));
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

// ======= Initialize =======
setThemeVars(currentTeam);
applySith(currentTeam === 'Sith');
if (currentTeam === 'Boba Fett') startBlasters();

updateClock();
setInterval(updateClock, 1000);
loadQuote();

// Render all holiday checklists
renderHolidayChecklist($('#holidayMorningList'), holidayMorningChecklist, toggleHolidayMorning, $('#holidayMorningProgress'));
renderHolidayChecklist($('#holidayAfternoonList'), holidayAfternoonChecklist, toggleHolidayAfternoon, $('#holidayAfternoonProgress'));
renderHolidayChecklist($('#holidayEndOfDayList'), holidayEndOfDayChecklist, toggleHolidayEndOfDay, $('#holidayEndOfDayProgress'));

// Set initial treasure chest state for morning routine
const screenAllowanceEl = $('#holidayScreenAllowance');
const allMorningComplete = holidayMorningChecklist.every(item => item.done);

if (!allMorningComplete) {
  screenAllowanceEl.classList.add('chest-locked');
  screenAllowanceEl.textContent = '🏴‍☠️ Complete morning routine to unlock screens!';
} else {
  // Already unlocked - show unlocked state
  screenAllowanceEl.classList.add('chest-unlocked');
  screenAllowanceEl.textContent = '🎮 SCREENS UNLOCKED! 🎮';
}

// ======= Daily Checklist Reset (for tabs left open overnight) =======
// Check every 5 minutes if we've crossed into a new day
setInterval(() => {
  if (typeof performHolidayDailyReset === 'function') {
    performHolidayDailyReset();
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

    // Get all localStorage keys for this app (including holiday keys)
    const keysToExport = Object.keys(localStorage).filter(key =>
      key.startsWith('aolkids.') || key.startsWith('champion_') || key === 'minecoins'
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
    a.download = `holiday-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Visual feedback
    exportBtn.textContent = '✅';
    setTimeout(() => { exportBtn.textContent = '💾'; }, 2000);
  });
}
