document.addEventListener('DOMContentLoaded', ()=>{
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');

if(!header || !hero){
    return;
}
 const heroHeight = hero.offsetHeight;

    window.addEventListener('scroll', () => {
        if(window.scrollY >= heroHeight) {
            header.classList.add('fixed');
        }
        else {
            header.classList.remove('fixed');
        }
    });

    const burgerBtn = document.querySelector('.burger-btn');
    const nav = document.querySelector('.nav');

    if (burgerBtn && nav) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    const reviewsContainer = document.querySelector('.reviews');
    if (reviewsContainer) {
        const reviewsItems = reviewsContainer.querySelectorAll('.reviews-item');
        const prevBtn = document.querySelector('.slider-arrows-prev');
        const nextBtn = document.querySelector('.slider-arrows-next');

        if (reviewsItems.length > 1) {
            let currentIndex = 0;
            const autoplay = reviewsContainer.dataset.autoplay === 'true';
            const delay = parseInt(reviewsContainer.dataset.delay) || 5000;

           
            reviewsItems.forEach(item => {
                item.style.position = 'absolute';
                item.style.top = '0';
                item.style.left = '0';
                item.style.width = '100%';
                item.style.opacity = '0';
                item.style.transition = 'opacity 0.5s ease';
            });
            reviewsItems[0].style.opacity = '1';

            const setReviewsHeight = () => {
                const currentHeight = reviewsItems[currentIndex].offsetHeight;
                reviewsContainer.style.height = currentHeight + 'px';
            };

           
            setReviewsHeight();

            const showSlide = (index) => {
                reviewsItems.forEach((item, i) => {
                    item.style.opacity = i === index ? '1' : '0';
                });
                currentIndex = index;
                setReviewsHeight();
            };

            const nextSlide = () => {
                const nextIndex = (currentIndex + 1) % reviewsItems.length;
                showSlide(nextIndex);
            };

            const prevSlide = () => {
                const prevIndex = (currentIndex - 1 + reviewsItems.length) % reviewsItems.length;
                showSlide(prevIndex);
            };

            if (prevBtn) {
                prevBtn.addEventListener('click', prevSlide);
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', nextSlide);
            }

            window.addEventListener('resize', setReviewsHeight);

            if (autoplay) {
                let autoplayInterval = setInterval(nextSlide, delay);

                // Pause on hover
                reviewsContainer.addEventListener('mouseenter', () => {
                    clearInterval(autoplayInterval);
                });

                reviewsContainer.addEventListener('mouseleave', () => {
                    autoplayInterval = setInterval(nextSlide, delay);
                });
            }
        }
    }

    // Gallery Title and Image Slider
    const galleryTitle = document.querySelector('.gallery-title');
    const galleryPhotos = document.querySelectorAll('.gallery-photo');
    if (galleryTitle && galleryPhotos.length > 0) {
        const titles = JSON.parse(galleryTitle.dataset.titles || '[]');
        if (titles.length > 0) {
            let currentIndex = 0;
            const updateGallery = () => {
                galleryTitle.textContent = titles[currentIndex];
                galleryPhotos.forEach((photo, index) => {
                    photo.style.opacity = index === currentIndex ? '1' : '0';
                });
                currentIndex = (currentIndex + 1) % titles.length;
            };
            updateGallery(); // Initial
            setInterval(updateGallery, 3000);
        }
    }
});