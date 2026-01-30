// SiteForge Blocks Library
const BlocksLibrary = {
    'navbar-1': {
        name: 'Меню 1', category: 'navigation',
        html: `<nav style="display:flex;justify-content:space-between;align-items:center;padding:20px 60px;background:white;box-shadow:0 2px 20px rgba(0,0,0,0.08);">
            <div style="font-size:1.5rem;font-weight:800;background:linear-gradient(135deg,#6366f1,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;" contenteditable="true">SiteForge</div>
            <ul style="display:flex;gap:40px;list-style:none;margin:0;padding:0;">
                <li><a href="#" style="text-decoration:none;color:#333;font-weight:500;" contenteditable="true">Главная</a></li>
                <li><a href="#" style="text-decoration:none;color:#333;font-weight:500;" contenteditable="true">О нас</a></li>
                <li><a href="#" style="text-decoration:none;color:#333;font-weight:500;" contenteditable="true">Услуги</a></li>
                <li><a href="#" style="text-decoration:none;color:#333;font-weight:500;" contenteditable="true">Контакты</a></li>
            </ul>
            <a href="#" style="padding:12px 28px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;text-decoration:none;border-radius:8px;font-weight:600;" contenteditable="true">Начать</a>
        </nav>`
    },

    'navbar-2': {
        name: 'Меню 2', category: 'navigation',
        html: `<nav style="display:flex;justify-content:space-between;align-items:center;padding:20px 60px;background:#0f0f0f;">
            <div style="font-size:1.5rem;font-weight:800;color:white;" contenteditable="true">Brand</div>
            <ul style="display:flex;gap:40px;list-style:none;margin:0;padding:0;">
                <li><a href="#" style="text-decoration:none;color:#ccc;font-weight:500;" contenteditable="true">Продукт</a></li>
                <li><a href="#" style="text-decoration:none;color:#ccc;font-weight:500;" contenteditable="true">Решения</a></li>
                <li><a href="#" style="text-decoration:none;color:#ccc;font-weight:500;" contenteditable="true">Цены</a></li>
            </ul>
            <div style="display:flex;gap:12px;">
                <a href="#" style="padding:10px 20px;color:white;text-decoration:none;font-weight:500;" contenteditable="true">Войти</a>
                <a href="#" style="padding:10px 24px;background:white;color:#0f0f0f;text-decoration:none;border-radius:8px;font-weight:600;" contenteditable="true">Регистрация</a>
            </div>
        </nav>`
    },

    'navbar-3': {
        name: 'Меню 3', category: 'navigation',
        html: `<nav style="display:flex;justify-content:center;align-items:center;padding:20px 60px;background:linear-gradient(135deg,#667eea,#764ba2);">
            <ul style="display:flex;gap:50px;list-style:none;margin:0;padding:0;">
                <li><a href="#" style="text-decoration:none;color:white;font-weight:500;text-transform:uppercase;letter-spacing:1px;font-size:0.9rem;" contenteditable="true">Главная</a></li>
                <li><a href="#" style="text-decoration:none;color:white;font-weight:500;text-transform:uppercase;letter-spacing:1px;font-size:0.9rem;" contenteditable="true">Проекты</a></li>
                <li style="padding:0 40px;"><span style="font-size:1.8rem;font-weight:800;color:white;" contenteditable="true">LOGO</span></li>
                <li><a href="#" style="text-decoration:none;color:white;font-weight:500;text-transform:uppercase;letter-spacing:1px;font-size:0.9rem;" contenteditable="true">О нас</a></li>
                <li><a href="#" style="text-decoration:none;color:white;font-weight:500;text-transform:uppercase;letter-spacing:1px;font-size:0.9rem;" contenteditable="true">Контакты</a></li>
            </ul>
        </nav>`
    },

    'hero': {
        name: 'Hero', category: 'hero',
        html: `<section style="padding:120px 60px;background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a855f7 100%);text-align:center;color:white;">
            <div style="max-width:800px;margin:0 auto;">
                <h1 style="font-size:4rem;font-weight:800;margin-bottom:24px;line-height:1.1;" contenteditable="true">Создавайте сайты будущего</h1>
                <p style="font-size:1.25rem;opacity:0.9;margin-bottom:40px;line-height:1.7;" contenteditable="true">Профессиональный конструктор сайтов с интуитивным интерфейсом</p>
                <div style="display:flex;gap:16px;justify-content:center;">
                    <a href="#" style="padding:16px 36px;background:white;color:#6366f1;text-decoration:none;border-radius:10px;font-weight:700;font-size:1.1rem;" contenteditable="true">Начать бесплатно</a>
                    <a href="#" style="padding:16px 36px;background:transparent;color:white;text-decoration:none;border-radius:10px;font-weight:600;border:2px solid rgba(255,255,255,0.3);" contenteditable="true">Смотреть демо</a>
                </div>
            </div>
        </section>`
    },

    'hero-1': {
        name: 'Hero 1', category: 'hero',
        html: `<section style="display:grid;grid-template-columns:1fr 1fr;min-height:90vh;align-items:center;padding:60px;background:#fafafa;">
            <div style="padding-right:60px;">
                <span style="display:inline-block;padding:8px 16px;background:#ede9fe;color:#7c3aed;border-radius:20px;font-size:0.875rem;font-weight:600;margin-bottom:24px;" contenteditable="true">🚀 Новое поколение</span>
                <h1 style="font-size:3.5rem;font-weight:800;color:#1a1a2e;margin-bottom:24px;line-height:1.15;" contenteditable="true">Превратите идеи в реальность</h1>
                <p style="font-size:1.2rem;color:#64748b;margin-bottom:36px;line-height:1.7;" contenteditable="true">Создавайте впечатляющие веб-сайты без единой строчки кода.</p>
                <a href="#" style="padding:16px 32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;text-decoration:none;border-radius:10px;font-weight:600;display:inline-block;" contenteditable="true">Попробовать бесплатно</a>
            </div>
            <div style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);border-radius:24px;height:500px;display:flex;align-items:center;justify-content:center;box-shadow:0 40px 80px rgba(99,102,241,0.3);">
                <span style="font-size:4rem;opacity:0.5;">🖼️</span>
            </div>
        </section>`
    },

    'hero-2': {
        name: 'Hero 2', category: 'hero',
        html: `<section style="min-height:100vh;background:linear-gradient(180deg,#0f0f0f 0%,#1a1a2e 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px;">
            <div style="max-width:900px;">
                <h1 style="font-size:5rem;font-weight:800;color:white;margin-bottom:24px;line-height:1.1;" contenteditable="true">Мы создаём digital-продукты</h1>
                <p style="font-size:1.3rem;color:#94a3b8;margin-bottom:48px;max-width:600px;margin-left:auto;margin-right:auto;" contenteditable="true">Студия веб-дизайна и разработки с фокусом на результат</p>
                <div style="display:flex;gap:20px;justify-content:center;">
                    <a href="#" style="padding:18px 40px;background:white;color:#0f0f0f;text-decoration:none;border-radius:12px;font-weight:700;font-size:1.1rem;" contenteditable="true">Обсудить проект</a>
                    <a href="#" style="padding:18px 40px;background:rgba(255,255,255,0.1);color:white;text-decoration:none;border-radius:12px;font-weight:600;border:1px solid rgba(255,255,255,0.2);" contenteditable="true">Наши работы</a>
                </div>
            </div>
        </section>`
    },

    'hero-video': {
        name: 'Hero Video', category: 'hero',
        html: `<section style="min-height:100vh;background:#000;display:flex;align-items:center;justify-content:center;text-align:center;padding:60px;">
            <div style="max-width:800px;">
                <h1 style="font-size:4.5rem;font-weight:800;color:white;margin-bottom:24px;text-transform:uppercase;letter-spacing:-2px;" contenteditable="true">Experience</h1>
                <p style="font-size:1.2rem;color:rgba(255,255,255,0.8);margin-bottom:48px;" contenteditable="true">Откройте новые возможности</p>
                <a href="#" style="display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;background:white;border-radius:50%;font-size:1.5rem;text-decoration:none;">▶</a>
            </div>
        </section>`
    },

    'features': {
        name: 'Особенности', category: 'content',
        html: `<section style="padding:100px 60px;background:white;">
            <div style="text-align:center;margin-bottom:60px;">
                <h2 style="font-size:2.5rem;font-weight:800;color:#1a1a2e;margin-bottom:16px;" contenteditable="true">Почему выбирают нас</h2>
                <p style="font-size:1.1rem;color:#64748b;max-width:600px;margin:0 auto;" contenteditable="true">Мы предоставляем лучшие инструменты</p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:40px;max-width:1200px;margin:0 auto;">
                <div style="text-align:center;padding:40px;">
                    <div style="width:80px;height:80px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:2rem;">⚡</div>
                    <h3 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin-bottom:12px;" contenteditable="true">Быстрая загрузка</h3>
                    <p style="color:#64748b;line-height:1.7;" contenteditable="true">Оптимизированный код для максимальной скорости</p>
                </div>
                <div style="text-align:center;padding:40px;">
                    <div style="width:80px;height:80px;background:linear-gradient(135deg,#dbeafe,#bfdbfe);border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:2rem;">🎨</div>
                    <h3 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin-bottom:12px;" contenteditable="true">Современный дизайн</h3>
                    <p style="color:#64748b;line-height:1.7;" contenteditable="true">Стильные шаблоны для любого проекта</p>
                </div>
                <div style="text-align:center;padding:40px;">
                    <div style="width:80px;height:80px;background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:2rem;">📱</div>
                    <h3 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin-bottom:12px;" contenteditable="true">Адаптивность</h3>
                    <p style="color:#64748b;line-height:1.7;" contenteditable="true">Идеальное отображение на всех устройствах</p>
                </div>
            </div>
        </section>`
    },

    'features-grid': {
        name: 'Сетка особенностей', category: 'content',
        html: `<section style="padding:100px 60px;background:#f8fafc;">
            <div style="max-width:1200px;margin:0 auto;">
                <div style="text-align:center;margin-bottom:60px;">
                    <h2 style="font-size:2.5rem;font-weight:800;color:#1a1a2e;margin-bottom:16px;" contenteditable="true">Все что вам нужно</h2>
                    <p style="color:#64748b;font-size:1.1rem;" contenteditable="true">Полный набор инструментов для успешного бизнеса</p>
                </div>
                <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px;">
                    <div style="background:white;padding:40px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.05);display:flex;gap:24px;align-items:start;">
                        <div style="width:60px;height:60px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;">🚀</div>
                        <div><h3 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin-bottom:8px;" contenteditable="true">Быстрый старт</h3><p style="color:#64748b;line-height:1.7;" contenteditable="true">Создайте сайт за несколько минут</p></div>
                    </div>
                    <div style="background:white;padding:40px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.05);display:flex;gap:24px;align-items:start;">
                        <div style="width:60px;height:60px;background:linear-gradient(135deg,#10b981,#34d399);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;">🔒</div>
                        <div><h3 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin-bottom:8px;" contenteditable="true">Безопасность</h3><p style="color:#64748b;line-height:1.7;" contenteditable="true">SSL сертификат и защита данных</p></div>
                    </div>
                    <div style="background:white;padding:40px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.05);display:flex;gap:24px;align-items:start;">
                        <div style="width:60px;height:60px;background:linear-gradient(135deg,#f59e0b,#fbbf24);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;">📊</div>
                        <div><h3 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin-bottom:8px;" contenteditable="true">Аналитика</h3><p style="color:#64748b;line-height:1.7;" contenteditable="true">Встроенная статистика посещений</p></div>
                    </div>
                    <div style="background:white;padding:40px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.05);display:flex;gap:24px;align-items:start;">
                        <div style="width:60px;height:60px;background:linear-gradient(135deg,#ec4899,#f472b6);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;">💬</div>
                        <div><h3 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin-bottom:8px;" contenteditable="true">Поддержка 24/7</h3><p style="color:#64748b;line-height:1.7;" contenteditable="true">Наша команда всегда готова помочь</p></div>
                    </div>
                </div>
            </div>
        </section>`
    },

    'cta': {
        name: 'CTA', category: 'content',
        html: `<section style="padding:100px 60px;background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);text-align:center;">
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="font-size:3rem;font-weight:800;color:white;margin-bottom:20px;" contenteditable="true">Готовы начать?</h2>
                <p style="font-size:1.2rem;color:rgba(255,255,255,0.9);margin-bottom:40px;" contenteditable="true">Присоединяйтесь к тысячам пользователей</p>
                <div style="display:flex;gap:16px;justify-content:center;">
                    <a href="#" style="padding:16px 40px;background:white;color:#6366f1;text-decoration:none;border-radius:10px;font-weight:700;font-size:1.1rem;" contenteditable="true">Начать бесплатно</a>
                    <a href="#" style="padding:16px 40px;background:transparent;color:white;text-decoration:none;border-radius:10px;font-weight:600;border:2px solid rgba(255,255,255,0.3);" contenteditable="true">Связаться с нами</a>
                </div>
            </div>
        </section>`
    },

    'cards': {
        name: 'Карточки', category: 'content',
        html: `<section style="padding:100px 60px;background:white;">
            <div style="text-align:center;margin-bottom:60px;">
                <h2 style="font-size:2.5rem;font-weight:800;color:#1a1a2e;margin-bottom:16px;" contenteditable="true">Наши услуги</h2>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:30px;max-width:1200px;margin:0 auto;">
                <div style="background:#f8fafc;border-radius:20px;padding:40px;">
                    <div style="font-size:3rem;margin-bottom:20px;">🎯</div>
                    <h3 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin-bottom:12px;" contenteditable="true">Веб-дизайн</h3>
                    <p style="color:#64748b;line-height:1.7;margin-bottom:20px;" contenteditable="true">Создаём уникальный дизайн</p>
                    <a href="#" style="color:#6366f1;text-decoration:none;font-weight:600;" contenteditable="true">Подробнее →</a>
                </div>
                <div style="background:#f8fafc;border-radius:20px;padding:40px;">
                    <div style="font-size:3rem;margin-bottom:20px;">💻</div>
                    <h3 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin-bottom:12px;" contenteditable="true">Разработка</h3>
                    <p style="color:#64748b;line-height:1.7;margin-bottom:20px;" contenteditable="true">Превращаем дизайн в сайт</p>
                    <a href="#" style="color:#6366f1;text-decoration:none;font-weight:600;" contenteditable="true">Подробнее →</a>
                </div>
                <div style="background:#f8fafc;border-radius:20px;padding:40px;">
                    <div style="font-size:3rem;margin-bottom:20px;">📈</div>
                    <h3 style="font-size:1.3rem;font-weight:700;color:#1a1a2e;margin-bottom:12px;" contenteditable="true">SEO продвижение</h3>
                    <p style="color:#64748b;line-height:1.7;margin-bottom:20px;" contenteditable="true">Выводим сайт в топ</p>
                    <a href="#" style="color:#6366f1;text-decoration:none;font-weight:600;" contenteditable="true">Подробнее →</a>
                </div>
            </div>
        </section>`
    },

    'stats': {
        name: 'Статистика', category: 'content',
        html: `<section style="padding:80px 60px;background:#1a1a2e;">
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:40px;max-width:1200px;margin:0 auto;text-align:center;">
                <div><div style="font-size:3.5rem;font-weight:800;background:linear-gradient(135deg,#6366f1,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px;" contenteditable="true">500+</div><div style="color:#94a3b8;" contenteditable="true">Проектов</div></div>
                <div><div style="font-size:3.5rem;font-weight:800;background:linear-gradient(135deg,#10b981,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px;" contenteditable="true">50+</div><div style="color:#94a3b8;" contenteditable="true">Клиентов</div></div>
                <div><div style="font-size:3.5rem;font-weight:800;background:linear-gradient(135deg,#f59e0b,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px;" contenteditable="true">10</div><div style="color:#94a3b8;" contenteditable="true">Лет опыта</div></div>
                <div><div style="font-size:3.5rem;font-weight:800;background:linear-gradient(135deg,#ec4899,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px;" contenteditable="true">24/7</div><div style="color:#94a3b8;" contenteditable="true">Поддержка</div></div>
            </div>
        </section>`
    },

    'text-image': {
        name: 'Текст + Фото', category: 'content',
        html: `<section style="display:grid;grid-template-columns:1fr 1fr;gap:80px;padding:100px 60px;align-items:center;max-width:1400px;margin:0 auto;">
            <div>
                <span style="display:inline-block;padding:8px 16px;background:#ede9fe;color:#7c3aed;border-radius:20px;font-size:0.875rem;font-weight:600;margin-bottom:20px;" contenteditable="true">О компании</span>
                <h2 style="font-size:2.5rem;font-weight:800;color:#1a1a2e;margin-bottom:24px;" contenteditable="true">Мы создаём цифровые продукты</h2>
                <p style="font-size:1.1rem;color:#64748b;margin-bottom:24px;line-height:1.8;" contenteditable="true">Наша команда состоит из опытных дизайнеров и разработчиков.</p>
                <ul style="list-style:none;padding:0;margin:0 0 32px 0;">
                    <li style="display:flex;align-items:center;gap:12px;padding:8px 0;color:#1a1a2e;"><span style="color:#10b981;">✓</span><span contenteditable="true">Индивидуальный подход</span></li>
                    <li style="display:flex;align-items:center;gap:12px;padding:8px 0;color:#1a1a2e;"><span style="color:#10b981;">✓</span><span contenteditable="true">Современные технологии</span></li>
                    <li style="display:flex;align-items:center;gap:12px;padding:8px 0;color:#1a1a2e;"><span style="color:#10b981;">✓</span><span contenteditable="true">Гарантия качества</span></li>
                </ul>
                <a href="#" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;text-decoration:none;border-radius:10px;font-weight:600;" contenteditable="true">Узнать больше</a>
            </div>
            <div style="background:linear-gradient(135deg,#f1f5f9,#e2e8f0);border-radius:24px;height:500px;display:flex;align-items:center;justify-content:center;"><span style="font-size:4rem;opacity:0.3;">🖼️</span></div>
        </section>`
    },

    'testimonials': {
        name: 'Отзывы', category: 'testimonials',
        html: `<section style="padding:100px 60px;background:#f8fafc;">
            <div style="text-align:center;margin-bottom:60px;"><h2 style="font-size:2.5rem;font-weight:800;color:#1a1a2e;margin-bottom:16px;" contenteditable="true">Отзывы клиентов</h2></div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:30px;max-width:1200px;margin:0 auto;">
                <div style="background:white;padding:40px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,0.05);">
                    <div style="display:flex;gap:4px;margin-bottom:20px;">⭐⭐⭐⭐⭐</div>
                    <p style="color:#1a1a2e;font-size:1.1rem;line-height:1.7;margin-bottom:24px;font-style:italic;" contenteditable="true">"Отличная работа! Рекомендую всем!"</p>
                    <div style="display:flex;align-items:center;gap:16px;">
                        <div style="width:50px;height:50px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:600;">ИП</div>
                        <div><div style="font-weight:600;color:#1a1a2e;" contenteditable="true">Иван Петров</div><div style="color:#64748b;font-size:0.875rem;" contenteditable="true">CEO, TechCorp</div></div>
                    </div>
                </div>
                <div style="background:white;padding:40px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,0.05);">
                    <div style="display:flex;gap:4px;margin-bottom:20px;">⭐⭐⭐⭐⭐</div>
                    <p style="color:#1a1a2e;font-size:1.1rem;line-height:1.7;margin-bottom:24px;font-style:italic;" contenteditable="true">"Профессиональный подход!"</p>
                    <div style="display:flex;align-items:center;gap:16px;">
                        <div style="width:50px;height:50px;background:linear-gradient(135deg,#10b981,#34d399);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:600;">МС</div>
                        <div><div style="font-weight:600;color:#1a1a2e;" contenteditable="true">Мария Сидорова</div><div style="color:#64748b;font-size:0.875rem;" contenteditable="true">Маркетолог</div></div>
                    </div>
                </div>
                <div style="background:white;padding:40px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,0.05);">
                    <div style="display:flex;gap:4px;margin-bottom:20px;">⭐⭐⭐⭐⭐</div>
                    <p style="color:#1a1a2e;font-size:1.1rem;line-height:1.7;margin-bottom:24px;font-style:italic;" contenteditable="true">"Быстро и качественно!"</p>
                    <div style="display:flex;align-items:center;gap:16px;">
                        <div style="width:50px;height:50px;background:linear-gradient(135deg,#f59e0b,#fbbf24);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:600;">АК</div>
                        <div><div style="font-weight:600;color:#1a1a2e;" contenteditable="true">Алексей Козлов</div><div style="color:#64748b;font-size:0.875rem;" contenteditable="true">Директор</div></div>
                    </div>
                </div>
            </div>
        </section>`
    },

    'pricing-1': {
        name: 'Тарифы', category: 'pricing',
        html: `<section style="padding:100px 60px;background:white;">
            <div style="text-align:center;margin-bottom:60px;"><h2 style="font-size:2.5rem;font-weight:800;color:#1a1a2e;margin-bottom:16px;" contenteditable="true">Выберите тариф</h2></div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:30px;max-width:1100px;margin:0 auto;align-items:start;">
                <div style="background:#f8fafc;border-radius:24px;padding:40px;text-align:center;">
                    <h3 style="font-size:1.2rem;font-weight:600;color:#64748b;margin-bottom:20px;" contenteditable="true">Стартовый</h3>
                    <div style="font-size:3.5rem;font-weight:800;color:#1a1a2e;margin-bottom:8px;" contenteditable="true">$9</div>
                    <div style="color:#64748b;margin-bottom:32px;" contenteditable="true">/месяц</div>
                    <ul style="list-style:none;padding:0;margin:0 0 32px 0;text-align:left;">
                        <li style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#1a1a2e;" contenteditable="true">✓ 1 сайт</li>
                        <li style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#1a1a2e;" contenteditable="true">✓ 5 ГБ хранилище</li>
                        <li style="padding:12px 0;color:#1a1a2e;" contenteditable="true">✓ SSL сертификат</li>
                    </ul>
                    <a href="#" style="display:block;padding:16px;background:white;color:#1a1a2e;text-decoration:none;border-radius:12px;font-weight:600;border:2px solid #e2e8f0;" contenteditable="true">Выбрать</a>
                </div>
                <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:24px;padding:40px;text-align:center;transform:scale(1.05);box-shadow:0 20px 60px rgba(99,102,241,0.3);">
                    <div style="display:inline-block;padding:6px 16px;background:rgba(255,255,255,0.2);border-radius:20px;color:white;font-size:0.8rem;font-weight:600;margin-bottom:20px;">ПОПУЛЯРНЫЙ</div>
                    <h3 style="font-size:1.2rem;font-weight:600;color:rgba(255,255,255,0.8);margin-bottom:20px;" contenteditable="true">Профессиональный</h3>
                    <div style="font-size:3.5rem;font-weight:800;color:white;margin-bottom:8px;" contenteditable="true">$29</div>
                    <div style="color:rgba(255,255,255,0.8);margin-bottom:32px;" contenteditable="true">/месяц</div>
                    <ul style="list-style:none;padding:0;margin:0 0 32px 0;text-align:left;">
                        <li style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.2);color:white;" contenteditable="true">✓ 5 сайтов</li>
                        <li style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.2);color:white;" contenteditable="true">✓ 50 ГБ хранилище</li>
                        <li style="padding:12px 0;color:white;" contenteditable="true">✓ Свой домен</li>
                    </ul>
                    <a href="#" style="display:block;padding:16px;background:white;color:#6366f1;text-decoration:none;border-radius:12px;font-weight:700;" contenteditable="true">Выбрать</a>
                </div>
                <div style="background:#f8fafc;border-radius:24px;padding:40px;text-align:center;">
                    <h3 style="font-size:1.2rem;font-weight:600;color:#64748b;margin-bottom:20px;" contenteditable="true">Бизнес</h3>
                    <div style="font-size:3.5rem;font-weight:800;color:#1a1a2e;margin-bottom:8px;" contenteditable="true">$99</div>
                    <div style="color:#64748b;margin-bottom:32px;" contenteditable="true">/месяц</div>
                    <ul style="list-style:none;padding:0;margin:0 0 32px 0;text-align:left;">
                        <li style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#1a1a2e;" contenteditable="true">✓ Безлимитные сайты</li>
                        <li style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#1a1a2e;" contenteditable="true">✓ 500 ГБ хранилище</li>
                        <li style="padding:12px 0;color:#1a1a2e;" contenteditable="true">✓ White label</li>
                    </ul>
                    <a href="#" style="display:block;padding:16px;background:white;color:#1a1a2e;text-decoration:none;border-radius:12px;font-weight:600;border:2px solid #e2e8f0;" contenteditable="true">Выбрать</a>
                </div>
            </div>
        </section>`
    },

    'team': {
        name: 'Команда', category: 'team',
        html: `<section style="padding:100px 60px;background:white;">
            <div style="text-align:center;margin-bottom:60px;"><h2 style="font-size:2.5rem;font-weight:800;color:#1a1a2e;" contenteditable="true">Наша команда</h2></div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:30px;max-width:1200px;margin:0 auto;">
                <div style="text-align:center;"><div style="width:180px;height:180px;background:linear-gradient(135deg,#f1f5f9,#e2e8f0);border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;font-size:4rem;">👨‍💼</div><h3 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin-bottom:4px;" contenteditable="true">Иван Иванов</h3><div style="color:#6366f1;font-size:0.9rem;" contenteditable="true">CEO</div></div>
                <div style="text-align:center;"><div style="width:180px;height:180px;background:linear-gradient(135deg,#f1f5f9,#e2e8f0);border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;font-size:4rem;">👩‍💻</div><h3 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin-bottom:4px;" contenteditable="true">Мария Петрова</h3><div style="color:#6366f1;font-size:0.9rem;" contenteditable="true">Designer</div></div>
                <div style="text-align:center;"><div style="width:180px;height:180px;background:linear-gradient(135deg,#f1f5f9,#e2e8f0);border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;font-size:4rem;">👨‍💻</div><h3 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin-bottom:4px;" contenteditable="true">Алексей Сидоров</h3><div style="color:#6366f1;font-size:0.9rem;" contenteditable="true">Developer</div></div>
                <div style="text-align:center;"><div style="width:180px;height:180px;background:linear-gradient(135deg,#f1f5f9,#e2e8f0);border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;font-size:4rem;">👩‍🎨</div><h3 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin-bottom:4px;" contenteditable="true">Елена Козлова</h3><div style="color:#6366f1;font-size:0.9rem;" contenteditable="true">Marketing</div></div>
            </div>
        </section>`
    },

    'faq': {
        name: 'FAQ', category: 'faq',
        html: `<section style="padding:100px 60px;background:#f8fafc;">
            <div style="max-width:800px;margin:0 auto;">
                <div style="text-align:center;margin-bottom:60px;"><h2 style="font-size:2.5rem;font-weight:800;color:#1a1a2e;" contenteditable="true">Частые вопросы</h2></div>
                <div style="display:flex;flex-direction:column;gap:16px;">
                    <details style="background:white;padding:24px 30px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.05);"><summary style="font-weight:600;color:#1a1a2e;cursor:pointer;font-size:1.1rem;" contenteditable="true">Как начать работу?</summary><p style="margin-top:16px;color:#64748b;line-height:1.7;" contenteditable="true">Зарегистрируйтесь и выберите шаблон.</p></details>
                    <details style="background:white;padding:24px 30px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.05);"><summary style="font-weight:600;color:#1a1a2e;cursor:pointer;font-size:1.1rem;" contenteditable="true">Можно ли использовать свой домен?</summary><p style="margin-top:16px;color:#64748b;line-height:1.7;" contenteditable="true">Да, вы можете подключить свой домен.</p></details>
                    <details style="background:white;padding:24px 30px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.05);"><summary style="font-weight:600;color:#1a1a2e;cursor:pointer;font-size:1.1rem;" contenteditable="true">Есть ли бесплатный период?</summary><p style="margin-top:16px;color:#64748b;line-height:1.7;" contenteditable="true">Да, 14 дней бесплатно.</p></details>
                </div>
            </div>
        </section>`
    },

    'contact-form': {
        name: 'Форма контактов', category: 'contact',
        html: `<section style="padding:100px 60px;background:white;">
            <div style="max-width:600px;margin:0 auto;">
                <div style="text-align:center;margin-bottom:48px;"><h2 style="font-size:2.5rem;font-weight:800;color:#1a1a2e;" contenteditable="true">Свяжитесь с нами</h2></div>
                <form style="display:flex;flex-direction:column;gap:20px;">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
                        <input type="text" placeholder="Имя" style="padding:16px 20px;border:2px solid #e2e8f0;border-radius:12px;font-size:1rem;outline:none;">
                        <input type="email" placeholder="Email" style="padding:16px 20px;border:2px solid #e2e8f0;border-radius:12px;font-size:1rem;outline:none;">
                    </div>
                    <textarea placeholder="Сообщение" rows="5" style="padding:16px 20px;border:2px solid #e2e8f0;border-radius:12px;font-size:1rem;resize:vertical;outline:none;"></textarea>
                    <button type="submit" style="padding:18px 32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;border:none;border-radius:12px;font-size:1.1rem;font-weight:600;cursor:pointer;" contenteditable="true">Отправить</button>
                </form>
            </div>
        </section>`
    },

    'contact-info': {
        name: 'Контактная информация', category: 'contact',
        html: `<section style="padding:100px 60px;background:#1a1a2e;">
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:40px;max-width:1200px;margin:0 auto;text-align:center;">
                <div style="padding:40px;"><div style="width:70px;height:70px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:1.5rem;">📍</div><h3 style="color:white;font-size:1.2rem;margin-bottom:8px;" contenteditable="true">Адрес</h3><p style="color:#94a3b8;" contenteditable="true">ул. Примерная 123</p></div>
                <div style="padding:40px;"><div style="width:70px;height:70px;background:linear-gradient(135deg,#10b981,#34d399);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:1.5rem;">📞</div><h3 style="color:white;font-size:1.2rem;margin-bottom:8px;" contenteditable="true">Телефон</h3><p style="color:#94a3b8;" contenteditable="true">+7 (999) 123-45-67</p></div>
                <div style="padding:40px;"><div style="width:70px;height:70px;background:linear-gradient(135deg,#f59e0b,#fbbf24);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:1.5rem;">📧</div><h3 style="color:white;font-size:1.2rem;margin-bottom:8px;" contenteditable="true">Email</h3><p style="color:#94a3b8;" contenteditable="true">hello@example.com</p></div>
            </div>
        </section>`
    },

    'gallery-grid': {
        name: 'Галерея', category: 'gallery',
        html: `<section style="padding:100px 60px;background:white;">
            <div style="text-align:center;margin-bottom:60px;"><h2 style="font-size:2.5rem;font-weight:800;color:#1a1a2e;" contenteditable="true">Наши работы</h2></div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1200px;margin:0 auto;">
                <div style="aspect-ratio:1;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:3rem;">🖼️</div>
                <div style="aspect-ratio:1;background:linear-gradient(135deg,#10b981,#34d399);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:3rem;">🖼️</div>
                <div style="aspect-ratio:1;background:linear-gradient(135deg,#f59e0b,#fbbf24);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:3rem;">🖼️</div>
                <div style="aspect-ratio:1;background:linear-gradient(135deg,#ec4899,#f472b6);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:3rem;">🖼️</div>
                <div style="aspect-ratio:1;background:linear-gradient(135deg,#06b6d4,#22d3ee);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:3rem;">🖼️</div>
                <div style="aspect-ratio:1;background:linear-gradient(135deg,#8b5cf6,#a855f7);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:3rem;">🖼️</div>
            </div>
        </section>`
    },

    'footer-1': {
        name: 'Футер 1', category: 'footer',
        html: `<footer style="padding:80px 60px 40px;background:#0f0f0f;color:white;">
            <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:60px;max-width:1200px;margin:0 auto 60px;">
                <div><div style="font-size:1.8rem;font-weight:800;margin-bottom:20px;background:linear-gradient(135deg,#6366f1,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;" contenteditable="true">SiteForge</div><p style="color:#94a3b8;line-height:1.7;" contenteditable="true">Создавайте сайты без кода.</p></div>
                <div><h4 style="font-size:1rem;font-weight:600;margin-bottom:20px;" contenteditable="true">Продукт</h4><ul style="list-style:none;padding:0;margin:0;"><li style="margin-bottom:12px;"><a href="#" style="color:#94a3b8;text-decoration:none;" contenteditable="true">Возможности</a></li><li style="margin-bottom:12px;"><a href="#" style="color:#94a3b8;text-decoration:none;" contenteditable="true">Шаблоны</a></li><li><a href="#" style="color:#94a3b8;text-decoration:none;" contenteditable="true">Цены</a></li></ul></div>
                <div><h4 style="font-size:1rem;font-weight:600;margin-bottom:20px;" contenteditable="true">Компания</h4><ul style="list-style:none;padding:0;margin:0;"><li style="margin-bottom:12px;"><a href="#" style="color:#94a3b8;text-decoration:none;" contenteditable="true">О нас</a></li><li style="margin-bottom:12px;"><a href="#" style="color:#94a3b8;text-decoration:none;" contenteditable="true">Блог</a></li><li><a href="#" style="color:#94a3b8;text-decoration:none;" contenteditable="true">Контакты</a></li></ul></div>
                <div><h4 style="font-size:1rem;font-weight:600;margin-bottom:20px;" contenteditable="true">Поддержка</h4><ul style="list-style:none;padding:0;margin:0;"><li style="margin-bottom:12px;"><a href="#" style="color:#94a3b8;text-decoration:none;" contenteditable="true">Документация</a></li><li><a href="#" style="color:#94a3b8;text-decoration:none;" contenteditable="true">FAQ</a></li></ul></div>
            </div>
            <div style="border-top:1px solid #1a1a2e;padding-top:30px;text-align:center;"><p style="color:#64748b;font-size:0.9rem;" contenteditable="true">© 2026 SiteForge. Все права защищены.</p></div>
        </footer>`
    },

    'footer-2': {
        name: 'Футер 2', category: 'footer',
        html: `<footer style="padding:60px;background:linear-gradient(135deg,#6366f1,#8b5cf6);text-align:center;">
            <div style="max-width:600px;margin:0 auto;">
                <div style="font-size:2rem;font-weight:800;color:white;margin-bottom:16px;" contenteditable="true">SiteForge</div>
                <p style="color:rgba(255,255,255,0.8);margin-bottom:32px;" contenteditable="true">Создавайте сайты мечты</p>
                <div style="display:flex;justify-content:center;gap:32px;margin-bottom:32px;">
                    <a href="#" style="color:white;text-decoration:none;" contenteditable="true">Главная</a>
                    <a href="#" style="color:white;text-decoration:none;" contenteditable="true">О нас</a>
                    <a href="#" style="color:white;text-decoration:none;" contenteditable="true">Услуги</a>
                    <a href="#" style="color:white;text-decoration:none;" contenteditable="true">Контакты</a>
                </div>
                <p style="color:rgba(255,255,255,0.6);font-size:0.9rem;" contenteditable="true">© 2026 Все права защищены</p>
            </div>
        </footer>`
    }
};

function getBlockHTML(type) {
    const block = BlocksLibrary[type];
    return block ? block.html : '<div style="padding:40px;text-align:center;color:#999;">Блок не найден</div>';
}
