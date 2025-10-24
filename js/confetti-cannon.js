// ========================================
// 🎊 CONFETTI CANNON SYSTEM
// Realistic gravity-based confetti blasts from bottom of screen
// 5 cannons with varying power for dramatic effect
// ========================================

// ======= Themed Color Palettes =======
const CONFETTI_COLORS = {
  toSchool: [
    '#00BFFF',  // Deep sky blue (ocean)
    '#1E90FF',  // Dodger blue (water)
    '#00CED1',  // Turquoise (surf)
    '#FF6347',  // Tomato (sunset)
    '#FFD700',  // Gold (sun)
    '#87CEEB',  // Sky blue
    '#4682B4'   // Steel blue (waves)
  ],
  bringHome: [
    '#FF0000',  // Red (fire)
    '#FF4500',  // Orange red (flames)
    '#FFD700',  // Gold (lightning)
    '#FFFFFF',  // White (sparks)
    '#FFA500',  // Orange (heat)
    '#FF6347',  // Tomato (energy)
    '#FFFF00'   // Yellow (electric)
  ],
  afterSchool: [
    '#FF0000',  // Red
    '#0000FF',  // Blue
    '#00FF00',  // Green
    '#FFFF00',  // Yellow
    '#FF00FF',  // Magenta
    '#FF1493',  // Deep pink
    '#FFA500',  // Orange
    '#00FFFF',  // Cyan
    '#9370DB',  // Purple
    '#32CD32'   // Lime green
  ]
};

// ======= Particle Counts =======
const CONFETTI_COUNTS = {
  toSchool: 100,
  bringHome: 110,
  afterSchool: 120  // MOST EPIC!
};

// ======= Random Helper =======
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// ======= Main Confetti Cannon Function =======
function fireConfettiCannon(type) {
  const colors = CONFETTI_COLORS[type] || CONFETTI_COLORS.afterSchool;
  const totalParticles = CONFETTI_COUNTS[type] || 100;
  const w = window.innerWidth;

  // 5 Cannon positions across bottom of screen
  // Center cannon shoots highest for epic dome effect
  const cannons = [
    { x: w * 0.10, power: 0.80, peakMin: 45, peakMax: 60 },  // Far left (weaker)
    { x: w * 0.30, power: 0.92, peakMin: 55, peakMax: 70 },  // Mid-left (strong)
    { x: w * 0.50, power: 1.00, peakMin: 70, peakMax: 85 },  // Center (STRONGEST! HIGHEST!)
    { x: w * 0.70, power: 0.92, peakMin: 55, peakMax: 70 },  // Mid-right (strong)
    { x: w * 0.90, power: 0.80, peakMin: 45, peakMax: 60 }   // Far right (weaker)
  ];

  const particlesPerCannon = Math.floor(totalParticles / cannons.length);

  // Fire each cannon
  cannons.forEach((cannon, cannonIndex) => {
    for (let i = 0; i < particlesPerCannon; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-cannon-piece';

      // Random properties for this piece - MORE EPIC!
      const color = colors[Math.floor(Math.random() * colors.length)];
      const width = random(8, 24); // More size variety
      const height = width * random(0.5, 1.5); // Varied rectangles, not just squares
      const peakHeight = random(cannon.peakMin, cannon.peakMax);
      const drift = random(-250, 250); // WIDER horizontal spread
      const rotation = random(720, 2160); // MORE tumbling rotation!

      // Style the confetti piece
      piece.style.backgroundColor = color;
      piece.style.width = width + 'px';
      piece.style.height = height + 'px';
      piece.style.left = cannon.x + 'px';
      piece.style.bottom = '0px';

      // Set CSS variables for animation
      piece.style.setProperty('--peak-height', peakHeight + 'vh');
      piece.style.setProperty('--drift-x', drift + 'px');
      piece.style.setProperty('--rotation', rotation + 'deg');

      // Stagger launches for MORE EXPLOSIVE effect
      // Each cannon fires slightly after the previous one
      // Each particle within a cannon launches with tiny delay for simultaneous burst
      const delay = cannonIndex * 0.02 + i * 0.005; // Faster, more explosive!
      piece.style.animationDelay = delay + 's';

      // Add to page
      document.body.appendChild(piece);

      // Remove after animation completes (cleanup)
      setTimeout(() => {
        piece.remove();
      }, 3500 + (delay * 1000));
    }
  });

  console.log(`🎊 Fired ${totalParticles} confetti pieces from 5 cannons! (${type})`);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fireConfettiCannon };
}
