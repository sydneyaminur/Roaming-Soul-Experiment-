// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observe feature cards
    document.querySelectorAll('.feature, .visit-card, .team-member').forEach(card => {
        observer.observe(card);
    });
});

// Navigation active state
document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced parallax effect for hero section
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-image img');
    const heroSection = document.querySelector('.hero-section');
    
    if (hero && heroSection) {
        // Calculate parallax offset (slower movement)
        const parallaxSpeed = 0.5;
        const yPos = scrolled * parallaxSpeed;
        
        // Apply transform with GPU acceleration
        hero.style.transform = `translate3d(0, ${yPos}px, 0)`;
        
        // Add fade effect as user scrolls down
        const heroHeight = heroSection.offsetHeight;
        const opacity = Math.max(0, 1 - (scrolled / heroHeight) * 1.5);
        heroSection.style.opacity = opacity;
    }
    
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Smooth parallax on scroll
window.addEventListener('scroll', requestParallaxUpdate);

// Enhanced smooth scrolling for team images only
document.addEventListener('DOMContentLoaded', function() {
    const elementsToParallax = document.querySelectorAll('.team-image');
    
    function updateElementParallax() {
        const scrolled = window.pageYOffset;
        
        elementsToParallax.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate parallax offset for each element
                const speed = 0.1 + (index * 0.02);
                const yPos = (scrolled - elementTop) * speed;
                
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }
    
    let parallaxTicking = false;
    
    function requestElementParallax() {
        if (!parallaxTicking) {
            requestAnimationFrame(updateElementParallax);
            parallaxTicking = true;
            setTimeout(() => { parallaxTicking = false; }, 16);
        }
    }
    
    window.addEventListener('scroll', requestElementParallax);
});

// Card hover animations
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.visit-card, .feature, .team-member');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('team-member')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            } else {
                this.style.transform = 'translateY(-5px)';
            }
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
    });
});

// Button click animations
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.read-more-btn, .contact-form button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Typing animation for subtitle only
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                element.classList.add('typing-complete');
            }, 1000);
        }
    }
    type();
}

// Initialize animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle && heroSubtitle) {
        heroTitle.style.opacity = '1';
        heroSubtitle.style.opacity = '0';
        setTimeout(() => {
            typeWriter(heroSubtitle, 'Journey Beyond Maps, Discover the Heart of Every Place', 50);
        }, 1000);
    }
});

// Create animated background
document.addEventListener('DOMContentLoaded', function() {
    createAnimatedBackground();
});

function createAnimatedBackground() {
    const animatedBg = document.createElement('div');
    animatedBg.className = 'animated-background';
    document.body.appendChild(animatedBg);

    const elements = [
        { icon: '🏔️', name: 'mountain' },
        { icon: '🌲', name: 'tree' },
        { icon: '🦅', name: 'eagle' },
        { icon: '⛰️', name: 'peak' },
        { icon: '🏕️', name: 'camp' },
        { icon: '🧭', name: 'compass' },
        { icon: '🎒', name: 'backpack' },
        { icon: '🏞️', name: 'landscape' },
        { icon: '🌟', name: 'star' },
        { icon: '☁️', name: 'cloud' }
    ];

    // Create floating elements
    for (let i = 0; i < 15; i++) {
        const element = elements[Math.floor(Math.random() * elements.length)];
        createFloatingElement(animatedBg, element.icon, element.name, i);
    }

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(animatedBg, i);
    }
}

function createFloatingElement(container, icon, name, index) {
    const floatingEl = document.createElement('div');
    floatingEl.className = `floating-element floating-${name}`;
    floatingEl.innerHTML = icon;
    
    floatingEl.style.left = Math.random() * 100 + '%';
    floatingEl.style.animationDelay = Math.random() * 20 + 's';
    floatingEl.style.animationDuration = (15 + Math.random() * 10) + 's';
    
    const size = 20 + Math.random() * 30;
    floatingEl.style.fontSize = size + 'px';
    
    container.appendChild(floatingEl);
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (10 + Math.random() * 5) + 's';
    
    const size = 2 + Math.random() * 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
}

// Enhanced animated background with section-specific effects
document.addEventListener('DOMContentLoaded', function() {
    createSectionSpecificBackgrounds();
});

function createSectionSpecificBackgrounds() {
    const sections = ['hero', 'about', 'adventures', 'team', 'contact'];
    
    sections.forEach(sectionName => {
        createSectionBackground(sectionName);
    });
}

function createSectionBackground(sectionName) {
    // Create container for each section's animated elements
    const animatedBg = document.createElement('div');
    animatedBg.className = `animated-background animated-bg-${sectionName}`;
    document.body.appendChild(animatedBg);

    // Section-specific elements
    const sectionElements = {
        hero: [
            { icon: '🏔️', name: 'mountain' },
            { icon: '🌟', name: 'star' },
            { icon: '☁️', name: 'cloud' },
            { icon: '🦅', name: 'eagle' }
        ],
        about: [
            { icon: '🧭', name: 'compass' },
            { icon: '🎒', name: 'backpack' },
            { icon: '🌲', name: 'tree' },
            { icon: '⛰️', name: 'peak' }
        ],
        adventures: [
            { icon: '🏕️', name: 'camp' },
            { icon: '🚁', name: 'helicopter' },
            { icon: '🏞️', name: 'landscape' },
            { icon: '🌿', name: 'leaf' }
        ],
        team: [
            { icon: '🏛️', name: 'temple' },
            { icon: '🎯', name: 'target' },
            { icon: '🗺️', name: 'map' },
            { icon: '💫', name: 'sparkle' }
        ],
        contact: [
            { icon: '📧', name: 'mail' },
            { icon: '✈️', name: 'plane' },
            { icon: '🌍', name: 'earth' },
            { icon: '💌', name: 'letter' }
        ]
    };

    const elements = sectionElements[sectionName] || sectionElements.hero;

    // Create floating elements for each section
    const elementCount = sectionName === 'hero' ? 12 : 8;
    for (let i = 0; i < elementCount; i++) {
        const element = elements[Math.floor(Math.random() * elements.length)];
        createSectionFloatingElement(animatedBg, element.icon, element.name, i, sectionName);
    }

    // Create particles
    const particleCount = sectionName === 'hero' ? 15 : 10;
    for (let i = 0; i < particleCount; i++) {
        createSectionParticle(animatedBg, i, sectionName);
    }
}

