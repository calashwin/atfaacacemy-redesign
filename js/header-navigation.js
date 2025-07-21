// Enhanced ATFA Header Navigation with Dropdown Support
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
                // Close all dropdowns when menu closes
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    // Enhanced dropdown functionality for mobile and desktop
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.nav-link');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropdownToggle && dropdownContent) {
            // Mobile dropdown toggle
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
            
            // Desktop hover behavior enhancement
            if (window.innerWidth > 768) {
                let hoverTimeout;
                
                dropdown.addEventListener('mouseenter', function() {
                    clearTimeout(hoverTimeout);
                    dropdown.classList.add('hover');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    hoverTimeout = setTimeout(() => {
                        dropdown.classList.remove('hover');
                    }, 300); // Brief delay for better UX
                });
            }
        }
    });

    // Close mobile menu when clicking on a link
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close if it's a dropdown toggle
                if (!link.parentElement.classList.contains('dropdown')) {
                    if (hamburger) hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (hamburger && navMenu && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            // Close all dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.style.overflow = '';
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu and dropdowns on Escape
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.style.overflow = '';
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Focus management for accessibility
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.nav-link');
        const dropdownLinks = dropdown.querySelectorAll('.dropdown-content a');
        
        if (dropdownToggle && dropdownLinks.length > 0) {
            dropdownToggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (window.innerWidth <= 768) {
                        dropdown.classList.toggle('active');
                        if (dropdown.classList.contains('active')) {
                            dropdownLinks[0].focus();
                        }
                    }
                }
            });
            
            // Arrow key navigation within dropdown
            dropdownLinks.forEach((link, index) => {
                link.addEventListener('keydown', function(e) {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const nextIndex = (index + 1) % dropdownLinks.length;
                        dropdownLinks[nextIndex].focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prevIndex = index === 0 ? dropdownLinks.length - 1 : index - 1;
                        dropdownLinks[prevIndex].focus();
                    }
                });
            });
        }
    });
});