// app.js - Core Logic

const app = {
    state: {
        currentUser: null,
        score: 0,
        dailyTarget: 100,
        currentPage: 'page-home',
        isDarkMode: localStorage.getItem('theme') === 'dark',
        soundEnabled: true
    },

    els: {},

    init() {
        this.cacheElements();
        this.bindEvents();
        this.applyInitialTheme();
        console.log("KimyaLab v2 Başlatıldı!");
    },

    cacheElements() {
        this.els = {
            loginForm: document.getElementById('login-form'),
            userInput: document.getElementById('username-input'),
            passInput: document.getElementById('password-input'),
            loginError: document.getElementById('login-error-msg'),
            screens: document.querySelectorAll('.view-screen'),
            pages: document.querySelectorAll('.spa-page'),
            navLinks: document.querySelectorAll('.nav-item'),
            displayUser: document.getElementById('display-username'),
            displayScore: document.getElementById('display-score'),
            displayLevel: document.getElementById('display-level'),
            quoteUser: document.getElementById('quote-username'),
            dailyProgress: document.getElementById('daily-progress'),
            pointsNeeded: document.getElementById('points-needed'),
            tabloList: document.getElementById('tablo-listesi'),
            periodicGrid: document.getElementById('periodic-grid'),
            gameOverlay: document.getElementById('game-overlay'),
            themeBtn: document.getElementById('btn-theme-toggle')
        };
    },

    bindEvents() {
        // Login
        this.els.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Navigation
        this.els.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('data-target');
                this.switchPage(target);
            });
        });

        // Theme Toggle
        this.els.themeBtn.addEventListener('click', () => this.toggleTheme());
    },

    handleLogin() {
        const u = this.els.userInput.value;
        const p = this.els.passInput.value;
        const user = KIMYALAB_DATA.users.find(x => x.username === u && x.password === p);

        if (user || u === 'admin') { // Bypass for easy testing
            this.state.currentUser = u;
            this.loginSuccess();
        } else {
            this.els.loginError.textContent = "Geçersiz kullanıcı adı veya şifre!";
            this.els.loginError.style.display = 'block';
        }
    },

    loginSuccess() {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard-screen').classList.remove('hidden');
        this.els.displayUser.textContent = this.state.currentUser;
        this.els.quoteUser.textContent = this.state.currentUser;
        this.updateStats();
        this.switchPage('page-home');
        this.playSound('login');
    },

    switchPage(pageId) {
        this.els.pages.forEach(p => p.classList.add('hidden'));
        this.els.pages.forEach(p => p.classList.remove('active-page'));
        
        const target = document.getElementById(pageId);
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('active-page');
        }

        this.els.navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`[data-target="${pageId}"]`);
        if (activeLink) activeLink.classList.add('active');

        this.state.currentPage = pageId;

        // Special renderers
        if (pageId === 'page-periodic-lab') this.renderPeriodicTable();
        if (pageId === 'page-tablolar') this.renderTablolar('cations');
    },

    updateStats() {
        this.els.displayScore.textContent = this.state.score;
        const level = KIMYALAB_DATA.levels.find(l => l.requiredScore <= this.state.score) || KIMYALAB_DATA.levels[0];
        this.els.displayLevel.textContent = level.title;

        // Daily Target
        const progress = Math.min((this.state.score / this.state.dailyTarget) * 100, 100);
        this.els.dailyProgress.style.width = `${progress}%`;
        this.els.pointsNeeded.textContent = `${this.state.score} / ${this.state.dailyTarget} Puan`;
    },

    renderTablolar(category) {
        const data = KIMYALAB_DATA[category];
        if (!data) return;

        this.els.tabloList.innerHTML = data.map(item => `
            <div class="tablo-row">
                <div class="tr-left">
                    <div class="tr-symbol">${item.symbol || item.s}</div>
                    <div class="tr-name">${item.name}</div>
                </div>
                <div class="tr-charge">${item.charge || ''}</div>
            </div>
        `).join('');

        // Update active tab button style
        document.querySelectorAll('#page-tablolar .btn-back').forEach(btn => {
            btn.classList.remove('active-match');
            if (btn.textContent.toLowerCase().includes(category.substring(0, 3).toLowerCase())) {
                btn.classList.add('active-match');
            }
        });
    },

    renderPeriodicTable() {
        const grid = this.els.periodicGrid;
        grid.innerHTML = '';
        
        // Define Grid Positions (Very simplified mapping)
        KIMYALAB_DATA.elements.forEach(el => {
            const div = document.createElement('div');
            div.className = `el-box cat-${el.cat}`;
            div.innerHTML = `
                <span class="el-num">${el.n}</span>
                <span class="el-sym">${el.s}</span>
                <span class="el-name">${el.name}</span>
            `;
            
            // Manual Grid Positioning for Standard Periodic Table
            let row = 1, col = 1;
            const n = el.n;
            if (n === 1) { row = 1; col = 1; }
            else if (n === 2) { row = 1; col = 18; }
            else if (n <= 4) { row = 2; col = n - 2 === 1 ? 1 : 2; }
            else if (n <= 10) { row = 2; col = n + 8; }
            else if (n <= 12) { row = 3; col = n - 10 === 1 ? 1 : 2; }
            else if (n <= 18) { row = 3; col = n; }
            else if (n <= 36) { row = 4; col = n - 18; }
            else if (n <= 54) { row = 5; col = n - 36; }
            else if (n <= 86) { 
                if (n >= 57 && n <= 71) { row = 8; col = n - 56 + 2; } // Lanthanides
                else { row = 6; col = n <= 56 ? n - 54 : n - 70 + 2; }
            }
            else if (n <= 118) {
                if (n >= 89 && n <= 103) { row = 9; col = n - 88 + 2; } // Actinides
                else { row = 7; col = n <= 88 ? n - 86 : n - 102 + 2; }
            }

            div.style.gridRow = row;
            div.style.gridColumn = col;
            
            div.onclick = () => this.showElementInfo(el);
            grid.appendChild(div);
        });
    },

    showElementInfo(el) {
        const details = document.getElementById('element-details');
        details.style.display = 'block';
        details.innerHTML = `
            <h3>${el.name} (${el.s})</h3>
            <p><b>Atom Numarası:</b> ${el.n}</p>
            <p><b>Kategori:</b> ${el.cat.toUpperCase()}</p>
        `;
    },

    toggleTheme() {
        this.state.isDarkMode = !this.state.isDarkMode;
        document.body.classList.toggle('dark-theme', this.state.isDarkMode);
        localStorage.setItem('theme', this.state.isDarkMode ? 'dark' : 'light');
        this.els.themeBtn.innerHTML = this.state.isDarkMode ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    },

    applyInitialTheme() {
        if (this.state.isDarkMode) {
            document.body.classList.add('dark-theme');
            this.els.themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    },

    startGame(mode) {
        this.els.gameOverlay.classList.remove('hidden');
        if (window.gameManager) {
            window.gameManager.init(mode);
        }
    },

    showDashboard() {
        this.els.gameOverlay.classList.add('hidden');
    },

    filterTables(query) {
        const category = document.querySelector('#page-tablolar .active-match')?.textContent.toLowerCase();
        let key = 'cations';
        if (category?.includes('anyon')) key = 'anions';
        if (category?.includes('metal')) key = 'metals';
        if (category?.includes('ilk')) key = 'first20Elements';

        const data = KIMYALAB_DATA[key];
        const filtered = data.filter(item => 
            (item.name && item.name.toLowerCase().includes(query.toLowerCase())) || 
            (item.symbol && item.symbol.toLowerCase().includes(query.toLowerCase())) ||
            (item.s && item.s.toLowerCase().includes(query.toLowerCase()))
        );

        this.els.tabloList.innerHTML = filtered.map(item => `
            <div class="tablo-row">
                <div class="tr-left">
                    <div class="tr-symbol">${item.symbol || item.s}</div>
                    <div class="tr-name">${item.name}</div>
                </div>
                <div class="tr-charge">${item.charge || ''}</div>
            </div>
        `).join('');
    },

    addScore(points) {
        this.state.score += points;
        this.updateStats();
        if (this.state.score >= 500) this.awardBadge('b_profesor');
    },

    awardBadge(badgeId) {
        const badge = KIMYALAB_DATA.badges.find(b => b.id === badgeId);
        if (badge) {
            console.log(`Rozet Kazanıldı: ${badge.name}`);
        }
    },

    playSound(type) {
        if (!this.state.soundEnabled) return;
        console.log(`Oynatılan Ses: ${type}`);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
window.app = app;
