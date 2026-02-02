// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ===== LOADER ANIMATION =====
window.addEventListener('load', () => {
    gsap.to('.loader', {
        opacity: 0,
        duration: 1,
        delay: 2,
        onComplete: () => {
            document.querySelector('.loader').style.display = 'none';
        }
    });
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorCircle = document.querySelector('.cursor-circle');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    
    gsap.to(cursorCircle, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .product-card, .story-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursorCircle, {
            scale: 1.5,
            duration: 0.3
        });
        gsap.to(cursor, {
            scale: 0.8,
            duration: 0.3
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(cursorCircle, {
            scale: 1,
            duration: 0.3
        });
        gsap.to(cursor, {
            scale: 1,
            duration: 0.3
        });
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HERO SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Auto slide
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Dot controls
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// ===== HERO ANIMATIONS =====
gsap.from('.hero-badge', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 2.5,
    ease: 'power3.out'
});

gsap.from('.title-word', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    delay: 2.8,
    ease: 'power4.out'
});

gsap.from('.hero-subtitle', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 3.5,
    ease: 'power3.out'
});

gsap.from('.hero-stat', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    delay: 3.8,
    ease: 'power3.out'
});

gsap.from('.hero-buttons .btn', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    delay: 4.1,
    ease: 'power3.out'
});

gsap.from('.scroll-indicator', {
    opacity: 0,
    y: -20,
    duration: 1,
    delay: 4.5,
    ease: 'power2.out'
});

gsap.from('.hero-slider-controls', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 4.3,
    ease: 'power2.out'
});

// ===== HERO PARALLAX EFFECT =====
gsap.utils.toArray('.hero-slide img').forEach(img => {
    gsap.to(img, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
});

// ===== STORY CARDS ANIMATION =====
gsap.utils.toArray('.story-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: 'power3.out'
    });
    
    // Image zoom on scroll
    gsap.to(card.querySelector('.story-image img'), {
        scale: 1.1,
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true
        }
    });
});

// ===== MULTI-LAYER PARALLAX HERO ANIMATION =====
const parallaxSection = document.querySelector('.parallax-hero-section');

if (parallaxSection) {
    // Background layer - slowest movement
    gsap.to('.parallax-bg-layer', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.parallax-hero-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Cup layer - slow-medium movement
    gsap.fromTo('.parallax-cup-layer', 
        {
            y: 100,
            opacity: 0,
            scale: 0.8
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.parallax-hero-section',
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            }
        }
    );

    // Additional parallax movement for cup
    gsap.to('.parallax-cup-layer', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.parallax-hero-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Leaves layer - medium-fast movement (slides up from bottom left)
    gsap.fromTo('.parallax-leaves-left-layer',
        {
            y: 200,
            x: -100,
            opacity: 0,
            rotation: -15
        },
        {
            y: 0,
            x: 0,
            opacity: 1,
            rotation: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '.parallax-hero-section',
                start: 'top 70%',
                end: 'top 10%',
                scrub: 1
            }
        }
    );

    // Continue leaves movement
    gsap.to('.parallax-leaves-left-layer', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.parallax-hero-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Powder explosion layer - fastest movement with fade in effect
    gsap.fromTo('.powder-img',
        {
            y: -50,
            opacity: 0,
            scale: 0.5
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.parallax-hero-section',
                start: 'top 50%',
                end: 'top 10%',
                scrub: 1
            }
        }
    );

    // Powder continues to move faster
    gsap.to('.parallax-powder-layer', {
        yPercent: -60,
        ease: 'none',
        scrollTrigger: {
            trigger: '.parallax-hero-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Parallax hero content fade in
    gsap.fromTo('.parallax-hero-content',
        {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.parallax-hero-section',
                start: 'top 60%',
                end: 'top 30%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Add floating animation to powder
    gsap.to('.powder-img', {
        y: '+=20',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Add subtle rotation to leaves
    gsap.to('.leaves-left-img', {
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// ===== PRODUCT CARDS ANIMATION =====
gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power2.out'
    });
});

// ===== STATS COUNTER =====
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2;
    
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        innerText: target,
        duration: duration,
        snap: { innerText: 1 },
        ease: 'power1.out',
        onUpdate: function() {
            element.innerText = Math.ceil(element.innerText).toLocaleString();
        }
    });
};

document.querySelectorAll('.stat-number').forEach(animateCounter);

// ===== TESTIMONIALS ANIMATION =====
gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power2.out'
    });
});

// ===== NEWSLETTER ANIMATION =====
gsap.from('.newsletter-content', {
    scrollTrigger: {
        trigger: '.newsletter-section',
        start: 'top 75%',
        end: 'top 50%',
        toggleActions: 'play none none reverse'
    },
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.4)'
});

// ===== FOOTER ANIMATION =====
gsap.from('.footer-col', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 85%',
        toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
});

// ===== LAZY LOADING IMAGES =====
const lazyImages = document.querySelectorAll('.lazy-img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVIGATION ACTIVE STATE =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== ADD TO CART FUNCTIONALITY =====
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Animate cart button
        gsap.fromTo(cartCountElement, 
            { scale: 1.5, backgroundColor: '#d4af37' },
            { scale: 1, backgroundColor: '#d4af37', duration: 0.5, ease: 'elastic.out(1, 0.5)' }
        );
        
        // Show success message
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        
        showNotification(`${productName} added to cart!`);
    });
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    gsap.fromTo(notification,
        { x: 400, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
    
    setTimeout(() => {
        gsap.to(notification, {
            x: 400,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }, 3000);
}

// ===== NEWSLETTER FORM HANDLER =====
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter-input').value;
    
    if (email) {
        showNotification('Thank you for subscribing!');
        this.reset();
    }
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenu = document.querySelector('.mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// ===== FLOATING LEAVES ANIMATION =====
gsap.utils.toArray('.leaf').forEach((leaf, i) => {
    gsap.to(leaf, {
        y: '110vh',
        x: () => Math.random() * 100 - 50,
        rotation: 360,
        duration: () => 15 + Math.random() * 5,
        repeat: -1,
        delay: i * 3,
        ease: 'none'
    });
});

// ===== PRODUCT QUICK VIEW =====
document.querySelectorAll('.btn-quick-view').forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        showNotification(`Quick View: ${productName} - ${productPrice}`);
    });
});

// ===== SCROLL REVEAL ANIMATIONS FOR SECTIONS =====
const revealSections = gsap.utils.toArray('.story-section, .collection-section, .testimonials-section');

revealSections.forEach(section => {
    gsap.from(section.querySelector('.section-header'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// ===== SECTION TAG ANIMATIONS =====
gsap.utils.toArray('.section-tag').forEach(tag => {
    gsap.from(tag, {
        scrollTrigger: {
            trigger: tag,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
    });
});

// ===== BUTTON HOVER ANIMATIONS =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ===== PARALLAX MOUSE MOVEMENT FOR CUP =====
if (parallaxSection) {
    parallaxSection.addEventListener('mousemove', (e) => {
        const rect = parallaxSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const moveX = (x - rect.width / 2) * 0.02;
        const moveY = (y - rect.height / 2) * 0.02;
        
        gsap.to('.cup-img', {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: 'power2.out'
        });
        
        // Opposite movement for powder for depth
        gsap.to('.powder-img', {
            x: -moveX * 0.5,
            y: -moveY * 0.5,
            duration: 1,
            ease: 'power2.out'
        });
    });
}

console.log('Premium Tea Website - Multi-Layer Parallax Version Loaded! 🍃✨');