// Frontend Configuration
// This file contains the configuration for the frontend application

const CONFIG = {
    // API Configuration - Optimized for your setup
    API_BASE_URL: (() => {
        const hostname = window.location.hostname;
        
        // Local development
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:2092/api';
        }
        
        // Production - Use HTTP since your backend is HTTP
        // Note: You may need to allow mixed content in browser
        return 'http://earth.bssr-nodes.com:2092/api';
    })(),
    
    // Alternative HTTPS URL (if you enable HTTPS on backend)
    HTTPS_API_URL: 'https://earth.bssr-nodes.com:2092/api',
    
    // Application Settings
    APP_NAME: 'ES1 Class Organization',
    VERSION: '1.0.0',
    
    // Features
    FEATURES: {
        OFFLINE_MODE: false,
        PUSH_NOTIFICATIONS: false,
        ANALYTICS: false
    },
    
    // UI Settings
    UI: {
        THEME: 'light',
        ANIMATIONS: true,
        MOBILE_RESPONSIVE: true
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
