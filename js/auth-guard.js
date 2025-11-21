// ============================================
// AUTHENTICATION GUARD
// Protects pages from unauthorized access
// ============================================

(function() {
    'use strict';

    // Get current date (for daily reset)
    const today = new Date().toDateString();

    // Check session storage
    const authenticated = sessionStorage.getItem('authenticated') === 'true';
    const authDate = sessionStorage.getItem('authDate');

    // Validate session: must be authenticated AND same day
    const isValidSession = authenticated && authDate === today;

    if (!isValidSession) {
        // Clear stale session data
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('authDate');

        // Get current page path for redirect after successful auth
        const currentPage = window.location.pathname;

        // Redirect to verification page
        window.location.href = `/verify.html?redirect=${encodeURIComponent(currentPage)}`;
    }
})();
