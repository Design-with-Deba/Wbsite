// Add modern functionality to the website

// Helper function for smooth scrolling
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (!element) return;
    
    window.scrollTo({
        top: element.offsetTop - 80, // Account for fixed header
        behavior: 'smooth'
    });
}

// Handle navigation links clicks
document.querySelectorAll('header a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (document.querySelector('header').classList.contains('active')) {
            document.querySelector('header').classList.remove('active');
        }
        
        smoothScroll(this.getAttribute('href'));
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');

menuToggle.addEventListener('click', () => {
    header.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (header.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add animations to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-item, .pricing-category, .plan-card, #about p, #contact form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        observer.observe(el);
    });
};

// Set current year in footer
document.getElementById('current-year').innerText = new Date().getFullYear();

// Initialize animations when the page is loaded
window.addEventListener('load', () => {
    animateOnScroll();
    
    // Add fade-in class to hero section
    document.querySelector('#hero .container').classList.add('fade-in');
});
