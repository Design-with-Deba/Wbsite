// Document Ready Function
document.addEventListener("DOMContentLoaded", function () {
  // Set Current Year in Footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const header = document.querySelector("header");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      header.classList.toggle("active");
      // Prevent scrolling when menu is open
      document.body.classList.toggle(
        "no-scroll",
        header.classList.contains("active")
      );
    });
  }

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (header.classList.contains("active")) {
        header.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      // Skip if it's just "#"
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate header height for offset
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Modern scroll animation with IntersectionObserver
  const animateOnScroll = () => {
    // Elements we want to animate
    const elementsToAnimate = document.querySelectorAll(
      ".service-item, .pricing-category, .plan-card, #about p, #about h2"
    );

    // Options for the Intersection Observer
    const observerOptions = {
      root: null, // viewport is used as the root
      rootMargin: "0px", // no margin
      threshold: 0.15, // trigger when 15% of the element is visible
    };

    // Create animation class with transition properties
    const createAnimationStyles = () => {
      if (!document.getElementById("scroll-animation-styles")) {
        const styleSheet = document.createElement("style");
        styleSheet.id = "scroll-animation-styles";
        styleSheet.innerHTML = `
        .service-item, .pricing-category, .plan-card, #about p, #about h2 {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          will-change: opacity, transform;
        }
        
        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .service-item, .pricing-category, .plan-card, #about p, #about h2 {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `;
        document.head.appendChild(styleSheet);
      }
    };

    // Apply initial styles
    createAnimationStyles();

    // Initialize animation on elements with different delays to create a cascade effect
    const initializeElements = () => {
      elementsToAnimate.forEach((element, index) => {
        // Add a small delay based on element index for staggered animation
        element.style.transitionDelay = `${index * 50}ms`;
      });
    };

    // Create and use the intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If element is intersecting (visible)
        if (entry.isIntersecting) {
          // Add animation class
          entry.target.classList.add("fade-in");

          // Stop observing this element once it's animated
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Check if browser supports IntersectionObserver
    if ("IntersectionObserver" in window) {
      // Initialize elements with staggered delays
      initializeElements();

      // Start observing all target elements
      elementsToAnimate.forEach((element) => {
        observer.observe(element);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      elementsToAnimate.forEach((element) => {
        element.classList.add("fade-in");
      });
    }

    // Cleanup function to remove observer when needed
    return {
      cleanup: () => {
        if (observer) {
          elementsToAnimate.forEach((element) => {
            observer.unobserve(element);
          });
        }
      },
    };
  };
  // Run once on load
  animateOnScroll();

  // Run on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Form validation and submission handling
  const contactForm = document.querySelector("#contact form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      // Basic form validation (can be expanded)
      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email");
      const messageField = document.getElementById("message");

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
        alert("Please fill in all required fields correctly.");
      }

      // If using Formspree or similar service, form submission continues normally
    });
  }

  // Helper function for form validation
  function highlightField(field, isError) {
    if (isError) {
      field.style.borderColor = "#ff3860";
    } else {
      field.style.borderColor = "#ddd";
    }
  }

  // Helper function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
