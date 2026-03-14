// game.js - Pure Logic

window.gameManager = {
    currentMode: null,
    score: 0,
    timer: null,
    timeLeft: 0,
    interval: null,
    currentQuestion: null,

    init(mode) {
        this.currentMode = mode;
        this.score = 0;
        this.resetState();

        const container = document.getElementById('game-container');
        container.innerHTML = '';

        switch(mode) {
            case 'fusion': this.initFusionMode(container); break;
            case 'fill': this.initFillMode(container); break;
            case 'classic': this.initClassicMode(container); break;
            case 'quiz': this.initQuizMode(container); break;
        }
    },

    resetState() {
        if (this.interval) clearInterval(this.interval);
        this.timeLeft = 60;
        document.getElementById('game-timer').querySelector('span').textContent = '60';
    },

    // 1. FUSION MODE
    initFusionMode(container) {
        container.innerHTML = `
            <div style="text-align:center">
                <h2 style="color:var(--card-teal)">Element Füzyonu ⚡</h2>
                <div id="q-sym" style="font-size:4rem; font-weight:800; margin:20px 0; background:var(--bg-main); border-radius:20px; padding:20px;">--</div>
                <div id="opts" style="display:grid; grid-template-columns:1fr 1fr; gap:10px"></div>
            </div>
        `;
        this.startTimer();
        this.nextFusion();
    },

    nextFusion() {
        const item = utils.getRandomItem(KIMYALAB_DATA.elements);
        this.currentQuestion = item;
        document.getElementById('q-sym').textContent = item.s;
        
        const opts = utils.shuffleArray([item.name, ...utils.getWrongAnswers(item.name, 3, 'elements')]);
        const container = document.getElementById('opts');
        container.innerHTML = '';
        opts.forEach(o => {
            const b = document.createElement('button');
            b.className = 'btn-back';
            b.style.width = '100%';
            b.textContent = o;
            b.onclick = () => {
                if (o === item.name) {
                    this.score += 20;
                    if (window.app) window.app.addScore(20);
                    if (window.app) window.app.playSound('correct');
                    this.nextFusion();
                } else {
                    if (window.app) window.app.playSound('wrong');
                    b.style.borderColor = 'red';
                }
            };
            container.appendChild(b);
        });
    },

    // 2. FILL MODE (Tahmin)
    initFillMode(container) {
        container.innerHTML = `
            <div style="text-align:center">
                <h2 style="color:var(--card-purple)">İsim Tahmini 🧩</h2>
                <div id="q-name" style="font-size:2rem; font-weight:800; margin:20px 0;">--</div>
                <div id="opts-fill" style="display:grid; grid-template-columns:1fr 1fr; gap:10px"></div>
            </div>
        `;
        this.startTimer();
        this.nextFill();
    },

    nextFill() {
        const item = utils.getRandomItem(KIMYALAB_DATA.elements);
        this.currentQuestion = item;
        document.getElementById('q-name').textContent = item.name;
        
        const opts = utils.shuffleArray([item.s, ...utils.getWrongAnswers(item.s, 3, 'elements')]);
        const container = document.getElementById('opts-fill');
        container.innerHTML = '';
        opts.forEach(o => {
            const b = document.createElement('button');
            b.className = 'btn-back';
            b.style.width = '100%';
            b.textContent = o;
            b.onclick = () => {
                if (o === item.s) {
                    this.score += 20;
                    if (window.app) window.app.addScore(20);
                    if (window.app) window.app.playSound('correct');
                    this.nextFill();
                } else {
                    if (window.app) window.app.playSound('wrong');
                    b.style.borderColor = 'red';
                }
            };
            container.appendChild(b);
        });
    },

    // 3. CLASSIC MATCH
    initClassicMode(container) {
        container.innerHTML = `
            <div style="text-align:center">
                <h2 style="color:var(--card-pink)">Eşleştirme Laboratuvarı 🧪</h2>
                <div style="display:flex; gap:20px; margin-top:20px">
                    <div id="m-symbols" style="flex:1; display:flex; flex-direction:column; gap:10px"></div>
                    <div id="m-names" style="flex:1; display:flex; flex-direction:column; gap:10px"></div>
                </div>
            </div>
        `;
        this.startTimer();
        this.renderMatch();
    },

    renderMatch() {
        const items = utils.shuffleArray(KIMYALAB_DATA.elements).slice(0, 5);
        const symbols = utils.shuffleArray([...items]);
        const names = utils.shuffleArray([...items]);
        
        let activeSym = null;
        const symCon = document.getElementById('m-symbols');
        const nameCon = document.getElementById('m-names');
        if (!symCon || !nameCon) return;
        symCon.innerHTML = ''; nameCon.innerHTML = '';

        symbols.forEach(s => {
            const d = document.createElement('div');
            d.className = 'btn-back';
            d.textContent = s.s;
            d.onclick = () => {
                document.querySelectorAll('#m-symbols div').forEach(x => x.style.borderColor = 'var(--border-color)');
                d.style.borderColor = 'var(--primary)';
                activeSym = s;
                if (window.app) window.app.playSound('click');
            };
            symCon.appendChild(d);
        });

        names.forEach(n => {
            const d = document.createElement('div');
            d.className = 'btn-back';
            d.textContent = n.name;
            d.onclick = () => {
                if (activeSym && activeSym.name === n.name) {
                    d.style.background = 'var(--card-teal)';
                    d.style.color = 'white';
                    document.querySelectorAll('#m-symbols div').forEach(x => {
                        if (x.textContent === activeSym.s) {
                            x.style.background = 'var(--card-teal)';
                            x.style.color = 'white';
                        }
                    });
                    this.score += 20;
                    if (window.app) window.app.addScore(20);
                    if (window.app) window.app.playSound('correct');
                    activeSym = null;
                } else {
                    d.style.borderColor = 'red';
                    if (window.app) window.app.playSound('wrong');
                }
            };
            nameCon.appendChild(d);
        });
    },

    // 4. QUIZ
    initQuizMode(container) {
        this.quizIdx = 0;
        container.innerHTML = `<div id="quiz-wrap"></div>`;
        this.startTimer();
        this.renderQuiz();
    },

    renderQuiz() {
        if (this.quizIdx >= KIMYALAB_DATA.quizQuestions.length) {
            this.endGame("Mükemmel! Test Bitti.");
            return;
        }
        const q = KIMYALAB_DATA.quizQuestions[this.quizIdx];
        const wrap = document.getElementById('quiz-wrap');
        wrap.innerHTML = `
            <h2 style="margin-bottom:20px">${q.q}</h2>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px">
                ${q.options.map(o => `<button class="btn-back" onclick="gameManager.checkQuiz('${o}', '${q.a}')">${o}</button>`).join('')}
            </div>
        `;
    },

    checkQuiz(choice, correct) {
        if (choice === correct) {
            this.score += 50;
            if (window.app) window.app.addScore(50);
            if (window.app) window.app.playSound('correct');
            this.quizIdx++;
            this.renderQuiz();
        } else {
            if (window.app) window.app.playSound('wrong');
            alert("Yanlış Cevap!");
        }
    },

    // UTILS
    startTimer() {
        this.interval = setInterval(() => {
            this.timeLeft--;
            document.getElementById('game-timer').querySelector('span').textContent = this.timeLeft;
            if (this.timeLeft <= 0) this.endGame("Süre Doldu!");
        }, 1000);
    },

    endGame(msg) {
        clearInterval(this.interval);
        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center">
                <h2>${msg}</h2>
                <p style="font-size:2rem; margin:20px 0">Skor: ${this.score}</p>
                <button class="btn-primary" onclick="app.showDashboard()">Kapat</button>
            </div>
        `;
    }
};
