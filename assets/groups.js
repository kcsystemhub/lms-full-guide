function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function replaceBrokenImage(img) {
    const placeholder = document.createElement('div');
    const fileName = img.getAttribute('src')?.split('/').pop() || img.alt || 'изображение';
    placeholder.className = 'missing-image';
    placeholder.textContent = `Скриншот пока не добавлен: ${fileName}`;
    img.replaceWith(placeholder);
}

function setupImages() {
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.loading = 'lazy';
        }
        if (!img.hasAttribute('decoding')) {
            img.decoding = 'async';
        }

        if (img.complete && img.naturalWidth === 0) {
            replaceBrokenImage(img);
        } else {
            img.addEventListener('error', () => replaceBrokenImage(img), { once: true });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        scrollBtn.style.display = 'none';
        scrollBtn.addEventListener('click', scrollToTop);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    setupImages();
});

window.addEventListener('scroll', () => {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) {
        return;
    }

    scrollBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
});
