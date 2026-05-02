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
  const dayName = daysOfWeek[now.getDay()];
  let hours = now.getHours();
  const mins = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  $('#headerDateTime').textContent = `${dayName}, ${month} ${day}  ·  ${hours}:${mins} ${ampm}`;
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

// Hide school widgets on weekends
const wMorning = document.getElementById('w-morning');
const wHome = document.getElementById('w-home');
if (wMorning) wMorning.style.display = isWeekend ? 'none' : '';
if (wHome) wHome.style.display = isWeekend ? 'none' : '';

// ======= Daily Checklist Reset (for tabs left open overnight) =======
// Check every 5 minutes if we've crossed into a new day
setInterval(() => {
  if (typeof performDailyReset === 'function') {
    performDailyReset();
  }
}, 5 * 60 * 1000); // Check every 5 minutes

// ======= Departure Countdown =======
const DEPARTURE_MODE_KEY = 'champion_departure_mode';

const updateDepartureCountdown = () => {
  const countdownEl = document.getElementById('countdownTime');
  const labelEl = document.getElementById('countdownLabel');
  const wDep = document.getElementById('w-departure');
  if (!wDep) return;

  const now = new Date();
  const todayIsWeekend = now.getDay() === 0 || now.getDay() === 6;
  if (todayIsWeekend) { wDep.style.display = 'none'; return; }
  wDep.style.display = '';

  const mode = localStorage.getItem(DEPARTURE_MODE_KEY) || 'bus';
  const targetMin = mode === 'bus' ? 30 : 20;

  const target = new Date(now);
  target.setHours(8, targetMin, 0, 0);

  document.querySelectorAll('.dep-btn').forEach(btn => {
    btn.classList.toggle('dep-active', btn.dataset.mode === mode);
  });

  const diffMs = target - now;
  const diffMin = Math.round(diffMs / 60000);

  if (!countdownEl) return;

  if (diffMs <= 0) {
    countdownEl.textContent = 'Have a great day!';
    countdownEl.className = 'countdown-time countdown-done';
    if (labelEl) labelEl.textContent = '';
    return;
  }

  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  countdownEl.textContent = h > 0 ? `${h}h ${m}m` : `${m}m`;

  if (diffMin <= 10)      countdownEl.className = 'countdown-time countdown-red';
  else if (diffMin <= 30) countdownEl.className = 'countdown-time countdown-yellow';
  else                    countdownEl.className = 'countdown-time countdown-green';

  const targetTimeStr = `8:${String(targetMin).padStart(2, '0')} AM`;
  if (labelEl) labelEl.textContent = mode === 'bus'
    ? `Outside and packed by ${targetTimeStr}`
    : `Packed and ready by ${targetTimeStr}`;
};

document.querySelectorAll('.dep-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    localStorage.setItem(DEPARTURE_MODE_KEY, btn.dataset.mode);
    updateDepartureCountdown();
  });
});

updateDepartureCountdown();
setInterval(updateDepartureCountdown, 60000);

// ======= Mini Weather (Wayne, PA) =======
const MINI_WEATHER_KEY = 'champion_mini_weather';

const wmoEmojiMini = (code) => {
  if (code === 0) return '\u2600\uFE0F';
  if (code <= 2)  return '\u26C5';
  if (code <= 3)  return '\u2601\uFE0F';
  if (code <= 49) return '\uD83C\uDF2B\uFE0F';
  if (code <= 67) return '\uD83C\uDF27\uFE0F';
  if (code <= 77) return '\u2744\uFE0F';
  if (code <= 82) return '\uD83C\uDF27\uFE0F';
  if (code <= 86) return '\uD83C\uDF28\uFE0F';
  return '\u26C8\uFE0F';
};

const outfitMini = (tempF) => {
  if (tempF < 32)  return 'Heavy coat + gloves';
  if (tempF <= 45) return 'Coat and layers';
  if (tempF <= 60) return 'Hoodie or light jacket';
  if (tempF <= 75) return 'T-shirt weather';
  return 'Shorts + t-shirt';
};

const renderMiniWeather = (data) => {
  const emojiEl  = document.getElementById('miniWeatherEmoji');
  const tempEl   = document.getElementById('miniWeatherTemp');
  const outfitEl = document.getElementById('miniWeatherOutfit');
  if (emojiEl)  emojiEl.textContent  = wmoEmojiMini(data.code);
  if (tempEl)   tempEl.textContent   = data.temp + '\u00B0F';
  if (outfitEl) outfitEl.textContent = outfitMini(data.temp);
};

const loadMiniWeather = async () => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const cached = JSON.parse(localStorage.getItem(MINI_WEATHER_KEY) || 'null');
    if (cached && cached.date === today && cached.temp !== undefined) {
      renderMiniWeather(cached);
      return;
    }
  } catch {}
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.0440&longitude=-75.3872&current=temperature_2m,weathercode&temperature_unit=fahrenheit&timezone=America%2FNew_York');
    if (!res.ok) throw new Error();
    const data = await res.json();
    const weatherData = {
      temp: Math.round(data.current.temperature_2m),
      code: data.current.weathercode,
      date: today
    };
    try { localStorage.setItem(MINI_WEATHER_KEY, JSON.stringify(weatherData)); } catch {}
    renderMiniWeather(weatherData);
  } catch {}
};

loadMiniWeather();

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
