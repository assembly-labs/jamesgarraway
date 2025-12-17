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

// Add CSS animation keyframes
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
