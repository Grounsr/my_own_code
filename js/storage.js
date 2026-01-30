/**
 * SiteForge Storage Module
 * @description Handles all localStorage operations with error handling
 * @version 2.0.0
 */

const Storage = {
    PROJECTS_KEY: 'siteforge_projects',
    ASSETS_KEY: 'siteforge_assets',
    SETTINGS_KEY: 'siteforge_settings',

    /**
     * Get all projects from localStorage
     * @returns {Array} Array of project objects
     */
    getProjects() {
        try {
            const data = localStorage.getItem(this.PROJECTS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading projects:', error);
            return [];
        }
    },

    /**
     * Get a single project by ID
     * @param {string} id - Project ID
     * @returns {Object|undefined} Project object or undefined
     */
    getProject(id) {
        return this.getProjects().find(p => p.id === id);
    },

    /**
     * Save or update a project
     * @param {Object} project - Project data
     * @returns {Object} Saved project with timestamps
     */
    saveProject(project) {
        try {
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
        } catch (error) {
            console.error('Error saving project:', error);
            throw new Error('Failed to save project');
        }
    },

    /**
     * Delete a project by ID
     * @param {string} id - Project ID to delete
     */
    deleteProject(id) {
        try {
            const projects = this.getProjects().filter(p => p.id !== id);
            localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    },

    /**
     * Get all assets from localStorage
     * @returns {Array} Array of asset objects
     */
    getAssets() {
        try {
            const data = localStorage.getItem(this.ASSETS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading assets:', error);
            return [];
        }
    },

    /**
     * Save an asset to localStorage
     * @param {Object} asset - Asset data
     * @returns {Object} Saved asset
     */
    saveAsset(asset) {
        try {
            const assets = this.getAssets();
            asset.id = asset.id || this.generateId();
            asset.created = new Date().toISOString();
            assets.push(asset);
            localStorage.setItem(this.ASSETS_KEY, JSON.stringify(assets));
            return asset;
        } catch (error) {
            console.error('Error saving asset:', error);
            throw new Error('Failed to save asset');
        }
    },

    /**
     * Delete an asset by ID
     * @param {string} id - Asset ID to delete
     */
    deleteAsset(id) {
        try {
            const assets = this.getAssets().filter(a => a.id !== id);
            localStorage.setItem(this.ASSETS_KEY, JSON.stringify(assets));
        } catch (error) {
            console.error('Error deleting asset:', error);
        }
    },

    /**
     * Get application settings
     * @returns {Object} Settings object
     */
    getSettings() {
        try {
            const data = localStorage.getItem(this.SETTINGS_KEY);
            return data ? JSON.parse(data) : { theme: 'dark', language: 'ru' };
        } catch (error) {
            console.error('Error reading settings:', error);
            return { theme: 'dark', language: 'ru' };
        }
    },

    /**
     * Save application settings
     * @param {Object} settings - Settings to save
     */
    saveSettings(settings) {
        try {
            localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    },

    /**
     * Generate a unique ID
     * @returns {string} Unique identifier
     */
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Calculate total localStorage usage in bytes
     * @returns {number} Storage usage in bytes
     */
    getStorageUsage() {
        let total = 0;
        try {
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    total += localStorage[key].length * 2; // UTF-16 = 2 bytes per char
                }
            }
        } catch (error) {
            console.error('Error calculating storage:', error);
        }
        return total;
    },

    /**
     * Clear all application data
     */
    clearAll() {
        try {
            localStorage.removeItem(this.PROJECTS_KEY);
            localStorage.removeItem(this.ASSETS_KEY);
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    },

    /**
     * Export all data for backup
     * @returns {Object} All application data
     */
    exportAll() {
        return {
            projects: this.getProjects(),
            assets: this.getAssets(),
            settings: this.getSettings(),
            exported: new Date().toISOString()
        };
    },

    /**
     * Import data from backup
     * @param {Object} data - Data to import
     */
    importData(data) {
        try {
            if (data.projects) localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(data.projects));
            if (data.assets) localStorage.setItem(this.ASSETS_KEY, JSON.stringify(data.assets));
            if (data.settings) localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(data.settings));
        } catch (error) {
            console.error('Error importing data:', error);
            throw new Error('Failed to import data');
        }
    }
};

/**
 * File Handler utility
 * @description Handles file operations
 */
const FileHandler = {
    /**
     * Read file as Data URL
     * @param {File} file - File to read
     * @returns {Promise<string>} Data URL string
     */
    readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    },

    /**
     * Handle image upload with validation
     * @param {File} file - Image file
     * @returns {Promise<Object>} Asset object
     */
    async handleImageUpload(file) {
        if (!file.type.startsWith('image/')) {
            throw new Error('File must be an image');
        }
        if (file.size > 5 * 1024 * 1024) {
            throw new Error('File size must not exceed 5MB');
        }

        const dataUrl = await this.readAsDataURL(file);
        return {
            name: file.name,
            type: file.type,
            size: file.size,
            data: dataUrl
        };
    },

    /**
     * Download content as file
     * @param {string} filename - Name of file
     * @param {string} content - File content
     * @param {string} type - MIME type
     */
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
