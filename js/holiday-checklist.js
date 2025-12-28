// ======= Holiday Routine Storage Keys =======
const HOLIDAY_STORAGE_KEYS = {
  team: 'aolkids.currentTeam',
  morning: 'aolkids.holidayMorningChecklist',
  afternoon: 'aolkids.holidayAfternoonChecklist',
  endOfDay: 'aolkids.holidayEndOfDayChecklist',
  quote: 'aolkids.lastQuote',
  usedQuotes: 'aolkids.usedQuotes',
  lastResetDate: 'aolkids.holidayLastResetDate'
};

// ======= Default Holiday Checklist Data =======
const defaultHolidayMorning = [
  { id: 1, text: '🍳 Eat Breakfast', done: false },
  { id: 2, text: '🪥 Brush Teeth', done: false },
  { id: 3, text: '🧮 Math Morning', done: false },
  { id: 4, text: '🍽️ Put Dishes Away', done: false }
];

const defaultHolidayAfternoon = [
  { id: 1, text: '📖 Read a Book', done: false },
  { id: 2, text: '🧮 Another Math Lesson', done: false },
  { id: 3, text: '🥪 Eat Lunch', done: false }
];

const defaultHolidayEndOfDay = [
  { id: 1, text: '🏃 1 Physical Activity', done: false },
  { id: 2, text: '📚 1 Book Read', done: false },
  { id: 3, text: '✅ All Math Completed', done: false }
];

// ======= Daily Reset Logic =======
function getHolidayTodayDateString() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function shouldResetHolidayChecklists() {
  const lastResetDate = localStorage.getItem(HOLIDAY_STORAGE_KEYS.lastResetDate);
  const todayDate = getHolidayTodayDateString();
  return lastResetDate !== todayDate;
}

function resetAllHolidayChecklists() {
  localStorage.setItem(HOLIDAY_STORAGE_KEYS.morning, JSON.stringify(defaultHolidayMorning));
  localStorage.setItem(HOLIDAY_STORAGE_KEYS.afternoon, JSON.stringify(defaultHolidayAfternoon));
  localStorage.setItem(HOLIDAY_STORAGE_KEYS.endOfDay, JSON.stringify(defaultHolidayEndOfDay));
  localStorage.setItem(HOLIDAY_STORAGE_KEYS.lastResetDate, getHolidayTodayDateString());
}

function performHolidayDailyReset() {
  if (shouldResetHolidayChecklists()) {
    resetAllHolidayChecklists();

    // Reload the state variables
    holidayMorningChecklist = JSON.parse(localStorage.getItem(HOLIDAY_STORAGE_KEYS.morning) || 'null') || defaultHolidayMorning;
    holidayAfternoonChecklist = JSON.parse(localStorage.getItem(HOLIDAY_STORAGE_KEYS.afternoon) || 'null') || defaultHolidayAfternoon;
    holidayEndOfDayChecklist = JSON.parse(localStorage.getItem(HOLIDAY_STORAGE_KEYS.endOfDay) || 'null') || defaultHolidayEndOfDay;

    // Re-render all checklists with fresh data
    const morningList = document.getElementById('holidayMorningList');
    const afternoonList = document.getElementById('holidayAfternoonList');
    const endOfDayList = document.getElementById('holidayEndOfDayList');
    const morningProgress = document.getElementById('holidayMorningProgress');
    const afternoonProgress = document.getElementById('holidayAfternoonProgress');
    const endOfDayProgress = document.getElementById('holidayEndOfDayProgress');

    if (morningList) renderHolidayChecklist(morningList, holidayMorningChecklist, toggleHolidayMorning, morningProgress);
    if (afternoonList) renderHolidayChecklist(afternoonList, holidayAfternoonChecklist, toggleHolidayAfternoon, afternoonProgress);
    if (endOfDayList) renderHolidayChecklist(endOfDayList, holidayEndOfDayChecklist, toggleHolidayEndOfDay, endOfDayProgress);

    // Reset screen allowance to locked state
    const screenAllowanceEl = document.getElementById('holidayScreenAllowance');
    if (screenAllowanceEl) {
      screenAllowanceEl.classList.remove('chest-unlocked', 'chest-opening', 'chest-shaking');
      screenAllowanceEl.classList.add('chest-locked');
      screenAllowanceEl.textContent = '🏴‍☠️ Complete morning routine to unlock screens!';
    }

    return true;
  }
  return false;
}

// Check if we need to reset checklists for a new day
if (shouldResetHolidayChecklists()) {
  resetAllHolidayChecklists();
}

