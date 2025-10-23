// ============================================
// SLIDESHOW CORE
// ============================================
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots-container');
const totalSlides = slides.length;
let currentSlide = 0;
let autoPlayInterval;
let progressInterval;
const autoPlayDelay = 5000; // 5 seconds

// Image preloading
slides.forEach(slide => {
    const img = slide.querySelector('img');
    const preloadImg = new Image();
    preloadImg.src = img.src;
});

// ============================================
// NAVIGATION DOTS WITH PROGRESS
// ============================================
function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');

        // Progress ring SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('progress-ring');
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.classList.add('progress-ring-circle');
        circle.setAttribute('cx', '28');
        circle.setAttribute('cy', '28');
        circle.setAttribute('r', '26');
        svg.appendChild(circle);

        const dotInner = document.createElement('div');
        dotInner.className = 'dot-inner';

        dot.appendChild(svg);
        dot.appendChild(dotInner);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Progress ring animation
function animateProgress() {
    const activeDot = document.querySelector('.dot.active');
    const circle = activeDot.querySelector('.progress-ring-circle');
    const circumference = 164;
    let progress = 0;
    const step = 100 / (autoPlayDelay / 50); // Update every 50ms

    clearInterval(progressInterval);
    circle.style.strokeDashoffset = circumference;

    progressInterval = setInterval(() => {
        progress += step;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        const offset = circumference - (progress / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }, 50);
}

// ============================================
// CONFETTI ANIMATION
// ============================================
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Traditional confetti colors
const confettiColors = [
    '#FF0000', // Red
    '#0000FF', // Blue
    '#FFD700', // Yellow/Gold
    '#00FF00', // Green
    '#9370DB', // Purple
    '#FF8C00', // Orange
    '#FF69B4'  // Pink
];

let confettiParticles = [];

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.opacity = 1;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height * 0.8) {
            this.opacity -= 0.02;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 1.5);
        ctx.restore();
    }
}

function triggerConfetti() {
    for (let i = 0; i < 100; i++) {
        confettiParticles.push(new ConfettiParticle());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiParticles = confettiParticles.filter(particle => {
        particle.update();
        particle.draw();
        return particle.opacity > 0 && particle.y < canvas.height;
    });

    requestAnimationFrame(animateConfetti);
}

animateConfetti();

// ============================================
// SLIDE NAVIGATION
// ============================================
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    currentSlide = index;
    updateDots();
    triggerConfetti();
    animateProgress();
}

function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
    resetAutoPlay();
}

function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
    resetAutoPlay();
}

function goToSlide(index) {
    if (index !== currentSlide) {
        showSlide(index);
        resetAutoPlay();
    }
}

// ============================================
// AUTO-PLAY
// ============================================
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    animateProgress();
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
    clearInterval(progressInterval);
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// ============================================
// KEYBOARD CONTROLS
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === ' ') {
        e.preventDefault();
        if (autoPlayInterval) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    }
});

// ============================================
// TOUCH/SWIPE GESTURES
// ============================================
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

document.getElementById('slideshow').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('slideshow').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Click on image to advance
slides.forEach(slide => {
    slide.addEventListener('click', nextSlide);
});

// Arrow button clicks
document.getElementById('prevBtn').addEventListener('click', prevSlide);
document.getElementById('nextBtn').addEventListener('click', nextSlide);

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ============================================
// INITIALIZE
// ============================================
createDots();
startAutoPlay();

// Initial confetti burst
setTimeout(triggerConfetti, 500);
