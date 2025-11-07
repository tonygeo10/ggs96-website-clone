/**
 * GGS96 Website - Main JavaScript
 * Modern, accessible, and interactive features
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeMobileNav();
    initializeSmoothScroll();
    initializeActiveNav();
    initializeBackToTop();
    initializeSearch();
    initializeFormValidation();
    initializeNewsletterForm();
    updateCopyrightYear();
    addAccessibilityFeatures();
});

/**
 * Dark Mode Toggle with localStorage persistence
 */
function initializeTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    
    // Create theme toggle button if it doesn't exist
    const header = document.querySelector('.header-content');
    if (header && !document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        
        const nav = document.querySelector('.main-nav');
        if (nav) {
            nav.appendChild(themeToggle);
        }
        
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    }
}

/**
 * Mobile Navigation Toggle
 */
function initializeMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Update ARIA attribute
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Ignore if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Active Navigation Highlighting
 */
function initializeActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Back to Top Button
 */
function initializeBackToTop() {
    // Create back to top button if it doesn't exist
    let backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTop);
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Search Functionality for Blog Posts
 */
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(event) {
            const searchTerm = event.target.value.toLowerCase();
            const posts = document.querySelectorAll('.post-card');
            
            posts.forEach(post => {
                const title = post.querySelector('h3')?.textContent.toLowerCase() || '';
                const content = post.querySelector('p')?.textContent.toLowerCase() || '';
                const category = post.querySelector('.post-category')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
                    post.style.display = '';
                    post.style.animation = 'fadeIn 0.3s ease-out';
                } else {
                    post.style.display = 'none';
                }
            });
            
            // Show "no results" message if needed
            const visiblePosts = Array.from(posts).filter(post => post.style.display !== 'none');
            let noResults = document.querySelector('.no-results');
            
            if (visiblePosts.length === 0 && searchTerm !== '') {
                if (!noResults) {
                    noResults = document.createElement('p');
                    noResults.className = 'no-results';
                    noResults.textContent = 'No posts found matching your search.';
                    noResults.style.textAlign = 'center';
                    noResults.style.padding = '2rem';
                    noResults.style.color = 'var(--text-muted)';
                    document.querySelector('.posts-grid')?.appendChild(noResults);
                }
            } else if (noResults) {
                noResults.remove();
            }
        });
    }
}

/**
 * Form Validation
 */
function initializeFormValidation() {
    const forms = document.querySelectorAll('form[data-validate="true"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Clear previous errors
            form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            
            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                const formGroup = field.closest('.form-group');
                
                if (!field.value.trim()) {
                    isValid = false;
                    if (formGroup) {
                        formGroup.classList.add('error');
                        let errorMsg = formGroup.querySelector('.form-error');
                        if (!errorMsg) {
                            errorMsg = document.createElement('span');
                            errorMsg.className = 'form-error';
                            formGroup.appendChild(errorMsg);
                        }
                        errorMsg.textContent = 'This field is required';
                    }
                }
            });
            
            // Validate email fields
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                const formGroup = field.closest('.form-group');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (field.value && !emailRegex.test(field.value)) {
                    isValid = false;
                    if (formGroup) {
                        formGroup.classList.add('error');
                        let errorMsg = formGroup.querySelector('.form-error');
                        if (!errorMsg) {
                            errorMsg = document.createElement('span');
                            errorMsg.className = 'form-error';
                            formGroup.appendChild(errorMsg);
                        }
                        errorMsg.textContent = 'Please enter a valid email address';
                    }
                }
            });
            
            if (!isValid) {
                event.preventDefault();
                
                // Focus on first error
                const firstError = form.querySelector('.form-group.error input, .form-group.error textarea');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                const formGroup = this.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.remove('error');
                }
            });
        });
    });
}

/**
 * Newsletter Form Submission
 */
function initializeNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const button = form.querySelector('button');
            const originalText = button.textContent;
            
            if (emailInput && emailInput.value) {
                // Simulate submission
                button.disabled = true;
                button.innerHTML = '<span class="loading"></span>';
                
                setTimeout(() => {
                    button.textContent = '✓ Subscribed!';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    });
}

/**
 * Update Copyright Year Dynamically
 */
function updateCopyrightYear() {
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
        element.textContent = element.textContent.replace(/\d{4}/, currentYear);
    });
}

/**
 * Accessibility Improvements
 */
function addAccessibilityFeatures() {
    // Add skip to main content link if it doesn't exist
    if (!document.querySelector('.skip-to-main')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-to-main';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // Add main id if it doesn't exist
    const mainContent = document.querySelector('.main-content');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
    
    // Ensure all images have alt text
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
        img.setAttribute('alt', 'Image');
        console.warn('Image missing alt text:', img.src);
    });
    
    // Add ARIA labels to social links without them
    const socialLinks = document.querySelectorAll('.social-links a:not([aria-label])');
    socialLinks.forEach(link => {
        const text = link.textContent.trim();
        if (text) {
            link.setAttribute('aria-label', text);
        }
    });
    
    // Keyboard navigation for cards
    const cards = document.querySelectorAll('.post-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const link = card.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });
}

/**
 * Blog Filter Functionality
 */
function initializeBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const posts = document.querySelectorAll('.post-card');
            
            posts.forEach(post => {
                if (filter === 'all' || post.dataset.category === filter) {
                    post.style.display = '';
                    post.style.animation = 'fadeIn 0.3s ease-out';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
}

// Initialize blog filters if on blog page
if (document.querySelector('.blog-filters')) {
    initializeBlogFilters();
}

/**
 * Intersection Observer for Fade-in Animations
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in effect
document.querySelectorAll('.widget, .footer-section').forEach(element => {
    observer.observe(element);
});
