// minigames.js — Three motor-skill mini-games: DualTargetBlitz, PathTracer, ReactionSpeed
// All follow the same interface: init(area, scoreEl, timerBar), start(duration, callback), stop()

// ===== 1. DUAL TARGET BLITZ =====
const DualTargetBlitz = (() => {
  let area, scoreDisplay, timerBar;
  let score = 0;
  let active = false;
  let gameTimer = null;
  let pairTimeout = null;
  let timerStartTime = 0;
  let timerDuration = 0;
  let onComplete = null;
  let currentPair = [];
  let firstTap = null;
  let cachedRect = null;

  const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#7EC8E3', '#BB8FCE', '#82E0AA', '#F0B27A'];
  const PAIR_WINDOW = 300; // ms to tap both
  const PERFECT_WINDOW = 100;
  const PAIR_LIFETIME = 2000;

  function init(areaEl, scoreEl, timerEl) {
    area = areaEl;
    scoreDisplay = scoreEl;
    timerBar = timerEl;
  }

  function start(duration, callback) {
    cleanup();
    score = 0;
    active = true;
    timerDuration = duration;
    onComplete = callback;
    area.innerHTML = '';
    updateScore();
    SoundFX.tappingStart();
    cachedRect = area.getBoundingClientRect();

    timerStartTime = performance.now();
    gameTimer = setInterval(() => {
      const elapsed = performance.now() - timerStartTime;
      const pct = Math.max(0, 1 - elapsed / timerDuration);
      timerBar.style.transform = 'scaleX(' + pct + ')';
      if (elapsed >= timerDuration) stop();
    }, 50);

    spawnPair();
  }

  function cleanup() {
    active = false;
    clearInterval(gameTimer);
    clearTimeout(pairTimeout);
    currentPair.forEach(p => { if (p.el && p.el.parentNode) p.el.remove(); });
    currentPair = [];
    firstTap = null;
  }

  function stop() {
    cleanup();
    timerBar.style.transform = 'scaleX(1)';
    setTimeout(() => { if (onComplete) onComplete(score); }, 400);
  }

  function spawnPair() {
    if (!active) return;
    currentPair.forEach(p => { if (p.el && p.el.parentNode) p.el.remove(); });
    currentPair = [];
    firstTap = null;

    const rect = cachedRect;
    const size = 60;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    for (let i = 0; i < 2; i++) {
      const x = Math.random() * (rect.width - size - 20) + 10;
      const y = Math.random() * (rect.height - size - 20) + 10;
      const el = document.createElement('div');
      el.className = 'dual-target';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.setProperty('--target-color', color);
      const idx = i;
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!active) return;
        handleTap(idx);
      });
      area.appendChild(el);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { if (el.parentNode) el.classList.add('dual-visible'); });
      });
      currentPair.push({ el, idx, tapped: false });
    }

    pairTimeout = setTimeout(() => {
      if (!active) return;
      // Pair expired
      currentPair.forEach(p => {
        if (p.el && p.el.parentNode) {
          p.el.classList.remove('dual-visible');
          p.el.classList.add('dual-miss');
          setTimeout(() => { if (p.el.parentNode) p.el.remove(); }, 300);
        }
      });
      SoundFX.tapMiss();
      setTimeout(() => spawnPair(), 400);
    }, PAIR_LIFETIME);
  }

  function handleTap(idx) {
    const target = currentPair[idx];
    if (!target || target.tapped) return;
    target.tapped = true;
    target.el.classList.add('dual-tapped');

    if (firstTap === null) {
      firstTap = { idx, time: performance.now() };
    } else {
      // Second tap — check timing
      const gap = performance.now() - firstTap.time;
      clearTimeout(pairTimeout);

      if (gap <= PAIR_WINDOW) {
        // Success!
        const pts = gap <= PERFECT_WINDOW ? 35 : 25;
        score += pts;
        updateScore();
        SoundFX.tapHit();

        currentPair.forEach(p => {
          p.el.classList.remove('dual-visible', 'dual-tapped');
          p.el.classList.add('dual-success');
          showFloating(p.el, gap <= PERFECT_WINDOW ? '+35' : '+25');
        });
        setTimeout(() => {
          currentPair.forEach(p => { if (p.el.parentNode) p.el.remove(); });
          spawnPair();
        }, 400);
      } else {
        // Too slow between taps
        SoundFX.tapMiss();
        currentPair.forEach(p => {
          p.el.classList.remove('dual-visible', 'dual-tapped');
          p.el.classList.add('dual-miss');
        });
        setTimeout(() => {
          currentPair.forEach(p => { if (p.el.parentNode) p.el.remove(); });
          spawnPair();
        }, 400);
      }
    }
  }

  function showFloating(el, text) {
    const fp = document.createElement('div');
    fp.className = 'floating-points';
    fp.textContent = text;
    fp.style.left = (parseFloat(el.style.left) + parseFloat(el.style.width) / 2) + 'px';
    fp.style.top = el.style.top;
    area.appendChild(fp);
    setTimeout(() => { if (fp.parentNode) fp.remove(); }, 800);
  }

  function updateScore() {
    if (scoreDisplay) scoreDisplay.textContent = score;
  }

  return { init, start, stop, getScore: () => score };
})();

