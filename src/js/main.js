// ==============================================
// SCROLL TO TOP ON PAGE LOAD/REFRESH
// ==============================================

function initScrollToTop() {
    console.log('🔝 Initializing scroll to top functionality...');
    
    // Disable scroll restoration if not already done
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top immediately when page loads
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Also ensure scroll to top after full page load
    window.addEventListener('load', function() {
        console.log('🔄 Page fully loaded, ensuring scroll to top...');
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            // Remove any hash from URL to ensure clean state
            if (window.location.hash) {
                console.log('🧹 Cleaning URL hash...');
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
        }, 100); // Small delay to ensure DOM is ready
    });
    
    // Handle browser back/forward button navigation
    window.addEventListener('pageshow', function(event) {
        console.log('📄 Page show event triggered...');
        if (event.persisted) {
            // Page was restored from cache (back/forward navigation)
            console.log('💾 Page restored from cache, scrolling to top...');
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    });
    
    // Handle unload event to ensure clean state
    window.addEventListener('beforeunload', function() {
        console.log('🚪 Page unloading, preparing clean state...');
        window.scrollTo(0, 0);
    });
    
    // Handle visibility change (when user switches tabs and comes back)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            console.log('👁️ Page became visible again...');
            // Optional: Uncomment to scroll to top when user returns to tab
            // window.scrollTo(0, 0);
        }
    });
    
    // Additional safety net - periodic check for first 5 seconds
    let scrollCheckCount = 0;
    const maxScrollChecks = 25; // 5 seconds worth of checks (every 200ms)
    
    const scrollCheck = setInterval(() => {
        if (window.scrollY > 0 && scrollCheckCount < maxScrollChecks) {
            console.log('🔍 Detected unwanted scroll, correcting to top...');
            window.scrollTo(0, 0);
        }
        scrollCheckCount++;
        
        if (scrollCheckCount >= maxScrollChecks) {
            console.log('✅ Scroll monitoring complete');
            clearInterval(scrollCheck);
        }
    }, 200);
}

// ==============================================
// HERO DROPDOWN FUNCTIONALITY
// ==============================================

function initHeroDropdown() {
    console.log('📱 Initializing hero dropdown functionality...');
    console.log('🖥️ Current screen width:', window.innerWidth);
    
    const learnMoreBtn = document.getElementById('learn-more-btn');
    const dropdownContent = document.getElementById('hero-description-content');
    const chevronIcon = document.getElementById('learn-more-chevron');
    
    console.log('🔍 Element check results:');
    console.log('  - Learn More Button:', learnMoreBtn);
    console.log('  - Dropdown Content:', dropdownContent);
    console.log('  - Chevron Icon:', chevronIcon);
    
    if (!learnMoreBtn || !dropdownContent || !chevronIcon) {
        console.warn('⚠️ Hero dropdown elements not found');
        console.warn('  Missing elements:', {
            button: !learnMoreBtn,
            content: !dropdownContent,
            chevron: !chevronIcon
        });
        return;
    }
    
    // Check if parent container is visible on current screen size
    const parentContainer = learnMoreBtn.closest('.hero-description-mobile');
    const isParentVisible = parentContainer && getComputedStyle(parentContainer).display !== 'none';
    console.log('👁️ Parent container visible:', isParentVisible);
    console.log('📦 Parent container:', parentContainer);
    
    console.log('✅ Hero dropdown elements found, setting up functionality...');
    
    let isOpen = false;
    
    learnMoreBtn.addEventListener('click', function(e) {
        console.log('📖 Learn More button clicked!');
        console.log('🖱️ Click event:', e);
        console.log('📐 Current state - isOpen:', isOpen);
        console.log('📏 Dropdown content scrollHeight:', dropdownContent.scrollHeight);
        
        e.preventDefault(); // Ensure click is handled
        
        if (isOpen) {
            // Close dropdown
            console.log('📤 Closing dropdown...');
            dropdownContent.style.maxHeight = '0px';
            chevronIcon.style.transform = 'rotate(0deg)';
            learnMoreBtn.setAttribute('aria-expanded', 'false');
            learnMoreBtn.querySelector('span').textContent = 'Learn More About Me';
            isOpen = false;
            console.log('📖 Hero dropdown closed');
        } else {
            // Open dropdown
            console.log('📥 Opening dropdown...');
            const targetHeight = dropdownContent.scrollHeight + 'px';
            console.log('🎯 Target height:', targetHeight);
            dropdownContent.style.maxHeight = targetHeight;
            chevronIcon.style.transform = 'rotate(180deg)';
            learnMoreBtn.setAttribute('aria-expanded', 'true');
            learnMoreBtn.querySelector('span').textContent = 'Show Less';
            isOpen = true;
            console.log('📖 Hero dropdown opened');
        }
    });
    
    // Reset dropdown on window resize (if switching to largest desktop)
    window.addEventListener('resize', () => {
        console.log('📐 Window resized to:', window.innerWidth + 'x' + window.innerHeight);
        if (window.innerWidth >= 1536 && isOpen) { // 2xl breakpoint
            console.log('💻 Switching to largest desktop view, closing dropdown...');
            dropdownContent.style.maxHeight = '0px';
            chevronIcon.style.transform = 'rotate(0deg)';
            learnMoreBtn.setAttribute('aria-expanded', 'false');
            learnMoreBtn.querySelector('span').textContent = 'Learn More About Me';
            isOpen = false;
            console.log('📖 Hero dropdown reset due to screen size change');
        }
    });
    
    console.log('✅ Hero dropdown functionality initialized successfully');
}

