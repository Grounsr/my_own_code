// SiteForge Builder
let currentProject = null;
let selectedBlock = null;
let zoomLevel = 100;
let history = [];
let historyIndex = -1;
let clipboard = null;

document.addEventListener('DOMContentLoaded', () => {
    loadProject();
    initDragDrop();
    initToolbar();
    initPanels();
    initCanvas();
    initKeyboard();
    initContextMenu();
});

function loadProject() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (projectId) currentProject = Storage.getProject(projectId);

    if (!currentProject) {
        currentProject = {
            id: Storage.generateId(),
            name: 'Новый проект',
            pages: [{ id: 'page_1', name: 'Главная', blocks: [] }],
            settings: { primaryColor: '#6366f1' }
        };
    }

    document.getElementById('projectName').value = currentProject.name;
    renderCanvas();
    saveToHistory();
}

function initDragDrop() {
    document.querySelectorAll('.block-item, .element-item').forEach(item => {
        item.setAttribute('draggable', 'true');
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    const canvas = document.getElementById('canvas');
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('dragleave', handleDragLeave);
    canvas.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
    e.dataTransfer.effectAllowed = 'copy';
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.canvas-drop-zone').forEach(z => z.classList.remove('drag-active', 'drag-over'));
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    const dropZone = e.target.closest('.canvas-drop-zone') || e.target.closest('#canvas');
    if (dropZone) dropZone.classList.add('drag-over');
}

function handleDragLeave(e) {
    const dropZone = e.target.closest('.canvas-drop-zone') || e.target.closest('#canvas');
    if (dropZone && !dropZone.contains(e.relatedTarget)) dropZone.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    if (!type) return;

    document.getElementById('canvas').classList.remove('drag-over');

    const newBlock = { id: Storage.generateId(), type: type, content: {} };
    currentProject.pages[0].blocks.push(newBlock);

    renderCanvas();
    saveToHistory();
    selectBlock(newBlock.id);
}

function initToolbar() {
    document.getElementById('projectName').addEventListener('change', (e) => {
        currentProject.name = e.target.value;
        saveProject();
    });

    document.querySelectorAll('.device-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('canvas').className = 'canvas ' + btn.dataset.device;
        });
    });

    document.getElementById('zoomIn').addEventListener('click', () => setZoom(zoomLevel + 10));
    document.getElementById('zoomOut').addEventListener('click', () => setZoom(zoomLevel - 10));
    document.getElementById('zoomLevel').addEventListener('click', () => setZoom(100));
}

function setZoom(level) {
    zoomLevel = Math.max(25, Math.min(200, level));
    document.getElementById('zoomLevel').textContent = zoomLevel + '%';
    document.querySelector('.canvas-wrapper').style.transform = `scale(${zoomLevel / 100})`;
}

function initPanels() {
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.panel-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.panel + '-panel')?.classList.add('active');
        });
    });

    document.getElementById('blocksSearch')?.addEventListener('input', (e) => {
        document.querySelectorAll('.block-item').forEach(item => {
            const name = item.querySelector('span').textContent.toLowerCase();
            item.style.display = name.includes(e.target.value.toLowerCase()) ? 'block' : 'none';
        });
    });
}

function initCanvas() {
    document.getElementById('canvas').addEventListener('click', (e) => {
        const block = e.target.closest('.canvas-block');
        if (block) selectBlock(block.dataset.id);
        else deselectAll();
    });
}

function renderCanvas() {
    const canvas = document.getElementById('canvas');
    const blocks = currentProject.pages[0].blocks;

    if (blocks.length === 0) {
        canvas.innerHTML = `<div class="canvas-drop-zone"><div class="drop-zone-content"><i class="fas fa-plus-circle"></i><p>Перетащите блоки сюда</p></div></div>`;
        return;
    }

    canvas.innerHTML = blocks.map(block => `
        <div class="canvas-block" data-id="${block.id}" draggable="true">
            <div class="block-toolbar">
                <button class="block-tool-btn" onclick="moveBlockUp('${block.id}')" title="Вверх"><i class="fas fa-chevron-up"></i></button>
                <button class="block-tool-btn" onclick="moveBlockDown('${block.id}')" title="Вниз"><i class="fas fa-chevron-down"></i></button>
                <button class="block-tool-btn" onclick="duplicateBlock('${block.id}')" title="Копировать"><i class="fas fa-copy"></i></button>
                <button class="block-tool-btn danger" onclick="deleteBlock('${block.id}')" title="Удалить"><i class="fas fa-trash"></i></button>
            </div>
            ${getBlockHTML(block.type)}
        </div>
    `).join('');
}

function selectBlock(id) {
    deselectAll();
    selectedBlock = id;
    document.querySelector(`.canvas-block[data-id="${id}"]`)?.classList.add('selected');
}

function deselectAll() {
    selectedBlock = null;
    document.querySelectorAll('.canvas-block').forEach(b => b.classList.remove('selected'));
}

function moveBlockUp(id) {
    const blocks = currentProject.pages[0].blocks;
    const i = blocks.findIndex(b => b.id === id);
    if (i > 0) { [blocks[i-1], blocks[i]] = [blocks[i], blocks[i-1]]; renderCanvas(); saveToHistory(); selectBlock(id); }
}