// ===== 2. PATH TRACER =====
const PathTracer = (() => {
  let area, scoreDisplay, timerBar;
  let score = 0;
  let active = false;
  let gameTimer = null;
  let timerStartTime = 0;
  let timerDuration = 0;
  let onComplete = null;
  let canvas = null;
  let ctx = null;
  let pathPoints = [];
  let segments = [];
  let currentSegment = 0;
  let pathsCompleted = 0;
  let cachedRect = null;

  const SEGMENT_HIT_RADIUS = 30;

  function init(areaEl, scoreEl, timerEl) {
    area = areaEl;
    scoreDisplay = scoreEl;
    timerBar = timerEl;
  }

  function start(duration, callback) {
    cleanup();
    score = 0;
    active = true;
    timerDuration = duration;
    onComplete = callback;
    pathsCompleted = 0;
    area.innerHTML = '';
    updateScore();
    SoundFX.tappingStart();
    cachedRect = area.getBoundingClientRect();

    // Create canvas
    canvas = document.createElement('canvas');
    canvas.className = 'path-canvas';
    canvas.width = cachedRect.width;
    canvas.height = cachedRect.height;
    area.appendChild(canvas);
    ctx = canvas.getContext('2d');

    // Touch/click handler on the area
    area.addEventListener('pointerdown', handleTap);
    area.addEventListener('pointermove', handleMove);

    timerStartTime = performance.now();
    gameTimer = setInterval(() => {
      const elapsed = performance.now() - timerStartTime;
      const pct = Math.max(0, 1 - elapsed / timerDuration);
      timerBar.style.transform = 'scaleX(' + pct + ')';
      if (elapsed >= timerDuration) stop();
    }, 50);

    generatePath();
    drawPath();
  }

  function cleanup() {
    active = false;
    clearInterval(gameTimer);
    if (area) {
      area.removeEventListener('pointerdown', handleTap);
      area.removeEventListener('pointermove', handleMove);
    }
    pathPoints = [];
    segments = [];
    currentSegment = 0;
  }

  function stop() {
    cleanup();
    timerBar.style.transform = 'scaleX(1)';
    setTimeout(() => { if (onComplete) onComplete(score); }, 400);
  }

  function generatePath() {
    const w = cachedRect.width;
    const h = cachedRect.height;
    const complexity = Math.min(pathsCompleted + 3, 8); // 3-8 points
    pathPoints = [];
    segments = [];
    currentSegment = 0;

    // Generate zigzag/random path points
    const margin = 40;
    for (let i = 0; i < complexity; i++) {
      const t = i / (complexity - 1);
      const x = margin + (w - 2 * margin) * t;
      const yBase = h * 0.3 + (h * 0.4) * (i % 2 === 0 ? -0.3 : 0.3);
      const yJitter = (Math.random() - 0.5) * h * 0.3;
      const y = Math.max(margin, Math.min(h - margin, yBase + yJitter));
      pathPoints.push({ x, y });
    }

    // Build segments between consecutive points
    for (let i = 0; i < pathPoints.length; i++) {
      segments.push({ point: pathPoints[i], hit: false });
    }
  }

  function drawPath() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw dashed path line
    ctx.strokeStyle = 'rgba(162, 155, 254, 0.4)';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    pathPoints.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw segment dots
    segments.forEach((seg, i) => {
      ctx.beginPath();
      ctx.arc(seg.point.x, seg.point.y, seg.hit ? 12 : 16, 0, Math.PI * 2);
      if (seg.hit) {
        ctx.fillStyle = '#00e676';
        ctx.shadowColor = '#00e676';
        ctx.shadowBlur = 10;
      } else if (i === currentSegment) {
        ctx.fillStyle = '#ffd700';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 15;
      } else if (i < currentSegment) {
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = 'rgba(162, 155, 254, 0.5)';
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      // START/END labels
      if (i === 0 && !seg.hit) {
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 11px -apple-system, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('START', seg.point.x, seg.point.y - 22);
      }
      if (i === segments.length - 1 && !seg.hit) {
        ctx.fillStyle = '#a29bfe';
        ctx.font = 'bold 11px -apple-system, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('END', seg.point.x, seg.point.y - 22);
      }
    });
  }

  function handleTap(e) {
    if (!active) return;
    e.preventDefault();
    checkHit(e);
  }

  function handleMove(e) {
    if (!active || e.pressure === 0) return;
    e.preventDefault();
    checkHit(e);
  }

  function checkHit(e) {
    const rect = cachedRect;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentSegment >= segments.length) return;

    const seg = segments[currentSegment];
    const dx = x - seg.point.x;
    const dy = y - seg.point.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= SEGMENT_HIT_RADIUS) {
      seg.hit = true;
      score += 2;
      SoundFX.tapHit();
      currentSegment++;

      // Check if path complete
      if (currentSegment >= segments.length) {
        score += 50;
        pathsCompleted++;
        updateScore();
        drawPath();
        // Flash completion
        if (canvas) {
          canvas.classList.add('path-complete');
          setTimeout(() => {
            if (canvas) canvas.classList.remove('path-complete');
            if (active) {
              generatePath();
              drawPath();
            }
          }, 600);
        }
      } else {
        updateScore();
        drawPath();
      }
    }
  }

  function updateScore() {
    if (scoreDisplay) scoreDisplay.textContent = score;
  }

  return { init, start, stop, getScore: () => score };
})();

