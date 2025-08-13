// Products data and management for Grossory E-commerce

class ProductManager {
    constructor() {
        this.products = this.getInitialProducts();
        this.categories = ['all', 'electronics', 'clothing', 'home', 'sports', 'books'];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.currentProduct = null;
    }

    getInitialProducts() {
        // Check if products exist in localStorage (Firebase simulation)
        const stored = localStorage.getItem('grossory_products');
        if (stored) {
            return JSON.parse(stored);
        }

        // Initial product data
        const initialProducts = [
            {
                id: 1,
                name: "iPhone 15 Pro Max",
                description: "Latest Apple iPhone with advanced camera system and A17 Pro chip for ultimate performance.",
                price: 1199.99,
                originalPrice: 1299.99,
                category: "electronics",
                brand: "Apple",
                images: [
                    "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
                    "https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg",
                    "https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg"
                ],
                colors: [
                    { name: "Natural Titanium", value: "#8C7853" },
                    { name: "Blue Titanium", value: "#5F8FB4" },
                    { name: "White Titanium", value: "#E8E8E8" },
                    { name: "Black Titanium", value: "#2C2C2C" }
                ],
                sizes: ["128GB", "256GB", "512GB", "1TB"],
                stock: 15,
                rating: 4.8,
                reviewCount: 124,
                inStock: true
            },
            {
                id: 2,
                name: "Samsung Galaxy S24 Ultra",
                description: "Premium Android smartphone with S Pen, exceptional camera, and all-day battery life.",
                price: 1099.99,
                originalPrice: 1199.99,
                category: "electronics",
                brand: "Samsung",
                images: [
                    "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg",
                    "https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg"
                ],
                colors: [
                    { name: "Titanium Black", value: "#2C2C2C" },
                    { name: "Titanium Gray", value: "#6B7280" },
                    { name: "Titanium Violet", value: "#8B5CF6" },
                    { name: "Titanium Yellow", value: "#EAB308" }
                ],
                sizes: ["256GB", "512GB", "1TB"],
                stock: 8,
                rating: 4.7,
                reviewCount: 89,
                inStock: true
            },
            {
                id: 3,
                name: "Nike Air Max 90",
                description: "Classic Nike sneakers with Air cushioning technology for comfort and style.",
                price: 129.99,
                originalPrice: 149.99,
                category: "sports",
                brand: "Nike",
                images: [
                    "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
                    "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg"
                ],
                colors: [
                    { name: "White", value: "#FFFFFF" },
                    { name: "Black", value: "#000000" },
                    { name: "Red", value: "#EF4444" },
                    { name: "Blue", value: "#3B82F6" }
                ],
                sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
                stock: 25,
                rating: 4.6,
                reviewCount: 156,
                inStock: true
            },
            {
                id: 4,
                name: "Levi's 501 Jeans",
                description: "Iconic straight-leg jeans with classic fit and premium denim construction.",
                price: 89.99,
                originalPrice: 99.99,
                category: "clothing",
                brand: "Levi's",
                images: [
                    "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
                    "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg"
                ],
                colors: [
                    { name: "Classic Blue", value: "#4F46E5" },
                    { name: "Black", value: "#000000" },
                    { name: "Light Wash", value: "#93C5FD" },
                    { name: "Dark Wash", value: "#1E3A8A" }
                ],
                sizes: ["28", "30", "32", "34", "36", "38", "40"],
                stock: 18,
                rating: 4.5,
                reviewCount: 203,
                inStock: true
            },
            {
                id: 5,
                name: "KitchenAid Stand Mixer",
                description: "Professional-grade stand mixer perfect for baking and cooking enthusiasts.",
                price: 399.99,
                originalPrice: 449.99,
                category: "home",
                brand: "KitchenAid",
                images: [
                    "https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg",
                    "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg"
                ],
                colors: [
                    { name: "Empire Red", value: "#DC2626" },
                    { name: "Onyx Black", value: "#000000" },
                    { name: "White", value: "#FFFFFF" },
                    { name: "Silver", value: "#9CA3AF" }
                ],
                sizes: ["4.5-Quart", "5-Quart", "6-Quart"],
                stock: 7,
                rating: 4.9,
                reviewCount: 312,
                inStock: true
            },
            {
                id: 6,
                name: "MacBook Air M3",
                description: "Ultra-thin laptop with Apple M3 chip, all-day battery life, and stunning Retina display.",
                price: 1299.99,
                originalPrice: 1399.99,
                category: "electronics",
                brand: "Apple",
                images: [
                    "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg",
                    "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg"
                ],
                colors: [
                    { name: "Space Gray", value: "#4B5563" },
                    { name: "Silver", value: "#E5E7EB" },
                    { name: "Gold", value: "#F59E0B" },
                    { name: "Midnight", value: "#1F2937" }
                ],
                sizes: ["13-inch", "15-inch"],
                stock: 12,
                rating: 4.8,
                reviewCount: 98,
                inStock: true
            },
            {
                id: 7,
                name: "Adidas Ultraboost 22",
                description: "High-performance running shoes with responsive BOOST cushioning and Primeknit upper.",
                price: 179.99,
                originalPrice: 199.99,
                category: "sports",
                brand: "Adidas",
                images: [
                    "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg",
                    "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg"
                ],
                colors: [
                    { name: "Core Black", value: "#000000" },
                    { name: "Cloud White", value: "#FFFFFF" },
                    { name: "Solar Red", value: "#EF4444" },
                    { name: "Royal Blue", value: "#1E40AF" }
                ],
                sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
                stock: 22,
                rating: 4.7,
                reviewCount: 187,
                inStock: true
            },
            {
                id: 8,
                name: "The Psychology of Money",
                description: "Timeless lessons on wealth, greed, and happiness by Morgan Housel.",
                price: 16.99,
                originalPrice: 19.99,
                category: "books",
                brand: "Harriman House",
                images: [
                    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
                    "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg"
                ],
                colors: [
                    { name: "Hardcover", value: "#8B4513" },
                    { name: "Paperback", value: "#D2B48C" }
                ],
                sizes: ["Hardcover", "Paperback", "E-book", "Audiobook"],
                stock: 45,
                rating: 4.6,
                reviewCount: 523,
                inStock: true
            },
            {
                id: 9,
                name: "Zara Wool Blend Coat",
                description: "Elegant wool blend coat perfect for fall and winter seasons.",
                price: 149.99,
                originalPrice: 179.99,
                category: "clothing",
                brand: "Zara",
                images: [
                    "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
                    "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg"
                ],
                colors: [
                    { name: "Camel", value: "#D2B48C" },
                    { name: "Black", value: "#000000" },
                    { name: "Navy", value: "#1E3A8A" },
                    { name: "Gray", value: "#6B7280" }
                ],
                sizes: ["XS", "S", "M", "L", "XL"],
                stock: 14,
                rating: 4.4,
                reviewCount: 76,
                inStock: true
            },
            {
                id: 10,
                name: "Dyson V15 Detect",
                description: "Advanced cordless vacuum with laser dust detection and powerful suction.",
                price: 749.99,
                originalPrice: 799.99,
                category: "home",
                brand: "Dyson",
                images: [
                    "https://images.pexels.com/photos/4107963/pexels-photo-4107963.jpeg",
                    "https://images.pexels.com/photos/4246115/pexels-photo-4246115.jpeg"
                ],
                colors: [
                    { name: "Nickel/Blue", value: "#6366F1" },
                    { name: "Iron/Purple", value: "#8B5CF6" }
                ],
                sizes: ["Standard"],
                stock: 0,
                rating: 4.8,
                reviewCount: 234,
                inStock: false
            },
            {
                id: 11,
                name: "Sony WH-1000XM5",
                description: "Industry-leading noise canceling wireless headphones with exceptional sound quality.",
                price: 349.99,
                originalPrice: 399.99,
                category: "electronics",
                brand: "Sony",
                images: [
                    "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
                    "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg"
                ],
                colors: [
                    { name: "Black", value: "#000000" },
                    { name: "Silver", value: "#9CA3AF" },
                    { name: "Blue", value: "#3B82F6" },
                    { name: "White", value: "#FFFFFF" }
                ],
                sizes: ["Standard"],
                stock: 19,
                rating: 4.7,
                reviewCount: 167,
                inStock: true
            },
            {
                id: 12,
                name: "Atomic Habits",
                description: "An easy and proven way to build good habits and break bad ones by James Clear.",
                price: 18.99,
                originalPrice: 21.99,
                category: "books",
                brand: "Avery",
                images: [
                    "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
                    "https://images.pexels.com/photos/1181325/pexels-photo-1181325.jpeg"
                ],
                colors: [
                    { name: "Hardcover", value: "#8B4513" },
                    { name: "Paperback", value: "#D2B48C" }
                ],
                sizes: ["Hardcover", "Paperback", "E-book", "Audiobook"],
                stock: 38,
                rating: 4.8,
                reviewCount: 892,
                inStock: true
            }
        ];

        this.saveProducts(initialProducts);
        return initialProducts;
    }