function moveBlockDown(id) {
    const blocks = currentProject.pages[0].blocks;
    const i = blocks.findIndex(b => b.id === id);
    if (i < blocks.length - 1) { [blocks[i], blocks[i+1]] = [blocks[i+1], blocks[i]]; renderCanvas(); saveToHistory(); selectBlock(id); }
}

function duplicateBlock(id) {
    const blocks = currentProject.pages[0].blocks;
    const i = blocks.findIndex(b => b.id === id);
    const newBlock = { ...JSON.parse(JSON.stringify(blocks[i])), id: Storage.generateId() };
    blocks.splice(i + 1, 0, newBlock);
    renderCanvas(); saveToHistory(); selectBlock(newBlock.id);
}

function deleteBlock(id) {
    currentProject.pages[0].blocks = currentProject.pages[0].blocks.filter(b => b.id !== id);
    renderCanvas(); saveToHistory(); deselectAll();
}

function saveToHistory() {
    history = history.slice(0, historyIndex + 1);
    history.push(JSON.stringify(currentProject));
    historyIndex = history.length - 1;
    if (history.length > 50) { history.shift(); historyIndex--; }
}

function undo() { if (historyIndex > 0) { historyIndex--; currentProject = JSON.parse(history[historyIndex]); renderCanvas(); } }
function redo() { if (historyIndex < history.length - 1) { historyIndex++; currentProject = JSON.parse(history[historyIndex]); renderCanvas(); } }

function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveProject(); }
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); redo(); }
        if (e.key === 'Delete' && selectedBlock) deleteBlock(selectedBlock);
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && selectedBlock) {
            e.preventDefault();
            clipboard = JSON.parse(JSON.stringify(currentProject.pages[0].blocks.find(b => b.id === selectedBlock)));
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'v' && clipboard) {
            e.preventDefault();
            const newBlock = { ...clipboard, id: Storage.generateId() };
            currentProject.pages[0].blocks.push(newBlock);
            renderCanvas(); saveToHistory(); selectBlock(newBlock.id);
        }
        if (e.key === 'Escape') { deselectAll(); closeAllModals(); }
    });
}

function initContextMenu() {
    const menu = document.getElementById('contextMenu');
    document.getElementById('canvas').addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const block = e.target.closest('.canvas-block');
        if (block) { selectBlock(block.dataset.id); menu.style.left = e.clientX + 'px'; menu.style.top = e.clientY + 'px'; menu.classList.add('active'); }
    });
    document.addEventListener('click', () => menu.classList.remove('active'));
}

function saveProject() { Storage.saveProject(currentProject); showNotification('Проект сохранён'); }

function showExportModal() { document.getElementById('exportModal').classList.add('active'); }

function exportProject() {
    const blocks = currentProject.pages[0].blocks;
    const blocksHTML = blocks.map(b => getBlockHTML(b.type)).join('\n');

    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentProject.name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; }
        img { max-width: 100%; height: auto; }
        @media (max-width: 768px) {
            section { padding: 60px 20px !important; }
            h1 { font-size: 2.5rem !important; }
            [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
            [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
            [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
    </style>
</head>
<body>
${blocksHTML}
</body>
</html>`;

    FileHandler.downloadFile('index.html', html, 'text/html');
    closeModal('exportModal');
    showNotification('Файл экспортирован!');
}

function previewProject() {
    const blocks = currentProject.pages[0].blocks;
    const blocksHTML = blocks.map(b => getBlockHTML(b.type)).join('');
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${currentProject.name}</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif}</style></head><body>${blocksHTML}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    window.open(URL.createObjectURL(blob), '_blank');
}

function closeModal(id) { document.getElementById(id).classList.remove('active'); }
function closeAllModals() { document.querySelectorAll('.modal').forEach(m => m.classList.remove('active')); }

function showNotification(message) {
    const n = document.createElement('div');
    n.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    n.style.cssText = 'position:fixed;bottom:20px;right:20px;background:linear-gradient(135deg,#10b981,#34d399);color:white;padding:16px 24px;border-radius:10px;font-weight:500;display:flex;align-items:center;gap:10px;box-shadow:0 10px 30px rgba(16,185,129,0.3);z-index:1000;animation:slideIn 0.3s ease';
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
}

function handleMediaUpload(e) {
    Array.from(e.target.files).forEach(async (file) => {
        if (file.type.startsWith('image/')) {
            const asset = await FileHandler.handleImageUpload(file);
            Storage.saveAsset(asset);
            loadMediaLibrary();
        }
    });
}

function loadMediaLibrary() {
    const grid = document.getElementById('mediaGrid');
    if (!grid) return;
    grid.innerHTML = Storage.getAssets().map(a => `<div class="media-item"><img src="${a.data}" alt="${a.name}"></div>`).join('');
}

function addNewPage() {
    currentProject.pages.push({ id: Storage.generateId(), name: `Страница ${currentProject.pages.length + 1}`, blocks: [] });
    saveProject();
}

window.addEventListener('load', loadMediaLibrary);

const style = document.createElement('style');
style.textContent = '@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}';
document.head.appendChild(style);
