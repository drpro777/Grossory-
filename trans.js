// Multi-language support for Grossory E-commerce

const translations = {
    en: {
        // Navigation
        home: "Home",
        products: "Products",
        cart: "Cart",
        contact: "Contact",
        services: "Services",
        profile: "Profile",
        settings: "Settings",
        
        // Authentication
        login: "Login",
        signup: "Sign Up",
        logout: "Logout",
        email: "Email",
        password: "Password",
        "first-name": "First Name",
        "last-name": "Last Name",
        name: "Name",
        phone: "Phone",
        "profile-photo": "Profile Photo",
        "login-subtitle": "Welcome back to Grossory",
        "signup-subtitle": "Join Grossory today",
        "no-account": "Don't have an account?",
        "have-account": "Already have an account?",
        
        // Loading
        loading: "Loading Grossory...",
        
        // Home page
        "hero-title": "Welcome to Grossory",
        "hero-subtitle": "Your Global Marketplace for Everything",
        "shop-now": "Shop Now",
        "learn-more": "Learn More",
        "features-title": "Why Choose Grossory?",
        "fast-delivery": "Fast Delivery",
        "fast-delivery-desc": "Get your products delivered quickly and safely",
        "secure-payment": "Secure Payment",
        "secure-payment-desc": "Safe and secure payment methods",
        support: "24/7 Support",
        "support-desc": "Round the clock customer support",
        worldwide: "Worldwide",
        "worldwide-desc": "Shipping to over 100 countries",
        
        // Products
        "our-products": "Our Products",
        "all-categories": "All Categories",
        electronics: "Electronics",
        clothing: "Clothing",
        "home-garden": "Home & Garden",
        sports: "Sports",
        books: "Books",
        search: "Search products...",
        "add-to-cart": "Add to Cart",
        "buy-now": "Buy Now",
        color: "Color",
        size: "Size",
        quantity: "Quantity",
        "in-stock": "In Stock",
        "out-of-stock": "Out of Stock",
        brand: "Brand",
        category: "Category",
        
        // Cart
        "shopping-cart": "Shopping Cart",
        "order-summary": "Order Summary",
        subtotal: "Subtotal",
        shipping: "Shipping",
        total: "Total",
        "proceed-checkout": "Proceed to Checkout",
        "empty-cart": "Your cart is empty",
        
        // Checkout
        checkout: "Checkout",
        "shipping-info": "Shipping Information",
        address: "Address",
        city: "City",
        "zip-code": "Zip Code",
        "payment-method": "Payment Method",
        "credit-card": "Credit Card",
        "cash-on-delivery": "Cash on Delivery",
        "place-order": "Place Order",
        
        // Contact
        "contact-us": "Contact Us",
        subject: "Subject",
        message: "Message",
        "your-name": "Your Name",
        "your-email": "Your Email",
        "your-message": "Your Message",
        "send-message": "Send Message",
        
        // Services
        "our-services": "Our Services",
        "express-delivery": "Express Delivery",
        "express-delivery-desc": "Fast and reliable delivery service worldwide",
        "easy-returns": "Easy Returns",
        "easy-returns-desc": "Hassle-free return policy within 30 days",
        installation: "Installation Service",
        "installation-desc": "Professional installation for electronics and appliances",
        "gift-wrapping": "Gift Wrapping",
        "gift-wrapping-desc": "Beautiful gift wrapping service available",
        "flexible-payment": "Flexible Payment",
        "flexible-payment-desc": "Multiple payment options and installment plans",
        "customer-support": "Customer Support",
        "customer-support-desc": "24/7 customer support via chat, email, and phone",
        
        // Admin
        "admin-access": "Admin Access",
        "admin-panel": "Admin Panel",
        "admin-login-subtitle": "Enter admin credentials",
        
        // Settings
        appearance: "Appearance",
        theme: "Theme",
        light: "Light",
        dark: "Dark",
        system: "System",
        language: "Language",
        account: "Account",
        
        // Common
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        view: "View",
        close: "Close",
        loading: "Loading...",
        error: "Error",
        success: "Success",
        warning: "Warning",
        info: "Info"
    },
    
    ar: {
        // Navigation
        home: "الرئيسية",
        products: "المنتجات",
        cart: "السلة",
        contact: "اتصل بنا",
        services: "الخدمات",
        profile: "الملف الشخصي",
        settings: "الإعدادات",
        
        // Authentication
        login: "تسجيل الدخول",
        signup: "إنشاء حساب",
        logout: "تسجيل الخروج",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        "first-name": "الاسم الأول",
        "last-name": "اسم العائلة",
        name: "الاسم",
        phone: "رقم الهاتف",
        "profile-photo": "صورة الملف الشخصي",
        "login-subtitle": "مرحباً بك في جروسوري",
        "signup-subtitle": "انضم إلى جروسوري اليوم",
        "no-account": "ليس لديك حساب؟",
        "have-account": "هل لديك حساب بالفعل؟",
        
        // Loading
        loading: "جاري تحميل جروسوري...",
        
        // Home page
        "hero-title": "مرحباً بك في جروسوري",
        "hero-subtitle": "السوق العالمي لكل شيء",
        "shop-now": "تسوق الآن",
        "learn-more": "اعرف المزيد",
        "features-title": "لماذا تختار جروسوري؟",
        "fast-delivery": "توصيل سريع",
        "fast-delivery-desc": "احصل على منتجاتك بسرعة وأمان",
        "secure-payment": "دفع آمن",
        "secure-payment-desc": "طرق دفع آمنة وموثوقة",
        support: "دعم 24/7",
        "support-desc": "دعم العملاء على مدار الساعة",
        worldwide: "عالمياً",
        "worldwide-desc": "شحن إلى أكثر من 100 دولة",
        
        // Products
        "our-products": "منتجاتنا",
        "all-categories": "جميع الفئات",
        electronics: "إلكترونيات",
        clothing: "ملابس",
        "home-garden": "المنزل والحديقة",
        sports: "رياضة",
        books: "كتب",
        search: "ابحث عن المنتجات...",
        "add-to-cart": "أضف للسلة",
        "buy-now": "اشتر الآن",
        color: "اللون",
        size: "الحجم",
        quantity: "الكمية",
        "in-stock": "متوفر",
        "out-of-stock": "غير متوفر",
        brand: "العلامة التجارية",
        category: "الفئة",
        
        // Cart
        "shopping-cart": "سلة التسوق",
        "order-summary": "ملخص الطلب",
        subtotal: "المجموع الفرعي",
        shipping: "الشحن",
        total: "المجموع",
        "proceed-checkout": "متابعة الدفع",
        "empty-cart": "سلتك فارغة",
        
        // Checkout
        checkout: "الدفع",
        "shipping-info": "معلومات الشحن",
        address: "العنوان",
        city: "المدينة",
        "zip-code": "الرمز البريدي",
        "payment-method": "طريقة الدفع",
        "credit-card": "بطاقة ائتمان",
        "cash-on-delivery": "الدفع عند التسليم",
        "place-order": "تأكيد الطلب",
        
        // Contact
        "contact-us": "اتصل بنا",
        subject: "الموضوع",
        message: "الرسالة",
        "your-name": "اسمك",
        "your-email": "بريدك الإلكتروني",
        "your-message": "رسالتك",
        "send-message": "إرسال الرسالة",
        
        // Services
        "our-services": "خدماتنا",
        "express-delivery": "توصيل سريع",
        "express-delivery-desc": "خدمة توصيل سريعة وموثوقة عالمياً",
        "easy-returns": "إرجاع سهل",
        "easy-returns-desc": "سياسة إرجاع مرنة خلال 30 يوماً",
        installation: "خدمة التركيب",
        "installation-desc": "تركيب احترافي للإلكترونيات والأجهزة",
        "gift-wrapping": "تغليف الهدايا",
        "gift-wrapping-desc": "خدمة تغليف هدايا جميلة متوفرة",
        "flexible-payment": "دفع مرن",
        "flexible-payment-desc": "خيارات دفع متعددة وخطط تقسيط",
        "customer-support": "دعم العملاء",
        "customer-support-desc": "دعم العملاء 24/7 عبر الدردشة والبريد الإلكتروني والهاتف",
        
        // Admin
        "admin-access": "الوصول للإدارة",
        "admin-panel": "لوحة الإدارة",
        "admin-login-subtitle": "أدخل بيانات المدير",
        
        // Settings
        appearance: "المظهر",
        theme: "السمة",
        light: "فاتح",
        dark: "داكن",
        system: "النظام",
        language: "اللغة",
        account: "الحساب",
        
        // Common
        save: "حفظ",
        cancel: "إلغاء",
        delete: "حذف",
        edit: "تعديل",
        view: "عرض",
        close: "إغلاق",
        loading: "جاري التحميل...",
        error: "خطأ",
        success: "نجح",
        warning: "تحذير",
        info: "معلومات"
    },
    
    ur: {
        // Navigation
        home: "ہوم",
        products: "پروڈکٹس",
        cart: "کارٹ",
        contact: "رابطہ",
        services: "خدمات",
        profile: "پروفائل",
        settings: "ترتیبات",
        
        // Authentication
        login: "لاگ ان",
        signup: "رجسٹر",
        logout: "لاگ آؤٹ",
        email: "ای میل",
        password: "پاس ورڈ",
        "first-name": "پہلا نام",
        "last-name": "آخری نام",
        name: "نام",
        phone: "فون نمبر",
        "profile-photo": "پروفائل فوٹو",
        "login-subtitle": "گروسری میں واپس خوش آمدید",
        "signup-subtitle": "آج ہی گروسری میں شامل ہوں",
        "no-account": "کیا آپ کا اکاؤنٹ نہیں ہے؟",
        "have-account": "کیا آپ کے پاس پہلے سے اکاؤنٹ ہے؟",
        
        // Loading
        loading: "گروسری لوڈ ہو رہا ہے...",
        
        // Home page
        "hero-title": "گروسری میں خوش آمدید",
        "hero-subtitle": "ہر چیز کے لیے آپ کی عالمی مارکیٹ",
        "shop-now": "ابھی خریداری کریں",
        "learn-more": "مزید جانیں",
        "features-title": "گروسری کیوں منتخب کریں؟",
        "fast-delivery": "تیز ڈیلیوری",
        "fast-delivery-desc": "اپنے پروڈکٹس جلدی اور محفوظ طریقے سے حاصل کریں",
        "secure-payment": "محفوظ ادائیگی",
        "secure-payment-desc": "محفوظ اور قابل اعتماد ادائیگی کے طریقے",
        support: "24/7 سپورٹ",
        "support-desc": "دن رات کسٹمر سپورٹ",
        worldwide: "دنیا بھر میں",
        "worldwide-desc": "100 سے زیادہ ممالک میں شپنگ",
        
        // Products
        "our-products": "ہمارے پروڈکٹس",
        "all-categories": "تمام کیٹگریز",
        electronics: "الیکٹرانکس",
        clothing: "کپڑے",
        "home-garden": "گھر اور باغ",
        sports: "کھیل",
        books: "کتابیں",
        search: "پروڈکٹس تلاش کریں...",
        "add-to-cart": "کارٹ میں شامل کریں",
        "buy-now": "ابھی خریدیں",
        color: "رنگ",
        size: "سائز",
        quantity: "مقدار",
        "in-stock": "دستیاب",
        "out-of-stock": "دستیاب نہیں",
        brand: "برانڈ",
        category: "کیٹگری",
        
        // Cart
        "shopping-cart": "شاپنگ کارٹ",
        "order-summary": "آرڈر کا خلاصہ",
        subtotal: "ذیلی کل",
        shipping: "شپنگ",
        total: "کل",
        "proceed-checkout": "چیک آؤٹ کریں",
        "empty-cart": "آپ کا کارٹ خالی ہے",
        
        // Checkout
        checkout: "چیک آؤٹ",
        "shipping-info": "شپنگ کی معلومات",
        address: "پتہ",
        city: "شہر",
        "zip-code": "پوسٹل کوڈ",
        "payment-method": "ادائیگی کا طریقہ",
        "credit-card": "کریڈٹ کارڈ",
        "cash-on-delivery": "ڈیلیوری پر ادائیگی",
        "place-order": "آرڈر دیں",
        
        // Contact
        "contact-us": "ہم سے رابطہ کریں",
        subject: "موضوع",
        message: "پیغام",
        "your-name": "آپ کا نام",
        "your-email": "آپ کا ای میل",
        "your-message": "آپ کا پیغام",
        "send-message": "پیغام بھیجیں",
        
        // Services
        "our-services": "ہماری خدمات",
        "express-delivery": "فوری ڈیلیوری",
        "express-delivery-desc": "دنیا بھر میں تیز اور قابل اعتماد ڈیلیوری سروس",
        "easy-returns": "آسان واپسی",
        "easy-returns-desc": "30 دنوں میں آسان واپسی کی پالیسی",
        installation: "انسٹالیشن سروس",
        "installation-desc": "الیکٹرانکس اور آلات کے لیے پیشہ ورانہ انسٹالیشن",
        "gift-wrapping": "تحفے کی پیکنگ",
        "gift-wrapping-desc": "خوبصورت تحفے کی پیکنگ سروس دستیاب",
        "flexible-payment": "لچکدار ادائیگی",
        "flexible-payment-desc": "متعدد ادائیگی کے اختیارات اور قسط کے منصوبے",
        "customer-support": "کسٹمر سپورٹ",
        "customer-support-desc": "چیٹ، ای میل اور فون کے ذریعے 24/7 کسٹمر سپورٹ",
        
        // Admin
        "admin-access": "ایڈمن رسائی",
        "admin-panel": "ایڈمن پینل",
        "admin-login-subtitle": "ایڈمن کی تفصیلات درج کریں",
        
        // Settings
        appearance: "ظاہری شکل",
        theme: "تھیم",
        light: "روشن",
        dark: "تاریک",
        system: "سسٹم",
        language: "زبان",
        account: "اکاؤنٹ",
        
        // Common
        save: "محفوظ کریں",
        cancel: "منسوخ کریں",
        delete: "ڈیلیٹ کریں",
        edit: "ایڈٹ کریں",
        view: "دیکھیں",
        close: "بند کریں",
        loading: "لوڈ ہو رہا ہے...",
        error: "خرابی",
        success: "کامیاب",
        warning: "انتباہ",
        info: "معلومات"
    },
    
    pt: {
        // Navigation
        home: "Início",
        products: "Produtos",
        cart: "Carrinho",
        contact: "Contato",
        services: "Serviços",
        profile: "Perfil",
        settings: "Configurações",
        
        // Authentication
        login: "Entrar",
        signup: "Cadastrar",
        logout: "Sair",
        email: "Email",
        password: "Senha",
        "first-name": "Primeiro Nome",
        "last-name": "Sobrenome",
        name: "Nome",
        phone: "Telefone",
        "profile-photo": "Foto do Perfil",
        "login-subtitle": "Bem-vindo de volta ao Grossory",
        "signup-subtitle": "Junte-se ao Grossory hoje",
        "no-account": "Não tem uma conta?",
        "have-account": "Já tem uma conta?",
        
        // Loading
        loading: "Carregando Grossory...",
        
        // Home page
        "hero-title": "Bem-vindo ao Grossory",
        "hero-subtitle": "Seu Marketplace Global para Tudo",
        "shop-now": "Comprar Agora",
        "learn-more": "Saiba Mais",
        "features-title": "Por que escolher Grossory?",
        "fast-delivery": "Entrega Rápida",
        "fast-delivery-desc": "Receba seus produtos rapidamente e com segurança",
        "secure-payment": "Pagamento Seguro",
        "secure-payment-desc": "Métodos de pagamento seguros e confiáveis",
        support: "Suporte 24/7",
        "support-desc": "Suporte ao cliente 24 horas por dia",
        worldwide: "Mundial",
        "worldwide-desc": "Envio para mais de 100 países",
        
        // Products
        "our-products": "Nossos Produtos",
        "all-categories": "Todas as Categorias",
        electronics: "Eletrônicos",
        clothing: "Roupas",
        "home-garden": "Casa e Jardim",
        sports: "Esportes",
        books: "Livros",
        search: "Pesquisar produtos...",
        "add-to-cart": "Adicionar ao Carrinho",
        "buy-now": "Comprar Agora",
        color: "Cor",
        size: "Tamanho",
        quantity: "Quantidade",
        "in-stock": "Em Estoque",
        "out-of-stock": "Fora de Estoque",
        brand: "Marca",
        category: "Categoria",
        
        // Cart
        "shopping-cart": "Carrinho de Compras",
        "order-summary": "Resumo do Pedido",
        subtotal: "Subtotal",
        shipping: "Envio",
        total: "Total",
        "proceed-checkout": "Finalizar Compra",
        "empty-cart": "Seu carrinho está vazio",
        
        // Checkout
        checkout: "Finalizar Compra",
        "shipping-info": "Informações de Envio",
        address: "Endereço",
        city: "Cidade",
        "zip-code": "CEP",
        "payment-method": "Método de Pagamento",
        "credit-card": "Cartão de Crédito",
        "cash-on-delivery": "Pagamento na Entrega",
        "place-order": "Fazer Pedido",
        
        // Contact
        "contact-us": "Entre em Contato",
        subject: "Assunto",
        message: "Mensagem",
        "your-name": "Seu Nome",
        "your-email": "Seu Email",
        "your-message": "Sua Mensagem",
        "send-message": "Enviar Mensagem",
        
        // Services
        "our-services": "Nossos Serviços",
        "express-delivery": "Entrega Expressa",
        "express-delivery-desc": "Serviço de entrega rápido e confiável mundialmente",
        "easy-returns": "Devoluções Fáceis",
        "easy-returns-desc": "Política de devolução sem complicações em 30 dias",
        installation: "Serviço de Instalação",
        "installation-desc": "Instalação profissional para eletrônicos e eletrodomésticos",
        "gift-wrapping": "Embrulho para Presente",
        "gift-wrapping-desc": "Belo serviço de embrulho para presente disponível",
        "flexible-payment": "Pagamento Flexível",
        "flexible-payment-desc": "Múltiplas opções de pagamento e planos de parcelamento",
        "customer-support": "Suporte ao Cliente",
        "customer-support-desc": "Suporte ao cliente 24/7 via chat, email e telefone",
        
        // Admin
        "admin-access": "Acesso de Administrador",
        "admin-panel": "Painel de Administrador",
        "admin-login-subtitle": "Digite as credenciais de administrador",
        
        // Settings
        appearance: "Aparência",
        theme: "Tema",
        light: "Claro",
        dark: "Escuro",
        system: "Sistema",
        language: "Idioma",
        account: "Conta",
        
        // Common
        save: "Salvar",
        cancel: "Cancelar",
        delete: "Excluir",
        edit: "Editar",
        view: "Ver",
        close: "Fechar",
        loading: "Carregando...",
        error: "Erro",
        success: "Sucesso",
        warning: "Aviso",
        info: "Informações"
    },
    
    tr: {
        // Navigation
        home: "Ana Sayfa",
        products: "Ürünler",
        cart: "Sepet",
        contact: "İletişim",
        services: "Hizmetler",
        profile: "Profil",
        settings: "Ayarlar",
        
        // Authentication
        login: "Giriş Yap",
        signup: "Kaydol",
        logout: "Çıkış Yap",
        email: "E-posta",
        password: "Şifre",
        "first-name": "Ad",
        "last-name": "Soyad",
        name: "İsim",
        phone: "Telefon",
        "profile-photo": "Profil Fotoğrafı",
        "login-subtitle": "Grossory'e tekrar hoş geldiniz",
        "signup-subtitle": "Bugün Grossory'e katılın",
        "no-account": "Hesabınız yok mu?",
        "have-account": "Zaten hesabınız var mı?",
        
        // Loading
        loading: "Grossory yükleniyor...",
        
        // Home page
        "hero-title": "Grossory'e Hoş Geldiniz",
        "hero-subtitle": "Her Şey İçin Küresel Pazaryeriniz",
        "shop-now": "Hemen Alışveriş Yap",
        "learn-more": "Daha Fazla Öğren",
        "features-title": "Neden Grossory'i Seçmelisiniz?",
        "fast-delivery": "Hızlı Teslimat",
        "fast-delivery-desc": "Ürünlerinizi hızlı ve güvenli bir şekilde alın",
        "secure-payment": "Güvenli Ödeme",
        "secure-payment-desc": "Güvenli ve güvenilir ödeme yöntemleri",
        support: "7/24 Destek",
        "support-desc": "Günün her saati müşteri desteği",
        worldwide: "Dünya Çapında",
        "worldwide-desc": "100'den fazla ülkeye kargo",
        
        // Products
        "our-products": "Ürünlerimiz",
        "all-categories": "Tüm Kategoriler",
        electronics: "Elektronik",
        clothing: "Giyim",
        "home-garden": "Ev ve Bahçe",
        sports: "Spor",
        books: "Kitaplar",
        search: "Ürün ara...",
        "add-to-cart": "Sepete Ekle",
        "buy-now": "Hemen Satın Al",
        color: "Renk",
        size: "Boyut",
        quantity: "Miktar",
        "in-stock": "Stokta",
        "out-of-stock": "Stokta Yok",
        brand: "Marka",
        category: "Kategori",
        
        // Cart
        "shopping-cart": "Alışveriş Sepeti",
        "order-summary": "Sipariş Özeti",
        subtotal: "Ara Toplam",
        shipping: "Kargo",
        total: "Toplam",
        "proceed-checkout": "Ödemeye Geç",
        "empty-cart": "Sepetiniz boş",
        
        // Checkout
        checkout: "Ödeme",
        "shipping-info": "Kargo Bilgileri",
        address: "Adres",
        city: "Şehir",
        "zip-code": "Posta Kodu",
        "payment-method": "Ödeme Yöntemi",
        "credit-card": "Kredi Kartı",
        "cash-on-delivery": "Kapıda Ödeme",
        "place-order": "Siparişi Ver",
        
        // Contact
        "contact-us": "İletişime Geç",
        subject: "Konu",
        message: "Mesaj",
        "your-name": "Adınız",
        "your-email": "E-postanız",
        "your-message": "Mesajınız",
        "send-message": "Mesaj Gönder",
        
        // Services
        "our-services": "Hizmetlerimiz",
        "express-delivery": "Ekspres Teslimat",
        "express-delivery-desc": "Dünya çapında hızlı ve güvenilir teslimat hizmeti",
        "easy-returns": "Kolay İade",
        "easy-returns-desc": "30 gün içinde sorunsuz iade politikası",
        installation: "Kurulum Hizmeti",
        "installation-desc": "Elektronik ve ev aletleri için profesyonel kurulum",
        "gift-wrapping": "Hediye Paketleme",
        "gift-wrapping-desc": "Güzel hediye paketleme hizmeti mevcut",
        "flexible-payment": "Esnek Ödeme",
        "flexible-payment-desc": "Çoklu ödeme seçenekleri ve taksit planları",
        "customer-support": "Müşteri Desteği",
        "customer-support-desc": "Sohbet, e-posta ve telefon ile 7/24 müşteri desteği",
        
        // Admin
        "admin-access": "Yönetici Erişimi",
        "admin-panel": "Yönetici Paneli",
        "admin-login-subtitle": "Yönetici bilgilerini girin",
        
        // Settings
        appearance: "Görünüm",
        theme: "Tema",
        light: "Açık",
        dark: "Koyu",
        system: "Sistem",
        language: "Dil",
        account: "Hesap",
        
        // Common
        save: "Kaydet",
        cancel: "İptal",
        delete: "Sil",
        edit: "Düzenle",
        view: "Görüntüle",
        close: "Kapat",
        loading: "Yükleniyor...",
        error: "Hata",
        success: "Başarılı",
        warning: "Uyarı",
        info: "Bilgi"
    }
};

