// Enhanced ATFA Header Navigation with Dropdown Support
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ATFA Navigation JS loaded successfully!');
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Debug: Check if elements exist
    console.log('🔍 Debug Info:');
    console.log('   Hamburger element:', hamburger);
    console.log('   Nav menu element:', navMenu);
    console.log('   Mobile backdrop:', mobileBackdrop);
    console.log('   Mobile close btn:', mobileCloseBtn);
    console.log('   Dropdowns found:', dropdowns.length);

    // Function to close mobile menu
    function closeMobileMenu() {
        console.log('🔒 Closing mobile menu...');
        if (hamburger) {
            hamburger.classList.remove('active');
            console.log('   ✅ Hamburger active class removed');
        }
        if (navMenu) {
            navMenu.classList.remove('active');
            console.log('   ✅ Nav menu active class removed');
        }
        if (mobileBackdrop) {
            mobileBackdrop.classList.remove('active');
            console.log('   ✅ Backdrop active class removed');
        }
        document.body.style.overflow = '';
        document.body.style.position = '';
        console.log('   ✅ Body scroll restored');
        
        // Close all dropdowns when menu closes
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    // Function to open mobile menu
    function openMobileMenu() {
        console.log('🔓 Opening mobile menu...');
        if (hamburger) {
            hamburger.classList.add('active');
            console.log('   ✅ Hamburger active class added');
        }
        if (navMenu) {
            navMenu.classList.add('active');
            console.log('   ✅ Nav menu active class added');
        }
        if (mobileBackdrop) {
            mobileBackdrop.classList.add('active');
            console.log('   ✅ Backdrop active class added');
        }
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        console.log('   ✅ Body scroll disabled');
    }

    // Mobile menu toggle with extensive debugging
    if (hamburger && navMenu) {
        console.log('✅ Setting up hamburger click listener');
        
        // Add a global test function for debugging
        window.testHamburger = function() {
            console.log('🧪 Manual hamburger test triggered');
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        };
        
        // Test that the element is accessible
        console.log('🔍 Hamburger element details:');
        console.log('   - Tag name:', hamburger.tagName);
        console.log('   - Classes:', hamburger.className);
        console.log('   - ID:', hamburger.id);
        console.log('   - Computed style display:', window.getComputedStyle(hamburger).display);
        console.log('   - Computed style pointer-events:', window.getComputedStyle(hamburger).pointerEvents);
        console.log('   - Bounds:', hamburger.getBoundingClientRect());
        
        // Add multiple event listeners for better mobile support
        hamburger.addEventListener('click', function(e) {
            console.log('🍔 Hamburger clicked!');
            console.log('   Event:', e);
            console.log('   Menu is active:', navMenu.classList.contains('active'));
            
            e.preventDefault();
            e.stopPropagation();
            
            if (navMenu.classList.contains('active')) {
                console.log('   → Closing menu');
                closeMobileMenu();
            } else {
                console.log('   → Opening menu');
                openMobileMenu();
            }
        });
        
        // Add touch support for mobile devices
        hamburger.addEventListener('touchstart', function(e) {
            console.log('📱 Hamburger touched!');
            e.preventDefault();
            e.stopPropagation();
            
            if (navMenu.classList.contains('active')) {
                console.log('   → Closing menu (touch)');
                closeMobileMenu();
            } else {
                console.log('   → Opening menu (touch)');
                openMobileMenu();
            }
        });
        
        // Make sure hamburger is clickable
        hamburger.style.pointerEvents = 'auto';
        hamburger.style.cursor = 'pointer';
        
    } else {
        console.error('❌ Hamburger or navMenu not found!');
        console.log('   Hamburger:', hamburger);
        console.log('   NavMenu:', navMenu);
    }

    // Mobile close button
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', function() {
            closeMobileMenu();
        });
    }

    // Close menu when clicking backdrop
    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', function() {
            closeMobileMenu();
        });
    }

    // Enhanced dropdown functionality for mobile and desktop
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.nav-link');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropdownToggle && dropdownContent) {
            // Mobile dropdown toggle
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 767) {
                    console.log('📚 Courses dropdown clicked on mobile');
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown with animation
                    dropdown.classList.toggle('active');
                    console.log('   → Dropdown is now', dropdown.classList.contains('active') ? 'open' : 'closed');
                    
                    // Add slight delay for better UX
                    if (dropdown.classList.contains('active')) {
                        setTimeout(() => {
                            const firstLink = dropdown.querySelector('.dropdown-content a');
                            if (firstLink) {
                                firstLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                        }, 200);
                    }
                }
            });
            
            // Add touch support for dropdown toggle
            dropdownToggle.addEventListener('touchstart', function(e) {
                if (window.innerWidth <= 767) {
                    console.log('📱 Courses dropdown touched on mobile');
                    e.preventDefault();
                    e.stopPropagation();
                    
                    dropdown.classList.toggle('active');
                    console.log('   → Dropdown is now', dropdown.classList.contains('active') ? 'open' : 'closed');
                }
            });
            
            // Desktop hover behavior enhancement
            if (window.innerWidth > 767) {
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
                    closeMobileMenu();
                }
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (hamburger && navMenu && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target) &&
            !mobileCloseBtn?.contains(e.target)) {
            // Only close if menu is actually open
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });

    // Prevent menu from closing when clicking inside
    if (navMenu) {
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            closeMobileMenu();
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
            closeMobileMenu();
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
                    if (window.innerWidth <= 767) {
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