// ======= State =======
let holidayMorningChecklist = JSON.parse(localStorage.getItem(HOLIDAY_STORAGE_KEYS.morning) || 'null') || defaultHolidayMorning;
let holidayAfternoonChecklist = JSON.parse(localStorage.getItem(HOLIDAY_STORAGE_KEYS.afternoon) || 'null') || defaultHolidayAfternoon;
let holidayEndOfDayChecklist = JSON.parse(localStorage.getItem(HOLIDAY_STORAGE_KEYS.endOfDay) || 'null') || defaultHolidayEndOfDay;

// ======= Progress Explosion Config =======
const HOLIDAY_PROGRESS_EMOJIS = {
  morning: ['☀️', '🌅', '⭐', '✨', '🌟'],
  afternoon: ['📚', '🧠', '💡', '⚡', '🔥'],
  endOfDay: ['🏆', '🥇', '🎯', '💪', '🌙']
};

const HOLIDAY_PROGRESS_COMPLETE_TEXT = {
  morning: '☀️ MORNING DONE! ☀️',
  afternoon: '📚 AFTERNOON DONE! 📚',
  endOfDay: '🏆 DAY COMPLETE! 🏆'
};

// ======= Checklist Rendering =======
const renderHolidayChecklist = (container, list, onToggle, progressContainer) => {
  container.innerHTML = '';

  // Update progress indicator if provided
  if (progressContainer) {
    const completed = list.filter(item => item.done).length;
    const total = list.length;
    const percentage = Math.round((completed / total) * 100);
    progressContainer.textContent = `${completed}/${total} complete (${percentage}%)`;
  }

  list.forEach(item => {
    const row = document.createElement('div');
    row.className = 'item' + (item.done ? ' done' : '');
    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');

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
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle(item.id);
      }
    });

    container.appendChild(row);
  });
};

// ======= Treasure Chest Unlock Function =======
function unlockHolidayTreasureChest(chestElement) {
  if (!chestElement) return;

  // Remove locked state
  chestElement.classList.remove('chest-locked');

  // SHAKE the chest first!
  chestElement.classList.add('chest-shaking');

  setTimeout(() => {
    // Remove shake, start opening
    chestElement.classList.remove('chest-shaking');
    chestElement.classList.add('chest-opening');

    // Get position for treasure particles
    const rect = chestElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // TREASURE BURST! Coins, gems, trophies!
    const treasures = ['💎', '💰', '🪙', '⭐', '✨', '🏆', '💵', '👑', '🎁', '🌟'];
    const particleCount = 15;

    setTimeout(() => {
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'treasure-particle';
        particle.textContent = treasures[i % treasures.length];

        // Calculate burst direction in all directions
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = Math.random() * 100 + 80; // 80-180px
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance - 30; // Slight upward bias

        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.setProperty('--treasure-x', x + 'px');
        particle.style.setProperty('--treasure-y', y + 'px');
        particle.style.animationDelay = (i * 0.03) + 's'; // Staggered burst

        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => particle.remove(), 1500);
      }
    }, 300); // Burst happens during opening animation

    // Change text to reveal the reward!
    setTimeout(() => {
      chestElement.textContent = '🎮 SCREENS UNLOCKED! 🎮';
    }, 600);

    // Add permanent unlocked/glowing state
    setTimeout(() => {
      chestElement.classList.remove('chest-opening');
      chestElement.classList.add('chest-unlocked');
    }, 1200);
  }, 600); // Wait for shake to finish
}

// ======= Progress Explosion Function =======
function explodeHolidayProgressBar(progressElement, type) {
  if (!progressElement) return;

  // Add explosion class
  progressElement.classList.add('progress-explode');

  // Get position for particle spawning
  const rect = progressElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Create star particles
  const emojis = HOLIDAY_PROGRESS_EMOJIS[type] || ['⭐', '✨', '💫'];
  const particleCount = 5;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'progress-star-particle';
    particle.textContent = emojis[i % emojis.length];

    // Calculate burst direction
    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 60;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.setProperty('--star-x', x + 'px');
    particle.style.setProperty('--star-y', y + 'px');

    document.body.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => particle.remove(), 800);
  }

  // Change text after initial explosion
  setTimeout(() => {
    progressElement.textContent = HOLIDAY_PROGRESS_COMPLETE_TEXT[type] || '✨ COMPLETE! ✨';
  }, 400);

  // Remove explosion class
  setTimeout(() => {
    progressElement.classList.remove('progress-explode');
  }, 600);
}

