/**
 * SiteForge Animations Library
 * Библиотека анимаций и интерактивных эффектов для конструктора сайтов
 * @version 1.0.0
 * @author Grounsr
 */

const SFAnimations = {
    // Текущие настройки анимаций
    settings: {
        duration: 300,
        easing: 'ease-out',
        threshold: 0.1
    },

    /**
     * Инициализация всех анимаций на странице
     */
    init() {
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initParallax();
        this.initTypewriter();
        this.initCounters();
        console.log('SiteForge Animations initialized');
    },

    /**
     * Анимации при скролле (Scroll Reveal)
     */
    initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: this.settings.threshold
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animation = el.dataset.animation || 'fadeIn';
                    const delay = el.dataset.delay || 0;
                    
                    setTimeout(() => {
                        el.classList.add('sf-animated', `sf-${animation}`);
                    }, delay);
                    
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-animate]').forEach(el => {
            el.classList.add('sf-hidden');
            observer.observe(el);
        });
    },

    /**
     * Hover эффекты для карточек и кнопок
     */
    initHoverEffects() {
        // 3D Tilt эффект для карточек
        document.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });

        // Magnetic кнопки
        document.querySelectorAll('[data-magnetic]').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    },

    /**
     * Параллакс эффект
     */
    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    },

    /**
     * Эффект печатной машинки
     */
    initTypewriter() {
        document.querySelectorAll('[data-typewriter]').forEach(el => {
            const text = el.dataset.typewriter || el.textContent;
            const speed = parseInt(el.dataset.speed) || 50;
            el.textContent = '';
            el.style.borderRight = '2px solid currentColor';
            
            let i = 0;
            const type = () => {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    el.style.borderRight = 'none';
                }
            };
            
            // Запуск при видимости
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    type();
                    observer.disconnect();
                }
            });
            observer.observe(el);
        });
    },

    /**
     * Анимированные счётчики
     */
    initCounters() {
        document.querySelectorAll('[data-counter]').forEach(el => {
            const target = parseInt(el.dataset.counter) || 0;
            const duration = parseInt(el.dataset.duration) || 2000;
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    this.animateCounter(el, target, duration, prefix, suffix);
                    observer.disconnect();
                }
            });
            observer.observe(el);
        });
    },

    /**
     * Анимация счётчика
     */
    animateCounter(el, target, duration, prefix, suffix) {
        const start = 0;
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.floor(start + (target - start) * easeProgress);
            
            el.textContent = prefix + current.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    },

    /**
     * Добавить CSS анимации динамически
     */
    injectStyles() {
        if (document.getElementById('sf-animations-styles')) return;
        
        const styles = `
            .sf-hidden { opacity: 0; }
            .sf-animated { transition: all 0.6s ease-out; }
            
            .sf-fadeIn { opacity: 1 !important; }
            
            .sf-fadeInUp { 
                opacity: 1 !important; 
                transform: translateY(0) !important; 
            }
            .sf-hidden[data-animate="fadeInUp"] { transform: translateY(40px); }
            
            .sf-fadeInDown { 
                opacity: 1 !important; 
                transform: translateY(0) !important; 
            }
            .sf-hidden[data-animate="fadeInDown"] { transform: translateY(-40px); }
            
            .sf-fadeInLeft { 
                opacity: 1 !important; 
                transform: translateX(0) !important; 
            }
            .sf-hidden[data-animate="fadeInLeft"] { transform: translateX(-40px); }
            
            .sf-fadeInRight { 
                opacity: 1 !important; 
                transform: translateX(0) !important; 
            }
            .sf-hidden[data-animate="fadeInRight"] { transform: translateX(40px); }
            
            .sf-zoomIn { 
                opacity: 1 !important; 
                transform: scale(1) !important; 
            }
            .sf-hidden[data-animate="zoomIn"] { transform: scale(0.8); }
            
            .sf-bounce {
                animation: sf-bounce 0.6s ease;
            }
            
            @keyframes sf-bounce {
                0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
                40%, 43% { transform: translate3d(0, -20px, 0); }
                70% { transform: translate3d(0, -10px, 0); }
                90% { transform: translate3d(0, -4px, 0); }
            }
            
            [data-tilt], [data-magnetic] {
                transition: transform 0.2s ease-out;
            }
        `;
        
        const styleEl = document.createElement('style');
        styleEl.id = 'sf-animations-styles';
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);
    }
};

// Автоматическая инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    SFAnimations.injectStyles();
    SFAnimations.init();
});

// Экспорт для использования в builder
if (typeof window !== 'undefined') {
    window.SFAnimations = SFAnimations;
}
