/* Football Fractions - Storage Utilities */

const Storage = {
  PREFIX: 'mathteacher.',

  KEYS: {
    // Diagnostic
    diagnosticResults: 'diagnostic.results',
    diagnosticDate: 'diagnostic.date',
    diagnosticProgress: 'diagnostic.progress',

    // Lessons
    lessonProgress: 'lessons.progress',
    lessonCompleted: 'lessons.completed',

    // Practice
    practiceHistory: 'practice.history',
    practiceStreak: 'practice.streak',
    lastPracticeDate: 'practice.lastDate',

    // Settings
    theme: 'settings.theme',
    showAnswerKey: 'settings.showAnswerKey',

    // Celebrations
    celebrationsShown: 'celebrations.shown',
  },

  /**
   * Get a value from localStorage
   * @param {string} key - Key without prefix
   * @param {*} defaultValue - Default value if not found
   * @returns {*} Parsed value or default
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.PREFIX + key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (e) {
      console.error('Storage.get error:', e);
      return defaultValue;
    }
  },

  /**
   * Set a value in localStorage
   * @param {string} key - Key without prefix
   * @param {*} value - Value to store (will be JSON stringified)
   */
  set(key, value) {
    try {
      localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage.set error:', e);
    }
  },

  /**
   * Remove a value from localStorage
   * @param {string} key - Key without prefix
   */
  remove(key) {
    try {
      localStorage.removeItem(this.PREFIX + key);
    } catch (e) {
      console.error('Storage.remove error:', e);
    }
  },

  /**
   * Clear all mathteacher data
   */
  clearAll() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  },

  /**
   * Get today's date as YYYY-MM-DD string
   * @returns {string}
   */
  getToday() {
    return new Date().toISOString().split('T')[0];
  },

  /**
   * Check if a date string is today
   * @param {string} dateStr - Date string in YYYY-MM-DD format
   * @returns {boolean}
   */
  isToday(dateStr) {
    return dateStr === this.getToday();
  },

  // ============ Diagnostic Methods ============

  /**
   * Save diagnostic results
   * @param {Object} results - Diagnostic results object
   */
  saveDiagnosticResults(results) {
    this.set(this.KEYS.diagnosticResults, results);
    this.set(this.KEYS.diagnosticDate, this.getToday());
  },

  /**
   * Get diagnostic results
   * @returns {Object|null}
   */
  getDiagnosticResults() {
    return this.get(this.KEYS.diagnosticResults, null);
  },

  /**
   * Save diagnostic progress (for resuming)
   * @param {Object} progress - Current progress state
   */
  saveDiagnosticProgress(progress) {
    this.set(this.KEYS.diagnosticProgress, {
      ...progress,
      savedAt: Date.now()
    });
  },

  /**
   * Get diagnostic progress
   * @returns {Object|null}
   */
  getDiagnosticProgress() {
    return this.get(this.KEYS.diagnosticProgress, null);
  },

  /**
   * Clear diagnostic progress
   */
  clearDiagnosticProgress() {
    this.remove(this.KEYS.diagnosticProgress);
  },

  // ============ Lesson Methods ============

  /**
   * Get lesson progress for all lessons
   * @returns {Object} Lesson progress by lesson number
   */
  getLessonProgress() {
    return this.get(this.KEYS.lessonProgress, {
      1: { started: false, completed: false, worksheetDone: false },
      2: { started: false, completed: false, worksheetDone: false },
      3: { started: false, completed: false, worksheetDone: false },
      4: { started: false, completed: false, worksheetDone: false },
      5: { started: false, completed: false, worksheetDone: false },
      6: { started: false, completed: false, worksheetDone: false },
    });
  },

  /**
   * Mark a lesson as started
   * @param {number} lessonNum - Lesson number (1-6)
   */
  startLesson(lessonNum) {
    const progress = this.getLessonProgress();
    progress[lessonNum] = {
      ...progress[lessonNum],
      started: true,
      startedAt: this.getToday()
    };
    this.set(this.KEYS.lessonProgress, progress);
  },

  /**
   * Mark a lesson as completed
   * @param {number} lessonNum - Lesson number (1-6)
   */
  completeLesson(lessonNum) {
    const progress = this.getLessonProgress();
    progress[lessonNum] = {
      ...progress[lessonNum],
      completed: true,
      completedAt: this.getToday()
    };
    this.set(this.KEYS.lessonProgress, progress);

    // Add to completed list
    const completed = this.get(this.KEYS.lessonCompleted, []);
    if (!completed.includes(lessonNum)) {
      completed.push(lessonNum);
      this.set(this.KEYS.lessonCompleted, completed);
    }
  },

  /**
   * Mark worksheet as done
   * @param {number} lessonNum - Lesson number (1-6)
   */
  completeWorksheet(lessonNum) {
    const progress = this.getLessonProgress();
    progress[lessonNum] = {
      ...progress[lessonNum],
      worksheetDone: true,
      worksheetDoneAt: this.getToday()
    };
    this.set(this.KEYS.lessonProgress, progress);
  },

  /**
   * Get count of completed lessons
   * @returns {number}
   */
  getCompletedLessonCount() {
    const completed = this.get(this.KEYS.lessonCompleted, []);
    return completed.length;
  },

  // ============ Practice Methods ============

  /**
   * Record a practice session
   * @param {Object} session - Practice session data
   */
  recordPracticeSession(session) {
    const history = this.get(this.KEYS.practiceHistory, []);
    history.push({
      ...session,
      date: this.getToday(),
      timestamp: Date.now()
    });

    // Keep last 30 days of history
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const filteredHistory = history.filter(h => h.timestamp > thirtyDaysAgo);

    this.set(this.KEYS.practiceHistory, filteredHistory);

    // Update streak
    this.updateStreak();
  },

  /**
   * Update practice streak
   */
  updateStreak() {
    const lastDate = this.get(this.KEYS.lastPracticeDate, null);
    const today = this.getToday();
    let streak = this.get(this.KEYS.practiceStreak, 0);

    if (lastDate === today) {
      // Already practiced today, no change
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastDate === yesterdayStr) {
      // Practiced yesterday, increment streak
      streak++;
    } else if (lastDate !== today) {
      // Missed a day, reset streak
      streak = 1;
    }

    this.set(this.KEYS.practiceStreak, streak);
    this.set(this.KEYS.lastPracticeDate, today);
  },

  /**
   * Get current practice streak
   * @returns {number}
   */
  getPracticeStreak() {
    return this.get(this.KEYS.practiceStreak, 0);
  },

  /**
   * Get practice history
   * @param {number} days - Number of days to retrieve
   * @returns {Array}
   */
  getPracticeHistory(days = 7) {
    const history = this.get(this.KEYS.practiceHistory, []);
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    return history.filter(h => h.timestamp > cutoff);
  },

  // ============ Celebration Methods ============

  /**
   * Check if a celebration has been shown
   * @param {string} celebrationId - Unique celebration identifier
   * @returns {boolean}
   */
  hasCelebrationBeenShown(celebrationId) {
    const shown = this.get(this.KEYS.celebrationsShown, {});
    return shown[celebrationId] === this.getToday();
  },

  /**
   * Mark a celebration as shown
   * @param {string} celebrationId - Unique celebration identifier
   */
  markCelebrationShown(celebrationId) {
    const shown = this.get(this.KEYS.celebrationsShown, {});
    shown[celebrationId] = this.getToday();
    this.set(this.KEYS.celebrationsShown, shown);
  },

  // ============ Overall Progress ============

  /**
   * Get overall progress percentage
   * @returns {number} Percentage 0-100
   */
  getOverallProgress() {
    const lessonProgress = this.getLessonProgress();
    const diagnosticDone = this.getDiagnosticResults() !== null;

    let completed = 0;
    let total = 13; // 6 lessons + 6 worksheets + diagnostic

    if (diagnosticDone) completed++;

    for (let i = 1; i <= 6; i++) {
      if (lessonProgress[i]?.completed) completed++;
      if (lessonProgress[i]?.worksheetDone) completed++;
    }

    return Math.round((completed / total) * 100);
  }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Storage;
}
