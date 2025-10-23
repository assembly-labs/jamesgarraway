// ======= Team Color Themes =======
const teamColors = {
  'Philadelphia Eagles': { primary:'#004C54', secondary:'#A5ACAF', accent:'#00C9B7', background:'#0A1612', cardBg:'#1A2822', text:'#E8F5F3' },
  'Green Bay Packers':  { primary:'#203731', secondary:'#FFB612', accent:'#FFD24D', background:'#0D1410', cardBg:'#1C2A1F', text:'#FFF8E7' },
  'Baltimore Ravens':   { primary:'#241773', secondary:'#9E7C0C', accent:'#D3BC8D', background:'#0E0A1A', cardBg:'#1C1528', text:'#F0EBFF' },
  'Pittsburgh Steelers':{ primary:'#000000', secondary:'#FFB612', accent:'#C60C30', background:'#0A0A0A', cardBg:'#1A1A1A', text:'#FFF8E7' },
  'Philadelphia Union': { primary:'#041E42', secondary:'#B1976B', accent:'#F0B726', background:'#020D1A', cardBg:'#0A1929', text:'#F5F3E8' },
  'Sith':               { primary:'#000000', secondary:'#CC0000', accent:'#FF0000', background:'#0D0D0D', cardBg:'#1A1A1A', text:'#E8E8E8' },
  'Boba Fett':          { primary:'#4B6B50', secondary:'#7A2C27', accent:'#D9A628', background:'#1C1C1C', cardBg:'#2A2A2A', text:'#FFFFFF' }
};
const teamNames = Object.keys(teamColors);

// ======= Theme Management =======
const setThemeVars = (team) => {
  const c = teamColors[team];
  const root = document.documentElement;
  root.style.setProperty('--primary', c.primary);
  root.style.setProperty('--secondary', c.secondary);
  root.style.setProperty('--accent', c.accent);
  root.style.setProperty('--background', c.background);
  root.style.setProperty('--cardBg', c.cardBg);
  root.style.setProperty('--text', c.text);
};

// ======= Sith irregular glow driver (per-widget) =======
const sithState = {
  active: false, rafId: null, widgets: [], map: new WeakMap()
};
function initSithWidget(el) {
  if (!sithState.map.has(el)) {
    const seed = 0.80 + Math.random() * 0.15;
    sithState.map.set(el, { ema: seed, burst: 0, last: performance.now() });
    el.style.setProperty('--sithI', seed.toFixed(3));
    el.classList.add('sith-glow');
  }
}
function clearSithWidget(el) {
  el.classList.remove('sith-glow');
  el.style.removeProperty('--sithI');
  sithState.map.delete(el);
}
const SITH_CONFIG = {
  baseIntensity: 0.88, jitterAmount: 0.14, ema: 0.18,
  burstChance: 0.035, burstBoost: 0.38, burstHalfLife: 120,
  minInterval: 14, maxIntensity: 1.25, minIntensity: 0.70
};
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
function randStep(amount) {
  const r = Math.random();
  const mag = r < 0.85 ? (Math.random() * 0.5) : (0.5 + Math.random() * 1.0);
  const sign = Math.random() < 0.55 ? -1 : 1;
  return sign * mag * amount;
}
function sithTick(ts) {
  if (!sithState.active) return;
  sithState.rafId = requestAnimationFrame(sithTick);
  sithState.widgets.forEach(el => {
    const st = sithState.map.get(el); if (!st) return;
    const dt = ts - st.last || 16; if (dt < SITH_CONFIG.minInterval) return;
    st.last = ts;
    if (Math.random() < SITH_CONFIG.burstChance) {
      st.burst += SITH_CONFIG.burstBoost * (0.6 + Math.random() * 0.6);
    }
    const half = Math.max(40, SITH_CONFIG.burstHalfLife);
    st.burst *= Math.pow(0.5, dt / half);
    const noise = SITH_CONFIG.baseIntensity + randStep(SITH_CONFIG.jitterAmount);
    st.ema = (1 - SITH_CONFIG.ema) * noise + SITH_CONFIG.ema * st.ema;
    let intensity = st.ema + st.burst;
    intensity = clamp(intensity, SITH_CONFIG.minIntensity, SITH_CONFIG.maxIntensity);
    el.style.setProperty('--sithI', intensity.toFixed(3));
  });
}
function applySith(enable) {
  const els = document.querySelectorAll('.sith-optional');
  if (enable) {
    els.forEach(initSithWidget);
    sithState.widgets = Array.from(els);
    if (!sithState.active) {
      sithState.active = true;
      sithState.rafId = requestAnimationFrame(sithTick);
    }
  } else {
    sithState.active = false;
    if (sithState.rafId) cancelAnimationFrame(sithState.rafId);
    sithState.rafId = null;
    sithState.widgets.forEach(clearSithWidget);
    sithState.widgets = [];
  }
}

