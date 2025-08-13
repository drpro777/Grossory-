// Shopping cart management for Grossory E-commerce

class CartManager {
    constructor() {
        this.items = this.loadCart();
        this.shippingCost = 5.99;
        this.freeShippingThreshold = 100;
        this.initializeEvents();
    }

    loadCart() {
        const saved = localStorage.getItem('grossory_cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('grossory_cart', JSON.stringify(this.items));
        this.updateCartUI();
    }

    addToCart(productData) {
        const { productId, product, color, size, quantity } = productData;
        
        // Check if same product with same options already exists
        const existingIndex = this.items.findIndex(item => 
            item.productId === productId && 
            item.color === color && 
            item.size === size
        );

        if (existingIndex > -1) {
            // Update quantity of existing item
            this.items[existingIndex].quantity += quantity;
        } else {
            // Add new item
            this.items.push({
                id: Date.now(), // Unique cart item ID
                productId,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.images[0],
                color,
                size,
                quantity,
                brand: product.brand,
                category: product.category
            });
        }

        this.saveCart();
        this.showNotification('Product added to cart!', 'success');
        this.animateCartIcon();

        // Update product stock (simulate)
        if (window.productManager) {
            window.productManager.updateStock(productId, quantity);
        }

        return true;
    }

    removeFromCart(itemId) {
        this.items = this.items.filter(item => item.id !== parseInt(itemId));
        this.saveCart();
        this.showNotification('Item removed from cart', 'info');
        this.renderCart();
    }

    updateQuantity(itemId, newQuantity) {
        const item = this.items.find(item => item.id === parseInt(itemId));
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(itemId);
            } else {
                item.quantity = Math.min(10, newQuantity); // Max quantity of 10
                this.saveCart();
                this.renderCart();
            }
        }
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.renderCart();
        this.showNotification('Cart cleared', 'info');
    }

    getCartCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getShipping() {
        const subtotal = this.getSubtotal();
        return subtotal >= this.freeShippingThreshold ? 0 : this.shippingCost;
    }

    getTotal() {
        return this.getSubtotal() + this.getShipping();
    }

    updateCartUI() {
        // Update cart count in header
        const cartCounts = document.querySelectorAll('.cart-count');
        const count = this.getCartCount();
        
        cartCounts.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'flex' : 'none';
        });

        // Update cart page if visible
        const cartPage = document.getElementById('cart-page');
        if (cartPage && cartPage.classList.contains('active')) {
            this.renderCart();
        }
    }

    renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartShipping = document.getElementById('cart-shipping');
        const cartTotal = document.getElementById('cart-total');
        const checkoutBtn = document.getElementById('checkout-btn');

        if (!cartItemsContainer) return;

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started!</p>
                    <button class="btn btn-primary" data-page="products">Continue Shopping</button>
                </div>
            `;
            checkoutBtn.disabled = true;
        } else {
            cartItemsContainer.innerHTML = this.items.map(item => `
                <div class="cart-item" data-item-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p><strong>Brand:</strong> ${item.brand}</p>
                        <p><strong>Color:</strong> ${item.color}</p>
                        <p><strong>Size:</strong> ${item.size}</p>
                        ${item.originalPrice > item.price ? `<p class="discount">Save $${(item.originalPrice - item.price).toFixed(2)}</p>` : ''}
                    </div>
                    <div class="cart-item-quantity">
                        <div class="quantity-controls">
                            <button class="qty-btn minus" data-item-id="${item.id}">-</button>
                            <input type="number" class="qty-input" value="${item.quantity}" min="1" max="10" data-item-id="${item.id}">
                            <button class="qty-btn plus" data-item-id="${item.id}">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <button class="remove-item" data-item-id="${item.id}" title="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            
            checkoutBtn.disabled = false;
        }

        // Update totals
        if (cartSubtotal) cartSubtotal.textContent = `$${this.getSubtotal().toFixed(2)}`;
        if (cartShipping) {
            const shipping = this.getShipping();
            cartShipping.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
        }
        if (cartTotal) cartTotal.textContent = `$${this.getTotal().toFixed(2)}`;

        // Free shipping progress
        this.updateFreeShippingProgress();
    }

    updateFreeShippingProgress() {
        const subtotal = this.getSubtotal();
        const remaining = Math.max(0, this.freeShippingThreshold - subtotal);
        
        if (remaining > 0 && subtotal > 0) {
            const progressHtml = `
                <div class="free-shipping-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(subtotal / this.freeShippingThreshold) * 100}%"></div>
                    </div>
                    <p class="progress-text">
                        <i class="fas fa-truck"></i>
                        Add $${remaining.toFixed(2)} more for free shipping!
                    </p>
                </div>
            `;
            
            const cartSummary = document.querySelector('.summary-card');
            if (cartSummary && !cartSummary.querySelector('.free-shipping-progress')) {
                cartSummary.insertAdjacentHTML('afterbegin', progressHtml);
            }
        } else {
            const progressElement = document.querySelector('.free-shipping-progress');
            if (progressElement) {
                progressElement.remove();
            }
        }
    }

    animateCartIcon() {
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.classList.add('animate-bounce');
            setTimeout(() => {
                cartBtn.classList.remove('animate-bounce');
            }, 600);
        }
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

            // Auto remove after 3 seconds
            setTimeout(() => {
                notification.classList.add('animate-slide-out-to-top');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);

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

    initializeEvents() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart')) {
                e.preventDefault();
                const btn = e.target.closest('.add-to-cart');
                const productId = parseInt(btn.dataset.productId);
                
                // Check if we're in product modal
                const modal = document.getElementById('product-modal');
                if (modal.classList.contains('active') && window.productManager) {
                    const options = window.productManager.getSelectedProductOptions();
                    if (options) {
                        this.addToCart(options);
                    }
                } else {
                    // Quick add from product grid
                    const product = window.productManager?.getProductById(productId);
                    if (product && product.inStock) {
                        const quickOptions = {
                            productId: product.id,
                            product: product,
                            color: product.colors[0]?.name || 'Default',
                            size: product.sizes[0] || 'Default',
                            quantity: 1
                        };
                        this.addToCart(quickOptions);
                    }
                }
            }
        });

        // Buy now buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.buy-now')) {
                e.preventDefault();
                const btn = e.target.closest('.buy-now');
                const productId = parseInt(btn.dataset.productId);
                
                // Add to cart first
                const modal = document.getElementById('product-modal');
                if (modal.classList.contains('active') && window.productManager) {
                    const options = window.productManager.getSelectedProductOptions();
                    if (options) {
                        this.addToCart(options);
                        // Close product modal
                        window.productManager.hideProductModal();
                        // Open checkout
                        setTimeout(() => this.openCheckout(), 300);
                    }
                } else {
                    const product = window.productManager?.getProductById(productId);
                    if (product && product.inStock) {
                        const quickOptions = {
                            productId: product.id,
                            product: product,
                            color: product.colors[0]?.name || 'Default',
                            size: product.sizes[0] || 'Default',
                            quantity: 1
                        };
                        this.addToCart(quickOptions);
                        setTimeout(() => this.openCheckout(), 300);
                    }
                }
            }
        });

        // Cart item quantity controls
        document.addEventListener('click', (e) => {
            const itemId = e.target.dataset.itemId;
            
            if (e.target.classList.contains('qty-btn')) {
                const item = this.items.find(item => item.id === parseInt(itemId));
                if (item) {
                    if (e.target.classList.contains('minus')) {
                        this.updateQuantity(itemId, item.quantity - 1);
                    } else if (e.target.classList.contains('plus')) {
                        this.updateQuantity(itemId, item.quantity + 1);
                    }
                }
            }
            
            if (e.target.closest('.remove-item')) {
                this.removeFromCart(itemId);
            }
        });

        // Cart item quantity input
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('qty-input')) {
                const itemId = e.target.dataset.itemId;
                const newQuantity = parseInt(e.target.value);
                this.updateQuantity(itemId, newQuantity);
            }
        });

        // Checkout button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#checkout-btn')) {
                this.openCheckout();
            }
        });

        // Initialize cart UI on page load
        this.updateCartUI();
    }

    openCheckout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty!', 'warning');
            return;
        }

        const modal = document.getElementById('checkout-modal');
        const checkoutItems = document.getElementById('checkout-items');
        const checkoutTotal = document.getElementById('checkout-total');

        // Populate checkout items
        if (checkoutItems) {
            checkoutItems.innerHTML = this.items.map(item => `
                <div class="checkout-item">
                    <span>${item.name} (${item.color}, ${item.size}) x${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }

        // Update total
        if (checkoutTotal) {
            checkoutTotal.textContent = `$${this.getTotal().toFixed(2)}`;
        }

        // Pre-fill form if user is logged in
        const currentUser = JSON.parse(localStorage.getItem('grossory_current_user') || '{}');
        if (currentUser.email) {
            const form = document.getElementById('checkout-form');
            if (form) {
                form.firstName.value = currentUser.firstName || '';
                form.lastName.value = currentUser.lastName || '';
                form.email.value = currentUser.email || '';
                form.phone.value = currentUser.phone || '';
            }
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCheckout() {
        const modal = document.getElementById('checkout-modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    processOrder(orderData) {
        // Simulate order processing
        const orderId = 'GR' + Date.now();
        const order = {
            id: orderId,
            items: [...this.items],
            customerInfo: orderData,
            subtotal: this.getSubtotal(),
            shipping: this.getShipping(),
            total: this.getTotal(),
            status: 'pending',
            date: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };

        // Save order to localStorage (Firebase simulation)
        const orders = JSON.parse(localStorage.getItem('grossory_orders') || '[]');
        orders.push(order);
        localStorage.setItem('grossory_orders', JSON.stringify(orders));

        // Add to user's order history
        const currentUser = JSON.parse(localStorage.getItem('grossory_current_user') || '{}');
        if (currentUser.email) {
            const userOrders = JSON.parse(localStorage.getItem(`grossory_user_orders_${currentUser.email}`) || '[]');
            userOrders.push(order);
            localStorage.setItem(`grossory_user_orders_${currentUser.email}`, JSON.stringify(userOrders));
        }

        // Send email notification (EmailJS simulation)
        this.sendOrderEmail(order);

        // Clear cart
        this.clearCart();
        this.closeCheckout();

        // Show success message
        this.showOrderSuccess(orderId);

        return order;
    }

    sendOrderEmail(order) {
        // Simulate EmailJS integration
        const emailData = {
            to_email: order.customerInfo.email,
            order_id: order.id,
            customer_name: `${order.customerInfo.firstName} ${order.customerInfo.lastName}`,
            order_total: order.total.toFixed(2),
            order_items: order.items.map(item => 
                `${item.name} (${item.color}, ${item.size}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
            ).join('\n'),
            shipping_address: `${order.customerInfo.address}, ${order.customerInfo.city}, ${order.customerInfo.zipCode}`,
            payment_method: order.customerInfo.paymentMethod,
            estimated_delivery: new Date(order.estimatedDelivery).toLocaleDateString()
        };

        // In a real implementation, you would use EmailJS here:
        // emailjs.send('service_id', 'template_id', emailData)
        
        console.log('Order email would be sent:', emailData);
        
        // Simulate admin notification
        const adminEmailData = {
            ...emailData,
            to_email: 'muhammadali@grossory.com'
        };
        console.log('Admin notification would be sent:', adminEmailData);
    }

    showOrderSuccess(orderId) {
        const successModal = document.createElement('div');
        successModal.className = 'modal active';
        successModal.innerHTML = `
            <div class="modal-content">
                <div class="order-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Order Placed Successfully!</h2>
                    <p>Thank you for your order. Your order ID is: <strong>${orderId}</strong></p>
                    <p>You will receive a confirmation email shortly.</p>
                    <div class="success-actions">
                        <button class="btn btn-primary" id="continue-shopping">Continue Shopping</button>
                        <button class="btn btn-secondary" id="view-orders">View Orders</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(successModal);

        // Event listeners
        successModal.querySelector('#continue-shopping').addEventListener('click', () => {
            document.body.removeChild(successModal);
            // Navigate to products page
            if (window.pageManager) {
                window.pageManager.showPage('products');
            }
        });

        successModal.querySelector('#view-orders').addEventListener('click', () => {
            document.body.removeChild(successModal);
            // Navigate to profile orders tab
            if (window.pageManager) {
                window.pageManager.showPage('profile');
                // Switch to orders tab
                setTimeout(() => {
                    const ordersTab = document.querySelector('[data-tab="orders"]');
                    if (ordersTab) ordersTab.click();
                }, 100);
            }
        });

        // Auto close after 10 seconds
        setTimeout(() => {
            if (document.body.contains(successModal)) {
                document.body.removeChild(successModal);
            }
        }, 10000);
    }

    // Get cart data for checkout
    getCartData() {
        return {
            items: this.items,
            subtotal: this.getSubtotal(),
            shipping: this.getShipping(),
            total: this.getTotal(),
            count: this.getCartCount()
        };
    }
}

// Initialize CartManager
const cartManager = new CartManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartManager;
} else if (typeof window !== 'undefined') {
    window.CartManager = CartManager;
    window.cartManager = cartManager;
}