// Translation utility functions
const currentLanguage = localStorage.getItem('language') || 'en';

function translate(key, lang = currentLanguage) {
    return translations[lang]?.[key] || translations.en[key] || key;
}

function translatePage(lang = currentLanguage) {
    document.documentElement.lang = lang;
    
    // Set RTL direction for Arabic and Urdu
    if (lang === 'ar' || lang === 'ur') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translate(key, lang);
    });
    
    // Update placeholder text
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        element.placeholder = translate(key, lang);
    });
    
    // Update document title if it has default data
    const titleElement = document.querySelector('title[data-default]');
    if (titleElement && lang !== 'en') {
        titleElement.textContent = translate('site-title', lang) || 'Grossory - Your Global Marketplace';
    }
    
    // Update language selectors
    document.querySelectorAll('#language-select, #settings-language-select').forEach(select => {
        select.value = lang;
    });
    
    // Store the selected language
    localStorage.setItem('language', lang);
}

// Initialize translation system
function initTranslations() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    translatePage(savedLanguage);
    
    // Set up language change listeners
    document.addEventListener('change', (e) => {
        if (e.target.matches('#language-select, #settings-language-select')) {
            translatePage(e.target.value);
            
            // Sync all language selectors
            document.querySelectorAll('#language-select, #settings-language-select').forEach(select => {
                select.value = e.target.value;
            });
        }
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translate, translatePage, initTranslations };
} else if (typeof window !== 'undefined') {
    window.translate = translate;
    window.translatePage = translatePage;
    window.initTranslations = initTranslations;
}