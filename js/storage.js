// Хранилище сайтов в localStorage
const SiteStorage = {
    KEY: 'website_builder_sites',

    getAll() {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : [];
    },

    get(id) {
        const sites = this.getAll();
        return sites.find(s => s.id === id);
    },

    save(site) {
        const sites = this.getAll();
        const index = sites.findIndex(s => s.id === site.id);

        if (index >= 0) {
            sites[index] = site;
        } else {
            sites.push(site);
        }

        localStorage.setItem(this.KEY, JSON.stringify(sites));
        return site;
    },

    delete(id) {
        const sites = this.getAll().filter(s => s.id !== id);
        localStorage.setItem(this.KEY, JSON.stringify(sites));
    },

    generateId() {
        return 'site_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
};