// ===== 3. REACTION SPEED TEST =====
const ReactionSpeed = (() => {
  let area, scoreDisplay, timerBar;
  let score = 0;
  let active = false;
  let gameTimer = null;
  let spawnTimeout = null;
  let disappearTimeout = null;
  let timerStartTime = 0;
  let timerDuration = 0;
  let onComplete = null;
  let currentTarget = null;
  let targetAppearedAt = 0;
  let cachedRect = null;

  const WINDOW = 500; // ms before target disappears
  const MIN_DELAY = 500;
  const MAX_DELAY = 2000;

  function init(areaEl, scoreEl, timerEl) {
    area = areaEl;
    scoreDisplay = scoreEl;
    timerBar = timerEl;
  }

  function start(duration, callback) {
    cleanup();
    score = 0;
    active = true;
    timerDuration = duration;
    onComplete = callback;
    area.innerHTML = '';
    updateScore();
    SoundFX.tappingStart();
    cachedRect = area.getBoundingClientRect();

    // Show "Get ready..." message
    const msg = document.createElement('div');
    msg.className = 'reaction-message';
    msg.textContent = 'Get ready...';
    area.appendChild(msg);

    timerStartTime = performance.now();
    gameTimer = setInterval(() => {
      const elapsed = performance.now() - timerStartTime;
      const pct = Math.max(0, 1 - elapsed / timerDuration);
      timerBar.style.transform = 'scaleX(' + pct + ')';
      if (elapsed >= timerDuration) stop();
    }, 50);

    scheduleNext();
  }

  function cleanup() {
    active = false;
    clearInterval(gameTimer);
    clearTimeout(spawnTimeout);
    clearTimeout(disappearTimeout);
    currentTarget = null;
  }

  function stop() {
    cleanup();
    timerBar.style.transform = 'scaleX(1)';
    setTimeout(() => { if (onComplete) onComplete(score); }, 400);
  }

  function scheduleNext() {
    if (!active) return;
    const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
    spawnTimeout = setTimeout(() => {
      if (!active) return;
      spawnTarget();
    }, delay);
  }

  function spawnTarget() {
    if (!active) return;
    // Clear any existing message
    const msgs = area.querySelectorAll('.reaction-message');
    msgs.forEach(m => m.remove());

    const rect = cachedRect;
    const size = 70;
    const x = Math.random() * (rect.width - size - 20) + 10;
    const y = Math.random() * (rect.height - size - 20) + 10;

    const el = document.createElement('div');
    el.className = 'reaction-target';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = x + 'px';
    el.style.top = y + 'px';

    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!active || !currentTarget) return;
      handleHit(el);
    });

    area.appendChild(el);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { if (el.parentNode) el.classList.add('reaction-visible'); });
    });

    currentTarget = el;
    targetAppearedAt = performance.now();

    // Auto-disappear
    disappearTimeout = setTimeout(() => {
      if (!active || !currentTarget) return;
      handleMiss(el);
    }, WINDOW);
  }

  function handleHit(el) {
    clearTimeout(disappearTimeout);
    const reactionTime = performance.now() - targetAppearedAt;
    let pts = 0;
    let label = '';

    if (reactionTime < 200) { pts = 50; label = 'LIGHTNING! +50'; }
    else if (reactionTime < 300) { pts = 35; label = 'FAST! +35'; }
    else if (reactionTime < 400) { pts = 20; label = 'GOOD +20'; }
    else { pts = 10; label = 'OK +10'; }

    score += pts;
    updateScore();
    SoundFX.tapHit();

    el.classList.remove('reaction-visible');
    el.classList.add('reaction-hit');

    // Show reaction time
    const fp = document.createElement('div');
    fp.className = 'floating-points';
    fp.textContent = label;
    fp.style.left = (parseFloat(el.style.left) + parseFloat(el.style.width) / 2) + 'px';
    fp.style.top = el.style.top;
    area.appendChild(fp);
    setTimeout(() => { if (fp.parentNode) fp.remove(); }, 800);

    // Show ms
    const ms = document.createElement('div');
    ms.className = 'reaction-ms';
    ms.textContent = Math.round(reactionTime) + 'ms';
    ms.style.left = (parseFloat(el.style.left) + parseFloat(el.style.width) / 2) + 'px';
    ms.style.top = (parseFloat(el.style.top) + parseFloat(el.style.height)) + 'px';
    area.appendChild(ms);
    setTimeout(() => { if (ms.parentNode) ms.remove(); }, 800);

    currentTarget = null;
    setTimeout(() => { if (el.parentNode) el.remove(); }, 350);
    scheduleNext();
  }

  function handleMiss(el) {
    SoundFX.tapMiss();
    currentTarget = null;
    el.classList.remove('reaction-visible');
    el.classList.add('reaction-miss');

    const fp = document.createElement('div');
    fp.className = 'reaction-message reaction-too-slow';
    fp.textContent = 'Too slow!';
    fp.style.left = (parseFloat(el.style.left) + parseFloat(el.style.width) / 2) + 'px';
    fp.style.top = el.style.top;
    area.appendChild(fp);
    setTimeout(() => { if (fp.parentNode) fp.remove(); }, 600);

    setTimeout(() => { if (el.parentNode) el.remove(); }, 300);
    scheduleNext();
  }

  function updateScore() {
    if (scoreDisplay) scoreDisplay.textContent = score;
  }

  return { init, start, stop, getScore: () => score };
})();

