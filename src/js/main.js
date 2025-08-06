// Enhanced Student Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Profile Image Carousel Functionality
    const carousel = {
        currentSlide: 0,
        slides: document.querySelectorAll('.carousel-slide'),
        dots: document.querySelectorAll('.carousel-dot'),
        
        init() {
            if (this.slides.length === 0) return;
            
            // Auto-rotate every 3 seconds
            this.autoRotate = setInterval(() => {
                this.nextSlide();
            }, 3000);
            
            // Event listeners for dots only
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.goToSlide(index);
                    this.resetAutoRotate();
                });
            });
            
            // Pause on hover
            const carouselContainer = document.querySelector('.carousel-container');
            carouselContainer?.addEventListener('mouseenter', () => {
                clearInterval(this.autoRotate);
            });
            
            carouselContainer?.addEventListener('mouseleave', () => {
                this.resetAutoRotate();
            });
        },
        
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.updateSlides();
        },
        
        prevSlide() {
            this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
            this.updateSlides();
        },
        
        goToSlide(index) {
            this.currentSlide = index;
            this.updateSlides();
        },
        
        updateSlides() {
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentSlide);
                slide.style.opacity = index === this.currentSlide ? '1' : '0';
            });
            
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
                dot.style.backgroundColor = index === this.currentSlide ? 'white' : 'rgba(255, 255, 255, 0.6)';
            });
        },
        
        resetAutoRotate() {
            clearInterval(this.autoRotate);
            this.autoRotate = setInterval(() => {
                this.nextSlide();
            }, 3000);
        }
    };
    
    // Initialize carousel
    carousel.init();
    
    // Typewriter effect for hero subtitle
    const typewriterElement = document.getElementById('typewriter-title');
    if (typewriterElement) {
        const texts = [
            'EZEKIEL OBEISUN JR. - CLOUD COMPUTING GRADUATE',
            'NERDPIONEER | 1PERCENTNERD JOURNEY',
            'CYBERSECURITY PROFESSIONAL',
            'CLOUD INFRASTRUCTURE SPECIALIST'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = 100;
            
            if (isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before starting new text
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        typeWriter();
    }
    
    // Typewriter effect for Atomic Habits quote
    const atomicHabitsQuote = document.getElementById('atomic-habits-quote');
    if (atomicHabitsQuote) {
        const quoteText = '1% Better Everyday - Atomic Habits by James Clear';
        let quoteIndex = 0;
        
        // Clear the text first
        atomicHabitsQuote.textContent = '';
        
        function typeQuote() {
            if (quoteIndex < quoteText.length) {
                atomicHabitsQuote.textContent += quoteText.charAt(quoteIndex);
                quoteIndex++;
                setTimeout(typeQuote, 80);
            }
        }
        
        // Start typing the quote after a delay
        setTimeout(typeQuote, 3000);
    }
    
    // Mobile navigation functionality - Enhanced for better mobile experience
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    
    console.log('Mobile nav elements found:', { navToggle, navMenu, hamburgerLines: hamburgerLines.length });
    
    if (navToggle && navMenu) {
        let isMenuOpen = false;
        
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Mobile menu toggle clicked, currently open:', isMenuOpen);
            
            if (isMenuOpen) {
                // Close menu
                navMenu.style.maxHeight = '0';
                navToggle.setAttribute('aria-expanded', 'false');
                isMenuOpen = false;
                
                // Reset hamburger lines
                hamburgerLines.forEach((line) => {
                    line.style.transform = '';
                    line.style.opacity = '';
                });
                console.log('Mobile menu closed');
            } else {
                // Open menu
                navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
                navToggle.setAttribute('aria-expanded', 'true');
                isMenuOpen = true;
                
                // Animate hamburger to X
                if (hamburgerLines.length >= 3) {
                    hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    hamburgerLines[1].style.opacity = '0';
                    hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
                console.log('Mobile menu opened');
            }
        });
        
        // Add touch event for better mobile responsiveness
        navToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.style.maxHeight = '0';
                navToggle.setAttribute('aria-expanded', 'false');
                isMenuOpen = false;
                
                hamburgerLines.forEach((line) => {
                    line.style.transform = '';
                    line.style.opacity = '';
                });
            }
        });
        
    } else {
        console.error('Mobile navigation elements not found:', { navToggle, navMenu });
    }
    
    // Smooth scrolling for navigation links - Enhanced mobile support
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Found navigation links:', navLinks.length);
    
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log(`Nav link ${index} clicked, target: ${targetId}`, targetSection);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.style.maxHeight !== '0px' && navMenu.style.maxHeight !== '') {
                    console.log('Closing mobile menu after link click');
                    navMenu.style.maxHeight = '0';
                    navToggle?.setAttribute('aria-expanded', 'false');
                    hamburgerLines.forEach((line) => {
                        line.style.transform = '';
                        line.style.opacity = '';
                    });
                }
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            } else {
                console.error('Target section not found for:', targetId);
            }
        });
        
        // Add touch event for better mobile responsiveness
        link.addEventListener('touchstart', function(e) {
            // Don't prevent default here as we want the click to still work
        });
    });
    
    // Navbar scroll effect - Keep navbar always visible with consistent black styling
    const desktopNav = document.getElementById('desktop-nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (desktopNav) {
            // Always keep the navbar visible and maintain black styling
            desktopNav.style.transform = 'translateY(0)';
            desktopNav.style.visibility = 'visible';
            desktopNav.style.opacity = '1';
            desktopNav.classList.add('shadow-lg');
            desktopNav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            desktopNav.style.backdropFilter = 'blur(10px)';
            desktopNav.style.webkitBackdropFilter = 'blur(10px)'; // Safari support
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Intersection Observer for section highlighting
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Loading overlay - Remove immediately
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('loading-hidden');
    }

    // Add scroll animations for cards and elements
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    });

    // Observe cards for animations (removed section visibility management)
    document.querySelectorAll('.project-card, .education-card, .skill-item, .learning-item').forEach(el => {
        animateOnScroll.observe(el);
    });
    
    // Enhanced skill hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Contact form enhancement (if you add a contact form later)
    const contactButtons = document.querySelectorAll('a[href^="mailto:"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add analytics or other tracking here if needed
            console.log('Contact button clicked');
        });
    });
    
    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.style.maxHeight !== '0px' && navMenu.style.maxHeight !== '') {
            navMenu.style.maxHeight = '0';
            navToggle?.setAttribute('aria-expanded', 'false');
            hamburgerLines.forEach((line) => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        }
    });
    
    console.log('Portfolio initialized successfully! 🚀');
    
    // Add debug info for mobile navigation
    function checkMobileView() {
        const isMobile = window.innerWidth < 768;
        console.log('Current view mode:', isMobile ? 'Mobile' : 'Desktop', `(${window.innerWidth}px)`);
        return isMobile;
    }
    
    // Check initial view mode
    checkMobileView();
    
    // Monitor window resize for responsive debugging
    window.addEventListener('resize', checkMobileView);
});
