const fs = require('fs');
let content = fs.readFileSync('data.js', 'utf8');

const newKimyaBilimiContent = `<b>1. KİMYA BİLİMİ (DETAYLI)</b><br><br>
<b style="color:var(--primary)">🔹 Simyadan Kimyaya</b><br>
• <b>Simya</b> bir bilim değildir çünkü: Deneyler sistemli değildir, sonuçlar tekrarlanamaz.<br>
• Ama simyacılar sayesinde damıtma, süzme gibi teknikler gelişti ve birçok madde keşfedildi.<br>
👉 <b>Kimya</b> ise deney, gözlem ve matematik içerir; evrensel ve tekrarlanabilir sonuçlar verir.<br><br>

<b style="color:var(--primary)">🔹 Kimya Disiplinleri</b><br>
• <b>Analitik:</b> Maddenin ne olduğunu bulur (Kan tahlili)<br>
• <b>Organik:</b> Karbonlu bileşikler (Plastik)<br>
• <b>Anorganik:</b> Mineraller, tuzlar (NaCl)<br>
• <b>Fizikokimya:</b> Enerji, hız (Tepkime hızı)<br>
• <b>Biyokimya:</b> Canlılar (DNA)<br>
<i>👉 ÖNEMLİ: Organik kimya sadece "canlı" değil, karbon içeren maddelerdir.</i><br><br>

<b style="color:var(--primary)">🔹 Kimyanın Sembolik Dili</b><br>
• <b>Element sembolleri:</b> Tek harf → H, C, O | İki harf → Na, Fe, Cl<br>
• <b>Formüller:</b> H₂O → 2 hidrojen, 1 oksijen | CO₂ → 1 karbon, 2 oksijen<br>
• <b>Tepkime örneği:</b> 2H₂ + O₂ → 2H₂O (2 hidrojen molekülü + 1 oksijen → 2 su oluşur)<br><br>

<b style="color:var(--primary)">🔹 İş Güvenliği</b><br>
• <b>Uyarı Sembolleri:</b> 🔥 Yanıcı | ☠️ Zehirli | ⚠️ Aşındırıcı | 💥 Patlayıcı<br>
👉 Laboratuvarda: Asit suya eklenir (TERSİ YAPILMAZ), tadına bakılmaz, koklarken direkt çekilmez.
`;

const newAtomSistemContent = `<b>2. ATOM VE PERİYODİK SİSTEM</b><br><br>
<b style="color:var(--primary)">🔹 Atom Modelleri (Mantığıyla öğren!)</b><br>
• <b>1. Dalton:</b> Atom bölünemez dedi (YANLIŞ ama önemli başlangıç)<br>
• <b>2. Thomson:</b> Elektronu buldu. "Üzümlü kek modeli" 🍰<br>
• <b>3. Rutherford:</b> Atomun büyük kısmı boşluk. Ortada çekirdek var.<br>
• <b>4. Bohr:</b> Elektronlar katmanlarda dolaşır. Enerji seviyeleri var.<br>
👉 <b>Modern model:</b> Elektronlar kesin yerde değil → bulut gibi (Orbital).<br><br>

<b style="color:var(--primary)">🔹 Atomun Yapısı</b><br>
• <b>Proton (+):</b> Çekirdek | <b>Nötron (0):</b> Çekirdek | <b>Elektron (−):</b> Katman<br>
• <b>Atom numarası</b> = proton = elektron (nötr halde)<br>
• <b>Kütle numarası</b> = proton + nötron<br>
👉 Örnek: ¹²C → Proton = 6, Nötron = 6<br><br>

<b style="color:var(--primary)">🔹 Periyodik Sistem (Mantık!)</b><br>
• Soldan sağa → atom numarası artar | Yukarıdan aşağı → katman sayısı artar<br>
• <b>Aynı gruptakiler</b> → benzer özellik gösterir.<br>
• <b>1A:</b> Alkali metaller (çok tepkimeli) | <b>7A:</b> Halojenler | <b>8A:</b> Soy gazlar (tepkimeye girmez)<br>
👉 <b>Trendler:</b> Atom yarıçapı sağa doğru küçülür, Elektronegatiflik sağa doğru artar.
`;

