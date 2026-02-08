// Sample art gallery data with bilingual content
const artworks = [
    {
        id: 1,
        title: { ar: "غروب الشمس في الصحراء", en: "Sunset in the Desert" },
        description: { ar: "لوحة فنية تجسد جمال غروب الشمس في الصحراء العربية بألوان دافئة ومشرقة", en: "Artistic painting capturing the beauty of sunset in the Arabian desert with warm and bright colors" },
        price: { ar: "1,200 ريال", en: "1,200 EGP" },
        image: "https://picsum.photos/seed/sunset1/400/300"
    },
    {
        id: 2,
        title: { ar: "عمارة إسلامية كلاسيكية", en: "Classical Islamic Architecture" },
        description: { ar: "تصميم فني يعرض تفاصيل العمارة الإسلامية التقليدية بزخارف دقيقة", en: "Artistic design showing details of traditional Islamic architecture with intricate decorations" },
        price: { ar: "2,500 ريال", en: "2,500 EGP" },
        image: "https://picsum.photos/seed/islamic2/400/300"
    },
    {
        id: 3,
        title: { ar: "الخيل العربية", en: "Arabian Horses" },
        description: { ar: "لوحة تبرز جمال وقوة الخيل العربية الأصيلة في حركة رشيقة", en: "Painting highlighting the beauty and strength of pure Arabian horses in graceful motion" },
        price: { ar: "3,000 ريال", en: "3,000 EGP" },
        image: "https://picsum.photos/seed/horses3/400/300"
    },
    {
        id: 4,
        title: { ar: "زهور الربيع", en: "Spring Flowers" },
        description: { ar: "منظر طبيعي ملون يزدهر بزهور الربيع في حديقة غنّاء", en: "Colorful landscape blooming with spring flowers in a lush garden" },
        price: { ar: "800 ريال", en: "800 EGP" },
        image: "https://picsum.photos/seed/flowers4/400/300"
    },
    {
        id: 5,
        title: { ar: "المدينة القديمة", en: "The Old City" },
        description: { ar: "مشهد لمدينة عربية قديمة بأسواقها وحاراتها التراثية", en: "Scene of an ancient Arab city with its traditional markets and alleys" },
        price: { ar: "1,800 ريال", en: "1,800 EGP" },
        image: "https://picsum.photos/seed/oldcity5/400/300"
    },
    {
        id: 6,
        title: { ar: "البحر الأزرق", en: "The Blue Sea" },
        description: { ar: "لوحة تجريدية تعبر عن عمق وهدوء البحار الزرقاء", en: "Abstract painting expressing the depth and tranquility of blue seas" },
        price: { ar: "1,500 ريال", en: "1,500 EGP" },
        image: "https://picsum.photos/seed/ocean6/400/300"
    },
    {
        id: 7,
        title: { ar: "فن الخط العربي", en: "Arabic Calligraphy Art" },
        description: { ar: "عمل فني يجمع بين الخط العربي التقليدي والتصميم العصري", en: "Artwork combining traditional Arabic calligraphy with contemporary design" },
        price: { ar: "2,200 ريال", en: "2,200 EGP" },
        image: "https://picsum.photos/seed/calligraphy7/400/300"
    },
    {
        id: 8,
        title: { ar: "الجبال الشاهقة", en: "Majestic Mountains" },
        description: { ar: "منظر طبيعي خلاب لجبال شاهقة تغطيها الثلوج", en: "Breathtaking landscape of towering mountains covered with snow" },
        price: { ar: "2,800 ريال", en: "2,800 EGP" },
        image: "https://picsum.photos/seed/mountains8/400/300"
    },
    {
        id: 9,
        title: { ar: "الصحراء الذهبية", en: "The Golden Desert" },
        description: { ar: "كثبان رملية ذهبية تحت ضوء الشمس المشرق", en: "Golden sand dunes under the bright sunlight" },
        price: { ar: "1,600 ريال", en: "1,600 EGP" },
        image: "https://picsum.photos/seed/desert9/400/300"
    }
];

// Global state
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentArtwork = null;
let currentLang = localStorage.getItem('language') || 'ar';

// DOM elements
const galleryGrid = document.getElementById('gallery').querySelector('.gallery-grid');
const productModal = document.getElementById('productModal');
const favoritesModal = document.getElementById('favoritesModal');
const favoritesBtn = document.getElementById('favoritesBtn');
const favoritesCount = document.querySelector('.favorites-count');
const darkModeToggle = document.getElementById('darkModeToggle');
const closeModal = document.getElementById('closeModal');
const closeFavoritesModal = document.getElementById('closeFavoritesModal');
const whatsappBtn = document.getElementById('whatsappBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const customOrderBtn = document.getElementById('customOrderBtn');
const langBtn = document.getElementById('langBtn');
const langText = document.querySelector('.lang-text');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    renderGallery();
    updateFavoritesCount();
    setupEventListeners();
    loadDarkMode();
});

