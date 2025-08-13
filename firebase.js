// Firebase configuration and utilities for Grossory E-commerce
// This file provides Firebase-ready data structure and utilities

class FirebaseManager {
    constructor() {
        this.isFirebaseEnabled = false; // Set to true when Firebase is configured
        this.collections = {
            users: 'users',
            products: 'products',
            orders: 'orders',
            categories: 'categories',
            reviews: 'reviews',
            cart: 'cart',
            wishlist: 'wishlist'
        };
    }

    // Initialize Firebase (placeholder for actual Firebase config)
    initializeFirebase() {
        // Firebase configuration would go here
        /*
        const firebaseConfig = {
            apiKey: "your-api-key",
            authDomain: "your-project.firebaseapp.com",
            projectId: "your-project-id",
            storageBucket: "your-project.appspot.com",
            messagingSenderId: "123456789",
            appId: "your-app-id"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.storage = firebase.storage();
        this.isFirebaseEnabled = true;
        */
    }

    // Data structure converters for Firebase compatibility
    prepareUserForFirebase(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone || '',
            dateOfBirth: user.dateOfBirth || '',
            profilePhoto: user.profilePhoto || null,
            addresses: user.addresses || [],
            preferences: {
                language: user.language || 'en',
                theme: user.theme || 'system',
                notifications: user.notifications || true
            },
            metadata: {
                createdAt: user.createdAt || new Date().toISOString(),
                lastLogin: user.lastLogin || new Date().toISOString(),
                isActive: user.isActive !== undefined ? user.isActive : true,
                loginCount: user.loginCount || 1
            }
        };
    }

    prepareProductForFirebase(product) {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            category: product.category,
            brand: product.brand,
            images: product.images || [],
            variants: {
                colors: product.colors || [],
                sizes: product.sizes || [],
                materials: product.materials || []
            },
            inventory: {
                stock: product.stock || 0,
                inStock: product.inStock !== undefined ? product.inStock : true,
                lowStockThreshold: product.lowStockThreshold || 5
            },
            ratings: {
                average: product.rating || 0,
                count: product.reviewCount || 0,
                distribution: product.ratingDistribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
            },
            seo: {
                slug: this.generateSlug(product.name),
                metaTitle: product.metaTitle || product.name,
                metaDescription: product.metaDescription || product.description,
                keywords: product.keywords || []
            },
            metadata: {
                createdAt: product.createdAt || new Date().toISOString(),
                updatedAt: product.updatedAt || new Date().toISOString(),
                isActive: product.isActive !== undefined ? product.isActive : true,
                isFeatured: product.isFeatured || false
            }
        };
    }

    prepareOrderForFirebase(order) {
        return {
            id: order.id,
            userId: order.userId || null,
            items: order.items.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                color: item.color,
                size: item.size,
                image: item.image
            })),
            customer: {
                firstName: order.customerInfo.firstName,
                lastName: order.customerInfo.lastName,
                email: order.customerInfo.email,
                phone: order.customerInfo.phone
            },
            shipping: {
                address: order.customerInfo.address,
                city: order.customerInfo.city,
                zipCode: order.customerInfo.zipCode,
                method: order.shippingMethod || 'standard',
                cost: order.shipping || 0
            },
            payment: {
                method: order.customerInfo.paymentMethod,
                status: order.paymentStatus || 'pending',
                transactionId: order.transactionId || null
            },
            pricing: {
                subtotal: order.subtotal,
                shipping: order.shipping,
                tax: order.tax || 0,
                discount: order.discount || 0,
                total: order.total
            },
            status: {
                current: order.status || 'pending',
                history: order.statusHistory || [
                    {
                        status: 'pending',
                        timestamp: order.date,
                        note: 'Order placed'
                    }
                ]
            },
            metadata: {
                createdAt: order.date || new Date().toISOString(),
                updatedAt: order.updatedAt || new Date().toISOString(),
                estimatedDelivery: order.estimatedDelivery,
                trackingNumber: order.trackingNumber || null
            }
        };
    }

    // Utility functions
    generateSlug(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Firebase CRUD operations (placeholders)
    async createDocument(collection, data) {
        if (this.isFirebaseEnabled) {
            // return await this.db.collection(collection).add(data);
        } else {
            // Fallback to localStorage
            const items = JSON.parse(localStorage.getItem(`grossory_${collection}`) || '[]');
            items.push(data);
            localStorage.setItem(`grossory_${collection}`, JSON.stringify(items));
            return { id: data.id };
        }
    }

    async getDocument(collection, id) {
        if (this.isFirebaseEnabled) {
            // const doc = await this.db.collection(collection).doc(id).get();
            // return doc.exists ? { id: doc.id, ...doc.data() } : null;
        } else {
            // Fallback to localStorage
            const items = JSON.parse(localStorage.getItem(`grossory_${collection}`) || '[]');
            return items.find(item => item.id === id) || null;
        }
    }

    async updateDocument(collection, id, updates) {
        if (this.isFirebaseEnabled) {
            // return await this.db.collection(collection).doc(id).update(updates);
        } else {
            // Fallback to localStorage
            const items = JSON.parse(localStorage.getItem(`grossory_${collection}`) || '[]');
            const index = items.findIndex(item => item.id === id);
            if (index !== -1) {
                items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
                localStorage.setItem(`grossory_${collection}`, JSON.stringify(items));
                return items[index];
            }
            return null;
        }
    }

    async deleteDocument(collection, id) {
        if (this.isFirebaseEnabled) {
            // return await this.db.collection(collection).doc(id).delete();
        } else {
            // Fallback to localStorage
            const items = JSON.parse(localStorage.getItem(`grossory_${collection}`) || '[]');
            const filtered = items.filter(item => item.id !== id);
            localStorage.setItem(`grossory_${collection}`, JSON.stringify(filtered));
            return true;
        }
    }

    async getCollection(collection, filters = {}) {
        if (this.isFirebaseEnabled) {
            // let query = this.db.collection(collection);
            // Apply filters here
            // const snapshot = await query.get();
            // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
            // Fallback to localStorage
            let items = JSON.parse(localStorage.getItem(`grossory_${collection}`) || '[]');
            
            // Apply basic filters
            if (filters.category) {
                items = items.filter(item => item.category === filters.category);
            }
            if (filters.isActive !== undefined) {
                items = items.filter(item => item.isActive === filters.isActive);
            }
            if (filters.limit) {
                items = items.slice(0, filters.limit);
            }
            
            return items;
        }
    }

    // Authentication helpers
    async signUpUser(userData) {
        if (this.isFirebaseEnabled) {
            // const userCredential = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);
            // const user = userCredential.user;
            // await this.createDocument(this.collections.users, this.prepareUserForFirebase({...userData, id: user.uid}));
            // return user;
        } else {
            // Fallback to localStorage (current implementation)
            return window.authManager?.signup(userData);
        }
    }

    async signInUser(email, password) {
        if (this.isFirebaseEnabled) {
            // const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            // return userCredential.user;
        } else {
            // Fallback to localStorage (current implementation)
            return window.authManager?.login({ email, password });
        }
    }

    async signOutUser() {
        if (this.isFirebaseEnabled) {
            // return await this.auth.signOut();
        } else {
            // Fallback to localStorage (current implementation)
            return window.authManager?.logout();
        }
    }

    // File upload helpers
    async uploadFile(file, path) {
        if (this.isFirebaseEnabled) {
            // const storageRef = this.storage.ref().child(path);
            // const snapshot = await storageRef.put(file);
            // return await snapshot.ref.getDownloadURL();
        } else {
            // Convert to base64 for localStorage
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
    }

    // Real-time listeners (placeholders)
    onCollectionChange(collection, callback) {
        if (this.isFirebaseEnabled) {
            // return this.db.collection(collection).onSnapshot(callback);
        } else {
            // Simulate real-time updates with localStorage events
            window.addEventListener('storage', (e) => {
                if (e.key === `grossory_${collection}`) {
                    const data = JSON.parse(e.newValue || '[]');
                    callback(data);
                }
            });
        }
    }

    // Migration helpers
    async migrateToFirebase() {
        if (!this.isFirebaseEnabled) {
            console.log('Firebase not initialized. Cannot migrate data.');
            return;
        }

        try {
            // Migrate users
            const users = JSON.parse(localStorage.getItem('grossory_users') || '[]');
            for (const user of users) {
                await this.createDocument(this.collections.users, this.prepareUserForFirebase(user));
            }

            // Migrate products
            const products = JSON.parse(localStorage.getItem('grossory_products') || '[]');
            for (const product of products) {
                await this.createDocument(this.collections.products, this.prepareProductForFirebase(product));
            }

            // Migrate orders
            const orders = JSON.parse(localStorage.getItem('grossory_orders') || '[]');
            for (const order of orders) {
                await this.createDocument(this.collections.orders, this.prepareOrderForFirebase(order));
            }

            console.log('Data migration to Firebase completed successfully!');
        } catch (error) {
            console.error('Error migrating data to Firebase:', error);
        }
    }

    // Analytics helpers
    trackEvent(eventName, parameters = {}) {
        if (this.isFirebaseEnabled) {
            // firebase.analytics().logEvent(eventName, parameters);
        } else {
            // Fallback analytics tracking
            console.log('Analytics Event:', eventName, parameters);
        }
    }

    trackPurchase(transactionId, value, currency = 'USD', items = []) {
        this.trackEvent('purchase', {
            transaction_id: transactionId,
            value: value,
            currency: currency,
            items: items
        });
    }

    trackAddToCart(item) {
        this.trackEvent('add_to_cart', {
            currency: 'USD',
            value: item.price,
            items: [{
                item_id: item.productId,
                item_name: item.name,
                category: item.category,
                quantity: item.quantity,
                price: item.price
            }]
        });
    }

    // Performance monitoring
    startTrace(traceName) {
        if (this.isFirebaseEnabled) {
            // return firebase.performance().trace(traceName);
        } else {
            return {
                start: () => console.log(`Trace started: ${traceName}`),
                stop: () => console.log(`Trace stopped: ${traceName}`)
            };
        }
    }

    // Remote config
    async getRemoteConfig(key, defaultValue) {
        if (this.isFirebaseEnabled) {
            // await firebase.remoteConfig().fetchAndActivate();
            // return firebase.remoteConfig().getValue(key).asString() || defaultValue;
        } else {
            // Return default value
            return defaultValue;
        }
    }

    // Cloud messaging
    async requestNotificationPermission() {
        if (this.isFirebaseEnabled && 'Notification' in window) {
            // const messaging = firebase.messaging();
            // const permission = await Notification.requestPermission();
            // if (permission === 'granted') {
            //     const token = await messaging.getToken();
            //     return token;
            // }
        }
        return null;
    }
}

// Initialize FirebaseManager
const firebaseManager = new FirebaseManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FirebaseManager;
} else if (typeof window !== 'undefined') {
    window.FirebaseManager = FirebaseManager;
    window.firebaseManager = firebaseManager;
}

// Firebase integration instructions for developers:
/*
To integrate with Firebase:

1. Install Firebase SDK:
   npm install firebase

2. Create a Firebase project at https://console.firebase.google.com/

3. Enable Authentication, Firestore, Storage, and other services

4. Get your Firebase config and replace the placeholder in initializeFirebase()

5. Set firebaseManager.isFirebaseEnabled = true

6. Update security rules in Firestore:

// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products are readable by all, writable by admins only
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Orders are readable/writable by the user who created them
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}

7. Update Storage Security Rules:

// Storage Security Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}

8. Call firebaseManager.migrateToFirebase() to migrate existing localStorage data

9. Update your deployment to use Firebase Hosting:
   firebase init hosting
   firebase deploy
*/