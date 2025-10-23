const responses = [
    "YES",
    "NO",
    "MAYBE",
    "ASK AGAIN",
    "DEFINITELY",
    "DOUBTFUL"
];

const eightBall = document.getElementById('eightBall');
const responseDie = document.getElementById('responseDie');
const responseText = document.getElementById('responseText');
const instruction = document.querySelector('.instruction');
let isAnimating = false;
let lastResponse = "";

function getRandomResponse() {
    let newResponse;
    do {
        newResponse = responses[Math.floor(Math.random() * responses.length)];
    } while (newResponse === lastResponse && responses.length > 1);
    lastResponse = newResponse;
    return newResponse;
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

    // Create ripple effect
    if (event) {
        const rect = eightBall.getBoundingClientRect();
        const x = (event.clientX || event.touches[0].clientX) - rect.left;
        const y = (event.clientY || event.touches[0].clientY) - rect.top;
        createRipple(x + rect.left, y + rect.top);
    }

    // Hide previous response
    responseDie.classList.remove('show');
    responseDie.classList.add('hiding');

    // Add shake animation
    eightBall.classList.add('shake');

    // After shake, show new response
    setTimeout(() => {
        responseDie.classList.remove('hiding');
        responseText.textContent = getRandomResponse();
        responseDie.classList.add('show');

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
