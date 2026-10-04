document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById('navbar');
    let navbarHeight = navbar.offsetHeight;
    
    const placeholder = document.createElement('div');
    placeholder.style.height = navbarHeight + 'px';
    placeholder.style.display = 'none';
    navbar.parentNode.insertBefore(placeholder, navbar);

    window.addEventListener('scroll', function() {
        let scrollY = window.scrollY;
        
        if (scrollY >= navbarHeight) {
            if (!navbar.classList.contains('fixed-top')) {
                navbar.classList.add('fixed-top');
                navbar.style.animation = 'slideDown 0.7s ease-in-out forwards';
                placeholder.style.display = 'block';
            }
        } else if (scrollY <= navbarHeight) {
            navbar.classList.remove('fixed-top');
            navbar.style.animation = '';
            placeholder.style.display = 'none';
        }
    });
});

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