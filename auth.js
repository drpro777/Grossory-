// Authentication system for Grossory E-commerce

class AuthManager {
    constructor() {
        this.currentUser = this.loadCurrentUser();
        this.initializeEvents();
        this.updateAuthUI();
    }

    loadCurrentUser() {
        const saved = localStorage.getItem('grossory_current_user');
        return saved ? JSON.parse(saved) : null;
    }

    saveCurrentUser(user) {
        localStorage.setItem('grossory_current_user', JSON.stringify(user));
        this.currentUser = user;
        this.updateAuthUI();
    }

    clearCurrentUser() {
        localStorage.removeItem('grossory_current_user');
        this.currentUser = null;
        this.updateAuthUI();
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    hashPassword(password) {
        // Simple hash function for demo (use proper hashing in production)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        // Password strength validation
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        let strength = 'weak';
        let score = 0;

        if (password.length >= minLength) score++;
        if (hasUpperCase) score++;
        if (hasLowerCase) score++;
        if (hasNumbers) score++;
        if (hasSpecialChar) score++;

        if (score >= 4) strength = 'strong';
        else if (score >= 2) strength = 'medium';

        return {
            isValid: password.length >= minLength,
            strength,
            score,
            requirements: {
                minLength: password.length >= minLength,
                hasUpperCase,
                hasLowerCase,
                hasNumbers,
                hasSpecialChar
            }
        };
    }

    updatePasswordStrength(password) {
        const validation = this.validatePassword(password);
        const strengthIndicator = document.getElementById('password-strength');
        const strengthText = document.getElementById('strength-text');
        
        if (strengthIndicator && strengthText) {
            const bars = strengthIndicator.querySelectorAll('.strength-bar');
            
            // Reset all bars
            bars.forEach(bar => {
                bar.classList.remove('active', 'weak', 'medium', 'strong');
            });

            // Activate bars based on score
            for (let i = 0; i < validation.score && i < bars.length; i++) {
                bars[i].classList.add('active', validation.strength);
            }

            // Update text
            strengthText.textContent = validation.strength.charAt(0).toUpperCase() + validation.strength.slice(1);
            strengthText.className = `strength-text ${validation.strength}`;
        }
    }

    async signup(userData) {
        try {
            // Validate input
            if (!this.validateEmail(userData.email)) {
                throw new Error('Please enter a valid email address');
            }

            const passwordValidation = this.validatePassword(userData.password);
            if (!passwordValidation.isValid) {
                throw new Error('Password must be at least 6 characters long');
            }

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('grossory_users') || '[]');
            const existingUser = users.find(user => user.email === userData.email);
            
            if (existingUser) {
                throw new Error('An account with this email already exists');
            }

            // Create new user
            const newUser = {
                id: this.generateUserId(),
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: this.hashPassword(userData.password),
                profilePhoto: userData.profilePhoto || null,
                phone: userData.phone || '',
                dateOfBirth: userData.dateOfBirth || '',
                addresses: [],
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                isActive: true
            };

            // Save user
            users.push(newUser);
            localStorage.setItem('grossory_users', JSON.stringify(users));

            // Create user session (exclude password)
            const userSession = { ...newUser };
            delete userSession.password;
            this.saveCurrentUser(userSession);

            // Send welcome email
            this.sendWelcomeEmail(newUser);

            this.showNotification('Account created successfully! Welcome to Grossory!', 'success');
            this.closeAuthModal();

            return { success: true, user: userSession };
        } catch (error) {
            this.showNotification(error.message, 'error');
            return { success: false, error: error.message };
        }
    }

    async login(credentials) {
        try {
            // Validate input
            if (!this.validateEmail(credentials.email)) {
                throw new Error('Please enter a valid email address');
            }

            if (!credentials.password) {
                throw new Error('Please enter your password');
            }

            // Find user
            const users = JSON.parse(localStorage.getItem('grossory_users') || '[]');
            const user = users.find(user => 
                user.email === credentials.email && 
                user.password === this.hashPassword(credentials.password)
            );

            if (!user) {
                throw new Error('Invalid email or password');
            }

            if (!user.isActive) {
                throw new Error('Your account has been deactivated. Please contact support.');
            }

            // Update last login
            user.lastLogin = new Date().toISOString();
            const userIndex = users.findIndex(u => u.id === user.id);
            users[userIndex] = user;
            localStorage.setItem('grossory_users', JSON.stringify(users));

            // Create user session (exclude password)
            const userSession = { ...user };
            delete userSession.password;
            this.saveCurrentUser(userSession);

            this.showNotification(`Welcome back, ${user.firstName}!`, 'success');
            this.closeAuthModal();

            return { success: true, user: userSession };
        } catch (error) {
            this.showNotification(error.message, 'error');
            return { success: false, error: error.message };
        }
    }

    logout() {
        this.clearCurrentUser();
        this.showNotification('You have been logged out successfully', 'info');
        
        // Redirect to home page
        if (window.pageManager) {
            window.pageManager.showPage('home');
        }
    }