const newEtkilesimlerContent = `<b>3. KİMYASAL ETKİLEŞİMLER (EN KRİTİK KONU)</b><br><br>
<b style="color:var(--primary)">🔹 Kimyasal Türler</b><br>
• <b>1. Atom:</b> Tek başına (He gibi)<br>
• <b>2. Molekül:</b> Aynı veya farklı atomlar (O₂, H₂O)<br>
• <b>3. İyon:</b> Elektron alır/verir. (Katyon: Elektron verir +, Anyon: Elektron alır −)<br><br>

<b style="color:var(--primary)">🔹 Güçlü Etkileşimler (Kimyasal Bağlar)</b><br>
• <b>1. İyonik Bağ:</b> Metal + ametal. Elektron alışverişi (Örn: NaCl. Na verir, Cl alır)<br>
• <b>2. Kovalent Bağ:</b> Ametal + ametal. Elektron ortaklaşa kullanılır (Örn: H₂O)<br>
• <b>3. Metalik Bağ:</b> Metaller arasında. Elektronlar serbest dolaşır (Metaller elektriği bu yüzden iletir)<br><br>

<b style="color:var(--primary)">🔹 Zayıf Etkileşimler</b><br>
• <b>1. Hidrojen Bağı:</b> En güçlü zayıf bağ. H + (F, O, N) atomları arası. (Suyun kaynama noktasını yükseltir)<br>
• <b>2. Van der Waals:</b> Çok zayıf. Gazlarda görülür.<br>
• <b>3. Dipol-Dipol:</b> Kutuplu (polar) moleküller arasında.
`;

content = content.replace(/(id:\s*'kimya_bilimi'[\s\S]*?content:\s*`)([\s\S]*?)(`,)/, "$1" + newKimyaBilimiContent + "$3");
content = content.replace(/(id:\s*'atom_sistem'[\s\S]*?content:\s*`)([\s\S]*?)(`,)/, "$1" + newAtomSistemContent + "$3");
content = content.replace(/(id:\s*'etkilesimler'[\s\S]*?content:\s*`)([\s\S]*?)(`,)/, "$1" + newEtkilesimlerContent + "$3");

// Add semesters:
content = content.replace(/(id:\s*'kimya_bilimi')/, "semester: 1,\n            $1");
content = content.replace(/(id:\s*'atom_sistem')/, "semester: 1,\n            $1");
content = content.replace(/(id:\s*'etkilesimler')/, "semester: 1,\n            $1");
content = content.replace(/(id:\s*'maddenin_halleri')/, "semester: 2,\n            $1");
content = content.replace(/(id:\s*'doga_kimya')/, "semester: 2,\n            $1");

