// Fix for theme switcher not working on all pages
// This ensures the theme switcher works even if window.config is missing or incomplete

(function() {
    'use strict';
    
    // Ensure window.config exists
    if (typeof window.config === 'undefined') {
        window.config = {};
    }
    
    // Ensure window.config.data exists
    if (typeof window.config.data === 'undefined') {
        window.config.data = {};
    }
    
    // Simple theme switcher fallback
    function initSimpleThemeSwitcher() {
        const themeSwitchElements = document.getElementsByClassName('theme-switch');
        
        for (let i = 0; i < themeSwitchElements.length; i++) {
            const $themeSwitch = themeSwitchElements[i];
            
            // Remove any existing event listeners to prevent duplicates
            $themeSwitch.replaceWith($themeSwitch.cloneNode(true));
            const newThemeSwitch = document.getElementsByClassName('theme-switch')[i];
            
            newThemeSwitch.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle theme
                if (document.body.getAttribute('theme') === 'dark') {
                    document.body.setAttribute('theme', 'light');
                } else {
                    document.body.setAttribute('theme', 'dark');
                }
                
                // Save to localStorage
                const isDark = document.body.getAttribute('theme') === 'dark';
                if (window.localStorage) {
                    localStorage.setItem('theme', isDark ? 'dark' : 'light');
                }
            }, false);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Add a small delay to ensure the theme has attempted to initialize
            setTimeout(initSimpleThemeSwitcher, 200);
        });
    } else {
        // DOM is already ready
        setTimeout(initSimpleThemeSwitcher, 200);
    }
})(); 