    saveProducts(products = this.products) {
        localStorage.setItem('grossory_products', JSON.stringify(products));
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === parseInt(id));
    }

    getProductsByCategory(category) {
        if (category === 'all') return this.products;
        return this.products.filter(product => product.category === category);
    }

    searchProducts(query) {
        if (!query) return this.products;
        
        const searchTerm = query.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    filterProducts(category = 'all', searchQuery = '') {
        let filtered = this.products;

        // Apply category filter
        if (category !== 'all') {
            filtered = filtered.filter(product => product.category === category);
        }

        // Apply search filter
        if (searchQuery) {
            const searchTerm = searchQuery.toLowerCase();
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.brand.toLowerCase().includes(searchTerm)
            );
        }

        return filtered;
    }

    addProduct(productData) {
        const newProduct = {
            ...productData,
            id: Math.max(...this.products.map(p => p.id)) + 1,
            rating: 0,
            reviewCount: 0,
            inStock: productData.stock > 0
        };
        
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    updateProduct(id, updates) {
        const index = this.products.findIndex(product => product.id === parseInt(id));
        if (index !== -1) {
            this.products[index] = { 
                ...this.products[index], 
                ...updates,
                inStock: updates.stock > 0
            };
            this.saveProducts();
            return this.products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === parseInt(id));
        if (index !== -1) {
            const deleted = this.products.splice(index, 1)[0];
            this.saveProducts();
            return deleted;
        }
        return null;
    }

    updateStock(id, quantity) {
        const product = this.getProductById(id);
        if (product) {
            product.stock = Math.max(0, product.stock - quantity);
            product.inStock = product.stock > 0;
            this.saveProducts();
        }
    }

    renderProducts(container, products = this.products) {
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search fa-3x"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => `
            <div class="product-card ${!product.inStock ? 'out-of-stock' : ''}" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                    ${!product.inStock ? '<div class="product-badge out-of-stock">Out of Stock</div>' : ''}
                    ${product.originalPrice > product.price ? '<div class="product-badge">Sale</div>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice > product.price ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="product-rating">
                        <div class="stars">
                            ${this.renderStars(product.rating)}
                        </div>
                        <span class="rating-count">(${product.reviewCount})</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart" 
                                data-product-id="${product.id}" 
                                ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i>
                            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button class="btn btn-secondary buy-now" 
                                data-product-id="${product.id}"
                                ${!product.inStock ? 'disabled' : ''}>
                            ${product.inStock ? 'Buy Now' : 'Unavailable'}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return `
            ${'<i class="fas fa-star star"></i>'.repeat(fullStars)}
            ${hasHalfStar ? '<i class="fas fa-star-half-alt star"></i>' : ''}
            ${'<i class="far fa-star star empty"></i>'.repeat(emptyStars)}
        `;
    }

    showProductModal(productId) {
        const product = this.getProductById(productId);
        if (!product) return;

        this.currentProduct = product;
        const modal = document.getElementById('product-modal');
        
        // Update modal content
        document.getElementById('main-product-image').src = product.images[0];
        document.getElementById('modal-product-title').textContent = product.name;
        document.getElementById('modal-product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('modal-product-description').textContent = product.description;
        document.getElementById('product-brand').textContent = product.brand;
        document.getElementById('product-category').textContent = product.category;

        // Update original price if on sale
        const originalPriceEl = document.getElementById('modal-original-price');
        if (product.originalPrice > product.price) {
            originalPriceEl.textContent = `$${product.originalPrice.toFixed(2)}`;
            originalPriceEl.style.display = 'inline';
        } else {
            originalPriceEl.style.display = 'none';
        }

        // Update rating
        document.getElementById('modal-product-rating').innerHTML = this.renderStars(product.rating);
        document.getElementById('modal-rating-count').textContent = `(${product.reviewCount} reviews)`;

        // Update thumbnails
        const thumbnailContainer = document.getElementById('thumbnail-images');
        thumbnailContainer.innerHTML = product.images.map((image, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                <img src="${image}" alt="Product view ${index + 1}">
            </div>
        `).join('');

        // Update color options
        const colorContainer = document.getElementById('color-options');
        colorContainer.innerHTML = product.colors.map((color, index) => `
            <div class="color-option ${index === 0 ? 'active' : ''}" 
                 data-color="${color.name}" 
                 style="background-color: ${color.value}"
                 title="${color.name}">
            </div>
        `).join('');

        // Update size options
        const sizeSelect = document.getElementById('size-select');
        sizeSelect.innerHTML = '<option value="">Select Size</option>' + 
            product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');

        // Update stock status
        const stockStatus = document.getElementById('stock-status');
        const addToCartBtn = document.getElementById('modal-add-to-cart');
        const buyNowBtn = document.getElementById('modal-buy-now');

        if (product.inStock) {
            stockStatus.innerHTML = '<span class="in-stock">In Stock</span>';
            addToCartBtn.disabled = false;
            buyNowBtn.disabled = false;
            addToCartBtn.textContent = 'Add to Cart';
            buyNowBtn.textContent = 'Buy Now';
        } else {
            stockStatus.innerHTML = '<span class="out-of-stock">Out of Stock</span>';
            addToCartBtn.disabled = true;
            buyNowBtn.disabled = true;
            addToCartBtn.textContent = 'Out of Stock';
            buyNowBtn.textContent = 'Unavailable';
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideProductModal() {
        const modal = document.getElementById('product-modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.currentProduct = null;
    }

    initializeProductEvents() {
        const productsGrid = document.getElementById('products-grid');
        const productModal = document.getElementById('product-modal');

        // Product card clicks
        if (productsGrid) {
            productsGrid.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                if (productCard && !e.target.closest('.product-actions')) {
                    const productId = productCard.dataset.productId;
                    this.showProductModal(productId);
                }
            });
        }

        // Modal events
        if (productModal) {
            // Close modal
            productModal.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal') || e.target.closest('.modal-close')) {
                    this.hideProductModal();
                }
            });

            // Thumbnail clicks
            productModal.addEventListener('click', (e) => {
                const thumbnail = e.target.closest('.thumbnail');
                if (thumbnail) {
                    // Remove active from all thumbnails
                    productModal.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    thumbnail.classList.add('active');
                    
                    // Update main image
                    const mainImage = document.getElementById('main-product-image');
                    mainImage.src = thumbnail.dataset.image;
                }
            });

            // Color selection
            productModal.addEventListener('click', (e) => {
                const colorOption = e.target.closest('.color-option');
                if (colorOption) {
                    productModal.querySelectorAll('.color-option').forEach(c => c.classList.remove('active'));
                    colorOption.classList.add('active');
                }
            });

            // Quantity controls
            productModal.addEventListener('click', (e) => {
                const qtyInput = productModal.querySelector('.qty-input');
                
                if (e.target.closest('.qty-btn.minus')) {
                    const current = parseInt(qtyInput.value);
                    qtyInput.value = Math.max(1, current - 1);
                } else if (e.target.closest('.qty-btn.plus')) {
                    const current = parseInt(qtyInput.value);
                    qtyInput.value = Math.min(10, current + 1);
                }
            });

            // Zoom controls
            productModal.addEventListener('click', (e) => {
                const mainImage = document.getElementById('main-product-image');
                
                if (e.target.closest('.zoom-in')) {
                    mainImage.style.transform = 'scale(1.5)';
                } else if (e.target.closest('.zoom-out')) {
                    mainImage.style.transform = 'scale(1)';
                }
            });
        }

        // Category filters
        document.addEventListener('click', (e) => {
            const categoryBtn = e.target.closest('.category-btn');
            if (categoryBtn) {
                // Update active state
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                categoryBtn.classList.add('active');

                // Filter products
                const category = categoryBtn.dataset.category;
                this.currentFilter = category;
                const searchQuery = document.getElementById('search-input')?.value || '';
                const filteredProducts = this.filterProducts(category, searchQuery);
                this.renderProducts(productsGrid, filteredProducts);
            }
        });

        // Search functionality
        const searchInputs = ['search-input', 'mobile-product-search'];
        searchInputs.forEach(inputId => {
            const searchInput = document.getElementById(inputId);
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.searchQuery = e.target.value;
                    const filteredProducts = this.filterProducts(this.currentFilter, this.searchQuery);
                    this.renderProducts(productsGrid, filteredProducts);
                    
                    // Sync other search inputs
                    searchInputs.forEach(id => {
                        const input = document.getElementById(id);
                        if (input && input !== e.target) {
                            input.value = this.searchQuery;
                        }
                    });
                });
            }
        });

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && productModal.classList.contains('active')) {
                this.hideProductModal();
            }
        });
    }

    getSelectedProductOptions() {
        if (!this.currentProduct) return null;

        const modal = document.getElementById('product-modal');
        const selectedColor = modal.querySelector('.color-option.active')?.dataset.color || this.currentProduct.colors[0]?.name;
        const selectedSize = modal.querySelector('#size-select').value || this.currentProduct.sizes[0];
        const quantity = parseInt(modal.querySelector('.qty-input').value) || 1;

        return {
            productId: this.currentProduct.id,
            product: this.currentProduct,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity
        };
    }
}

// Initialize ProductManager
const productManager = new ProductManager();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Render initial products
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productManager.renderProducts(productsGrid);
    }

    // Initialize product events
    productManager.initializeProductEvents();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductManager;
} else if (typeof window !== 'undefined') {
    window.ProductManager = ProductManager;
    window.productManager = productManager;
}