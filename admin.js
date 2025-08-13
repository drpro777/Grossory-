// Admin panel management for Grossory E-commerce

class AdminManager {
    constructor() {
        this.isLoggedIn = false;
        this.adminCredentials = {
            username: 'admin',
            password: 'admin123' // In production, use proper authentication
        };
        this.initializeEvents();
    }

    login(credentials) {
        if (credentials.username === this.adminCredentials.username && 
            credentials.password === this.adminCredentials.password) {
            this.isLoggedIn = true;
            this.showAdminPanel();
            this.loadDashboardData();
            return true;
        }
        return false;
    }

    logout() {
        this.isLoggedIn = false;
        this.hideAdminPanel();
    }

    showAdminPanel() {
        const adminLogin = document.getElementById('admin-login');
        const adminPanel = document.getElementById('admin-panel');
        
        if (adminLogin) adminLogin.classList.add('hidden');
        if (adminPanel) adminPanel.classList.remove('hidden');
    }

    hideAdminPanel() {
        const adminLogin = document.getElementById('admin-login');
        const adminPanel = document.getElementById('admin-panel');
        
        if (adminLogin) adminLogin.classList.remove('hidden');
        if (adminPanel) adminPanel.classList.add('hidden');
    }

    openAdminModal() {
        const modal = document.getElementById('admin-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeAdminModal() {
        const modal = document.getElementById('admin-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        this.logout(); // Reset admin state when closing
    }

    loadDashboardData() {
        // Load statistics
        const users = JSON.parse(localStorage.getItem('grossory_users') || '[]');
        const products = JSON.parse(localStorage.getItem('grossory_products') || '[]');
        const orders = JSON.parse(localStorage.getItem('grossory_orders') || '[]');
        
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

        // Update dashboard stats
        document.getElementById('total-users').textContent = users.length;
        document.getElementById('total-products').textContent = products.length;
        document.getElementById('total-orders').textContent = orders.length;
        document.getElementById('total-revenue').textContent = `$${totalRevenue.toFixed(2)}`;

        // Load initial tab data
        this.loadProductsTable();
        this.loadUsersTable();
        this.loadOrdersTable();
    }

    loadProductsTable() {
        const products = JSON.parse(localStorage.getItem('grossory_products') || '[]');
        const tbody = document.querySelector('#products-table tbody');
        
        if (!tbody) return;

        tbody.innerHTML = products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${product.images[0]}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                        ${product.name}
                    </div>
                </td>
                <td><span class="category-badge">${product.category}</span></td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <span class="stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                        ${product.stock}
                    </span>
                </td>
                <td>
                    <div class="admin-actions">
                        <button class="btn btn-sm btn-secondary edit-product" data-id="${product.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger delete-product" data-id="${product.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    loadUsersTable() {
        const users = JSON.parse(localStorage.getItem('grossory_users') || '[]');
        const tbody = document.querySelector('#users-table tbody');
        
        if (!tbody) return;

        tbody.innerHTML = users.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${user.profilePhoto || 'https://via.placeholder.com/32x32'}" alt="${user.firstName}" style="width: 32px; height: 32px; object-fit: cover; border-radius: 50%;">
                        ${user.firstName} ${user.lastName}
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td>${new Date(user.lastLogin).toLocaleDateString()}</td>
                <td>
                    <div class="admin-actions">
                        <button class="btn btn-sm btn-secondary view-user" data-id="${user.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm ${user.isActive ? 'btn-warning deactivate-user' : 'btn-success activate-user'}" data-id="${user.id}">
                            <i class="fas fa-${user.isActive ? 'ban' : 'check'}"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    loadOrdersTable() {
        const orders = JSON.parse(localStorage.getItem('grossory_orders') || '[]');
        const tbody = document.querySelector('#orders-table tbody');
        
        if (!tbody) return;

        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.customerInfo.firstName} ${order.customerInfo.lastName}</td>
                <td>${new Date(order.date).toLocaleDateString()}</td>
                <td>$${order.total.toFixed(2)}</td>
                <td>
                    <select class="order-status-select" data-order-id="${order.id}">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <div class="admin-actions">
                        <button class="btn btn-sm btn-secondary view-order" data-id="${order.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-primary print-order" data-id="${order.id}">
                            <i class="fas fa-print"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    addProduct(productData) {
        const products = JSON.parse(localStorage.getItem('grossory_products') || '[]');
        
        const newProduct = {
            id: Math.max(...products.map(p => p.id), 0) + 1,
            name: productData.name,
            description: productData.description,
            price: parseFloat(productData.price),
            originalPrice: parseFloat(productData.price) * 1.1, // 10% markup for original price
            category: productData.category,
            brand: productData.brand,
            images: productData.images || ['https://via.placeholder.com/300x300'],
            colors: [{ name: 'Default', value: '#000000' }],
            sizes: ['Default'],
            stock: parseInt(productData.stock),
            rating: 0,
            reviewCount: 0,
            inStock: parseInt(productData.stock) > 0
        };

        products.push(newProduct);
        localStorage.setItem('grossory_products', JSON.stringify(products));
        
        // Update product manager if available
        if (window.productManager) {
            window.productManager.products = products;
            const productsGrid = document.getElementById('products-grid');
            if (productsGrid) {
                window.productManager.renderProducts(productsGrid);
            }
        }

        this.loadProductsTable();
        this.loadDashboardData();
        this.showNotification('Product added successfully!', 'success');
    }

    deleteProduct(productId) {
        if (!confirm('Are you sure you want to delete this product?')) return;

        const products = JSON.parse(localStorage.getItem('grossory_products') || '[]');
        const filteredProducts = products.filter(p => p.id !== parseInt(productId));
        
        localStorage.setItem('grossory_products', JSON.stringify(filteredProducts));
        
        // Update product manager if available
        if (window.productManager) {
            window.productManager.products = filteredProducts;
            const productsGrid = document.getElementById('products-grid');
            if (productsGrid) {
                window.productManager.renderProducts(productsGrid);
            }
        }

        this.loadProductsTable();
        this.loadDashboardData();
        this.showNotification('Product deleted successfully!', 'success');
    }

    updateOrderStatus(orderId, newStatus) {
        const orders = JSON.parse(localStorage.getItem('grossory_orders') || '[]');
        const orderIndex = orders.findIndex(order => order.id === orderId);
        
        if (orderIndex !== -1) {
            orders[orderIndex].status = newStatus;
            localStorage.setItem('grossory_orders', JSON.stringify(orders));
            
            // Update user's order history
            const order = orders[orderIndex];
            const userOrders = JSON.parse(localStorage.getItem(`grossory_user_orders_${order.customerInfo.email}`) || '[]');
            const userOrderIndex = userOrders.findIndex(o => o.id === orderId);
            
            if (userOrderIndex !== -1) {
                userOrders[userOrderIndex].status = newStatus;
                localStorage.setItem(`grossory_user_orders_${order.customerInfo.email}`, JSON.stringify(userOrders));
            }

            this.showNotification(`Order ${orderId} status updated to ${newStatus}`, 'success');
            
            // Send status update email (simulation)
            this.sendOrderStatusEmail(order, newStatus);
        }
    }

    toggleUserStatus(userId) {
        const users = JSON.parse(localStorage.getItem('grossory_users') || '[]');
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex !== -1) {
            users[userIndex].isActive = !users[userIndex].isActive;
            localStorage.setItem('grossory_users', JSON.stringify(users));
            
            const status = users[userIndex].isActive ? 'activated' : 'deactivated';
            this.showNotification(`User ${status} successfully!`, 'success');
            this.loadUsersTable();
        }
    }

    viewOrderDetails(orderId) {
        const orders = JSON.parse(localStorage.getItem('grossory_orders') || '[]');
        const order = orders.find(o => o.id === orderId);
        
        if (!order) return;

        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close"><i class="fas fa-times"></i></button>
                <div class="order-details-modal">
                    <h2>Order Details - ${order.id}</h2>
                    
                    <div class="order-info-grid">
                        <div class="order-section">
                            <h3>Customer Information</h3>
                            <p><strong>Name:</strong> ${order.customerInfo.firstName} ${order.customerInfo.lastName}</p>
                            <p><strong>Email:</strong> ${order.customerInfo.email}</p>
                            <p><strong>Phone:</strong> ${order.customerInfo.phone}</p>
                            <p><strong>Address:</strong> ${order.customerInfo.address}, ${order.customerInfo.city}, ${order.customerInfo.zipCode}</p>
                        </div>
                        
                        <div class="order-section">
                            <h3>Order Information</h3>
                            <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleString()}</p>
                            <p><strong>Status:</strong> <span class="order-status ${order.status}">${order.status}</span></p>
                            <p><strong>Payment Method:</strong> ${order.customerInfo.paymentMethod}</p>
                            <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <div class="order-section">
                        <h3>Order Items</h3>
                        <div class="order-items-list">
                            ${order.items.map(item => `
                                <div class="order-item-row">
                                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                                    <div class="item-details">
                                        <h4>${item.name}</h4>
                                        <p>Color: ${item.color}, Size: ${item.size}</p>
                                        <p>Quantity: ${item.quantity}</p>
                                    </div>
                                    <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="order-section">
                        <h3>Order Summary</h3>
                        <div class="order-totals">
                            <div class="total-row">
                                <span>Subtotal:</span>
                                <span>$${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div class="total-row">
                                <span>Shipping:</span>
                                <span>$${order.shipping.toFixed(2)}</span>
                            </div>
                            <div class="total-row total">
                                <span>Total:</span>
                                <span>$${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal event
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    sendOrderStatusEmail(order, newStatus) {
        // Simulate EmailJS integration for order status updates
        const emailData = {
            to_email: order.customerInfo.email,
            to_name: `${order.customerInfo.firstName} ${order.customerInfo.lastName}`,
            order_id: order.id,
            order_status: newStatus,
            update_date: new Date().toLocaleDateString()
        };

        console.log('Order status email would be sent:', emailData);
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

            setTimeout(() => {
                notification.classList.add('animate-slide-out-to-top');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 4000);

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

    initializeEvents() {
        // Admin access button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#admin-access-btn')) {
                this.openAdminModal();
            }
        });

        // Admin login form
        const adminLoginForm = document.getElementById('admin-login-form');
        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(adminLoginForm);
                const credentials = {
                    username: formData.get('username'),
                    password: formData.get('password')
                };
                
                if (this.login(credentials)) {
                    this.showNotification('Admin login successful!', 'success');
                } else {
                    this.showNotification('Invalid admin credentials!', 'error');
                }
            });
        }

        // Admin tabs
        document.addEventListener('click', (e) => {
            const adminTabBtn = e.target.closest('.admin-tab-btn');
            if (adminTabBtn) {
                const tabName = adminTabBtn.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
                adminTabBtn.classList.add('active');
                
                // Show corresponding panel
                document.querySelectorAll('.admin-tab-panel').forEach(panel => panel.classList.remove('active'));
                document.getElementById(`${tabName}-tab`).classList.add('active');
                
                // Load data for specific tabs
                if (tabName === 'products') {
                    this.loadProductsTable();
                } else if (tabName === 'users') {
                    this.loadUsersTable();
                } else if (tabName === 'orders') {
                    this.loadOrdersTable();
                }
            }
        });

        // Add product button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#add-product-btn')) {
                const modal = document.getElementById('add-product-modal');
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        });

        // Add product form
        const addProductForm = document.getElementById('add-product-form');
        if (addProductForm) {
            addProductForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(addProductForm);
                
                const productData = {
                    name: formData.get('name'),
                    category: formData.get('category'),
                    price: formData.get('price'),
                    stock: formData.get('stock'),
                    brand: formData.get('brand'),
                    description: formData.get('description')
                };

                this.addProduct(productData);
                
                // Close modal and reset form
                const modal = document.getElementById('add-product-modal');
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                addProductForm.reset();
            });
        }

        // Product actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.delete-product')) {
                const productId = e.target.closest('.delete-product').dataset.id;
                this.deleteProduct(productId);
            }
        });

        // User actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.deactivate-user') || e.target.closest('.activate-user')) {
                const userId = e.target.closest('button').dataset.id;
                this.toggleUserStatus(userId);
            }
        });

        // Order actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-order')) {
                const orderId = e.target.closest('.view-order').dataset.id;
                this.viewOrderDetails(orderId);
            }
        });

        // Order status changes
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('order-status-select')) {
                const orderId = e.target.dataset.orderId;
                const newStatus = e.target.value;
                this.updateOrderStatus(orderId, newStatus);
            }
        });

        // Close admin modal
        document.addEventListener('click', (e) => {
            const adminModal = document.getElementById('admin-modal');
            if (e.target === adminModal || e.target.closest('.modal-close')) {
                this.closeAdminModal();
            }
        });

        // Close add product modal
        document.addEventListener('click', (e) => {
            const addProductModal = document.getElementById('add-product-modal');
            if (e.target === addProductModal || e.target.closest('.modal-close')) {
                addProductModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Initialize AdminManager
const adminManager = new AdminManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminManager;
} else if (typeof window !== 'undefined') {
    window.AdminManager = AdminManager;
    window.adminManager = adminManager;
}