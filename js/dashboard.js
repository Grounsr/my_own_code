// Dashboard functionality
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    loadProjects();
    loadTemplates();
    initNavigation();
    initFileUpload();
    updateStorageInfo();
});

function initDashboard() {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;
            document.getElementById('projectsGrid').classList.toggle('list-view', view === 'list');
        });
    });

    document.getElementById('searchInput').addEventListener('input', (e) => filterProjects(e.target.value));

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterTemplates(btn.dataset.filter);
        });
    });
}

function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(item.dataset.section);
        });
    });
}

function showSection(sectionName) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.section === sectionName);
    });
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.toggle('active', section.id === `${sectionName}-section`);
    });
}

function loadProjects() {
    const projects = Storage.getProjects();
    const grid = document.getElementById('projectsGrid');
    const empty = document.getElementById('emptyState');

    if (projects.length === 0) {
        grid.style.display = 'none';
        empty.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    empty.style.display = 'none';

    grid.innerHTML = projects.map(project => `
        <div class="project-card" data-id="${project.id}">
            <div class="project-preview" onclick="openProject('${project.id}')">
                ${project.thumbnail 
                    ? `<img src="${project.thumbnail}" alt="${project.name}">`
                    : `<div class="project-preview-placeholder"><i class="fas fa-globe"></i></div>`}
            </div>
            <div class="project-info">
                <h3>${project.name}</h3>
                <div class="project-meta">Изменён: ${formatDate(project.updated || project.created)}</div>
                <div class="project-actions">
                    <button class="btn btn-primary btn-sm" onclick="openProject('${project.id}')">
                        <i class="fas fa-edit"></i> Редактировать
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="deleteProject('${project.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterProjects(query) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}

const templates = [
    { id: 'business-1', name: 'Бизнес Pro', category: 'business', color: '#6366f1' },
    { id: 'business-2', name: 'Корпоративный', category: 'business', color: '#3b82f6' },
    { id: 'portfolio-1', name: 'Портфолио Минимал', category: 'portfolio', color: '#8b5cf6' },
    { id: 'portfolio-2', name: 'Креативное портфолио', category: 'portfolio', color: '#ec4899' },
    { id: 'landing-1', name: 'SaaS Лендинг', category: 'landing', color: '#10b981' },
    { id: 'landing-2', name: 'Приложение', category: 'landing', color: '#f59e0b' },
    { id: 'shop-1', name: 'Магазин', category: 'shop', color: '#ef4444' },
    { id: 'shop-2', name: 'Каталог товаров', category: 'shop', color: '#06b6d4' }
];

function loadTemplates() {
    const grid = document.getElementById('templatesGrid');
    grid.innerHTML = templates.map(t => `
        <div class="template-card" data-category="${t.category}">
            <div class="template-preview" style="background: linear-gradient(135deg, ${t.color} 0%, ${adjustColor(t.color, -30)} 100%)">
                <div class="template-overlay">
                    <button class="btn btn-primary" onclick="useTemplate('${t.id}')">
                        <i class="fas fa-plus"></i> Использовать
                    </button>
                </div>
            </div>
            <div class="template-info">
                <h4>${t.name}</h4>
                <span>${getCategoryName(t.category)}</span>
            </div>
        </div>
    `).join('');
}

function filterTemplates(filter) {
    document.querySelectorAll('.template-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
    });
}

function getCategoryName(cat) {
    return { business: 'Бизнес', portfolio: 'Портфолио', landing: 'Лендинг', shop: 'Магазин' }[cat] || cat;
}

function adjustColor(hex, amount) {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

function createNewProject() {
    document.getElementById('newProjectModal').classList.add('active');
    document.getElementById('projectName').value = '';
    document.getElementById('projectDescription').value = '';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function saveNewProject() {
    const name = document.getElementById('projectName').value || 'Новый проект';
    const description = document.getElementById('projectDescription').value;
    const template = document.querySelector('.template-option.active')?.dataset.template || 'blank';

    const project = Storage.saveProject({
        name, description, template,
        pages: [{ id: 'page_1', name: 'Главная', blocks: [] }],
        settings: { primaryColor: '#6366f1', headingFont: 'Inter', bodyFont: 'Inter' }
    });

    closeModal('newProjectModal');
    window.location.href = `builder.html?id=${project.id}`;
}

function openProject(id) { window.location.href = `builder.html?id=${id}`; }

function deleteProject(id) {
    if (!confirm('Удалить этот проект?')) return;
    Storage.deleteProject(id);
    loadProjects();
}

function useTemplate(templateId) {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    const project = Storage.saveProject({
        name: template.name,
        template: templateId,
        pages: [{ id: 'page_1', name: 'Главная', blocks: [
            { type: 'navbar-1', id: Storage.generateId() },
            { type: 'hero-1', id: Storage.generateId() },
            { type: 'features-grid', id: Storage.generateId() },
            { type: 'footer-1', id: Storage.generateId() }
        ]}],
        settings: { primaryColor: template.color, headingFont: 'Inter', bodyFont: 'Inter' }
    });

    window.location.href = `builder.html?id=${project.id}`;
}

function initFileUpload() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    if (!uploadZone || !fileInput) return;

    uploadZone.addEventListener('click', () => fileInput.click());
    uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
    uploadZone.addEventListener('drop', async (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        await handleFiles(Array.from(e.dataTransfer.files));
    });
    fileInput.addEventListener('change', async (e) => await handleFiles(Array.from(e.target.files)));
}

async function handleFiles(files) {
    for (const file of files) {
        try {
            const asset = await FileHandler.handleImageUpload(file);
            Storage.saveAsset(asset);
        } catch (error) { alert(error.message); }
    }
    loadAssets();
    updateStorageInfo();
}

function loadAssets() {
    const assets = Storage.getAssets();
    const grid = document.getElementById('assetsGrid');
    if (!grid) return;
    grid.innerHTML = assets.map(a => `
        <div class="asset-item"><img src="${a.data}" alt="${a.name}"></div>
    `).join('');
}

function uploadAssets() { document.getElementById('fileInput')?.click(); }

function updateStorageInfo() {
    const used = Storage.getStorageUsage();
    const usedMB = (used / (1024 * 1024)).toFixed(2);
    const percentage = Math.min(100, (used / (5 * 1024 * 1024)) * 100);
    const usedEl = document.getElementById('storageUsed');
    const progressEl = document.getElementById('storageProgress');
    if (usedEl) usedEl.textContent = `${usedMB} MB`;
    if (progressEl) progressEl.style.width = `${percentage}%`;
}

function exportAllData() {
    const data = Storage.exportAll();
    FileHandler.downloadFile('siteforge_backup.json', JSON.stringify(data, null, 2), 'application/json');
}

function clearAllData() {
    if (!confirm('Удалить ВСЕ данные?')) return;
    Storage.clearAll();
    loadProjects();
    loadAssets();
    updateStorageInfo();
    alert('Все данные удалены');
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.template-option')) {
        document.querySelectorAll('.template-option').forEach(opt => opt.classList.remove('active'));
        e.target.closest('.template-option').classList.add('active');
    }
});

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}
