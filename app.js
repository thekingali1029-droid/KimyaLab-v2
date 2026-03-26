// app.js - Core Logic

const app = {
    state: {
        currentUser: null,
        score: 0,
        dailyTarget: 500, // ZORLAŞTIRILDI
        currentPage: 'page-home',
        isDarkMode: localStorage.getItem('theme') === 'dark',
        soundEnabled: true,
        selectedGameMode: null,
        maxCombo: 0,
        title: 'Çaylak',
        loginMode: 'normal',
        isVIP: false,
        vipTheme: null,
        totalGames: parseInt(localStorage.getItem('totalGames') || '0')
    },

    els: {},

    init() {
        if (typeof KIMYALAB_DATA === 'undefined') {
            console.error("KRİTİK HATA: Veri katmanı (data.js) yüklenemedi!");
            return;
        }
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
            themeBtn: document.getElementById('btn-theme-toggle'),
            soundBtn: document.getElementById('btn-sound-toggle'),
            displayTitle: document.getElementById('display-title'),
            userAvatar: document.getElementById('user-avatar')
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

        // Sound Toggle
        if (this.els.soundBtn) {
            this.els.soundBtn.addEventListener('click', () => this.toggleSound());
        }
    },
    setLoginMode(mode) {
        this.state.loginMode = mode;
        const normalTab = document.getElementById('tab-normal');
        const guestTab = document.getElementById('tab-guest');
        const passBlock = document.getElementById('pass-block');
        const userInput = document.getElementById('username-input');

        if (mode === 'normal') {
            normalTab.classList.add('active-match');
            guestTab.classList.remove('active-match');
            passBlock.style.display = 'flex';
            userInput.placeholder = "Kullanıcı adı";
        } else {
            guestTab.classList.add('active-match');
            normalTab.classList.remove('active-match');
            passBlock.style.display = 'flex'; // VIP needs password too
            userInput.placeholder = "V.I.P Erişim Adı";
        }
        this.playSound('click');
    },

    handleLogin() {
        const u = this.els.userInput.value.trim();
        const p = this.els.passInput.value.trim();

        if (!u) return;

        if (this.state.loginMode === 'guest') {
            // VIP Hesapları
            const vipAccounts = [
                { username: 'ela', password: 'kaydek', displayName: 'Ela', title: 'V.I.P Prenses 👑', avatar: 'vip_1.png', theme: 'pink' },
                { username: 'eye', password: 'ali', displayName: 'Ali EL Feriz', title: 'V.I.P Süper Simyacı 🧪', avatar: 'school_logo.jpg', theme: 'blue' }
            ];

            const vipUser = vipAccounts.find(v => v.username === u.toLowerCase() && v.password === p);

            if (vipUser) {
                this.state.currentUser = vipUser.displayName;
                this.state.currentUsername = vipUser.username;
                this.state.isVIP = true;
                this.state.vipTheme = vipUser.theme;
                this.state.title = vipUser.title;
                if (this.els.userAvatar) this.els.userAvatar.src = vipUser.avatar;
                this.applyVIPTheme(vipUser.theme);
                this.loginSuccess();
            } else {
                this.els.loginError.textContent = "V.I.P Girişi Reddedildi! Geçersiz Kimlik.";
                this.els.loginError.style.display = 'block';
                this.playSound('wrong');
            }
            return;
            
        }

        const user = KIMYALAB_DATA.users.find(x => x.username.toLowerCase() === u.toLowerCase() && x.password === p);

        if (user) {
            this.state.currentUser = user.displayName || user.username;
            this.state.currentUsername = user.username.toLowerCase();
            this.loginSuccess();
        } else {
            this.els.loginError.textContent = "Hatalı kullanıcı adı veya şifre!";
            this.els.loginError.style.display = 'block';
            this.playSound('wrong');
        }
    },

    loginSuccess() {
        const loginScr = document.getElementById('login-screen');
        const dashScr = document.getElementById('dashboard-screen');

        if (loginScr) {
            loginScr.classList.remove('active');
            loginScr.classList.add('hidden');
            loginScr.style.display = 'none';
        }
        if (dashScr) {
            dashScr.classList.remove('hidden');
            dashScr.classList.add('active');
        }

        // Royal Name Display with Tiara for VIP
        let nameHtml = this.state.currentUser;
        if (this.state.isVIP) {
            nameHtml = `<i class="fa-solid fa-crown" style="color:#ff85a1; filter:drop-shadow(0 0 8px #ff4d6d); margin-right:8px;"></i>${this.state.currentUser}`;
        }

        if (this.els.displayUser) this.els.displayUser.innerHTML = nameHtml;
        if (this.els.quoteUser) this.els.quoteUser.innerHTML = nameHtml;

        // Load user-specific data (VIP ise zaten handleLogin'de ayarlandı, ezme)
        if (!this.state.isVIP) {
            const userData = KIMYALAB_DATA.users.find(u => u.username.toLowerCase() === this.state.currentUsername) || {};
            if (userData.avatar && this.els.userAvatar) this.els.userAvatar.src = userData.avatar;
            if (userData.title) this.state.title = userData.title;
            this.state.currentUser = userData.displayName || userData.username;
        }
        
        // --- LOAD USER DATA ---
        // currentUsername was set in handleLogin, guaranteed to be accurate
        const userSaveKey = `kimyalab_user_${this.state.currentUsername}`;
        const savedData = JSON.parse(localStorage.getItem(userSaveKey) || '{}');
        
        this.state.score = savedData.score || 0;
        this.state.totalGames = savedData.totalGames || 0;
        this.state.maxCombo = savedData.maxCombo || 0;
        this.state.badges = savedData.badges || [];
        
        // Sync global badges back to per-user if needed (one-time migration for old users)
        if (this.state.badges.length === 0) {
            this.state.badges = JSON.parse(localStorage.getItem('badges') || '[]');
        }

        this.updateStats();
        this.switchPage('page-home');
        this.playSound('login');
        
        // Show welcome back toast
        if (this.state.score > 0) {
            this.showRewardModal("Hoş Geldin Tekrar!", `${this.state.score} Puanınla kaldığın yerden devam ediyorsun! 💪`);
        }
    },

    switchPage(pageId) {
        console.log("Sayfa geçişi:", pageId);
        this.els.pages.forEach(p => {
            p.classList.add('hidden');
            p.classList.remove('active-page');
        });

        const target = document.getElementById(pageId);
        if (target) {
            target.classList.remove('hidden');
            setTimeout(() => target.classList.add('active-page'), 10);
        }

        this.els.navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`[data-target="${pageId}"]`);
        if (activeLink) activeLink.classList.add('active');

        this.state.currentPage = pageId;

        if (pageId === 'page-periodic-lab') this.renderPeriodicTable();
        if (pageId === 'page-tablolar') this.renderTablolar('cations');
        if (pageId === 'page-grade11') this.renderGrade11();
        if (pageId === 'page-stats') this.renderStats();
        if (pageId === 'page-badges') this.renderBadges();
    },

    renderStats() {
        const pgScore = document.getElementById('pg-stat-score');
        const pgCombo = document.getElementById('pg-stat-combo');
        const pgLevel = document.getElementById('pg-stat-level');
        const pgBar = document.getElementById('pg-level-bar');
        const pgGames = document.getElementById('pg-stat-games');

        if (pgScore) pgScore.textContent = this.state.score;
        if (pgCombo) pgCombo.textContent = this.state.maxCombo;
        if (pgGames) pgGames.textContent = this.state.totalGames;

        const level = [...KIMYALAB_DATA.levels].reverse().find(l => this.state.score >= l.requiredScore) || KIMYALAB_DATA.levels[0];
        const nextLevel = KIMYALAB_DATA.levels[KIMYALAB_DATA.levels.indexOf(level) + 1];

        if (pgLevel) pgLevel.textContent = level.title;
        if (pgBar && nextLevel) {
            const currentReq = level.requiredScore;
            const nextReq = nextLevel.requiredScore;
            const progress = ((this.state.score - currentReq) / (nextReq - currentReq)) * 100;
            pgBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
        } else if (pgBar) {
            pgBar.style.width = '100%';
        }
    },

    renderBadges() {
        const grid = document.getElementById('rozet-grid');
        if (!grid) return;

        const earned = JSON.parse(localStorage.getItem('badges') || '[]');

        grid.innerHTML = KIMYALAB_DATA.badges.map(b => {
            const isEarned = earned.includes(b.id);
            return `
                <div class="glass-card animate-slide-up" style="text-align:center; opacity: ${isEarned ? '1' : '0.4'}; filter: ${isEarned ? 'none' : 'grayscale(1)'}">
                    <div style="font-size: 3rem; margin-bottom: 1rem; color: ${isEarned ? 'var(--accent)' : 'var(--text-muted)'}">
                        <i class="fa-solid ${b.icon}"></i>
                    </div>
                    <h3 style="font-size: 1.1rem; margin-bottom: 5px;">${b.name}</h3>
                    <p style="font-size: 0.8rem; color: var(--text-muted)">${b.desc}</p>
                    ${isEarned ? '<span style="font-size:0.7rem; color:var(--success); font-weight:800; text-transform:uppercase; margin-top:10px; display:block">KAZANILDI</span>' : ''}
                </div>
            `;
        }).join('');
    },

    updateStats() {
        if (this.els.displayScore) this.els.displayScore.textContent = this.state.score;

        // Find highest level available for current score
        const level = [...KIMYALAB_DATA.levels].reverse().find(l => this.state.score >= l.requiredScore) || KIMYALAB_DATA.levels[0];

        if (this.els.displayLevel && this.els.displayLevel.textContent !== level.title) {
            this.handleLevelUp(level);
        }

        if (this.els.displayLevel) this.els.displayLevel.textContent = level.title;

        // Title System
        const titlePool = this.state.isVIP ? KIMYALAB_DATA.vipTitles : KIMYALAB_DATA.titles;
        const currentTitle = [...titlePool].reverse().find(t => this.state.score >= t.score) || titlePool[0];

        if (this.state.title !== currentTitle.title) {
            this.state.title = currentTitle.title;
            this.showRewardModal("YENİ LAKAP!", `Tebrikler, artık bir: ${this.state.title} ✨`);
        }
        if (this.els.displayTitle) this.els.displayTitle.textContent = this.state.title;

        // Home Page Stats Sync
        const mainScore = document.getElementById('stat-main-score');
        const mainCombo = document.getElementById('stat-main-combo');
        if (mainScore) mainScore.textContent = this.state.score;
        if (mainCombo) mainCombo.textContent = this.state.maxCombo;

        const totalGamesEl = document.getElementById('stat-total-games');
        if (totalGamesEl) totalGamesEl.textContent = this.state.totalGames;

        const progress = Math.min((this.state.score / this.state.dailyTarget) * 100, 100);
        if (this.els.dailyProgress) this.els.dailyProgress.style.width = `${progress}%`;
        if (this.els.pointsNeeded) this.els.pointsNeeded.textContent = `${this.state.score} / ${this.state.dailyTarget} Puan`;

        // Wrong Questions Sync
        const wrongCard = document.getElementById('wrong-questions-card');
        const wrongCount = document.getElementById('stat-wrong-count');
        const storedWrong = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
        
        if (wrongCount) wrongCount.textContent = storedWrong.length;
        if (wrongCard) {
            wrongCard.style.display = storedWrong.length > 0 ? 'block' : 'none';
        }
    },

    handleLevelUp(level) {
        this.showRewardModal("SEVİYE ATLADIN!", `Tebrikler, yeni rütben: ${level.title} ✨`);
        this.playSound('levelup');
    },

    showRewardModal(title, desc) {
        const backdrop = document.getElementById('modal-backdrop');
        const modal = document.getElementById('level-up-modal');
        const tEl = document.getElementById('reward-title');
        const dEl = document.getElementById('reward-desc');

        if (backdrop && modal) {
            tEl.textContent = title;
            dEl.textContent = desc;
            backdrop.classList.add('active');
            modal.classList.add('active');
        }
    },

    closeRewardModal() {
        const backdrop = document.getElementById('modal-backdrop');
        const modal = document.getElementById('level-up-modal');
        if (backdrop && modal) {
            backdrop.classList.remove('active');
            modal.classList.remove('active');
        }
    },

    renderTablolar(category) {
        const data = KIMYALAB_DATA[category];
        if (!data || !this.els.tabloList) return;

        this.els.tabloList.innerHTML = data.map(item => `
            <div class="tablo-row" onmouseenter="app.playSound('hover')" onclick="app.showItemInfo(\`${item.symbol || item.s}\`, \`${category}\`)">
                <div class="tr-left">
                    <div class="tr-symbol">${item.symbol || item.s}</div>
                    <div class="tr-name">${item.name}</div>
                </div>
                <div class="tr-charge" style="font-weight:800; color:var(--primary)">${item.charge || ''}</div>
            </div>
        `).join('');

        document.querySelectorAll('#page-tablolar .btn-back').forEach(btn => {
            btn.classList.remove('active-match');
            if (btn.getAttribute('onclick').includes(category)) {
                btn.classList.add('active-match');
            }
        });
    },

    renderPeriodicTable() {
        const grid = this.els.periodicGrid;
        if (!grid) return;
        grid.innerHTML = '';

        KIMYALAB_DATA.elements.forEach(el => {
            const div = document.createElement('div');
            div.className = `el-box cat-${el.cat}`;
            div.innerHTML = `
                <span class="el-num">${el.n}</span>
                <span class="el-sym">${el.s}</span>
                <span class="el-name">${el.name}</span>
            `;

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
                if (n >= 57 && n <= 71) { row = 8; col = n - 56 + 2; }
                else { row = 6; col = n <= 56 ? n - 54 : n - 70 + 2; }
            }
            else if (n <= 118) {
                if (n >= 89 && n <= 103) { row = 9; col = n - 88 + 2; }
                else { row = 7; col = n <= 88 ? n - 86 : n - 102 + 2; }
            }

            div.style.gridColumn = col;
            div.onclick = () => this.showElementInfo(el);
            div.onmouseenter = () => this.playSound('hover');
            grid.appendChild(div);
        });
    },

    showElementInfo(el) {
        const details = document.getElementById('element-details');
        if (!details) return;
        details.style.display = 'block';
        details.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center">
                <h3>${el.name} (${el.s})</h3>
                <span style="background:var(--primary); color:white; padding:5px 10px; border-radius:10px; font-weight:800">#${el.n}</span>
            </div>
            <p style="margin-top:10px"><b>Kategori:</b> ${el.cat.toUpperCase()}</p>
            <p style="margin-top:10px; color:var(--text-muted); font-size:0.9rem; line-height:1.5;">${el.desc || 'Bu element hakkında henüz detaylı bilgi eklenmedi.'}</p>
        `;
        this.speak(`${el.name}. ${el.desc || ''}`);
    },

    showItemInfo(symbol, category) {
        const item = KIMYALAB_DATA[category].find(x => (x.symbol || x.s) === symbol);
        if (!item) return;

        const details = document.getElementById('item-details');
        if (!details) return;

        this.playSound('click');
        details.style.display = 'block';
        details.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:15px">
                <h3 style="color:var(--primary); font-size:1.5rem;">${item.name}</h3>
                <span class="glass-card" style="padding:5px 15px; font-weight:800; color:var(--primary-glow); font-size:1.2rem; border-color:var(--primary)">${item.symbol || item.s}</span>
            </div>
            <p style="color:var(--text-main); line-height:1.6; font-size:1rem;">
                ${item.desc || 'Bu madde hakkında henüz detaylı bilgi eklenmedi bilim dostu! 🧪'}
            </p>
            ${item.charge ? `<p style="margin-top:10px; font-size:0.85rem; color:var(--text-muted)"><b>Yük / Grup:</b> ${item.charge}</p>` : ''}
        `;

        // Scroll to details on mobile
        details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        this.speak(`${item.name}. ${item.desc || ''}`);
    },

    renderGrade11() {
        const grid = document.querySelector('.grade11-grid');
        if (!grid) return;

        grid.innerHTML = KIMYALAB_DATA.grade11.map(topic => `
            <div class="game-card animate-slide-up" style="background:var(--accent); min-height:140px; justify-content:center; align-items:flex-start; padding:20px;" onclick="app.showGrade11Detail('${topic.id}')">
                <i class="fa-solid fa-book-bookmark"></i>
                <h3 style="font-size:1.2rem; margin-bottom:5px;">${topic.name}</h3>
                <p style="font-size:0.8rem; opacity:0.8;">${topic.desc}</p>
            </div>
        `).join('');
    },

    showGrade11Detail(topicId) {
        const topic = KIMYALAB_DATA.grade11.find(t => t.id === topicId);
        if (!topic) return;

        const detail = document.getElementById('grade11-detail');
        const title = document.getElementById('g11-title');
        const desc = document.getElementById('g11-desc');
        const content = document.getElementById('g11-content');
        const questions = document.getElementById('g11-questions');

        title.textContent = topic.name;
        desc.textContent = topic.desc;
        content.innerHTML = topic.content.replace(/\n/g, '<br>');
        
        questions.innerHTML = topic.questions.map((q, i) => `
            <div class="glass-card" style="margin-bottom:15px; background:var(--bg-white)">
                <p style="font-weight:700; margin-bottom:1rem">Soru ${i+1}: ${q.q}</p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    ${q.options.map(opt => `
                        <button class="btn-back" style="font-size:0.8rem; padding:10px" onclick="app.checkG11Answer(this, '${opt}', '${q.a}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `).join('');

        detail.classList.remove('hidden');
        detail.scrollIntoView({ behavior: 'smooth' });
        this.playSound('click');
        this.speak(`${topic.name}. ${topic.desc}`);
    },

    checkG11Answer(btn, selected, correct) {
        if (selected === correct) {
            btn.style.background = 'var(--success)';
            btn.style.color = 'white';
            this.playSound('correct');
            this.addScore(10);
            confetti({
                particleCount: 50,
                spread: 30,
                origin: { y: 0.6 }
            });
        } else {
            btn.style.background = 'var(--danger)';
            btn.style.color = 'white';
            this.playSound('wrong');
            btn.classList.add('animate-shake');
            setTimeout(() => btn.classList.remove('animate-shake'), 300);
        }
    },

    closeGrade11Detail() {
        document.getElementById('grade11-detail').classList.add('hidden');
        this.playSound('click');
    },

    speak(text) {
        if (!this.state.soundEnabled || !window.speechSynthesis) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'tr-TR';

        const voices = window.speechSynthesis.getVoices();

        // Comprehensive search for a high-quality Turkish female voice
        let femaleVoice = voices.find(v =>
            v.lang.includes('tr') &&
            (v.name.includes('Google') || v.name.includes('Female') || v.name.includes('Emel') || v.name.includes('Duygu'))
        );

        // Secondary fallback: Any Turkish voice that isn't known to be male
        if (!femaleVoice) {
            femaleVoice = voices.find(v => v.lang.includes('tr') && !v.name.includes('Tolga') && !v.name.includes('Male'));
        }

        if (femaleVoice) {
            utterance.voice = femaleVoice;
            console.log("Seçilen Kadın Sesi:", femaleVoice.name);
        }

        utterance.rate = 0.95;
        utterance.pitch = 1.15; // Slightly higher for female tone
        utterance.volume = 0.8;

        window.speechSynthesis.speak(utterance);
    },

    toggleTheme() {
        this.state.isDarkMode = !this.state.isDarkMode;
        localStorage.setItem('theme', this.state.isDarkMode ? 'dark' : 'light');

        if (this.state.isVIP) {
            // VIP: dark-theme ASLA kullanılmaz
            document.body.classList.remove('dark-theme');

            if (this.state.vipTheme === 'blue') {
                document.body.classList.toggle('theme-vip-blue-dark', this.state.isDarkMode);
            } else {
                document.body.classList.toggle('theme-vip-pink-dark', this.state.isDarkMode);
            }
        } else {
            // Normal kullanıcı
            document.body.classList.remove('theme-vip-pink-dark', 'theme-vip-blue-dark');
            document.body.classList.toggle('dark-theme', this.state.isDarkMode);
        }

        if (this.els.themeBtn) {
            this.els.themeBtn.innerHTML = this.state.isDarkMode
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
        }
        this.playSound('click');
    },

    toggleSound() {
        this.state.soundEnabled = !this.state.soundEnabled;
        if (this.els.soundBtn) {
            this.els.soundBtn.innerHTML = this.state.soundEnabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
        }
    },

    applyInitialTheme() {
        if (this.state.isDarkMode) {
            document.body.classList.add('dark-theme');
            if (this.els.themeBtn) this.els.themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    },

    applyVIPTheme(themeType) {
        const t = themeType || this.state.vipTheme || 'pink';

        // Tüm tema class'larını temizle
        document.body.classList.remove('dark-theme', 'theme-vip-pink', 'theme-vip-pink-dark', 'theme-vip-blue', 'theme-vip-blue-dark');

        // Seçilen VIP temasını uygula
        if (t === 'blue') {
            document.body.classList.add('theme-vip-blue');
            if (this.state.isDarkMode) document.body.classList.add('theme-vip-blue-dark');
        } else {
            document.body.classList.add('theme-vip-pink');
            if (this.state.isDarkMode) document.body.classList.add('theme-vip-pink-dark');
        }

        // Tema butonunu güncelle
        if (this.els.themeBtn) {
            this.els.themeBtn.innerHTML = this.state.isDarkMode
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
        }

        // Parçacık efektlerini oluştur
        const container = document.getElementById('butterfly-container');
        if (!container) return;
        container.innerHTML = '';

        if (t === 'blue') {
            // MAVİ TEMA: Güller 🌹 ve Papatyalar 🌼
            const flowerTypes = ['🌹', '🌼', '🌻', '🌺', '🌷', '💐'];
            const leafTypes = ['🍃', '🌿', '☘️', '🪻'];

            for (let i = 0; i < 25; i++) {
                const f = document.createElement('div');
                f.className = 'butterfly';
                f.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
                f.style.left = Math.random() * 100 + 'vw';
                f.style.animationDelay = Math.random() * 15 + 's';
                f.style.fontSize = (1.8 + Math.random() * 2) + 'rem';
                container.appendChild(f);

                const l = document.createElement('div');
                l.className = 'heart-particle';
                l.textContent = leafTypes[Math.floor(Math.random() * leafTypes.length)];
                l.style.left = Math.random() * 100 + 'vw';
                l.style.animationDelay = Math.random() * 12 + 's';
                l.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
                container.appendChild(l);
            }

            // Mavi parıltılar
            for (let i = 0; i < 60; i++) {
                const s = document.createElement('div');
                s.className = 'sparkle';
                s.style.left = Math.random() * 100 + 'vw';
                s.style.top = Math.random() * 100 + 'vh';
                s.style.animationDelay = Math.random() * 5 + 's';
                s.style.background = '#60a5fa';
                container.appendChild(s);
            }

            // Logo stilini güncelle
            const logos = document.querySelectorAll('.circle-logo-img');
            logos.forEach(l => {
                l.style.borderColor = '#60a5fa';
                l.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
            });

        } else {
            // PEMBE TEMA: Kelebekler 🦋 ve Kalpler 💖
            const bTypes = ['🦋', '🧚', '🌸', '✨'];
            const hTypes = ['💖', '💕', '💗', '💓'];

            for (let i = 0; i < 20; i++) {
                const b = document.createElement('div');
                b.className = 'butterfly';
                b.textContent = bTypes[Math.floor(Math.random() * bTypes.length)];
                b.style.left = Math.random() * 100 + 'vw';
                b.style.animationDelay = Math.random() * 15 + 's';
                b.style.fontSize = (2 + Math.random() * 2.5) + 'rem';
                container.appendChild(b);

                const h = document.createElement('div');
                h.className = 'heart-particle';
                h.textContent = hTypes[Math.floor(Math.random() * hTypes.length)];
                h.style.left = Math.random() * 100 + 'vw';
                h.style.animationDelay = Math.random() * 10 + 's';
                h.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
                container.appendChild(h);
            }

            for (let i = 0; i < 80; i++) {
                const s = document.createElement('div');
                s.className = 'sparkle';
                s.style.left = Math.random() * 100 + 'vw';
                s.style.top = Math.random() * 100 + 'vh';
                s.style.animationDelay = Math.random() * 5 + 's';
                container.appendChild(s);
            }

            const logos = document.querySelectorAll('.circle-logo-img');
            logos.forEach(l => {
                l.style.borderColor = '#ffb7c5';
                l.style.boxShadow = '0 0 30px rgba(255, 77, 109, 0.6)';
            });
        }
    },

    openDifficultyModal(mode) {
        this.state.selectedGameMode = mode;
        const modal = document.getElementById('difficulty-modal');
        if (modal) modal.classList.add('active');
    },

    closeDifficultyModal() {
        const modal = document.getElementById('difficulty-modal');
        if (modal) modal.classList.remove('active');
    },

    startGameWithDifficulty(difficulty) {
        this.closeDifficultyModal();
        const overlay = document.getElementById('game-overlay');
        if (overlay) overlay.classList.remove('hidden');

        if (window.gameManager) {
            window.gameManager.init(this.state.selectedGameMode, difficulty);
        }
    },

    showProfileModal() {
        const modal = document.getElementById('profile-modal');
        if (!modal) return;

        modal.classList.add('active');
        document.getElementById('modal-display-username').textContent = this.state.currentUser;
        document.getElementById('modal-display-title').textContent = this.state.title;
        document.getElementById('modal-user-avatar').src = this.els.userAvatar.src;
        document.getElementById('stat-total-score').textContent = this.state.score;
        document.getElementById('stat-max-combo').textContent = this.state.maxCombo;

        // Render Avatars
        const avatarList = document.getElementById('avatar-list');
        const availableAvatars = this.state.isVIP ? [...KIMYALAB_DATA.vipAvatars, ...KIMYALAB_DATA.avatars] : KIMYALAB_DATA.avatars;

        avatarList.innerHTML = availableAvatars.map(url => `
            <img src="${url}" class="avatar-option ${url === this.els.userAvatar.src ? 'active' : ''}" onclick="app.changeAvatar('${url}')" onmouseenter="app.playSound('hover')">
        `).join('');

        // Render Badges
        const earned = JSON.parse(localStorage.getItem('badges') || '[]');
        const badgeList = document.getElementById('modal-badge-list');
        badgeList.innerHTML = earned.map(bid => {
            const b = KIMYALAB_DATA.badges.find(x => x.id === bid);
            return `<div class="mini-badge"><i class="fa-solid ${b.icon}"></i> ${b.name}</div>`;
        }).join('') || '<p style="font-size:0.8rem; color:var(--text-muted)">Henüz rozet kazanılmadı.</p>';
    },

    closeProfileModal() {
        document.getElementById('profile-modal').classList.remove('active');
    },

    changeAvatar(url) {
        this.els.userAvatar.src = url;
        document.getElementById('modal-user-avatar').src = url;
        document.querySelectorAll('.avatar-option').forEach(img => img.classList.remove('active'));
        const active = Array.from(document.querySelectorAll('.avatar-option')).find(img => img.src === url);
        if (active) active.classList.add('active');
    },

    startGame(mode) {
        this.state.totalGames++;
        localStorage.setItem('totalGames', this.state.totalGames);
        this.updateStats();
        this.openDifficultyModal(mode);
    },

    showDashboard() {
        const overlay = document.getElementById('game-overlay');
        if (overlay) overlay.classList.add('hidden');
        if (window.gameManager && window.gameManager.interval) {
            clearInterval(window.gameManager.interval);
        }
    },

    filterTables(query) {
        const activeBtn = document.querySelector('#page-tablolar .active-match');
        if (!activeBtn) return;

        const onclickAttr = activeBtn.getAttribute('onclick');
        let key = 'cations';
        if (onclickAttr.includes('anions')) key = 'anions';
        if (onclickAttr.includes('metals')) key = 'metals';
        if (onclickAttr.includes('compounds')) key = 'compounds';
        if (onclickAttr.includes('first20Elements')) key = 'first20Elements';
        if (onclickAttr.includes('acidsBases')) key = 'acidsBases';
        if (onclickAttr.includes('labEquip')) key = 'labEquip';

        const data = KIMYALAB_DATA[key];
        const filtered = data.filter(item => {
            const name = (item.name || item.n || '').toLowerCase();
            const symbol = (item.symbol || item.s || '').toLowerCase();
            const q = query.toLowerCase();
            return name.includes(q) || symbol.includes(q);
        });

        this.els.tabloList.innerHTML = filtered.map(item => `
            <div class="tablo-row" onmouseenter="app.playSound('hover')" onclick="app.showItemInfo(\`${item.symbol || item.s}\`, \`${key}\`)">
                <div class="tr-left">
                    <div class="tr-symbol">${item.symbol || item.s}</div>
                    <div class="tr-name">${item.name}</div>
                </div>
                <div class="tr-charge" style="font-weight:800; color:var(--primary)">${item.charge || ''}</div>
            </div>
        `).join('');
    },

    addScore(points) {
        this.state.score += points;
        this.saveUserData();
        this.updateStats();

        // Achievement checks for current session score
        if (this.state.score >= 100) this.awardBadge('b_caylak');
        if (this.state.score >= 500) this.awardBadge('b_profesor');
        if (this.state.score >= 1000) this.awardBadge('b_legend');
    },

    saveUserData() {
        if (!this.state.currentUsername) return;
        const userSaveKey = `kimyalab_user_${this.state.currentUsername}`;
        const dataToSave = {
            score: this.state.score,
            totalGames: this.state.totalGames,
            maxCombo: this.state.maxCombo,
            badges: this.state.badges || JSON.parse(localStorage.getItem('badges') || '[]')
        };
        localStorage.setItem(userSaveKey, JSON.stringify(dataToSave));
    },

    awardBadge(badgeId) {
        if (!this.state.badges) this.state.badges = [];
        if (this.state.badges.includes(badgeId)) return;

        const badge = KIMYALAB_DATA.badges.find(b => b.id === badgeId);
        if (badge) {
            this.state.badges.push(badgeId);
            // Global fallback for total completionists
            const earnedGlobal = JSON.parse(localStorage.getItem('badges') || '[]');
            if (!earnedGlobal.includes(badgeId)) {
                earnedGlobal.push(badgeId);
                localStorage.setItem('badges', JSON.stringify(earnedGlobal));
            }
            
            this.saveUserData();
            this.showRewardModal("YENİ ROZET!", `${badge.name}: ${badge.desc} 🏅`);
            this.playSound('badge');
        }
    },

    playSound(type) {
        if (!this.state.soundEnabled) return;

        const sounds = {
            click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
            hover: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
            correct: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
            wrong: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
            levelup: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3',
            badge: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'
        };

        if (sounds[type]) {
            const audio = new Audio(sounds[type]);
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Audio play failed:", e));
        }
    },

    // TOURNAMENT LOGIC
    showTournamentSetup() {
        this.switchPage('page-tournament-setup');
        this.setTournamentTeams(3); // Default
    },

    setTournamentTeams(count) {
        document.querySelectorAll('.team-count-btn').forEach(b => {
            b.classList.remove('active');
            if (parseInt(b.textContent) === count) b.classList.add('active');
        });

        const container = document.getElementById('tournament-names-container');
        if (!container) return;

        container.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            container.innerHTML += `
                <div>
                    <label style="color:var(--text-muted); font-size:0.8rem;">Takım ${i} Lakabı:</label>
                    <input type="text" class="input-block" id="t-name-${i}" placeholder="Lakap yaz..." value="Takım ${i}" 
                           style="padding:12px; margin-top:5px; background:var(--bg-white); border:1px solid var(--border-color); color:var(--text-main); width:100%; border-radius:10px;">
                </div>
            `;
        }
        this.state.tournamentTeamCount = count;
    },

    startTournament() {
        const teams = [];
        for (let i = 1; i <= this.state.tournamentTeamCount; i++) {
            const name = document.getElementById(`t-name-${i}`).value || `Takım ${i}`;
            teams.push({ name: name, score: 0, lives: 5, hints: 3, active: true });
        }

        if (window.gameManager) {
            this.playSound('click');
            gameManager.initTournament(teams);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
    window.app = app;
});
