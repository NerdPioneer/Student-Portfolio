// ==============================================
// NAVBAR FUNCTIONALITY
// ==============================================

function initNavbar() {
    console.log('🔧 Initializing navbar functionality...');
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    const navbar = document.querySelector('.desktop-nav');
    
    if (!navToggle || !navMenu) {
        console.warn('⚠️ Navbar elements not found');
        return;
    }
    
    console.log('✅ Navbar elements found, setting up toggle...');
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Enhanced navbar scroll effect
    let lastScrollTop = 0;
    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    navbar.classList.add('hidden');
                } else {
                    navbar.classList.remove('hidden');
                }
            } else {
                navbar.classList.remove('scrolled', 'hidden');
            }
        }
        lastScrollTop = scrollTop;
    }
    
    // Throttled scroll handler for better performance
    let ticking = false;
    function throttledScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Toggle mobile menu with enhanced animations
    function toggleMobileMenu(e) {
        console.log('🍔 Hamburger clicked!');
        e.preventDefault();
        e.stopPropagation();
        const isOpen = navMenu.classList.contains('open');
        
        if (isOpen) {
            // Enhanced close animation
            navMenu.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            navMenu.classList.remove('open');
            navMenu.style.maxHeight = '0px';
            navMenu.style.opacity = '0';
            navMenu.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                navMenu.style.display = '';
                navMenu.style.transition = '';
            }, 400);
            
            navToggle.setAttribute('aria-expanded', 'false');
            hamburgerLines.forEach((line, index) => {
                line.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                line.style.transform = '';
                line.style.opacity = '';
            });
            
            if (isMobile) {
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
            console.log('📱 Mobile menu closed');
        } else {
            // Enhanced open animation
            navMenu.style.display = 'block';
            navMenu.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            navMenu.style.opacity = '0';
            navMenu.style.transform = 'translateY(-10px)';
            
            // Force reflow
            navMenu.offsetHeight;
            
            const setHeight = () => {
                navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
                navMenu.style.opacity = '1';
                navMenu.style.transform = 'translateY(0)';
            };
            
            setHeight();
            setTimeout(setHeight, 50);
            
            navToggle.setAttribute('aria-expanded', 'true');
            
            // Enhanced hamburger animation
            if (hamburgerLines.length >= 3) {
                hamburgerLines.forEach((line, index) => {
                    line.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                });
                
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
    
    // Enhanced nav link click handling
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                // Smooth close animation
                navMenu.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                navMenu.classList.remove('open');
                navMenu.style.maxHeight = '0px';
                navMenu.style.opacity = '0';
                navMenu.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    navMenu.style.display = '';
                    navMenu.style.transition = '';
                }, 300);
                
                navToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger with smooth animation
                hamburgerLines.forEach(line => {
                    line.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    line.style.transform = '';
                    line.style.opacity = '';
                });
                
                if (isMobile) {
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                }
                
                console.log('📱 Mobile menu closed via nav link');
            }
        });
    });
    
    // Enhanced resize handling
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            navMenu.classList.remove('open');
            navMenu.style.maxHeight = '';
            navMenu.style.display = '';
            navMenu.style.opacity = '';
            navMenu.style.transform = '';
            navMenu.style.transition = '';
            navToggle.setAttribute('aria-expanded', 'false');
            
            hamburgerLines.forEach(line => {
                line.style.transition = '';
                line.style.transform = '';
                line.style.opacity = '';
            });
            
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });
    
    // Enhanced outside click handling
    document.addEventListener('click', function(e) {
        const isMenuOpen = navMenu.style.maxHeight && navMenu.style.maxHeight !== '0px';
        const isClickInsideNav = navToggle.contains(e.target) || navMenu.contains(e.target);
        
        if (isMenuOpen && !isClickInsideNav && window.innerWidth <= 1024) {
            navMenu.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            navMenu.classList.remove('open');
            navMenu.style.maxHeight = '0px';
            navMenu.style.opacity = '0';
            navMenu.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                navMenu.style.display = '';
                navMenu.style.transition = '';
            }, 300);
            
            navToggle.setAttribute('aria-expanded', 'false');
            
            hamburgerLines.forEach(line => {
                line.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                line.style.transform = '';
                line.style.opacity = '';
            });
            
            if (isMobile) {
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
            
            console.log('📱 Mobile menu closed via outside click');
        }
    });
    
    console.log('✅ Enhanced navbar functionality initialized successfully');
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
// ENHANCED SMOOTH SCROLLING WITH ADVANCED FEATURES
// ==============================================

