const fs = require('fs');
let code = fs.readFileSync('data.js', 'utf8');

const newMaddeninHalleriContent = `<b>2. MADDENİN HALLERİ</b><br><br>
<b style="color:var(--primary)">🔹 Maddenin Fiziksel Halleri</b><br>
Madde 4 halde bulunur:<br><br>

<b>🧊 Katılar</b><br>
• Belirli şekil ve hacim, Tanecikler sıkı.<br>
• <b>Türleri:</b> Amorf (düzensiz - cam), Kristal (düzenli - tuz)<br><br>

<b>💧 Sıvılar</b><br>
• Belirli hacim, şekil yok. Akışkandır.<br>
• <b>Özellik:</b> Yüzey gerilimi, Viskozite<br><br>

<b>🌫️ Gazlar</b><br>
• Ne şekil ne hacim var. Çok sıkıştırılabilir.<br>
• <b>Özellik:</b> Tanecikler arası boşluk fazla<br><br>

<b>⚡ Plazma</b><br>
• İyonlaşmış gaz, En enerjik hal<br>
• <b>Örnek:</b> Güneş, Şimşek
`;

const newDogaKimyaContent = `<b>3. DOĞA VE KİMYA</b><br><br>
<b style="color:var(--primary)">🔹 Su ve Hayat</b><br>
• Canlıların büyük kısmı sudur. Evrensel çözücüdür.<br>
• <b>Özellikleri:</b> Polar yapı, Hidrojen bağı, Yüksek özgül ısı<br>
👉 Bu yüzden canlılar için hayatidir.<br><br>

<b style="color:var(--primary)">🌍 Çevre Kimyası</b><br>
Doğayı etkileyen kimyasal olayları inceler.<br><br>

<b>🔹 Hava Kirliliği</b><br>
• CO₂, SO₂, NO₂ gazları. (Sanayi ve araçlar)<br><br>

<b>🔹 Asit Yağmurları</b><br>
• SO₂ + NO₂ → asit<br>
👉 <b>Zararları:</b> Ormanlar, Tarihi eserler<br><br>

<b>🔹 Küresel Isınma</b><br>
• Sera gazları artar, Dünya ısınır.
`;

const extraEtkilesimlerContent = `<br><br><b>🔗 GÜÇLÜ ETKİLEŞİMLER (Kimyasal Bağlar - Detaylı)</b><br>
<b>⚡ İyonik Bağlar:</b> Metal + ametal. Metal elektron verir (katyon), ametal elektron alır (anyon). Zıt yükler birbirini çeker. (Örn: Na⁺ + Cl⁻ → NaCl). Kristal yapıdadır, yüksek erime noktalıdır ve elektrik iletirler (eriyik/çözelti).<br><br>
<b>🔹 Kovalent Bağlar:</b> Ametal + ametal. Elektron ortak kullanılır. (Apolar: Eşit paylaşım O₂. Polar: Eşitsiz paylaşım H₂O). Düşük erime noktalı ve elektrik iletmezler.<br><br>
<b>🔥 Fiziksel ve Kimyasal Değişimler</b><br>
• <b>Fiziksel Değişim:</b> Sadece görünüş değişir (Buzun erimesi, buharlaşma).<br>
• <b>Kimyasal Değişim:</b> Yeni madde oluşur (Yanma, Paslanma). (İpuçları: Renk değişimi, gaz çıkışı, ısı açığa çıkması).
`;

// Replace contents:
code = code.replace(/(id:\s*'maddenin_halleri'[\s\S]*?content:\s*`)([\s\S]*?)(`,)/, "$1" + newMaddeninHalleriContent + "$3");
code = code.replace(/(id:\s*'doga_kimya'[\s\S]*?content:\s*`)([\s\S]*?)(`,)/, "$1" + newDogaKimyaContent + "$3");

// Add to etkilesimler (we just append just before the closing tag of the content)
code = code.replace(/(id:\s*'etkilesimler'[\s\S]*?content:\s*`[\s\S]*?)(`,)/, "$1" + extraEtkilesimlerContent + "$2");

