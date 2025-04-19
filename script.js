// Basic JavaScript for smooth scrolling and closing mobile menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const header = document.querySelector('header'); // Get the header
        const mainNav = document.querySelector('.main-nav'); // Get the navigation element
        const menuToggle = document.querySelector('.menu-toggle'); // Get the toggle button

        if (targetElement) {
             // Close the mobile menu if open
             // Check if menu is currently visible (based on the 'active' class on header)
             if (header.classList.contains('active')) {
                 header.classList.remove('active');

                 // Explicitly manage icon display if header becomes inactive
                 const menuIconBars = menuToggle.querySelector('.fa-bars');
                 const menuIconTimes = menuToggle.querySelector('.fa-times');
                 if (menuIconBars && menuIconTimes) {
                     menuIconBars.style.display = 'inline-block';
                     menuIconTimes.style.display = 'none';
                 }
             }

            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// JavaScript for Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('header'); // Element to toggle the 'active' class on
    const mainNav = document.querySelector('.main-nav'); // The navigation menu element
    const menuIconBars = menuToggle ? menuToggle.querySelector('.fa-bars') : null; // Hamburger icon
    const menuIconTimes = menuToggle ? menuToggle.querySelector('.fa-times') : null; // Close icon

    // Check if elements exist before adding listeners
    if (menuToggle && header && mainNav) {
        menuToggle.addEventListener('click', function() {
            header.classList.toggle('active'); // Toggle the 'active' class on the header

            // Toggle icon visibility manually if CSS isn't handling it perfectly or for fallback
            // (The CSS rules added in the previous step *should* handle this,
            // but keeping JS toggle as a safeguard or if preferring JS control)
             if (menuIconBars && menuIconTimes) {
                 if (header.classList.contains('active')) {
                     menuIconBars.style.display = 'none';
                     menuIconTimes.style.display = 'inline-block';
                 } else {
                     menuIconBars.style.display = 'inline-block';
                     menuIconTimes.style.display = 'none';
                 }
             }
        });
    }


    // Optional: Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});