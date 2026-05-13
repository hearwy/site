const images = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const backToTopBtn = document.getElementById('backToTop');

let currentIndex = 0;

if (lightbox) {
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    images.forEach((img, index) => {
        const clickTarget = img.parentElement.classList.contains('gallery-item') ? img.parentElement : img;
        clickTarget.addEventListener('click', (e) => {
            e.preventDefault();
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            currentIndex = index;
            updateLightbox();
        });
    });

    function updateLightbox() {
        if (images[currentIndex]) {
            lightboxImg.src = images[currentIndex].src;
        }
    }

    if (nextBtn) {
        nextBtn.onclick = (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateLightbox();
        };
    }

    if (prevBtn) {
        prevBtn.onclick = (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightbox();
        };
    }

    if (closeBtn) {
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            closeLightbox();
        };
    }

    lightbox.onclick = (e) => {
        if (e.target === lightbox || e.target.classList.contains('lb-content')) {
            closeLightbox();
        }
    };
}

if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 200) {
            backToTopBtn.style.display = "flex";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
}