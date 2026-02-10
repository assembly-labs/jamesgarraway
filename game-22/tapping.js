// tapping.js — Tapping mini-game between questions
const TappingGame = (() => {
  let area = null;
  let scoreDisplay = null;
  let timerBar = null;
  let tapScore = 0;
  let targets = [];
  let spawnInterval = null;
  let gameTimer = null;
  let onComplete = null;
  let active = false;
  let targetId = 0;
  let cachedRect = null;
  let timerStartTime = 0;
  let timerDuration = 0;

  const SHAPES = ['circle', 'star', 'diamond', 'hexagon'];
  const COLORS = [
    '#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF',
    '#FF8B94', '#7EC8E3', '#F7DC6F', '#BB8FCE',
    '#F0B27A', '#82E0AA'
  ];

  function init(areaEl, scoreEl, timerEl) {
    area = areaEl;
    scoreDisplay = scoreEl;
    timerBar = timerEl;
  }

  function start(duration, callback) {
    tapScore = 0;
    targets = [];
    timerDuration = duration;
    onComplete = callback;
    active = true;
    targetId = 0;
    area.innerHTML = '';
    updateScore();
    SoundFX.tappingStart();

    // Cache area dimensions for the tapping phase
    cachedRect = area.getBoundingClientRect();

    // Spawn targets periodically
    spawnInterval = setInterval(spawnTarget, 700);
    spawnTarget(); // immediate first

    // Wall-clock countdown
    timerStartTime = performance.now();
    gameTimer = setInterval(() => {
      const elapsed = performance.now() - timerStartTime;
      const pct = Math.max(0, 1 - elapsed / timerDuration);
      timerBar.style.transform = 'scaleX(' + pct + ')';
      if (elapsed >= timerDuration) {
        stop();
      }
    }, 50);
  }

  function stop() {
    active = false;
    clearInterval(spawnInterval);
    clearInterval(gameTimer);
    // Clear target timeouts and fade out remaining targets
    targets.forEach(t => {
      clearTimeout(t.timeout);
      if (t.el && t.el.parentNode) {
        t.el.classList.add('target-fade');
      }
    });
    targets = [];
    // Reset timer bar for next round
    timerBar.style.transform = 'scaleX(1)';
    setTimeout(() => {
      if (onComplete) onComplete(tapScore);
    }, 400);
  }

  function spawnTarget() {
    if (!active) return;
    const id = ++targetId;
    const size = 44 + Math.random() * 30;
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const rect = cachedRect;
    let x, y;
    let attempts = 0;

    // Try to avoid overlapping existing targets
    do {
      x = Math.random() * (rect.width - size - 20) + 10;
      y = Math.random() * (rect.height - size - 20) + 10;
      attempts++;
    } while (attempts < 10 && hasOverlap(x, y, size));

    const lifetime = 1200 + Math.random() * 800;

    const el = document.createElement('div');
    el.className = 'tap-target tap-shape-' + shape;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.setProperty('--target-color', color);
    el.dataset.id = id;

    // Touch / click handler
    const handler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!active) return;
      hitTarget(id, el);
    };
    el.addEventListener('pointerdown', handler);

    area.appendChild(el);
    // Trigger transition by deferring class addition to next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (el.parentNode) el.classList.add('target-visible');
      });
    });

    const entry = { id, el, timeout: null, x, y, size };
    targets.push(entry);

    // Auto-remove after lifetime
    entry.timeout = setTimeout(() => {
      if (!active) return;
      missTarget(id, el);
    }, lifetime);
  }

  function hasOverlap(x, y, size) {
    const cx = x + size / 2;
    const cy = y + size / 2;
    for (const t of targets) {
      const tx = t.x + t.size / 2;
      const ty = t.y + t.size / 2;
      const minDist = (size + t.size) / 2;
      const dx = cx - tx;
      const dy = cy - ty;
      if (dx * dx + dy * dy < minDist * minDist) return true;
    }
    return false;
  }

  function hitTarget(id, el) {
    const idx = targets.findIndex(t => t.id === id);
    if (idx === -1) return;
    clearTimeout(targets[idx].timeout);
    targets.splice(idx, 1);

    tapScore += 10;
    updateScore();
    SoundFX.tapHit();

    // Pop animation
    el.classList.remove('target-visible');
    el.classList.add('target-hit');
    showRipple(el);
    showFloatingPoints(el, '+10');
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
  }

  function missTarget(id, el) {
    const idx = targets.findIndex(t => t.id === id);
    if (idx === -1) return;
    targets.splice(idx, 1);

    el.classList.remove('target-visible');
    el.classList.add('target-miss');
    SoundFX.tapMiss();
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
  }

  function showRipple(el) {
    const ripple = document.createElement('div');
    ripple.className = 'tap-ripple';
    ripple.style.left = el.style.left;
    ripple.style.top = el.style.top;
    ripple.style.width = el.style.width;
    ripple.style.height = el.style.height;
    area.appendChild(ripple);
    setTimeout(() => { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 500);
  }

  function showFloatingPoints(el, text) {
    const fp = document.createElement('div');
    fp.className = 'floating-points';
    fp.textContent = text;
    fp.style.left = (parseFloat(el.style.left) + parseFloat(el.style.width) / 2) + 'px';
    fp.style.top = el.style.top;
    area.appendChild(fp);
    setTimeout(() => { if (fp.parentNode) fp.parentNode.removeChild(fp); }, 800);
  }

  function updateScore() {
    if (scoreDisplay) scoreDisplay.textContent = tapScore;
  }

  function getScore() {
    return tapScore;
  }

  return { init, start, stop, getScore };
})();
