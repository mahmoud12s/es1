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
        
        // Production - Check if backend has custom domain or use Railway
        // If your backend is also on a custom domain, replace the URL below
        if (hostname === 'lodes1b.thteam.me') {
            // Option 1: If backend is on same domain with different port/path
            // return 'https://lodes1b.thteam.me:2092/api';
            
            // Option 2: If backend is on different subdomain
            // return 'https://api.lodes1b.thteam.me/api';
            
            // Option 3: If backend is still on Railway (current setup)
            return 'https://serverjs-production-0592.up.railway.app/api';
        }
        
        // Fallback for other domains
        return 'https://serverjs-production-0592.up.railway.app/api';
    })(),
    
    // Railway backend API URL (HTTPS enabled) 
    RAILWAY_API_URL: 'https://serverjs-production-0592.up.railway.app/api',
    
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
