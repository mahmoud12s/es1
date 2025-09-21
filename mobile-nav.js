// Mobile Navigation - Enhanced and Robust
(function() {
    'use strict';
    
    let initialized = false;
    let retryCount = 0;
    const maxRetries = 10;
    
    function initMobileNavigation() {
        if (initialized) {
            console.log('🔧 Mobile Navigation: Already initialized');
            return;
        }
        
        console.log('🔧 Mobile Navigation: Attempting initialization...');
        
        const hamburger = document.querySelector('.hamburger');
        const navCenter = document.querySelector('.nav-center');
        
        console.log('🔧 Mobile Navigation: Element check', {
            hamburger: !!hamburger,
            navCenter: !!navCenter,
            hamburgerVisible: hamburger ? window.getComputedStyle(hamburger).display !== 'none' : false,
            retryCount: retryCount
        });
        
        if (!hamburger || !navCenter) {
            retryCount++;
            if (retryCount < maxRetries) {
                console.warn(`🔧 Mobile Navigation: Elements not found, retrying... (${retryCount}/${maxRetries})`);
                setTimeout(initMobileNavigation, 200);
                return;
            } else {
                console.error('🔧 Mobile Navigation: Failed to find elements after maximum retries');
                return;
            }
        }
        
        // Clear any existing state
        hamburger.classList.remove('active');
        navCenter.classList.remove('active');
        document.body.classList.remove('nav-open');
        
        // Add visual indicator that hamburger is clickable
        hamburger.style.cursor = 'pointer';
        hamburger.style.userSelect = 'none';
        
        console.log('🔧 Mobile Navigation: Adding event listeners');
        
        // Remove any existing listeners
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        
        // Main hamburger click handler
        newHamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🔧 Mobile Navigation: Hamburger clicked!');
            
            const isCurrentlyActive = newHamburger.classList.contains('active');
            
            if (isCurrentlyActive) {
                // Close menu
                newHamburger.classList.remove('active');
                navCenter.classList.remove('active');
                document.body.classList.remove('nav-open');
                console.log('🔧 Mobile Navigation: ✅ Menu CLOSED');
            } else {
                // Open menu
                newHamburger.classList.add('active');
                navCenter.classList.add('active');
                document.body.classList.add('nav-open');
                console.log('🔧 Mobile Navigation: ✅ Menu OPENED');
            }
        });
        
        // Touch events for mobile
        newHamburger.addEventListener('touchstart', function(e) {
            console.log('🔧 Mobile Navigation: Touch detected on hamburger');
            e.preventDefault();
        });
        
        // Navigation link clicks
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('🔧 Mobile Navigation: Nav link clicked, closing menu');
                newHamburger.classList.remove('active');
                navCenter.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
        
        // Click outside to close
        document.addEventListener('click', function(e) {
            if (newHamburger.classList.contains('active')) {
                if (!navCenter.contains(e.target) && !newHamburger.contains(e.target)) {
                    console.log('🔧 Mobile Navigation: Clicked outside, closing menu');
                    newHamburger.classList.remove('active');
                    navCenter.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && newHamburger.classList.contains('active')) {
                console.log('🔧 Mobile Navigation: Escape key pressed, closing menu');
                newHamburger.classList.remove('active');
                navCenter.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
        
        initialized = true;
        console.log('🔧 Mobile Navigation: ✅ SUCCESSFULLY INITIALIZED');
        
        // Test click after initialization
        setTimeout(function() {
            console.log('🔧 Mobile Navigation: Ready for interaction');
        }, 100);
    }
    
    // Multiple initialization strategies
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initMobileNavigation, 100);
        });
    } else {
        setTimeout(initMobileNavigation, 100);
    }
    
    window.addEventListener('load', function() {
        if (!initialized) {
            setTimeout(initMobileNavigation, 100);
        }
    });
    
    // Expose for manual testing
    window.testMobileNav = function() {
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.click();
            console.log('🔧 Manual test: Hamburger clicked');
        } else {
            console.log('🔧 Manual test: Hamburger not found');
        }
    };
    
})();
