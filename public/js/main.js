// Main JavaScript functionality for Tatra Tours website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initLazyLoading();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Scroll effects for navbar
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow to navbar when scrolling
        if (scrollTop > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Lazy loading for images (placeholder implementation)
function initLazyLoading() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder, .hero-placeholder');
    
    // Add loading animation to placeholders
    imagePlaceholders.forEach(placeholder => {
        placeholder.style.position = 'relative';
        placeholder.style.overflow = 'hidden';
        
        // Add shimmer effect
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: shimmer 2s infinite;
        `;
        placeholder.appendChild(shimmer);
    });
    
    // Add shimmer animation to CSS if not already present
    if (!document.querySelector('#shimmer-style')) {
        const style = document.createElement('style');
        style.id = 'shimmer-style';
        style.textContent = `
            @keyframes shimmer {
                0% { left: -100%; }
                100% { left: 100%; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Smooth scrolling animations
function initAnimations() {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .value-item,
        .feature-card,
        .tour-card,
        .testimonial-card,
        .info-card
    `);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animationStyle);
}

// Smooth scroll to anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target);
    });
});

// Form validation utilities
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 1000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Add slide in animation
    if (!document.querySelector('#notification-style')) {
        const style = document.createElement('style');
        style.id = 'notification-style';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
        `;
        document.head.appendChild(style);
    }
}

// Utility function to format currency
function formatCurrency(amount, currency = 'USD') {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    return formatter.format(amount);
}

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Loading state management
function showLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
    
    if (btnText && btnLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
    }
    
    button.disabled = true;
    button.style.opacity = '0.7';
}

function hideLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
    
    if (btnText && btnLoading) {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
    
    button.disabled = false;
    button.style.opacity = '1';
}

// Contact form handling (if contact form exists)
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        try {
            showLoading(submitBtn);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            hideLoading(submitBtn);
        }
    });
}

// Initialize contact form if present
document.addEventListener('DOMContentLoaded', initContactForm);

// Resize handler for responsive adjustments
window.addEventListener('resize', function() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll-heavy functions
if (typeof initScrollEffects === 'function') {
    window.addEventListener('scroll', debounce(function() {
        // Debounced scroll operations can be added here
    }, 10));
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Close any open modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display !== 'none') {
                modal.style.display = 'none';
            }
        });
    }
});

// Print optimization
window.addEventListener('beforeprint', function() {
    // Hide interactive elements before printing
    const interactiveElements = document.querySelectorAll('.btn, .nav-toggle, .modal');
    interactiveElements.forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    // Restore interactive elements after printing
    const interactiveElements = document.querySelectorAll('.btn, .nav-toggle');
    interactiveElements.forEach(el => {
        el.style.display = '';
    });
});

// Export utilities for use in other scripts
if (typeof window !== 'undefined') {
    window.TatraTours = {
        validateEmail,
        validatePhone,
        showNotification,
        formatCurrency,
        formatDate,
        showLoading,
        hideLoading,
        smoothScroll
    };
}