// ==============================================
// NAVBAR FUNCTIONALITY
// ==============================================

function initNavbar() {
    console.log('🔧 Initializing navbar functionality...');
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    
    if (!navToggle || !navMenu) {
        console.warn('⚠️ Navbar elements not found');
        return;
    }
    
    console.log('✅ Navbar elements found, setting up toggle...');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        console.log('🍔 Hamburger clicked!');
        
        const isOpen = navMenu.style.maxHeight && navMenu.style.maxHeight !== '0px';
        
        if (isOpen) {
            // Close menu
            navMenu.style.maxHeight = '0px';
            navToggle.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger animation
            hamburgerLines.forEach((line, index) => {
                line.style.transform = '';
                line.style.opacity = '';
            });
            
            console.log('📱 Mobile menu closed');
        } else {
            // Open menu
            navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
            navToggle.setAttribute('aria-expanded', 'true');
            
            // Animate hamburger to X
            if (hamburgerLines.length >= 3) {
                hamburgerLines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                hamburgerLines[1].style.opacity = '0';
                hamburgerLines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            }
            
            console.log('📱 Mobile menu opened');
        }
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) { // lg breakpoint
                navMenu.style.maxHeight = '0px';
                navToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger animation
                hamburgerLines.forEach(line => {
                    line.style.transform = '';
                    line.style.opacity = '';
                });
                
                console.log('📱 Mobile menu closed via nav link');
            }
        });
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            navMenu.style.maxHeight = '';
            navToggle.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger animation
            hamburgerLines.forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        }
    });
    
    console.log('✅ Navbar functionality initialized successfully');
}

// ==============================================
// CAROUSEL FUNCTIONALITY
// ==============================================

let currentSlide = 0;
let slideInterval;
let showSlideFunction = null; // Store reference to showSlide function

function initCarousel() {
    console.log('🎠 Initializing carousel...');
    
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (slides.length === 0 || dots.length === 0) {
        console.warn('⚠️ Carousel elements not found');
        return;
    }
    
    console.log(`📸 Found ${slides.length} slides and ${dots.length} dots`);
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                slide.style.opacity = '1';
                slide.style.zIndex = '2';
            } else {
                slide.classList.remove('active');
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            }
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
                dot.style.backgroundColor = 'white';
            } else {
                dot.classList.remove('active');
                dot.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            }
        });
        
        currentSlide = index;
        console.log(`🎯 Showing slide ${index + 1}/${slides.length}`);
    }
    
    // Store reference for global access
    showSlideFunction = showSlide;
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log(`🔘 Dot ${index + 1} clicked`);
            showSlide(index);
            
            // Restart auto-rotation
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            slideInterval = setInterval(nextSlide, 3000);
        });
    });
    
    // Initialize first slide
    showSlide(0);
    
    // Start auto-rotation
    slideInterval = setInterval(nextSlide, 3000);
    console.log('⏰ Auto-rotation started (3 seconds)');
    
    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            if (slideInterval) {
                clearInterval(slideInterval);
                console.log('⏸️ Carousel paused on hover');
            }
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 3000);
            console.log('▶️ Carousel resumed after hover');
        });
    }
    
    console.log('✅ Carousel initialized successfully');
}

