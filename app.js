// app.js - Ana Uygulama Mantığı (Durum Yönetimi, Yönlendirme, Sesler)

const appState = {
    username: '',
    score: 0,
    levelIndex: 0,
    badges: [],
    currentGameMode: null,
    soundEnabled: true
};

// SES EFEKTLERİ (Basit Base64 veya Dosya yolu - Örnekleyici)
// Gerçek ses dosyaları için ("click.mp3" gibi) yollar konur, pratiklik için Web Audio API ile bip sesi oluşturacağız.
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if(!appState.soundEnabled) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if(type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    } else if(type === 'correct') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start(); osc.stop(audioCtx.currentTime + 0.2);
    } else if(type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start(); osc.stop(audioCtx.currentTime + 0.2);
    } else if(type === 'login') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.2);
        osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start(); osc.stop(audioCtx.currentTime + 0.4);
    }
}


// DOM Elementleri
const els = {
    loginScreen: document.getElementById('login-screen'),
    dashboardScreen: document.getElementById('dashboard-screen'),
    gameOverlay: document.getElementById('game-overlay'),
    
    loginForm: document.getElementById('login-form'),
    usernameInput: document.getElementById('username-input'),
    passwordInput: document.getElementById('password-input'), // index'te eklenecek
    loginError: document.getElementById('login-error-msg'),
    
    // Sidebar & Dashboard
    dispUsername: document.getElementById('display-username'),
    dispLevel: document.getElementById('display-level'),
    dispScore: document.getElementById('display-score'),
    levelProgress: document.getElementById('level-progress'),
    quoteUsername: document.getElementById('quote-username'),
    
    // Pages
    pageHome: document.getElementById('page-home'),
    pageTablolar: document.getElementById('page-tablolar'),
    pageStats: document.getElementById('page-stats'),
    pageBadges: document.getElementById('page-badges'),
    
    // Navigation
    navBtns: document.querySelectorAll('.nav-item'),
    
    // Sound Toggle
    soundBtn: document.getElementById('btn-sound-toggle')
};

