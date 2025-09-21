// ULTIMATE MOBILE NAVIGATION FIX
// This script will force mobile navigation to work on ALL pages

console.log('🚀 ULTIMATE MOBILE NAV FIX: Loading...');

// Global variables to prevent conflicts
window.mobileNavFixed = false;
window.mobileNavRetries = 0;

function ultimateMobileNavFix() {
    if (window.mobileNavFixed) {
        console.log('🚀 Mobile nav already fixed');
        return;
    }
    
    console.log('🚀 Attempting ultimate mobile nav fix...');
    
    const hamburger = document.querySelector('.hamburger');
    const navCenter = document.querySelector('.nav-center');
    
    console.log('🚀 Elements check:', {
        hamburger: !!hamburger,
        navCenter: !!navCenter,
        hamburgerVisible: hamburger ? window.getComputedStyle(hamburger).display : 'not found',
        screenWidth: window.innerWidth
    });
    
    if (!hamburger || !navCenter) {
        window.mobileNavRetries++;
        if (window.mobileNavRetries < 50) {
            console.log(`🚀 Elements not found, retry ${window.mobileNavRetries}/50`);
            setTimeout(ultimateMobileNavFix, 100);
            return;
        } else {
            console.error('🚀 FAILED: Could not find mobile nav elements after 50 retries');
            return;
        }
    }
    
    // Clear all existing event listeners by cloning elements
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    
    // Ensure menu starts closed
    newHamburger.classList.remove('active');
    navCenter.classList.remove('active');
    document.body.classList.remove('nav-open');
    
    // Style hamburger to be clearly visible and clickable
    newHamburger.style.cursor = 'pointer';
    newHamburger.style.userSelect = 'none';
    newHamburger.style.zIndex = '9999';
    newHamburger.style.position = 'relative';
    newHamburger.style.background = 'rgba(255,255,255,0.1)';
    newHamburger.style.padding = '10px';
    newHamburger.style.borderRadius = '5px';
    newHamburger.style.border = '1px solid rgba(255,255,255,0.3)';
    
    // Make bars more visible
    const bars = newHamburger.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.backgroundColor = '#ffffff';
        bar.style.display = 'block';
        bar.style.width = '25px';
        bar.style.height = '3px';
        bar.style.margin = '4px 0';
    });
    
    function handleMobileNavClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🚀 HAMBURGER CLICKED!');
        
        const isActive = newHamburger.classList.contains('active');
        
        if (isActive) {
            // Close menu
            newHamburger.classList.remove('active');
            navCenter.classList.remove('active');
            document.body.classList.remove('nav-open');
            console.log('🚀 MENU CLOSED ❌');
        } else {
            // Open menu
            newHamburger.classList.add('active');
            navCenter.classList.add('active');
            document.body.classList.add('nav-open');
            console.log('🚀 MENU OPENED ✅');
        }
        
        return false;
    }
    
    // Add multiple event listeners
    newHamburger.addEventListener('click', handleMobileNavClick, true);
    newHamburger.addEventListener('touchstart', handleMobileNavClick, true);
    newHamburger.addEventListener('mousedown', handleMobileNavClick, true);
    
    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            console.log('🚀 Nav link clicked, closing menu');
            newHamburger.classList.remove('active');
            navCenter.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navCenter.contains(e.target) && !newHamburger.contains(e.target)) {
            if (newHamburger.classList.contains('active')) {
                console.log('🚀 Clicked outside, closing menu');
                newHamburger.classList.remove('active');
                navCenter.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && newHamburger.classList.contains('active')) {
            console.log('🚀 Escape pressed, closing menu');
            newHamburger.classList.remove('active');
            navCenter.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
    
    window.mobileNavFixed = true;
    console.log('🚀 ✅ ULTIMATE MOBILE NAV FIX COMPLETE!');
    
    // Test function
    window.testUltimateMobileNav = function() {
        console.log('🚀 Testing mobile nav...');
        newHamburger.click();
    };
}

// Multiple initialization strategies
console.log('🚀 Setting up initialization strategies...');

// Strategy 1: Immediate
setTimeout(ultimateMobileNavFix, 100);

// Strategy 2: DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 DOM loaded, initializing...');
        setTimeout(ultimateMobileNavFix, 200);
    });
} else {
    console.log('🚀 DOM already loaded');
    setTimeout(ultimateMobileNavFix, 50);
}

// Strategy 3: Window load
window.addEventListener('load', function() {
    console.log('🚀 Window loaded');
    setTimeout(ultimateMobileNavFix, 100);
});

// Strategy 4: Force retry
let forceRetryCount = 0;
const forceInterval = setInterval(function() {
    if (!window.mobileNavFixed && forceRetryCount < 10) {
        console.log(`🚀 Force retry ${forceRetryCount + 1}/10`);
        ultimateMobileNavFix();
        forceRetryCount++;
    } else {
        clearInterval(forceInterval);
    }
}, 1000);

console.log('🚀 Ultimate mobile nav fix script loaded and ready!');
