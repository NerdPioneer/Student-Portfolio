// Enhanced Student Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Typewriter effect for hero subtitle
    const typewriterElement = document.getElementById('typewriter-title');
    if (typewriterElement) {
        const fullText = 'EZEKIEL OBEISUN JR. - CLOUD COMPUTING GRADUATE';
        let charIndex = 0;
        
        // Clear the initial text
        typewriterElement.textContent = '';
        typewriterElement.style.borderRight = '2px solid #000000';
        
        function typeWriter() {
            if (charIndex < fullText.length) {
                typewriterElement.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 80); // Slightly faster typing speed
            } else {
                // Keep the cursor blinking after typing is complete
                setTimeout(() => {
                    typewriterElement.style.borderRight = '2px solid transparent';
                    setTimeout(() => {
                        typewriterElement.style.borderRight = '2px solid #000000';
                    }, 500);
                }, 500);
                
                // Restart the cursor blinking animation
                setInterval(() => {
                    typewriterElement.style.borderRight = typewriterElement.style.borderRight === '2px solid transparent' 
                        ? '2px solid #000000' 
                        : '2px solid transparent';
                }, 1000);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Mobile navigation functionality - Enhanced for better mobile experience
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    
    console.log('Mobile nav elements found:', { navToggle, navMenu, hamburgerLines: hamburgerLines.length });
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = !navMenu.classList.contains('hidden');
            
            console.log('Mobile menu toggle clicked, currently open:', isOpen);
            
            if (isOpen) {
                // Close menu
                navMenu.classList.add('hidden');
                navToggle.setAttribute('aria-expanded', 'false');
                // Reset hamburger lines
                hamburgerLines.forEach((line) => {
                    line.style.transform = '';
                    line.style.opacity = '';
                });
                console.log('Mobile menu closed');
            } else {
                // Open menu
                navMenu.classList.remove('hidden');
                navToggle.setAttribute('aria-expanded', 'true');
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
                if (navMenu && !navMenu.classList.contains('hidden')) {
                    console.log('Closing mobile menu after link click');
                    navMenu.classList.add('hidden');
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
    
    // Loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('loading-hidden');
        }, 1000);
    }
    
    // Add scroll animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe cards and sections for animations
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
        if (e.key === 'Escape' && navMenu && !navMenu.classList.contains('hidden')) {
            navMenu.classList.add('hidden');
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
