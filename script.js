document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect (navbar is injected async, so we observe for it)
    const attachNavbarScroll = () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    };
    // Try immediately, and again after a short delay to catch async-injected navbar
    attachNavbarScroll();
    setTimeout(attachNavbarScroll, 500);

    // 2. Scroll Intersection Observer — runs on EVERY page
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // 3. Slow-moving JS Particles (only on homepage which has #particleCanvas)
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.2;
                this.speedY = (Math.random() - 0.5) * 0.2;
                const colors = ['rgba(201, 168, 76, 0.4)', 'rgba(255, 255, 255, 0.2)', 'rgba(26, 107, 127, 0.3)'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const numParticles = Math.min(window.innerWidth / 15, 100);
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // 4. Premium Cards Expand Logic
    const premiumCards = document.querySelectorAll('.premium-card');
    premiumCards.forEach(card => {
        card.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            premiumCards.forEach(c => c.classList.remove('expanded'));
            if (!isExpanded) {
                card.classList.add('expanded');
            }
        });
    });

    // 5. Testimonial Auto-Slider & Arrows
    const slider = document.getElementById('stories-slider');
    if (slider) {
        const prevBtn = document.querySelector('.prev-arrow');
        const nextBtn = document.querySelector('.next-arrow');
        const scrollAmount = 400;
        let autoSlideInterval;

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
                    slider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 5000);
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => { slider.scrollBy({ left: scrollAmount, behavior: 'smooth' }); resetAutoSlide(); });
            prevBtn.addEventListener('click', () => { slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); resetAutoSlide(); });
        }

        slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        slider.addEventListener('mouseleave', startAutoSlide);
        startAutoSlide();
    }

    // 6. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                faqItems.forEach(i => i.classList.remove('open'));
                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        }
    });

    // 7. Animated Counters (About Page)
    const counters = document.querySelectorAll('.counter-number');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // =========================================================================
    // IOS MOBILE APP RETROFIT INTERACTIONS
    // =========================================================================

    // A. Mobile Splash Screen Fade Out
    const mobileSplash = document.getElementById('mobile-splash');
    if (mobileSplash) {
        // Only run if it's visible (i.e., on mobile)
        if (window.getComputedStyle(mobileSplash).display !== 'none') {
            setTimeout(() => {
                mobileSplash.style.opacity = '0';
                setTimeout(() => {
                    mobileSplash.style.display = 'none';
                }, 1500);
            }, 2500);
        }
    }

    // B. Mobile Overlay Navigation Toggle
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileOverlayMenu = document.getElementById('mobile-overlay-menu');
    const mobileCloseMenu = document.getElementById('mobile-close-menu');
    
    if (mobileNavToggle && mobileOverlayMenu && mobileCloseMenu) {
        const toggleMobileMenu = () => {
            mobileOverlayMenu.classList.toggle('active');
            document.body.style.overflow = mobileOverlayMenu.classList.contains('active') ? 'hidden' : '';
        };

        mobileNavToggle.addEventListener('click', toggleMobileMenu);
        mobileCloseMenu.addEventListener('click', toggleMobileMenu);
        
        // Close menu when a link is clicked
        const menuLinks = mobileOverlayMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMobileMenu);
        });
    }
});