// Initialize language
function initializeLanguage() {
    updateLanguage();
    langText.textContent = currentLang === 'ar' ? 'EN' : 'AR';
}

// Setup event listeners
function setupEventListeners() {
    // Language toggle
    langBtn.addEventListener('click', toggleLanguage);
    
    // Dark mode toggle
    darkModeToggle.addEventListener('change', toggleDarkMode);
    
    // Modal controls
    closeModal.addEventListener('click', () => closeModalHandler(productModal));
    closeFavoritesModal.addEventListener('click', () => closeModalHandler(favoritesModal));
    
    // Favorites button
    favoritesBtn.addEventListener('click', openFavoritesModal);
    
    // WhatsApp button
    whatsappBtn.addEventListener('click', sendWhatsAppMessage);
    
    // Favorite button in modal
    favoriteBtn.addEventListener('click', toggleFavoriteInModal);
    
    // Custom order button
    customOrderBtn.addEventListener('click', handleCustomOrder);
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeModalHandler(productModal);
        }
        if (e.target === favoritesModal) {
            closeModalHandler(favoritesModal);
        }
    });
}

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('language', currentLang);
    
    // Update HTML attributes
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update button text
    langText.textContent = currentLang === 'ar' ? 'EN' : 'AR';
    
    // Update all text content
    updateLanguage();
    
    // Re-render gallery with new language
    renderGallery();
}

// Update language content
function updateLanguage() {
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroDesc = document.querySelector('.hero-desc');
    if (heroTitle) heroTitle.textContent = heroTitle.getAttribute(`data-${currentLang}`);
    if (heroDesc) heroDesc.textContent = heroDesc.getAttribute(`data-${currentLang}`);
    
    // Update custom order section
    const customTitle = document.querySelector('.custom-title .title-text');
    const customDesc = document.querySelector('.custom-desc');
    if (customTitle) customTitle.textContent = document.querySelector('.custom-title').getAttribute(`data-${currentLang}`);
    if (customDesc) customDesc.textContent = customDesc.getAttribute(`data-${currentLang}`);
    
    // Update features
    document.querySelectorAll('.feature-text').forEach((elem, index) => {
        const li = elem.closest('li');
        if (li) {
            elem.textContent = li.getAttribute(`data-${currentLang}`);
        }
    });
    
    // Update buttons
    document.querySelectorAll('.btn-text').forEach(elem => {
        const btn = elem.closest('button');
        if (btn) {
            elem.textContent = btn.getAttribute(`data-${currentLang}`);
        }
    });
    
    // Update modal titles
    document.querySelectorAll('.modal-title').forEach(elem => {
        elem.textContent = elem.getAttribute(`data-${currentLang}`);
    });
    
    // Update favorite button text
    updateFavoriteButton();
}

// Render gallery
function renderGallery() {
    galleryGrid.innerHTML = '';
    
    artworks.forEach(artwork => {
        const galleryItem = createGalleryItem(artwork);
        galleryGrid.appendChild(galleryItem);
    });
}

// Create gallery item element
function createGalleryItem(artwork) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.id = artwork.id;
    
    if (favorites.includes(artwork.id)) {
        item.classList.add('favorited');
    }
    
    const title = artwork.title[currentLang];
    const price = artwork.price[currentLang];
    const description = artwork.description[currentLang];
    
    item.innerHTML = `
        <div class="favorite-indicator">❤️</div>
        <img src="${artwork.image}" alt="${title}" loading="lazy">
        <div class="gallery-item-info">
            <h3 class="gallery-item-title">${title}</h3>
            <p class="gallery-item-price">${price}</p>
            <p class="gallery-item-description">${description.substring(0, 100)}...</p>
        </div>
    `;
    
    item.addEventListener('click', () => openProductModal(artwork));
    
    return item;
}

// Open product modal
function openProductModal(artwork) {
    currentArtwork = artwork;
    
    document.getElementById('modalImage').src = artwork.image;
    document.getElementById('modalTitle').textContent = artwork.title[currentLang];
    document.getElementById('modalDescription').textContent = artwork.description[currentLang];
    document.getElementById('modalPrice').textContent = artwork.price[currentLang];
    
    updateFavoriteButton();
    
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal handler
function closeModalHandler(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

// Load dark mode preference
function loadDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark');
        darkModeToggle.checked = true;
    }
}

