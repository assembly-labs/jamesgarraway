/* Football Fractions - Main Application */

const App = {
  /**
   * Initialize the application
   */
  init() {
    this.initNavigation();
    this.initTooltips();
    this.initTabs();
    this.initModals();
    this.checkDailyReset();
  },

  /**
   * DOM helper - querySelector shorthand
   */
  $(selector) {
    return document.querySelector(selector);
  },

  /**
   * DOM helper - querySelectorAll shorthand
   */
  $$(selector) {
    return document.querySelectorAll(selector);
  },

  /**
   * Initialize navigation
   */
  initNavigation() {
    const hamburger = this.$('#navHamburger');
    const menu = this.$('#navMenu');

    if (hamburger && menu) {
      hamburger.addEventListener('click', () => {
        menu.classList.toggle('show');
        hamburger.setAttribute('aria-expanded', menu.classList.contains('show'));
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && menu.classList.contains('show')) {
          menu.classList.remove('show');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });

      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('show')) {
          menu.classList.remove('show');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Set active nav link based on current path
    const currentPath = window.location.pathname;
    this.$$('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (currentPath.includes(href) || (href === '/' && currentPath === '/')) {
        link.classList.add('active');
      }
    });
  },

  /**
   * Initialize tooltips
   */
  initTooltips() {
    // Tooltips are handled purely with CSS using data-tooltip attribute
    // This method is here for future JS enhancements if needed
  },

  /**
   * Initialize tabs
   */
  initTabs() {
    this.$$('.tabs').forEach(tabContainer => {
      const tabs = tabContainer.querySelectorAll('.tab');
      const contents = tabContainer.parentElement.querySelectorAll('.tab-content');

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const targetId = tab.dataset.tab;

          // Update tabs
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          // Update content
          contents.forEach(content => {
            content.classList.toggle('active', content.id === targetId);
          });
        });
      });
    });
  },

  /**
   * Initialize modals
   */
  initModals() {
    // Close modal on overlay click
    this.$$('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeModal(overlay);
        }
      });
    });

    // Close modal on close button
    this.$$('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) this.closeModal(modal);
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = this.$('.modal-overlay.show');
        if (openModal) this.closeModal(openModal);
      }
    });
  },

  /**
   * Open a modal
   * @param {string} modalId - Modal element ID
   */
  openModal(modalId) {
    const modal = this.$(`#${modalId}`);
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  },

  /**
   * Close a modal
   * @param {HTMLElement|string} modal - Modal element or ID
   */
  closeModal(modal) {
    if (typeof modal === 'string') {
      modal = this.$(`#${modal}`);
    }
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  },

  /**
   * Check for daily reset (clear progress at midnight)
   */
  checkDailyReset() {
    // For this app, we don't reset daily - progress persists
    // This method is available for future use if daily practice tracking is needed
  },

  /**
   * Show a toast notification
   * @param {string} message
   * @param {string} type - 'success', 'error', 'info'
   * @param {number} duration - Duration in ms
   */
  showToast(message, type = 'info', duration = 3000) {
    // Remove existing toast
    const existing = this.$('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 12px 24px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      animation: slideUp 0.3s ease;
      background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#E53935' : '#2196F3'};
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideDown 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Create and show a celebration
   * @param {string} title
   * @param {string} message
   * @param {string} icon
   */
  celebrate(title, message, icon = '🏆') {
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay show';
    overlay.innerHTML = `
      <div class="celebration-content">
        <div class="celebration-icon">${icon}</div>
        <h2 class="celebration-title">${title}</h2>
        <p class="celebration-message">${message}</p>
        <button class="btn btn-primary btn-large" onclick="this.closest('.celebration-overlay').remove()">
          Continue
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    this.fireConfetti();

    // Auto-close after 5 seconds
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        overlay.remove();
      }
    }, 5000);
  },

  /**
   * Fire confetti animation
   */
  fireConfetti() {
    const colors = ['#4CAF50', '#2196F3', '#FFD700', '#E53935', '#9C27B0'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
          left: ${Math.random() * 100}vw;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          animation-duration: ${2 + Math.random() * 2}s;
        `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
      }, i * 30);
    }
  },

  /**
   * Fire rainbow confetti explosion (more intense for victories)
   */
  fireRainbowConfetti() {
    const colors = ['#E31837', '#FF6B35', '#FFD700', '#FFEC00', '#4CAF50', '#00BCD4', '#2196F3', '#9C27B0', '#E91E63'];
    const confettiCount = 150;

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti victory-confetti';
        confetti.style.cssText = `
          left: ${Math.random() * 100}vw;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          animation-duration: ${2 + Math.random() * 2}s;
          width: ${8 + Math.random() * 8}px;
          height: ${8 + Math.random() * 8}px;
        `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
      }, i * 10);
    }
  },

  /**
   * MEGA confetti explosion - bursts from center like a bomb!
   */
  fireExplosionConfetti() {
    const colors = ['#E31837', '#FF6B35', '#FFD700', '#FFEC00', '#4CAF50', '#00BCD4', '#2196F3', '#9C27B0', '#E91E63', '#00FF00', '#FF00FF', '#00FFFF'];
    const confettiCount = 200;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const velocity = 300 + Math.random() * 500;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      const size = 10 + Math.random() * 15;
      const rotation = Math.random() * 1080;

      confetti.className = 'explosion-confetti';
      confetti.style.cssText = `
        position: fixed;
        left: 50%;
        top: 50%;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        z-index: 10001;
        pointer-events: none;
        transform: translate(-50%, -50%);
        animation: explosion-burst 2s cubic-bezier(0, 0.5, 0.5, 1) forwards;
        --tx: ${tx}px;
        --ty: ${ty}px;
        --rotation: ${rotation}deg;
        animation-delay: ${Math.random() * 0.1}s;
      `;
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 2500);
    }
  },

  /**
   * Screen shake effect
   */
  shakeScreen() {
    document.body.style.animation = 'screen-shake 0.5s ease-in-out';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 500);
  },

  /**
   * Stadium flash effect - multiple bursts like stadium lights going crazy
   */
  stadiumFlash() {
    const flashCount = 5;
    for (let i = 0; i < flashCount; i++) {
      setTimeout(() => {
        const flash = document.createElement('div');
        flash.className = 'stadium-flash';
        flash.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(circle at ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%, rgba(255,255,255,0.9) 0%, rgba(255,215,0,0.4) 30%, transparent 70%);
          z-index: 9999;
          pointer-events: none;
          animation: stadium-flash-anim 0.2s ease-out forwards;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 200);
      }, i * 100);
    }
  },

  /**
   * Get the base path for assets (handles being loaded from different page depths)
   */
  getBasePath() {
    const path = window.location.pathname;
    // Count directory depth from root
    const depth = (path.match(/\//g) || []).length - 1;
    if (depth <= 1) return './';
    if (depth === 2) return '../';
    if (depth >= 3) return '../../';
    return './';
  },

  /**
   * Show touchdown GIF overlay with EPIC full-screen display
   * GIF plays for 4 seconds before fading out
   */
  showTouchdownGif() {
    const gifs = [];
    for (let i = 1; i <= 28; i++) {
      gifs.push(`giphy-${i}.gif`);
    }
    gifs.push('giphy.gif');

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    const basePath = this.getBasePath();

    const overlay = document.createElement('div');
    overlay.className = 'td-gif-overlay';
    overlay.innerHTML = `
      <div class="td-text-banner">TOUCHDOWN!</div>
      <img src="${basePath}images/touchdowns/${randomGif}" alt="Touchdown celebration" onerror="this.src='${basePath}images/touchdowns/giphy.gif'">
    `;
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.85);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
    `;
    overlay.querySelector('.td-text-banner').style.cssText = `
      position: absolute;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
      font-size: clamp(2.5rem, 8vw, 4rem);
      font-weight: 900;
      color: #FFD700;
      text-shadow: 0 0 30px #FFD700, 0 0 60px #FF6B35, 0 4px 0 #E65100;
      animation: td-text-zoom 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
      letter-spacing: 0.1em;
      z-index: 10001;
      text-align: center;
    `;
    overlay.querySelector('img').style.cssText = `
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      animation: gif-zoom-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    `;

    document.body.appendChild(overlay);

    // Display for 4 seconds, then fade out
    setTimeout(() => {
      overlay.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => overlay.remove(), 500);
    }, 4000);
  },

  /**
   * Celebrate victory over opponent team - NOW WITH EPIC EFFECTS!
   * @param {string} teamName - The defeated team name
   * @param {number} lessonNum - Lesson number (6 = Super Bowl)
   * @param {string} teamLogo - Path to team logo
   */
  celebrateVictory(teamName, lessonNum, teamLogo) {
    const isSuperBowl = lessonNum === 6;

    // Use broadcast transitions if available for maximum impact
    if (typeof BroadcastTransitions !== 'undefined') {
      BroadcastTransitions.victoryTransition(isSuperBowl);
    }

    // SCREEN SHAKE - Feel the impact!
    this.shakeScreen();

    // STADIUM FLASH - Multiple light bursts!
    this.stadiumFlash();

    // MEGA EXPLOSION CONFETTI - Bursts from center!
    this.fireExplosionConfetti();

    // Show the epic GIF with TOUCHDOWN text
    setTimeout(() => this.showTouchdownGif(), 200);

    // WAVE 1: Rainbow confetti from above
    setTimeout(() => this.fireRainbowConfetti(), 300);

    // WAVE 2: More confetti for ALL lessons now!
    setTimeout(() => this.fireRainbowConfetti(), 800);

    // WAVE 3: Even more for all lessons!
    setTimeout(() => this.fireRainbowConfetti(), 1300);

    // Super Bowl gets EXTRA waves!
    if (isSuperBowl) {
      setTimeout(() => this.fireExplosionConfetti(), 1000);
      setTimeout(() => this.fireRainbowConfetti(), 1800);
      setTimeout(() => this.fireExplosionConfetti(), 2300);
      setTimeout(() => this.stadiumFlash(), 2000);
    }

    // Show victory overlay after GIF with animated entrance
    setTimeout(() => {
      const overlay = document.createElement('div');
      overlay.className = 'celebration-overlay show';

      const title = isSuperBowl ? 'SUPER BOWL CHAMPIONS!' : `EAGLES DEFEAT THE ${teamName.toUpperCase()}!`;
      const message = isSuperBowl
        ? 'You\'ve mastered all fraction skills and won the championship!'
        : `You've advanced to the next round of the playoffs!`;
      const icon = isSuperBowl ? '🏆' : '🦅';

      overlay.innerHTML = `
        <div class="celebration-content victory-celebration" style="animation: victory-modal-entrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;">
          <div class="celebration-icon" style="font-size: 5rem; animation: icon-bounce 0.5s ease infinite alternate;">${icon}</div>
          <h2 class="celebration-title" style="color: #004C54; font-size: 2rem; text-shadow: 0 2px 10px rgba(0,76,84,0.3);">${title}</h2>
          <p class="celebration-message" style="font-size: 1.1rem;">${message}</p>
          <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
            <a href="../index.html" class="btn btn-primary btn-large" style="animation: pulse-glow 1s ease infinite; font-size: 1.1rem; padding: 1rem 2rem;">
              ${isSuperBowl ? '🏆 Celebrate!' : '🏈 Continue Playoffs'}
            </a>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);

      // One more confetti burst when modal appears!
      this.fireRainbowConfetti();

      // Click to dismiss
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          window.location.href = '../index.html';
        }
      });
    }, 4000);
  },

  /**
   * Create a progress ring SVG
   * @param {number} progress - 0 to 100
   * @param {number} size - Size in pixels
   * @param {number} strokeWidth - Stroke width
   * @returns {string} SVG HTML
   */
  createProgressRing(progress, size = 100, strokeWidth = 8) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return `
      <div class="progress-ring" style="width: ${size}px; height: ${size}px;">
        <svg width="${size}" height="${size}">
          <circle
            class="progress-ring-bg"
            stroke-width="${strokeWidth}"
            r="${radius}"
            cx="${size / 2}"
            cy="${size / 2}"
          />
          <circle
            class="progress-ring-fill"
            stroke-width="${strokeWidth}"
            stroke-dasharray="${circumference} ${circumference}"
            stroke-dashoffset="${offset}"
            r="${radius}"
            cx="${size / 2}"
            cy="${size / 2}"
          />
        </svg>
        <span class="progress-ring-text">${progress}%</span>
      </div>
    `;
  },

  /**
   * Render a bar model
   * @param {number} numerator - Shaded parts
   * @param {number} denominator - Total parts
   * @param {string} containerId - Container element ID
   */
  renderBarModel(numerator, denominator, containerId) {
    const container = this.$(`#${containerId}`);
    if (!container) return;

    let html = '<div class="bar-model-field">';
    for (let i = 0; i < denominator; i++) {
      const shaded = i < numerator ? 'shaded' : '';
      html += `<div class="bar-model-part ${shaded}">${i + 1}</div>`;
    }
    html += '</div>';

    container.innerHTML = html;
  },

  /**
   * Format time remaining
   * @param {number} seconds
   * @returns {string}
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  },

  /**
   * Shuffle an array (Fisher-Yates)
   * @param {Array} array
   * @returns {Array}
   */
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  /**
   * Debounce a function
   * @param {Function} func
   * @param {number} wait
   * @returns {Function}
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Add CSS animation keyframes for EPIC celebrations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
  @keyframes slideDown {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes td-flash-anim {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }

  /* EPIC CELEBRATION ANIMATIONS */

  /* Explosion confetti burst from center */
  @keyframes explosion-burst {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    20% {
      transform: translate(calc(-50% + var(--tx) * 0.3), calc(-50% + var(--ty) * 0.3)) scale(1.2) rotate(calc(var(--rotation) * 0.3));
      opacity: 1;
    }
    100% {
      transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty) + 200px)) scale(0.3) rotate(var(--rotation));
      opacity: 0;
    }
  }

  /* Screen shake effect */
  @keyframes screen-shake {
    0%, 100% { transform: translateX(0); }
    10% { transform: translateX(-10px) rotate(-1deg); }
    20% { transform: translateX(10px) rotate(1deg); }
    30% { transform: translateX(-8px) rotate(-0.5deg); }
    40% { transform: translateX(8px) rotate(0.5deg); }
    50% { transform: translateX(-5px); }
    60% { transform: translateX(5px); }
    70% { transform: translateX(-3px); }
    80% { transform: translateX(3px); }
    90% { transform: translateX(-1px); }
  }

  /* Stadium flash animation */
  @keyframes stadium-flash-anim {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }

  /* Touchdown text zoom in */
  @keyframes td-text-zoom {
    0% {
      transform: scale(0) rotate(-10deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.3) rotate(5deg);
      opacity: 1;
    }
    100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }

  /* GIF zoom in with bounce */
  @keyframes gif-zoom-in {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }
    60% {
      transform: scale(1.1);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Victory modal entrance */
  @keyframes victory-modal-entrance {
    0% {
      transform: scale(0.5) translateY(50px);
      opacity: 0;
    }
    60% {
      transform: scale(1.05) translateY(-10px);
      opacity: 1;
    }
    100% {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }

  /* Icon bounce */
  @keyframes icon-bounce {
    0% { transform: scale(1) translateY(0); }
    100% { transform: scale(1.1) translateY(-5px); }
  }

  /* Pulse glow for button */
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(0, 76, 84, 0.5), 0 0 20px rgba(0, 76, 84, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 76, 84, 0.8), 0 0 40px rgba(0, 76, 84, 0.5), 0 0 60px rgba(255, 215, 0, 0.3);
    }
  }

  /* Confetti fall animation (existing, enhanced) */
  .confetti {
    position: fixed;
    top: -20px;
    width: 10px;
    height: 10px;
    animation: confetti-fall linear forwards;
    z-index: 10001;
    pointer-events: none;
  }

  @keyframes confetti-fall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