const app = {
    init: function() {
        console.log("KimyaLab v2 Başlatıldı! Sınırlı Giriş Aktif.");
        
        // Buton Klik Efektleri Ekleme (Global)
        document.body.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                playSound('click');
            }
        });
        
        // Form gönderimini dinle (Sadece izinli 10 kişi)
        els.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const rawName = els.usernameInput.value.trim();
            const rawPass = els.passwordInput.value.trim();
            
            // Kullanıcı Doğrulama (Authentication)
            const user = KIMYALAB_DATA.users.find(u => u.username === rawName && u.password === rawPass);
            
            if(user) {
                if(els.loginError) els.loginError.style.display = 'none';
                app.login(rawName);
            } else {
                playSound('wrong');
                if(els.loginError) {
                    els.loginError.textContent = "Hatalı Kullanıcı Adı veya Şifre!";
                    els.loginError.style.display = 'block';
                } else {
                    alert("Giriş Başarısız: Hatalı Kullanıcı Adı veya Şifre!");
                }
            }
        });
        
        // Sol Menü Sekme (Tab) Yönlendirmesi
        els.navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                els.navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                app.switchPage(targetId);
            });
        });
        
        // Ses Kapat/Aç
        if(els.soundBtn) {
            els.soundBtn.addEventListener('click', () => {
                appState.soundEnabled = !appState.soundEnabled;
                els.soundBtn.innerHTML = appState.soundEnabled 
                    ? '<i class="fa-solid fa-volume-high"></i> Ses AÇIK'
                    : '<i class="fa-solid fa-volume-xmark"></i> Ses KAPALI';
                if(appState.soundEnabled) {
                    els.soundBtn.classList.add('active-toggle');
                } else {
                    els.soundBtn.classList.remove('active-toggle');
                }
            });
        }
    },

    login: function(name) {
        playSound('login');
        appState.username = name;
        if(els.dispUsername) els.dispUsername.textContent = name;
        if(els.quoteUsername) els.quoteUsername.textContent = name; 
        this.updateStatsUI();
        
        // Ekran Geçişi
        els.loginScreen.classList.remove('active');
        els.loginScreen.classList.add('hidden');
        els.dashboardScreen.classList.remove('hidden');
        els.dashboardScreen.classList.add('active'); // app-layout display:flex
        
        this.switchPage('page-home'); // Varsayılan anasayfa
    },

    switchPage: function(pageId) {
        // Tüm sayfaları gizle
        const pages = [els.pageHome, els.pageTablolar, els.pageStats, els.pageBadges];
        pages.forEach(p => { if(p) { p.classList.add('hidden'); p.classList.remove('active-page'); } });
        
        // Seçileni aç
        const target = document.getElementById(pageId);
        if(target) {
            target.classList.remove('hidden');
            target.classList.add('active-page');
            
            // Tablo veya Rozet sayfasıysa içeriğini render et (data.js'den dinamik)
            if(pageId === 'page-tablolar') this.renderTablolar();
            if(pageId === 'page-badges') this.renderRozetler();
        }
    },

    showDashboard: function() {
        gameManager.stopCurrentGame();
        this.updateStatsUI();
        if(els.gameOverlay) {
            els.gameOverlay.classList.remove('active');
            els.gameOverlay.classList.add('hidden');
        }
    },

    startGame: function(mode) {
        appState.currentGameMode = mode;
        if(els.gameOverlay) {
            els.gameOverlay.classList.remove('hidden');
            els.gameOverlay.classList.add('active');
            gameManager.start(mode);
        }
    },

    // --- Puan ve İlerleme Sistemi ---
    addScore: function(points) {
        appState.score += points;
        this.checkLevelUp();
        this.updateStatsUI();
        
        // 'İlk Oyun' rozeti kontrolü
        if(appState.score > 0) this.awardBadge('b_ilk_oyun');
    },

    checkLevelUp: function() {
        let nextIndex = appState.levelIndex;
        for(let i = KIMYALAB_DATA.levels.length - 1; i >= 0; i--) {
            if(appState.score >= KIMYALAB_DATA.levels[i].requiredScore) {
                nextIndex = i;
                break;
            }
        }
        
        if(nextIndex > appState.levelIndex) {
            appState.levelIndex = nextIndex;
            // Seviye atlama sesi
            setTimeout(() => playSound('login'), 200);
        }
    },

    updateStatsUI: function() {
        if(els.dispScore) els.dispScore.textContent = appState.score;
        
        const currentLvl = KIMYALAB_DATA.levels[appState.levelIndex];
        if(els.dispLevel) els.dispLevel.textContent = currentLvl.title;
        
        // Sol menü alt bar (Sembolik puan gösterimi)
        const isMaxLevel = appState.levelIndex === KIMYALAB_DATA.levels.length - 1;
        if(els.levelProgress) {
            if(isMaxLevel) {
                els.levelProgress.style.width = '100%';
            } else {
                const nextLvl = KIMYALAB_DATA.levels[appState.levelIndex + 1];
                const pointsReq = nextLvl.requiredScore - currentLvl.requiredScore;
                const pointsEarned = appState.score - currentLvl.requiredScore;
                const p = Math.min(100, Math.max(0, (pointsEarned / pointsReq) * 100));
                els.levelProgress.style.width = `${p}%`;
            }
        }
    },

    awardBadge: function(badgeId) {
        if(!appState.badges.includes(badgeId)) {
            appState.badges.push(badgeId);
            
            // data.js içindeki rozeti 'locked: false' yapalım
            const badgeObj = KIMYALAB_DATA.badges.find(b => b.id === badgeId);
            if(badgeObj) {
                badgeObj.locked = false;
                console.log("YENİ ROZET AÇILDI:", badgeObj.name);
                // Rozet açılma sesi!
                setTimeout(() => playSound('correct'), 500);
            }
            // Eğer Rozetler sayfasındaysak tekrar render et
            const pageBadges = document.getElementById('page-badges');
            if(pageBadges && pageBadges.classList.contains('active-page')) {
                this.renderRozetler();
            }
        }
    },

    // --- SAYFA RENDER FONKSİYONLARI (Fotoğraflara göre) ---

    // TABLOLAR SAYFASI RENDER (Katyonlar sekmesi örneği)
    renderTablolar: function(category = 'cations') {
        const container = document.getElementById('tablo-listesi');
        if(!container) return;
        
        container.innerHTML = ''; // Temizle
        
        const dataList = KIMYALAB_DATA[category] || KIMYALAB_DATA.cations;
        
        dataList.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'tablo-row';
            row.innerHTML = `
                <div class="tr-left">
                    <span class="tr-num">${index + 1}</span>
                    <div class="tr-symbol">${item.symbol}</div>
                    <span class="tr-name">${item.name}</span>
                </div>
                <div class="tr-right">
                    <span class="tr-charge">${item.charge}</span>
                    <i class="fa-solid fa-volume-high tr-audio" onclick="playSound('click')" title="Seslendir"></i>
                </div>
            `;
            container.appendChild(row);
        });
    },

    // ROZETLER SAYFASI RENDER
    renderRozetler: function() {
        const container = document.getElementById('rozet-grid');
        if(!container) return;
        
        container.innerHTML = '';
        
        // Başlık sayacı güncelleme
        const cnt = document.getElementById('rozet-sayaci');
        if(cnt) cnt.textContent = `${appState.badges.length} / 8 rozet kazanıldı`;
        
        KIMYALAB_DATA.badges.forEach(b => {
            const isLocked = !appState.badges.includes(b.id);
            const card = document.createElement('div');
            card.className = `rozet-card ${isLocked ? 'locked' : 'unlocked'}`;
            
            card.innerHTML = `
                <div class="r-icon"><i class="fa-solid ${b.icon}"></i></div>
                <h4>${b.name}</h4>
                <p>${b.desc}</p>
                ${isLocked ? '<div class="r-status"><i class="fa-solid fa-lock"></i> Kilitli</div>' 
                           : '<div class="r-status earned"><i class="fa-solid fa-check"></i> Kazanıldı</div>'}
            `;
            container.appendChild(card);
        });
    }
};

document.addEventListener('DOMContentLoaded', app.init);
