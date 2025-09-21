// Mobile Navigation - Clean and Simple
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Mobile Navigation: DOM loaded');
    
    // Wait a bit for all elements to render
    setTimeout(function() {
        const hamburger = document.querySelector('.hamburger');
        const navCenter = document.querySelector('.nav-center');
        
        console.log('🔧 Mobile Navigation: Elements found', {
            hamburger: !!hamburger,
            navCenter: !!navCenter
        });
        
        if (!hamburger || !navCenter) {
            console.warn('🔧 Mobile Navigation: Elements not found, retrying...');
            setTimeout(arguments.callee, 100);
            return;
        }
        
        // Ensure menu starts closed
        hamburger.classList.remove('active');
        navCenter.classList.remove('active');
        document.body.classList.remove('nav-open');
        
        console.log('🔧 Mobile Navigation: Setting up click handlers');
        
        // Hamburger click handler
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🔧 Mobile Navigation: Hamburger clicked');
            
            const isActive = hamburger.classList.contains('active');
            
            if (isActive) {
                // Close menu
                hamburger.classList.remove('active');
                navCenter.classList.remove('active');
                document.body.classList.remove('nav-open');
                console.log('🔧 Mobile Navigation: Menu closed');
            } else {
                // Open menu
                hamburger.classList.add('active');
                navCenter.classList.add('active');
                document.body.classList.add('nav-open');
                console.log('🔧 Mobile Navigation: Menu opened');
            }
        });
        
        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('🔧 Mobile Navigation: Nav link clicked, closing menu');
                hamburger.classList.remove('active');
                navCenter.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navCenter.contains(e.target) && !hamburger.contains(e.target)) {
                if (hamburger.classList.contains('active')) {
                    console.log('🔧 Mobile Navigation: Clicked outside, closing menu');
                    hamburger.classList.remove('active');
                    navCenter.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            }
        });
        
        // Close menu with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && hamburger.classList.contains('active')) {
                console.log('🔧 Mobile Navigation: Escape pressed, closing menu');
                hamburger.classList.remove('active');
                navCenter.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
        
        console.log('🔧 Mobile Navigation: Initialized successfully');
        
    }, 300); // Wait 300ms for elements to be ready
});
