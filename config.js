// Frontend Configuration
// 🎯 EASY DOMAIN CONFIGURATION - Just change the values below!

const CONFIG = {
    // 👇 CHANGE THESE VALUES TO UPDATE YOUR DOMAINS 👇
    FRONTEND_DOMAIN: 'l-o-des1b.thteam.me',  // 👈 YOUR FRONTEND DOMAIN
    BACKEND_URL: 'https://serverjs-production-0592.up.railway.app/api',  // 👈 YOUR BACKEND URL
    
    // 👆 ONLY CHANGE THE VALUES ABOVE - Everything else is automatic 👆
    
    // API Configuration - Automatically configured based on above
    API_BASE_URL: (() => {
        const hostname = window.location.hostname;
        
        // Local development
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:2092/api';
        }
        
        // Production - automatically uses BACKEND_URL above
        return 'https://serverjs-production-0592.up.railway.app/api';
    })(),
    
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