const newQuestions = [
    { q: "Aşağıdakilerden hangisi simyanın özelliklerinden biridir?", options: ["Deneyler tekrarlanabilir", "Bilimsel yöntem kullanılır", "Sistemli bilgi içermez", "Matematiksel hesaplamalar yapılır"], a: "Sistemli bilgi içermez", difficulty: "easy" },
    { q: "Aşağıdakilerden hangisi kimyanın alt dallarından biri değildir?", options: ["Analitik kimya", "Organik kimya", "Astronomi", "Biyokimya"], a: "Astronomi", difficulty: "easy" },
    { q: "Aşağıdakilerden hangisi kimyacıların çalışma alanlarından biri değildir?", options: ["İlaç üretimi", "Gıda sektörü", "Uzay teleskopu üretimi", "Çevre analizi"], a: "Uzay teleskopu üretimi", difficulty: "easy" },
    { q: "'Na' sembolü hangi elementi temsil eder?", options: ["Azot", "Sodyum", "Neon", "Nikel"], a: "Sodyum", difficulty: "easy" },
    { q: "Aşağıdaki bileşiklerden hangisi suyu gösterir?", options: ["CO₂", "H₂O", "O₂", "H₂"], a: "H₂O", difficulty: "easy" },
    { q: "Laboratuvarda aşağıdakilerden hangisi yapılmamalıdır?", options: ["Koruyucu gözlük takmak", "Kimyasalı koklarken el ile yönlendirmek", "Maddeleri tatmak", "Eldiven kullanmak"], a: "Maddeleri tatmak", difficulty: "easy" },
    { q: "Aşağıdaki atom modellerinden hangisi ilk bilimsel modeldir?", options: ["Bohr", "Dalton", "Thomson", "Rutherford"], a: "Dalton", difficulty: "easy" },
    { q: "Elektronu keşfeden bilim insanı kimdir?", options: ["Dalton", "Rutherford", "Thomson", "Bohr"], a: "Thomson", difficulty: "medium" },
    { q: "Atomun çekirdeğini keşfeden kimdir?", options: ["Dalton", "Thomson", "Rutherford", "Bohr"], a: "Rutherford", difficulty: "medium" },
    { q: "Aşağıdakilerden hangisi atomun temel parçacıklarından biri değildir?", options: ["Proton", "Elektron", "Nötron", "Molekül"], a: "Molekül", difficulty: "easy" },
    { q: "Atom numarası neyi gösterir?", options: ["Nötron sayısını", "Proton sayısını", "Elektron sayısını", "Kütleyi"], a: "Proton sayısını", difficulty: "easy" },
    { q: "Kütle numarası neye eşittir?", options: ["Proton", "Nötron", "Proton + nötron", "Elektron"], a: "Proton + nötron", difficulty: "easy" },
    { q: "Periyodik tabloda yatay sıralara ne denir?", options: ["Grup", "Periyot", "Katman", "Seri"], a: "Periyot", difficulty: "easy" },
    { q: "Aynı gruptaki elementler için ne söylenir?", options: ["Atom numaraları aynıdır", "Özellikleri benzerdir", "Hepsi metaldir", "Elektron sayıları aynıdır"], a: "Özellikleri benzerdir", difficulty: "easy" },
    { q: "Aşağıdakilerden hangisi soy gazdır?", options: ["Oksijen", "Azot", "Neon", "Karbon"], a: "Neon", difficulty: "easy" },
    { q: "Aşağıdakilerden hangisi kimyasal türdür?", options: ["Atom", "Molekül", "İyon", "Hepsi"], a: "Hepsi", difficulty: "easy" },
    { q: "Elektron veren atom ne olur?", options: ["Anyon", "Katyon", "Molekül", "Nötron"], a: "Katyon", difficulty: "easy" },
    { q: "Elektron alan atom ne olur?", options: ["Katyon", "Anyon", "Atom", "Proton"], a: "Anyon", difficulty: "easy" },
    { q: "İyonik bağ hangi türler arasında oluşur?", options: ["Ametal-ametal", "Metal-ametal", "Metal-metal", "Soy gazlar"], a: "Metal-ametal", difficulty: "easy" },
    { q: "Kovalent bağ hangi türler arasında oluşur?", options: ["Metal-metal", "Metal-ametal", "Ametal-ametal", "Soy gaz"], a: "Ametal-ametal", difficulty: "easy" },
    { q: "Metalik bağ nerede görülür?", options: ["Ametallerde", "Metallerde", "Gazlarda", "Tuzlarda"], a: "Metallerde", difficulty: "easy" },
    { q: "Aşağıdakilerden hangisi zayıf etkileşimdir?", options: ["İyonik bağ", "Kovalent bağ", "Hidrojen bağı", "Metalik bağ"], a: "Hidrojen bağı", difficulty: "medium" },
    { q: "Hidrojen bağı hangi atomlarla oluşur?", options: ["H + C", "H + O", "H + Na", "H + Fe"], a: "H + O", difficulty: "medium" },
    { q: "Van der Waals kuvvetleri nasıldır?", options: ["Çok güçlü", "Orta güçlü", "Zayıf", "Kimyasal bağdır"], a: "Zayıf", difficulty: "easy" },
    { q: "Aşağıdakilerden hangisi fiziksel değişim değildir?", options: ["Buzun erimesi", "Kağıdın yanması", "Suyun buharlaşması", "Tuzun çözünmesi"], a: "Kağıdın yanması", difficulty: "easy" }
];

const searchString = "id: 'kimya_bilimi',";
let insertIdx = content.indexOf('questions: [', content.indexOf(searchString)) + 12;

let newQsString = "\\n";
newQuestions.forEach(q => {
    newQsString += \`                { q: "\${q.q}", options: \${JSON.stringify(q.options)}, a: "\${q.a}", difficulty: '\${q.difficulty}' },\\n\`;
});

content = content.slice(0, insertIdx) + newQsString + content.slice(insertIdx);

fs.writeFileSync('data.js', content, 'utf8');
console.log('Modified data.js successfully!');
