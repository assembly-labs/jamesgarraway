// ======= Storage Keys =======
const STORAGE_KEYS = {
  team: 'aolkids.currentTeam',
  morning: 'aolkids.morningChecklist',
  screen: 'aolkids.screenTimeChecklist',
  quote: 'aolkids.lastQuote'
};

// ======= Default Checklist Data =======
const defaultMorning = [
  { id:1, text:'🛏️ Make Bed', done:false },
  { id:2, text:'🪥 Brush Teeth', done:false },
  { id:3, text:'👕 Get Dressed', done:false },
  { id:4, text:'💧 Fill Up Water', done:false },
  { id:5, text:'🎒 Pack School Bag (Homework, Lunch, Snack)', done:false },
  { id:6, text:'🍳 Eat Breakfast', done:false },
  { id:7, text:'🧹 Clear Table', done:false }
];
const defaultScreen = [
  { id:1, text:'📚 Finish all homework', done:false },
  { id:2, text:'🧹 Clean up room', done:false },
  { id:3, text:'🏃 30 minutes of physical activity or exercise', done:false },
  { id:4, text:'🧺 Help with one chore', done:false }
];

// ======= State =======
let morningChecklist = JSON.parse(localStorage.getItem(STORAGE_KEYS.morning) || 'null') || defaultMorning;
let screenChecklist  = JSON.parse(localStorage.getItem(STORAGE_KEYS.screen)  || 'null') || defaultScreen;

// ======= Checklist Rendering =======
const renderChecklist = (container, list, onToggle) => {
  container.innerHTML = '';
  list.forEach(item => {
    const row = document.createElement('div');
    row.className = 'item' + (item.done ? ' done' : '');
    row.setAttribute('role','button');
    row.setAttribute('tabindex','0');

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = item.done;
    cb.style.width = '22px';
    cb.style.height = '22px';
    cb.style.accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    cb.addEventListener('click', e => e.stopPropagation());
    cb.addEventListener('change', () => onToggle(item.id));

    const label = document.createElement('span');
    label.textContent = item.text;
    label.style.flex = '1';

    row.appendChild(cb);
    row.appendChild(label);

    row.addEventListener('click', () => onToggle(item.id));
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') onToggle(item.id);
    });

    container.appendChild(row);
  });
};

const toggleMorning = (id) => {
  morningChecklist = morningChecklist.map(it => it.id === id ? { ...it, done: !it.done } : it);
  localStorage.setItem(STORAGE_KEYS.morning, JSON.stringify(morningChecklist));
  renderChecklist(document.getElementById('morningList'), morningChecklist, toggleMorning);
};
const toggleScreen = (id) => {
  screenChecklist = screenChecklist.map(it => it.id === id ? { ...it, done: !it.done } : it);
  localStorage.setItem(STORAGE_KEYS.screen, JSON.stringify(screenChecklist));
  renderChecklist(document.getElementById('screenList'), screenChecklist, toggleScreen);
};

// Export for use in routine.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderChecklist, toggleMorning, toggleScreen, morningChecklist, screenChecklist };
}
