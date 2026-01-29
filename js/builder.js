// Конструктор сайтов - Builder JS (Client-side version)

class WebsiteBuilder {
    constructor() {
        this.elements = [];
        this.selectedElement = null;
        this.elementCounter = 0;
        this.siteId = new URLSearchParams(window.location.search).get('id');

        this.init();
    }

    init() {
        this.canvas = document.getElementById('canvas');
        this.dropZone = document.getElementById('dropZone');
        this.propertiesContent = document.getElementById('propertiesContent');

        this.setupDragAndDrop();
        this.setupDeviceSwitcher();
        this.loadExistingSite();
    }

    loadExistingSite() {
        if (!this.siteId) return;

        const site = SiteStorage.get(this.siteId);
        if (!site) return;

        document.getElementById('siteName').value = site.name || '';
        document.getElementById('primaryColor').value = site.settings?.primaryColor || '#3b82f6';
        document.getElementById('siteDescription').value = site.settings?.description || '';

        if (site.pages?.[0]?.content) {
            this.loadContent(site.pages[0].content);
        }
    }

    setupDragAndDrop() {
        document.querySelectorAll('.component').forEach(comp => {
            comp.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('type', comp.dataset.type);
            });
        });

        this.canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropZone.classList.add('drag-over');
        });

        this.canvas.addEventListener('dragleave', () => {
            this.dropZone.classList.remove('drag-over');
        });

        this.canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropZone.classList.remove('drag-over');
            const type = e.dataTransfer.getData('type');
            if (type) this.addElement(type);
        });
    }

    setupDeviceSwitcher() {
        document.querySelectorAll('.device-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.canvas.classList.remove('tablet', 'mobile');
                if (btn.dataset.device !== 'desktop') {
                    this.canvas.classList.add(btn.dataset.device);
                }
            });
        });
    }

    addElement(type) {
        const id = `el-${++this.elementCounter}`;
        const element = this.createElement(type, id);

        this.elements.push({ id, type, data: {} });

        if (this.elements.length > 0) {
            this.dropZone.style.display = 'none';
        }

        this.canvas.appendChild(element);
        this.selectElement(id);
    }

    createElement(type, id) {
        const wrapper = document.createElement('div');
        wrapper.className = `canvas-element el-${type}`;
        wrapper.id = id;
        wrapper.innerHTML = this.getElementHTML(type) + this.getControlsHTML(id);

        wrapper.addEventListener('click', (e) => {
            if (!e.target.classList.contains('element-btn')) {
                this.selectElement(id);
            }
        });

        return wrapper;
    }

    getElementHTML(type) {
        const templates = {
            navbar: `
                <nav style="display:flex;justify-content:space-between;align-items:center;">
                    <div class="logo" contenteditable="true" style="font-weight:bold;font-size:1.5rem;">Логотип</div>
                    <ul style="display:flex;gap:30px;list-style:none;">
                        <li><a href="#" style="text-decoration:none;color:#333;">Главная</a></li>
                        <li><a href="#" style="text-decoration:none;color:#333;">О нас</a></li>
                        <li><a href="#" style="text-decoration:none;color:#333;">Услуги</a></li>
                        <li><a href="#" style="text-decoration:none;color:#333;">Контакты</a></li>
                    </ul>
                </nav>`,
            header: `
                <h1 contenteditable="true" style="font-size:3rem;margin-bottom:1rem;">Добро пожаловать</h1>
                <p contenteditable="true" style="font-size:1.25rem;opacity:0.9;margin-bottom:2rem;">Создайте свой идеальный сайт с нашим конструктором</p>
                <a href="#" class="btn" style="display:inline-block;padding:15px 30px;background:white;color:#3b82f6;border-radius:8px;text-decoration:none;font-weight:600;">Начать</a>`,
            section: `
                <div class="container" style="max-width:1200px;margin:0 auto;">
                    <h2 contenteditable="true" style="font-size:2rem;margin-bottom:1rem;text-align:center;">Заголовок секции</h2>
                    <p contenteditable="true" style="text-align:center;color:#64748b;">Описание секции. Добавьте сюда ваш контент.</p>
                </div>`,
            footer: `<p contenteditable="true">© 2026 Ваша компания. Все права защищены.</p>`,
            text: `<p contenteditable="true" style="font-size:1rem;line-height:1.8;">Это текстовый блок. Нажмите чтобы отредактировать содержимое.</p>`,
            heading: `<h2 contenteditable="true" style="font-size:2rem;font-weight:600;">Заголовок</h2>`,
            image: `
                <div style="background:#e2e8f0;padding:60px;text-align:center;border-radius:8px;">
                    <span style="font-size:3rem;">🖼️</span>
                    <p style="color:#64748b;margin-top:10px;">Добавьте URL изображения в свойствах</p>
                    <input type="text" class="image-url-input" placeholder="Вставьте URL изображения" style="margin-top:15px;padding:8px;border-radius:4px;border:1px solid #ccc;width:80%;" onchange="builder.updateImage(this)">
                </div>`,
            button: `<a href="#" contenteditable="true" style="display:inline-block;padding:12px 24px;background:#3b82f6;color:white;border-radius:8px;text-decoration:none;font-weight:500;">Кнопка</a>`,
            video: `
                <div style="background:#1e293b;padding:40px;text-align:center;border-radius:8px;">
                    <span style="font-size:4rem;">▶️</span>
                    <p style="color:white;margin-top:10px;">Вставьте YouTube URL</p>
                    <input type="text" class="video-url-input" placeholder="https://youtube.com/watch?v=..." style="margin-top:15px;padding:8px;border-radius:4px;border:none;width:80%;" onchange="builder.updateVideo(this)">
                </div>`,
            features: `
                <div style="max-width:1200px;margin:0 auto;">
                    <h2 contenteditable="true" style="text-align:center;margin-bottom:40px;font-size:2rem;">Наши преимущества</h2>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:30px;">
                        <div style="background:white;padding:30px;border-radius:12px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <div style="font-size:2.5rem;margin-bottom:15px;">⚡</div>
                            <h3 contenteditable="true" style="margin-bottom:10px;">Быстро</h3>
                            <p contenteditable="true" style="color:#64748b;">Описание преимущества</p>
                        </div>
                        <div style="background:white;padding:30px;border-radius:12px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <div style="font-size:2.5rem;margin-bottom:15px;">🛡️</div>
                            <h3 contenteditable="true" style="margin-bottom:10px;">Надёжно</h3>
                            <p contenteditable="true" style="color:#64748b;">Описание преимущества</p>
                        </div>
                        <div style="background:white;padding:30px;border-radius:12px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <div style="font-size:2.5rem;margin-bottom:15px;">💎</div>
                            <h3 contenteditable="true" style="margin-bottom:10px;">Качественно</h3>
                            <p contenteditable="true" style="color:#64748b;">Описание преимущества</p>
                        </div>
                    </div>
                </div>`,
            cards: `
                <div style="max-width:1200px;margin:0 auto;">
                    <h2 contenteditable="true" style="text-align:center;margin-bottom:40px;font-size:2rem;">Наши услуги</h2>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:30px;">
                        <div style="background:white;padding:30px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <h3 contenteditable="true" style="margin-bottom:10px;">Услуга 1</h3>
                            <p contenteditable="true" style="color:#64748b;">Описание услуги</p>
                        </div>
                        <div style="background:white;padding:30px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <h3 contenteditable="true" style="margin-bottom:10px;">Услуга 2</h3>
                            <p contenteditable="true" style="color:#64748b;">Описание услуги</p>
                        </div>
                        <div style="background:white;padding:30px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <h3 contenteditable="true" style="margin-bottom:10px;">Услуга 3</h3>
                            <p contenteditable="true" style="color:#64748b;">Описание услуги</p>
                        </div>
                    </div>
                </div>`,
            gallery: `
                <div style="max-width:1200px;margin:0 auto;">
                    <h2 contenteditable="true" style="text-align:center;margin-bottom:40px;font-size:2rem;">Галерея</h2>
                    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:15px;">
                        <div style="background:#e2e8f0;padding:60px;text-align:center;border-radius:8px;">🖼️</div>
                        <div style="background:#e2e8f0;padding:60px;text-align:center;border-radius:8px;">🖼️</div>
                        <div style="background:#e2e8f0;padding:60px;text-align:center;border-radius:8px;">🖼️</div>
                        <div style="background:#e2e8f0;padding:60px;text-align:center;border-radius:8px;">🖼️</div>
                    </div>
                </div>`,
            contact: `
                <div style="max-width:600px;margin:0 auto;">
                    <h2 contenteditable="true" style="text-align:center;margin-bottom:30px;font-size:2rem;">Свяжитесь с нами</h2>
                    <form style="background:white;padding:30px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                        <input type="text" placeholder="Ваше имя" style="width:100%;padding:12px;margin-bottom:15px;border:1px solid #e2e8f0;border-radius:8px;">
                        <input type="email" placeholder="Email" style="width:100%;padding:12px;margin-bottom:15px;border:1px solid #e2e8f0;border-radius:8px;">
                        <textarea placeholder="Сообщение" rows="4" style="width:100%;padding:12px;margin-bottom:15px;border:1px solid #e2e8f0;border-radius:8px;resize:vertical;"></textarea>
                        <button type="submit" style="width:100%;padding:12px;background:#3b82f6;color:white;border:none;border-radius:8px;font-weight:500;cursor:pointer;">Отправить</button>
                    </form>
                </div>`,
            pricing: `
                <div style="max-width:1200px;margin:0 auto;">
                    <h2 contenteditable="true" style="text-align:center;margin-bottom:40px;font-size:2rem;">Тарифы</h2>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:30px;">
                        <div style="background:white;padding:30px;border-radius:12px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <h3 contenteditable="true">Базовый</h3>
                            <div style="font-size:2.5rem;font-weight:bold;margin:20px 0;" contenteditable="true">$9<span style="font-size:1rem;color:#64748b;">/мес</span></div>
                            <ul style="list-style:none;margin-bottom:20px;color:#64748b;"><li style="padding:8px 0;">✓ Функция 1</li><li style="padding:8px 0;">✓ Функция 2</li><li style="padding:8px 0;">✓ Функция 3</li></ul>
                            <a href="#" style="display:block;padding:12px;background:#3b82f6;color:white;border-radius:8px;text-decoration:none;">Выбрать</a>
                        </div>
                        <div style="background:#3b82f6;color:white;padding:30px;border-radius:12px;text-align:center;transform:scale(1.05);">
                            <h3 contenteditable="true">Про</h3>
                            <div style="font-size:2.5rem;font-weight:bold;margin:20px 0;" contenteditable="true">$29<span style="font-size:1rem;opacity:0.8;">/мес</span></div>
                            <ul style="list-style:none;margin-bottom:20px;opacity:0.9;"><li style="padding:8px 0;">✓ Все из Базового</li><li style="padding:8px 0;">✓ Функция 4</li><li style="padding:8px 0;">✓ Функция 5</li></ul>
                            <a href="#" style="display:block;padding:12px;background:white;color:#3b82f6;border-radius:8px;text-decoration:none;">Выбрать</a>
                        </div>
                        <div style="background:white;padding:30px;border-radius:12px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <h3 contenteditable="true">Бизнес</h3>
                            <div style="font-size:2.5rem;font-weight:bold;margin:20px 0;" contenteditable="true">$99<span style="font-size:1rem;color:#64748b;">/мес</span></div>
                            <ul style="list-style:none;margin-bottom:20px;color:#64748b;"><li style="padding:8px 0;">✓ Все из Про</li><li style="padding:8px 0;">✓ Функция 6</li><li style="padding:8px 0;">✓ Приоритет</li></ul>
                            <a href="#" style="display:block;padding:12px;background:#3b82f6;color:white;border-radius:8px;text-decoration:none;">Выбрать</a>
                        </div>
                    </div>
                </div>`,
            testimonials: `
                <div style="max-width:1200px;margin:0 auto;">
                    <h2 contenteditable="true" style="text-align:center;margin-bottom:40px;font-size:2rem;">Отзывы клиентов</h2>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:30px;">
                        <div style="background:white;padding:30px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <p contenteditable="true" style="color:#64748b;font-style:italic;margin-bottom:20px;">"Отличный сервис! Рекомендую всем."</p>
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="width:40px;height:40px;background:#e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;">👤</div>
                                <div><strong contenteditable="true">Иван Петров</strong><br><span style="color:#64748b;font-size:0.875rem;" contenteditable="true">Директор</span></div>
                            </div>
                        </div>
                        <div style="background:white;padding:30px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <p contenteditable="true" style="color:#64748b;font-style:italic;margin-bottom:20px;">"Быстро, качественно, профессионально!"</p>
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="width:40px;height:40px;background:#e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;">👤</div>
                                <div><strong contenteditable="true">Мария Сидорова</strong><br><span style="color:#64748b;font-size:0.875rem;" contenteditable="true">Менеджер</span></div>
                            </div>
                        </div>
                        <div style="background:white;padding:30px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <p contenteditable="true" style="color:#64748b;font-style:italic;margin-bottom:20px;">"Лучшее решение на рынке!"</p>
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="width:40px;height:40px;background:#e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;">👤</div>
                                <div><strong contenteditable="true">Алексей Козлов</strong><br><span style="color:#64748b;font-size:0.875rem;" contenteditable="true">Предприниматель</span></div>
                            </div>
                        </div>
                    </div>
                </div>`,
            faq: `
                <div style="max-width:800px;margin:0 auto;">
                    <h2 contenteditable="true" style="text-align:center;margin-bottom:40px;font-size:2rem;">Часто задаваемые вопросы</h2>
                    <div style="display:flex;flex-direction:column;gap:15px;">
                        <details style="background:white;padding:20px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <summary style="font-weight:600;cursor:pointer;" contenteditable="true">Как начать работу?</summary>
                            <p style="margin-top:15px;color:#64748b;" contenteditable="true">Просто зарегистрируйтесь и следуйте инструкциям на экране.</p>
                        </details>
                        <details style="background:white;padding:20px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <summary style="font-weight:600;cursor:pointer;" contenteditable="true">Какие способы оплаты?</summary>
                            <p style="margin-top:15px;color:#64748b;" contenteditable="true">Мы принимаем карты Visa, MasterCard и PayPal.</p>
                        </details>
                        <details style="background:white;padding:20px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                            <summary style="font-weight:600;cursor:pointer;" contenteditable="true">Есть ли пробный период?</summary>
                            <p style="margin-top:15px;color:#64748b;" contenteditable="true">Да, 14 дней бесплатно без ограничений.</p>
                        </details>
                    </div>
                </div>`
        };
        return templates[type] || '<p>Элемент</p>';
    }

    getControlsHTML(id) {
        return `<div class="element-controls">
            <button class="element-btn" onclick="builder.moveElement('${id}', -1)" title="Вверх">↑</button>
            <button class="element-btn" onclick="builder.moveElement('${id}', 1)" title="Вниз">↓</button>
            <button class="element-btn" onclick="builder.duplicateElement('${id}')" title="Копировать">📋</button>
            <button class="element-btn" onclick="builder.deleteElement('${id}')" title="Удалить">🗑️</button>
        </div>`;
    }

    updateImage(input) {
        const url = input.value;
        if (url) {
            const container = input.closest('div');
            container.innerHTML = `<img src="${url}" style="max-width:100%;border-radius:8px;" onerror="this.parentElement.innerHTML='<p style=\'color:red;\'>Ошибка загрузки изображения</p>'">`;
        }
    }

    updateVideo(input) {
        const url = input.value;
        const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
        if (videoId) {
            const container = input.closest('div');
            container.innerHTML = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen style="border-radius:8px;"></iframe>`;
        }
    }

    selectElement(id) {
        document.querySelectorAll('.canvas-element').forEach(el => el.classList.remove('selected'));
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('selected');
            this.selectedElement = id;
        }
    }

    moveElement(id, direction) {
        const element = document.getElementById(id);
        const sibling = direction > 0 ? element.nextElementSibling : element.previousElementSibling;
        if (sibling && !sibling.classList.contains('drop-zone')) {
            direction > 0 ? sibling.after(element) : sibling.before(element);
        }
    }

    duplicateElement(id) {
        const element = this.elements.find(e => e.id === id);
        if (element) this.addElement(element.type);
    }

    deleteElement(id) {
        const element = document.getElementById(id);
        if (element) {
            element.remove();
            this.elements = this.elements.filter(e => e.id !== id);
            if (this.elements.length === 0) this.dropZone.style.display = 'flex';
        }
    }

    getContent() {
        const content = [];
        this.canvas.querySelectorAll('.canvas-element').forEach(el => {
            const clone = el.cloneNode(true);
            clone.querySelectorAll('.element-controls').forEach(c => c.remove());
            clone.querySelectorAll('.image-url-input, .video-url-input').forEach(i => i.remove());
            clone.classList.remove('canvas-element', 'selected');
            content.push(clone.outerHTML);
        });
        return content.join('\n');
    }

    loadContent(html) {
        if (!html) return;
        this.dropZone.style.display = 'none';

        const temp = document.createElement('div');
        temp.innerHTML = html;

        temp.querySelectorAll('[class*="el-"]').forEach(el => {
            const typeClass = Array.from(el.classList).find(c => c.startsWith('el-'));
            if (typeClass) {
                const type = typeClass.replace('el-', '');
                const id = `el-${++this.elementCounter}`;

                el.id = id;
                el.classList.add('canvas-element');
                el.innerHTML += this.getControlsHTML(id);

                el.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('element-btn')) this.selectElement(id);
                });

                this.elements.push({ id, type, data: {} });
                this.canvas.appendChild(el);
            }
        });
    }
}

const builder = new WebsiteBuilder();

function saveSite() {
    const name = document.getElementById('siteName').value || 'Мой сайт';
    const primaryColor = document.getElementById('primaryColor').value;
    const description = document.getElementById('siteDescription').value;

    const site = {
        id: builder.siteId || SiteStorage.generateId(),
        name,
        created: builder.siteId ? SiteStorage.get(builder.siteId)?.created : new Date().toISOString(),
        updated: new Date().toISOString(),
        pages: [{ name: 'index', title: name, content: builder.getContent() }],
        settings: { primaryColor, description }
    };

    SiteStorage.save(site);

    if (!builder.siteId) {
        window.location.href = `builder.html?id=${site.id}`;
    } else {
        alert('Сайт сохранён!');
    }
}

function togglePreview() {
    const content = builder.getContent();
    const primaryColor = document.getElementById('primaryColor').value;
    const name = document.getElementById('siteName').value || 'Мой сайт';

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;line-height:1.6;color:#333}</style>
    </head><body>${content}</body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    window.open(URL.createObjectURL(blob), '_blank');
}

function exportSite() {
    saveSite();

    const site = SiteStorage.get(builder.siteId || new URLSearchParams(window.location.search).get('id'));
    if (!site) {
        alert('Сначала сохраните сайт');
        return;
    }

    const primary = site.settings?.primaryColor || '#3b82f6';
    const content = site.pages?.[0]?.content || '';

    const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${site.name}</title>
    <meta name="description" content="${site.settings?.description || ''}">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
${content}
<script src="script.js"><\/script>
</body>
</html>`;

    const cssContent = `*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',-apple-system,sans-serif;line-height:1.6;color:#333}
.container{max-width:1200px;margin:0 auto;padding:0 20px}
h1{font-size:3rem;font-weight:700;margin-bottom:1rem}
h2{font-size:2rem;font-weight:600;margin-bottom:1rem}
h3{font-size:1.5rem;font-weight:600;margin-bottom:0.5rem}
p{margin-bottom:1rem}
.btn{display:inline-block;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:500;cursor:pointer;border:none}
.btn-primary{background:${primary};color:white}
@media(max-width:768px){h1{font-size:2rem}[style*="grid-template-columns"]{grid-template-columns:1fr!important}}`;

    const jsContent = `document.addEventListener('DOMContentLoaded',function(){
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',function(e){e.preventDefault();const t=document.querySelector(this.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'})})})});`;

    downloadFile('index.html', htmlContent);
    setTimeout(() => downloadFile('style.css', cssContent), 100);
    setTimeout(() => downloadFile('script.js', jsContent), 200);

    alert('Файлы скачаны! Загрузите их на хостинг.');
}

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}
