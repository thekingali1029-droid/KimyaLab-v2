window.gameManager = {
    currentMode: null,
    score: 0,
    timer: null,
    timeLeft: 0,
    interval: null,
    currentQuestion: null,
    combo: 0,
    maxCombo: 0,
    wrongQuestions: [],
    lives: 5,
    hints: 3,
    difficulty: 'normal',
    isTournament: false,
    tournamentTeams: [],
    currentTeamIdx: 0,
    isRetryMode: false,
    quizIdx: 0,
    shuffledQuiz: [],

    init(mode, difficulty = 'normal') {
        console.log(`Oyun Başlatıldı: ${mode} (${difficulty})`);
        this.currentMode = mode;
        this.difficulty = difficulty;
        this.score = 0;
        this.combo = 0;
        this.lives = 5;
        this.hints = 3;
        const storedWrong = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
        this.wrongQuestions = this.isRetryMode ? this.wrongQuestions : storedWrong;
        
        this.resetState();
        this.updateLivesUI();
        this.updateComboUI();

        const container = document.getElementById('game-container');
        if (!container) return console.error("HATA: game-container bulunamadı!");
        container.innerHTML = '';

        const overlay = document.getElementById('game-overlay');
        if (overlay) overlay.classList.remove('hidden');

        try {
            switch(mode) {
                case 'fusion': this.initFusionMode(container); break;
                case 'fill': this.initFillMode(container); break;
                case 'classic': this.initClassicMode(container); break;
                case 'quiz': this.initQuizMode(container); break;
                default: console.error("Bilinmeyen oyun modu:", mode);
            }
        } catch (err) {
            console.error("Oyun başlatma hatası:", err);
        }
    },

    initTournament(teams) {
        this.isTournament = true;
        this.tournamentTeams = teams;
        this.currentTeamIdx = 0;
        this.score = 0;
        this.difficulty = 'normal';
        this.wrongQuestions = [];
        
        const overlay = document.getElementById('game-overlay');
        if (overlay) overlay.classList.remove('hidden');

        this.nextTournamentTurn();
    },

    nextTournamentTurn() {
        if (!this.isTournament) return;

        const activeTeams = this.tournamentTeams.filter(t => t.active);
        
        // Winner check
        if (activeTeams.length === 0) {
            this.endTournament();
            return;
        }
        
        if (activeTeams.length === 1 && this.tournamentTeams.length > 1) {
            this.endTournament();
            return;
        }

        // Find next active team starting from currentTeamIdx
        let count = 0;
        while(!this.tournamentTeams[this.currentTeamIdx % this.tournamentTeams.length].active && count < this.tournamentTeams.length) {
            this.currentTeamIdx++;
            count++;
        }
        this.currentTeamIdx %= this.tournamentTeams.length;

        const team = this.tournamentTeams[this.currentTeamIdx];
        this.lives = team.lives;
        this.hints = team.hints;
        this.score = 0;
        this.combo = 0; // Reset combo for new team turn

        // Update hints UI
        const hintEl = document.getElementById('game-hints');
        if (hintEl) {
            hintEl.classList.remove('hidden');
            const span = hintEl.querySelector('span');
            if (span) span.textContent = this.hints;
        }

        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="animate-slide-up" style="text-align:center; padding:40px;">
                <h1 style="color:var(--primary); font-size:3rem; margin-bottom:1rem;">Takım: ${team.name}</h1>
                <p style="font-size:1.2rem; color:var(--text-muted);">Hazırlanın! Sizin turunuz başlıyor.</p>
                <div class="glass-card" style="margin:2rem 0; padding:2rem; border:2px solid var(--primary-glow)">
                    <p style="font-size:1.4rem;">Can: ${'❤️'.repeat(this.lives)} | Puan: ${team.score}</p>
                </div>
                <button class="btn-primary" onclick="gameManager.startTournamentRound()" style="max-width:250px">BAŞLA! ⚡</button>
            </div>
        `;
        
        this.updateTournamentUI();
    },

    startTournamentRound() {
        const modes = ['quiz', 'fusion', 'fill', 'classic'];
        const randomMode = modes[Math.floor(Math.random() * modes.length)];
        this.currentMode = randomMode;
        
        this.resetState();
        this.timeLeft = 30; // 30 seconds for tournament as per rule
        this.updateLivesUI();
        this.updateComboUI();

        const container = document.getElementById('game-container');
        container.innerHTML = '';
        
        if (randomMode === 'quiz') this.initQuizMode(container);
        else if (randomMode === 'fusion') this.initFusionMode(container);
        else if (randomMode === 'fill') this.initFillMode(container);
        else if (randomMode === 'classic') this.initClassicMode(container);
    },

    updateTournamentUI() {
        const livesCon = document.getElementById('game-lives');
        if (!livesCon) return;

        livesCon.style.flexDirection = 'column';
        livesCon.style.alignItems = 'flex-end';
        livesCon.style.fontSize = '0.9rem';

        let html = '<div style="background:var(--bg-card); padding:10px; border-radius:10px; border:1px solid var(--border-color); min-width:180px;">';
        html += '<h4 style="color:var(--primary); margin-bottom:8px; text-transform:uppercase; font-size:0.7rem;">🏆 TURNUVA TABLOSU</h4>';
        this.tournamentTeams.forEach((t, i) => {
            const isActive = i === this.currentTeamIdx && this.isTournament;
            html += `
                <div style="display:flex; justify-content:space-between; gap:15px; margin-bottom:5px; padding:4px 8px; border-radius:6px; ${isActive ? 'background:rgba(251, 192, 45, 0.1); color:var(--primary); font-weight:800;' : 'opacity:0.6'}">
                    <span>${isActive ? '➔ ' : ''}${t.name}</span>
                    <span>${t.score} | ❤️${t.lives} | 💡${t.hints}</span>
                </div>
            `;
        });
        html += '</div>';
        livesCon.innerHTML = html;
    },

    endTournament() {
        if (this.interval) clearInterval(this.interval);
        const sorted = [...this.tournamentTeams].sort((a,b) => b.score - a.score);
        const winner = sorted[0];
        
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="animate-slide-up" style="text-align:center; padding:40px;">
                <i class="fa-solid fa-crown" style="font-size:5rem; color:var(--primary); margin-bottom:1rem;"></i>
                <h1 style="font-size:3rem; margin-bottom:0.5rem;">ŞAMPİYON!</h1>
                <h2 style="color:var(--primary); font-size:4rem; margin-bottom:2rem;">${winner.name}</h2>
                <div class="glass-card" style="padding:20px; margin-bottom:20px; max-width:500px; margin-left:auto; margin-right:auto;">
                    <h3 style="margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:10px;">Turnuva Sonuçları</h3>
                    ${sorted.map((t, idx) => `
                        <div style="display:flex; justify-content:space-between; padding:12px; ${idx === 0 ? 'background:rgba(251, 192, 45, 0.1); border-radius:8px;' : ''}">
                            <span style="font-weight:700;">${idx + 1}. ${t.name}</span>
                            <span>${t.score} Puan</span>
                        </div>
                    `).join('')}
                </div>
                <button class="btn-primary" onclick="app.showDashboard()" style="max-width:200px">Kapat</button>
            </div>
        `;
        const overlay = document.getElementById('game-overlay');
        if (overlay) {
            const timerEl = document.getElementById('game-timer');
            if (timerEl) timerEl.classList.add('hidden');
        }
        if (window.app) window.app.playSound('levelup');
    },

    resetState() {
        if (this.interval) clearInterval(this.interval);
        const times = { easy: 90, normal: 60, hard: 30 };
        this.timeLeft = this.isTournament ? 30 : (times[this.difficulty] || 60);
        
        const timerEl = document.getElementById('game-timer');
        if (timerEl) {
            timerEl.classList.remove('hidden');
            const span = timerEl.querySelector('span');
            if (span) span.textContent = this.timeLeft;
        }
    },

    initFusionMode(container) {
        container.innerHTML = `
            <div class="animate-slide-up" style="text-align:center">
                <h3 style="color:var(--primary); margin-bottom:1rem;">Element Füzyonu ⚡</h3>
                <div id="q-sym" class="glass-card animate-glow" style="font-size:5rem; font-weight:800; margin:20px 0; padding:30px; border:2px solid var(--primary); text-shadow: 0 0 20px var(--primary-glow)">--</div>
                <div id="opts" style="display:grid; grid-template-columns:1fr 1fr; gap:15px"></div>
            </div>
        `;
        this.startTimer();
        this.nextFusion();
    },

    nextFusion() {
        let pool;
        if (this.isRetryMode) {
            pool = this.wrongQuestions;
            if (pool.length === 0) return this.endGame("Tekrar Testi Bitti! ✨");
        } else {
            pool = (KIMYALAB_DATA.fusionQuestions && KIMYALAB_DATA.fusionQuestions.length > 0) 
                         ? KIMYALAB_DATA.fusionQuestions : KIMYALAB_DATA.elements;
        }
        
        const item = utils.getRandomItem(pool);
        if (!item) return;

        this.currentQuestion = item;
        const symEl = document.getElementById('q-sym');
        if (symEl) symEl.textContent = item.s || item.symbol;
        
        const correctName = item.n || item.name;
        const wrongPool = pool.map(x => x.n || x.name).filter(n => n !== correctName);
        const distractors = utils.shuffleArray([...new Set(wrongPool)]).slice(0, 3);
        const opts = utils.shuffleArray([correctName, ...distractors]);

        const optContainer = document.getElementById('opts');
        if (!optContainer) return;
        optContainer.innerHTML = '';
        opts.forEach(o => {
            const b = document.createElement('button');
            b.className = 'btn-back animate-slide-up';
            b.style.width = '100%';
            b.textContent = o;
            b.onclick = () => {
                if (o === correctName) {
                    if (this.isRetryMode) {
                        this.wrongQuestions = this.wrongQuestions.filter(x => (x.n || x.name) !== correctName);
                        localStorage.setItem('wrongQuestions', JSON.stringify(this.wrongQuestions));
                        if (window.app) window.app.updateStats();
                    }
                    this.handleCorrect(b, () => this.nextFusion());
                } else {
                    this.handleWrong(b, item);
                }
            };
            optContainer.appendChild(b);
        });
    },

    initFillMode(container) {
        container.innerHTML = `
            <div class="animate-slide-up" style="text-align:center">
                <h3 style="color:var(--primary); margin-bottom:1rem;">İsim Tahmini 🧩</h3>
                <div id="q-name" class="glass-card" style="font-size:2.5rem; font-weight:800; margin:20px 0; padding:20px; border:2px solid var(--primary); box-shadow: 0 0 20px rgba(251, 192, 45, 0.2)">--</div>
                <div id="opts-fill" style="display:grid; grid-template-columns:1fr 1fr; gap:15px"></div>
            </div>
        `;
        this.startTimer();
        this.nextFill();
    },

    nextFill() {
        let pool;
        if (this.isRetryMode) {
            pool = this.wrongQuestions;
            if (pool.length === 0) return this.endGame("Tekrar Testi Bitti! ✨");
        } else {
            pool = KIMYALAB_DATA.elements;
        }

        const item = utils.getRandomItem(pool);
        if (!item) return;

        const nameEl = document.getElementById('q-name');
        if (nameEl) nameEl.textContent = item.name;
        
        const correctSym = item.s || item.symbol;
        const distractors = utils.getWrongAnswers(correctSym, 3, 'elements');
        const opts = utils.shuffleArray([correctSym, ...distractors]);

        const optContainer = document.getElementById('opts-fill');
        if (!optContainer) return;
        optContainer.innerHTML = '';
        opts.forEach(o => {
            const b = document.createElement('button');
            b.className = 'btn-back animate-slide-up';
            b.style.width = '100%';
            b.textContent = o;
            b.onclick = () => {
                if (o === correctSym) {
                    if (this.isRetryMode) {
                        this.wrongQuestions = this.wrongQuestions.filter(x => x.name !== item.name);
                        localStorage.setItem('wrongQuestions', JSON.stringify(this.wrongQuestions));
                        if (window.app) window.app.updateStats();
                    }
                    this.handleCorrect(b, () => this.nextFill());
                } else {
                    this.handleWrong(b, item);
                }
            };
            optContainer.appendChild(b);
        });
    },

    initClassicMode(container) {
        console.log("Eşleştirme Modu Başlatılıyor...");
        container.innerHTML = `
            <div class="animate-slide-up" style="text-align:center">
                <h3 style="color:var(--primary); margin-bottom:1rem;">Eşleştirme Laboratuvarı 🧪</h3>
                <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1rem;">Sembol ve ismi birbiriyle eşle.</p>
                <div style="display:flex; gap:20px; margin-top:10px">
                    <div id="m-symbols" style="flex:1; display:flex; flex-direction:column; gap:10px"></div>
                    <div id="m-names" style="flex:1; display:flex; flex-direction:column; gap:10px"></div>
                </div>
            </div>
        `;
        this.startTimer();
        this.renderMatch();
    },

    renderMatch() {
        // Items for this set
        const items = utils.shuffleArray(KIMYALAB_DATA.elements).slice(0, 5);
        const symbols = utils.shuffleArray([...items]);
        const names = utils.shuffleArray([...items]);
        
        let activeSym = null;
        let activeSymEl = null;

        const symCon = document.getElementById('m-symbols');
        const nameCon = document.getElementById('m-names');
        if (!symCon || !nameCon) return;

        symCon.innerHTML = ''; 
        nameCon.innerHTML = '';

        symbols.forEach(s => {
            const d = document.createElement('div');
            d.className = 'btn-back animate-slide-in';
            d.textContent = s.s || s.symbol;
            d.style.padding = '12px';
            d.onclick = () => {
                document.querySelectorAll('#m-symbols .btn-back').forEach(x => {
                    x.style.borderColor = 'var(--border-color)';
                    x.style.background = 'rgba(255,255,255,0.05)';
                    x.style.boxShadow = 'none';
                });
                d.style.borderColor = 'var(--primary)';
                d.style.background = 'rgba(251, 192, 45, 0.1)';
                d.style.boxShadow = '0 0 15px var(--primary-glow)';
                activeSym = s;
                activeSymEl = d;
                if (window.app) window.app.playSound('click');
            };
            symCon.appendChild(d);
        });

        names.forEach(n => {
            const d = document.createElement('div');
            d.className = 'btn-back animate-slide-in';
            d.textContent = n.name;
            d.style.padding = '12px';
            d.onclick = () => {
                if (activeSym && activeSym.name === n.name) {
                    // Correct Match
                    if (activeSymEl) {
                        activeSymEl.style.background = 'var(--secondary)';
                        activeSymEl.style.color = 'white';
                        activeSymEl.style.pointerEvents = 'none';
                        activeSymEl.classList.add('animate-correct');
                    }
                    
                    this.handleCorrect(d, () => {
                        const remaining = Array.from(document.querySelectorAll('#m-names .btn-back')).filter(x => x.style.pointerEvents !== 'none');
                        if (remaining.length === 0) {
                            setTimeout(() => this.renderMatch(), 400);
                        }
                    });
                    
                    activeSym = null;
                    activeSymEl = null;
                } else {
                    // Wrong Match
                    this.handleWrong(d, activeSym);
                    if (activeSymEl) {
                        activeSymEl.style.borderColor = 'var(--danger)';
                        setTimeout(() => {
                            if (activeSymEl) activeSymEl.style.borderColor = 'var(--border-color)';
                        }, 500);
                    }
                }
            };
            nameCon.appendChild(d);
        });
    },

    initQuizMode(container) {
        this.quizIdx = 0;
        this.shuffledQuiz = utils.shuffleArray([...KIMYALAB_DATA.quizQuestions]);
        container.innerHTML = `<div id="quiz-wrap" class="animate-slide-up"></div>`;
        this.startTimer();
        this.renderQuiz();
    },

    renderQuiz() {
        const wrap = document.getElementById('quiz-wrap');
        if (!wrap) return;
        const pool = this.isRetryMode ? this.wrongQuestions : this.shuffledQuiz;

        if (this.quizIdx >= pool.length) {
            return this.endGame(this.isRetryMode ? "Tekrar Bitti! ✨" : "Test Bitti!");
        }

        const q = pool[this.quizIdx];
        wrap.innerHTML = `
            <div class="glass-card" style="padding:30px; margin-bottom:20px; border:2px solid var(--primary); box-shadow: 0 0 15px rgba(251, 192, 45, 0.1)">
                <h3 style="line-height:1.4; font-size: 1.5rem;">${q.q}</h3>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px">
                ${q.options.map(o => `
                    <button class="btn-back animate-slide-up" onclick="gameManager.checkQuiz('${o.replace(/'/g, "\\'")}', '${q.a.replace(/'/g, "\\'")}', this)">
                        ${o}
                    </button>
                `).join('')}
            </div>
        `;
    },

    checkQuiz(choice, correct, btn) {
        const pool = this.isRetryMode ? this.wrongQuestions : this.shuffledQuiz;
        const q = pool[this.quizIdx];

        if (choice === correct) {
            if (this.isRetryMode) {
                this.wrongQuestions = this.wrongQuestions.filter(x => x.q !== q.q);
                localStorage.setItem('wrongQuestions', JSON.stringify(this.wrongQuestions));
                if (window.app) window.app.updateStats();
            }
            this.handleCorrect(btn, () => {
                this.quizIdx++;
                this.renderQuiz();
            });
        } else {
            this.handleWrong(btn, q);
            setTimeout(() => {
                this.quizIdx++;
                this.renderQuiz();
            }, 600);
        }
    },

    retryWrongQuestions() {
        if (this.wrongQuestions.length === 0) return;
        
        this.isRetryMode = true;
        this.score = 0;
        this.lives = 5;
        this.quizIdx = 0;
        
        this.resetState();
        this.updateLivesUI();
        
        const overlay = document.getElementById('game-overlay');
        if (overlay) overlay.classList.remove('hidden');

        const container = document.getElementById('game-container');
        if (!container) return;
        
        container.innerHTML = '';
        if (this.currentMode === 'quiz') {
            container.innerHTML = `<div id="quiz-wrap" class="animate-slide-up"></div>`;
            this.renderQuiz();
        } else if (this.currentMode === 'fusion') {
            this.initFusionMode(container);
        } else if (this.currentMode === 'fill') {
            this.initFillMode(container);
        } else {
            // Fallback for classic or others
            this.initQuizMode(container); 
        }
        this.startTimer();
    },

    handleCorrect(btn, nextFn) {
        this.combo++;
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;
        const pts = (this.isTournament ? 50 : 10) + (this.combo * 5);
        this.score += pts;
        
        if (this.isTournament) {
            this.tournamentTeams[this.currentTeamIdx].score += pts;
            this.updateTournamentUI();
        }
        
        btn.classList.add('animate-correct');
        btn.style.background = 'var(--secondary)';
        btn.style.color = 'white';
        btn.style.pointerEvents = 'none';

        if (window.app) {
            if (!this.isTournament) window.app.addScore(pts);
            window.app.playSound('correct');
        }
        
        this.updateComboUI();
        setTimeout(() => {
            if (this.currentMode === 'classic') {
                // Classic mode might need earlier UI clearing if we don't wait for nextFn
            }
            nextFn();
        }, 400);
    },

    handleWrong(btn, qObj = null) {
        this.combo = 0;
        this.lives--;
        
        if (this.isTournament) {
            this.tournamentTeams[this.currentTeamIdx].lives = this.lives;
            if (this.lives <= 0) {
                this.tournamentTeams[this.currentTeamIdx].active = false;
                this.updateTournamentUI();
                // We'll advance turn in the 500ms block below
            } else {
                this.updateTournamentUI();
            }
        }
        
        this.updateLivesUI();
        this.updateComboUI();
        
        if (qObj && !this.isRetryMode && !this.isTournament) {
            const qStr = qObj.q || qObj.name;
            if (!this.wrongQuestions.find(x => (x.q || x.name) === qStr)) {
                this.wrongQuestions.push(qObj);
                localStorage.setItem('wrongQuestions', JSON.stringify(this.wrongQuestions));
                if (window.app) window.app.updateStats();
            }
        }
        
        btn.classList.add('animate-shake');
        btn.style.borderColor = 'var(--danger)';
        btn.style.color = 'var(--danger)';
        
        if (window.app) window.app.playSound('wrong');
        
        if (this.lives <= 0) {
            setTimeout(() => {
                if (this.isTournament) {
                    // Important: only increment if we haven't already moved or if it's naturally next
                    this.currentTeamIdx++; 
                    this.nextTournamentTurn();
                } else this.endGame("Hakkın Bitti! 💀");
            }, 600);
            return;
        }

        setTimeout(() => {
            btn.classList.remove('animate-shake');
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 500);
    },

    updateLivesUI() {
        const con = document.getElementById('game-lives');
        if (!con || this.isTournament) return;
        con.style.flexDirection = 'row';
        con.style.fontSize = '1.5rem';
        let h = '';
        for (let i = 0; i < 5; i++) {
            h += i < this.lives ? '<i class="fa-solid fa-heart animate-glow"></i>' : '<i class="fa-solid fa-heart-crack" style="opacity:0.3"></i>';
        }
        con.innerHTML = h;
    },

    updateComboUI() {
        const el = document.getElementById('game-combo');
        if (!el) return;
        if (this.combo > 1) {
            el.classList.remove('hidden');
            el.textContent = `COMBO x${this.combo}`;
            el.style.transform = `scale(${Math.min(1 + this.combo * 0.1, 1.8)})`;
        } else {
            el.classList.add('hidden');
        }
    },

    useHint() {
        if (!this.isTournament) return;
        if (this.hints <= 0) {
            if (window.app) window.app.playSound('wrong');
            return;
        }

        this.hints--;
        this.tournamentTeams[this.currentTeamIdx].hints = this.hints;
        
        const hintEl = document.getElementById('game-hints');
        if (hintEl) {
            const span = hintEl.querySelector('span');
            if (span) span.textContent = this.hints;
        }
        this.updateTournamentUI();
        if (window.app) window.app.playSound('click');

        // Mode specific hint logic
        if (this.currentMode === 'quiz') {
            const correct = KIMYALAB_DATA.quizQuestions[this.quizIdx]?.a;
            const btns = Array.from(document.querySelectorAll('#quiz-wrap button'));
            let removedCount = 0;
            btns.forEach(b => {
                if (removedCount < 2 && b.textContent.trim() !== correct) {
                    b.style.opacity = '0.2';
                    b.style.pointerEvents = 'none';
                    removedCount++;
                }
            });
        } else if (this.currentMode === 'fusion' || this.currentMode === 'fill') {
            const correct = (this.currentMode === 'fusion') 
                ? (this.currentQuestion?.n || this.currentQuestion?.name)
                : (this.currentQuestion?.s || this.currentQuestion?.symbol);
            
            const btns = document.querySelectorAll('#game-container button');
            btns.forEach(b => {
                if (b.textContent.trim() === correct) {
                    b.style.borderColor = 'var(--primary)';
                    b.style.boxShadow = '0 0 20px var(--primary-glow)';
                    b.style.transform = 'scale(1.1)';
                }
            });
        } else if (this.currentMode === 'classic') {
            const names = Array.from(document.querySelectorAll('#m-names .btn-back')).filter(x => x.style.pointerEvents !== 'none');
            if (names.length > 0) {
                const targetName = names[0].textContent.trim();
                const syms = Array.from(document.querySelectorAll('#m-symbols .btn-back'));
                const targetSymEl = syms.find(s => {
                    const elData = KIMYALAB_DATA.elements.find(e => e.name === targetName);
                    return s.textContent.trim() === (elData?.s || elData?.symbol);
                });

                if (targetSymEl) {
                    targetSymEl.style.borderColor = 'var(--primary)';
                    targetSymEl.style.boxShadow = '0 0 20px var(--primary-glow)';
                    names[0].style.borderColor = 'var(--primary)';
                    names[0].style.boxShadow = '0 0 20px var(--primary-glow)';
                }
            }
        }
    },

    startTimer() {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.timeLeft--;
            const el = document.getElementById('game-timer');
            if (el) {
                const span = el.querySelector('span');
                if (span) span.textContent = this.timeLeft;
            }
            if (this.timeLeft <= 0) {
                if (this.isTournament) {
                    this.currentTeamIdx++;
                    this.nextTournamentTurn();
                } else this.endGame("Süre Doldu! ⌛");
            }
        }, 1000);
    },

    endGame(msg) {
        if (this.isTournament) return;
        clearInterval(this.interval);
        const con = document.getElementById('game-container');
        if (!con) return;

        con.innerHTML = `
            <div class="animate-slide-up" style="text-align:center; padding:40px;">
                <h2 style="font-size:3rem; margin-bottom:1rem; color: var(--primary)">${msg}</h2>
                <div class="glass-card" style="padding:40px; margin:20px auto; max-width: 400px; border: 2px solid var(--primary-glow)">
                    <p style="text-transform: uppercase; letter-spacing: 2px; color: var(--text-muted)">Toplam Skor</p>
                    <h3 style="font-size:4.5rem; color:var(--primary); font-weight: 900;">${this.score}</h3>
                </div>
                <button class="btn-primary" onclick="app.showDashboard()" style="max-width:200px">PANEL'E DÖN</button>
                ${(this.wrongQuestions.length > 0 && !this.isRetryMode) ? `<button class="btn-primary" onclick="gameManager.retryWrongQuestions()" style="margin-top:15px; background:var(--accent); border: none;">HATALARI TEKRAR ET (${this.wrongQuestions.length})</button>` : ''}
            </div>
        `;
        if (window.app) window.app.playSound('levelup');
    }
};