const newQsEtkilesimler = [
    { q: "İyonik bağ nasıl oluşur?", options: ["Elektron paylaşımı", "Proton alışverişi", "Elektron alışverişi", "Nötron paylaşımı"], a: "Elektron alışverişi", difficulty: "easy" },
    { q: "İyonik bağ hangi türler arasında olur?", options: ["Ametal-ametal", "Metal-ametal", "Metal-metal", "Soy gaz"], a: "Metal-ametal", difficulty: "easy" },
    { q: "Kovalent bağ nasıl oluşur?", options: ["Elektron alışverişi", "Elektron ortaklaşa", "Proton aktarımı", "Enerji aktarımı"], a: "Elektron ortaklaşa", difficulty: "easy" },
    { q: "Aşağıdakilerden hangisi kovalenttir?", options: ["NaCl", "H₂O", "KBr", "CaO"], a: "H₂O", difficulty: "medium" },
    { q: "Metalik bağ nerede bulunur?", options: ["Gazlarda", "Metallerde", "Sıvılarda", "Tuzlarda"], a: "Metallerde", difficulty: "easy" },
    { q: "Fiziksel değişim nedir?", options: ["Yeni madde oluşur", "Yapı değişir", "Görünüş değişir", "Atom sayısı değişir"], a: "Görünüş değişir", difficulty: "easy" },
    { q: "Kimyasal değişimde ne olur?", options: ["Yeni madde oluşur", "Sadece şekil değişir", "Hacim değişmez", "Renk değişmez"], a: "Yeni madde oluşur", difficulty: "easy" },
    { q: "Yanma olayı nedir?", options: ["Fiziksel", "Kimyasal", "Nötr", "Mekanik"], a: "Kimyasal", difficulty: "easy" },
    { q: "Paslanma nedir?", options: ["Fiziksel", "Kimyasal", "Buharlaşma", "Yoğuşma"], a: "Kimyasal", difficulty: "easy" },
    { q: "Buzun erimesi nedir?", options: ["Kimyasal", "Fiziksel", "Nükleer", "Biyolojik"], a: "Fiziksel", difficulty: "easy" }
];

const newQsMaddenin = [
    { q: "Katılar nasıl yapıdadır?", options: ["Boşluklu", "Düzensiz", "Sıkı", "Gaz gibi"], a: "Sıkı", difficulty: "easy" },
    { q: "Sıvıların özelliği nedir?", options: ["Şekil sabit", "Hacim sabit", "Hiçbiri", "Katı gibi"], a: "Hacim sabit", difficulty: "easy" },
    { q: "Gazların özelliği nedir?", options: ["Sabit hacim", "Sabit şekil", "Sıkıştırılamaz", "Sıkıştırılabilir"], a: "Sıkıştırılabilir", difficulty: "easy" },
    { q: "Plazma nedir?", options: ["Katı", "İyonlaşmış gaz", "Sıvı", "Metal"], a: "İyonlaşmış gaz", difficulty: "easy" },
    { q: "Katı türü olmayan?", options: ["Kristal", "Amorf", "Gaz", "Tuz"], a: "Gaz", difficulty: "easy" },
    { q: "Gazlar neden sıkıştırılır?", options: ["Yoğun", "Boşluk fazla", "Ağır", "Katı"], a: "Boşluk fazla", difficulty: "medium" }
];

// Append to etkilesimler
let idxEtk = code.indexOf('questions: [', code.indexOf("id: 'etkilesimler',")) + 12;
let qsEtk = "\\n";
newQsEtkilesimler.forEach(q => { qsEtk += \`                { q: "\${q.q}", options: \${JSON.stringify(q.options)}, a: "\${q.a}", difficulty: '\${q.difficulty}' },\\n\`; });
code = code.slice(0, idxEtk) + qsEtk + code.slice(idxEtk);

// Append to maddenin_halleri
let idxMad = code.indexOf('questions: [', code.indexOf("id: 'maddenin_halleri',")) + 12;
let qsMad = "\\n";
newQsMaddenin.forEach(q => { qsMad += \`                { q: "\${q.q}", options: \${JSON.stringify(q.options)}, a: "\${q.a}", difficulty: '\${q.difficulty}' },\\n\`; });
code = code.slice(0, idxMad) + qsMad + code.slice(idxMad);

fs.writeFileSync('data.js', code, 'utf8');
console.log('Modified data.js p2');
