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

    // Authentication disabled - site is now public
    // Keeping this file to prevent breaking existing references
    if (!isValidSession) {
        // Clear stale session data
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('authDate');

        // Authentication check disabled - allow access
        // window.location.href = `/passcode.html?redirect=${encodeURIComponent(currentPage)}`;
    }
})();
