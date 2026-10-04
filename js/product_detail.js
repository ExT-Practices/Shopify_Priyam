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

const imagesList = ['../images/9.png', '../images/10.png', '../images/11.png'];
let currentImageIndex = 0;

function updateMainImage() {
    let newSrc = imagesList[currentImageIndex];
    document.getElementById('mainProductImage').src = newSrc;
    
    // Update active thumbnail
    let thumbs = document.querySelectorAll('.thumbnail-wrapper');
    thumbs.forEach((el, index) => {
        if (index === currentImageIndex) {
            el.classList.add('active-thumbnail');
            el.classList.remove('border-transparent');
            el.classList.add('border');
        } else {
            el.classList.remove('active-thumbnail');
            el.classList.remove('border');
            el.classList.add('border-transparent');
        }
    });
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + imagesList.length) % imagesList.length;
    updateMainImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesList.length;
    updateMainImage();
}

function zoomImage() {
    document.getElementById('zoomedProductImage').src = imagesList[currentImageIndex];
}

function changeMainImage(src, element) {
    currentImageIndex = imagesList.indexOf(src);
    if(currentImageIndex === -1) currentImageIndex = 0;
    updateMainImage();
}

function incrementQty(btn) {
    let input = btn.previousElementSibling;
    input.value = parseInt(input.value) + 1;
}

function decrementQty(btn) {
    let input = btn.nextElementSibling;
    if(parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Product Tabs/Accordion Logic
document.querySelectorAll('.product-tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if(window.innerWidth < 768) return;
        
        document.querySelectorAll('.product-tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        let target = this.getAttribute('data-target');
        
        document.querySelectorAll('.product-tab-section').forEach(sec => {
            sec.classList.remove('active');
            sec.querySelector('.product-tab-body').style.display = 'none';
        });
        
        let targetSec = document.getElementById('tab-' + target);
        if(targetSec) {
            targetSec.classList.add('active');
            targetSec.querySelector('.product-tab-body').style.display = 'block';
        }
    });
});

document.querySelectorAll('.product-accordion-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        let target = this.getAttribute('data-target');
        let targetSec = document.getElementById('tab-' + target);
        let body = targetSec.querySelector('.product-tab-body');
        let icon = this.querySelector('.accordion-icon');
        
        if (body.style.display === 'block') {
            body.style.display = 'none';
            icon.textContent = '+';
            this.classList.remove('active');
            targetSec.classList.remove('active');
        } else {
            body.style.display = 'block';
            icon.textContent = '-';
            this.classList.add('active');
            targetSec.classList.add('active');
        }
    });
});

window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        document.querySelectorAll('.product-tab-section').forEach(sec => {
            let body = sec.querySelector('.product-tab-body');
            if (sec.classList.contains('active')) {
                body.style.display = 'block';
            } else {
                body.style.display = 'none';
            }
        });
    } else {
        document.querySelectorAll('.product-tab-section').forEach(sec => {
            let body = sec.querySelector('.product-tab-body');
            let icon = sec.querySelector('.accordion-icon');
            if (sec.classList.contains('active') || body.style.display === 'block') {
                body.style.display = 'block';
                icon.textContent = '-';
            } else {
                body.style.display = 'none';
                icon.textContent = '+';
            }
        });
    }
});