// ===== MINI-GAME ROUTER =====
const MiniGameRouter = (() => {
  const games = [
    { module: null, name: 'Tap the Targets!', subtitle: 'Tap as many as you can for bonus points', ref: 'TappingGame' },
    { module: DualTargetBlitz, name: 'Dual Target Blitz!', subtitle: 'Tap both circles within 300ms' },
    { module: PathTracer, name: 'Path Tracer!', subtitle: 'Tap along the path from START to END' },
    { module: ReactionSpeed, name: 'Reaction Speed!', subtitle: 'Tap the circle as fast as you can' },
  ];
  let index = 0;
  let titleEl = null;
  let subtitleEl = null;

  function init(areaEl, scoreEl, timerEl, titleElement, subtitleElement) {
    titleEl = titleElement;
    subtitleEl = subtitleElement;
    // TappingGame is initialized separately, set its reference
    games[0].module = typeof TappingGame !== 'undefined' ? TappingGame : null;
    // Init all other games with same DOM elements
    games.forEach(g => {
      if (g.module && g.ref !== 'TappingGame') {
        g.module.init(areaEl, scoreEl, timerEl);
      }
    });
  }

  function startNext(duration, callback) {
    const game = games[index % games.length];
    index++;

    // Update header text
    if (titleEl) titleEl.textContent = game.name;
    if (subtitleEl) subtitleEl.textContent = game.subtitle;

    game.module.start(duration, callback);
  }

  function reset() {
    index = 0;
  }

  function getCurrentName() {
    const i = (index - 1 + games.length) % games.length;
    return games[i].name;
  }

  return { init, startNext, reset, getCurrentName };
})();
