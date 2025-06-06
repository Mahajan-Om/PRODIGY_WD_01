// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when scrolled down
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide navbar when scrolling down, show when scrolling up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navbar.contains(event.target);
    
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active link highlighting based on scroll position
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(function(link) {
          link.classList.remove('active');
        });
        
        // Add active class to current section link
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  });

  // Add hover sound effect (optional)
  navLinks.forEach(function(link) {
    link.addEventListener('mouseenter', function() {
      // You can add a subtle sound effect here if desired
      // const audio = new Audio('hover-sound.mp3');
      // audio.volume = 0.1;
      // audio.play();
    });
  });

  // Parallax effect for logo on scroll (subtle)
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const logo = document.querySelector('.logo-text');
    const parallax = scrolled * 0.1;
    
    if (scrolled < 200) {
      logo.style.transform = `translateY(${parallax}px)`;
    }
  });

  // Add loading animation
  window.addEventListener('load', function() {
    navbar.style.opacity = '0';
    navbar.style.transform = 'translateY(-100%)';
    
    setTimeout(function() {
      navbar.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      navbar.style.opacity = '1';
      navbar.style.transform = 'translateY(0)';
    }, 100);
  });
});