// ======= Toggle Functions =======
const toggleHolidayMorning = (id) => {
  holidayMorningChecklist = holidayMorningChecklist.map(it => it.id === id ? { ...it, done: !it.done } : it);
  localStorage.setItem(HOLIDAY_STORAGE_KEYS.morning, JSON.stringify(holidayMorningChecklist));
  renderHolidayChecklist(
    document.getElementById('holidayMorningList'),
    holidayMorningChecklist,
    toggleHolidayMorning,
    document.getElementById('holidayMorningProgress')
  );

  const allComplete = holidayMorningChecklist.every(item => item.done);
  const chestElement = document.getElementById('holidayScreenAllowance');

  // Check if all items are complete and trigger celebration
  if (allComplete) {
    const progressEl = document.getElementById('holidayMorningProgress');

    // Explode progress bar first
    explodeHolidayProgressBar(progressEl, 'morning');

    // UNLOCK THE TREASURE CHEST - screens are now allowed!
    setTimeout(() => {
      unlockHolidayTreasureChest(chestElement);
    }, 800);

    // FIRE CONFETTI CANNONS!
    setTimeout(() => {
      if (typeof fireConfettiCannon === 'function') {
        fireConfettiCannon('toSchool');
      }
    }, 900);

    // Then trigger main celebration after chest unlocks
    setTimeout(() => {
      if (typeof triggerCelebration === 'function') {
        triggerCelebration('toSchool');
      }
    }, 2500);
  } else {
    // Keep chest locked if not all complete
    if (chestElement && !chestElement.classList.contains('chest-locked')) {
      chestElement.classList.remove('chest-unlocked', 'chest-opening', 'chest-shaking');
      chestElement.classList.add('chest-locked');
      chestElement.textContent = '🏴‍☠️ Complete morning routine to unlock screens!';
    }
  }
};

const toggleHolidayAfternoon = (id) => {
  holidayAfternoonChecklist = holidayAfternoonChecklist.map(it => it.id === id ? { ...it, done: !it.done } : it);
  localStorage.setItem(HOLIDAY_STORAGE_KEYS.afternoon, JSON.stringify(holidayAfternoonChecklist));
  renderHolidayChecklist(
    document.getElementById('holidayAfternoonList'),
    holidayAfternoonChecklist,
    toggleHolidayAfternoon,
    document.getElementById('holidayAfternoonProgress')
  );

  // Check if all items are complete and trigger celebration
  if (holidayAfternoonChecklist.every(item => item.done)) {
    const progressEl = document.getElementById('holidayAfternoonProgress');

    // Explode progress bar first
    explodeHolidayProgressBar(progressEl, 'afternoon');

    // FIRE CONFETTI CANNONS!
    setTimeout(() => {
      if (typeof fireConfettiCannon === 'function') {
        fireConfettiCannon('bringHome');
      }
    }, 900);

    // Then trigger main celebration after delay
    setTimeout(() => {
      if (typeof triggerCelebration === 'function') {
        triggerCelebration('bringHome');
      }
    }, 700);
  }
};

const toggleHolidayEndOfDay = (id) => {
  holidayEndOfDayChecklist = holidayEndOfDayChecklist.map(it => it.id === id ? { ...it, done: !it.done } : it);
  localStorage.setItem(HOLIDAY_STORAGE_KEYS.endOfDay, JSON.stringify(holidayEndOfDayChecklist));
  renderHolidayChecklist(
    document.getElementById('holidayEndOfDayList'),
    holidayEndOfDayChecklist,
    toggleHolidayEndOfDay,
    document.getElementById('holidayEndOfDayProgress')
  );

  // Check if all items are complete and trigger celebration
  if (holidayEndOfDayChecklist.every(item => item.done)) {
    const progressEl = document.getElementById('holidayEndOfDayProgress');

    // Explode progress bar first
    explodeHolidayProgressBar(progressEl, 'endOfDay');

    // FIRE CONFETTI CANNONS!
    setTimeout(() => {
      if (typeof fireConfettiCannon === 'function') {
        fireConfettiCannon('afterSchool');
      }
    }, 900);

    // Then trigger main celebration after delay
    setTimeout(() => {
      if (typeof triggerCelebration === 'function') {
        triggerCelebration('afterSchool');
      }
    }, 700);
  }
};

// Export for use in holiday-routine.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderHolidayChecklist, toggleHolidayMorning, toggleHolidayAfternoon, toggleHolidayEndOfDay, holidayMorningChecklist, holidayAfternoonChecklist, holidayEndOfDayChecklist };
}
