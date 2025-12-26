/**
 * Side Navigation Helper Panel
 * Provides question-specific explanations with two modes:
 * - Visual/Intuitive: Uses analogies and step-by-step stories
 * - Procedural: Direct mathematical steps and rules
 *
 * Usage:
 * 1. Include side-nav.css and this file
 * 2. Define window.questionExplanations with your question data
 * 3. Call HelperPanel.init() on page load
 * 4. Call HelperPanel.setQuestion(questionId) when a question is focused
 */

const HelperPanel = {
  isOpen: false,
  currentMode: 'visual', // 'visual' or 'procedural'
  currentQuestionId: null,
  explanations: {},

  /**
   * Initialize the helper panel
   * @param {Object} explanations - Question explanations data
   */
  init: function(explanations) {
    this.explanations = explanations || window.questionExplanations || {};
    this.createPanelHTML();
    this.bindEvents();
    this.setupQuestionObservers();
  },

  /**
   * Create the panel HTML and inject into the page
   */
  createPanelHTML: function() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'helper-overlay';
    overlay.id = 'helperOverlay';
    document.body.appendChild(overlay);

    // Create toggle button
    const toggle = document.createElement('button');
    toggle.className = 'helper-toggle';
    toggle.id = 'helperToggle';
    toggle.setAttribute('aria-label', 'Open helper panel');
    toggle.innerHTML = '<span class="toggle-icon">💡</span> Need Help?';
    document.body.appendChild(toggle);

    // Create panel
    const panel = document.createElement('div');
    panel.className = 'helper-panel';
    panel.id = 'helperPanel';
    panel.setAttribute('role', 'complementary');
    panel.setAttribute('aria-label', 'Question help panel');

    panel.innerHTML = `
      <div class="helper-header">
        <h3><span>💡</span> How to Solve</h3>
        <button class="helper-close" id="helperClose" aria-label="Close helper panel">×</button>
      </div>

      <div class="mode-toggle">
        <button class="mode-btn active" data-mode="visual">
          <span>🎨</span> Picture It
        </button>
        <button class="mode-btn" data-mode="procedural">
          <span>📋</span> The Steps
        </button>
      </div>

      <div class="helper-content" id="helperContent">
        <div class="no-question" id="noQuestion">
          <div class="icon">🏈</div>
          <p>Click on a question to see helpful tips on how to solve it!</p>
        </div>

        <div id="questionExplanation" style="display: none;">
          <div class="current-question">
            <div class="question-label">Currently viewing</div>
            <p class="question-title" id="currentQuestionTitle">Question 1</p>
          </div>

          <div class="explanation visual-explanation active" id="visualExplanation">
            <!-- Visual explanation content injected here -->
          </div>

          <div class="explanation procedural-explanation" id="proceduralExplanation">
            <!-- Procedural explanation content injected here -->
          </div>
        </div>
      </div>

      <div class="helper-footer">
        Try both ways of thinking about it!
      </div>
    `;

    document.body.appendChild(panel);
  },

  /**
   * Bind event listeners
   */
  bindEvents: function() {
    const self = this;

    // Toggle button
    document.getElementById('helperToggle').addEventListener('click', function() {
      self.toggle();
    });

    // Close button
    document.getElementById('helperClose').addEventListener('click', function() {
      self.close();
    });

    // Overlay click
    document.getElementById('helperOverlay').addEventListener('click', function() {
      self.close();
    });

    // Mode toggle buttons
    document.querySelectorAll('.mode-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        self.setMode(this.dataset.mode);
      });
    });

    // Escape key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && self.isOpen) {
        self.close();
      }
    });
  },

  /**
   * Setup observers to detect which question is focused
   */
  setupQuestionObservers: function() {
    const self = this;

    // Listen for focus on question inputs
    document.querySelectorAll('.question input, .question button').forEach(function(el) {
      el.addEventListener('focus', function() {
        const question = this.closest('.question');
        if (question && question.id) {
          self.setQuestion(question.id);
        }
      });
    });

    // Listen for clicks on questions
    document.querySelectorAll('.question').forEach(function(question) {
      question.addEventListener('click', function() {
        if (this.id) {
          self.setQuestion(this.id);
        }
      });
    });
  },

  /**
   * Toggle the panel open/closed
   */
  toggle: function() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },

  /**
   * Open the panel
   */
  open: function() {
    this.isOpen = true;
    document.getElementById('helperPanel').classList.add('open');
    document.getElementById('helperToggle').classList.add('active');
    document.getElementById('helperOverlay').classList.add('active');
    document.getElementById('helperToggle').innerHTML = '<span class="toggle-icon">×</span> Close';
  },

  /**
   * Close the panel
   */
  close: function() {
    this.isOpen = false;
    document.getElementById('helperPanel').classList.remove('open');
    document.getElementById('helperToggle').classList.remove('active');
    document.getElementById('helperOverlay').classList.remove('active');
    document.getElementById('helperToggle').innerHTML = '<span class="toggle-icon">💡</span> Need Help?';
  },

  /**
   * Set the current explanation mode
   * @param {string} mode - 'visual' or 'procedural'
   */
  setMode: function(mode) {
    this.currentMode = mode;

    // Update button states
    document.querySelectorAll('.mode-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // Update explanation visibility
    document.getElementById('visualExplanation').classList.toggle('active', mode === 'visual');
    document.getElementById('proceduralExplanation').classList.toggle('active', mode === 'procedural');
  },

  /**
   * Set the current question and display its explanation
   * @param {string} questionId - The question element ID (e.g., 'q1')
   */
  setQuestion: function(questionId) {
    this.currentQuestionId = questionId;

    const explanation = this.explanations[questionId];

    if (!explanation) {
      // No explanation available for this question
      document.getElementById('noQuestion').style.display = 'block';
      document.getElementById('questionExplanation').style.display = 'none';
      return;
    }

    // Show explanation content
    document.getElementById('noQuestion').style.display = 'none';
    document.getElementById('questionExplanation').style.display = 'block';

    // Update question title
    document.getElementById('currentQuestionTitle').textContent = explanation.title || 'Question';

    // Render visual explanation
    document.getElementById('visualExplanation').innerHTML = this.renderExplanation(
      explanation.visual,
      'Picture It!',
      '🎨'
    );

    // Render procedural explanation
    document.getElementById('proceduralExplanation').innerHTML = this.renderExplanation(
      explanation.procedural,
      'The Steps',
      '📋'
    );

    // Auto-open panel if not already open
    if (!this.isOpen) {
      this.open();
    }
  },

  /**
   * Render an explanation to HTML
   * @param {Object} data - Explanation data with steps array
   * @param {string} title - Title for this explanation mode
   * @param {string} icon - Icon for the title
   * @returns {string} HTML string
   */
  renderExplanation: function(data, title, icon) {
    if (!data || !data.steps) {
      return '<p>No explanation available.</p>';
    }

    let html = `
      <div class="explanation-title">
        <span class="title-icon">${icon}</span>
        ${title}
      </div>
      <ul class="explanation-steps">
    `;

    data.steps.forEach(function(step, index) {
      const isAnswer = step.isAnswer || index === data.steps.length - 1;
      html += `
        <li class="explanation-step ${isAnswer ? 'answer-highlight' : ''}">
          <span class="step-number">${index + 1}</span>
          <span class="step-text">${step.text || step}</span>
        </li>
      `;
    });

    html += '</ul>';

    // Add tip if provided
    if (data.tip) {
      html += `
        <div class="helper-tip">
          <div class="tip-title"><span>💡</span> Remember:</div>
          <p>${data.tip}</p>
        </div>
      `;
    }

    return html;
  },

  /**
   * Utility to format a fraction for display
   * @param {number} num - Numerator
   * @param {number} den - Denominator
   * @returns {string} Formatted fraction HTML
   */
  formatFraction: function(num, den) {
    return `<span class="math-inline">${num}/${den}</span>`;
  }
};

// Auto-initialize if explanations are already defined
document.addEventListener('DOMContentLoaded', function() {
  if (window.questionExplanations) {
    HelperPanel.init(window.questionExplanations);
  }
});
