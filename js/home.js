document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logoImage');
    const topAlert = document.getElementById('topAlert');
    
    function handleNavbar() {
        let alertHeight = 0;
        if (topAlert && document.body.contains(topAlert)) {
            alertHeight = topAlert.offsetHeight;
        }

        // Adjust navbar top position based on scroll and alert height
        let scrollY = window.scrollY;
        let navTop = Math.max(0, alertHeight - scrollY);
        navbar.style.top = `${navTop}px`;

        // If screen is 1199px or less (tablet/mobile), navbar is always white
        if (window.innerWidth <= 1199) {
            navbar.classList.remove('bg-transparent', 'navbar-dark');
            navbar.classList.add('bg-white', 'navbar-light', 'shadow-sm', 'scrolled');
            logo.src = '../images/logo_dark.png';
            return;
        }
        
        // Desktop scroll behavior
        if (window.scrollY > 50) {
            navbar.classList.remove('bg-transparent', 'navbar-dark');
            navbar.classList.add('bg-white', 'navbar-light', 'shadow-sm', 'scrolled');
            logo.src = '../images/logo_dark.png';
        } else {
            // Back to top
            navbar.classList.remove('bg-white', 'navbar-light', 'shadow-sm', 'scrolled');
            navbar.classList.add('bg-transparent', 'navbar-dark');
            logo.src = '../images/logo.png';
        }
    }

    // Handle alert dismissal to immediately update navbar position
    if (topAlert) {
        topAlert.addEventListener('closed.bs.alert', function () {
            handleNavbar();
        });
    }

    // Go to top logic
    const goToTopBtn = document.getElementById('goToTopBtn');
    if (goToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                goToTopBtn.classList.remove('d-none');
            } else {
                goToTopBtn.classList.add('d-none');
            }
        });

        goToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    window.addEventListener('scroll', handleNavbar);
    window.addEventListener('resize', handleNavbar);
    handleNavbar(); // Initialize on load

    // Newsletter Popup Logic
    const newsletterModalEl = document.getElementById('newsletterModal');
    if (newsletterModalEl) {
        const newsletterModal = new bootstrap.Modal(newsletterModalEl);
        
        // Show if not shown in this session (when opened website after closing it)
        if (!sessionStorage.getItem('newsletterShown')) {
            // Show after a slight delay for better UX
            setTimeout(() => {
                newsletterModal.show();
                sessionStorage.setItem('newsletterShown', 'true');
            }, 1000);
        }
    }

    // Return Popup Logic
    const returnPopupEl = document.getElementById('returnPopup');
    if (returnPopupEl) {
        const returnPopup = new bootstrap.Offcanvas(returnPopupEl);
        let hasLeft = false;
        
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'hidden') {
                hasLeft = true;
            } else if (document.visibilityState === 'visible' && hasLeft) {
                // User came back
                returnPopup.show();
                hasLeft = false; // Reset so it doesn't keep showing continuously
            }
        });
    }

    // Instagram Slider Logic
    const igTrack = document.querySelector('.ig-slider-track');
    const igPrev = document.querySelector('.ig-prev-btn');
    const igNext = document.querySelector('.ig-next-btn');

    if (igTrack && igPrev && igNext) {
        igNext.addEventListener('click', () => {
            const slideWidth = igTrack.querySelector('.ig-slide').clientWidth;
            igTrack.scrollBy({ left: slideWidth, behavior: 'smooth' });
        });

        igPrev.addEventListener('click', () => {
            const slideWidth = igTrack.querySelector('.ig-slide').clientWidth;
            igTrack.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        });
    }
});