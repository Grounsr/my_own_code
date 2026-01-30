/**
 * SiteForge Themes Library
 * Система тем и управления цветовыми схемами
 * @version 1.0.0
 * @author Grounsr
 */

const SFThemes = {
    // Предустановленные темы
    presets: {
        'modern-dark': {
            name: 'Modern Dark',
            colors: {
                primary: '#6366f1',
                secondary: '#8b5cf6',
                accent: '#22d3ee',
                background: '#0f172a',
                surface: '#1e293b',
                text: '#f8fafc',
                textMuted: '#94a3b8'
            }
        },
        'ocean-blue': {
            name: 'Ocean Blue',
            colors: {
                primary: '#0ea5e9',
                secondary: '#06b6d4',
                accent: '#f472b6',
                background: '#0c4a6e',
                surface: '#075985',
                text: '#f0f9ff',
                textMuted: '#7dd3fc'
            }
        },
        'forest-green': {
            name: 'Forest Green',
            colors: {
                primary: '#22c55e',
                secondary: '#10b981',
                accent: '#fbbf24',
                background: '#14532d',
                surface: '#166534',
                text: '#f0fdf4',
                textMuted: '#86efac'
            }
        },
        'sunset-orange': {
            name: 'Sunset Orange',
            colors: {
                primary: '#f97316',
                secondary: '#ef4444',
                accent: '#eab308',
                background: '#431407',
                surface: '#7c2d12',
                text: '#fff7ed',
                textMuted: '#fed7aa'
            }
        },
        'minimal-light': {
            name: 'Minimal Light',
            colors: {
                primary: '#3b82f6',
                secondary: '#6366f1',
                accent: '#ec4899',
                background: '#ffffff',
                surface: '#f8fafc',
                text: '#1e293b',
                textMuted: '#64748b'
            }
        },
        'neon-cyber': {
            name: 'Neon Cyber',
            colors: {
                primary: '#00ff88',
                secondary: '#ff00ff',
                accent: '#00ffff',
                background: '#0a0a0a',
                surface: '#1a1a2e',
                text: '#eeffff',
                textMuted: '#88ffaa'
            }
        }
    },

    currentTheme: null,

    /**
     * Инициализация системы тем
     */
    init() {
        const saved = localStorage.getItem('sf-theme');
        if (saved) {
            this.apply(saved);
        }
        console.log('SiteForge Themes initialized');
    },

    /**
     * Применить тему
     * @param {string} themeId - ID темы из presets
     */
    apply(themeId) {
        const theme = this.presets[themeId];
        if (!theme) {
            console.warn(`Theme "${themeId}" not found`);
            return;
        }

        this.currentTheme = themeId;
        this.setColors(theme.colors);
        localStorage.setItem('sf-theme', themeId);
        
        document.dispatchEvent(new CustomEvent('sf-theme-change', {
            detail: { themeId, theme }
        }));
    },

    /**
     * Установить цвета как CSS переменные
     * @param {Object} colors - Объект с цветами
     */
    setColors(colors) {
        const root = document.documentElement;
        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--sf-${this.toKebabCase(key)}`, value);
        });
    },

    /**
     * Создать кастомную тему
     * @param {string} id - Уникальный ID темы
     * @param {string} name - Название темы
     * @param {Object} colors - Цвета темы
     */
    createCustom(id, name, colors) {
        this.presets[id] = { name, colors };
        this.saveCustomThemes();
    },

    /**
     * Генерация градиента из цветов темы
     * @param {string} direction - Направление (to right, to bottom, etc.)
     * @returns {string} CSS градиент
     */
    getGradient(direction = 'to right') {
        const theme = this.presets[this.currentTheme];
        if (!theme) return '';
        return `linear-gradient(${direction}, ${theme.colors.primary}, ${theme.colors.secondary})`;
    },

    /**
     * Сохранить кастомные темы в localStorage
     */
    saveCustomThemes() {
        const custom = {};
        Object.entries(this.presets).forEach(([id, theme]) => {
            if (!['modern-dark', 'ocean-blue', 'forest-green', 'sunset-orange', 'minimal-light', 'neon-cyber'].includes(id)) {
                custom[id] = theme;
            }
        });
        localStorage.setItem('sf-custom-themes', JSON.stringify(custom));
    },

    /**
     * Загрузить кастомные темы из localStorage
     */
    loadCustomThemes() {
        const saved = localStorage.getItem('sf-custom-themes');
        if (saved) {
            const custom = JSON.parse(saved);
            Object.assign(this.presets, custom);
        }
    },

    /**
     * Получить список всех доступных тем
     * @returns {Array} Массив тем с id и name
     */
    getThemeList() {
        return Object.entries(this.presets).map(([id, theme]) => ({
            id,
            name: theme.name,
            colors: theme.colors
        }));
    },

    /**
     * Утилита для конвертации camelCase в kebab-case
     */
    toKebabCase(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },

    /**
     * Инъекция базовых CSS переменных
     */
    injectBaseStyles() {
        if (document.getElementById('sf-theme-styles')) return;
        
        const styles = `
            :root {
                --sf-primary: #6366f1;
                --sf-secondary: #8b5cf6;
                --sf-accent: #22d3ee;
                --sf-background: #0f172a;
                --sf-surface: #1e293b;
                --sf-text: #f8fafc;
                --sf-text-muted: #94a3b8;
            }
            
            .sf-gradient-text {
                background: linear-gradient(135deg, var(--sf-primary), var(--sf-secondary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .sf-gradient-bg {
                background: linear-gradient(135deg, var(--sf-primary), var(--sf-secondary));
            }
            
            .sf-glass {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .sf-glow {
                box-shadow: 0 0 20px var(--sf-primary),
                            0 0 40px rgba(99, 102, 241, 0.3);
            }
        `;
        
        const styleEl = document.createElement('style');
        styleEl.id = 'sf-theme-styles';
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);
    }
};

// Автоматическая инициализация
document.addEventListener('DOMContentLoaded', () => {
    SFThemes.loadCustomThemes();
    SFThemes.injectBaseStyles();
    SFThemes.init();
});

// Экспорт для использования в builder
if (typeof window !== 'undefined') {
    window.SFThemes = SFThemes;
}
