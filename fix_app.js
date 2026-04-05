const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /renderGrade9\(\) \{[\s\S]*?grid\.innerHTML = KIMYALAB_DATA\.grade9\.map\(topic => `[\s\S]*?`\)\.join\(''\);\s*\}/;

const newFunc = `renderGrade9() {
        const grid = document.querySelector('.grade9-grid');
        if (!grid) return;
        
        let html = '';
        const s1 = KIMYALAB_DATA.grade9.filter(t => t.semester === 1);
        const s2 = KIMYALAB_DATA.grade9.filter(t => t.semester === 2);
        const other = KIMYALAB_DATA.grade9.filter(t => !t.semester);

        const cardHtml = (topic) => \`
            <div class="game-card animate-slide-up" style="background:#4ade80; min-height:140px; justify-content:center; align-items:flex-start; padding:20px;" onclick="app.showGrade9Detail('\${topic.id}')">
                <i class="fa-solid fa-atom"></i>
                <h3 style="font-size:1.2rem; margin-bottom:5px;">\${topic.name}</h3>
                <p style="font-size:0.8rem; opacity:0.8;">\${topic.desc}</p>
            </div>
        \`;

        if (s1.length > 0) {
            html += \`<div style="width:100%; border-bottom:2px solid var(--primary); padding-bottom:5px; margin-top:10px; margin-bottom:5px;"><h3 style="color:var(--primary); margin:0;">1. Dönem Konuları</h3></div>\`;
            html += s1.map(cardHtml).join('');
        }
        if (s2.length > 0) {
            html += \`<div style="width:100%; border-bottom:2px solid var(--primary); padding-bottom:5px; margin-top:20px; margin-bottom:5px;"><h3 style="color:var(--primary); margin:0;">2. Dönem Konuları</h3></div>\`;
            html += s2.map(cardHtml).join('');
        }
        if (other.length > 0) {
            html += other.map(cardHtml).join('');
        }

        grid.innerHTML = html;
    }`;

code = code.replace(regex, newFunc);
fs.writeFileSync('app.js', code, 'utf8');
console.log('Modified app.js');
