const images = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
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
        const currentImg = images[currentIndex];
        if (currentImg) {
            lightboxImg.src = currentImg.src;
            const parentCard = currentImg.closest('.gallery-item');
            if (parentCard) {
                const captionElement = parentCard.querySelector('.gallery-caption');
                if (captionElement && lightboxCaption) {
                    lightboxCaption.textContent = captionElement.textContent;
                }
            } else if (lightboxCaption) {
                lightboxCaption.textContent = "";
            }
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
        if (e.target === lightbox || e.target.classList.contains('lb-content') || e.target.classList.contains('lb-caption')) {
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
