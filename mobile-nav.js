// Mobile Navigation - Standalone Script
// This script ensures mobile navigation works on all pages

(function() {
    'use strict';
    
    let isInitialized = false;
    
    function initMobileNav() {
        if (isInitialized) {
            console.log('Mobile navigation already initialized');
            return;
        }
        
        console.log('Initializing mobile navigation...');
        
        const hamburger = document.querySelector('.hamburger');
        const navCenter = document.querySelector('.nav-center');
        
        if (!hamburger || !navCenter) {
            console.warn('Mobile navigation elements not found, retrying in 100ms...');
            setTimeout(initMobileNav, 100);
            return;
        }
        
        console.log('Mobile navigation elements found, setting up event listeners');
        
        // Remove any existing listeners to prevent duplicates
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        
        // Add click handler for hamburger menu
        newHamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger menu clicked');
            
            newHamburger.classList.toggle('active');
            navCenter.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                console.log('Nav link clicked, closing mobile menu');
                newHamburger.classList.remove('active');
                navCenter.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navCenter.contains(e.target) && !newHamburger.contains(e.target)) {
                newHamburger.classList.remove('active');
                navCenter.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                newHamburger.classList.remove('active');
                navCenter.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
        
        isInitialized = true;
        console.log('Mobile navigation initialized successfully');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initMobileNav, 200);
        });
    } else {
        setTimeout(initMobileNav, 200);
    }
    
    // Also initialize on window load as backup
    window.addEventListener('load', function() {
        if (!isInitialized) {
            setTimeout(initMobileNav, 100);
        }
    });
    
    // Expose function globally for manual initialization if needed
    window.initMobileNavigation = initMobileNav;
    
})();
