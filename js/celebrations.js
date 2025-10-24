// ========================================
// 🔥🔥🔥 ULTRA EPIC CELEBRATIONS SYSTEM 🔥🔥🔥
// 100X MORE INTENSE!
// ========================================

// ======= Storage Key =======
const CELEBRATION_STORAGE_KEY = 'aolkids.celebrations';

// ======= Celebration Emoji Sets =======
const EMOJI_SETS = {
  toSchool: ['🏄‍♂️', '🏄', '🌊', '🤙', '☀️', '🏖️', '🌴', '💦', '🐚', '⛱️'],
  bringHome: ['🛹', '⚡', '🔥', '💥', '🚀', '⭐', '💫', '✨', '🎯', '🏆'],
  afterSchool: ['⚽', '🏀', '🏈', '🎾', '⚾', '⛷️', '🏂', '🏆', '🥇', '🎯', '🏔️', '🚴‍♂️', '🤸‍♂️']
};

// ======= Celebration Messages =======
const MESSAGES = {
  toSchool: ['SURF\'S UP!', 'GNARLY!', 'RADICAL!', 'SICK WAVES!'],
  bringHome: ['CRUSHING IT!', 'ON FIRE!', 'BOOM!', 'LEGENDARY!'],
  afterSchool: ['GAME TIME!', 'BEAST MODE!', 'YOU\'RE A LEGEND!', 'UNSTOPPABLE!']
};

// ======= Celebration Colors =======
const COLORS = {
  toSchool: ['#00BFFF', '#1E90FF', '#00CED1', '#FF6347', '#87CEEB'],
  bringHome: ['#FF0000', '#FF4500', '#FFD700', '#FFFFFF', '#FFA500'],
  afterSchool: ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#FF1493', '#FFA500']
};

// ======= Check if Already Celebrated Today =======
function hasBeenCelebratedToday(type) {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const data = JSON.parse(localStorage.getItem(CELEBRATION_STORAGE_KEY) || '{}');
    return data[today] && data[today][type] === true;
  } catch {
    return false;
  }
}

