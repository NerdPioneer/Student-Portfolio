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
    function toggleMobileMenu(e) {
        console.log('🍔 Hamburger clicked!');
        e.preventDefault();
        e.stopPropagation();
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
            navMenu.classList.remove('open');
            navMenu.style.maxHeight = '0px';
            navMenu.style.display = '';
            navToggle.setAttribute('aria-expanded', 'false');
            hamburgerLines.forEach((line, index) => {
                line.style.transform = '';
                line.style.opacity = '';
            });
            if (isMobile) {
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
            console.log('📱 Mobile menu closed');
        } else {
            navMenu.classList.add('open');
            navMenu.style.display = 'block';
            // Force reflow to ensure accurate scrollHeight after display change
            // eslint-disable-next-line no-unused-expressions
            navMenu.offsetHeight;
            // Allow time for images inside the menu to load (if any) to ensure height is correct
            const setHeight = () => {
                navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
            };
            setHeight();
            // Recalculate after a tick to capture dynamic content
            setTimeout(setHeight, 50);
            navToggle.setAttribute('aria-expanded', 'true');
            if (hamburgerLines.length >= 3) {
                hamburgerLines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                hamburgerLines[1].style.opacity = '0';
                hamburgerLines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            }
            if (isMobile) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            }
            console.log('📱 Mobile menu opened');
        }
    }

    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) { // lg breakpoint
                navMenu.classList.remove('open');
                navMenu.style.maxHeight = '0px';
                navMenu.style.display = '';
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
            navMenu.classList.remove('open');
            navMenu.style.maxHeight = '';
            navMenu.style.display = '';
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
            navMenu.classList.remove('open');
            navMenu.style.maxHeight = '0px';
            navMenu.style.display = '';
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
                const targetPosition = targetElement.offsetTop - 100; // Offset for navbar
                
                if (isMobile) {
                    // For mobile, use custom smooth scrolling
                    console.log(`📱 Mobile scroll to ${href}`);
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
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
    
    console.log('✅ Smooth scrolling initialized successfully');
}

// ==============================================
// INITIALIZATION
// ==============================================

// ==============================================
// HERO DESCRIPTION DROPDOWN FUNCTIONALITY
// ==============================================

function initHeroDropdown() {
    // Button removed; no-op to avoid errors if called
    console.log('ℹ️ Hero dropdown disabled (button removed).');
}

// ==============================================
// MOBILE HEIGHT FIXES
// ==============================================

function initMobileHeightFixes() {
    console.log('📱 Initializing mobile height fixes...');
    
    // Function to set CSS custom property for mobile height
    function setMobileHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Also set dynamic viewport height if supported
        if (CSS.supports('height', '100dvh')) {
            document.documentElement.style.setProperty('--dvh', '100dvh');
        } else {
            document.documentElement.style.setProperty('--dvh', `${window.innerHeight}px`);
        }
    }
    
    // Set initial height
    setMobileHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setMobileHeight);
    window.addEventListener('orientationchange', () => {
        // Wait for orientation change to complete
        setTimeout(setMobileHeight, 100);
    });
    
    // Update on scroll (for mobile browsers with dynamic toolbars)
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                setMobileHeight();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    console.log('✅ Mobile height fixes initialized');
}



function initializeApp() {
    console.log('🚀 Starting portfolio app initialization...');
    console.log('📊 Current viewport:', window.innerWidth + 'x' + window.innerHeight);
    console.log('📱 User agent:', navigator.userAgent);
    try {
        // Only initialize the correct components
    initNavbar();
    initCarousel();
    initSmoothScrolling();
    initHeroDropdown();
    initMobileHeightFixes();
        // Debug helpers
        window.portfolioDebug = {
            testCarousel: () => {
                console.log('🎠 Testing carousel...');
                const slides = document.querySelectorAll('.carousel-slide');
                console.log('Found slides:', slides.length);
                slides.forEach((slide, index) => {
                    console.log(`Slide ${index}:`, slide.classList.contains('active'));
                });
            },
            testNavigation: () => {
                console.log('🧭 Testing navigation...');
                const menu = document.querySelector('.nav-menu');
                const toggle = document.querySelector('.nav-toggle');
                console.log('Menu element:', !!menu);
                console.log('Toggle element:', !!toggle);
                console.log('Menu max-height:', menu?.style.maxHeight);
            },
            testHeroDropdown: () => {
                console.log('📚 Testing hero dropdown...');
                const btn = document.getElementById('learn-more-btn');
                const dropdown = document.getElementById('hero-description-dropdown');
                const icon = document.getElementById('learn-more-icon');
                console.log('Learn More button:', !!btn);
                console.log('Dropdown:', !!dropdown);
                console.log('Icon:', !!icon);
                if (dropdown) {
                    console.log('Dropdown is open:', dropdown.classList.contains('open'));
                }
            },
            getState: () => ({
                currentSlide,
                slidesCount: document.querySelectorAll('.carousel-slide').length,
                menuOpen: document.querySelector('.nav-menu')?.style.maxHeight !== '0px',
                heroDropdownOpen: document.getElementById('hero-description-dropdown')?.classList.contains('open') || false
            })
        };
        console.log('🛠️ Debug helpers available: window.portfolioDebug');
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
}

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
