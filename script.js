// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Set Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('header');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            header.classList.toggle('active');
            // Prevent scrolling when menu is open
            document.body.classList.toggle('no-scroll', header.classList.contains('active'));
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (header.classList.contains('active')) {
                header.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation classes to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-item, .pricing-category, .plan-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Form validation and submission handling
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic form validation (can be expanded)
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            let isValid = true;
            
            // Very basic validation
            if (!nameField.value.trim()) {
                highlightField(nameField, true);
                isValid = false;
            } else {
                highlightField(nameField, false);
            }
            
            if (!emailField.value.trim() || !isValidEmail(emailField.value)) {
                highlightField(emailField, true);
                isValid = false;
            } else {
                highlightField(emailField, false);
            }
            
            if (!messageField.value.trim()) {
                highlightField(messageField, true);
                isValid = false;
            } else {
                highlightField(messageField, false);
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
            }
            
            // If using Formspree or similar service, form submission continues normally
        });
    }
    
    // Helper function for form validation
    function highlightField(field, isError) {
        if (isError) {
            field.style.borderColor = '#ff3860';
        } else {
            field.style.borderColor = '#ddd';
        }
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});