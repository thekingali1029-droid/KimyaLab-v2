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
        totalGames: parseInt(localStorage.getItem('totalGames') || '0'),
        grade11_stats: JSON.parse(localStorage.getItem('grade11_stats') || '{}'),
        currentDifficulty: 'all',
        currentTopicId: null
    },

    // Firebase Realtime Database REST API (Global & Ultra-reliable)
    cloudURL: 'https://kimyalab-860f2-default-rtdb.firebaseio.com/',

    els: {},

    init() {
        if (typeof KIMYALAB_DATA === 'undefined') {
            console.error("KRİTİK HATA: Veri katmanı (data.js) yüklenemedi!");
            return;
        }
        this.cacheElements();
        this.bindEvents();
        this.applyInitialTheme();
        this.updateStats();
        this.checkCloudConnectivity(); // New
        console.log("KimyaLab v2 Başlatıldı!");
    },

    async checkCloudConnectivity() {
        const indicator = document.getElementById('cloud-test-status');
        if (!indicator) return;

        try {
            const currentURL = this.getCloudURL();
            let res = await fetch(currentURL + ".json?shallow=true");
            
            // AUTO-REPAIR Logic for 404 Errors
            if (res.status === 404) {
                indicator.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Bulut Adresi Otomatik Onarılıyor...';
                
                // Potential candidates based on common naming patterns
                const candidates = [
                    currentURL.replace('-default-rtdb.europe-west1.firebasedatabase.app', '.firebaseio.com'), // Try US
                    currentURL.replace('.firebaseio.com', '-default-rtdb.europe-west1.firebasedatabase.app'), // Try Europe
                    'https://kimyalab-v2.firebaseio.com/',
                    'https://ultimate-kimyalab-v2.firebaseio.com/',
                    'https://kimya-lab-v2.firebaseio.com/',
                    'https://yesilvadi-kimyalab.firebaseio.com/',
                    'https://yesilvadit-kimyalab.firebaseio.com/',
                    'https://val-kimyalab.firebaseio.com/'
                ];

                for (let cand of candidates) {
                    if (cand === currentURL) continue;
                    try {
                        let testRes = await fetch(cand + ".json?shallow=true");
                        if (testRes.ok || testRes.status === 401) { // 401 is okay, means it exists but locked
                            localStorage.setItem('kimyalab_custom_cloud_url', cand);
                            console.log("✅ Auto-Fix found correct URL:", cand);
                            location.reload();
                            return;
                        }
                    } catch (e) {}
                }
            }

            if (res.ok) {
                indicator.innerHTML = '<i class="fa-solid fa-cloud-check" style="color:var(--success)"></i> Bulut Servisi Aktif ✅';
                indicator.style.color = 'var(--success)';
            } else {
                let data = await res.json().catch(() => ({}));
                if (data && data.error === "Permission denied") {
                    indicator.innerHTML = '<i class="fa-solid fa-cloud-bolt" style="color:var(--danger)"></i> Veritabanı İzni Yok (Firebase Rules!)';
                } else if (res.status === 404) {
                    indicator.innerHTML = '<i class="fa-solid fa-cloud-bolt" style="color:var(--danger)"></i> Bulut URL Hatası (404): <a href="#" onclick="app.repairCloudURL(); return false;" style="color:var(--primary); text-decoration:underline; font-weight:800">Düzelt</a> | <a href="#" onclick="app.resetCloudURL(); return false;" style="color:var(--danger); font-size:0.7rem;">Sıfırla/Fix</a>';
                } else {
                    indicator.innerHTML = '<i class="fa-solid fa-cloud-bolt" style="color:var(--danger)"></i> Bulut Bağlantı Sorunu (' + res.status + ')';
                }
                indicator.style.color = 'var(--danger)';
            }
        } catch (e) {
            indicator.innerHTML = '<i class="fa-solid fa-cloud-bolt" style="color:var(--danger)"></i> İnternet/Bulut Hatası! <a href="#" onclick="app.resetCloudURL(); return false;" style="color:var(--primary); text-decoration:underline;">Yenile/Sıfırla</a>';
            indicator.style.color = 'var(--danger)';
        }
    },

    resetCloudURL() {
        localStorage.removeItem('kimyalab_custom_cloud_url');
        alert("Bağlantı ayarları sıfırlandı. Tekrar deneniyor...");
        location.reload();
    },

    repairCloudURL() {
        const current = localStorage.getItem('kimyalab_custom_cloud_url') || this.cloudURL;
        const helpText = "Firebase Realtime Database URL'nizi girin.\n\n" + 
                        "Örnek: https://proje-id.firebaseio.com/\n\n" + 
                        "Bunu Firebase Console -> Realtime Database sayfasının en üstünde bulabilirsiniz.";
        const newURL = prompt(helpText, current);
        if (newURL && newURL.startsWith('http')) {
            const formatted = newURL.endsWith('/') ? newURL : newURL + '/';
            localStorage.setItem('kimyalab_custom_cloud_url', formatted);
            alert("URL kaydedildi! Yükleniyor...");
            location.reload();
        }
    },

    getCloudURL() {
        return localStorage.getItem('kimyalab_custom_cloud_url') || this.cloudURL;
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
        const registerTab = document.getElementById('tab-register');
        const guestTab = document.getElementById('tab-guest');
        const passBlock = document.getElementById('pass-block');
        const userInput = document.getElementById('username-input');
        const passInput = document.getElementById('password-input');
        const submitBtn = document.getElementById('login-submit-btn');
        const forgotLink = document.getElementById('forgot-pass-link');
        const emailBlock = document.getElementById('email-block');
        const emailInput = document.getElementById('email-input');

        normalTab.classList.remove('active-match');
        if(registerTab) registerTab.classList.remove('active-match');
        guestTab.classList.remove('active-match');
        if(forgotLink) forgotLink.style.display = 'inline-block';
        if(emailBlock) emailBlock.style.display = 'none';
        if(emailInput) emailInput.required = false;
        
        // Reset message style
        if (this.els.loginError) {
            this.els.loginError.style.display = 'none';
            this.els.loginError.style.color = '#e53e3e';
            this.els.loginError.style.background = '#fff5f5';
            this.els.loginError.style.borderColor = '#feb2b2';
        }

        if (mode === 'normal') {
            normalTab.classList.add('active-match');
            passBlock.style.display = 'flex';
            userInput.placeholder = "Kullanıcı adı";
            if(passInput) passInput.placeholder = "Şifre";
            if(submitBtn) submitBtn.innerHTML = "Laboratuvara Gir 🚀";
        } else if (mode === 'register') {
            if(registerTab) registerTab.classList.add('active-match');
            passBlock.style.display = 'flex';
            if(emailBlock) emailBlock.style.display = 'flex';
            if(emailInput) emailInput.required = true;
            userInput.placeholder = "Yeni Kullanıcı Adı";
            if(passInput) passInput.placeholder = "Yeni Şifre Belirle";
            if(submitBtn) submitBtn.innerHTML = "Hesap Oluştur ➕";
            if(forgotLink) forgotLink.style.display = 'none';
        } else if (mode === 'forgot') {
            passBlock.style.display = 'flex';
            if(emailBlock) emailBlock.style.display = 'flex';
            if(emailInput) emailInput.required = true;
            userInput.placeholder = "Kayıtlı Kullanıcı Adınız";
            if(passInput) passInput.placeholder = "YENİ Şifreniz (Değiştirmek için)";
            if(submitBtn) submitBtn.innerHTML = "Şifreyi Değiştir 🔄";
            if(forgotLink) forgotLink.style.display = 'none';
        } else {
            guestTab.classList.add('active-match');
            passBlock.style.display = 'flex'; // VIP needs password too
            userInput.placeholder = "V.I.P Erişim Adı";
            if(passInput) passInput.placeholder = "Şifre";
            if(submitBtn) submitBtn.innerHTML = "V.I.P Giriş 💎";
            if(forgotLink) forgotLink.style.display = 'none';
        }
        this.playSound('click');
    },

    async handleLogin() {
        const uRaw = this.els.userInput.value.trim();
        const p = this.els.passInput.value.trim();
        const emailInputEl = document.getElementById('email-input');
        const e = emailInputEl ? emailInputEl.value.trim() : '';

        if (!uRaw) return;

        // Firebase Key Sanitization (no . $ # [ ] / allowed)
        const userKey = uRaw.toLowerCase().replace(/[.$#[\]/]/g, "_");
        
        if (this.state.loginMode === 'guest') {
            // VIP Hesapları (Local Sadece)
            const vipAccounts = [
                { username: 'ela', password: 'kaydek', displayName: 'Ela', title: 'V.I.P Prenses 👑', avatar: 'vip_1.png', theme: 'pink' },
                { username: 'eye', password: 'ali', displayName: 'Ali EL Feriz', title: 'V.I.P Süper Simyacı 🧪', avatar: 'school_logo.jpg', theme: 'blue' }
            ];
            const vipUser = vipAccounts.find(v => v.username === userKey && v.password === p);

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

        const submitBtn = document.getElementById('login-submit-btn');
        const oldText = submitBtn.innerHTML;
        submitBtn.innerHTML = "<i class=\"fa-solid fa-spinner fa-spin\"></i> Buluta Bağlanıyor...";
        submitBtn.disabled = true;

        try {
            if (this.state.loginMode === 'register') {
                if (!p) throw new Error("Şifre boş olamaz!");
                if (!e) throw new Error("E-posta boş olamaz!");
                
                let checkRes = await fetch(this.getCloudURL() + "users/" + userKey + ".json");
                let existing = await checkRes.json();
                
                if (existing) {
                    if (existing.error) throw new Error("Bulut Hatası: " + existing.error);
                    throw new Error("Bu kullanıcı adı çoktan alınmış!");
                }

                const seed = Math.random().toString(36).substring(7);
                const newUser = {
                    username: uRaw, email: e.toLowerCase(), password: p, title: 'Çaylak',
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
                };
                const saveData = { score: 0, totalGames: 0, maxCombo: 0, badges: [] };

                // Firebase PUT creates the user object
                let putRes = await fetch(this.getCloudURL() + "users/" + userKey + ".json", {
                    method: 'PUT', body: JSON.stringify({ profile: newUser, data: saveData })
                });
                
                if (!putRes.ok) {
                    let errData = await putRes.json();
                    throw new Error("Kayıt Hatası: " + (errData.error || "Sunucuya yazılamadı. Lütfen internetinizi veya veritabanı izinlerini kontrol edin."));
                }

                // Update Local Cache
                let customUsers = JSON.parse(localStorage.getItem('kimyalab_custom_users') || '[]');
                customUsers.push(newUser);
                localStorage.setItem('kimyalab_custom_users', JSON.stringify(customUsers));

                this.state.currentUser = uRaw;
                this.state.currentUsername = userKey;
                this.loginSuccess();

            } else if (this.state.loginMode === 'forgot') {
                if (!p || !e) throw new Error("Lütfen e-posta ve yeni şifrenizi girin!");
                
                let res = await fetch(this.getCloudURL() + "users/" + userKey + ".json");
                let cloudData = await res.json();
                
                if (!cloudData) throw new Error("Böyle bir bulut hesabı bulunamadı!");
                if (cloudData.error) throw new Error("Erişim Reddedildi: " + cloudData.error);
                
                if (cloudData.profile.email !== e.toLowerCase()) throw new Error("E-posta adresiniz uyuşmuyor!");
                
                // Update only password
                let updateRes = await fetch(this.getCloudURL() + "users/" + userKey + "/profile/password.json", {
                    method: 'PUT', body: JSON.stringify(p)
                });
                
                if (!updateRes.ok) throw new Error("Şifre güncellenemedi.");
                
                this.els.loginError.textContent = "Şifreniz başarıyla değişti! Giriş yapabilirsiniz.";
                this.els.loginError.style.color = '#15803d';
                this.els.loginError.style.background = '#dcfce7';
                this.els.loginError.style.borderColor = '#86efac';
                this.els.loginError.style.display = 'block';
                setTimeout(() => this.setLoginMode('normal'), 3000);

            } else {
                // NORMAL LOGIN
                let res = await fetch(this.getCloudURL() + "users/" + userKey + ".json");
                let cloudData = await res.json();

                // MASTER ADMIN OVERRIDE (awm:kct)
                if (userKey === 'awm' && p === 'kct') {
                    this.state.currentUser = 'AWM YÖNETİCİ';
                    this.state.currentUsername = 'awm';
                    this.state.isVIP = false;
                    this.state.isAdmin = true;
                    this.loginSuccess();
                    return;
                }

                if (!res.ok) throw new Error("Bağlantı Hatası: " + (cloudData.error || "Sunucuya erişilemiyor."));
                if (!cloudData) throw new Error("Hatalı kullanıcı adı!");
                if (cloudData.error) throw new Error("Veritabanı Hatası: " + cloudData.error);
                
                // BAN CHECK
                if (cloudData.data && cloudData.data.banned === true) {
                    throw new Error("HESABINIZ ENGELLENDİ! Lütfen sistem yöneticisiyle iletişime geçin.");
                }

                if (cloudData.profile.password !== p) throw new Error("Hatalı şifre!");
                
                // 1. Update Profile Cache
                let customUsers = JSON.parse(localStorage.getItem('kimyalab_custom_users') || '[]');
                let exIndex = customUsers.findIndex(x => x.username.toLowerCase() === userKey);
                if (exIndex !== -1) customUsers[exIndex] = cloudData.profile;
                else customUsers.push(cloudData.profile);
                localStorage.setItem('kimyalab_custom_users', JSON.stringify(customUsers));
                
                // 2. IMMEDIATE STATE UPDATE from cloud
                this.state.currentUsername = userKey;
                this.state.score = cloudData.data?.score || 0;
                this.state.totalGames = cloudData.data?.totalGames || 0;
                this.state.maxCombo = cloudData.data?.maxCombo || 0;
                this.state.badges = cloudData.data?.badges || [];
                
                // 3. Update Local Game Cache
                localStorage.setItem(`kimyalab_user_${userKey}`, JSON.stringify(cloudData.data || {}));
                
                this.state.currentUser = cloudData.profile.displayName || cloudData.profile.username;
                this.loginSuccess();
            }
        } catch (err) {
            console.error("Login Error:", err);
            this.els.loginError.textContent = err.message;
            this.els.loginError.style.display = 'block';
            this.playSound('wrong');
        } finally {
            submitBtn.innerHTML = oldText;
            submitBtn.disabled = false;
        }
    },

    loginSuccess() {
        const u = this.state.currentUser;
        localStorage.setItem('currentUser', u);
        localStorage.setItem('currentUsername', this.state.currentUsername);
        
        // ADMIN CHECK (STRICT ONLY FOR 'awm')
        const adminNav = document.getElementById('nav-item-admin');
        const isAwm = (this.state.currentUsername && this.state.currentUsername.toLowerCase() === 'awm');
        if (adminNav) {
            adminNav.style.display = isAwm ? 'flex' : 'none';
        }
        this.state.isAdmin = isAwm;

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

        // --- NEW: CLOUD WARNING MESSAGE CHECK ---
        const userSaveKey = `kimyalab_user_${this.state.currentUsername.toLowerCase()}`;
        const localData = JSON.parse(localStorage.getItem(userSaveKey) || '{}');
        if (localData.message) {
            this.showRewardModal("YÖNETİCİ MESAJI 🏮", localData.message);
            // Clear message after showing? No, keep it until admin clears or user continues
        }

        if (this.els.displayUser) this.els.displayUser.innerHTML = nameHtml;
        if (this.els.quoteUser) this.els.quoteUser.innerHTML = nameHtml;

        // Load user-specific data (VIP ise zaten handleLogin'de ayarlandı, ezme)
        if (!this.state.isVIP) {
            let customUsers = JSON.parse(localStorage.getItem('kimyalab_custom_users') || '[]');
            const userData = customUsers.find(u => u.username.toLowerCase() === this.state.currentUsername) || {};
            if (userData.avatar && this.els.userAvatar) this.els.userAvatar.src = userData.avatar;
            if (userData.title) this.state.title = userData.title;
        }
        
        // --- DATA SYNCED ALREADY in handleLogin ---
        const savedData = localData;
        
        // Only set from local if state is currently empty/zero (prevents double set)
        if (this.state.score === 0 && savedData.score > 0) {
            this.state.score = savedData.score || 0;
            this.state.totalGames = savedData.totalGames || 0;
            this.state.maxCombo = savedData.maxCombo || 0;
            this.state.badges = savedData.badges || [];
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
        // SECURITY LOCK: Only 'awm' can enter page-admin
        if (pageId === 'page-admin' && !this.state.isAdmin) {
            console.error("ERİŞİM ENGELLENDİ: Sadece 'awm' yöneticisi girebilir.");
            return;
        }
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
        if (pageId === 'page-homework') this.loadHomeworkList();
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
        this.state.currentTopicId = topicId;
        const topic = KIMYALAB_DATA.grade11.find(t => t.id === topicId);
        if (!topic) return;

        const detail = document.getElementById('grade11-detail');
        const title = document.getElementById('g11-title');
        const desc = document.getElementById('g11-desc');
        const content = document.getElementById('g11-content');
        
        title.textContent = topic.name;
        desc.textContent = topic.desc;
        content.innerHTML = topic.content.replace(/\n/g, '<br>');
        
        this.setG11Difficulty('all', true);
        this.setG11Mode('study');

        detail.classList.remove('hidden');
        detail.scrollIntoView({ behavior: 'smooth' });
        this.playSound('click');
        this.speak(`${topic.name}. ${topic.desc}`);
    },

    setG11Mode(mode) {
        const tabStudy = document.getElementById('tab-g11-study');
        const tabQuiz = document.getElementById('tab-g11-quiz');
        const areaStudy = document.getElementById('g11-study-area');
        const areaQuiz = document.getElementById('g11-quiz-container');

        if (!tabStudy || !tabQuiz) return;

        if (mode === 'study') {
            tabStudy.classList.add('active-match');
            tabQuiz.classList.remove('active-match');
            areaStudy.style.display = 'block';
            areaQuiz.style.display = 'none';
        } else {
            tabStudy.classList.remove('active-match');
            tabQuiz.classList.add('active-match');
            areaStudy.style.display = 'none';
            areaQuiz.style.display = 'block';
        }
        this.playSound('click');
    },

    setG11Difficulty(diff, skipSound = false) {
        this.state.currentDifficulty = diff;
        const topicId = this.state.currentTopicId;
        const topic = KIMYALAB_DATA.grade11.find(t => t.id === topicId);
        if (!topic) return;

        // Update UI buttons
        document.querySelectorAll('.btn-diff').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.diff === diff);
        });

        // Filter questions
        let filteredQuestions = topic.questions;
        if (diff !== 'all') {
            filteredQuestions = topic.questions.filter(q => q.difficulty === diff);
        }

        const questionsArea = document.getElementById('g11-questions');
        if (!questionsArea) return;

        questionsArea.innerHTML = filteredQuestions.map((q, i) => `
            <div class="glass-card animate-slide-up g11-question-card" style="margin-bottom:20px; background:var(--bg-white)">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem">
                    <p style="font-weight:700; flex:1; padding-right:10px;">Soru ${i+1}: ${q.q}</p>
                    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:5px">
                        <span class="badge-${q.difficulty || 'easy'}">${(q.difficulty || 'easy').toUpperCase()}</span>
                        <button class="btn-hint" onclick="app.toggleG11Hint(this)">
                            <i class="fa-solid fa-lightbulb"></i> İpucu
                        </button>
                    </div>
                </div>
                
                <div class="hint-text">${q.hint || 'Bu soru için henüz ipucu eklenmedi.'}</div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:15px;">
                    ${q.options.map(opt => `
                        <button class="btn-back q-opt" style="font-size:0.85rem; padding:12px" onclick="app.checkG11Answer(this, '${opt.replace(/'/g, "\\'")}', '${q.a.replace(/'/g, "\\'")}', '${(q.explanation || '').replace(/'/g, "\\'")}')">${opt}</button>
                    `).join('')}
                </div>

                <div class="explanation-box" style="display:none">
                    <div class="explanation-title">
                        <i class="fa-solid fa-circle-info"></i> 👨‍🏫 Çözüm Açıklaması
                    </div>
                    <div class="explanation-content">
                        ${q.explanation || 'Bu sorunun çözümü hakkında detaylı bilgi bulunmamaktadır.'}
                    </div>
                </div>
            </div>
        `).join('') || '<p style="text-align:center; padding:2rem; color:var(--text-muted)">Bu zorluk seviyesinde henüz soru eklenmedi.</p>';

        this.updateG11StatsUI();
        if(!skipSound) this.playSound('click');
    },

    toggleG11Hint(btn) {
        const card = btn.closest('.g11-question-card');
        const hintEl = card.querySelector('.hint-text');
        const isHidden = window.getComputedStyle(hintEl).display === 'none';
        
        hintEl.style.display = isHidden ? 'block' : 'none';
        btn.innerHTML = isHidden ? '<i class="fa-solid fa-eye-slash"></i> Kapat' : '<i class="fa-solid fa-lightbulb"></i> İpucu';
        if(isHidden) this.playSound('click');
    },

    checkG11Answer(btn, selected, correct, explanation) {
        if (btn.classList.contains('answered')) return;
        
        const card = btn.closest('.g11-question-card');
        const topicId = this.state.currentTopicId;
        
        if (!this.state.grade11_stats[topicId]) {
            this.state.grade11_stats[topicId] = { correct: 0, answered: [] };
        }

        const questionText = card.querySelector('p').innerText;
        if (this.state.grade11_stats[topicId].answered.includes(questionText)) {
            btn.classList.add('answered');
            return;
        }

        const isCorrect = selected === correct;
        
        if (isCorrect) {
            btn.style.background = 'var(--success)';
            btn.style.color = 'white';
            this.playSound('correct');
            this.state.grade11_stats[topicId].correct++;
            this.state.grade11_stats[topicId].answered.push(questionText);
            
            this.addScore(10);
            localStorage.setItem('grade11_stats', JSON.stringify(this.state.grade11_stats));
            
            confetti({
                particleCount: 50,
                spread: 30,
                origin: { y: 0.8 }
            });
        } else {
            btn.style.background = 'var(--danger)';
            btn.style.color = 'white';
            this.playSound('wrong');
            btn.classList.add('animate-shake');
            setTimeout(() => btn.classList.remove('animate-shake'), 300);
        }

        // Show Explanation
        const explainBox = card.querySelector('.explanation-box');
        if (explainBox) {
            explainBox.style.display = 'block';
            if (!isCorrect) {
                explainBox.style.borderColor = 'var(--danger)';
                const content = explainBox.querySelector('.explanation-content');
                content.innerHTML = `<b style="color:var(--danger)">Yanlış!</b> Doğru cevap: <b>${correct}</b>.<br><br>${explanation || 'Bu konuda daha fazla çalışma yapman iyi olabilir.'}`;
            }
        }

        // Disable other options in this question
        const optionsGrid = card.querySelector('div[style*="grid"]');
        optionsGrid.querySelectorAll('button').forEach(b => {
            b.classList.add('answered');
            if (b.innerText === correct) {
                b.style.background = 'var(--success)';
                b.style.color = 'white';
                b.style.fontWeight = '800';
            }
        });

        this.updateG11StatsUI();
    },

    updateG11StatsUI() {
        const topicId = this.state.currentTopicId;
        const topic = KIMYALAB_DATA.grade11.find(t => t.id === topicId);
        const stats = this.state.grade11_stats[topicId] || { correct: 0, answered: [] };
        
        const totalScoreEl = document.getElementById('g11-total-score');
        const topicStatsEl = document.getElementById('g11-current-topic-stats');

        if (!totalScoreEl || !topicStatsEl) return;

        const totalQuestions = topic ? topic.questions.length : 0;
        const successRate = totalQuestions > 0 ? Math.round((stats.correct / totalQuestions) * 100) : 0;
        
        totalScoreEl.innerHTML = `🔥 Konu Başarısı: %${successRate}`;
        topicStatsEl.innerHTML = `<span>🎯 Doğru: ${stats.correct} / ${totalQuestions}</span>`;

        if (totalQuestions > 0 && stats.correct === totalQuestions) {
            // Reward already shown check or just show again
            // this.showRewardModal("TEBRİKLER!", `${topic.name} konusundaki tüm soruları çözdün! 🏆`);
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
        if (!this.state.currentUsername || this.state.isVIP) return;
        
        const userSaveKey = `kimyalab_user_${this.state.currentUsername.toLowerCase()}`;
        const dataToSave = {
            score: this.state.score,
            totalGames: this.state.totalGames,
            maxCombo: this.state.maxCombo,
            badges: this.state.badges
        };
        
        // 1. LOCAL SAVE FIRST
        localStorage.setItem(userSaveKey, JSON.stringify(dataToSave));

        // 2. BACKGROUND CLOUD SYNC
        if (this.getCloudURL()) {
            const cloudIndicator = document.getElementById('cloud-sync-status');
            if (cloudIndicator) {
                cloudIndicator.innerHTML = '<i class="fa-solid fa-cloud-arrow-up fa-bounce"></i> Firebase Senkron...';
                cloudIndicator.style.opacity = '1';
            }

            // Background sync - ensure currentUsername is stable
            const key = this.state.currentUsername.toLowerCase();
            
            fetch(this.getCloudURL() + "users/" + key + "/data.json", {
                method: 'PUT',
                body: JSON.stringify(dataToSave)
            }).then(async (res) => {
                if (!res.ok) {
                    let err = await res.json().catch(() => ({}));
                    throw new Error(err.error || "Sunucu Hatası");
                }
                if (cloudIndicator) {
                    cloudIndicator.innerHTML = '<i class="fa-solid fa-cloud-check" style="color:var(--success)"></i> Firebase Güncel';
                    setTimeout(() => cloudIndicator.style.opacity = '0', 2000);
                }
            }).catch(e => {
                console.warn("Firebase sync error:", e);
                if (cloudIndicator) {
                    cloudIndicator.innerHTML = '<i class="fa-solid fa-cloud-bolt" style="color:var(--danger)"></i> ' + e.message;
                    cloudIndicator.style.opacity = '1';
                }
            });
        }
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
    },
    // --- ADMIN ENGINE (SECURED FOR 'awm' ONLY) ---
    async loadAdminUsers() {
        if (!this.state.isAdmin) return;
        const listContainer = document.getElementById('admin-user-list');
        listContainer.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:50px;"><i class="fa-solid fa-spinner fa-spin"></i> Veritabanı taranıyor...</td></tr>';
        
        try {
            // 1. Get VIP List (Hardcoded IDs)
            const vips = ['ela', 'eye'];
            
            // 2. Fetch Cloud Users
            const res = await fetch(this.getCloudURL() + "users.json");
            const allUsers = await res.json() || {};
            
            let html = '';

            // Combine and Render
            const renderRow = (userKey, userData) => {
                const isVip = vips.includes(userKey.toLowerCase());
                const isBanned = userData.data && userData.data.banned === true;
                const score = (userData.data && userData.data.score) || 0;
                const avatar = (userData.profile && userData.profile.avatar) || 'school_logo.jpg';
                const name = (userData.profile && userData.profile.username) || userKey;

                return `
                    <tr style="border-bottom: 1px solid var(--border-color); ${isBanned ? 'opacity:0.5; background:rgba(239, 68, 68, 0.05)' : ''}">
                        <td style="padding:15px 10px;">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <img src="${avatar}" style="width:30px; height:30px; border-radius:50%; background:var(--bg-white);">
                                <div>
                                    <b style="display:flex; align-items:center; gap:5px;">
                                        ${name} ${isVip ? '<span style="color:var(--accent); font-size:0.6rem; background:rgba(251,192,45,0.1); padding:2px 6px; border-radius:4px;">💎 VIP</span>' : ''}
                                    </b>
                                    <span style="font-size:0.7rem; color:var(--text-muted)">${userKey}</span>
                                </div>
                            </div>
                        </td>
                        <td style="padding:15px 10px;">${(userData.profile && userData.profile.email) || 'V.I.P / Bulut Yok'}</td>
                        <td style="padding:15px 10px;">
                            <div style="display:flex; align-items:center; gap:5px;">
                                <button class="btn-back" onclick="app.adminAdjustScore('${userKey}', -100)" style="padding:2px 8px; font-size:0.7rem;">-100</button>
                                <b style="min-width:40px; text-align:center">${score}</b>
                                <button class="btn-back" onclick="app.adminAdjustScore('${userKey}', 100)" style="padding:2px 8px; font-size:0.7rem; color:var(--success)">+100</button>
                            </div>
                        </td>
                        <td style="padding:15px 10px; text-align:right;">
                            <button class="btn" onclick="app.adminWarnUser('${userKey}')" title="Uyarı Gönder" style="color:var(--accent); padding:5px;"><i class="fa-solid fa-comment-dots"></i></button>
                            <button class="btn" onclick="app.adminBanUser('${userKey}', ${!isBanned})" title="${isBanned ? 'Engeli Kaldır' : 'Engelle'}" style="color:${isBanned ? 'var(--success)' : 'var(--danger)'}; padding:5px;"><i class="fa-solid ${isBanned ? 'fa-user-check' : 'fa-user-slash'}"></i></button>
                            <button class="btn" onclick="app.adminDeleteUser('${userKey}')" title="Sil" style="color:var(--danger); padding:5px;"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                    </tr>
                `;
            };

            // Render VIPs First
            for (let v of vips) {
                if (allUsers[v]) {
                    html += renderRow(v, allUsers[v]);
                } else {
                    // Show placeholders for VIPs not in cloud yet
                    html += renderRow(v, { profile: { username: v, avatar:'vip_1.png' }, data: { score: 0 } });
                }
            }

            // Render Others
            for (let userKey in allUsers) {
                if (!vips.includes(userKey.toLowerCase())) {
                    html += renderRow(userKey, allUsers[userKey]);
                }
            }

            if (html === '') {
                listContainer.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:50px;">Kullanıcı bulunamadı.</td></tr>';
            } else {
                listContainer.innerHTML = html;
            }
        } catch (e) {
            listContainer.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:50px; color:var(--danger)">Hata: ${e.message}</td></tr>`;
        }
    },

    async adminAdjustScore(userKey, amount) {
        if (!this.state.isAdmin) return;
        try {
            const res = await fetch(this.getCloudURL() + `users/${userKey}/data.json`);
            const data = await res.json();
            const currentScore = data.score || 0;
            const newScore = Math.max(0, currentScore + amount);
            
            await fetch(this.getCloudURL() + `users/${userKey}/data.json`, {
                method: 'PATCH',
                body: JSON.stringify({ score: newScore })
            });
            this.playSound('click');
            this.loadAdminUsers();
        } catch (e) { alert("Hata: " + e.message); }
    },

    async adminWarnUser(userKey) {
        if (!this.state.isAdmin) return;
        const msg = prompt(`${userKey} kullanıcısına gönderilecek mesajı yazın:`);
        if (!msg) return;
        try {
            await fetch(this.getCloudURL() + `users/${userKey}/data.json`, {
                method: 'PATCH',
                body: JSON.stringify({ message: msg })
            });
            alert("Mesaj başarıyla gönderildi!");
        } catch (e) { alert("Hata: " + e.message); }
    },

    async adminBanUser(userKey, shouldBan) {
        if (!confirm(`${userKey} kullanıcısını ${shouldBan ? 'ENGELLEMEK' : 'ENGELİNİ KALDIRMAK'} istediğinize emin misiniz?`)) return;
        try {
            await fetch(this.getCloudURL() + `users/${userKey}/data.json`, {
                method: 'PATCH',
                body: JSON.stringify({ banned: shouldBan })
            });
            this.loadAdminUsers();
        } catch (e) { alert("İşlem başarısız: " + e.message); }
    },

    async adminDeleteUser(userKey) {
        if (!confirm(`${userKey} kullanıcısını KALICI OLARAK SİLMEK istediğinize emin misiniz? BU İŞLEM GERİ ALINAMAZ!`)) return;
        try {
            await fetch(this.getCloudURL() + `users/${userKey}.json`, { method: 'DELETE' });
            this.loadAdminUsers();
        } catch (e) { alert("Silinemedi: " + e.message); }
    },

    async adminBulkPoints() {
        if (!confirm("TÜM kullanıcılara +100 puan eklenecek. Onaylıyor musunuz?")) return;
        try {
            const res = await fetch(this.getCloudURL() + "users.json");
            const users = await res.json();
            for (let userKey in users) {
                const currentScore = (users[userKey].data && users[userKey].data.score) || 0;
                await fetch(this.getCloudURL() + `users/${userKey}/data.json`, {
                    method: 'PATCH',
                    body: JSON.stringify({ score: currentScore + 100 })
                });
            }
            alert("Puanlar dağıtıldı!");
            this.loadAdminUsers();
        } catch (e) { alert("Hata: " + e.message); }
    },

    async adminBroadcast() {
        const msg = prompt("Tüm sistemde yayınlanacak mesajı girin:");
        if (msg) {
            alert("Mesaj gönderildi! (Gelecek versiyonda bildirim sistemine entegre edilecektir)");
        }
    },

    async adminResetAllScores() {
        if (prompt("TÜM PUANLARI SIFIRLAMAK İÇİN 'SIFIRLA' YAZIN:") !== 'SIFIRLA') return;
        try {
            const res = await fetch(this.getCloudURL() + "users.json");
            const users = await res.json();
            for (let userKey in users) {
                await fetch(this.getCloudURL() + `users/${userKey}/data.json`, {
                    method: 'PATCH',
                    body: JSON.stringify({ score: 0 })
                });
            }
            alert("Tüm puanlar sıfırlandı!");
            this.loadAdminUsers();
        } catch (e) { alert("Hata: " + e.message); }
    },

    // --- HOMEWORK SYSTEM ---
    adminAddQuestionRow() {
        const container = document.getElementById('admin-questions-container');
        const count = container.children.length + 1;
        
        const row = document.createElement('div');
        row.className = 'glass-card admin-q-row animate-slide-up';
        row.style.marginBottom = '10px';
        row.style.background = 'rgba(255,255,255,0.03)';
        
        row.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <b>Soru ${count}</b>
                <button onclick="this.parentElement.parentElement.remove()" style="color:var(--danger); background:none; border:none; cursor:pointer"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            <input type="text" class="q-text btn-back" placeholder="Soru metni..." style="width:100%; margin-bottom:8px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:5px;">
                <input type="text" class="q-opt btn-back" placeholder="A Şıkkı">
                <input type="text" class="q-opt btn-back" placeholder="B Şıkkı">
                <input type="text" class="q-opt btn-back" placeholder="C Şıkkı">
                <input type="text" class="q-opt btn-back" placeholder="D Şıkkı">
            </div>
            <select class="q-ans btn-back" style="width:100%; margin-top:8px;">
                <option value="">Doğru Cevabı Seç...</option>
                <option value="0">A Şıkkı</option>
                <option value="1">B Şıkkı</option>
                <option value="2">C Şıkkı</option>
                <option value="3">D Şıkkı</option>
            </select>
        `;
        container.appendChild(row);
        this.playSound('click');
        container.scrollTop = container.scrollHeight;
    },

    async adminSaveHomework() {
        if (!this.state.isAdmin) return;
        
        const title = document.getElementById('admin-hw-title').value;
        const desc = document.getElementById('admin-hw-desc').value;
        const qRows = document.querySelectorAll('.admin-q-row');

        if (!title || qRows.length === 0) {
            alert("Başlık ve en az bir soru girmelisiniz!");
            return;
        }

        const questions = [];
        try {
            qRows.forEach(row => {
                const qText = row.querySelector('.q-text').value;
                const opts = Array.from(row.querySelectorAll('.q-opt')).map(i => i.value);
                const ansIdx = row.querySelector('.q-ans').value;

                if (!qText || opts.some(o => !o) || ansIdx === "") {
                    throw new Error("Lütfen tüm alanları ve doğru cevabı doldurun!");
                }
                questions.push({ q: qText, options: opts, a: opts[parseInt(ansIdx)] });
            });

            const hwId = 'hw_' + Date.now();
            const payload = { id: hwId, title, desc, questions, active: true, reward: 500 };

            await fetch(this.getCloudURL() + `homework/${hwId}.json`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            });

            alert("Ödev başarıyla tüm sınıfa yayınlandı! 🚀");
            document.getElementById('admin-hw-title').value = '';
            document.getElementById('admin-hw-desc').value = '';
            document.getElementById('admin-questions-container').innerHTML = '';
        } catch (e) { alert("Hata: " + e.message); }
    },

    async loadHomeworkList() {
        const list = document.getElementById('student-homework-list');
        list.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:100px;"><i class="fa-solid fa-spinner fa-spin"></i> Ödevler yükleniyor...</div>';

        try {
            const res = await fetch(this.getCloudURL() + "homework.json");
            const homeworks = await res.json();

            if (!homeworks) {
                list.innerHTML = '<div class="glass-card" style="grid-column:1/-1; text-align:center; padding:50px; opacity:0.5">Henüz ödev atanmamış...</div>';
                return;
            }

            let html = '';
            for (let id in homeworks) {
                const hw = homeworks[id];
                const doneKey = `hw_done_${hw.id}`;
                const isDone = localStorage.getItem(doneKey) === 'true'; // Fallback for local
                
                html += `
                    <div class="glass-card animate-slide-up" style="border-left: 5px solid ${isDone ? 'var(--success)' : 'var(--primary)'}; opacity: ${isDone ? '0.7' : '1'}">
                        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                            <span class="badge" style="background:${isDone ? 'var(--success)' : 'var(--accent)'}">${isDone ? 'TAMAMLANDI' : 'YENİ ÖDEV'}</span>
                            <b style="color:var(--primary)">+${hw.reward} Puan</b>
                        </div>
                        <h3>${hw.title}</h3>
                        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:15px;">${hw.desc}</p>
                        <button class="btn-primary" ${isDone ? 'disabled' : ''} onclick="app.startHomework('${hw.id}')" style="width:100%; border-radius:10px;">
                            ${isDone ? 'Çözenlerin Arasındasın ✨' : 'Ödevi Çözmeye Başla! 🚀'}
                        </button>
                    </div>
                `;
            }
            list.innerHTML = html;
        } catch (e) { list.innerHTML = `<p>Hata: ${e.message}</p>`; }
    },

    async startHomework(hwId) {
        try {
            const res = await fetch(this.getCloudURL() + `homework/${hwId}.json`);
            const hw = await res.json();
            
            if (!hw) return;
            
            this.state.currentHomeworkId = hwId;
            this.state.currentHomeworkReward = hw.reward || 500;
            
            // Custom game start with custom questions
            alert(`${hw.title} başlıyor! Toplam ${hw.questions.length} soru var.`);
            this.startGame('fusion', hw.questions); // Use fusion logic for now or custom
        } catch (e) { alert("Başlatılamadı: " + e.message); }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
    window.app = app;
});
