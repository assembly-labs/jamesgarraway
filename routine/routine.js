// ======= CHAMPION ROUTINE PAGE =======
// Dependencies (loaded before this file):
//   themes.js    -> teamColors, teamNames, setThemeVars, applySith, startBlasters, stopBlasters
//   confetti-cannon.js -> fireConfettiCannon
//   celebrations.js    -> triggerCelebration

// ======= Checklist Data =======
const ROUTINE_CHECKLIST = {
  morning: [
    { id: 'make-bed',      label: 'Make bed',           days: 'all' },
    { id: 'brush-teeth',   label: 'Brush teeth',         days: 'all' },
    { id: 'get-dressed',   label: 'Get dressed',         days: 'all' },
    { id: 'fill-water',    label: 'Fill up water',        days: 'all' },
    { id: 'gym-clothes',   label: 'Pack gym clothes',     days: [1, 3] }, // Mon, Wed
    { id: 'library-book',  label: 'Pack library book',    days: [5] },    // Fri
    { id: 'pack-bag',      label: 'Pack school bag',      days: 'all' },
    { id: 'eat-breakfast', label: 'Eat breakfast',        days: 'all' },
  ],
  nightBefore: [
    { id: 'homework-done',  label: 'Homework done',          days: 'all' },
    { id: 'pack-bag-nb',    label: 'Pack bag for tomorrow',   days: 'all' },
    { id: 'gym-clothes-nb', label: 'Set out gym clothes',     days: [0, 2] }, // Sun, Tue (night before Mon, Wed)
    { id: 'charge-device',  label: 'Charge device',           days: 'all' },
    { id: 'pick-outfit',    label: 'Pick out outfit',          days: 'all' },
  ]
};

// ======= Storage Keys =======
const ROUTINE_KEYS = {
  morning:     'routine.morning',
  nightBefore: 'routine.nightBefore',
  lastReset:   'routine.lastReset',
  lastMode:    'routine.lastMode'
};

// ======= Helpers =======
function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function getVisibleItems(mode) {
  const today = new Date().getDay();
  return ROUTINE_CHECKLIST[mode].filter(item =>
    item.days === 'all' || item.days.includes(today)
  );
}

// ======= State Init =======
function initState() {
  const today = getTodayString();
  if (localStorage.getItem(ROUTINE_KEYS.lastReset) !== today) {
    localStorage.removeItem(ROUTINE_KEYS.morning);
    localStorage.removeItem(ROUTINE_KEYS.nightBefore);
    localStorage.setItem(ROUTINE_KEYS.lastReset, today);
  }
}

function loadMode(mode) {
  const saved = JSON.parse(localStorage.getItem(ROUTINE_KEYS[mode]) || 'null');
  const visible = getVisibleItems(mode);
  if (!saved) return visible.map(item => ({ ...item, done: false }));
  const doneMap = {};
  saved.forEach(s => { doneMap[s.id] = s.done; });
  return visible.map(item => ({ ...item, done: doneMap[item.id] || false }));
}

function saveMode(mode) {
  localStorage.setItem(ROUTINE_KEYS[mode], JSON.stringify(routineState[mode]));
}

// ======= App State =======
const routineState = {};
let currentMode = 'morning';
const completionFired = { morning: false, nightBefore: false };

