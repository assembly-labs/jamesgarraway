// Storage key for the screen time checklist (same as in checklist.js)
const SCREEN_CHECKLIST_KEY = 'aolkids.screenTimeChecklist';

const eightBall = document.getElementById('eightBall');
const responseDie = document.getElementById('responseDie');
const responseText = document.getElementById('responseText');
const instruction = document.querySelector('.instruction');
const reasonDisplay = document.getElementById('reasonDisplay');
let isAnimating = false;

// Check if it's a weekend (Saturday = 6, Sunday = 0)
function isWeekend() {
    const day = new Date().getDay();
    return day === 0 || day === 6;
}

// Check if the "After School" checklist is complete
function isChampionRoutineComplete() {
    const stored = localStorage.getItem(SCREEN_CHECKLIST_KEY);
    if (!stored) return false;

    try {
        const checklist = JSON.parse(stored);
        return checklist.every(item => item.done);
    } catch (e) {
        return false;
    }
}

// Get current hour and minute
function getCurrentTime() {
    const now = new Date();
    return {
        hour: now.getHours(),
        minute: now.getMinutes()
    };
}

// Determine if games are allowed and the reason why
function canPlayGames() {
    const weekend = isWeekend();
    const time = getCurrentTime();
    const currentMinutes = time.hour * 60 + time.minute; // Total minutes since midnight

    if (weekend) {
        // Weekend: After 10:00 AM = YES
        const tenAM = 10 * 60; // 600 minutes
        if (currentMinutes >= tenAM) {
            return { allowed: true, reason: "It's the weekend and it's past 10:00 AM!" };
        } else {
            const timeStr = formatTime(10, 0);
            return { allowed: false, reason: `Weekend screens start at ${timeStr}. Patience, young champion!` };
        }
    } else {
        // School day: After 4:30 PM AND Champion Routine complete = YES
        const fourThirtyPM = 16 * 60 + 30; // 990 minutes

        if (currentMinutes < fourThirtyPM) {
            const timeStr = formatTime(16, 30);
            return { allowed: false, reason: `School day screens start at ${timeStr}. Focus on being awesome!` };
        }

        // It's past 4:30 PM, check the checklist
        if (isChampionRoutineComplete()) {
            return { allowed: true, reason: "Champion Routine complete! You've earned it!" };
        } else {
            return { allowed: false, reason: "Complete your Champion Routine first! Check the AFTER SCHOOL tasks." };
        }
    }
}

// Format time in 12-hour format with AM/PM
function formatTime(hour, minute) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
}

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = '25px';
    ripple.style.left = x - 12.5 + 'px';
    ripple.style.top = y - 12.5 + 'px';
    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 700);
}

function shakeAndRespond(event) {
    if (isAnimating) return;

    isAnimating = true;
    instruction.style.opacity = '0';
    reasonDisplay.style.opacity = '0';
    reasonDisplay.textContent = '';

    // Create ripple effect
    if (event) {
        const rect = eightBall.getBoundingClientRect();
        const x = (event.clientX || event.touches[0].clientX) - rect.left;
        const y = (event.clientY || event.touches[0].clientY) - rect.top;
        createRipple(x + rect.left, y + rect.top);
    }

    // Hide previous response
    responseDie.classList.remove('show', 'yes-response', 'no-response');
    responseDie.classList.add('hiding');

    // Add shake animation
    eightBall.classList.add('shake');

    // After shake, show response based on rules
    setTimeout(() => {
        responseDie.classList.remove('hiding');

        const result = canPlayGames();
        const answer = result.allowed ? 'YES' : 'NO';

        responseText.textContent = answer;
        responseDie.classList.add('show');
        responseDie.classList.add(result.allowed ? 'yes-response' : 'no-response');

        // Show the reason after the die appears
        setTimeout(() => {
            reasonDisplay.textContent = result.reason;
            reasonDisplay.className = 'reason-display ' + (result.allowed ? 'reason-yes' : 'reason-no');
            reasonDisplay.style.opacity = '1';
        }, 600);

        // Add subtle bubbles
        for (let i = 0; i < 2; i++) {
            setTimeout(() => {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                bubble.style.width = bubble.style.height = Math.random() * 1.5 + 0.5 + 'px';
                bubble.style.left = Math.random() * 80 + 10 + '%';
                bubble.style.bottom = Math.random() * 20 + 'px';
                bubble.style.animation = `floatUp ${Math.random() * 2 + 3}s ease-in-out`;
                document.querySelector('.liquid').appendChild(bubble);

                setTimeout(() => bubble.remove(), 4000);
            }, i * 300);
        }
    }, 600);

    // Remove shake class
    setTimeout(() => {
        eightBall.classList.remove('shake');
        isAnimating = false;
        instruction.style.opacity = '0.3';
    }, 1200);
}

// Event listeners
document.body.addEventListener('click', shakeAndRespond);
document.body.addEventListener('touchstart', (e) => {
    e.preventDefault();
    shakeAndRespond(e);
});

// Prevent double-tap zoom
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Occasional ambient bubble
setInterval(() => {
    if (!isAnimating && Math.random() > 0.8) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.width = bubble.style.height = Math.random() * 1 + 0.5 + 'px';
        bubble.style.left = Math.random() * 80 + 10 + '%';
        bubble.style.bottom = Math.random() * 15 + 'px';
        bubble.style.animation = `floatUp ${Math.random() * 3 + 4}s ease-in-out`;
        bubble.style.opacity = '0.5';
        document.querySelector('.liquid').appendChild(bubble);

        setTimeout(() => bubble.remove(), 5000);
    }
}, 4000);