// ======= Boba Fett: Background & Foreground blaster manager (RGB + sparks) =======
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const blaster = {
  active: false,
  bg: document.getElementById('blaster-bg'),
  fg: document.getElementById('blaster-fg'),
  timers: { bg: null, fg: null, spark: null },
  pool: [],
  config: {
    // Background cadence
    spawnEveryMs: [60, 180],
    maxBolts: 80,
    speedPxPerSec: [900, 1800],      // punchier
    thicknessPx: [1.5, 3.5],
    lengthPx: [90, 200],             // longer beams
    angleJitterDeg: [-6, 6],
    fadeInMs: 60,
    fadeOutMs: 120,
    blurPx: [0.4, 1.1],
    leftBias: 0.5,

    // Foreground "top z-axis" bolt cadence (every 2–5 seconds)
    fgEveryMs: [2000, 5000],
    fgSpeedPxPerSec: [900, 1800],
    fgLengthPx: [120, 240],
    fgThicknessPx: [2, 4],
    fgBlurPx: [0.6, 1.4],

    // Sparks
    sparkEveryMs: [120, 380],
    sparkMax: 120,
    sparkSizePx: [2, 5],
  },
  palettes: {
    // Strict RGB only
    reds:   ['#ff2a2a', '#ff3b30', '#ff4d2a'],
    greens: ['#18ff3b', '#2aff2a', '#00ff66'],
    blues:  ['#4fc3f7', '#00bcd4', '#7dd3fc']
  }
};
function rand(min, max) { return min + Math.random() * (max - min); }
function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }
function getBoltFromPool() { return blaster.pool.pop() || document.createElement('div'); }
function recycleBolt(node) { node.remove(); blaster.pool.push(node); }

function setBeamGradientByDirection(el, dirLeftToRight) {
  el.style.background = dirLeftToRight
    ? 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, currentColor 35%, rgba(0,0,0,0) 100%)'
    : 'linear-gradient(270deg, rgba(255,255,255,0.95) 0%, currentColor 35%, rgba(0,0,0,0) 100%)';
}

