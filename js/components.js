function initComponents() {
    // Inject Navbar
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    if (navbarPlaceholder) {
        fetch("components/navbar.html")
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                highlightActiveNav();
                initMobileMenu();
            })
            .catch(error => console.error("Error loading navbar:", error));
    }

    // Inject Footer
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        fetch("components/footer.html")
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error("Error loading footer:", error));
    }
    
    // Initialize Global Popup
    initGlobalPopup();
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initComponents);
} else {
    initComponents();
}

function highlightActiveNav() {
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentPath = window.location.pathname.split('/').pop();
    
    // Default to index.html if root path
    if (currentPath === '') {
        currentPath = 'index.html';
    }

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

function initGlobalPopup() {
    const pagePath = window.location.pathname;
    const hasSeenPopup = sessionStorage.getItem(`seen_popup_${pagePath}`);
    
    if (!hasSeenPopup) {
        // Mark as seen
        sessionStorage.setItem(`seen_popup_${pagePath}`, 'true');
        
        // Wait a short moment before showing
        setTimeout(() => {
            const popupOverlay = document.createElement('div');
            popupOverlay.className = 'global-popup-overlay';
            
            const popupHTML = `
                <style>
                    .global-popup-overlay {
                        position: fixed;
                        top: 0; left: 0; right: 0; bottom: 0;
                        background: rgba(0,0,0,0.6);
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                        opacity: 0;
                        transition: opacity 0.5s ease;
                        padding: 20px;
                    }
                    .global-popup-card {
                        background: linear-gradient(135deg, #f0e1d8 0%, #e2c8c6 50%, #b2bed3 100%);
                        border-radius: 40px;
                        padding: 5rem 3rem;
                        max-width: 750px;
                        width: 100%;
                        text-align: center;
                        box-shadow: 0 25px 60px rgba(0,0,0,0.25);
                        position: relative;
                        transform: translateY(30px) scale(0.95);
                        transition: transform 0.6s cubic-bezier(.22,.61,.36,1);
                    }
                    .global-popup-overlay.show {
                        opacity: 1;
                    }
                    .global-popup-overlay.show .global-popup-card {
                        transform: translateY(0) scale(1);
                    }
                    .popup-close-btn {
                        position: absolute;
                        top: 25px;
                        right: 25px;
                        background: rgba(0,0,0,0.05);
                        border: none;
                        width: 44px;
                        height: 44px;
                        border-radius: 50%;
                        font-size: 24px;
                        cursor: pointer;
                        color: #423730;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;
                    }
                    .popup-close-btn:hover {
                        background: rgba(0,0,0,0.15);
                        transform: rotate(90deg);
                    }
                    .btn-golden-glow-popup {
                        position: relative;
                        display: inline-block;
                        padding: 16px 36px;
                        background: #3B372E;
                        color: #FBF6EC;
                        text-decoration: none;
                        border-radius: 40px;
                        font-family: var(--font-sans, sans-serif);
                        font-size: 15px;
                        font-weight: 500;
                        letter-spacing: 0.01em;
                        isolation: isolate;
                        overflow: hidden;
                        transition: transform 0.5s cubic-bezier(.22,.61,.36,1), box-shadow 0.5s cubic-bezier(.22,.61,.36,1);
                    }
                    .btn-golden-glow-popup::before {
                        content: '';
                        position: absolute; 
                        inset: 0; 
                        z-index: -1;
                        background: radial-gradient(120px 90px at var(--mx,50%) var(--my,50%), #C9A65B, transparent 70%);
                        opacity: 0; 
                        transition: opacity 0.5s ease;
                    }
                    .btn-golden-glow-popup:hover::before {
                        opacity: 0.55;
                    }
                    .btn-golden-glow-popup:hover {
                        transform: translateY(-2px); 
                        box-shadow: 0 14px 34px rgba(60,45,20,0.22);
                    }
                    
                    @media (max-width: 768px) {
                        .global-popup-card { padding: 3rem 1.5rem; }
                        .global-popup-card h2 { font-size: 2.2rem !important; }
                        .global-popup-card p { font-size: 1.05rem !important; }
                    }
                </style>
                <div class="global-popup-card" onclick="event.stopPropagation()">
                    <button class="popup-close-btn" aria-label="Close">&times;</button>
                    <p style="text-transform: uppercase; letter-spacing: 0.22em; font-size: 0.75rem; color: #7f6e62; font-weight: 600; font-family: var(--font-sans, sans-serif); margin-bottom: 1.5rem;">Whenever You're Ready</p>
                    <h2 style="color: #423730; font-size: 3.2rem; margin-bottom: 1.5rem; font-style: italic; font-weight: 400; line-height: 1.2; font-family: var(--font-serif, serif);">
                        Whenever you're ready, not a moment before.
                    </h2>
                    <p style="color: #423730; font-size: 1.25rem; opacity: 0.85; font-family: var(--font-sans, sans-serif); margin-bottom: 2.5rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                        There's no wrong time to begin, and no pressure to decide today.
                    </p>
                    <div style="position: relative; display: inline-block; margin-bottom: 2rem;">
                        <a href="https://wa.me/919823183363?text=Hi%20Neelam%2C%20I%20would%20like%20to%20reserve%20my%20healing%20space." target="_blank" class="btn-golden-glow-popup">
                            Reserve Your Healing Space
                        </a>
                    </div>
                    <p style="color: #423730; font-size: 1rem; opacity: 0.75; font-family: var(--font-sans, sans-serif); max-width: 500px; line-height: 1.5; margin: 0 auto;">
                        <strong>Free 10-minute</strong> conversation before any session, so we can make sure this feels right for you.
                    </p>
                </div>
            `;
            
            popupOverlay.innerHTML = popupHTML;
            document.body.appendChild(popupOverlay);
            
            // Add mousemove listener for golden glow
            const btn = popupOverlay.querySelector('.btn-golden-glow-popup');
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                btn.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
                btn.style.setProperty('--my', (e.clientY - rect.top) + 'px');
            });
            
            // Trigger animation
            requestAnimationFrame(() => {
                popupOverlay.classList.add('show');
            });
            
            // Close logic
            const closeBtn = popupOverlay.querySelector('.popup-close-btn');
            const closePopup = () => {
                popupOverlay.classList.remove('show');
                setTimeout(() => popupOverlay.remove(), 500);
            };
            
            closeBtn.addEventListener('click', closePopup);
            popupOverlay.addEventListener('click', closePopup);
            
        }, 1200);
    }
}
