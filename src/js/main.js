// ==============================================
// UMIAMI ANALYTICS TRACKING
// ==============================================

// Enhanced Umami tracking for better insights
function trackEvent(eventName, eventData = {}) {
    try {
        if (typeof umami !== 'undefined') {
            umami.track(eventName, eventData);
        }
    } catch (error) {
        console.warn('Analytics tracking error:', error);
    }
}

// Track page views and user interactions
function initAnalytics() {
    // Track page load
    trackEvent('page_view', {
        page: window.location.pathname,
        referrer: document.referrer,
        user_agent: navigator.userAgent
    });
    
    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            trackEvent('navigation_click', {
                link_text: e.target.textContent.trim(),
                link_href: e.target.href,
                section: e.target.getAttribute('href')?.replace('#', '') || 'unknown'
            });
        });
    });
    
    // Track project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const projectTitle = card.querySelector('h3')?.textContent || 'Unknown Project';
            trackEvent('project_interaction', {
                project: projectTitle,
                action: 'click'
            });
        });
    });
    
    
    // Track scroll depth with throttling for performance
    let maxScrollDepth = 0;
    let scrollTimeout;
    const handleScroll = () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                if (maxScrollDepth % 25 === 0) { // Track every 25%
                    trackEvent('scroll_depth', {
                        depth: maxScrollDepth,
                        page: window.location.pathname
                    });
                }
            }
            scrollTimeout = null;
        }, 100); // Throttle to 100ms
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', {
            seconds: timeOnPage,
            page: window.location.pathname
        });
    });
}

// ==============================================
// NAVBAR FUNCTIONALITY
// ==============================================

function initNavbar() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    const navbar = document.querySelector('.desktop-nav');
    
    if (!navToggle || !navMenu) {
        return;
    }
    
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
            
            requestAnimationFrame(setHeight);
            
            navMenu.classList.add('open');
            navToggle.setAttribute('aria-expanded', 'true');
            
            // Enhanced hamburger animation
            hamburgerLines.forEach((line, index) => {
                line.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                
                if (index === 0) {
                    line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                } else if (index === 1) {
                    line.style.opacity = '0';
                } else if (index === 2) {
                    line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
            });
            
            if (isMobile) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            }
        }
    }
    
    // Add click event to toggle button
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('open')) {
                toggleMobileMenu(e);
            }
        }
    });
    
    // Close menu when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            toggleMobileMenu(e);
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 1024 && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navMenu.style.maxHeight = '';
                navMenu.style.opacity = '';
                navMenu.style.transform = '';
                navToggle.setAttribute('aria-expanded', 'false');
                
                hamburgerLines.forEach(line => {
                    line.style.transition = '';
                    line.style.transform = '';
                    line.style.opacity = '';
                });
                
                if (isMobile) {
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
            }
        }, 250);
    });
    
    // Add smooth scrolling to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu.classList.contains('open')) {
                        toggleMobileMenu(e);
                    }
                }
            }
        });
    });
}

// ==============================================
// PHOTO CAROUSEL FUNCTIONALITY
// ==============================================

let currentSlide = 0;
let slidesCount = 0;
let autoPlayInterval;

function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!carouselContainer || slides.length === 0) {
        return;
    }
    
    slidesCount = slides.length;
    
    // Initialize first slide
    updateCarousel();
    
    // Add dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-play functionality
    startAutoPlay();
    
    // Pause auto-play on hover
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carouselContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeSlide(1); // Swipe left
            } else {
                changeSlide(-1); // Swipe right
            }
        }
    }
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slidesCount) % slidesCount;
    updateCarousel();
    resetAutoPlay();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoPlay();
}

function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Update slides
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function startAutoPlay() {
    if (autoPlayInterval) return;
    
    autoPlayInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// ==============================================
// SMOOTH SCROLLING
// ==============================================

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbar = document.querySelector('.desktop-nav');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==============================================
// BACK TO TOP BUTTON
// ==============================================

function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '▲';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    // Style the button - minimal inline styles, rest handled by CSS
    Object.assign(backToTopBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        zIndex: '1000'
    });
    
    // Hover effects now handled by CSS
    
    // Add click functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add focus styles
    backToTopBtn.addEventListener('focus', () => {
        backToTopBtn.style.outline = '2px solid #60a5fa';
        backToTopBtn.style.outlineOffset = '2px';
    });
    
    backToTopBtn.addEventListener('blur', () => {
        backToTopBtn.style.outline = 'none';
    });
    
    // Initialize button state
    toggleBackToTop();
    
    // Add scroll listener
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    
    // Add button to DOM
    document.body.appendChild(backToTopBtn);
}

function toggleBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Show button when scrolled down and there's more content below
    if (scrollTop > windowHeight && scrollTop + windowHeight < documentHeight - 100) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// ==============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ==============================================

function initIntersectionObserver() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.section, .project-card, .education-card, .skill-group');
    
    if (animatedElements.length === 0) {
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
}

// ==============================================
// INITIALIZATION
// ==============================================

function initHeroDropdown() {
    // Button removed; no-op to avoid errors if called
}

function initMobileHeightFixes() {
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
}

function initializeApp() {
    try {
        // Initialize enhanced components
        initNavbar();
        initCarousel();
        initSmoothScrolling();
        initHeroDropdown();
        initMobileHeightFixes();
        initIntersectionObserver();
        initBackToTop();
        
        // Initialize analytics tracking
        initAnalytics();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Fallback initialization after a short delay
setTimeout(() => {
    if (!document.querySelector('.back-to-top')) {
        initializeApp();
    }
}, 1000);