    updateProfile(updates) {
        if (!this.currentUser) {
            throw new Error('No user logged in');
        }

        try {
            // Update current user
            const updatedUser = { ...this.currentUser, ...updates };
            
            // Update in users array
            const users = JSON.parse(localStorage.getItem('grossory_users') || '[]');
            const userIndex = users.findIndex(user => user.id === this.currentUser.id);
            
            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...updates };
                localStorage.setItem('grossory_users', JSON.stringify(users));
            }

            this.saveCurrentUser(updatedUser);
            this.showNotification('Profile updated successfully!', 'success');
            
            return { success: true, user: updatedUser };
        } catch (error) {
            this.showNotification('Failed to update profile', 'error');
            return { success: false, error: error.message };
        }
    }

    sendWelcomeEmail(user) {
        // Simulate EmailJS integration
        const emailData = {
            to_email: user.email,
            to_name: `${user.firstName} ${user.lastName}`,
            user_name: user.firstName,
            user_email: user.email,
            registration_date: new Date(user.createdAt).toLocaleDateString(),
            profile_data: JSON.stringify({
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                phone: user.phone,
                registrationDate: user.createdAt
            }, null, 2)
        };

        // In a real implementation, you would use EmailJS here:
        // emailjs.send('service_id', 'welcome_template_id', emailData)
        
        console.log('Welcome email would be sent:', emailData);
    }

    sendProfileUpdateEmail(user, updates) {
        // Simulate EmailJS integration for profile updates
        const emailData = {
            to_email: user.email,
            to_name: `${user.firstName} ${user.lastName}`,
            update_date: new Date().toLocaleDateString(),
            updated_fields: Object.keys(updates).join(', '),
            profile_data: JSON.stringify(user, null, 2)
        };

        console.log('Profile update email would be sent:', emailData);
    }

    updateAuthUI() {
        const authButtons = document.getElementById('auth-buttons');
        const userProfile = document.getElementById('user-profile');
        const headerUsername = document.getElementById('header-username');
        const headerProfilePic = document.getElementById('header-profile-pic');
        const bottomProfilePic = document.getElementById('bottom-profile-pic');

        if (this.currentUser) {
            // User is logged in
            if (authButtons) authButtons.classList.add('hidden');
            if (userProfile) userProfile.classList.remove('hidden');
            
            if (headerUsername) {
                headerUsername.textContent = this.currentUser.firstName;
            }
            
            const profilePicUrl = this.currentUser.profilePhoto || 'https://via.placeholder.com/40x40';
            if (headerProfilePic) headerProfilePic.src = profilePicUrl;
            if (bottomProfilePic) bottomProfilePic.src = profilePicUrl;

            // Update profile page
            this.updateProfilePage();
        } else {
            // User is not logged in
            if (authButtons) authButtons.classList.remove('hidden');
            if (userProfile) userProfile.classList.add('hidden');
        }
    }

    updateProfilePage() {
        if (!this.currentUser) return;

        const profileName = document.getElementById('profile-name');
        const profileEmail = document.getElementById('profile-email');
        const profileImage = document.getElementById('profile-image');
        const profileMemberSince = document.getElementById('profile-member-since');

        if (profileName) profileName.textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
        if (profileEmail) profileEmail.textContent = this.currentUser.email;
        if (profileImage) profileImage.src = this.currentUser.profilePhoto || 'https://via.placeholder.com/120x120';
        if (profileMemberSince) {
            const memberSince = new Date(this.currentUser.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
            });
            profileMemberSince.textContent = `Member since: ${memberSince}`;
        }

        // Update form fields
        const form = document.getElementById('profile-form');
        if (form) {
            form.firstName.value = this.currentUser.firstName || '';
            form.lastName.value = this.currentUser.lastName || '';
            form.email.value = this.currentUser.email || '';
            form.phone.value = this.currentUser.phone || '';
            form.dateOfBirth.value = this.currentUser.dateOfBirth || '';
        }

        // Load user orders
        this.loadUserOrders();
    }

    loadUserOrders() {
        if (!this.currentUser) return;

        const ordersList = document.getElementById('orders-list');
        if (!ordersList) return;

        const userOrders = JSON.parse(localStorage.getItem(`grossory_user_orders_${this.currentUser.email}`) || '[]');
        
        if (userOrders.length === 0) {
            ordersList.innerHTML = `
                <div class="no-orders">
                    <i class="fas fa-shopping-bag fa-3x"></i>
                    <h3>No orders yet</h3>
                    <p>Start shopping to see your orders here!</p>
                    <button class="btn btn-primary" data-page="products">Start Shopping</button>
                </div>
            `;
            return;
        }

        ordersList.innerHTML = userOrders.map(order => `
            <div class="order-item">
                <div class="order-header">
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
                </div>
                <div class="order-details">
                    <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                    <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                    <p><strong>Items:</strong> ${order.items.length} item(s)</p>
                    <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item-detail">
                            <span>${item.name} (${item.color}, ${item.size}) x${item.quantity}</span>
                            <span>$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type} animate-slide-in-right`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        notification.innerHTML = `
            <div class="notification-icon">
                <i class="${icons[type]}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        const container = document.getElementById('notifications');
        if (container) {
            container.appendChild(notification);

            // Auto remove after 4 seconds
            setTimeout(() => {
                notification.classList.add('animate-slide-out-to-top');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 4000);

            // Manual close
            notification.querySelector('.notification-close').addEventListener('click', () => {
                notification.classList.add('animate-slide-out-to-top');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            });
        }
    }

    openAuthModal(type = 'login') {
        const loginModal = document.getElementById('login-modal');
        const signupModal = document.getElementById('signup-modal');

        if (type === 'login') {
            loginModal.classList.add('active');
        } else {
            signupModal.classList.add('active');
        }
        
        document.body.style.overflow = 'hidden';
    }

    closeAuthModal() {
        const modals = ['login-modal', 'signup-modal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
            }
        });
        document.body.style.overflow = 'auto';
    }

    initializeEvents() {
        // Auth button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('#login-btn')) {
                this.openAuthModal('login');
            } else if (e.target.closest('#signup-btn')) {
                this.openAuthModal('signup');
            } else if (e.target.closest('#logout-btn')) {
                this.logout();
            }
        });

        // Modal switching
        document.addEventListener('click', (e) => {
            const switchBtn = e.target.closest('.auth-switch-btn');
            if (switchBtn) {
                const targetModal = switchBtn.dataset.modal;
                this.closeAuthModal();
                setTimeout(() => this.openAuthModal(targetModal), 100);
            }
        });

        // Close modals
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') || e.target.closest('.modal-close')) {
                this.closeAuthModal();
            }
        });

        // Form submissions
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const profileForm = document.getElementById('profile-form');

        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(loginForm);
                const credentials = {
                    email: formData.get('email'),
                    password: formData.get('password')
                };
                await this.login(credentials);
            });
        }

        if (signupForm) {
            signupForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(signupForm);
                
                // Handle profile photo
                let profilePhoto = null;
                const photoFile = formData.get('profilePhoto');
                if (photoFile && photoFile.size > 0) {
                    profilePhoto = await this.convertFileToBase64(photoFile);
                }

                const userData = {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    profilePhoto
                };
                
                await this.signup(userData);
            });

            // Password strength indicator
            const passwordInput = signupForm.querySelector('input[name="password"]');
            if (passwordInput) {
                passwordInput.addEventListener('input', (e) => {
                    this.updatePasswordStrength(e.target.value);
                });
            }

            // Profile photo preview
            const photoInput = signupForm.querySelector('#profile-photo');
            if (photoInput) {
                photoInput.addEventListener('change', (e) => {
                    this.previewProfilePhoto(e.target.files[0], 'file-preview');
                });
            }
        }

        if (profileForm) {
            profileForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(profileForm);
                
                const updates = {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    dateOfBirth: formData.get('dateOfBirth')
                };

                const result = this.updateProfile(updates);
                if (result.success) {
                    this.sendProfileUpdateEmail(result.user, updates);
                }
            });
        }

        // Profile photo change
        document.addEventListener('click', (e) => {
            if (e.target.closest('#change-photo-btn')) {
                document.getElementById('photo-input').click();
            }
        });

        const photoInput = document.getElementById('photo-input');
        if (photoInput) {
            photoInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    const base64 = await this.convertFileToBase64(file);
                    const result = this.updateProfile({ profilePhoto: base64 });
                    if (result.success) {
                        document.getElementById('profile-image').src = base64;
                    }
                }
            });
        }

        // Profile tabs
        document.addEventListener('click', (e) => {
            const tabBtn = e.target.closest('.tab-btn');
            if (tabBtn) {
                const tabName = tabBtn.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                tabBtn.classList.add('active');
                
                // Show corresponding panel
                document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
                document.getElementById(`${tabName}-tab`).classList.add('active');
                
                // Load data for specific tabs
                if (tabName === 'orders') {
                    this.loadUserOrders();
                }
            }
        });

        // ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAuthModal();
            }
        });
    }

    async convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    previewProfilePhoto(file, containerId) {
        if (!file) return;

        const container = document.getElementById(containerId);
        if (!container) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            container.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
        };
        reader.readAsDataURL(file);
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Require authentication for certain actions
    requireAuth(callback) {
        if (this.isLoggedIn()) {
            callback();
        } else {
            this.showNotification('Please log in to continue', 'warning');
            this.openAuthModal('login');
        }
    }
}

// Initialize AuthManager
const authManager = new AuthManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
} else if (typeof window !== 'undefined') {
    window.AuthManager = AuthManager;
    window.authManager = authManager;
}