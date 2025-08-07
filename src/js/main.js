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
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    learnMoreBtn.addEventListener('click', function(e) {
        console.log('📖 Learn More button clicked!');
        console.log('🖱️ Click event:', e);
        console.log('📐 Current state - isOpen:', isOpen);
        console.log('📏 Dropdown content scrollHeight:', dropdownContent.scrollHeight);
        
        e.preventDefault(); // Ensure click is handled
        e.stopPropagation(); // Prevent event bubbling
        
        // Prevent body scroll on mobile while dropdown is opening/closing
        if (isMobile) {
            document.body.style.overflow = isOpen ? '' : 'hidden';
            setTimeout(() => {
                if (document.body.style.overflow === 'hidden') {
                    document.body.style.overflow = '';
                }
            }, 600); // Clear after animation completes
        }
        
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
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function(e) {
        console.log('🍔 Hamburger clicked!');
        e.preventDefault();
        e.stopPropagation();
        
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
            
            // Re-enable body scroll on mobile
            if (isMobile) {
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
            
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
            
            // Prevent body scroll on mobile when menu is open
            if (isMobile) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
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
                
                // Re-enable body scroll on mobile
                if (isMobile) {
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                }
                
                console.log('📱 Mobile menu closed via nav link');
            }
        });
    });
    
    // Close menu on window resize and fix body scroll
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            navMenu.style.maxHeight = '';
            navToggle.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger animation
            hamburgerLines.forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
            
            // Always reset body styles on desktop
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const isMenuOpen = navMenu.style.maxHeight && navMenu.style.maxHeight !== '0px';
        const isClickInsideNav = navToggle.contains(e.target) || navMenu.contains(e.target);
        
        if (isMenuOpen && !isClickInsideNav && window.innerWidth <= 1024) {
            navMenu.style.maxHeight = '0px';
            navToggle.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger animation
            hamburgerLines.forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
            
            // Re-enable body scroll on mobile
            if (isMobile) {
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
            
            console.log('📱 Mobile menu closed via outside click');
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
// SMOOTH SCROLLING WITH MOBILE FIXES
// ==============================================

function initSmoothScrolling() {
    console.log('📜 Initializing smooth scrolling with mobile fixes...');
    
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    console.log('📱 Device detection:', { isMobile, isIOS });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.desktop-nav')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Use different scrolling behavior based on device
                if (isMobile || isIOS) {
                    // For mobile devices, use a more reliable method
                    console.log(`📱 Mobile scroll to ${href}`);
                    
                    // Disable body scroll during navigation
                    document.body.style.overflow = 'hidden';
                    
                    // Use requestAnimationFrame for smoother mobile scrolling
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 800; // Slightly longer for mobile
                    let startTime = null;
                    
                    function animateScroll(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        const timeElapsed = currentTime - startTime;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        // Easing function for smooth animation
                        const easeInOutQuad = progress < 0.5 
                            ? 2 * progress * progress 
                            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                        
                        window.scrollTo(0, startPosition + distance * easeInOutQuad);
                        
                        if (progress < 1) {
                            requestAnimationFrame(animateScroll);
                        } else {
                            // Re-enable body scroll
                            document.body.style.overflow = '';
                            console.log(`✅ Mobile scroll to ${href} completed`);
                        }
                    }
                    
                    requestAnimationFrame(animateScroll);
                } else {
                    // For desktop, use native smooth scrolling
                    console.log(`🖥️ Desktop scroll to ${href}`);
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Fix for iOS scroll momentum issues
    if (isIOS) {
        console.log('� Applying iOS scroll fixes...');
        
        // Prevent scroll bounce on iOS - DISABLED to fix scroll issues
        // document.addEventListener('touchstart', function(e) {
        //     if (e.target.tagName === 'BODY' || e.target === document.documentElement) {
        //         e.preventDefault();
        //     }
        // }, { passive: false });
        
        // Fix for iOS Safari scroll issues with fixed elements
        let ticking = false;
        
        function updateScrollPosition() {
            const nav = document.querySelector('.desktop-nav');
            if (nav) {
                nav.style.transform = 'translateZ(0)';
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        });
    }
    
    console.log('✅ Smooth scrolling with mobile fixes initialized');
}

// ==============================================
// INITIALIZATION
// ==============================================

function initializeApp() {
    console.log('🚀 Initializing Portfolio App...');
    console.log('📱 User Agent:', navigator.userAgent);
    console.log('🖥️ Screen Size:', window.innerWidth + 'x' + window.innerHeight);
    
    try {
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
