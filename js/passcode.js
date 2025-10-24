// ============================================
// PASSCODE AUTHENTICATION SYSTEM
// ============================================

// CONSTANTS
const CORRECT_CODE = '0834';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// STATE
let enteredCode = '';
let attemptsLeft = MAX_ATTEMPTS;

// DOM ELEMENTS
const passcodeScreen = document.getElementById('passcode-screen');
const lockoutScreen = document.getElementById('lockout-screen');
const dots = document.querySelectorAll('.dot');
const attemptsLeftElement = document.getElementById('attempts-left');
const attemptCounter = document.getElementById('attempt-counter');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const breachWarning = document.getElementById('breach-warning');
const warningIcon = document.getElementById('warning-icon');

// ============================================
// INITIALIZATION
// ============================================

function init() {
    checkLockoutStatus();
    loadAttempts();
    updateAttemptDisplay();
    attachKeypadListeners();
    attachKeyboardListener();
}

// ============================================
// LOCKOUT MANAGEMENT
// ============================================

function checkLockoutStatus() {
    const lockoutTime = localStorage.getItem('lockoutTime');

    if (lockoutTime) {
        const lockoutTimestamp = parseInt(lockoutTime);
        const currentTime = Date.now();
        const timeElapsed = currentTime - lockoutTimestamp;

        // Check if 24 hours have passed
        if (timeElapsed >= LOCKOUT_DURATION_MS) {
            // Reset lockout
            localStorage.removeItem('lockoutTime');
            localStorage.setItem('passcodeAttempts', MAX_ATTEMPTS.toString());
            attemptsLeft = MAX_ATTEMPTS;
        } else {
            // Still locked out
            showLockoutScreen();
            return;
        }
    }
}

function triggerLockout() {
    // Record lockout time
    localStorage.setItem('lockoutTime', Date.now().toString());
    localStorage.setItem('passcodeAttempts', '0');
    showLockoutScreen();
}

function showLockoutScreen() {
    passcodeScreen.style.display = 'none';
    lockoutScreen.style.display = 'flex';
    animateFakeProgress();
}

function animateFakeProgress() {
    let progress = 0;

    const interval = setInterval(() => {
        // Random increments for realism
        progress += Math.random() * 3 + 1;

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            showBreachWarning();
        }

        progressBar.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';
    }, 150);
}

function showBreachWarning() {
    breachWarning.style.display = 'block';
    // Stop warning icon flashing, make it solid red
    warningIcon.classList.remove('flashing');
    warningIcon.style.filter = 'drop-shadow(0 0 40px #ff0000)';
}

// ============================================
// ATTEMPT MANAGEMENT
// ============================================

function loadAttempts() {
    const stored = localStorage.getItem('passcodeAttempts');
    attemptsLeft = stored ? parseInt(stored) : MAX_ATTEMPTS;
}

function updateAttemptDisplay() {
    attemptsLeftElement.textContent = attemptsLeft;

    // Warning state when 2 or fewer attempts
    if (attemptsLeft <= 2) {
        attemptCounter.classList.add('warning');
    } else {
        attemptCounter.classList.remove('warning');
    }
}

// ============================================
// KEYPAD INPUT HANDLING
// ============================================

function attachKeypadListeners() {
    const keys = document.querySelectorAll('.key[data-key]');

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const keyValue = key.getAttribute('data-key');
            handleKeyPress(keyValue);
        });
    });
}

function attachKeyboardListener() {
    document.addEventListener('keydown', (e) => {
        if (lockoutScreen.style.display === 'flex') return; // Ignore if locked out

        if (e.key >= '0' && e.key <= '9') {
            handleKeyPress(e.key);
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            handleKeyPress('delete');
        }
    });
}

function handleKeyPress(key) {
    if (key === 'delete') {
        if (enteredCode.length > 0) {
            enteredCode = enteredCode.slice(0, -1);
            updateDots();
        }
        return;
    }

    // Add digit if less than 4
    if (enteredCode.length < 4) {
        enteredCode += key;
        updateDots();

        // Auto-validate when 4 digits entered
        if (enteredCode.length === 4) {
            setTimeout(validateCode, 400);
        }
    }
}

// ============================================
// DOT VISUALIZATION
// ============================================

function updateDots() {
    dots.forEach((dot, index) => {
        if (index < enteredCode.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function clearDots() {
    dots.forEach(dot => dot.classList.remove('filled'));
}

// ============================================
// CODE VALIDATION
// ============================================

function validateCode() {
    if (enteredCode === CORRECT_CODE) {
        handleSuccess();
    } else {
        handleFailure();
    }
}

function handleSuccess() {
    // Visual feedback (could add success animation here)
    dots.forEach(dot => {
        dot.style.background = '#00C9B7';
        dot.style.boxShadow = '0 0 30px rgba(0, 201, 183, 1)';
    });

    // Set authentication in sessionStorage
    const today = new Date().toDateString();
    sessionStorage.setItem('authenticated', 'true');
    sessionStorage.setItem('authDate', today);

    // Reset attempts for next session
    localStorage.setItem('passcodeAttempts', MAX_ATTEMPTS.toString());
    localStorage.removeItem('lockoutTime');

    // Redirect after brief delay
    setTimeout(() => {
        const redirect = getRedirectURL();
        window.location.href = redirect;
    }, 600);
}

function handleFailure() {
    attemptsLeft--;
    localStorage.setItem('passcodeAttempts', attemptsLeft.toString());

    if (attemptsLeft <= 0) {
        triggerLockout();
    } else {
        // Shake animation
        passcodeScreen.classList.add('shake-error');

        setTimeout(() => {
            passcodeScreen.classList.remove('shake-error');
        }, 600);

        // Clear input
        enteredCode = '';
        clearDots();
        updateAttemptDisplay();
    }
}

// ============================================
// REDIRECT HANDLING
// ============================================

function getRedirectURL() {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');

    // Default to homepage if no redirect specified
    return redirect || '/index.html';
}

// ============================================
// START
// ============================================

init();