function createSectionFloatingElement(container, icon, name, index, sectionName) {
    const floatingEl = document.createElement('div');
    floatingEl.className = `floating-element floating-${name} floating-${sectionName}`;
    floatingEl.innerHTML = icon;
    
    // Random positioning
    floatingEl.style.left = Math.random() * 100 + '%';
    floatingEl.style.animationDelay = Math.random() * 20 + 's';
    
    // Section-specific animation durations
    const durations = {
        hero: 15 + Math.random() * 10,
        about: 18 + Math.random() * 8,
        adventures: 12 + Math.random() * 6,
        team: 20 + Math.random() * 10,
        contact: 16 + Math.random() * 8
    };
    
    floatingEl.style.animationDuration = durations[sectionName] + 's';
    
    // Section-specific sizes
    const sizeRanges = {
        hero: { min: 25, max: 45 },
        about: { min: 18, max: 35 },
        adventures: { min: 22, max: 40 },
        team: { min: 20, max: 38 },
        contact: { min: 16, max: 32 }
    };
    
    const sizeRange = sizeRanges[sectionName];
    const size = sizeRange.min + Math.random() * (sizeRange.max - sizeRange.min);
    floatingEl.style.fontSize = size + 'px';
    
    container.appendChild(floatingEl);
}

function createSectionParticle(container, index, sectionName) {
    const particle = document.createElement('div');
    particle.className = `floating-particle floating-particle-${sectionName}`;
    
    // Random positioning and properties
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    
    // Section-specific particle speeds
    const speeds = {
        hero: 8 + Math.random() * 4,
        about: 12 + Math.random() * 6,
        adventures: 10 + Math.random() * 5,
        team: 14 + Math.random() * 6,
        contact: 11 + Math.random() * 5
    };
    
    particle.style.animationDuration = speeds[sectionName] + 's';
    
    // Section-specific particle sizes
    const particleSizes = {
        hero: 3 + Math.random() * 4,
        about: 2 + Math.random() * 3,
        adventures: 2.5 + Math.random() * 3.5,
        team: 2 + Math.random() * 3,
        contact: 2.5 + Math.random() * 3
    };
    
    const size = particleSizes[sectionName];
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
}

// Enhanced section-specific parallax
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach((section, sectionIndex) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Check if section is in viewport
        if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            const sectionElements = document.querySelectorAll(`.floating-${sectionId}, .floating-particle-${sectionId}`);
            
            sectionElements.forEach((element, index) => {
                const speed = 0.05 + (index % 4) * 0.02;
                const yPos = (scrolled - sectionTop) * speed;
                
                // Add some horizontal movement for variety
                const xPos = Math.sin(scrolled * 0.001 + index) * 10;
                
                element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
            });
        }
    });
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on window resize to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    // Toggle mobile menu with enhanced animations
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.querySelector('main').style.filter = 'blur(2px)';
        } else {
            document.body.style.overflow = '';
            document.querySelector('main').style.filter = 'none';
        }
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add slight delay for better UX
            setTimeout(() => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.querySelector('main').style.filter = 'none';
            }, 200);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !mobileMenuBtn.contains(e.target) && 
            !navMenu.contains(e.target)) {
            
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.querySelector('main').style.filter = 'none';
        }
    });
    
    // Close menu on window resize to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.querySelector('main').style.filter = 'none';
        }
    });
    
    // Add touch support for better mobile experience
    let touchStartY = 0;
    navMenu.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    navMenu.addEventListener('touchmove', function(e) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - touchStartY;
        
        // Close menu if swiped up significantly
        if (deltaY < -100) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.querySelector('main').style.filter = 'none';
        }
    });
});

// Enhanced Mobile Navigation with List Animation
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navItems = document.querySelectorAll('.nav-menu li');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = this.classList.contains('active');
        
        if (!isActive) {
            // Opening menu
            this.classList.add('active');
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Blur background content
            const main = document.querySelector('main');
            if (main) main.style.filter = 'blur(2px)';
            
        } else {
            // Closing menu
            this.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Remove blur
            const main = document.querySelector('main');
            if (main) main.style.filter = 'none';
        }
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Small delay for better UX
            setTimeout(() => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                const main = document.querySelector('main');
                if (main) main.style.filter = 'none';
            }, 150);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !mobileMenuBtn.contains(e.target) && 
            !navMenu.contains(e.target)) {
            
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            const main = document.querySelector('main');
            if (main) main.style.filter = 'none';
        }
    });
    
    // Close menu on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            const main = document.querySelector('main');
            if (main) main.style.filter = 'none';
        }
    });
    
    // Touch swipe to close
    let touchStartY = 0;
    navMenu.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    navMenu.addEventListener('touchmove', function(e) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - touchStartY;
        
        // Close if swiped up significantly
        if (deltaY < -100) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            const main = document.querySelector('main');
            if (main) main.style.filter = 'none';
        }
    });
});

// Rest of your existing animations code...
// (Keep all the other functions like scroll animations, card hover animations, etc.)