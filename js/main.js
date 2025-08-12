// Main JavaScript for ATFA Website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove any existing scroll progress bars
    const existingProgress = document.querySelector('.scroll-progress');
    if (existingProgress) {
        existingProgress.remove();
    }

    // Initialize all components
    initNavigation();
    initTestimonialCarousel();
    initScrollEffects();
    initSmoothScrolling();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Testimonial carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    if (testimonials.length === 0) return;

    function showSlide(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });

        // Remove active from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Show current testimonial and indicator
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
    }

    // Add click handlers to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance carousel every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }, 5000);

    // Initialize first slide
    showSlide(0);
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.course-card, .involvement-card, .testimonial, .hero-content, .section-header');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations and interactive effects
function initAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        /* Animation classes */
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .course-card,
        .involvement-card,
        .testimonial,
        .hero-content,
        .section-header {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }

        .hero-content {
            animation: slideInLeft 0.8s ease-out forwards;
        }

        .hero-visual {
            animation: slideInRight 0.8s ease-out 0.2s forwards;
            opacity: 0;
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        /* Hover effects for cards */
        .course-card:hover .course-icon,
        .involvement-card:hover .involvement-icon {
            transform: scale(1.1);
            transition: transform 0.3s ease;
        }

        /* Button hover effects */
        .btn {
            position: relative;
            overflow: hidden;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }

        .btn:hover::before {
            left: 100%;
        }

        /* Floating animation for hero cards */
        .floating-card {
            cursor: pointer;
        }

        .floating-card:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        /* Stats counter animation */
        .stat-number {
            display: inline-block;
        }

        /* Testimonial transition */
        .testimonial {
            opacity: 0;
            transform: translateX(30px);
            transition: all 0.5s ease-in-out;
        }

        .testimonial.active {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);

    // Initialize counter animation for stats
    initStatsCounter();

    // Add click interactions
    addClickEffects();
}

// Animated counter for statistics
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                
                if (numericValue) {
                    animateCounter(target, 0, numericValue, finalValue);
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, originalText) {
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        // Update text while preserving formatting
        element.textContent = originalText.replace(/[\d,]+/, current.toLocaleString());
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Add click effects and interactions
function addClickEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .course-btn, .involvement-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                pointer-events: none;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s linear;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const indicators = document.querySelectorAll('.indicator');
        const activeIndicator = document.querySelector('.indicator.active');
        
        if (activeIndicator && indicators.length > 1) {
            const currentIndex = Array.from(indicators).indexOf(activeIndicator);
            let newIndex;
            
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : indicators.length - 1;
            } else {
                newIndex = currentIndex < indicators.length - 1 ? currentIndex + 1 : 0;
            }
            
            indicators[newIndex].click();
        }
    }
});

// Error handling and fallbacks
window.addEventListener('error', function(e) {
    console.error('Script error:', e.error);
    // Fallback for critical functionality
    if (e.filename && e.filename.includes('main.js')) {
        // Ensure basic navigation still works
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.onclick = () => {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            };
        }
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initTestimonialCarousel,
        initScrollEffects,
        initSmoothScrolling,
        initAnimations
    };
}