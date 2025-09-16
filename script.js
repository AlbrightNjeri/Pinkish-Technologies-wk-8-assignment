// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const ctaButton = document.querySelector('.cta-button');

// Page navigation function
function showPage(targetPage) {
    // Remove active class from all pages and nav links
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to target page and corresponding nav link
    document.getElementById(targetPage).classList.add('active');
    document.querySelector(`[data-page="${targetPage}"]`).classList.add('active');
    
    // Close mobile menu after navigation
    navMenu.classList.remove('active');
    
    // Add page transition animation
    const activePage = document.getElementById(targetPage);
    activePage.style.opacity = '0';
    activePage.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        activePage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        activePage.style.opacity = '1';
        activePage.style.transform = 'translateY(0)';
    }, 50);
}

// Add click events to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');
        showPage(targetPage);
    });
});

// CTA button functionality
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('contact');
    });
}

// Mobile menu toggle functionality
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'rotate(0) translate(0, 0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translate(0, 0)';
    }
});

// Image slider functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const slider = document.getElementById('slider');

// Update slider display
function updateSlider() {
    if (slider) {
        slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    }
}

// Change slide function
function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    updateSlider();
}

// Go to specific slide
function currentSlide(n) {
    currentSlideIndex = n - 1;
    updateSlider();
}

// Auto-advance slider every 5 seconds
setInterval(() => {
    if (slides.length > 0) {
        changeSlide(1);
    }
}, 5000);

// Form validation functionality
const contactForm = document.getElementById('contact-form');
const formFields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
};

// Validation helper function
function validateField(field, errorId, validationFn) {
    if (!field) return true;
    
    const errorElement = document.getElementById(errorId);
    const isValid = validationFn(field.value);
    
    if (isValid) {
        field.classList.remove('error');
        if (errorElement) errorElement.style.display = 'none';
    } else {
        field.classList.add('error');
        if (errorElement) errorElement.style.display = 'block';
    }
    
    return isValid;
}

// Email validation regex
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Real-time validation events
if (formFields.name) {
    formFields.name.addEventListener('blur', () => {
        validateField(formFields.name, 'name-error', (value) => value.trim().length >= 2);
    });

    formFields.name.addEventListener('input', () => {
        if (formFields.name.classList.contains('error')) {
            validateField(formFields.name, 'name-error', (value) => value.trim().length >= 2);
        }
    });
}

if (formFields.email) {
    formFields.email.addEventListener('blur', () => {
        validateField(formFields.email, 'email-error', validateEmail);
    });

    formFields.email.addEventListener('input', () => {
        if (formFields.email.classList.contains('error')) {
            validateField(formFields.email, 'email-error', validateEmail);
        }
    });
}

if (formFields.subject) {
    formFields.subject.addEventListener('blur', () => {
        validateField(formFields.subject, 'subject-error', (value) => value.trim().length >= 3);
    });

    formFields.subject.addEventListener('input', () => {
        if (formFields.subject.classList.contains('error')) {
            validateField(formFields.subject, 'subject-error', (value) => value.trim().length >= 3);
        }
    });
}

if (formFields.message) {
    formFields.message.addEventListener('blur', () => {
        validateField(formFields.message, 'message-error', (value) => value.trim().length >= 10);
    });

    formFields.message.addEventListener('input', () => {
        if (formFields.message.classList.contains('error')) {
            validateField(formFields.message, 'message-error', (value) => value.trim().length >= 10);
        }
    });
}

// Form submission handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        const validations = [
            validateField(formFields.name, 'name-error', (value) => value.trim().length >= 2),
            validateField(formFields.email, 'email-error', validateEmail),
            validateField(formFields.subject, 'subject-error', (value) => value.trim().length >= 3),
            validateField(formFields.message, 'message-error', (value) => value.trim().length >= 10)
        ];
        
        const isFormValid = validations.every(validation => validation);
        
        if (isFormValid) {
            // Show success message
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.style.display = 'block';
                
                // Add animation to success message
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 100);
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 500);
                }, 5000);
            }
        } else {
            // Scroll to first error field
            const firstErrorField = document.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// Enhanced user experience features
document.addEventListener('DOMContentLoaded', () => {
    // Page loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add scroll animations to service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards for scroll animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Enhanced responsive behavior
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0) translate(0, 0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translate(0, 0)';
    }
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0) translate(0, 0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translate(0, 0)';
    }
    
    // Navigate slider with arrow keys
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Enhanced hover effects for interactive elements
const interactiveElements = document.querySelectorAll('.service-card, .contact-item, .cta-button, .submit-btn');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = this.style.transform.replace('scale(1)', 'scale(1.02)') || 'scale(1.02)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = this.style.transform.replace('scale(1.02)', 'scale(1)');
    });
});

// Smooth scrolling for internal links
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for form submission
if (contactForm) {
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', () => {
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// Performance optimization: Lazy load images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));