// ======= Render =======
function render() {
  const list = routineState[currentMode];
  const container = document.getElementById('routineList');
  const progressFill = document.getElementById('progressFill');
  const progressLabel = document.getElementById('progressLabel');
  const progressTrack = document.getElementById('progressTrack');

  container.innerHTML = '';

  const accentColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent').trim();

  list.forEach(item => {
    const row = document.createElement('div');
    row.className = 'item' + (item.done ? ' done' : '');
    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = item.done;
    cb.style.width = '28px';
    cb.style.height = '28px';
    cb.style.minWidth = '28px';
    cb.style.accentColor = accentColor;
    cb.addEventListener('click', e => e.stopPropagation());
    cb.addEventListener('change', () => toggleItem(item.id));

    const label = document.createElement('span');
    label.textContent = item.label;
    label.style.flex = '1';

    row.appendChild(cb);
    row.appendChild(label);
    row.addEventListener('click', () => toggleItem(item.id));
    row.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleItem(item.id); }
    });

    container.appendChild(row);
  });

  // Progress bar
  const done = list.filter(i => i.done).length;
  const total = list.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  progressFill.style.width = pct + '%';
  progressLabel.textContent = `${done} of ${total} done`;
  if (progressTrack) progressTrack.setAttribute('aria-valuenow', pct);

  // Completion check
  if (total > 0 && done === total && !completionFired[currentMode]) {
    completionFired[currentMode] = true;
    onComplete();
  }
}

// ======= Toggle =======
function toggleItem(id) {
  routineState[currentMode] = routineState[currentMode].map(item =>
    item.id === id ? { ...item, done: !item.done } : item
  );
  saveMode(currentMode);
  render();
}

// ======= Completion =======
function onComplete() {
  const type = currentMode === 'morning' ? 'toSchool' : 'bringHome';

  const fill = document.getElementById('progressFill');
  fill.classList.add('progress-explode');
  setTimeout(() => fill.classList.remove('progress-explode'), 700);

  setTimeout(() => {
    if (typeof fireConfettiCannon === 'function') fireConfettiCannon(type);
  }, 300);

  setTimeout(() => {
    if (typeof triggerCelebration === 'function') triggerCelebration(type);
  }, 700);
}

// ======= Mode Toggle =======
function setMode(mode) {
  currentMode = mode;
  localStorage.setItem(ROUTINE_KEYS.lastMode, mode);

  const btnMorning = document.getElementById('btnMorning');
  const btnNight   = document.getElementById('btnNight');

  btnMorning.classList.toggle('active', mode === 'morning');
  btnNight.classList.toggle('active', mode === 'nightBefore');
  btnMorning.setAttribute('aria-selected', mode === 'morning');
  btnNight.setAttribute('aria-selected', mode === 'nightBefore');

  render();
}

// ======= Theme =======
function initTheme() {
  const savedTeam = localStorage.getItem('aolkids.currentTeam');
  const team = (savedTeam && typeof teamColors !== 'undefined' && teamColors[savedTeam])
    ? savedTeam
    : 'Philadelphia Eagles';

  const select = document.getElementById('teamSelect');
  if (select && typeof teamNames !== 'undefined') {
    teamNames.forEach(n => {
      const opt = document.createElement('option');
      opt.value = n;
      opt.textContent = n;
      select.appendChild(opt);
    });
    select.value = team;
    select.addEventListener('change', e => {
      const t = e.target.value;
      localStorage.setItem('aolkids.currentTeam', t);
      if (typeof setThemeVars === 'function') setThemeVars(t);
      if (typeof applySith === 'function') applySith(t === 'Sith');
      if (t === 'Boba Fett') {
        if (typeof startBlasters === 'function') startBlasters();
      } else {
        if (typeof stopBlasters === 'function') stopBlasters();
      }
    });
  }

  if (typeof setThemeVars === 'function') setThemeVars(team);
  if (typeof applySith === 'function') applySith(team === 'Sith');
  if (team === 'Boba Fett' && typeof startBlasters === 'function') startBlasters();
}

// ======= Init =======
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initState();

  routineState.morning    = loadMode('morning');
  routineState.nightBefore = loadMode('nightBefore');

  const saved = localStorage.getItem(ROUTINE_KEYS.lastMode);
  currentMode = (saved === 'nightBefore') ? 'nightBefore' : 'morning';

  document.getElementById('btnMorning').addEventListener('click', () => setMode('morning'));
  document.getElementById('btnNight').addEventListener('click', () => setMode('nightBefore'));

  setMode(currentMode);
});