function spawnBolt(container, opts) {
  if (!blaster.active) return;
  const vw = container.clientWidth || window.innerWidth;
  const vh = container.clientHeight || window.innerHeight;

  const dirLeftToRight = Math.random() < (opts.leftBias ?? 0.5);
  const y = Math.random() * vh;
  const length = rand(...opts.lengthPx);
  const thickness = rand(...opts.thicknessPx);
  const angle = rand(...opts.angleJitterDeg);
  const blur = rand(...opts.blurPx) * 1.25; // stronger smear
  const speed = rand(...opts.speedPxPerSec);
  const color = pick(opts.colors);

  const bolt = getBoltFromPool();
  bolt.className = 'bolt';
  bolt.style.color = color;
  bolt.style.height = thickness + 'px';
  bolt.style.width = length + 'px';
  bolt.style.filter = `saturate(1.5) blur(${blur}px)`;
  setBeamGradientByDirection(bolt, dirLeftToRight);

  const startX = dirLeftToRight ? -length - 20 : vw + 20;
  const endX   = dirLeftToRight ? vw + 20 : -length - 20;

  bolt.style.transform = `translate3d(${startX}px, ${y}px, 0) rotate(${angle}deg)`;
  bolt.style.opacity = '0';
  container.appendChild(bolt);

  const distance = Math.abs(endX - startX);
  const totalMs = (distance / speed) * 1000;
  const start = performance.now();

  function step(now) {
    if (!blaster.active) { recycleBolt(bolt); return; }
    const t = now - start;
    const p = t / totalMs;
    if (p >= 1) { recycleBolt(bolt); return; }

    const x = startX + (endX - startX) * p;
    bolt.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;

    let alpha = 1;
    if (t < opts.fadeInMs) alpha = t / opts.fadeInMs;
    else if (totalMs - t < opts.fadeOutMs) alpha = (totalMs - t) / opts.fadeOutMs;
    bolt.style.opacity = alpha.toFixed(3);

    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function spawnSpark() {
  if (!blaster.active) return;
  const vw = blaster.bg.clientWidth || window.innerWidth;
  const vh = blaster.bg.clientHeight || window.innerHeight;

  const node = document.createElement('div');
  node.className = 'spark';

  // random position
  const x = Math.random() * vw;
  const y = Math.random() * vh;

  // random small drift for the keyframe var()
  const dx = (Math.random() * 14 - 7).toFixed(1) + 'px';
  const dy = (Math.random() * 14 - 7).toFixed(1) + 'px';
  node.style.setProperty('--sx', dx);
  node.style.setProperty('--sy', dy);

  // random color among RGB
  const pool = [
    ...blaster.palettes.blues,
    ...blaster.palettes.greens,
    ...blaster.palettes.reds
  ];
  node.style.color = pick(pool);

  // random size
  const s = rand(...blaster.config.sparkSizePx);
  node.style.width = s + 'px';
  node.style.height = s + 'px';

  node.style.transform = `translate3d(${x}px, ${y}px, 0)`;

  blaster.bg.appendChild(node);

  // cleanup after animation completes
  setTimeout(() => node.remove(), 650);
}

function scheduleBgSpawn() {
  if (!blaster.active) return;
  const colors = [
    ...blaster.palettes.blues,
    ...blaster.palettes.greens,
    ...blaster.palettes.reds
  ];
  const opts = {
    colors,
    speedPxPerSec: blaster.config.speedPxPerSec,
    thicknessPx: blaster.config.thicknessPx,
    lengthPx: blaster.config.lengthPx,
    angleJitterDeg: blaster.config.angleJitterDeg,
    fadeInMs: blaster.config.fadeInMs,
    fadeOutMs: blaster.config.fadeOutMs,
    blurPx: blaster.config.blurPx,
    leftBias: blaster.config.leftBias
  };
  // safety cap
  if (blaster.bg.childElementCount < blaster.config.maxBolts) {
    spawnBolt(blaster.bg, opts);
  }
  const delay = rand(...blaster.config.spawnEveryMs);
  blaster.timers.bg = setTimeout(scheduleBgSpawn, delay);
}

function scheduleFgBurst() {
  if (!blaster.active) return;
  const colors = [
    ...blaster.palettes.blues,
    ...blaster.palettes.greens,
    ...blaster.palettes.reds
  ];
  const opts = {
    colors,
    speedPxPerSec: blaster.config.fgSpeedPxPerSec,
    thicknessPx: blaster.config.fgThicknessPx,
    lengthPx: blaster.config.fgLengthPx,
    angleJitterDeg: blaster.config.angleJitterDeg,
    fadeInMs: blaster.config.fadeInMs,
    fadeOutMs: blaster.config.fadeOutMs,
    blurPx: blaster.config.fgBlurPx,
    leftBias: Math.random() < 0.5 ? 0.3 : 0.7 // slight asymmetry
  };
  spawnBolt(blaster.fg, opts);
  const delay = rand(...blaster.config.fgEveryMs); // every 2–5s
  blaster.timers.fg = setTimeout(scheduleFgBurst, delay);
}

function scheduleSpark() {
  if (!blaster.active) return;
  // soft cap
  if (blaster.bg.querySelectorAll('.spark').length < blaster.config.sparkMax) {
    spawnSpark();
    if (Math.random() < 0.15) spawnSpark(); // occasional multi-pop
  }
  const delay = rand(...blaster.config.sparkEveryMs);
  blaster.timers.spark = setTimeout(scheduleSpark, delay);
}

function startBlasters() {
  if (blaster.active || prefersReducedMotion) return;
  blaster.active = true;
  scheduleBgSpawn();
  scheduleFgBurst(); // foreground bolt every 2–5 seconds
  scheduleSpark();

  // front-load a few background bolts so it feels alive instantly
  const pool = [
    ...blaster.palettes.blues,
    ...blaster.palettes.greens,
    ...blaster.palettes.reds
  ];
  for (let i = 0; i < 10; i++) spawnBolt(blaster.bg, {
    colors: pool,
    speedPxPerSec: blaster.config.speedPxPerSec,
    thicknessPx: blaster.config.thicknessPx,
    lengthPx: blaster.config.lengthPx,
    angleJitterDeg: blaster.config.angleJitterDeg,
    fadeInMs: blaster.config.fadeInMs,
    fadeOutMs: blaster.config.fadeOutMs,
    blurPx: blaster.config.blurPx,
    leftBias: blaster.config.leftBias
  });
}

function stopBlasters() {
  blaster.active = false;
  clearTimeout(blaster.timers.bg); blaster.timers.bg = null;
  clearTimeout(blaster.timers.fg); blaster.timers.fg = null;
  clearTimeout(blaster.timers.spark); blaster.timers.spark = null;
  // Clean up existing nodes
  blaster.bg.querySelectorAll('.bolt').forEach(n => recycleBolt(n));
  blaster.fg.querySelectorAll('.bolt').forEach(n => recycleBolt(n));
  blaster.bg.querySelectorAll('.spark').forEach(n => n.remove());
}
