// Frontend Configuration
// This file contains the configuration for the frontend application

const CONFIG = {
    // API Configuration
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000/api'  // Local development
        : 'http://earth.bssr-nodes.com:2092/api',  // Production backend URL
    
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
