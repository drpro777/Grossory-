// Main application controller for Grossory E-commerce

class PageManager {
    constructor() {
        this.currentPage = 'home';
        this.pages = ['home', 'products', 'cart', 'contact', 'services', 'profile', 'settings'];
        this.isLoading = true;
        this.initializeApp();
    }

    async initializeApp() {
        // Show loading screen
        this.showLoadingScreen();

        // Initialize all managers
        await this.initializeManagers();

        // Initialize theme system
        this.initializeTheme();

        // Initialize translations
        if (window.initTranslations) {
            window.initTranslations();
        }

        // Initialize page navigation
        this.initializeNavigation();

        // Initialize contact map
        this.initializeContactMap();

        // Initialize checkout form
        this.initializeCheckoutForm();

        // Hide loading screen and show main website
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 3000); // 3 second loading animation
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainWebsite = document.getElementById('main-website');
        
        if (loadingScreen) loadingScreen.classList.remove('hidden');
        if (mainWebsite) mainWebsite.classList.add('hidden');
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainWebsite = document.getElementById('main-website');
        
        if (loadingScreen) {
            loadingScreen.classList.add('animate-fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (mainWebsite) {
                    mainWebsite.classList.remove('hidden');
                    mainWebsite.classList.add('animate-fade-in');
                }
                this.isLoading = false;
            }, 500);
        }
    }

    async initializeManagers() {
        // All managers are already initialized in their respective files
        // This is just a placeholder for any additional initialization
        console.log('Initializing Grossory E-commerce...');
        
        // Initialize EmailJS (placeholder)
        if (typeof emailjs !== 'undefined') {
            emailjs.init("your-emailjs-user-id"); // Replace with actual EmailJS user ID
        }
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('grossory_theme') || 'system';
        this.setTheme(savedTheme);

        // Theme switcher events
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-btn')) {
                this.cycleTheme();
            }
            
            const themeOption = e.target.closest('.theme-option');
            if (themeOption) {
                const theme = themeOption.dataset.theme;
                this.setTheme(theme);
                
                // Update active state
                document.querySelectorAll('.theme-option').forEach(option => {
                    option.classList.remove('active');
                });
                themeOption.classList.add('active');
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('grossory_theme', theme);
        
        // Update theme button icon
        const themeBtn = document.querySelector('.theme-btn i');
        if (themeBtn) {
            const icons = {
                light: 'fas fa-sun',
                dark: 'fas fa-moon',
                system: 'fas fa-desktop'
            };
            themeBtn.className = icons[theme] || icons.system;
        }

        // Update theme options active state
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });
    }

    cycleTheme() {
        const currentTheme = localStorage.getItem('grossory_theme') || 'system';
        const themes = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        this.setTheme(nextTheme);
    }

    initializeNavigation() {
        // Page navigation
        document.addEventListener('click', (e) => {
            const pageLink = e.target.closest('[data-page]');
            if (pageLink) {
                e.preventDefault();
                const page = pageLink.dataset.page;
                this.showPage(page);
            }
        });

        // Mobile menu toggle
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (hamburgerBtn && mobileMenu) {
            hamburgerBtn.addEventListener('click', () => {
                hamburgerBtn.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu && mobileMenu.classList.contains('active') && 
                !e.target.closest('.mobile-menu') && 
                !e.target.closest('.hamburger-btn')) {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // Bottom navigation
        document.addEventListener('click', (e) => {
            const bottomNavItem = e.target.closest('.bottom-nav-item');
            if (bottomNavItem) {
                const page = bottomNavItem.dataset.page;
                this.showPage(page);
                
                // Update active state
                document.querySelectorAll('.bottom-nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                bottomNavItem.classList.add('active');
            }
        });

        // Initialize with home page
        this.showPage('home');
    }

    showPage(pageName) {
        if (!this.pages.includes(pageName)) return;

        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.classList.add('animate-fade-in');
        }

        // Update navigation active states
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            }
        });

        // Update bottom navigation
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === pageName) {
                item.classList.add('active');
            }
        });

        // Close mobile menu
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (hamburgerBtn && mobileMenu) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }

        // Page-specific initialization
        this.handlePageSpecificLogic(pageName);
        
        this.currentPage = pageName;
    }

    handlePageSpecificLogic(pageName) {
        switch (pageName) {
            case 'products':
                // Ensure products are rendered
                if (window.productManager) {
                    const productsGrid = document.getElementById('products-grid');
                    if (productsGrid && !productsGrid.hasChildNodes()) {
                        window.productManager.renderProducts(productsGrid);
                    }
                }
                break;
                
            case 'cart':
                // Render cart items
                if (window.cartManager) {
                    window.cartManager.renderCart();
                }
                break;
                
            case 'profile':
                // Require authentication for profile page
                if (window.authManager) {
                    if (!window.authManager.isLoggedIn()) {
                        window.authManager.showNotification('Please log in to view your profile', 'warning');
                        window.authManager.openAuthModal('login');
                        this.showPage('home');
                        return;
                    }
                    window.authManager.updateProfilePage();
                }
                break;
                
            case 'contact':
                // Initialize contact map if not already done
                setTimeout(() => {
                    this.initializeContactMap();
                }, 100);
                break;
        }
    }

    initializeContactMap() {
        const mapContainer = document.getElementById('contact-map');
        if (!mapContainer || mapContainer.hasChildNodes()) return;

        // Initialize Leaflet map
        if (typeof L !== 'undefined') {
            const map = L.map('contact-map').setView([40.7128, -74.0060], 13); // New York coordinates

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            L.marker([40.7128, -74.0060]).addTo(map)
                .bindPopup('Grossory Headquarters<br>123 Business Street, New York')
                .openPopup();
        } else {
            // Fallback if Leaflet is not available
            mapContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666;">
                    <div style="text-align: center;">
                        <i class="fas fa-map-marker-alt fa-3x" style="margin-bottom: 1rem;"></i>
                        <p>123 Business Street<br>New York, NY 10001</p>
                    </div>
                </div>
            `;
        }
    }

    initializeCheckoutForm() {
        const checkoutForm = document.getElementById('checkout-form');
        if (!checkoutForm) return;

        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!window.cartManager || window.cartManager.items.length === 0) {
                window.cartManager?.showNotification('Your cart is empty!', 'warning');
                return;
            }

            const formData = new FormData(checkoutForm);
            const orderData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                city: formData.get('city'),
                zipCode: formData.get('zipCode'),
                paymentMethod: formData.get('paymentMethod')
            };

            // Validate required fields
            const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode'];
            const missingFields = requiredFields.filter(field => !orderData[field]);
            
            if (missingFields.length > 0) {
                window.cartManager?.showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Process the order
            if (window.cartManager) {
                window.cartManager.processOrder(orderData);
            }
        });
    }

    // Contact form submission
    initializeContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Validate form
            if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
                this.showNotification('Please fill in all fields', 'error');
                return;
            }

            // Send email (EmailJS simulation)
            try {
                // In a real implementation, you would use EmailJS here:
                await emailjs.send('service_id', 'template_id', contactData);
                
                console.log('Contact form submission:', contactData);
                
                this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('Error sending message:', error);
                this.showNotification('Failed to send message. Please try again.', 'error');
            }
        });
    }

    showNotification(message, type = 'success') {
        if (window.cartManager) {
            window.cartManager.showNotification(message, type);
        } else if (window.authManager) {
            window.authManager.showNotification(message, type);
        }
    }

    // Utility functions
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
    }

    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Performance monitoring
    measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${name} took ${end - start} milliseconds`);
        return result;
    }

    // Error handling
    handleError(error, context = 'Application') {
        console.error(`${context} Error:`, error);
        this.showNotification('An error occurred. Please try again.', 'error');
        
        // In production, you might want to send errors to a logging service
        if (window.firebaseManager) {
            window.firebaseManager.trackEvent('error', {
                error_message: error.message,
                error_context: context,
                timestamp: new Date().toISOString()
            });
        }
    }

    // Accessibility helpers
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Initialize accessibility features
    initializeAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content landmark
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.id = 'main-content';
            mainContent.setAttribute('role', 'main');
        }

        // Announce page changes to screen readers
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        document.body.appendChild(announcer);
        this.announcer = announcer;
    }

    announcePageChange(pageName) {
        if (this.announcer) {
            this.announcer.textContent = `Navigated to ${pageName} page`;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page manager
    window.pageManager = new PageManager();
    
    // Initialize contact form
    window.pageManager.initializeContactForm();
    
    // Initialize accessibility features
    window.pageManager.initializeAccessibility();
    
    // Global error handler
    window.addEventListener('error', (e) => {
        window.pageManager.handleError(e.error, 'Global');
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
        window.pageManager.handleError(e.reason, 'Promise');
    });
    
    console.log('Grossory E-commerce initialized successfully!');
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageManager;
} else if (typeof window !== 'undefined') {
    window.PageManager = PageManager;
}