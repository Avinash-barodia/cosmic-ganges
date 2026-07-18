document.addEventListener("DOMContentLoaded", () => {
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
});

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
