// ==============================================

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
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
            navMenu.classList.remove('open');
            navMenu.style.maxHeight = '0px';
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
            navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
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

// ==============================================
// SCROLL TO TOP FUNCTIONALITY
// ==============================================

function initScrollToTop() {
    console.log('⬆️ Initializing scroll to top functionality...');
    
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollToTopBtn) {
        console.warn('⚠️ Scroll to top button not found');
        return;
    }
    
    console.log('✅ Scroll to top button found, setting up functionality...');
    
    // Show/hide button based on scroll position
    function toggleScrollButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const shouldShow = scrollTop > 300; // Show after scrolling 300px
        
        if (shouldShow) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
            scrollToTopBtn.style.transform = 'translateY(8px)';
        }
    }
    
    // Smooth scroll to top when clicked
    function scrollToTop(e) {
        e.preventDefault();
        console.log('⬆️ Scroll to top clicked');
        
        // Use smooth scrolling if supported, fallback to instant
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback smooth scroll for older browsers
            const scrollStep = -window.scrollY / (500 / 15);
            const scrollInterval = setInterval(() => {
                if (window.scrollY !== 0) {
                    window.scrollBy(0, scrollStep);
                } else {
                    clearInterval(scrollInterval);
                }
            }, 15);
        }
    }
    
    // Event listeners
    window.addEventListener('scroll', toggleScrollButton, { passive: true });
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    // Initial check
    toggleScrollButton();
    
    console.log('✅ Scroll to top functionality initialized');
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
        initScrollToTop();
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
            getState: () => ({
                currentSlide,
                slidesCount: document.querySelectorAll('.carousel-slide').length,
                menuOpen: document.querySelector('.nav-menu')?.style.maxHeight !== '0px',
                scrollToTopVisible: document.getElementById('scroll-to-top')?.style.opacity === '1'
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
