// app.js - Core Logic

const app = {
    state: {
        currentUser: null,
        score: 0,
        dailyTarget: 500,
        weeklyScore: 0,
        weeklyTarget: 2500,
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
        grade9_stats: JSON.parse(localStorage.getItem('grade9_stats') || '{}'),
        grade10_stats: JSON.parse(localStorage.getItem('grade10_stats') || '{}'),
        grade11_stats: JSON.parse(localStorage.getItem('grade11_stats') || '{}'),
        grade12_stats: JSON.parse(localStorage.getItem('grade12_stats') || '{}'),
        selectedGameMode: null,
        selectedTable: null,
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
        this.checkCloudConnectivity(); 
        
        // --- 📢 BROADCAST ENGINE START ---
        this.checkGlobalBroadcast();
        setInterval(() => this.checkGlobalBroadcast(), 120000); // Check every 2 mins
        
        console.log("KimyaLab v2 Başlatıldı!");
        
        // Modal background close
        const m = document.getElementById('chem-modal');
        if (m) m.onclick = (e) => { if(e.target === m) m.classList.remove('active'); };
    },

    async checkGlobalBroadcast() {
        try {
            const res = await fetch(this.getCloudURL() + "global_broadcast.json");
            const b = await res.json();
            if (!b || !b.id) return;

            const lastId = localStorage.getItem('last_bcast_id');
            if (b.id !== lastId) {
                localStorage.setItem('last_bcast_id', b.id);
                this.showRewardModal("Sistem Duyurusu 📢", b.msg);
                this.playSound('login');
            }
        } catch (e) { console.warn("Broadcast check failed:", e); }
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
        const teacherTab = document.getElementById('tab-teacher');
        const passBlock = document.getElementById('pass-block');
        const userInput = document.getElementById('username-input');
        const passInput = document.getElementById('password-input');
        const submitBtn = document.getElementById('login-submit-btn');
        const forgotLink = document.getElementById('forgot-pass-link');
        const emailBlock = document.getElementById('email-block');
        const emailInput = document.getElementById('email-input');

        if(normalTab) normalTab.classList.remove('active-match');
        if(registerTab) registerTab.classList.remove('active-match');
        if(teacherTab) teacherTab.classList.remove('active-match');
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
        } else if (mode === 'teacher') {
            const tTab = document.getElementById('tab-teacher');
            if(tTab) tTab.classList.add('active-match');
            passBlock.style.display = 'flex';
            userInput.placeholder = "Öğretmen / Yönetici Adı";
            if(passInput) passInput.placeholder = "Yönetici Şifresi";
            if(submitBtn) submitBtn.innerHTML = "Güvenli Giriş <i class='fa-solid fa-shield'></i>";
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
                // NORMAL LOGIN / TEACHER LOGIN
                let res = await fetch(this.getCloudURL() + "users/" + userKey + ".json");
                let cloudData = await res.json();

                // MASTER TEACHER / ADMIN OVERRIDE
                if (userKey === 'awm' && p === 'kct') {
                    this.state.currentUser = 'YÖNETİCİ ÖĞRETMEN';
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
        const userKey = this.state.currentUsername ? this.state.currentUsername.toLowerCase() : '';
        localStorage.setItem('currentUser', u);
        localStorage.setItem('currentUsername', userKey);
        
        this.state.isVIP = false;

        // --- 🛡️ ADMIN CHECK (awm only) ---
        const adminNav = document.getElementById('nav-item-admin');
        const isAwm = (userKey === 'awm');
        if (isAwm) {
            if (adminNav) adminNav.style.display = 'flex';
            this.loadAdminNotifications();
        } else {
            if (adminNav) adminNav.style.display = 'none';
        }
        this.state.isAdmin = isAwm;

        // Ensure everything is ready
        this.updateStats();
        this.renderBadges();
        this.renderStats();

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

        // Royal Name Display with Shield for Teacher
        let nameHtml = this.state.currentUser;
        if (this.state.isAdmin) {
            nameHtml = `<i class="fa-solid fa-user-shield" style="color:var(--danger); filter:drop-shadow(0 0 8px rgba(239, 68, 68, 0.4)); margin-right:8px;"></i>${this.state.currentUser}`;
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
            this.state.weeklyScore = savedData.weeklyScore || 0;
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
        if (pageId === 'page-grade9') this.renderGrade9();
        if (pageId === 'page-grade10') this.renderGrade10();
        if (pageId === 'page-grade11') this.renderGrade11();
        if (pageId === 'page-grade12') this.renderGrade12();
        if (pageId === 'page-grades') this.renderGrades();
        if (pageId === 'page-stats') this.renderStats();
        if (pageId === 'page-badges') this.renderBadges();
        if (pageId === 'page-homework') this.loadHomeworkList();
        if (pageId === 'page-notifications') this.loadNotifications();
        if (pageId === 'page-admin') this.switchAdminView('dashboard');
        if (pageId === 'page-tournament') this.loadLiveTournament();
    },

    renderGrades() {
        const grades = [9, 10, 11, 12];
        const container = document.querySelector('.grades-main-grid');
        if (!container) return;

        grades.forEach(g => {
            const stats = JSON.parse(localStorage.getItem(`grade${g}_stats`) || '{}');
            let totalPossible = 0;
            let totalCorrect = 0;
            
            KIMYALAB_DATA[`grade${g}`].forEach(topic => {
                totalPossible += topic.questions.length;
                if (stats[topic.id]) {
                    totalCorrect += stats[topic.id].correct || 0;
                }
            });

            const percent = totalPossible > 0 ? Math.round((totalCorrect / totalPossible) * 100) : 0;
            
            // Find card index and update it
            const card = container.children[g - 9];
            if (card) {
                const badge = card.querySelector('.fa-award').parentElement;
                if (badge) badge.innerHTML = `<i class="fa-solid fa-award"></i> %${percent} Başarı`;
            }
        });
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
        
        // Render history log
        this.renderActivityHistory();
    },

    async renderActivityHistory() {
        const logContainer = document.getElementById('student-activity-log');
        if (!logContainer) return;
        
        try {
            const userKey = this.state.currentUsername.toLowerCase();
            const res = await fetch(this.getCloudURL() + `users/${userKey}/history.json`);
            const history = await res.json();
            
            if (!history) {
                logContainer.innerHTML = '<p style="text-align:center; opacity:0.5; padding:30px;">Henüz bir geçmiş kaydı bulunmuyor...</p>';
                return;
            }

            const entries = Object.entries(history).reverse();
            logContainer.innerHTML = entries.map(([id, h]) => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:15px; background:rgba(255,255,255,0.02); border-radius:12px; border:1px solid var(--border-color);">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <i class="fa-solid fa-certificate" style="color:var(--success); font-size:1.2rem;"></i>
                        <div>
                            <b style="display:block; font-size:1rem;">${h.title}</b>
                            <span style="font-size:0.75rem; color:var(--text-muted);">${new Date(h.time).toLocaleString()}</span>
                        </div>
                    </div>
                    <b style="color:var(--primary); font-size:1.1rem;">+${h.score} P</b>
                </div>
            `).join('');
        } catch (e) {
            logContainer.innerHTML = '<p style="text-align:center; opacity:0.5; padding:20px;">Geçmiş yüklenemedi.</p>';
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

    resetMyBadges() {
        if (!confirm("Tüm kazandığın rozetleri sıfırlamak istediğine emin misin? \nBu işlem geri alınamaz!")) return;
        
        this.state.badges = [];
        localStorage.setItem('badges', JSON.stringify([]));
        
        // Update local user cache
        const userKey = `kimyalab_user_${this.state.currentUsername.toLowerCase()}`;
        const stored = JSON.parse(localStorage.getItem(userKey) || '{}');
        stored.badges = [];
        localStorage.setItem(userKey, JSON.stringify(stored));

        // Background sync
        this.saveUserData();
        
        // UI Update
        this.renderBadges();
        this.playSound('click');
        alert("Rozetlerin başarıyla sıfırlandı. Başarılar dileriz! 🧪");
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

        const wProgress = Math.min((this.state.weeklyScore / this.state.weeklyTarget) * 100, 100);
        const wProgEl = document.getElementById('weekly-progress');
        const wPointsEl = document.getElementById('weekly-points-needed');
        if (wProgEl) wProgEl.style.width = `${wProgress}%`;
        if (wPointsEl) wPointsEl.textContent = `${this.state.weeklyScore} / ${this.state.weeklyTarget} Puan`;

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
        const modal = document.getElementById('chem-modal');
        const content = document.getElementById('chem-modal-content');
        if (!modal || !content) return;
        
        this.playSound('click');
        modal.classList.add('active');
        
        content.innerHTML = `
            <div class="modal-header-grad" style="background: linear-gradient(135deg, #0d9488, #34d399);">
                <button class="modal-close-btn" onclick="document.getElementById('chem-modal').classList.remove('active')"><i class="fa-solid fa-xmark"></i></button>
                <div class="modal-pill">ÖZEL KİMYASAL YAPI</div>
                <h1 style="font-size:4.5rem; margin:0; line-height:1; font-weight:900;">${el.s}</h1>
                <h2 style="font-size:2rem; margin:10px 0 0 0; opacity:0.9;">${el.name}</h2>
            </div>
            <div style="padding:30px; background:rgba(255,255,255,0.02)">
                <div class="modal-pill modal-pill-teal" style="font-size:0.6rem;">Ramazan Hoca Notu 📝</div>
                <p style="font-size:1rem; line-height:1.6; color:white; margin-bottom:25px; opacity:0.9;">
                    ${el.desc || `${el.name}, doğada bulunan temel bir elementtir. Kimyasal reaksiyonlarda ve laboratuvar çalışmalarında ${el.cat} grubunun özelliklerini sergiler.`}
                </p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                    <div class="modal-stat-card">
                        <div style="font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:5px;">SEMBOL</div>
                        <div style="font-size:1.4rem; font-weight:900; color:#14b8a6">${el.s}</div>
                    </div>
                    <div class="modal-stat-card">
                        <div style="font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:5px;">ATOM NO</div>
                        <div style="font-size:1.4rem; font-weight:900; color:#14b8a6">#${el.n}</div>
                    </div>
                </div>
            </div>
            <button class="btn-teal-action" onclick="app.speak('${el.name}. ${el.desc || ''}')">
                <i class="fa-solid fa-volume-high"></i> Sesli Dinleme
            </button>
        `;
    },

    showItemInfo(symbol, category) {
        const item = KIMYALAB_DATA[category].find(x => (x.symbol || x.s) === symbol);
        if (!item) return;

        const modal = document.getElementById('chem-modal');
        const content = document.getElementById('chem-modal-content');
        if (!modal || !content) return;
        
        this.playSound('click');
        modal.classList.add('active');

        const colors = {
            compounds: 'linear-gradient(135deg, #1d4ed8, #60a5fa)',
            acidsBases: 'linear-gradient(135deg, #e11d48, #fb7185)',
            cations: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            anions: 'linear-gradient(135deg, #059669, #34d399)'
        };
        const grad = colors[category] || 'linear-gradient(135deg, #6b7280, #9ca3af)';

        content.innerHTML = `
            <div class="modal-header-grad" style="background: ${grad}">
                <button class="modal-close-btn" onclick="document.getElementById('chem-modal').classList.remove('active')"><i class="fa-solid fa-xmark"></i></button>
                <div class="modal-pill">${category.toUpperCase()}</div>
                <h1 style="font-size:4rem; margin:0; line-height:1; font-weight:900;">${item.symbol || item.s}</h1>
                <h2 style="font-size:1.8rem; margin:10px 0 0 0; opacity:0.9;">${item.name || item.n}</h2>
            </div>
            <div style="padding:30px; background:rgba(255,255,255,0.02)">
                <div class="modal-pill modal-pill-teal" style="font-size:0.6rem;">Ramazan Hoca Notu 📝</div>
                <p style="font-size:0.95rem; line-height:1.6; color:white; margin-bottom:25px; opacity:0.9;">
                    ${item.desc || `Bu kimyasal yapı, ${item.name || item.n} olarak bilinir. Elementlerin atomik düzeydeki etkileşimi sonucu oluşmuş kritik bir bileşendir.`}
                </p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                    <div class="modal-stat-card">
                        <div style="font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:5px;">FONKSİYONEL SEMBOL</div>
                        <div style="font-size:1.4rem; font-weight:900; color:#14b8a6">${item.symbol || item.s}</div>
                    </div>
                    <div class="modal-stat-card">
                        <div style="font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:5px;">YÜK / DURUM</div>
                        <div style="font-size:1.4rem; font-weight:900; color:#14b8a6">${item.charge || 'STABİL'}</div>
                    </div>
                </div>
            </div>
            <button class="btn-teal-action" onclick="app.speak('${item.name || item.n}. ${item.desc || ''}')">
                <i class="fa-solid fa-volume-high"></i> Sesli Dinleme
            </button>
        `;
    },

    // --- GRADE 9 SYSTEM ---
    renderGrade9() {
        const grid = document.querySelector('.grade9-grid');
        if (!grid) return;
        grid.innerHTML = KIMYALAB_DATA.grade9.map(topic => `
            <div class="game-card animate-slide-up" style="background:#4ade80; min-height:140px; justify-content:center; align-items:flex-start; padding:20px;" onclick="app.showGrade9Detail('${topic.id}')">
                <i class="fa-solid fa-atom"></i>
                <h3 style="font-size:1.2rem; margin-bottom:5px;">${topic.name}</h3>
                <p style="font-size:0.8rem; opacity:0.8;">${topic.desc}</p>
            </div>
        `).join('');
    },

    showGrade9Detail(topicId) {
        this.state.currentTopicId = topicId;
        const topic = KIMYALAB_DATA.grade9.find(t => t.id === topicId);
        if (!topic) return;

        const detail = document.getElementById('grade9-detail');
        const title = document.getElementById('g9-title');
        const desc = document.getElementById('g9-desc');
        const content = document.getElementById('g9-content');
        
        title.textContent = topic.name;
        desc.textContent = topic.desc;
        content.innerHTML = topic.content.replace(/\n/g, '<br>');
        
        this.setG9Difficulty('all', true);
        this.setG9Mode('study');

        detail.classList.remove('hidden');
        detail.scrollIntoView({ behavior: 'smooth' });
        this.playSound('click');
        this.speak(`${topic.name}. ${topic.desc}`);
    },

    setG9Mode(mode) {
        const tabStudy = document.getElementById('tab-g9-study');
        const tabQuiz = document.getElementById('tab-g9-quiz');
        const areaStudy = document.getElementById('g9-study-area');
        const areaQuiz = document.getElementById('g9-quiz-container');
        if (!tabStudy || !tabQuiz) return;
        if (mode === 'study') {
            tabStudy.classList.add('active-match'); tabQuiz.classList.remove('active-match');
            areaStudy.style.display = 'block'; areaQuiz.style.display = 'none';
        } else {
            tabStudy.classList.remove('active-match'); tabQuiz.classList.add('active-match');
            areaStudy.style.display = 'none'; areaQuiz.style.display = 'block';
        }
        this.playSound('click');
    },

    setG9Difficulty(diff, skipSound = false) {
        this.state.currentDifficulty = diff;
        const topicId = this.state.currentTopicId;
        const topic = KIMYALAB_DATA.grade9.find(t => t.id === topicId);
        if (!topic) return;

        // Update UI buttons
        document.querySelectorAll('.btn-diff-g9').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.diff === diff);
        });
        let filteredQuestions = diff === 'all' ? topic.questions : topic.questions.filter(q => q.difficulty === diff);
        const questionsArea = document.getElementById('g9-questions');
        if (!questionsArea) return;

        questionsArea.innerHTML = filteredQuestions.map((q, i) => `
            <div class="glass-card animate-slide-up g9-question-card" style="margin-bottom:20px; background:var(--bg-white)">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem">
                    <p style="font-weight:700; flex:1; padding-right:10px;">Soru ${i+1}: ${q.q}</p>
                    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:5px">
                        <span class="badge-${q.difficulty || 'easy'}">${(q.difficulty || 'easy').toUpperCase()}</span>
                        <button class="btn-hint" onclick="app.toggleG9Hint(this)"><i class="fa-solid fa-lightbulb"></i> İpucu</button>
                    </div>
                </div>
                <div class="hint-text" style="display:none; padding:10px; background:rgba(251, 192, 45, 0.1); border-radius:8px; margin-bottom:10px; font-size:0.9rem; border-left:4px solid var(--primary)">${q.hint || 'İpucu yok.'}</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:15px;">
                    ${q.options.map(opt => `<button class="btn-back q-opt" style="font-size:0.85rem; padding:12px" onclick="app.checkG9Answer(this, '${opt.replace(/'/g, "\\'")}', '${q.a.replace(/'/g, "\\'")}', '${(q.explanation || '').replace(/'/g, "\\'")}')">${opt}</button>`).join('')}
                </div>
                <div class="explanation-box" style="display:none; margin-top:15px; padding:15px; background:rgba(37, 99, 235, 0.05); border-radius:10px; border-left:4px solid var(--success)">
                    <div style="font-weight:800; color:var(--primary); margin-bottom:5px;"><i class="fa-solid fa-circle-info"></i> Çözüm</div>
                    <div class="explanation-content">${q.explanation || 'Bilgi yok.'}</div>
                </div>
            </div>
        `).join('') || '<p style="text-align:center; padding:2rem; opacity:0.5">Henüz soru eklenmedi.</p>';

        this.updateG9StatsUI();
        if(!skipSound) this.playSound('click');
    },

    toggleG9Hint(btn) {
        const card = btn.closest('.g9-question-card');
        const hintEl = card.querySelector('.hint-text');
        const isHidden = window.getComputedStyle(hintEl).display === 'none';
        hintEl.style.display = isHidden ? 'block' : 'none';
        btn.innerHTML = isHidden ? '<i class="fa-solid fa-eye-slash"></i> Kapat' : '<i class="fa-solid fa-lightbulb"></i> İpucu';
        if(isHidden) this.playSound('click');
    },

    checkG9Answer(btn, selected, correct, explanation) {
        if (btn.classList.contains('answered')) return;
        const card = btn.closest('.g9-question-card');
        const topicId = this.state.currentTopicId;
        if (!this.state.grade9_stats[topicId]) this.state.grade9_stats[topicId] = { correct: 0, answered: [] };
        const questionText = card.querySelector('p').innerText;
        if (this.state.grade9_stats[topicId].answered.includes(questionText)) return;

        const isCorrect = selected === correct;
        if (isCorrect) {
            btn.style.background = 'var(--success)'; btn.style.color = 'white';
            this.playSound('correct'); this.state.grade9_stats[topicId].correct++;
            this.state.grade9_stats[topicId].answered.push(questionText);
            this.addScore(10); localStorage.setItem('grade9_stats', JSON.stringify(this.state.grade9_stats));
            confetti({ particleCount: 30, spread: 40, origin: { y: 0.7 } });
        } else {
            btn.style.background = 'var(--danger)'; btn.style.color = 'white';
            this.playSound('wrong'); btn.classList.add('animate-shake');
        }
        const explainBox = card.querySelector('.explanation-box');
        if (explainBox) {
            explainBox.style.display = 'block';
            if (!isCorrect) {
                explainBox.style.borderColor = 'var(--danger)';
                explainBox.querySelector('.explanation-content').innerHTML = `<b style="color:var(--danger)">Cevap: ${correct}</b><br>${explanation}`;
            }
        }
        card.querySelectorAll('.q-opt').forEach(b => {
            b.classList.add('answered');
            if (b.innerText === correct) { b.style.background = 'var(--success)'; b.style.color = 'white'; b.style.fontWeight = '800'; }
        });
        this.updateG9StatsUI();
    },

    updateG9StatsUI() {
        const topicId = this.state.currentTopicId;
        const topic = KIMYALAB_DATA.grade9.find(t => t.id === topicId);
        const stats = this.state.grade9_stats[topicId] || { correct: 0, answered: [] };
        const totalScoreEl = document.getElementById('g9-total-score');
        const topicStatsEl = document.getElementById('g9-current-topic-stats');
        if (!totalScoreEl || !topicStatsEl) return;
        const total = topic ? topic.questions.length : 0;
        const rate = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
        totalScoreEl.innerHTML = `🔥 Başarı: %${rate}`;
        topicStatsEl.innerHTML = `🎯 ${stats.correct} / ${total}`;
    },

    closeGrade9Detail() { document.getElementById('grade9-detail').classList.add('hidden'); this.playSound('click'); },

    // --- GRADE 10 SYSTEM ---
    renderGrade10() {
        const grid = document.querySelector('.grade10-grid');
        if (!grid) return;
        grid.innerHTML = KIMYALAB_DATA.grade10.map(topic => `
            <div class="game-card animate-slide-up" style="background:#3b82f6; min-height:140px; justify-content:center; align-items:flex-start; padding:20px;" onclick="app.showGrade10Detail('${topic.id}')">
                <i class="fa-solid fa-flask-vial"></i>
                <h3 style="font-size:1.2rem; margin-bottom:5px;">${topic.name}</h3>
                <p style="font-size:0.8rem; opacity:0.8;">${topic.desc}</p>
            </div>
        `).join('');
    },

    showGrade10Detail(topicId) {
        this.state.currentTopicId = topicId;
        const topic = KIMYALAB_DATA.grade10.find(t => t.id === topicId);
        if (!topic) return;
        const detail = document.getElementById('grade10-detail');
        const title = document.getElementById('g10-title');
        const desc = document.getElementById('g10-desc');
        const content = document.getElementById('g10-content');
        title.textContent = topic.name; desc.textContent = topic.desc;
        content.innerHTML = topic.content.replace(/\n/g, '<br>');
        this.setG10Difficulty('all', true); this.setG10Mode('study');
        detail.classList.remove('hidden'); detail.scrollIntoView({ behavior: 'smooth' });
        this.playSound('click'); this.speak(`${topic.name}. ${topic.desc}`);
    },

    setG10Mode(mode) {
        const tabStudy = document.getElementById('tab-g10-study'); const tabQuiz = document.getElementById('tab-g10-quiz');
        const areaStudy = document.getElementById('g10-study-area'); const areaQuiz = document.getElementById('g10-quiz-container');
        if (!tabStudy || !tabQuiz) return;
        if (mode === 'study') {
            tabStudy.classList.add('active-match'); tabQuiz.classList.remove('active-match');
            areaStudy.style.display = 'block'; areaQuiz.style.display = 'none';
        } else {
            tabStudy.classList.remove('active-match'); tabQuiz.classList.add('active-match');
            areaStudy.style.display = 'none'; areaQuiz.style.display = 'block';
        }
        this.playSound('click');
    },

    setG10Difficulty(diff, skipSound = false) {
        this.state.currentDifficulty = diff; const topicId = this.state.currentTopicId;
        const topic = KIMYALAB_DATA.grade10.find(t => t.id === topicId); if (!topic) return;
        // Update UI buttons
        document.querySelectorAll('.btn-diff-g10').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.diff === diff);
        });
        let filtered = diff === 'all' ? topic.questions : topic.questions.filter(q => q.difficulty === diff);
        const questionsArea = document.getElementById('g10-questions'); if (!questionsArea) return;
        questionsArea.innerHTML = filtered.map((q, i) => `
            <div class="glass-card animate-slide-up g10-question-card" style="margin-bottom:20px; background:var(--bg-white)">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem">
                    <p style="font-weight:700; flex:1; padding-right:10px;">Soru ${i+1}: ${q.q}</p>
                    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:5px">
                        <span class="badge-${q.difficulty || 'easy'}">${(q.difficulty || 'easy').toUpperCase()}</span>
                        <button class="btn-hint" onclick="app.toggleG10Hint(this)"><i class="fa-solid fa-lightbulb"></i> İpucu</button>
                    </div>
                </div>
                <div class="hint-text" style="display:none; padding:10px; background:rgba(251, 192, 45, 0.1); border-radius:8px; margin-bottom:10px;">${q.hint || 'İpucu yok.'}</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:15px;">
                    ${q.options.map(opt => `<button class="btn-back q-opt" style="font-size:0.85rem; padding:12px" onclick="app.checkG10Answer(this, '${opt.replace(/'/g, "\\'")}', '${q.a.replace(/'/g, "\\'")}', '${(q.explanation || '').replace(/'/g, "\\'")}')">${opt}</button>`).join('')}
                </div>
                <div class="explanation-box" style="display:none; margin-top:15px; padding:15px; background:rgba(37, 99, 235, 0.05); border-radius:10px; border-left:4px solid var(--success)">
                    <div style="font-weight:800; color:var(--primary); margin-bottom:5px;">Çözüm</div>
                    <div class="explanation-content">${q.explanation || ''}</div>
                </div>
            </div>
        `).join('') || '<p style="text-align:center; padding:2rem; opacity:0.5">Henüz soru eklenmedi.</p>';
        this.updateG10StatsUI(); if(!skipSound) this.playSound('click');
    },

    toggleG10Hint(btn) {
        const card = btn.closest('.g10-question-card'); const hintEl = card.querySelector('.hint-text');
        const isHidden = window.getComputedStyle(hintEl).display === 'none';
        hintEl.style.display = isHidden ? 'block' : 'none';
        btn.innerHTML = isHidden ? '<i class="fa-solid fa-eye-slash"></i> Kapat' : '<i class="fa-solid fa-lightbulb"></i> İpucu';
        if(isHidden) this.playSound('click');
    },

    checkG10Answer(btn, selected, correct, explanation) {
        if (btn.classList.contains('answered')) return;
        const card = btn.closest('.g10-question-card'); const topicId = this.state.currentTopicId;
        if (!this.state.grade10_stats[topicId]) this.state.grade10_stats[topicId] = { correct: 0, answered: [] };
        const questionText = card.querySelector('p').innerText;
        if (this.state.grade10_stats[topicId].answered.includes(questionText)) return;
        const isCorrect = selected === correct;
        if (isCorrect) {
            btn.style.background = 'var(--success)'; btn.style.color = 'white';
            this.playSound('correct'); this.state.grade10_stats[topicId].correct++;
            this.state.grade10_stats[topicId].answered.push(questionText);
            this.addScore(10); localStorage.setItem('grade10_stats', JSON.stringify(this.state.grade10_stats));
            confetti({ particleCount: 30, spread: 40, origin: { y: 0.7 } });
        } else {
            btn.style.background = 'var(--danger)'; btn.style.color = 'white';
            this.playSound('wrong'); btn.classList.add('animate-shake');
        }
        const explainBox = card.querySelector('.explanation-box');
        if (explainBox) {
            explainBox.style.display = 'block';
            if (!isCorrect) explainBox.querySelector('.explanation-content').innerHTML = `<b style="color:var(--danger)">Cevap: ${correct}</b><br>${explanation}`;
        }
        card.querySelectorAll('.q-opt').forEach(b => {
            b.classList.add('answered');
            if (b.innerText === correct) { b.style.background = 'var(--success)'; b.style.color = 'white'; b.style.fontWeight = '800'; }
        });
        this.updateG10StatsUI();
    },

    updateG10StatsUI() {
        const topicId = this.state.currentTopicId; const topic = KIMYALAB_DATA.grade10.find(t => t.id === topicId);
        const stats = this.state.grade10_stats[topicId] || { correct: 0, answered: [] };
        const totalScoreEl = document.getElementById('g10-total-score'); const topicStatsEl = document.getElementById('g10-current-topic-stats');
        if (!totalScoreEl || !topicStatsEl) return;
        const total = topic ? topic.questions.length : 0; const rate = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
        totalScoreEl.innerHTML = `🔥 Başarı: %${rate}`; topicStatsEl.innerHTML = `🎯 ${stats.correct} / ${total}`;
    },

    closeGrade10Detail() { document.getElementById('grade10-detail').classList.add('hidden'); this.playSound('click'); },

    // --- GRADE 11 SYSTEM ---
    renderGrade11() {
        const grid = document.querySelector('.grade11-grid');
        if (!grid) return;
        grid.innerHTML = KIMYALAB_DATA.grade11.map(topic => `
            <div class="game-card animate-slide-up" style="background:#fbbf24; min-height:140px; justify-content:center; align-items:flex-start; padding:20px;" onclick="app.showGrade11Detail('${topic.id}')">
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

    // --- GRADE 12 SYSTEM ---
    renderGrade12() {
        const grid = document.querySelector('.grade12-grid');
        if (!grid) return;
        grid.innerHTML = KIMYALAB_DATA.grade12.map(topic => `
            <div class="game-card animate-slide-up" style="background:#8b5cf6; min-height:140px; justify-content:center; align-items:flex-start; padding:20px;" onclick="app.showGrade12Detail('${topic.id}')">
                <i class="fa-solid fa-bolt"></i>
                <h3 style="font-size:1.2rem; margin-bottom:5px;">${topic.name}</h3>
                <p style="font-size:0.8rem; opacity:0.8;">${topic.desc}</p>
            </div>
        `).join('');
    },

    showGrade12Detail(topicId) {
        this.state.currentTopicId = topicId;
        const topic = KIMYALAB_DATA.grade12.find(t => t.id === topicId);
        if (!topic) return;
        const detail = document.getElementById('grade12-detail');
        const title = document.getElementById('g12-title');
        const desc = document.getElementById('g12-desc');
        const content = document.getElementById('g12-content');
        title.textContent = topic.name; desc.textContent = topic.desc;
        content.innerHTML = topic.content.replace(/\n/g, '<br>');
        this.setG12Difficulty('all', true); this.setG12Mode('study');
        detail.classList.remove('hidden'); detail.scrollIntoView({ behavior: 'smooth' });
        this.playSound('click'); this.speak(`${topic.name}. ${topic.desc}`);
    },

    setG12Mode(mode) {
        const tabStudy = document.getElementById('tab-g12-study'); const tabQuiz = document.getElementById('tab-g12-quiz');
        const areaStudy = document.getElementById('g12-study-area'); const areaQuiz = document.getElementById('g12-quiz-container');
        if (!tabStudy || !tabQuiz) return;
        if (mode === 'study') {
            tabStudy.classList.add('active-match'); tabQuiz.classList.remove('active-match');
            areaStudy.style.display = 'block'; areaQuiz.style.display = 'none';
        } else {
            tabStudy.classList.remove('active-match'); tabQuiz.classList.add('active-match');
            areaStudy.style.display = 'none'; areaQuiz.style.display = 'block';
        }
        this.playSound('click');
    },

    setG12Difficulty(diff, skipSound = false) {
        this.state.currentDifficulty = diff; const topicId = this.state.currentTopicId;
        const topic = KIMYALAB_DATA.grade12.find(t => t.id === topicId); if (!topic) return;
        // Update UI buttons
        document.querySelectorAll('.btn-diff-g12').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.diff === diff);
        });
        let filtered = diff === 'all' ? topic.questions : topic.questions.filter(q => q.difficulty === diff);
        const questionsArea = document.getElementById('g12-questions'); if (!questionsArea) return;
        questionsArea.innerHTML = filtered.map((q, i) => `
            <div class="glass-card animate-slide-up g12-question-card" style="margin-bottom:20px; background:var(--bg-white)">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem">
                    <p style="font-weight:700; flex:1; padding-right:10px;">Soru ${i+1}: ${q.q}</p>
                    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:5px">
                        <span class="badge-${q.difficulty || 'easy'}">${(q.difficulty || 'easy').toUpperCase()}</span>
                        <button class="btn-hint" onclick="app.toggleG12Hint(this)"><i class="fa-solid fa-lightbulb"></i> İpucu</button>
                    </div>
                </div>
                <div class="hint-text" style="display:none; padding:10px; background:rgba(251, 192, 45, 0.1); border-radius:8px; margin-bottom:10px;">${q.hint || 'İpucu yok.'}</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:15px;">
                    ${q.options.map(opt => `<button class="btn-back q-opt" style="font-size:0.85rem; padding:12px" onclick="app.checkG12Answer(this, '${opt.replace(/'/g, "\\'")}', '${q.a.replace(/'/g, "\\'")}', '${(q.explanation || '').replace(/'/g, "\\'")}')">${opt}</button>`).join('')}
                </div>
                <div class="explanation-box" style="display:none; margin-top:15px; padding:15px; background:rgba(37, 99, 235, 0.05); border-radius:10px; border-left:4px solid var(--success)">
                    <div style="font-weight:800; color:var(--primary); margin-bottom:5px;">Çözüm</div>
                    <div class="explanation-content">${q.explanation || ''}</div>
                </div>
            </div>
        `).join('') || '<p style="text-align:center; padding:2rem; opacity:0.5">Henüz soru eklenmedi.</p>';
        this.updateG12StatsUI(); if(!skipSound) this.playSound('click');
    },

    toggleG12Hint(btn) {
        const card = btn.closest('.g12-question-card'); const hintEl = card.querySelector('.hint-text');
        const isHidden = window.getComputedStyle(hintEl).display === 'none';
        hintEl.style.display = isHidden ? 'block' : 'none';
        btn.innerHTML = isHidden ? '<i class="fa-solid fa-eye-slash"></i> Kapat' : '<i class="fa-solid fa-lightbulb"></i> İpucu';
        if(isHidden) this.playSound('click');
    },

    checkG12Answer(btn, selected, correct, explanation) {
        if (btn.classList.contains('answered')) return;
        const card = btn.closest('.g12-question-card'); const topicId = this.state.currentTopicId;
        if (!this.state.grade12_stats[topicId]) this.state.grade12_stats[topicId] = { correct: 0, answered: [] };
        const questionText = card.querySelector('p').innerText;
        if (this.state.grade12_stats[topicId].answered.includes(questionText)) return;
        const isCorrect = selected === correct;
        if (isCorrect) {
            btn.style.background = 'var(--success)'; btn.style.color = 'white';
            this.playSound('correct'); this.state.grade12_stats[topicId].correct++;
            this.state.grade12_stats[topicId].answered.push(questionText);
            this.addScore(10); localStorage.setItem('grade12_stats', JSON.stringify(this.state.grade12_stats));
            confetti({ particleCount: 30, spread: 40, origin: { y: 0.7 } });
        } else {
            btn.style.background = 'var(--danger)'; btn.style.color = 'white';
            this.playSound('wrong'); btn.classList.add('animate-shake');
        }
        const explainBox = card.querySelector('.explanation-box');
        if (explainBox) {
            explainBox.style.display = 'block';
            if (!isCorrect) explainBox.querySelector('.explanation-content').innerHTML = `<b style="color:var(--danger)">Cevap: ${correct}</b><br>${explanation}`;
        }
        card.querySelectorAll('.q-opt').forEach(b => {
            b.classList.add('answered');
            if (b.innerText === correct) { b.style.background = 'var(--success)'; b.style.color = 'white'; b.style.fontWeight = '800'; }
        });
        this.updateG12StatsUI();
    },

    updateG12StatsUI() {
        const topicId = this.state.currentTopicId; const topic = KIMYALAB_DATA.grade12.find(t => t.id === topicId);
        const stats = this.state.grade12_stats[topicId] || { correct: 0, answered: [] };
        const totalScoreEl = document.getElementById('g12-total-score'); const topicStatsEl = document.getElementById('g12-current-topic-stats');
        if (!totalScoreEl || !topicStatsEl) return;
        const total = topic ? topic.questions.length : 0; const rate = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
        totalScoreEl.innerHTML = `🔥 Başarı: %${rate}`; topicStatsEl.innerHTML = `🎯 ${stats.correct} / ${total}`;
    },

    closeGrade12Detail() { document.getElementById('grade12-detail').classList.add('hidden'); this.playSound('click'); },

    resetG9Success() { if(confirm("9. sınıf ilerlemeni sıfırlamak istiyor musun?")) { this.state.grade9_stats = {}; localStorage.setItem('grade9_stats', JSON.stringify({})); this.updateG9StatsUI(); this.setG9Difficulty('all'); } },
    resetG10Success() { if(confirm("10. sınıf ilerlemeni sıfırlamak istiyor musun?")) { this.state.grade10_stats = {}; localStorage.setItem('grade10_stats', JSON.stringify({})); this.updateG10StatsUI(); this.setG10Difficulty('all'); } },
    resetG11Success() { if(confirm("11. sınıf ilerlemeni sıfırlamak istiyor musun?")) { this.state.grade11_stats = {}; localStorage.setItem('grade11_stats', JSON.stringify({})); this.updateG11StatsUI(); this.setG11Difficulty('all'); } },
    resetG12Success() { if(confirm("12. sınıf ilerlemeni sıfırlamak istiyor musun?")) { this.state.grade12_stats = {}; localStorage.setItem('grade12_stats', JSON.stringify({})); this.updateG12StatsUI(); this.setG12Difficulty('all'); } },


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
        this.state.vipTheme = t;

        // Clean up themes
        document.body.classList.remove('dark-theme', 'theme-vip-pink', 'theme-vip-pink-dark', 'theme-vip-blue', 'theme-vip-blue-dark');

        if (t === 'blue') {
            document.body.classList.add('theme-vip-blue');
            if (this.state.isDarkMode) document.body.classList.add('theme-vip-blue-dark');
        } else {
            document.body.classList.add('theme-vip-pink');
            if (this.state.isDarkMode) document.body.classList.add('theme-vip-pink-dark');
        }
        
        // Render effects
        this.renderVIPEffects();
        this.renderVIPThemes(); // Update switcher if open
    },

    renderVIPThemes() {
        const list = document.getElementById('vip-theme-list');
        const section = document.getElementById('vip-theme-section');
        if (!list || !section || !this.state.isVIP) return;

        section.style.display = 'block';
        const themes = [
            { id: 'pink', name: 'Enchanted Empress', color: '#ff85a1' },
            { id: 'blue', name: 'Royal Sapphire', color: '#3b82f6' }
        ];

        list.innerHTML = themes.map(t => `
            <button class="btn-back ${this.state.vipTheme === t.id ? 'active-match' : ''}" 
                onclick="app.applyVIPTheme('${t.id}')" 
                style="font-size:0.7rem; padding:10px; border-color:${t.color}">
                <i class="fa-solid fa-gem" style="color:${t.color}"></i><br>${t.name}
            </button>
        `).join('');
    },

    renderVIPEffects() {
        const t = this.state.vipTheme || 'pink';
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

    openTableSelectModal(mode) {
        this.state.selectedGameMode = mode;
        const modal = document.getElementById('table-selection-modal');
        if (modal) modal.classList.add('active');
    },

    closeTableSelectModal() {
        const modal = document.getElementById('table-selection-modal');
        if (modal) modal.classList.remove('active');
    },

    selectTable(tableKey) {
        this.state.selectedTable = tableKey;
        this.closeTableSelectModal();
        this.openDifficultyModal(this.state.selectedGameMode);
    },

    openDifficultyModal(mode) {
        this.state.selectedGameMode = mode;
        const modal = document.getElementById('difficulty-modal');
        if (modal) modal.classList.add('active');
        this.playSound('click');
    },

    closeDifficultyModal() {
        const modal = document.getElementById('difficulty-modal');
        if (modal) modal.classList.remove('active');
    },

    startGameWithDifficulty(difficulty) {
        this.closeDifficultyModal();
        const overlay = document.getElementById('game-overlay');
        if (overlay) overlay.classList.remove('hidden');

        let customPool = null;
        if (this.state.selectedTable) {
            const t = this.state.selectedTable;
            if (t === 'cations') customPool = KIMYALAB_DATA.cations;
            else if (t === 'anions') customPool = KIMYALAB_DATA.anions;
            else if (t === 'metals') customPool = KIMYALAB_DATA.elements.filter(e => e.cat && e.cat.includes('metal'));
            else if (t === 'first20') customPool = KIMYALAB_DATA.elements.slice(0, 20);
        }

        if (window.gameManager) {
            window.gameManager.init(this.state.selectedGameMode, difficulty, customPool || this.state.customHomeworkQuestions);
        }
        
        // Reset table for next time
        this.state.selectedTable = null;
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

        this.renderVIPThemes();
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

    startGame(mode, customQuestions = null) {
        this.state.totalGames++;
        localStorage.setItem('totalGames', this.state.totalGames);
        this.state.customHomeworkQuestions = customQuestions; 
        this.updateStats();
        
        if (mode === 'quiz' || customQuestions) {
            this.openDifficultyModal(mode);
        } else {
            this.openTableSelectModal(mode);
        }
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
        this.state.weeklyScore += points;
        this.saveUserData();
        this.updateStats();

        // Achievement checks
        if (this.state.score >= 100) this.awardBadge('b_caylak');
        if (this.state.score >= 500) this.awardBadge('b_profesor');
        if (this.state.score >= 1000) this.awardBadge('b_legend');
    },

    saveUserData() {
        if (!this.state.currentUsername || this.state.isVIP) return;
        
        const userSaveKey = `kimyalab_user_${this.state.currentUsername.toLowerCase()}`;
        const dataToSave = {
            score: this.state.score,
            weeklyScore: this.state.weeklyScore,
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
        // Direkt olarak kurulum ekranını atlayıp 3 takımla başlatıyoruz
        this.state.tournamentTeamCount = 3;
        const teams = [];
        for (let i = 1; i <= 3; i++) {
            teams.push({ name: `Takım ${i}`, score: 0, lives: 5, hints: 3, active: true });
        }

        if (window.gameManager) {
            this.playSound('click');
            gameManager.initTournament(teams);
        }
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

    async refreshAdminData() {
        // Visual feedback
        const btn = (event && event.currentTarget) || document.querySelector('.btn-back[onclick*="refreshAdminData"]');
        if (btn) btn.querySelector('i')?.classList.add('fa-spin');
        
        try {
            await this.loadAdminUsers();
            await this.loadAdminNotifications();
            await this.loadAdminHomeworkV2();
            this.playSound('click');
        } catch (e) { console.error(e); }
        
        if (btn) setTimeout(() => btn.querySelector('i')?.classList.remove('fa-spin'), 1000);
    },

    async loadAdminNotifications() {
        if (!this.state.isAdmin) return;
        const list = document.getElementById('admin-notifications-list-full') || document.getElementById('admin-notifications-list');
        const miniList = document.getElementById('admin-notifications-list-mini');
        if (!list) return;

        try {
            const res = await fetch(this.getCloudURL() + "admin_notifications.json");
            const data = await res.json();
            
            if (!data) {
                const empty = '<p style="text-align:center; padding:50px; opacity:0.3;">Henüz bir aktivite yok.</p>';
                list.innerHTML = empty;
                if(miniList) miniList.innerHTML = empty;
                return;
            }

            let html = '';
            const notifs = Object.entries(data).reverse().slice(0, 50); // Last 50
            notifs.forEach(([id, n]) => {
                html += `
                    <div class="glass-card" style="padding:10px 15px; border-left:4px solid var(--success); display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); margin-bottom:8px;">
                        <div>
                            <b style="color:var(--success)">${n.user.toUpperCase()}</b> ${n.msg} 
                            <div style="font-size:0.7rem; opacity:0.6;">${new Date(n.time).toLocaleString()}</div>
                        </div>
                    </div>
                `;
            });
            list.innerHTML = html;
            if(miniList) miniList.innerHTML = html; // Mini dashboard view
        } catch (e) { console.error("Notif load fail:", e); }
    },

    async clearAdminNotifications() {
        if (!confirm("Tüm bildirimleri silmek istediğinize emin misiniz?")) return;
        try {
            await fetch(this.getCloudURL() + "admin_notifications.json", { method: 'DELETE' });
            this.loadAdminNotifications();
        } catch (e) { alert("Silinemedi: " + e.message); }
    },

    async loadAdminUsers() {
        if (!this.state.isAdmin) return;
        const newTable = document.getElementById('admin-user-list-new');
        if (!newTable) return;

        try {
            const vips = ['ela', 'eye'];
            const res = await fetch(this.getCloudURL() + "users.json");
            const allUsers = await res.json() || {};
            
            let newHtml = '';
            const userEntries = Object.entries(allUsers);
            
            for (let [k, u] of userEntries) {
                const isVip = vips.includes(k.toLowerCase());
                const isBanned = u.data && u.data.banned === true;
                const score = (u.data && u.data.score) || 0;
                const name = (u.profile && u.profile.username) || k;
                const email = (u.profile && u.profile.email) || 'E-posta yok';
                const avatar = (u.profile && u.profile.avatar) || 'school_logo.jpg';
                const level = Math.floor(score / 500) + 1;

                newHtml += `
                    <tr style="${isBanned ? 'opacity:0.6;' : ''}">
                        <td>
                            <div style="display:flex; align-items:center; gap:12px;">
                                <div style="position:relative">
                                    <img src="${avatar}" style="width:45px; height:45px; border-radius:14px; background:var(--bg-white); border:2px solid ${isVip ? 'var(--accent)' : 'var(--border-color)'}">
                                    ${isVip ? '<i class="fa-solid fa-crown" style="position:absolute; top:-8px; right:-8px; color:var(--accent); font-size:0.8rem;"></i>' : ''}
                                </div>
                                <div>
                                    <b style="display:block; font-size:0.95rem;">${name}</b>
                                    <span style="font-size:0.7rem; color:var(--text-muted)">ID: ${k}</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div style="font-size:0.8rem; font-weight:600;">${email}</div>
                            <div class="status-pill ${isBanned ? 'status-banned' : 'status-online'}" style="margin-top:5px;">
                                <i class="fa-solid ${isBanned ? 'fa-ban' : 'fa-circle-check'}"></i> ${isBanned ? 'YASAKLI' : 'AKTİF'}
                            </div>
                        </td>
                        <td>
                            <div style="font-size:1rem; font-weight:900; color:var(--primary);"><i class="fa-solid fa-bolt"></i> ${score}</div>
                            <div style="font-size:0.7rem; color:var(--text-muted); font-weight:700;">Seviye ${level}</div>
                        </td>
                        <td>
                            <div style="display:flex; gap:8px; justify-content:flex-end;">
                                <button class="admin-action-btn btn-success" onclick="app.adminAwardBadge('${k}')" title="Rozet Ver"><i class="fa-solid fa-medal"></i></button>
                                <button class="admin-action-btn" onclick="app.adminAdjustScore('${k}', 100)" title="+100 Puan"><i class="fa-solid fa-chevron-up"></i></button>
                                <button class="admin-action-btn" onclick="app.adminAdjustScore('${k}', -100)" title="-100 Puan"><i class="fa-solid fa-chevron-down"></i></button>
                                <button class="admin-action-btn" onclick="app.adminChangeUserPassword('${k}')" title="Şifre Değiştir" style="background:#f59e0b; color:white; border:none;"><i class="fa-solid fa-key"></i></button>
                                <button class="admin-action-btn" onclick="app.adminSendMessageToUser('${k}')" title="Özel Mesaj Gönder" style="background:var(--primary); color:black; border:none;"><i class="fa-solid fa-paper-plane"></i></button>
                                <button class="admin-action-btn btn-danger" onclick="app.adminDeleteUser('${k}')" title="Kalıcı Olarak Sil"><i class="fa-solid fa-trash"></i></button>
                                <button class="admin-action-btn" onclick="app.adminBanUser('${k}', ${!isBanned})" title="${isBanned ? 'Engeli Kaldır' : 'Engelle'}">
                                    <i class="fa-solid ${isBanned ? 'fa-user-check' : 'fa-user-slash'}"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }
            newTable.innerHTML = newHtml || '<tr><td colspan="4" style="text-align:center; padding:30px;">Öğrenci bulunamadı.</td></tr>';
            
            // Dashboard Stats
            this.state.allAdminUsers = allUsers;
            this.state.vips = vips;
            if(document.getElementById('admin-dash-user-count')) document.getElementById('admin-dash-user-count').textContent = `${userEntries.length} Kayıtlı Öğrenci`;
            
            const resHw = await fetch(this.getCloudURL() + "homework.json");
            const hwData = await resHw.json() || {};
            if(document.getElementById('admin-dash-hw-count')) document.getElementById('admin-dash-hw-count').textContent = `${Object.keys(hwData).length} Aktif Ödev`;

        } catch (e) { console.error("Admin load users fail:", e); }
    },

    filterAdminUsers(query) {
        const q = query.toLowerCase();
        const users = this.state.allAdminUsers;
        if (!users) return;

        const table = document.getElementById('admin-user-list-new');
        let html = '';
        
        for (let k in users) {
            const u = users[k];
            const name = ((u.profile && u.profile.username) || k).toLowerCase();
            const email = ((u.profile && u.profile.email) || '').toLowerCase();
            
            if (name.includes(q) || k.toLowerCase().includes(q) || email.includes(q)) {
                const isVip = this.state.vips.includes(k.toLowerCase());
                const isBanned = u.data && u.data.banned === true;
                const score = (u.data && u.data.score) || 0;
                const avatar = (u.profile && u.profile.avatar) || 'school_logo.jpg';
                const level = Math.floor(score / 500) + 1;

                html += `
                    <tr style="${isBanned ? 'opacity:0.6;' : ''}">
                        <td>
                            <div style="display:flex; align-items:center; gap:12px;">
                                <img src="${avatar}" style="width:45px; height:45px; border-radius:14px; border:2px solid ${isVip ? 'var(--accent)' : 'var(--border-color)'}">
                                <div>
                                    <b style="display:block;">${(u.profile && u.profile.username) || k}</b>
                                    <span style="font-size:0.7rem; color:var(--text-muted)">ID: ${k}</span>
                                </div>
                            </div>
                        </td>
                        <td><div class="status-pill ${isBanned ? 'status-banned' : 'status-online'}">...</div></td>
                        <td><div style="font-weight:900;">${score} PK</div></td>
                        <td><button class="admin-action-btn" onclick="app.adminDeleteUser('${k}')"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>
                `;
            }
        }
        table.innerHTML = html;
    },

    switchAdminView(viewId) {
        document.querySelectorAll('.admin-nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.adminTarget === viewId));
        document.querySelectorAll('.admin-view').forEach(view => {
            view.classList.toggle('hidden', view.id !== `admin-view-${viewId}`);
            view.classList.toggle('active', view.id === `admin-view-${viewId}`);
        });
        if (viewId === 'students') this.loadAdminUsers();
        if (viewId === 'broadcast') this.loadAdminNotifications();
        if (viewId === 'homework') this.loadAdminHomeworkV2();
    },

    async loadAdminHomeworkV2() {
        const list = document.getElementById('admin-homework-list-v2');
        if(!list) return;
        try {
            const res = await fetch(this.getCloudURL() + "homework.json");
            const homeworks = await res.json();
            if(!homeworks) {
                list.innerHTML = '<p style="text-align:center; opacity:0.3;">Ödev yok.</p>';
                return;
            }
            let html = '';
            Object.entries(homeworks).reverse().forEach(([id, hw]) => {
                html += `
                    <div class="glass-card" style="padding:15px; border-left:4px solid var(--primary); margin-bottom:10px;">
                        <h4 style="margin:0">${hw.title}</h4>
                        <p style="font-size:0.75rem; color:var(--text-muted);">${hw.desc}</p>
                        <button class="btn-back" style="font-size:0.6rem;" onclick="app.adminDeleteHomework('${id}')">SİL</button>
                    </div>
                `;
            });
            list.innerHTML = html;
        } catch (e) { console.error(e); }
    },

    async adminDeleteHomework(id) {
        if(!confirm("Silinsin mi?")) return;
        await fetch(this.getCloudURL() + `homework/${id}.json`, { method: 'DELETE' });
        this.loadAdminHomeworkV2();
    },

    async adminSaveHomeworkV2() {
        const title = document.getElementById('admin-hw-title-v2').value;
        const desc = document.getElementById('admin-hw-desc-v2').value;
        const reward = parseInt(document.getElementById('admin-hw-reward-v2').value);
        if(!title) return alert("Başlık girin!");
        const hwId = 'hw_' + Date.now();
        await fetch(this.getCloudURL() + `homework/${hwId}.json`, {
            method: 'PUT',
            body: JSON.stringify({ id: hwId, title, desc, reward, active: true, time: Date.now(), questions: [] })
        });
        alert("Yayınlandı!");
        this.loadAdminHomeworkV2();
    },

    async adminAwardBadge(userKey) {
        const badges = KIMYALAB_DATA.badges;
        const choice = prompt(badges.map((b, i) => `${i + 1}. ${b.name}`).join('\n'));
        if (!choice) return;
        const idx = parseInt(choice) - 1;
        const badgeId = badges[idx].id;
        const res = await fetch(this.getCloudURL() + `users/${userKey}/data.json`);
        let data = await res.json() || { badges: [] };
        if (!data.badges) data.badges = [];
        if (data.badges.includes(badgeId)) return alert("Zaten var.");
        data.badges.push(badgeId);
        await fetch(this.getCloudURL() + `users/${userKey}/data.json`, { method: 'PATCH', body: JSON.stringify(data) });
        alert("Rozet Verildi!");
        this.loadAdminUsers();
    },

    async adminAdjustScore(userKey, amount) {
        const res = await fetch(this.getCloudURL() + `users/${userKey}/data.json`);
        let data = await res.json() || { score: 0 };
        const newScore = Math.max(0, (data.score || 0) + amount);
        await fetch(this.getCloudURL() + `users/${userKey}/data.json`, { method: 'PATCH', body: JSON.stringify({ score: newScore }) });
        this.loadAdminUsers();
    },

    async adminBanUser(userKey, shouldBan) {
        await fetch(this.getCloudURL() + `users/${userKey}/data.json`, { method: 'PATCH', body: JSON.stringify({ banned: shouldBan }) });
        this.loadAdminUsers();
    },

    async adminChangeUserPassword(userKey) {
        const newPass = prompt(`${userKey} için YENİ şifreyi girin:`);
        if (!newPass) return;
        
        try {
            await fetch(this.getCloudURL() + `users/${userKey}/profile/password.json`, { 
                method: 'PUT', 
                body: JSON.stringify(newPass) 
            });
            alert("Şifre başarıyla güncellendi! 🔑");
            this.loadAdminUsers();
        } catch (e) { alert("Hata: " + e.message); }
    },

    async adminSendMessageToUser(userKey) {
        const msg = prompt(`${userKey} kullanıcısına gönderilecek mesajı yazın:`);
        if (!msg) return;

        try {
            const payload = { id: Date.now(), msg: msg, time: Date.now(), from: 'Yönetici' };
            await fetch(this.getCloudURL() + `users/${userKey}/messages.json`, { 
                method: 'POST', 
                body: JSON.stringify(payload) 
            });
            alert("Mesaj başarıyla iletildi! 📩");
        } catch (e) { alert("Hata: " + e.message); }
    },

    async adminDeleteUser(userKey) {
        if(!confirm("KALICI Silinsin mi?")) return;
        await fetch(this.getCloudURL() + `users/${userKey}.json`, { method: 'DELETE' });
        this.loadAdminUsers();
    },

    async adminResetAllScores() {
        if (prompt("Tüm puanları sıfırlamak için SIFIRLA yazın:") !== 'SIFIRLA') return;
        const res = await fetch(this.getCloudURL() + "users.json");
        const users = await res.json();
        for (let k in users) {
            await fetch(this.getCloudURL() + `users/${k}/data.json`, { method: 'PATCH', body: JSON.stringify({ score: 0 }) });
        }
        alert("Puanlar Sıfırlandı!");
        this.loadAdminUsers();
    },

    async adminDeleteAllUsersExceptAwm() {
        const pass = prompt("DİKKAT: awm hariç TÜM hesaplar silinecek! Onaylamak için 'TEMİZLE' yazın:");
        if (pass !== 'TEMİZLE') return;
        
        try {
            const res = await fetch(this.getCloudURL() + "users.json");
            const users = await res.json();
            if (!users) return;

            let count = 0;
            for (let k in users) {
                if (k.toLowerCase() !== 'awm') {
                    await fetch(this.getCloudURL() + `users/${k}.json`, { method: 'DELETE' });
                    count++;
                }
            }
            alert(`${count} Öğrenci hesabı başarıyla silindi. Sadece 'awm' hesabı korundu.`);
            this.loadAdminUsers();
        } catch (e) { alert("Hata: " + e.message); }
    },

    async adminSendGlobalMessage() {
        const input = document.getElementById('admin-global-msg');
        const msg = input ? input.value : null;
        if (!msg) return;
        
        try {
            const payload = { id: Date.now(), msg: msg, time: Date.now() };
            await fetch(this.getCloudURL() + "global_broadcast.json", { method: 'PUT', body: JSON.stringify(payload) });
            await fetch(this.getCloudURL() + "system_messages.json", { method: 'POST', body: JSON.stringify(payload) });
            alert("Global Mesaj Başarıyla Gönderildi! ✨");
            if(input) input.value = '';
            this.loadAdminNotifications();
        } catch (e) { alert("Hata: " + e.message); }
    },

    async loadNotifications() {
        const feed = document.getElementById('student-notifications-feed');
        if (!feed) return;
        feed.innerHTML = '<p style="text-align:center; padding:50px; opacity:0.5"><i class="fa-solid fa-spinner fa-spin"></i> Duyurular yükleniyor...</p>';
        
        try {
            const userKey = this.state.currentUsername.toLowerCase();
            
            // 1. Fetch Global Messages
            const resGlobal = await fetch(this.getCloudURL() + "system_messages.json");
            const globalData = await resGlobal.json() || {};
            
            // 2. Fetch Private Messages
            const resPrivate = await fetch(this.getCloudURL() + `users/${userKey}/messages.json`);
            const privateData = await resPrivate.json() || {};
            
            let combined = [];

            // Add Global
            Object.values(globalData).forEach(m => combined.push({...m, type: 'global'}));
            // Add Private
            Object.values(privateData).forEach(m => combined.push({...m, type: 'private'}));
            
            // Sort by time
            combined.sort((a, b) => b.time - a.time);

            if (combined.length === 0) {
                feed.innerHTML = '<div class="glass-card" style="text-align:center; padding:50px; opacity:0.5">Henüz yayınlanmış bir duyuru bulunmuyor.</div>';
                return;
            }

            let html = '';
            combined.forEach(m => {
                const date = new Date(m.time).toLocaleString('tr-TR');
                const isPrivate = (m.type === 'private');
                
                html += `
                    <div class="glass-card animate-slide-up" style="border-left:4px solid ${isPrivate ? 'var(--accent)' : 'var(--primary)'}; padding:20px; margin-bottom:15px; background:${isPrivate ? 'rgba(255,133,161,0.05)' : 'rgba(255,255,255,0.02)'}">
                        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.75rem; font-weight:700; color:var(--text-muted)">
                            <span>${isPrivate ? '💌 SANA ÖZEL MESAJ' : '📣 SİSTEM DUYURUSU'}</span>
                            <span>${date}</span>
                        </div>
                        <p style="font-size:1.1rem; color:white; line-height:1.6; font-weight:600;">${m.msg}</p>
                    </div>
                `;
            });
            feed.innerHTML = html;
        } catch (e) { feed.innerHTML = `<p style="color:var(--danger)">Erişim Hatası: ${e.message}</p>`; }
    },

    async startHomework(hwId) {
        const res = await fetch(this.getCloudURL() + `homework/${hwId}.json`);
        const hw = await res.json();
        if(!hw) return;
        this.state.currentHomeworkId = hwId;
        this.state.currentHomeworkReward = hw.reward || 500;
        this.startGame('quiz', hw.questions.length > 0 ? hw.questions : KIMYALAB_DATA.quiz_9[0].questions);
    },

    completeHomework() {
        const hId = this.state.currentHomeworkId;
        const reward = this.state.currentHomeworkReward || 500;
        if (!hId) return;
        this.addScore(reward);
        fetch(this.getCloudURL() + `users/${this.state.currentUsername.toLowerCase()}/homework_done.json`, {
            method: 'PATCH',
            body: JSON.stringify({ [hId]: true })
        });
        localStorage.setItem(`hw_done_${hId}`, 'true');
        this.showRewardModal("TAMAMLANDI!", `+${reward} Puan Kazandın!`);
        this.state.currentHomeworkId = null;

        const notif = {
            user: this.state.currentUsername,
            msg: `bir ödevi başarıyla tamamladı!`,
            time: Date.now()
        };
        fetch(this.getCloudURL() + "admin_notifications.json", {
            method: 'POST',
            body: JSON.stringify(notif)
        }).catch(e => console.error("Admin notif failed:", e));

        // Mark local as well for instant UI response
        localStorage.setItem(`hw_done_${hId}`, 'true');

        this.showRewardModal("ÖDEV TAMAMLANDI! 🎉", `Tebrikler! Ödevi başarıyla bitirdin ve tam +${reward} puan kazandın! Sınıf listesinde yükseliyorsun!`);
        
        // Reset HW state
        this.state.currentHomeworkId = null;
        this.state.currentHomeworkReward = 0;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
    window.app = app;
});