// ==============================================
// SMOOTH SCROLLING
// ==============================================

function initSmoothScrolling() {
    console.log('📜 Initializing smooth scrolling...');
    
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.desktop-nav')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log(`🎯 Scrolling to ${href}`);
            }
        });
    });
    
    console.log('✅ Smooth scrolling initialized');
}

// ==============================================
// INITIALIZATION
// ==============================================

function initializeApp() {
    console.log('🚀 Initializing Portfolio App...');
    console.log('📱 User Agent:', navigator.userAgent);
    console.log('🖥️ Screen Size:', window.innerWidth + 'x' + window.innerHeight);
    
    try {
        // Initialize scroll to top first (before other components)
        initScrollToTop();
        
        // Initialize all components
        initHeroDropdown();
        initNavbar();
        initCarousel();
        initSmoothScrolling();
        
        console.log('🎉 Portfolio App initialized successfully!');
        
        // Global debugging helpers
        window.portfolioDebug = {
            showSlide: (index) => {
                const slides = document.querySelectorAll('.carousel-slide');
                if (index >= 0 && index < slides.length && showSlideFunction) {
                    currentSlide = index;
                    showSlideFunction(index);
                }
            },
            toggleMenu: () => {
                const navToggle = document.querySelector('.nav-toggle');
                if (navToggle) navToggle.click();
            },
            toggleHeroDropdown: () => {
                const learnMoreBtn = document.getElementById('learn-more-btn');
                if (learnMoreBtn) learnMoreBtn.click();
            },
            testHeroElements: () => {
                const learnMoreBtn = document.getElementById('learn-more-btn');
                const dropdownContent = document.getElementById('hero-description-content');
                const chevronIcon = document.getElementById('learn-more-chevron');
                const mobileContainer = document.querySelector('.hero-description-mobile');
                const desktopContainer = document.querySelector('.hero-description');
                
                console.log('🔍 Hero Elements Check:');
                console.log('Learn More Button:', learnMoreBtn);
                console.log('Dropdown Content:', dropdownContent);
                console.log('Chevron Icon:', chevronIcon);
                console.log('Mobile Container:', mobileContainer);
                console.log('Desktop Container:', desktopContainer);
                console.log('Screen Width:', window.innerWidth);
                console.log('Mobile Container Visible:', mobileContainer ? getComputedStyle(mobileContainer).display !== 'none' : false);
                console.log('Desktop Container Visible:', desktopContainer ? getComputedStyle(desktopContainer).display !== 'none' : false);
                
                return {
                    button: !!learnMoreBtn,
                    content: !!dropdownContent,
                    chevron: !!chevronIcon,
                    screenWidth: window.innerWidth,
                    mobileVisible: mobileContainer ? getComputedStyle(mobileContainer).display !== 'none' : false,
                    desktopVisible: desktopContainer ? getComputedStyle(desktopContainer).display !== 'none' : false
                };
            },
            forceShowDropdown: () => {
                const mobileContainer = document.querySelector('.hero-description-mobile');
                if (mobileContainer) {
                    mobileContainer.style.display = 'block';
                    mobileContainer.style.visibility = 'visible';
                    console.log('✅ Forced mobile dropdown container to be visible for testing');
                    return true;
                } else {
                    console.log('❌ Mobile dropdown container not found');
                    return false;
                }
            },
            getState: () => ({
                currentSlide,
                slidesCount: document.querySelectorAll('.carousel-slide').length,
                menuOpen: document.querySelector('.nav-menu')?.style.maxHeight !== '0px',
                heroDropdownOpen: document.getElementById('hero-description-content')?.style.maxHeight !== '0px'
            })
        };
        
        console.log('🛠️ Debug helpers available: window.portfolioDebug');
        
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Fallback initialization after a short delay
setTimeout(() => {
    if (!window.portfolioDebug) {
        console.log('🔄 Running fallback initialization...');
        initializeApp();
    }
}, 1000);

console.log('📝 Main.js loaded successfully');
