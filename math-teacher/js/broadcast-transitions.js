/**
 * NFL Broadcast-Style Motion Transitions
 * Inspired by ESPN, Fox Sports, CBS, and NFL Network graphics packages
 *
 * Features:
 * - Diagonal stripe wipes
 * - Circle iris reveals
 * - Button impact slams
 * - Spark burst particles
 * - Matchup scoreboard intros
 * - Kinetic typography
 * - Chrome sweep effects
 */

const BroadcastTransitions = {
  // Configuration
  config: {
    primaryColor: '#004C54',    // Eagles midnight green
    secondaryColor: '#A5ACAF',  // Eagles silver
    accentColor: '#FFD700',     // Gold accent
    fieldGreen: '#2E7D32',
    fieldDark: '#1B5E20',
    transitionDuration: 600,
    particleCount: 20
  },

  /**
   * Initialize broadcast transitions
   */
  init() {
    this.createTransitionOverlay();
    this.bindPlayGameButtons();
    this.addChromeSweepToButtons();
  },

  /**
   * Create the main transition overlay container
   */
  createTransitionOverlay() {
    if (document.getElementById('broadcast-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'broadcast-overlay';
    overlay.className = 'broadcast-overlay';
    document.body.appendChild(overlay);
  },

  /**
   * DIAGONAL STRIPE WIPE
   * Sweeps across screen like NFL replay transition
   */
  diagonalWipe(callback, direction = 'left-to-right') {
    const overlay = document.getElementById('broadcast-overlay');
    overlay.innerHTML = '';
    overlay.className = 'broadcast-overlay active';

    // Create stripe container
    const stripeContainer = document.createElement('div');
    stripeContainer.className = `diagonal-wipe-container wipe-${direction}`;

    // Create individual stripes for staggered effect
    const stripeCount = 8;
    for (let i = 0; i < stripeCount; i++) {
      const stripe = document.createElement('div');
      stripe.className = 'diagonal-stripe';
      stripe.style.setProperty('--stripe-index', i);
      stripe.style.animationDelay = `${i * 40}ms`;
      stripeContainer.appendChild(stripe);
    }

    overlay.appendChild(stripeContainer);

    // Fire callback mid-transition and clean up
    setTimeout(() => {
      if (callback) callback();
    }, this.config.transitionDuration / 2);

    setTimeout(() => {
      stripeContainer.classList.add('wipe-out');
      setTimeout(() => {
        overlay.className = 'broadcast-overlay';
        overlay.innerHTML = '';
      }, this.config.transitionDuration);
    }, this.config.transitionDuration);
  },

  /**
   * CIRCLE IRIS WIPE
   * Expands from click point like classic replay wipe
   */
  irisWipe(x, y, callback) {
    const overlay = document.getElementById('broadcast-overlay');
    overlay.innerHTML = '';
    overlay.className = 'broadcast-overlay active';

    const iris = document.createElement('div');
    iris.className = 'iris-wipe';
    iris.style.setProperty('--click-x', `${x}px`);
    iris.style.setProperty('--click-y', `${y}px`);

    overlay.appendChild(iris);

    setTimeout(() => {
      if (callback) callback();
    }, 400);

    setTimeout(() => {
      iris.classList.add('iris-out');
      setTimeout(() => {
        overlay.className = 'broadcast-overlay';
        overlay.innerHTML = '';
      }, 500);
    }, 600);
  },

  /**
   * BUTTON IMPACT SLAM
   * Button scales up then SLAMS down with overshoot
   */
  buttonSlam(button, callback) {
    // Add slam class
    button.classList.add('button-slamming');

    // Screen shake
    this.screenShake('heavy');

    // Spark burst from button center
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    this.sparkBurst(centerX, centerY, 'large');

    // Quick flash
    this.quickFlash();

    setTimeout(() => {
      button.classList.remove('button-slamming');
      if (callback) callback();
    }, 400);
  },

  /**
   * SPARK BURST PARTICLES
   * Fires sparks outward from a point in team colors
   */
  sparkBurst(x, y, size = 'medium') {
    const particleCount = size === 'large' ? 24 : size === 'medium' ? 16 : 8;
    const colors = [
      this.config.primaryColor,
      this.config.secondaryColor,
      this.config.accentColor,
      '#FFFFFF'
    ];

    for (let i = 0; i < particleCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark-particle';

      const angle = (i / particleCount) * 360 + (Math.random() * 30 - 15);
      const distance = 60 + Math.random() * 80;
      const tx = Math.cos(angle * Math.PI / 180) * distance;
      const ty = Math.sin(angle * Math.PI / 180) * distance;
      const sparkSize = size === 'large' ? 8 + Math.random() * 8 : 4 + Math.random() * 6;

      spark.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${sparkSize}px;
        height: ${sparkSize}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        --tx: ${tx}px;
        --ty: ${ty}px;
      `;

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  },

  /**
   * SCREEN SHAKE
   * Adds impact feel to transitions
   */
  screenShake(intensity = 'medium') {
    const shakeClass = `screen-shake-${intensity}`;
    document.body.classList.add(shakeClass);

    const duration = intensity === 'heavy' ? 500 : intensity === 'medium' ? 300 : 150;
    setTimeout(() => {
      document.body.classList.remove(shakeClass);
    }, duration);
  },

  /**
   * QUICK FLASH
   * Single bright flash for impact
   */
  quickFlash() {
    const flash = document.createElement('div');
    flash.className = 'quick-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 150);
  },

  /**
   * STADIUM STROBE SEQUENCE
   * Multiple directional flashes for epic moments
   */
  stadiumStrobe(callback) {
    const positions = [
      { x: '20%', y: '30%' },
      { x: '80%', y: '20%' },
      { x: '50%', y: '50%' },
      { x: '30%', y: '70%' },
      { x: '70%', y: '80%' }
    ];

    positions.forEach((pos, i) => {
      setTimeout(() => {
        const flash = document.createElement('div');
        flash.className = 'stadium-strobe-flash';
        flash.style.setProperty('--flash-x', pos.x);
        flash.style.setProperty('--flash-y', pos.y);
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 200);
      }, i * 80);
    });

    if (callback) {
      setTimeout(callback, positions.length * 80 + 200);
    }
  },

  /**
   * MATCHUP SCOREBOARD SLAM
   * NFL-style matchup graphic that slams in
   */
  showMatchupIntro(homeTeam, awayTeam, roundName, callback) {
    const overlay = document.getElementById('broadcast-overlay');
    overlay.innerHTML = '';
    overlay.className = 'broadcast-overlay active matchup-mode';

    const matchup = document.createElement('div');
    matchup.className = 'matchup-intro';
    matchup.innerHTML = `
      <div class="matchup-banner">
        <div class="matchup-round">${roundName}</div>
      </div>
      <div class="matchup-teams">
        <div class="matchup-team home">
          <img src="${homeTeam.logo}" alt="${homeTeam.name}">
          <span class="team-name">${homeTeam.name}</span>
        </div>
        <div class="matchup-vs">
          <span>VS</span>
        </div>
        <div class="matchup-team away">
          <img src="${awayTeam.logo}" alt="${awayTeam.name}">
          <span class="team-name">${awayTeam.name}</span>
        </div>
      </div>
    `;

    overlay.appendChild(matchup);

    // Trigger animations
    setTimeout(() => matchup.classList.add('animate'), 50);

    // Stadium strobe at peak
    setTimeout(() => this.stadiumStrobe(), 400);

    // Close and callback
    setTimeout(() => {
      matchup.classList.add('exit');
      setTimeout(() => {
        overlay.className = 'broadcast-overlay';
        overlay.innerHTML = '';
        if (callback) callback();
      }, 400);
    }, 2000);
  },

  /**
   * KINETIC TYPOGRAPHY
   * Animate text characters with stagger and slam
   */
  kineticText(element, style = 'slam') {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('kinetic-text', `kinetic-${style}`);

    // Split into characters
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'kinetic-char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${i * 50}ms`;
      element.appendChild(span);
    });

    element.classList.add('animate');
  },

  /**
   * PANEL SLIDE IN
   * Angular panel slide like Fox Sports graphics
   */
  panelSlideIn(element, direction = 'left') {
    element.classList.add('panel-slide', `slide-from-${direction}`);

    // Trigger animation
    requestAnimationFrame(() => {
      element.classList.add('slide-in');
    });
  },

  /**
   * Add chrome sweep effect to buttons
   */
  addChromeSweepToButtons() {
    document.querySelectorAll('.btn-primary.btn-large, .play-game-btn').forEach(btn => {
      if (!btn.querySelector('.chrome-sweep')) {
        const sweep = document.createElement('div');
        sweep.className = 'chrome-sweep';
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(sweep);
      }
    });
  },

  /**
   * Bind PLAY GAME button transitions
   */
  bindPlayGameButtons() {
    // Find all "Play Game" type buttons
    document.querySelectorAll('a[href*="lessons"], .play-game-btn').forEach(btn => {
      if (btn.textContent.toLowerCase().includes('play') ||
          btn.classList.contains('play-game-btn')) {

        btn.addEventListener('click', (e) => {
          // Only intercept if going to lessons
          if (btn.href && btn.href.includes('lessons')) {
            e.preventDefault();
            this.epicPlayGameTransition(btn, btn.href);
          }
        });
      }
    });
  },

  /**
   * EPIC PLAY GAME TRANSITION
   * Full broadcast-style transition sequence
   */
  epicPlayGameTransition(button, targetUrl) {
    // 1. Button slam with sparks
    this.buttonSlam(button, () => {
      // 2. Get click position for iris
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 3. Diagonal wipe with navigation
      this.diagonalWipe(() => {
        window.location.href = targetUrl;
      });
    });
  },

  /**
   * LESSON ENTRY TRANSITION
   * Used when entering a specific lesson
   */
  lessonEntryTransition(lessonData, targetUrl) {
    // Show matchup intro
    this.showMatchupIntro(
      { name: 'EAGLES', logo: '/images/nfl-logos/eagles.png' },
      { name: lessonData.opponent, logo: lessonData.opponentLogo },
      lessonData.round,
      () => {
        window.location.href = targetUrl;
      }
    );
  },

  /**
   * VICTORY TRANSITION
   * Epic celebration sequence for completing lessons
   */
  victoryTransition(isSuperBowl = false) {
    // Heavy screen shake
    this.screenShake('heavy');

    // Stadium strobe
    this.stadiumStrobe();

    // Multiple spark bursts
    const burstPoints = [
      { x: window.innerWidth * 0.3, y: window.innerHeight * 0.4 },
      { x: window.innerWidth * 0.7, y: window.innerHeight * 0.4 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }
    ];

    burstPoints.forEach((point, i) => {
      setTimeout(() => {
        this.sparkBurst(point.x, point.y, 'large');
      }, i * 150);
    });

    if (isSuperBowl) {
      // Extra effects for Super Bowl
      setTimeout(() => this.stadiumStrobe(), 500);
      setTimeout(() => this.stadiumStrobe(), 1000);
    }
  },

  /**
   * LOWER THIRD QUESTION CARD
   * Broadcast-style question reveal (minimal for lessons)
   */
  showQuestionCard(element) {
    element.classList.add('lower-third-card');
    requestAnimationFrame(() => {
      element.classList.add('slide-in');
    });
  },

  /**
   * Hide question card with slide out
   */
  hideQuestionCard(element, callback) {
    element.classList.add('slide-out');
    setTimeout(() => {
      element.classList.remove('lower-third-card', 'slide-in', 'slide-out');
      if (callback) callback();
    }, 400);
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => BroadcastTransitions.init());
} else {
  BroadcastTransitions.init();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BroadcastTransitions;
}