// ======= Mark as Celebrated =======
function markAsCelebrated(type) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const data = JSON.parse(localStorage.getItem(CELEBRATION_STORAGE_KEY) || '{}');
    if (!data[today]) data[today] = {};
    data[today][type] = true;

    // Clean up old dates (keep only last 7 days)
    const dates = Object.keys(data);
    if (dates.length > 7) {
      dates.sort();
      dates.slice(0, -7).forEach(oldDate => delete data[oldDate]);
    }

    localStorage.setItem(CELEBRATION_STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

// ======= Random Helper =======
function random(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(random(min, max));
}

function randomChoice(arr) {
  return arr[randomInt(0, arr.length)];
}

// ======= Check for Reduced Motion =======
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ======= Screen Shake Effect - ULTRA POWERFUL! =======
function screenShake(intensity = 'heavy') {
  if (prefersReducedMotion()) return;

  const body = document.body;
  const shakeClass = intensity === 'mega' ? 'shake-mega' : intensity === 'heavy' ? 'shake-heavy' : 'shake-medium';
  body.classList.add(shakeClass);
  setTimeout(() => body.classList.remove(shakeClass), 800);
}

// ======= Create Confetti Piece - BIGGER! =======
function createConfettiPiece(x, y, color, delay = 0) {
  const piece = document.createElement('div');
  piece.className = 'confetti-piece';
  piece.style.left = x + 'px';
  piece.style.top = y + 'px';
  piece.style.backgroundColor = color;
  piece.style.animationDelay = delay + 's';

  // BIGGER Random size
  const size = random(12, 25); // DOUBLED SIZE!
  piece.style.width = size + 'px';
  piece.style.height = size + 'px';

  // Random rotation
  piece.style.setProperty('--rotation', random(0, 360) + 'deg');
  piece.style.setProperty('--end-rotation', random(360, 1080) + 'deg'); // MORE ROTATION!

  // Random drift
  piece.style.setProperty('--drift-x', random(-200, 200) + 'px'); // MORE DRIFT!

  return piece;
}

// ======= Create Emoji Particle - MASSIVE! =======
function createEmojiParticle(emoji, x, y, velocityX, velocityY, delay = 0) {
  const particle = document.createElement('div');
  particle.className = 'emoji-particle';
  particle.textContent = emoji;
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.animationDelay = delay + 's';

  // Store velocity for animation
  particle.style.setProperty('--velocity-x', velocityX + 'px');
  particle.style.setProperty('--velocity-y', velocityY + 'px');
  particle.style.setProperty('--rotation', random(0, 360) + 'deg');
  particle.style.setProperty('--end-rotation', random(1080, 2160) + 'deg'); // CRAZY ROTATION!

  // MASSIVE Random size!
  const isMobile = window.innerWidth < 480;
  const isTablet = window.innerWidth < 768;
  const baseSize = isMobile ? 60 : isTablet ? 80 : 100; // 2X BIGGER!
  const size = random(baseSize * 0.8, baseSize * 1.8); // HUGE VARIATION!
  particle.style.fontSize = size + 'px';

  return particle;
}

// ======= Create Celebration Message - GIGANTIC! =======
function createMessage(text, duration) {
  const message = document.createElement('div');
  message.className = 'celebration-message';
  message.textContent = text;
  message.style.animationDuration = duration + 's';
  return message;
}

// ======= Surfing Celebration (TO SCHOOL) - MEGA EPIC! =======
function surfingCelebration(overlay) {
  const emojis = EMOJI_SETS.toSchool;
  const colors = COLORS.toSchool;
  const w = window.innerWidth;
  const h = window.innerHeight;

  const isMobile = w < 480;
  const isTablet = w < 768;
  const particleCount = isMobile ? 250 : isTablet ? 400 : 500; // 5X MORE!

  // TRIPLE Wave from left!
  for (let wave = 0; wave < 3; wave++) {
    for (let i = 0; i < particleCount / 5; i++) {
      const emoji = randomChoice(emojis);
      const y = random(h * 0.1, h * 0.9);
      const particle = createEmojiParticle(emoji, -150, y, random(400, 700), random(-100, 100), wave * 0.3 + i * 0.015);
      particle.classList.add('wave-left');
      overlay.appendChild(particle);
    }
  }

  // TRIPLE Wave from right!
  for (let wave = 0; wave < 3; wave++) {
    for (let i = 0; i < particleCount / 5; i++) {
      const emoji = randomChoice(emojis);
      const y = random(h * 0.1, h * 0.9);
      const particle = createEmojiParticle(emoji, w + 150, y, random(-700, -400), random(-100, 100), wave * 0.3 + i * 0.015);
      particle.classList.add('wave-right');
      overlay.appendChild(particle);
    }
  }

  // MASSIVE Center burst - MULTIPLE EXPLOSIONS!
  for (let burst = 0; burst < 4; burst++) {
    for (let i = 0; i < particleCount / 8; i++) {
      const emoji = randomChoice(emojis);
      const angle = random(0, Math.PI * 2);
      const velocity = random(300, 700);
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 150; // Bias upward
      const particle = createEmojiParticle(emoji, w / 2, h / 2, vx, vy, burst * 0.2 + i * 0.008);
      particle.classList.add('burst');
      overlay.appendChild(particle);
    }
  }

  // INSANE Confetti amount!
  for (let i = 0; i < particleCount * 2; i++) {
    const x = random(0, w);
    const y = random(-300, h * 0.2);
    const color = randomChoice(colors);
    const piece = createConfettiPiece(x, y, color, random(0, 1));
    overlay.appendChild(piece);
  }

  // MEGA SHAKE!
  screenShake('heavy');
  setTimeout(() => screenShake('medium'), 700);
  setTimeout(() => screenShake('medium'), 1400);
}

// ======= Extreme Sports Celebration (BRING HOME) - NUCLEAR! =======
function extremeSportsCelebration(overlay) {
  const emojis = EMOJI_SETS.bringHome;
  const colors = COLORS.bringHome;
  const w = window.innerWidth;
  const h = window.innerHeight;

  const isMobile = w < 480;
  const isTablet = w < 768;
  const particleCount = isMobile ? 300 : isTablet ? 500 : 700; // 7X MORE!

  // MASSIVE Radial explosion waves from center!
  for (let wave = 0; wave < 5; wave++) {
    for (let i = 0; i < particleCount / 4; i++) {
      const emoji = randomChoice(emojis);
      const angle = (i / (particleCount / 4)) * Math.PI * 2;
      const velocity = random(400, 900);
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      const particle = createEmojiParticle(emoji, w / 2, h / 2, vx, vy, wave * 0.15 + i * 0.003);
      particle.classList.add('explosion');
      overlay.appendChild(particle);
    }
  }

  // TORRENTIAL Confetti rain!
  for (let i = 0; i < particleCount * 2.5; i++) {
    const x = random(0, w);
    const y = random(-400, h * 0.2);
    const color = randomChoice(colors);
    const piece = createConfettiPiece(x, y, color, random(0, 1.5));
    overlay.appendChild(piece);
  }

  // EARTHQUAKE SHAKE!
  screenShake('mega');
  setTimeout(() => screenShake('heavy'), 600);
  setTimeout(() => screenShake('heavy'), 1200);
  setTimeout(() => screenShake('medium'), 1800);
}

// ======= Sports Action Celebration (AFTER SCHOOL) - APOCALYPTIC! =======
function sportsActionCelebration(overlay) {
  const emojis = EMOJI_SETS.afterSchool;
  const colors = COLORS.afterSchool;
  const w = window.innerWidth;
  const h = window.innerHeight;

  const isMobile = w < 480;
  const isTablet = w < 768;
  const particleCount = isMobile ? 400 : isTablet ? 600 : 800; // 5-6X MORE!

  // QUINTUPLE burst sequence - INSANE!
  const burstCount = particleCount * 0.5;

  for (let burstWave = 0; burstWave < 5; burstWave++) {
    for (let i = 0; i < burstCount / 5; i++) {
      const emoji = randomChoice(emojis);
      const angle = random(0, Math.PI * 2);
      const velocity = random(400, 900);
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 200;
      const particle = createEmojiParticle(emoji, w / 2, h / 2, vx, vy, burstWave * 0.25 + i * 0.005);
      particle.classList.add('burst');
      overlay.appendChild(particle);
    }
  }

  // TRIPLE Spiral waves!
  for (let spiral = 0; spiral < 3; spiral++) {
    for (let i = 0; i < particleCount * 0.3; i++) {
      const emoji = randomChoice(emojis);
      const angle = (i / (particleCount * 0.3)) * Math.PI * 6; // Multiple spirals
      const radius = (i / (particleCount * 0.3)) * Math.min(w, h) * 0.5;
      const vx = Math.cos(angle) * random(300, 700);
      const vy = Math.sin(angle) * random(300, 700);
      const particle = createEmojiParticle(emoji, w / 2, h / 2, vx, vy, spiral * 0.4 + i * 0.008);
      particle.classList.add('spiral');
      overlay.appendChild(particle);
    }
  }

  // APOCALYPTIC confetti rain!
  for (let i = 0; i < particleCount * 3; i++) {
    const x = random(0, w);
    const y = random(-500, h * 0.2);
    const color = randomChoice(colors);
    const piece = createConfettiPiece(x, y, color, random(0, 2));
    overlay.appendChild(piece);
  }

  // MAXIMUM DESTRUCTION SHAKE!
  screenShake('mega');
  setTimeout(() => screenShake('mega'), 500);
  setTimeout(() => screenShake('heavy'), 1000);
  setTimeout(() => screenShake('heavy'), 1500);
  setTimeout(() => screenShake('medium'), 2000);
}

// ======= Main Celebration Trigger - ULTRA MODE! =======
let celebrationInProgress = false;

function triggerCelebration(type) {
  // Check if celebration already happened today
  if (hasBeenCelebratedToday(type)) {
    console.log(`Already celebrated ${type} today!`);
    return;
  }

  // Prevent double triggers
  if (celebrationInProgress) return;
  celebrationInProgress = true;

  // Handle reduced motion preference
  if (prefersReducedMotion()) {
    const message = randomChoice(MESSAGES[type]);
    alert(message); // Simple fallback
    markAsCelebrated(type);
    celebrationInProgress = false;
    return;
  }

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'celebration-overlay';
  document.body.appendChild(overlay);

  // Trigger appropriate celebration
  if (type === 'toSchool') {
    surfingCelebration(overlay);
  } else if (type === 'bringHome') {
    extremeSportsCelebration(overlay);
  } else if (type === 'afterSchool') {
    sportsActionCelebration(overlay);
  }

  // Show message - LONGER!
  const message = randomChoice(MESSAGES[type]);
  const duration = type === 'afterSchool' ? 9 : 8; // LONGER!
  const messageEl = createMessage(message, duration);
  overlay.appendChild(messageEl);

  // EPIC FLASHING BACKGROUND PULSES!
  const pulseOverlay = document.createElement('div');
  pulseOverlay.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none;
    z-index: 9998;
    background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%);
    animation: epic-pulse 0.8s ease-in-out infinite;
  `;
  document.body.appendChild(pulseOverlay);

  // Mark as celebrated
  markAsCelebrated(type);

  // Clean up after animation - MUCH LONGER!
  const cleanupTime = (type === 'afterSchool' ? 12000 : 10000);
  setTimeout(() => {
    overlay.remove();
    pulseOverlay.remove();
    celebrationInProgress = false;
  }, cleanupTime);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { triggerCelebration };
}
