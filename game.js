// game.js - Oyun Modları Mantığı (Light Theme Versiyonu)

const gameManager = {
    currentMode: null,
    score: 0,
    timer: null,
    timeLeft: 0,
    interval: null,
    currentQuestion: null,
    
    // Füzyon Modu State
    fusionCombo: 0,
    fusionCorrectAnswers: 0,

    // Gelişmiş Boşluk Doldurma State
    fillCorrectAnswers: 0,

    start: function(mode) {
        this.currentMode = mode;
        this.score = 0;
        this.resetState();

        const container = document.getElementById('game-container');
        container.innerHTML = ''; // Temizle

        if(mode === 'fusion') {
            this.initFusionMode(container);
        } else if(mode === 'fill') {
            this.initFillMode(container);
        } else if(mode === 'classic') {
            // Klasik test eklenebilir
            container.innerHTML = '<h2>Klasik Mod Yapım Aşamasında 🚧</h2><button class="btn-primary" onclick="app.showDashboard()">Geri Dön</button>';
        }
    },

    stopCurrentGame: function() {
        if(this.interval) clearInterval(this.interval);
        if (this.currentMode !== null && this.score > 0) {
            app.addScore(this.score); // Oyun bittiğinde puanı globale ekle
        }
        this.currentMode = null;
    },

    resetState: function() {
        this.fusionCombo = 0;
        this.fusionCorrectAnswers = 0;
        this.fillCorrectAnswers = 0;
        document.getElementById('game-timer').querySelector('span').textContent = '--';
    },

    // ----------------------------------------------------------------------
    // 1. ELEMENT FÜZYONU MODU (Hızlı Eşleştirme)
    // ----------------------------------------------------------------------
    initFusionMode: function(container) {
        this.timeLeft = 60; // 60 Saniye süre
        this.updateTimerDisplay();
        
        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: var(--card-teal); font-size: 1.8rem;">Eşleştirme Modu ⚡</h2>
                <p style="color: var(--text-muted); font-weight: 600;">Sembolü doğru elementle eşleştir.</p>
                <div id="combo-counter" style="color: var(--card-orange); font-weight: bold; margin-top: 5px;" class="hidden">Combo: x<span>1</span></div>
            </div>
            
            <div id="flashcard" class="flashcard">
                <h2 id="question-symbol">--</h2>
            </div>
            <div id="options-container" class="options-grid">
                <!-- Seçenekler buraya eklenecek -->
            </div>
        `;

        this.startTimer(() => this.endGame('Süre Doldu! ⏳'));
        this.nextFusionQuestion();
    },

    nextFusionQuestion: function() {
        const item = utils.getRandomItem(KIMYALAB_DATA.elements);
        this.currentQuestion = item;
        
        document.getElementById('question-symbol').textContent = item.symbol;
        
        // Yanlış cevapları al ve doğruyla birleştir
        let options = utils.getWrongAnswers(item.name, 3);
        options.push(item.name);
        options = utils.shuffleArray(options); // Karıştır
        
        const optsContainer = document.getElementById('options-container');
        optsContainer.innerHTML = '';
        
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.onclick = () => this.checkFusionAnswer(btn, opt === item.name);
            optsContainer.appendChild(btn);
        });
        
        // Flashcard animasyon reset
        const card = document.getElementById('flashcard');
        card.classList.remove('correct', 'wrong');
        card.style.transform = 'scale(0.9)';
        setTimeout(() => card.style.transform = 'scale(1)', 50);
    },

    checkFusionAnswer: function(btn, isCorrect) {
        const card = document.getElementById('flashcard');
        
        // Diğer butonları devre dışı bırak
        document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

        if(isCorrect) {
            btn.classList.add('selected');
            card.classList.add('correct');
            
            this.fusionCombo++;
            this.fusionCorrectAnswers++;
            let pointsEarned = 10 * this.fusionCombo; // Kombo çarpanı
            this.score += pointsEarned;
            
            this.updateComboDisplay();
            app.addScore(pointsEarned); // Anlık puana ekle
            
            // Rozet Kontrolü: Füzyon Reaktörü (Arka arkaya 5 doğru)
            if(this.fusionCombo >= 5) app.awardBadge('fusion_reactor');

            setTimeout(() => this.nextFusionQuestion(), 800);
        } else {
            btn.classList.add('wrong-selected');
            card.classList.add('wrong');
            
            // Doğru cevabı göster
            document.querySelectorAll('.option-btn').forEach(b => {
                if(b.textContent === this.currentQuestion.name) b.style.borderColor = 'var(--card-teal)';
            });

            this.fusionCombo = 0; // Komboyu sıfırla
            this.updateComboDisplay();

            // Biraz bekleyip yeni soruya geç
            setTimeout(() => this.nextFusionQuestion(), 1500);
        }
    },

    updateComboDisplay: function() {
        const cEl = document.getElementById('combo-counter');
        if(this.fusionCombo > 1) {
            cEl.classList.remove('hidden');
            cEl.querySelector('span').textContent = `${this.fusionCombo}`;
        } else {
            cEl.classList.add('hidden');
        }
    },

    // ----------------------------------------------------------------------
    // 2. GELİŞMİŞ BOŞLUK DOLDURMA (Çoktan Seçmeli Kökler & İsimler)
    // ----------------------------------------------------------------------
    initFillMode: function(container) {
        this.timeLeft = 90; // 90 Saniye
        this.updateTimerDisplay();
        
        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: var(--card-purple); font-size: 1.8rem;">İsim Tahmini 🧩</h2>
                <p style="color: var(--text-muted); font-weight: 600;">Seçilen sembolün adını aşağıdan bul.</p>
            </div>
            
            <div id="flashcard" class="flashcard">
                <h2 id="fill-question">--</h2>
                <p id="fill-hint">İsmi Nedir?</p>
            </div>
            <div id="fill-options" class="options-grid"></div>
            <div id="fill-message" style="margin-top: 20px; font-weight: bold; font-size: 1.1rem; height: 24px;"></div>
        `;

        this.startTimer(() => this.endGame('Test Tamamlandı! 🎉'));
        this.nextFillQuestion();
    },

    nextFillQuestion: function() {
        // %50 Element, %50 Kök sorma şansı
        const isRadical = Math.random() > 0.5;
        const sourceData = isRadical ? KIMYALAB_DATA.radicals : KIMYALAB_DATA.elements;
        
        const item = utils.getRandomItem(sourceData);
        this.currentQuestion = { ...item, isRadical };

        document.getElementById('fill-question').textContent = item.symbol;
        if(item.charge) {
            document.getElementById('fill-hint').textContent = `(Yük: ${item.charge})`;
        } else {
            document.getElementById('fill-hint').textContent = `İsmi Nedir?`;
        }

        // Yanlışları getir (aynı türden)
        let options = utils.getWrongAnswers(item.name, 3, isRadical ? 'radicals' : 'elements');
        options.push(item.name);
        options = utils.shuffleArray(options);

        const optsContainer = document.getElementById('fill-options');
        optsContainer.innerHTML = '';
        document.getElementById('fill-message').textContent = '';
        
        const card = document.getElementById('flashcard');
        card.classList.remove('correct', 'wrong');

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.onclick = () => this.checkFillAnswer(btn, opt === item.name);
            optsContainer.appendChild(btn);
        });
    },

    checkFillAnswer: function(btn, isCorrect) {
        document.querySelectorAll('#fill-options .option-btn').forEach(b => b.disabled = true);
        const msg = document.getElementById('fill-message');
        const card = document.getElementById('flashcard');

        if(isCorrect) {
            btn.classList.add('selected');
            card.classList.add('correct');
            msg.textContent = "Doğru! +15 Puan ✅";
            msg.style.color = "var(--card-teal)";
            
            this.fillCorrectAnswers++;
            let pts = 15;
            this.score += pts;
            app.addScore(pts);

            // Kök Uzmanı Rozeti
            if(this.currentQuestion.isRadical && this.fillCorrectAnswers >= 10) {
                 app.awardBadge('radical_master');
            }

            setTimeout(() => this.nextFillQuestion(), 1000);
        } else {
            btn.classList.add('wrong-selected');
            card.classList.add('wrong');
            msg.textContent = `Yanlış! Doğrusu: ${this.currentQuestion.name} ❌`;
            msg.style.color = "var(--card-magenta)";

            setTimeout(() => this.nextFillQuestion(), 2000);
        }
    },


    // ----------------------------------------------------------------------
    // ORTAK OYUN FONKSİYONLARI
    // ----------------------------------------------------------------------

    startTimer: function(onComplete) {
        if(this.interval) clearInterval(this.interval);
        
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if(this.timeLeft <= 0) {
                clearInterval(this.interval);
                if(onComplete) onComplete();
            }
        }, 1000);
    },

    updateTimerDisplay: function() {
        const tEl = document.getElementById('game-timer').querySelector('span');
        if(tEl) {
            tEl.textContent = this.timeLeft > 9 ? this.timeLeft : `0${this.timeLeft}`;
        }
    },

    endGame: function(reason) {
        document.getElementById('game-container').innerHTML = `
            <div style="text-align: center;">
                <h2 style="color: var(--text-dark); margin-bottom: 20px;">${reason}</h2>
                <p style="font-size: 1.2rem; color: var(--text-muted); margin-bottom: 30px;">
                    Bu oturumda topladığın puan: <strong style="color: var(--primary-blue); font-size: 1.5rem;">${this.score}</strong>
                </p>
                <button class="btn-primary" style="max-width: 250px;" onclick="app.showDashboard()">Laboratuvara Dön</button>
            </div>
        `;
    }
};
