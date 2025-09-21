// Mobile Navigation Debug Tool
// Add this script to any page to debug mobile navigation issues

(function() {
    'use strict';
    
    // Create debug panel
    function createDebugPanel() {
        const panel = document.createElement('div');
        panel.id = 'nav-debug-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
            max-width: 300px;
            border: 2px solid #007bff;
        `;
        
        panel.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 10px; color: #007bff;">🔧 Mobile Nav Debug</div>
            <div id="debug-info"></div>
            <div style="margin-top: 10px;">
                <button onclick="window.testMobileNavigation()" style="padding: 5px 10px; margin: 2px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">Test Nav</button>
                <button onclick="document.getElementById('nav-debug-panel').remove()" style="padding: 5px 10px; margin: 2px; background: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">Close</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        return panel;
    }
    
    // Update debug info
    function updateDebugInfo() {
        const debugInfo = document.getElementById('debug-info');
        if (!debugInfo) return;
        
        const hamburger = document.querySelector('.hamburger');
        const navCenter = document.querySelector('.nav-center');
        const screenWidth = window.innerWidth;
        const isMobile = screenWidth <= 768;
        
        const hamburgerStyle = hamburger ? window.getComputedStyle(hamburger) : null;
        const navCenterStyle = navCenter ? window.getComputedStyle(navCenter) : null;
        
        debugInfo.innerHTML = `
            <div>Screen: ${screenWidth}px ${isMobile ? '(Mobile)' : '(Desktop)'}</div>
            <div>Hamburger: ${hamburger ? '✅ Found' : '❌ Missing'}</div>
            <div>Nav Center: ${navCenter ? '✅ Found' : '❌ Missing'}</div>
            ${hamburger ? `<div>H Visible: ${hamburgerStyle.display !== 'none' ? '✅ Yes' : '❌ No'}</div>` : ''}
            ${hamburger ? `<div>H Active: ${hamburger.classList.contains('active') ? '✅ Yes' : '❌ No'}</div>` : ''}
            ${navCenter ? `<div>N Active: ${navCenter.classList.contains('active') ? '✅ Yes' : '❌ No'}</div>` : ''}
            ${navCenter ? `<div>N Position: ${navCenterStyle.position}</div>` : ''}
            ${navCenter ? `<div>N Left: ${navCenterStyle.left}</div>` : ''}
        `;
    }
    
    // Test function
    window.testMobileNavigation = function() {
        console.log('🔧 Manual mobile navigation test started');
        
        const hamburger = document.querySelector('.hamburger');
        const navCenter = document.querySelector('.nav-center');
        
        if (!hamburger) {
            console.error('🔧 Test failed: Hamburger not found');
            alert('❌ Test Failed: Hamburger menu not found');
            return;
        }
        
        if (!navCenter) {
            console.error('🔧 Test failed: Nav center not found');
            alert('❌ Test Failed: Navigation center not found');
            return;
        }
        
        // Simulate click
        const event = new Event('click', { bubbles: true });
        hamburger.dispatchEvent(event);
        
        setTimeout(() => {
            const isActive = hamburger.classList.contains('active');
            const navActive = navCenter.classList.contains('active');
            
            console.log('🔧 Test results:', {
                hamburgerActive: isActive,
                navCenterActive: navActive
            });
            
            if (isActive && navActive) {
                alert('✅ Test Passed: Mobile navigation is working!');
            } else {
                alert('❌ Test Failed: Mobile navigation is not responding properly');
            }
            
            updateDebugInfo();
        }, 100);
    };
    
    // Initialize debug panel
    function initDebug() {
        // Remove existing panel
        const existing = document.getElementById('nav-debug-panel');
        if (existing) existing.remove();
        
        // Create new panel
        const panel = createDebugPanel();
        updateDebugInfo();
        
        // Update every second
        setInterval(updateDebugInfo, 1000);
        
        // Update on resize
        window.addEventListener('resize', updateDebugInfo);
        
        console.log('🔧 Navigation debug panel created. Use window.testMobileNavigation() to test.');
    }
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDebug);
    } else {
        initDebug();
    }
    
    // Expose debug function
    window.showNavDebug = initDebug;
    
})();
