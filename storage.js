// SiteForge Storage Module
const Storage = {
    PROJECTS_KEY: 'siteforge_projects',
    ASSETS_KEY: 'siteforge_assets',
    SETTINGS_KEY: 'siteforge_settings',

    getProjects() {
        const data = localStorage.getItem(this.PROJECTS_KEY);
        return data ? JSON.parse(data) : [];
    },

    getProject(id) {
        return this.getProjects().find(p => p.id === id);
    },

    saveProject(project) {
        const projects = this.getProjects();
        const index = projects.findIndex(p => p.id === project.id);

        if (index >= 0) {
            projects[index] = { ...projects[index], ...project, updated: new Date().toISOString() };
        } else {
            project.id = project.id || this.generateId();
            project.created = new Date().toISOString();
            project.updated = project.created;
            projects.push(project);
        }

        localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
        return project;
    },

    deleteProject(id) {
        const projects = this.getProjects().filter(p => p.id !== id);
        localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
    },

    getAssets() {
        const data = localStorage.getItem(this.ASSETS_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveAsset(asset) {
        const assets = this.getAssets();
        asset.id = asset.id || this.generateId();
        asset.created = new Date().toISOString();
        assets.push(asset);
        localStorage.setItem(this.ASSETS_KEY, JSON.stringify(assets));
        return asset;
    },

    deleteAsset(id) {
        const assets = this.getAssets().filter(a => a.id !== id);
        localStorage.setItem(this.ASSETS_KEY, JSON.stringify(assets));
    },

    getSettings() {
        const data = localStorage.getItem(this.SETTINGS_KEY);
        return data ? JSON.parse(data) : { theme: 'dark', language: 'ru' };
    },

    saveSettings(settings) {
        localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    },

    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    getStorageUsage() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length * 2;
            }
        }
        return total;
    },

    clearAll() {
        localStorage.removeItem(this.PROJECTS_KEY);
        localStorage.removeItem(this.ASSETS_KEY);
    },

    exportAll() {
        return {
            projects: this.getProjects(),
            assets: this.getAssets(),
            settings: this.getSettings(),
            exported: new Date().toISOString()
        };
    },

    importData(data) {
        if (data.projects) localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(data.projects));
        if (data.assets) localStorage.setItem(this.ASSETS_KEY, JSON.stringify(data.assets));
        if (data.settings) localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(data.settings));
    }
};

const FileHandler = {
    readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    async handleImageUpload(file) {
        if (!file.type.startsWith('image/')) throw new Error('Файл должен быть изображением');
        if (file.size > 5 * 1024 * 1024) throw new Error('Размер файла не должен превышать 5MB');
        const dataUrl = await this.readAsDataURL(file);
        return { name: file.name, type: file.type, size: file.size, data: dataUrl };
    },

    downloadFile(filename, content, type = 'text/plain') {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};
