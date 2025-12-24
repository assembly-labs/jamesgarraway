/**
 * Coaches Corner - Expandable help drawer with video tutorials
 * Provides in-lesson math explanations and curated YouTube videos
 */

const CoachesCorner = {
  // Video database for each lesson
  lessons: {
    1: {
      title: "Equal Parts",
      concept: "Understanding that fractions represent equal-sized pieces",
      textExplanation: `
        <h4>What Are Equal Parts?</h4>
        <p>When we divide something into <strong>equal parts</strong>, each piece must be the <strong>same size</strong>.</p>
        <p>Think of a pizza: if you cut it into 4 slices, each slice should be the same size for them to be equal parts!</p>
        <div class="coach-tip">
          <strong>Coach's Tip:</strong> If you can stack the pieces on top of each other and they match perfectly, they're equal!
        </div>
      `,
      videos: [
        {
          id: "DnFrOetuUKg",
          title: "Math Antics - Fractions Are Parts",
          channel: "Math Antics",
          duration: "5:17",
          description: "Learn what fractions are and how they represent equal parts of a whole."
        },
        {
          id: "n0FZhQ_GkKw",
          title: "Equal Parts of a Whole",
          channel: "Math with Mr. J",
          duration: "4:52",
          description: "Understanding how to identify and create equal parts."
        }
      ]
    },
    2: {
      title: "Improper Fractions & Mixed Numbers",
      concept: "Converting between improper fractions and mixed numbers",
      textExplanation: `
        <h4>Improper Fractions vs Mixed Numbers</h4>
        <p>An <strong>improper fraction</strong> has a bigger number on top than on bottom (like 7/4).</p>
        <p>A <strong>mixed number</strong> has a whole number AND a fraction (like 1 3/4).</p>
        <p>They mean the same thing! 7/4 = 1 3/4</p>
        <div class="coach-tip">
          <strong>Coach's Tip:</strong> To convert, divide the top by the bottom. The answer is your whole number, and the remainder goes on top of the same bottom number!
        </div>
      `,
      videos: [
        {
          id: "co2vShwFZl8",
          title: "Mixed Numbers and Improper Fractions",
          channel: "Khan Academy",
          duration: "4:01",
          description: "Clear explanation of converting between mixed numbers and improper fractions."
        },
        {
          id: "qIBLf97F1vM",
          title: "Converting Mixed Numbers to Improper Fractions",
          channel: "Math with Mr. J",
          duration: "5:28",
          description: "Step-by-step guide with examples."
        }
      ]
    },
    3: {
      title: "Adding Fractions",
      concept: "Adding fractions with the same denominator",
      textExplanation: `
        <h4>Adding Fractions (Same Denominator)</h4>
        <p>When adding fractions with the <strong>same bottom number</strong> (denominator):</p>
        <ol>
          <li>Keep the bottom number the same</li>
          <li>Add the top numbers together</li>
        </ol>
        <p>Example: 2/8 + 3/8 = 5/8 (just add 2 + 3!)</p>
        <div class="coach-tip">
          <strong>Coach's Tip:</strong> Think of it like adding slices of pizza. If you have 2 slices and get 3 more, you have 5 slices. The size of each slice (denominator) stays the same!
        </div>
      `,
      videos: [
        {
          id: "MZmENadGcK0",
          title: "Adding Fractions with Common Denominators",
          channel: "Math with Mr. J",
          duration: "4:33",
          description: "Perfect introduction to adding fractions when denominators match."
        },
        {
          id: "52ZlXsFJULI",
          title: "Adding Fractions - Visual Method",
          channel: "Math Antics",
          duration: "5:42",
          description: "Visual approach to understanding fraction addition."
        }
      ]
    },
    4: {
      title: "Subtracting Fractions",
      concept: "Subtracting fractions with the same denominator",
      textExplanation: `
        <h4>Subtracting Fractions (Same Denominator)</h4>
        <p>When subtracting fractions with the <strong>same bottom number</strong>:</p>
        <ol>
          <li>Keep the bottom number the same</li>
          <li>Subtract the top numbers</li>
        </ol>
        <p>Example: 5/8 - 2/8 = 3/8 (just do 5 - 2!)</p>
        <div class="coach-tip">
          <strong>Coach's Tip:</strong> If you eat 2 slices of pizza from your 5 slices, you have 3 slices left. The slice size doesn't change!
        </div>
      `,
      videos: [
        {
          id: "jrRn0wMtx0s",
          title: "Subtracting Fractions with Like Denominators",
          channel: "Khan Academy",
          duration: "3:52",
          description: "Clear, simple explanation of fraction subtraction."
        },
        {
          id: "idvsYgKxt9I",
          title: "How to Subtract Fractions",
          channel: "Math with Mr. J",
          duration: "5:15",
          description: "Step-by-step subtraction with visual models."
        }
      ]
    },
    5: {
      title: "Simplifying Fractions",
      concept: "Reducing fractions to their simplest form using GCF",
      textExplanation: `
        <h4>Simplifying Fractions</h4>
        <p><strong>Simplifying</strong> means making the numbers smaller while keeping the same value.</p>
        <p>Find a number that divides BOTH the top and bottom evenly!</p>
        <p>Example: 4/8 = 2/4 = 1/2 (divide by 2, then by 2 again!)</p>
        <div class="coach-tip">
          <strong>Coach's Tip:</strong> The Greatest Common Factor (GCF) is the biggest number that divides both evenly. Using the GCF gets you to the simplest form in one step!
        </div>
      `,
      videos: [
        {
          id: "66e1GAlGZhI",
          title: "Math Antics - Simplifying Fractions",
          channel: "Math Antics",
          duration: "8:31",
          description: "Comprehensive guide to reducing fractions to lowest terms."
        },
        {
          id: "oFVzcnJfYkg",
          title: "How to Simplify Fractions",
          channel: "Math with Mr. J",
          duration: "6:02",
          description: "Easy method for simplifying any fraction."
        }
      ]
    },
    6: {
      title: "Equivalent Fractions",
      concept: "Understanding that different fractions can represent the same amount",
      textExplanation: `
        <h4>Equivalent Fractions</h4>
        <p><strong>Equivalent fractions</strong> are different fractions that show the <strong>same amount</strong>.</p>
        <p>1/2 = 2/4 = 3/6 = 4/8 (all equal to half!)</p>
        <p>To make an equivalent fraction: multiply (or divide) the top AND bottom by the same number!</p>
        <div class="coach-tip">
          <strong>Coach's Tip:</strong> Think of it like this: 1/2 of a pizza is the same as 2/4 of that pizza. You're just cutting the slices differently!
        </div>
      `,
      videos: [
        {
          id: "dBZ2QGZBH6M",
          title: "Equivalent Fractions for Kids",
          channel: "Math with Mr. J",
          duration: "8:49",
          description: "Complete introduction using fraction strips, models, and number lines."
        },
        {
          id: "zGhKMEuWmGk",
          title: "Equivalent Fractions",
          channel: "Khan Academy",
          duration: "4:26",
          description: "Visual explanation of why equivalent fractions work."
        }
      ]
    }
  },

  // State
  isOpen: false,
  currentLesson: null,
  currentVideo: null,

  // Initialize the component
  init(lessonNumber) {
    this.currentLesson = lessonNumber;
    this.createDrawer();
    this.attachEventListeners();
  },

  // Create the drawer HTML
  createDrawer() {
    const lesson = this.lessons[this.currentLesson];
    if (!lesson) return;

    const drawer = document.createElement('div');
    drawer.id = 'coaches-corner';
    drawer.className = 'coaches-corner';
    drawer.innerHTML = `
      <button class="coaches-corner-tab" id="coachesCornerTab" aria-label="Open Coach's Corner">
        <span class="whistle-icon">🏈</span>
        <span class="tab-text">Coach's Corner</span>
      </button>

      <div class="coaches-corner-drawer" id="coachesCornerDrawer">
        <div class="drawer-header">
          <h3><span class="whistle-icon">🏈</span> Coach's Corner</h3>
          <button class="drawer-close" id="drawerClose" aria-label="Close">&times;</button>
        </div>

        <div class="drawer-content">
          <div class="concept-badge">${lesson.title}</div>

          <div class="explanation-section">
            ${lesson.textExplanation}
          </div>

          <div class="video-section">
            <h4><span class="video-icon">🎬</span> Watch & Learn</h4>
            <p class="video-intro">Need more help? Watch these short videos:</p>

            <div class="video-list">
              ${lesson.videos.map((video, index) => `
                <div class="video-card" data-video-id="${video.id}" data-video-index="${index}">
                  <div class="video-thumbnail">
                    <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}">
                    <span class="video-duration">${video.duration}</span>
                    <div class="play-overlay">
                      <span class="play-button">&#9658;</span>
                    </div>
                  </div>
                  <div class="video-info">
                    <h5>${video.title}</h5>
                    <p class="video-channel">${video.channel}</p>
                    <p class="video-description">${video.description}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="video-player-container" id="videoPlayerContainer">
            <div class="video-player-header">
              <button class="back-to-videos" id="backToVideos">
                <span>&larr;</span> Back to videos
              </button>
            </div>
            <div class="video-player-wrapper">
              <iframe
                id="videoPlayer"
                src="about:blank"
                title="Coach's Corner Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                loading="lazy">
              </iframe>
            </div>
            <div class="video-player-title" id="videoPlayerTitle"></div>
          </div>
        </div>
      </div>

      <div class="drawer-overlay" id="drawerOverlay"></div>
    `;

    document.body.appendChild(drawer);
  },

  // Attach event listeners
  attachEventListeners() {
    const tab = document.getElementById('coachesCornerTab');
    const closeBtn = document.getElementById('drawerClose');
    const overlay = document.getElementById('drawerOverlay');
    const backBtn = document.getElementById('backToVideos');
    const videoCards = document.querySelectorAll('.video-card');

    if (tab) {
      tab.addEventListener('click', () => this.toggle());
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (overlay) {
      overlay.addEventListener('click', () => this.close());
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => this.hideVideoPlayer());
    }

    videoCards.forEach(card => {
      card.addEventListener('click', () => {
        const videoId = card.dataset.videoId;
        const videoIndex = parseInt(card.dataset.videoIndex);
        this.playVideo(videoId, videoIndex);
      });
    });

    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  },

  // Toggle drawer
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },

  // Open drawer
  open() {
    const drawer = document.getElementById('coachesCornerDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const tab = document.getElementById('coachesCornerTab');

    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('visible');
    if (tab) tab.classList.add('hidden');

    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  },

  // Close drawer
  close() {
    const drawer = document.getElementById('coachesCornerDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const tab = document.getElementById('coachesCornerTab');

    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    if (tab) tab.classList.remove('hidden');

    this.isOpen = false;
    this.hideVideoPlayer();
    document.body.style.overflow = '';
  },

  // Play a video
  playVideo(videoId, videoIndex) {
    const playerContainer = document.getElementById('videoPlayerContainer');
    const player = document.getElementById('videoPlayer');
    const title = document.getElementById('videoPlayerTitle');
    const lesson = this.lessons[this.currentLesson];

    if (player && lesson && lesson.videos[videoIndex]) {
      // Use youtube-nocookie for better embed compatibility
      // Added parameters: autoplay, rel=0 (no related videos), modestbranding, playsinline for mobile
      player.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
      if (title) {
        title.textContent = lesson.videos[videoIndex].title;
      }
      if (playerContainer) {
        playerContainer.classList.add('visible');
      }
      this.currentVideo = videoId;
    }
  },

  // Hide video player
  hideVideoPlayer() {
    const playerContainer = document.getElementById('videoPlayerContainer');
    const player = document.getElementById('videoPlayer');

    if (player) {
      player.src = '';
    }
    if (playerContainer) {
      playerContainer.classList.remove('visible');
    }
    this.currentVideo = null;
  },

  // Destroy the component
  destroy() {
    const corner = document.getElementById('coaches-corner');
    if (corner) {
      corner.remove();
    }
    this.isOpen = false;
    this.currentLesson = null;
    this.currentVideo = null;
    document.body.style.overflow = '';
  }
};

// Export for use in lessons
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CoachesCorner;
}