// Toggle favorite
function toggleFavorite(artworkId) {
    const index = favorites.indexOf(artworkId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(artworkId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
    updateGalleryItemFavoriteStatus(artworkId);
}

// Toggle favorite in modal
function toggleFavoriteInModal() {
    if (currentArtwork) {
        toggleFavorite(currentArtwork.id);
        updateFavoriteButton();
    }
}

// Update favorite button in modal
function updateFavoriteButton() {
    if (currentArtwork) {
        const isFavorited = favorites.includes(currentArtwork.id);
        favoriteBtn.innerHTML = isFavorited ? 
            '<i class="fas fa-heart"></i> إزالة من المفضلة' : 
            '<i class="far fa-heart"></i> أضف للمفضلة';
    }
}

// Update gallery item favorite status
function updateGalleryItemFavoriteStatus(artworkId) {
    const galleryItem = document.querySelector(`.gallery-item[data-id="${artworkId}"]`);
    if (galleryItem) {
        if (favorites.includes(artworkId)) {
            galleryItem.classList.add('favorited');
        } else {
            galleryItem.classList.remove('favorited');
        }
    }
}

// Update favorites count
function updateFavoritesCount() {
    favoritesCount.textContent = favorites.length;
}

// Open favorites modal
function openFavoritesModal() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    favoritesGrid.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">لا توجد عناصر في المفضلة</p>';
    } else {
        const favoriteArtworks = artworks.filter(artwork => favorites.includes(artwork.id));
        
        favoriteArtworks.forEach(artwork => {
            const favoriteItem = createFavoriteItem(artwork);
            favoritesGrid.appendChild(favoriteItem);
        });
    }
    
    favoritesModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Create favorite item element
function createFavoriteItem(artwork) {
    const item = document.createElement('div');
    item.className = 'favorites-item';
    
    const title = artwork.title[currentLang];
    const price = artwork.price[currentLang];
    
    item.innerHTML = `
        <img src="${artwork.image}" alt="${title}">
        <h4>${title}</h4>
        <p>${price}</p>
    `;
    
    item.addEventListener('click', () => {
        closeModalHandler(favoritesModal);
        openProductModal(artwork);
    });
    
    return item;
}

// Send WhatsApp message
function sendWhatsAppMessage() {
    if (currentArtwork) {
        const title = currentArtwork.title[currentLang];
        const price = currentArtwork.price[currentLang];
        const description = currentArtwork.description[currentLang];
        
        const message = currentLang === 'ar' ? 
            `مرحباً، أود الاستفسار عن شراء اللوحة الفنية: ${title}\n\nالسعر: ${price}\n\nالوصف: ${description}` :
            `Hello, I would like to inquire about purchasing the artwork: ${title}\n\nPrice: ${price}\n\nDescription: ${description}`;
            
        const phoneNumber = '201000000000'; // Egyptian phone number
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    }
}

// Custom order functionality
function handleCustomOrder() {
    const message = currentLang === 'ar' ? 
        "مرحباً، أود الاستفسار عن طلب رسمة مخصصة" :
        "Hello, I would like to inquire about ordering a custom artwork";
        
    const phoneNumber = '201000000000'; // Egyptian phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Update favorite button in modal
function updateFavoriteButton() {
    if (currentArtwork) {
        const isFavorited = favorites.includes(currentArtwork.id);
        const text = currentLang === 'ar' ? 
            (isFavorited ? 'إزالة من المفضلة' : 'أضف للمفضلة') :
            (isFavorited ? 'Remove from Favorites' : 'Add to Favorites');
            
        favoriteBtn.innerHTML = isFavorited ? 
            `<i class="fas fa-heart"></i> ${text}` : 
            `<i class="far fa-heart"></i> ${text}`;
    }
}

// Open favorites modal
function openFavoritesModal() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    favoritesGrid.innerHTML = '';
    
    const emptyMessage = currentLang === 'ar' ? 
        'لا توجد عناصر في المفضلة' : 'No items in favorites';
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = `<p style="text-align: center; grid-column: 1/-1;">${emptyMessage}</p>`;
    } else {
        const favoriteArtworks = artworks.filter(artwork => favorites.includes(artwork.id));
        
        favoriteArtworks.forEach(artwork => {
            const favoriteItem = createFavoriteItem(artwork);
            favoritesGrid.appendChild(favoriteItem);
        });
    }
    
    favoritesModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (productModal.style.display === 'block') {
            closeModalHandler(productModal);
        }
        if (favoritesModal.style.display === 'block') {
            closeModalHandler(favoritesModal);
        }
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
setupLazyLoading();

// Add animation on scroll
function addScrollAnimations() {
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
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Initialize scroll animations
addScrollAnimations();