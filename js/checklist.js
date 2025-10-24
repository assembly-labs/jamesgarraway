// ======= Storage Keys =======
const STORAGE_KEYS = {
  team: 'aolkids.currentTeam',
  morning: 'aolkids.morningChecklist',
  home: 'aolkids.homeChecklist',
  screen: 'aolkids.screenTimeChecklist',
  quote: 'aolkids.lastQuote',
  usedQuotes: 'aolkids.usedQuotes'
};

// ======= Default Checklist Data =======
const defaultMorning = [
  { id:1, text:'🛏️ Make Bed', done:false },
  { id:2, text:'🪥 Brush Teeth', done:false },
  { id:3, text:'👕 Get Dressed', done:false },
  { id:4, text:'💧 Fill Up Water', done:false },
  { id:5, text:'🎒 Pack School Bag (Homework, Lunch, Snack)', done:false },
  { id:6, text:'🍳 Eat Breakfast', done:false }
];
const defaultHome = [
  { id:1, text:'📔 Planner', done:false },
  { id:2, text:'📁 Take home folder', done:false },
  { id:3, text:'📱 iPad', done:false },
  { id:4, text:'📄 Practice pages', done:false },
  { id:5, text:'📊 Math folder', done:false }
];
const defaultScreen = [
  { id:1, text:'📚 Finish all homework', done:false },
  { id:2, text:'🧹 Clean up room', done:false },
  { id:3, text:'🏃 30 minutes of physical activity or exercise', done:false },
  { id:4, text:'🧺 Help with one chore', done:false }
];

// ======= State =======
let morningChecklist = JSON.parse(localStorage.getItem(STORAGE_KEYS.morning) || 'null') || defaultMorning;
let homeChecklist    = JSON.parse(localStorage.getItem(STORAGE_KEYS.home)    || 'null') || defaultHome;
let screenChecklist  = JSON.parse(localStorage.getItem(STORAGE_KEYS.screen)  || 'null') || defaultScreen;

// ======= Progress Explosion Config =======
const PROGRESS_EMOJIS = {
  toSchool: ['🌊', '💦', '🏄‍♂️', '🤙', '☀️'],
  bringHome: ['⚡', '🔥', '💥', '✨', '⭐'],
  afterSchool: ['🏆', '🥇', '⚽', '🎯', '🏀']
};

const PROGRESS_COMPLETE_TEXT = {
  toSchool: '🌊 ALL SET! 🌊',
  bringHome: '⚡ NAILED IT! ⚡',
  afterSchool: '🏆 CRUSHED IT! 🏆'
};

// ======= Checklist Rendering =======
const renderChecklist = (container, list, onToggle, progressContainer) => {
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
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle(item.id);
      }
    });

    container.appendChild(row);
  });
};

// ======= Treasure Chest Unlock Function =======
function unlockTreasureChest(chestElement) {
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
      chestElement.textContent = '🎮 SCREEN TIME UNLOCKED! 🎮';
    }, 600);

    // Add permanent unlocked/glowing state
    setTimeout(() => {
      chestElement.classList.remove('chest-opening');
      chestElement.classList.add('chest-unlocked');
    }, 1200);
  }, 600); // Wait for shake to finish
}

// ======= Progress Explosion Function =======
function explodeProgressBar(progressElement, type) {
  if (!progressElement) return;

  // Add explosion class
  progressElement.classList.add('progress-explode');

  // Get position for particle spawning
  const rect = progressElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Create star particles
  const emojis = PROGRESS_EMOJIS[type] || ['⭐', '✨', '💫'];
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
    progressElement.textContent = PROGRESS_COMPLETE_TEXT[type] || '✨ COMPLETE! ✨';
  }, 400);

  // Remove explosion class
  setTimeout(() => {
    progressElement.classList.remove('progress-explode');
  }, 600);
}

const toggleMorning = (id) => {
  morningChecklist = morningChecklist.map(it => it.id === id ? { ...it, done: !it.done } : it);
  localStorage.setItem(STORAGE_KEYS.morning, JSON.stringify(morningChecklist));
  renderChecklist(
    document.getElementById('morningList'),
    morningChecklist,
    toggleMorning,
    document.getElementById('morningProgress')
  );

  // Check if all items are complete and trigger celebration
  if (morningChecklist.every(item => item.done)) {
    const progressEl = document.getElementById('morningProgress');

    // Explode progress bar first
    explodeProgressBar(progressEl, 'toSchool');

    // 🎊 FIRE CONFETTI CANNONS!
    setTimeout(() => {
      if (typeof fireConfettiCannon === 'function') {
        fireConfettiCannon('toSchool');
      }
    }, 900);

    // Then trigger main celebration after delay
    setTimeout(() => {
      if (typeof triggerCelebration === 'function') {
        triggerCelebration('toSchool');
      }
    }, 700);
  }
};

const toggleHome = (id) => {
  homeChecklist = homeChecklist.map(it => it.id === id ? { ...it, done: !it.done } : it);
  localStorage.setItem(STORAGE_KEYS.home, JSON.stringify(homeChecklist));
  renderChecklist(
    document.getElementById('homeList'),
    homeChecklist,
    toggleHome,
    document.getElementById('homeProgress')
  );

  // Check if all items are complete and trigger celebration
  if (homeChecklist.every(item => item.done)) {
    const progressEl = document.getElementById('homeProgress');

    // Explode progress bar first
    explodeProgressBar(progressEl, 'bringHome');

    // 🎊 FIRE CONFETTI CANNONS!
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

const toggleScreen = (id) => {
  screenChecklist = screenChecklist.map(it => it.id === id ? { ...it, done: !it.done } : it);
  localStorage.setItem(STORAGE_KEYS.screen, JSON.stringify(screenChecklist));
  renderChecklist(
    document.getElementById('screenList'),
    screenChecklist,
    toggleScreen,
    document.getElementById('screenProgress')
  );

  const allComplete = screenChecklist.every(item => item.done);
  const chestElement = document.getElementById('screenAllowance');

  // Check if all items are complete and trigger celebration
  if (allComplete) {
    const progressEl = document.getElementById('screenProgress');

    // Explode progress bar first
    explodeProgressBar(progressEl, 'afterSchool');

    // UNLOCK THE TREASURE CHEST!
    setTimeout(() => {
      unlockTreasureChest(chestElement);
    }, 800);

    // 🎊 FIRE CONFETTI CANNONS!
    setTimeout(() => {
      if (typeof fireConfettiCannon === 'function') {
        fireConfettiCannon('afterSchool');
      }
    }, 900);

    // Then trigger main celebration after chest unlocks
    setTimeout(() => {
      if (typeof triggerCelebration === 'function') {
        triggerCelebration('afterSchool');
      }
    }, 2500); // Wait for chest animation
  } else {
    // Keep chest locked if not all complete
    if (chestElement && !chestElement.classList.contains('chest-locked')) {
      chestElement.classList.remove('chest-unlocked', 'chest-opening', 'chest-shaking');
      chestElement.classList.add('chest-locked');

      // Reset text based on weekend/weekday
      const now = new Date();
      const isWeekend = now.getDay() === 0 || now.getDay() === 6;
      chestElement.textContent = isWeekend
        ? '🏴‍☠️ Complete tasks to unlock two hours!'
        : '🏴‍☠️ Complete tasks to unlock one hour!';
    }
  }
};

// Export for use in routine.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderChecklist, toggleMorning, toggleHome, toggleScreen, morningChecklist, homeChecklist, screenChecklist };
}
