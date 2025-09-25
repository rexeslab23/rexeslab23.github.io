'use strict';

// ==========================================================================
// HIMEL PAUL - PORTFOLIO JAVASCRIPT
// Professional JavaScript Architecture
// ==========================================================================

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  initializePortfolio();
});

// Initialize all portfolio functionality
function initializePortfolio() {
  initMobileNavigation();
  initSmoothScrolling();
  initActiveNavigation();
  initAnimationOnScroll();
  initButtonInteractions();
}

// ==========================================================================
// MOBILE NAVIGATION
// ==========================================================================

function initMobileNavigation() {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navList = document.querySelector('.navbar-list');
  const navLinks = document.querySelectorAll('.navbar-link');
  
  if (!navToggle || !navList) return;
  
  // Toggle mobile navigation
  navToggle.addEventListener('click', function() {
    navList.classList.toggle('active');
    
    // Update aria-expanded for accessibility
    const isExpanded = navList.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
    
    // Change icon
    const icon = navToggle.querySelector('ion-icon');
    if (icon) {
      icon.name = isExpanded ? 'close-outline' : 'menu-outline';
    }
  });
  
  // Close mobile nav when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navList.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      
      const icon = navToggle.querySelector('ion-icon');
      if (icon) {
        icon.name = 'menu-outline';
      }
    });
  });
  
  // Close mobile nav when clicking outside
  document.addEventListener('click', function(e) {
    if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      
      const icon = navToggle.querySelector('ion-icon');
      if (icon) {
        icon.name = 'menu-outline';
      }
    }
  });
}

// ==========================================================================
// SMOOTH SCROLLING
// ==========================================================================

function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.navbar-link[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==========================================================================
// ACTIVE NAVIGATION
// ==========================================================================

function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-link[href^="#"]');
  
  function updateActiveNavigation() {
    const scrollY = window.pageYOffset;
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Throttle scroll event for performance
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        updateActiveNavigation();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initial call
  updateActiveNavigation();
}

// ==========================================================================
// ANIMATION ON SCROLL
// ==========================================================================

function initAnimationOnScroll() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.education-item, .about-left, .about-right');
  animateElements.forEach(el => {
    observer.observe(el);
  });
}

// ==========================================================================
// BUTTON INTERACTIONS
// ==========================================================================

function initButtonInteractions() {
  // Clean button interactions without conflicting download handlers
  // Download is now handled by onclick in HTML
}

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    font-family: var(--font-family-primary);
    font-size: 14px;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  requestAnimationFrame(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  });
  
  // Remove after delay
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Debounce function for performance
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

// ==========================================================================
// LEGACY COMPATIBILITY FUNCTIONS
// ==========================================================================

const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}

// ==========================================================================
// TESTIMONIALS MODAL SYSTEM
// ==========================================================================

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer?.classList.toggle("active");
  overlay?.classList.toggle("active");
}

// Initialize testimonials modal
testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");
    
    if (modalImg && avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
    if (modalText && text) modalText.innerHTML = text.innerHTML;

    testimonialsModalFunc();
  });
});

modalCloseBtn?.addEventListener("click", testimonialsModalFunc);
overlay?.addEventListener("click", testimonialsModalFunc);

// ==========================================================================
// PROJECT FILTERING SYSTEM
// ==========================================================================

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
  
  // Scroll to projects section after filtering
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    projectsSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    filterFunc(selectedValue);

    if (lastClickedBtn) {
      lastClickedBtn.classList.remove("active");
    }
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// ==========================================================================
// CONTACT FORM VALIDATION
// ==========================================================================

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// ==========================================================================
// NAVIGATION SYSTEM
// ==========================================================================

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
navigationLinks.forEach(navLink => {
  navLink.addEventListener("click", function (e) {
    e.preventDefault();
    
    // Remove 'active' from all nav links
    navigationLinks.forEach(link => link.classList.remove("active"));
    
    // Add 'active' to clicked link
    this.classList.add("active");
    
    // Get target section
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      // Smooth scroll to section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Handle scroll-based navigation highlighting
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[data-page]');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      // Remove active from all links
      navigationLinks.forEach(link => link.classList.remove("active"));
      
      // Add active to current section link
      const activeLink = document.querySelector(`[data-nav-link][href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
});

// Enhanced form input styling
document.addEventListener('DOMContentLoaded', function() {
  const formInputs = document.querySelectorAll('.form-input');
  
  formInputs.forEach(input => {
    // Check initial state
    checkInputValue(input);
    
    // Add event listeners
    input.addEventListener('input', function() {
      checkInputValue(this);
    });
    
    input.addEventListener('blur', function() {
      checkInputValue(this);
    });
  });
  
  function checkInputValue(input) {
    if (input.value.trim() !== '') {
      input.classList.add('filled');
    } else {
      input.classList.remove('filled');
    }
  }
});

// ==========================================================================
// RESUME DOWNLOAD FUNCTIONALITY
// ==========================================================================

function downloadResume() {
  // Create a direct download link
  const link = document.createElement('a');
  link.href = './assets/Himel_Resume.pdf';
  link.download = 'Himel_Resume.pdf';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
