// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Плавная прокрутка для всех ссылок с якорями
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Добавление активного класса к текущему разделу
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        if (scrollY >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Анимация при загрузке страницы
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
// ... существующий код ...

// Анимация статистики
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 20);
    });
}

// Запуск анимации при прокрутке к секции
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('#stats');
if (statsSection) {
    observer.observe(statsSection);
} // Универсальный слайдер для всех событий
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.event-slider');
    
    sliders.forEach((slider, index) => {
        const track = slider.querySelector('.slider-track');
        const slides = slider.querySelectorAll('.slider-slide');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        const dotsContainer = slider.querySelector('.slider-dots');
        
        if (!track || slides.length === 0) return;
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        // Создаем точки
        dotsContainer.innerHTML = ''; // очищаем (на случай если есть старые)
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            dot.dataset.index = i;
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        
        const dots = slider.querySelectorAll('.slider-dot');
        
        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            track.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        }
        
        // Свайп для мобильных
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        track.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) {
                goToSlide(currentIndex + 1);
            } else if (touchEndX > touchStartX + 50) {
                goToSlide(currentIndex - 1);
            }
        }, {passive: true});
    });
});