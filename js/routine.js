// ========================================
// DEPENDENCIES:
// - themes.js (teamColors, teamNames, setThemeVars, applySith, startBlasters, stopBlasters)
// - checklist.js (STORAGE_KEYS, morningChecklist, screenChecklist, renderChecklist, toggleMorning, toggleScreen)
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
  $('#timeStr').textContent = now.toLocaleTimeString();
  const month = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  $('#dateStr').textContent = `${month} ${day}, ${year}`;
  $('#dayName').textContent = daysOfWeek[now.getDay()];
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  const allowed = isWeekend ? 'two hours' : 'one hour';
  $('#screenAllowance').textContent = isWeekend
    ? '🎮 Enjoy two hours of screen time!'
    : `🎮 Enjoy ${allowed} of screen time!`;
};

// ======= Quotes (from ./quotes.json) =======
const setQuote = (q) => {
  $('#quoteText').textContent = `"${q.text}"`;
  $('#quoteAuthor').textContent = q.author ? `— ${q.author}` : '—';
  if (q.explanation) {
    $('#quoteExplanation').textContent = ' ' + q.explanation;
    $('#quoteExplWrap').style.display = '';
  } else {
    $('#quoteExplWrap').style.display = 'none';
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
      const random = data[Math.floor(Math.random() * data.length)];
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

renderChecklist($('#morningList'), morningChecklist, toggleMorning);
renderChecklist($('#screenList'),  screenChecklist,  toggleScreen);
