// ================================
// STICKY NAVIGATION FUNCTIONALITY
// ================================

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
    });

    function initNavigation() {
        // Add navigation class to body
        document.body.classList.add('has-navigation');

        // Get navigation elements
        const hamburger = document.getElementById('navHamburger');
        const menu = document.getElementById('navMenu');
        const overlay = document.getElementById('navOverlay');
        const brand = document.getElementById('navBrand');
        const navLinks = document.querySelectorAll('.nav-link');

        // Detect current page and set active state
        setActivePage();

        // Mobile menu toggle
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                toggleMobileMenu();
            });
        }

        // Close menu when overlay is clicked
        if (overlay) {
            overlay.addEventListener('click', function() {
                closeMobileMenu();
            });
        }

        // Close menu when a link is clicked (mobile)
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768) {
                    closeMobileMenu();
                }
            }, 250);
        });

        // Keyboard navigation support
        document.addEventListener('keydown', function(e) {
            // Close mobile menu on Escape
            if (e.key === 'Escape' && menu && menu.classList.contains('show')) {
                closeMobileMenu();
            }
        });

        // Functions
        function toggleMobileMenu() {
            const isOpen = menu && menu.classList.contains('show');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }

        function openMobileMenu() {
            if (menu) menu.classList.add('show');
            if (overlay) overlay.classList.add('show');
            if (hamburger) hamburger.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        }

        function closeMobileMenu() {
            if (menu) menu.classList.remove('show');
            if (overlay) overlay.classList.remove('show');
            if (hamburger) hamburger.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }

        function setActivePage() {
            const currentPath = window.location.pathname;
            let activePage = 'champion';
            let pageTitle = 'CHAMPION ROUTINE';

            // Determine active page based on path
            if (currentPath.includes('/minecraft/') || currentPath.includes('/minecoins/')) {
                activePage = 'minecoins';
                pageTitle = 'MINECOINS';
            } else if (currentPath.includes('/flagfootball/')) {
                activePage = 'flagfootball';
                pageTitle = 'FLAG FOOTBALL';
            } else if (currentPath.includes('/magic8ball/')) {
                activePage = 'magic8ball';
                pageTitle = 'MAGIC 8 BALL';
            } else if (currentPath.includes('/magicgameball/')) {
                activePage = 'magicgameball';
                pageTitle = 'MAGIC GAME BALL';
            } else if (currentPath.includes('/calendar/')) {
                activePage = 'calendar';
                pageTitle = 'SCHEDULE';
            } else if (currentPath === '/' || currentPath.includes('/index.html')) {
                // Root is now Champion Routine
                activePage = 'champion';
                pageTitle = 'CHAMPION ROUTINE';
            }

            // Set active class on appropriate link
            navLinks.forEach(function(link) {
                const linkPage = link.getAttribute('data-page');
                if (linkPage === activePage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // Update mobile brand text
            if (brand) {
                brand.textContent = pageTitle;
            }
        }

        // Smooth scroll behavior for any future anchor links
        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offset = 80; // Account for sticky nav height
                        const targetPosition = target.offsetTop - offset;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });

        // Add scroll behavior to show/hide nav on scroll (optional enhancement)
        let lastScrollTop = 0;
        let scrollTimer;

        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                const nav = document.getElementById('stickyNav');
                if (!nav) return;

                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // Only hide nav when scrolling down significantly
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down
                    nav.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up or at top
                    nav.style.transform = 'translateY(0)';
                }

                lastScrollTop = scrollTop;
            }, 50);
        });
    }

    // Export for use in other scripts if needed
    window.navigationUtils = {
        closeMobileMenu: function() {
            const menu = document.getElementById('navMenu');
            const overlay = document.getElementById('navOverlay');
            const hamburger = document.getElementById('navHamburger');

            if (menu) menu.classList.remove('show');
            if (overlay) overlay.classList.remove('show');
            if (hamburger) hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
})();