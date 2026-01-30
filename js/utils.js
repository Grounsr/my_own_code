/**
 * SiteForge Utilities
 * Полезные утилиты для работы с DOM, валидацией и форматированием
 * @version 1.0.0
 * @author Grounsr
 */

const SFUtils = {
    /**
     * DOM Утилиты
     */
    dom: {
        // Создать элемент с атрибутами
        create(tag, attrs = {}, children = []) {
            const el = document.createElement(tag);
            Object.entries(attrs).forEach(([key, value]) => {
                if (key === 'className') el.className = value;
                else if (key === 'innerHTML') el.innerHTML = value;
                else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), value);
                else el.setAttribute(key, value);
            });
            children.forEach(child => {
                el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
            });
            return el;
        },

        // Плавная прокрутка к элементу
        scrollTo(element, duration = 500) {
            const target = typeof element === 'string' ? document.querySelector(element) : element;
            if (!target) return;
            
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = SFUtils.easing.easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            requestAnimationFrame(animation);
        },

        // Проверка видимости элемента
        isInView(element, threshold = 0) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= threshold &&
                rect.left >= threshold &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - threshold &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) - threshold
            );
        }
    },

    /**
     * Валидация
     */
    validate: {
        email(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },

        url(url) {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        },

        phone(phone) {
            return /^[\d\s+()-]{10,}$/.test(phone);
        },

        required(value) {
            return value !== null && value !== undefined && value.toString().trim() !== '';
        },

        minLength(value, min) {
            return value && value.length >= min;
        },

        maxLength(value, max) {
            return value && value.length <= max;
        },

        pattern(value, regex) {
            return regex.test(value);
        }
    },

    /**
     * Форматирование
     */
    format: {
        number(num, decimals = 0) {
            return Number(num).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        currency(amount, currency = 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
            }).format(amount);
        },

        date(date, format = 'short') {
            const d = new Date(date);
            const options = {
                short: { year: 'numeric', month: 'short', day: 'numeric' },
                long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
                time: { hour: '2-digit', minute: '2-digit' }
            };
            return d.toLocaleDateString('en-US', options[format] || options.short);
        },

        truncate(str, length = 50, suffix = '...') {
            return str.length > length ? str.substring(0, length) + suffix : str;
        },

        slug(str) {
            return str
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
    },

    /**
     * Easing функции для анимаций
     */
    easing: {
        linear(t, b, c, d) {
            return c * t / d + b;
        },
        easeInQuad(t, b, c, d) {
            t /= d;
            return c * t * t + b;
        },
        easeOutQuad(t, b, c, d) {
            t /= d;
            return -c * t * (t - 2) + b;
        },
        easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
    },

    /**
     * Дебаунс и троттлинг
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit = 300) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Работа с URL
     */
    url: {
        getParams(url = window.location.href) {
            const params = {};
            const searchParams = new URL(url).searchParams;
            searchParams.forEach((value, key) => {
                params[key] = value;
            });
            return params;
        },

        updateParam(key, value) {
            const url = new URL(window.location);
            url.searchParams.set(key, value);
            window.history.pushState({}, '', url);
        },

        removeParam(key) {
            const url = new URL(window.location);
            url.searchParams.delete(key);
            window.history.pushState({}, '', url);
        }
    },

    /**
     * Работа с куки
     */
    cookie: {
        set(name, value, days = 7) {
            const expires = new Date(Date.now() + days * 864e5).toUTCString();
            document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
        },

        get(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
            return null;
        },

        delete(name) {
            this.set(name, '', -1);
        }
    },

    /**
     * Случайные утилиты
     */
    random: {
        number(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        string(length = 10) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        },

        uuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        color() {
            return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        }
    },

    /**
     * Копирование в буфер
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                return true;
            } catch (err2) {
                return false;
            } finally {
                document.body.removeChild(textArea);
            }
        }
    },

    /**
     * Задержка (промис)
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// Экспорт для использования в builder
if (typeof window !== 'undefined') {
    window.SFUtils = SFUtils;
}
