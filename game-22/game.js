// game.js — Core game logic & state machine
const Game = (() => {
  // State
  const STATE = { START: 'START', QUESTION: 'QUESTION', TAPPING: 'TAPPING', GAME_OVER: 'GAME_OVER', TRANSITION: 'TRANSITION' };
  let state = STATE.START;
  let questions = [];
  let roundQuestions = [];
  let currentIndex = 0;
  let quizScore = 0;
  let streakBonusTotal = 0;
  let tapTotalScore = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let timerInterval = null;
  let timeLeft = 0;
  let timerStart = 0;
  let currentTimerDuration = 0;
  let lastDisplayedSecond = 0;
  let shuffledCorrect = 0;
  let streak = 0;
  let bestStreak = 0;
  let missedQuestions = [];
  let progressResults = []; // 'correct' | 'wrong' per question

  const TOTAL_QUESTIONS = 16;
  const MINIGAME_DURATION = 10000; // 10 seconds per mini-game round
  const MINIGAME_AFTER_EVERY_QUESTION = true; // mini-game after each question
  const TIMER_SECONDS = 16; // 16 seconds per question, all difficulties
  const POINTS = { easy: 100, medium: 250, hard: 500 };
  const STORAGE_KEY = 'super16_highscore';

  // DOM refs
  const $ = (s) => document.querySelector(s);
  const screens = {
    start: $('#start-screen'),
    game: $('#game-screen'),
    tapping: $('#tapping-screen'),
    gameover: $('#gameover-screen'),
  };

  const els = {
    playBtn: $('#btn-play'),
    questionText: $('#question-text'),
    answers: Array.from(document.querySelectorAll('.answer-btn')),
    timerText: $('#timer-text'),
    timerRing: $('#timer-ring-fg'),
    scoreDisplay: $('#score-display'),
    scoreValue: $('#score-display span'),
    questionNum: $('#question-num'),
    questionNumValue: $('#question-num span'),
    categoryBadge: $('#category-badge'),
    diffDots: Array.from(document.querySelectorAll('.difficulty-dot')),
    learningPopup: $('#learning-popup'),
    streakBar: $('#streak-bar'),
    streakIcon: $('#streak-icon'),
    streakText: $('#streak-text'),
    progressBar: $('#progress-bar'),
    // Tapping
    tappingArea: $('#tapping-area'),
    tappingScore: $('#tapping-score'),
    tappingTimerBar: $('#tapping-timer-bar'),
    // Game over
    gameoverTitle: $('#gameover-title'),
    gameoverSubtitle: $('#gameover-subtitle'),
    newHighScore: $('#new-high-score'),
    finalScore: $('#final-score'),
    correctCountEl: $('#correct-count'),
    wrongCountEl: $('#wrong-count'),
    bestStreakEl: $('#best-streak-count'),
    quizPointsEl: $('#quiz-points'),
    streakPointsEl: $('#streak-points'),
    tapPointsEl: $('#tap-points'),
    allTimeBestEl: $('#all-time-best'),
    reviewSection: $('#review-section'),
    reviewBtn: $('#btn-review'),
    reviewList: $('#review-list'),
    playAgainBtn: $('#btn-play-again'),
    highScoreDisplay: $('#high-score-display'),
    // Transition
    transitionOverlay: $('#transition-overlay'),
    transitionText: $('#transition-text'),
  };

  // ===== INIT =====
  function init() {
    questions = QUESTIONS_DATA;
    els.playBtn.addEventListener('click', startGame);
    els.playAgainBtn.addEventListener('click', startGame);
    els.reviewBtn.addEventListener('click', toggleReview);
    els.answers.forEach((btn, i) => {
      btn.addEventListener('click', () => selectAnswer(i));
    });
    TappingGame.init(els.tappingArea, els.tappingScore, els.tappingTimerBar);
    MiniGameRouter.init(
      els.tappingArea, els.tappingScore, els.tappingTimerBar,
      $('#minigame-title'), $('#minigame-subtitle')
    );
    showHighScore();
  }

  // ===== HIGH SCORE =====
  function getHighScore() {
    try {
      return parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
    } catch (e) { return 0; }
  }

  function saveHighScore(score) {
    try {
      const current = getHighScore();
      if (score > current) {
        localStorage.setItem(STORAGE_KEY, score);
        return true; // new high score
      }
    } catch (e) {}
    return false;
  }

  function showHighScore() {
    const hs = getHighScore();
    if (hs > 0) {
      els.highScoreDisplay.textContent = 'High Score: ' + hs.toLocaleString();
      els.highScoreDisplay.classList.add('visible');
    } else {
      els.highScoreDisplay.classList.remove('visible');
    }
  }

  // ===== SCREEN MANAGEMENT =====
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  // ===== START GAME =====
  function startGame() {
    SoundFX.init();
    clearInterval(timerInterval);
    quizScore = 0;
    streakBonusTotal = 0;
    tapTotalScore = 0;
    correctCount = 0;
    wrongCount = 0;
    currentIndex = 0;
    streak = 0;
    bestStreak = 0;
    missedQuestions = [];
    progressResults = [];
    els.reviewList.innerHTML = '';
    els.reviewList.classList.remove('visible');
    els.reviewBtn.textContent = 'Review Mistakes';
    MiniGameRouter.reset();
    selectRoundQuestions();
    buildProgressBar();
    updateStreakDisplay();
    showScreen('game');
    state = STATE.QUESTION;
    showQuestion();
  }

  function selectRoundQuestions() {
    // Pick 6 easy, 6 medium, 4 hard = 16 questions
    // Ensure category balance: pick from each category proportionally
    const byDifficulty = {
      easy: shuffle(questions.filter(q => q.difficulty === 'easy')),
      medium: shuffle(questions.filter(q => q.difficulty === 'medium')),
      hard: shuffle(questions.filter(q => q.difficulty === 'hard')),
    };
    const easy = pickBalanced(byDifficulty.easy, 6);
    const medium = pickBalanced(byDifficulty.medium, 6);
    const hard = pickBalanced(byDifficulty.hard, 4);
    roundQuestions = shuffle([...easy, ...medium, ...hard]);
  }

  // Pick N questions ensuring category diversity
  function pickBalanced(pool, count) {
    const categories = ['Math', 'English', 'Science', 'History'];
    const byCategory = {};
    categories.forEach(c => {
      byCategory[c] = pool.filter(q => q.category === c);
    });
    const result = [];
    let catIdx = 0;
    while (result.length < count) {
      const cat = categories[catIdx % categories.length];
      if (byCategory[cat].length > 0) {
        result.push(byCategory[cat].shift());
      }
      catIdx++;
      // Safety: if we've cycled through all categories and still need more
      if (catIdx > count * 4) {
        const remaining = pool.filter(q => !result.includes(q));
        while (result.length < count && remaining.length > 0) {
          result.push(remaining.shift());
        }
        break;
      }
    }
    return result;
  }

  // ===== PROGRESS BAR =====
  function buildProgressBar() {
    els.progressBar.innerHTML = '';
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      const dot = document.createElement('div');
      dot.className = 'progress-dot';
      els.progressBar.appendChild(dot);
    }
  }

  function updateProgressDot(index, result) {
    const dots = els.progressBar.children;
    if (dots[index]) {
      dots[index].classList.add(result); // 'correct' or 'wrong'
    }
  }

  function highlightCurrentDot(index) {
    const dots = els.progressBar.children;
    Array.from(dots).forEach(d => d.classList.remove('current'));
    if (dots[index]) dots[index].classList.add('current');
  }

  // ===== STREAK =====
  function updateStreakDisplay() {
    if (streak >= 3) {
      const mult = getStreakMultiplier();
      let icon = '\u{1F525}'; // fire
      if (streak >= 7) icon = '\u{26A1}'; // lightning
      else if (streak >= 5) icon = '\u{1F4A5}'; // boom
      els.streakIcon.textContent = icon;
      els.streakText.textContent = streak + ' streak! ' + mult + 'x';
      els.streakBar.classList.add('visible');
    } else {
      els.streakBar.classList.remove('visible');
    }
  }

  function getStreakMultiplier() {
    if (streak >= 7) return 3;
    if (streak >= 5) return 2;
    if (streak >= 3) return 1.5;
    return 1;
  }

  // ===== SHOW QUESTION =====
  function showQuestion() {
    if (currentIndex >= TOTAL_QUESTIONS) {
      endGame();
      return;
    }

    state = STATE.QUESTION;
    const q = roundQuestions[currentIndex];

    // Shuffle answer options
    const answerPairs = q.answers.map((text, i) => ({ text, isCorrect: i === q.correct }));
    const shuffledAnswers = shuffle(answerPairs);
    shuffledCorrect = shuffledAnswers.findIndex(a => a.isCorrect);

    // Update UI
    els.questionText.textContent = q.question;
    els.questionNumValue.textContent = currentIndex + 1;
    els.categoryBadge.textContent = q.category;
    updateScoreDisplay();
    highlightCurrentDot(currentIndex);

    // Difficulty dots
    const level = q.difficulty === 'easy' ? 1 : q.difficulty === 'medium' ? 2 : 3;
    els.diffDots.forEach((dot, i) => {
      dot.classList.toggle('filled', i < level);
    });

    // Answers (shuffled)
    els.answers.forEach((btn, i) => {
      btn.className = 'answer-btn';
      btn.querySelector('.answer-label').textContent = shuffledAnswers[i].text;
    });

    // Hide learning popup
    els.learningPopup.classList.remove('show');

    // Start timer (uniform 16s)
    startTimer();
  }

  // ===== SCORE DISPLAY =====
  function updateScoreDisplay() {
    const total = quizScore + streakBonusTotal + tapTotalScore;
    els.scoreValue.textContent = total;
  }

  function animateScorePop() {
    els.scoreDisplay.classList.remove('score-pop');
    void els.scoreDisplay.offsetHeight; // force reflow
    els.scoreDisplay.classList.add('score-pop');
  }

  // ===== TIMER (wall-clock, uniform 16s) =====
  function startTimer() {
    currentTimerDuration = TIMER_SECONDS;
    timeLeft = currentTimerDuration;
    timerStart = performance.now();
    lastDisplayedSecond = currentTimerDuration;
    updateTimerDisplay();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      const elapsed = (performance.now() - timerStart) / 1000;
      timeLeft = Math.max(0, currentTimerDuration - elapsed);
      if (timeLeft <= 0) {
        timeLeft = 0;
        clearInterval(timerInterval);
        updateTimerDisplay();
        timeUp();
        return;
      }
      const currentSecond = Math.ceil(timeLeft);
      if (currentSecond !== lastDisplayedSecond && currentSecond > 0 && currentSecond <= 5) {
        SoundFX.countdown();
      }
      lastDisplayedSecond = currentSecond;
      updateTimerDisplay();
    }, 100);
  }

  function updateTimerDisplay() {
    const secs = Math.max(0, Math.ceil(timeLeft));
    els.timerText.textContent = secs;
    const pct = timeLeft / currentTimerDuration;
    const offset = 283 * (1 - pct);
    els.timerRing.style.strokeDashoffset = offset;

    els.timerRing.classList.remove('warning', 'danger');
    els.timerText.classList.remove('warning', 'danger');
    if (timeLeft <= 5) {
      els.timerRing.classList.add('danger');
      els.timerText.classList.add('danger');
    } else if (timeLeft <= 10) {
      els.timerRing.classList.add('warning');
      els.timerText.classList.add('warning');
    }
  }

  function timeUp() {
    state = STATE.TRANSITION;
    streak = 0;
    updateStreakDisplay();
    wrongCount++;
    const q = roundQuestions[currentIndex];
    SoundFX.wrong();

    progressResults.push('wrong');
    updateProgressDot(currentIndex, 'wrong');

    // Track missed question
    missedQuestions.push({
      question: q.question,
      correctAnswer: q.answers[q.correct],
      learning: q.learning_objective,
    });

    els.answers[shuffledCorrect].classList.add('correct');
    els.answers.forEach(btn => btn.classList.add('disabled'));

    showLearning(q.learning_objective);
    setTimeout(advanceAfterQuestion, 2500);
  }

  // ===== SELECT ANSWER =====
  function selectAnswer(index) {
    if (state !== STATE.QUESTION) return;
    state = STATE.TRANSITION;
    clearInterval(timerInterval);
    SoundFX.select();

    const q = roundQuestions[currentIndex];
    const btn = els.answers[index];

    els.answers.forEach(b => b.classList.add('disabled'));
    btn.classList.add('selected');

    setTimeout(() => {
      if (index === shuffledCorrect) {
        btn.classList.add('correct');
        // Calculate points with streak multiplier
        const basePoints = POINTS[q.difficulty];
        const mult = getStreakMultiplier();
        const points = Math.round(basePoints * mult);
        const bonus = points - basePoints;
        quizScore += basePoints;
        streakBonusTotal += bonus;
        correctCount++;
        streak++;
        if (streak > bestStreak) bestStreak = streak;
        updateStreakDisplay();
        SoundFX.correct();
        spawnParticles(btn);
        animateScorePop();

        progressResults.push('correct');
        updateProgressDot(currentIndex, 'correct');

        // Show multiplier floating text if streak active
        if (mult > 1) {
          showFloatingMultiplier(btn, mult + 'x!');
        }
      } else {
        btn.classList.add('wrong');
        els.answers[shuffledCorrect].classList.add('correct');
        streak = 0;
        updateStreakDisplay();
        wrongCount++;
        SoundFX.wrong();

        progressResults.push('wrong');
        updateProgressDot(currentIndex, 'wrong');

        missedQuestions.push({
          question: q.question,
          correctAnswer: q.answers[q.correct],
          learning: q.learning_objective,
        });
      }
      updateScoreDisplay();
      showLearning(q.learning_objective);
      setTimeout(advanceAfterQuestion, 2200);
    }, 500);
  }

  function showFloatingMultiplier(btn, text) {
    const rect = btn.getBoundingClientRect();
    const floater = document.createElement('div');
    floater.className = 'floating-multiplier';
    floater.textContent = text;
    floater.style.left = (rect.left + rect.width / 2) + 'px';
    floater.style.top = (rect.top - 10) + 'px';
    document.body.appendChild(floater);
    setTimeout(() => floater.remove(), 900);
  }

  // ===== ADVANCE =====
  function advanceAfterQuestion() {
    currentIndex++;
    if (currentIndex >= TOTAL_QUESTIONS) {
      endGame();
    } else if (MINIGAME_AFTER_EVERY_QUESTION) {
      startMiniGamePhase();
    } else {
      showQuestion();
    }
  }

  // ===== MINI-GAME PHASE =====
  function startMiniGamePhase() {
    state = STATE.TAPPING;
    showTransition('Skill Challenge!', () => {
      showScreen('tapping');
      MiniGameRouter.startNext(MINIGAME_DURATION, (mgScore) => {
        tapTotalScore += mgScore;
        showTransition('+' + mgScore + ' Bonus!', () => {
          showScreen('game');
          showQuestion();
        });
      });
    });
  }

  // ===== TRANSITION =====
  function showTransition(text, callback) {
    els.transitionText.textContent = text;
    els.transitionOverlay.classList.add('active');
    setTimeout(() => {
      els.transitionOverlay.classList.remove('active');
      setTimeout(callback, 250);
    }, 600);
  }

  // ===== LEARNING POPUP =====
  function showLearning(text) {
    els.learningPopup.textContent = '\u{1F4DA} ' + text;
    els.learningPopup.classList.add('show');
  }

  // ===== REVIEW MISTAKES =====
  function toggleReview() {
    const list = els.reviewList;
    if (list.classList.contains('visible')) {
      list.classList.remove('visible');
      els.reviewBtn.textContent = 'Review Mistakes';
    } else {
      if (missedQuestions.length === 0) {
        list.innerHTML = '<div class="review-item review-perfect">No mistakes! Perfect round!</div>';
      } else {
        list.innerHTML = missedQuestions.map(mq =>
          '<div class="review-item">' +
            '<div class="review-question">' + escapeHtml(mq.question) + '</div>' +
            '<div class="review-answer">Answer: ' + escapeHtml(mq.correctAnswer) + '</div>' +
            '<div class="review-learning">' + escapeHtml(mq.learning) + '</div>' +
          '</div>'
        ).join('');
      }
      list.classList.add('visible');
      els.reviewBtn.textContent = 'Hide Review';
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ===== END GAME =====
  function endGame() {
    state = STATE.GAME_OVER;
    clearInterval(timerInterval);

    const total = quizScore + streakBonusTotal + tapTotalScore;
    const pct = Math.round((correctCount / TOTAL_QUESTIONS) * 100);
    const isNewHigh = saveHighScore(total);

    // Title & subtitle
    if (correctCount === TOTAL_QUESTIONS) {
      els.gameoverTitle.textContent = 'Perfect Score!';
      els.gameoverSubtitle.textContent = 'You got all 16 right!';
      SoundFX.victory();
      spawnConfetti();
    } else if (pct >= 90) {
      els.gameoverTitle.textContent = 'Genius!';
      els.gameoverSubtitle.textContent = 'Almost perfect \u2014 incredible job!';
      SoundFX.victory();
      spawnConfetti();
    } else if (pct >= 70) {
      els.gameoverTitle.textContent = 'Great Job!';
      els.gameoverSubtitle.textContent = 'You really know your stuff!';
      SoundFX.victory();
      spawnConfetti();
    } else if (pct >= 50) {
      els.gameoverTitle.textContent = 'Good Try!';
      els.gameoverSubtitle.textContent = 'Keep learning and you\'ll ace it!';
      SoundFX.correct();
    } else {
      els.gameoverTitle.textContent = 'Keep Practicing!';
      els.gameoverSubtitle.textContent = 'Every question is a chance to learn!';
      SoundFX.gameOver();
    }

    // New high score badge
    if (isNewHigh && total > 0) {
      els.newHighScore.classList.add('visible');
    } else {
      els.newHighScore.classList.remove('visible');
    }

    els.finalScore.textContent = total.toLocaleString();
    els.correctCountEl.textContent = correctCount;
    els.wrongCountEl.textContent = wrongCount;
    els.bestStreakEl.textContent = bestStreak;
    els.quizPointsEl.textContent = quizScore.toLocaleString();
    els.streakPointsEl.textContent = streakBonusTotal.toLocaleString();
    els.tapPointsEl.textContent = tapTotalScore.toLocaleString();
    els.allTimeBestEl.textContent = getHighScore().toLocaleString();

    showScreen('gameover');
    showHighScore(); // update start screen for next time
  }

  // ===== PARTICLES =====
  function spawnParticles(targetEl) {
    const rect = targetEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const container = document.createElement('div');
    container.className = 'particle-burst';
    container.style.left = cx + 'px';
    container.style.top = cy + 'px';
    const colors = ['#ffd700', '#00e676', '#6c63ff', '#ff6b6b', '#4ecdc4'];
    const animations = [];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const angle = (Math.PI * 2 * i) / 12;
      const dist = 40 + Math.random() * 40;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      p.style.background = colors[i % colors.length];
      const anim = p.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 },
      ], { duration: 700, easing: 'ease-out', fill: 'forwards' });
      animations.push(anim);
      container.appendChild(p);
    }
    document.body.appendChild(container);
    setTimeout(() => {
      animations.forEach(a => a.cancel());
      container.remove();
    }, 800);
  }

  // ===== CONFETTI =====
  function spawnConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#a29bfe', '#00e676', '#ff8b94', '#f7dc6f'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = (6 + Math.random() * 8) + 'px';
      piece.style.height = (6 + Math.random() * 8) + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.animationDuration = (2 + Math.random() * 3) + 's';
      piece.style.animationDelay = (Math.random() * 2) + 's';
      container.appendChild(piece);
    }
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 6000);
  }

  // ===== UTIL =====
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  return { init };
})();

// Boot
document.addEventListener('DOMContentLoaded', () => Game.init());