function initSmoothScrolling() {
    console.log('📜 Initializing enhanced smooth scrolling...');
    
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    console.log('📱 Device detection:', { isMobile, isIOS });
    
    // Enhanced easing functions
    const easingFunctions = {
        easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
        easeOutBack: t => {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
        }
    };
    
    // Dynamic offset calculation based on screen size and navbar height
    function getScrollOffset() {
        const navbar = document.querySelector('.desktop-nav');
        if (navbar) {
            const navbarHeight = navbar.offsetHeight;
            const isScrolled = navbar.classList.contains('scrolled');
            return isScrolled ? navbarHeight + 20 : navbarHeight + 40;
        }
        return 100; // Fallback
    }
    
    // Enhanced smooth scroll function - made global for back to top button
    window.smoothScrollTo = function(targetElement, duration = 1200) {
        let targetPosition;
        
        // Handle special case for back to top (scrolling to document top)
        if (targetElement === document.documentElement || targetElement === document.body) {
            targetPosition = 0;
        } else {
            targetPosition = targetElement.offsetTop - getScrollOffset();
        }
        
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        // Use different easing based on distance
        const easing = Math.abs(distance) > 1000 ? easingFunctions.easeInOutQuart : easingFunctions.easeInOutCubic;
        
        function animateScroll(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const easedProgress = easing(progress);
            const currentPosition = startPosition + distance * easedProgress;
            
            window.scrollTo(0, currentPosition);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                // Ensure we land exactly on target
                window.scrollTo(0, targetPosition);
                console.log('✅ Enhanced scroll completed');
            }
        }
        
        requestAnimationFrame(animateScroll);
    };
    
    // Enhanced link click handling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Add active state to clicked link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                if (isMobile) {
                    console.log(`📱 Enhanced mobile scroll to ${href}`);
                    smoothScrollTo(targetElement, 1000);
                } else {
                    console.log(`🖥️ Enhanced desktop scroll to ${href}`);
                    smoothScrollTo(targetElement, 1200);
                }
            }
        });
    });
    
    // Add scroll progress indicator
    initScrollProgress();
    
    // Add back to top functionality
    initBackToTop();
    
    console.log('✅ Enhanced smooth scrolling initialized successfully');
}

// ==============================================
// SCROLL PROGRESS INDICATOR
// ==============================================

function initScrollProgress() {
    console.log('📊 Initializing scroll progress indicator...');
    
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
    `;
    
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    let ticking = false;
    function updateScrollProgress() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (scrollTop / docHeight) * 100;
                
                progressBar.style.width = `${progress}%`;
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    
    console.log('✅ Scroll progress indicator initialized');
}

// ==============================================
// BACK TO TOP FUNCTIONALITY
// ==============================================

function initBackToTop() {
    console.log('⬆️ Initializing back to top functionality...');
    
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18,15 12,9 6,15"></polyline>
        </svg>
    `;
    
    // Apply styles via CSS class instead of inline styles
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px) scale(0.8);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.style.transform = 'translateY(0) scale(1)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.style.transform = 'translateY(20px) scale(0.8)';
        }
    }
    
    // Fixed smooth scroll to top function
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🔄 Back to top clicked, scrolling...');
        
        // Use the existing smooth scroll function if available, otherwise fallback
        try {
            // Try to use the enhanced smooth scroll function
            const targetElement = document.documentElement;
            if (typeof smoothScrollTo === 'function') {
                smoothScrollTo(targetElement, 800);
            } else {
                // Fallback to native smooth scroll
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            console.warn('⚠️ Enhanced scroll failed, using fallback:', error);
            // Ultimate fallback
            window.scrollTo(0, 0);
        }
    });
    
    // Enhanced hover effects
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
        backToTopBtn.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.4)';
        backToTopBtn.style.background = 'linear-gradient(135deg, #2563eb, #7c3aed)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 500) {
            backToTopBtn.style.transform = 'translateY(0) scale(1)';
        } else {
            backToTopBtn.style.transform = 'translateY(20px) scale(0.8)';
        }
        backToTopBtn.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
        backToTopBtn.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
    });
    
    // Focus effects for accessibility
    backToTopBtn.addEventListener('focus', () => {
        backToTopBtn.style.outline = '3px solid rgba(59, 130, 246, 0.5)';
        backToTopBtn.style.outlineOffset = '2px';
    });
    
    backToTopBtn.addEventListener('blur', () => {
        backToTopBtn.style.outline = 'none';
    });
    
    // Initialize button state
    toggleBackToTop();
    
    // Add scroll listener
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    
    // Debug: Log button creation
    console.log('🔍 Back to top button created:', backToTopBtn);
    console.log('🔍 Button styles:', backToTopBtn.style.cssText);
    console.log('🔍 Button position:', backToTopBtn.getBoundingClientRect());
    
    // Force initial visibility for testing (remove in production)
    setTimeout(() => {
        console.log('🔍 Testing button visibility...');
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
        backToTopBtn.style.transform = 'translateY(0) scale(1)';
        
        setTimeout(() => {
            toggleBackToTop(); // Reset to normal behavior
        }, 2000);
    }, 1000);
    
    console.log('✅ Enhanced back to top functionality initialized');
}

// ==============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ==============================================

function initIntersectionObserver() {
    console.log('👁️ Initializing intersection observer for scroll animations...');
    
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.section, .project-card, .education-card, .skill-group');
    
    if (animatedElements.length === 0) {
        console.log('⚠️ No animated elements found');
        return;
    }
    
    // Animation options
    const animationOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, animationOptions);
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        // Add initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add animation class
        element.classList.add('scroll-animate');
        
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .scroll-animate.animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .animate-child {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-child.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    console.log(`✅ Intersection observer initialized for ${animatedElements.length} elements`);
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
    console.log('🚀 Starting enhanced portfolio app initialization...');
    console.log('📊 Current viewport:', window.innerWidth + 'x' + window.innerHeight);
    console.log('📱 User agent:', navigator.userAgent);
    try {
        // Initialize enhanced components
        initNavbar();
        initCarousel();
        initSmoothScrolling();
        initHeroDropdown();
        initMobileHeightFixes();
        initIntersectionObserver();
        
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
        console.log('🛠️ Enhanced debug helpers available: window.portfolioDebug');
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
