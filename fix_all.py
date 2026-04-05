import json
import re

# 1. FIX APP.JS
try:
    with open('app.js', 'r', encoding='utf-8') as f:
        app_code = f.read()

    new_app_func = """    renderGrade9() {
        const grid = document.querySelector('.grade9-grid');
        if (!grid) return;
        
        let html = '';
        const s1 = KIMYALAB_DATA.grade9.filter(t => t.semester === 1);
        const s2 = KIMYALAB_DATA.grade9.filter(t => t.semester === 2);
        const other = KIMYALAB_DATA.grade9.filter(t => !t.semester);

        const cardHtml = (topic) => `
            <div class="game-card animate-slide-up" style="background:#4ade80; min-height:140px; justify-content:center; align-items:flex-start; padding:20px;" onclick="app.showGrade9Detail('${topic.id}')">
                <i class="fa-solid fa-atom"></i>
                <h3 style="font-size:1.2rem; margin-bottom:5px;">${topic.name}</h3>
                <p style="font-size:0.8rem; opacity:0.8;">${topic.desc}</p>
            </div>
        `;

        if (s1.length > 0) {
            html += `<div style="width:100%; border-bottom:2px solid var(--primary); padding-bottom:5px; margin-top:10px; margin-bottom:5px;"><h3 style="color:var(--primary); margin:0;">1. Dönem Konuları</h3></div>`;
            html += s1.map(cardHtml).join('');
        }
        if (s2.length > 0) {
            html += `<div style="width:100%; border-bottom:2px solid var(--primary); padding-bottom:5px; margin-top:20px; margin-bottom:5px;"><h3 style="color:var(--primary); margin:0;">2. Dönem Konuları</h3></div>`;
            html += s2.map(cardHtml).join('');
        }
        if (other.length > 0) {
            html += other.map(cardHtml).join('');
        }

        grid.innerHTML = html;
    }"""

    # regex to replace renderGrade9 function up to the next method
    pattern_app = re.compile(r"renderGrade9\(\) \{.*?grid\.innerHTML = KIMYALAB_DATA\.grade9\.map\(topic => `.*?`\)\.join\(''\);\s*\}", re.DOTALL)
    app_code = pattern_app.sub(new_app_func, app_code)

    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(app_code)
    print("app.js updated successfully.")
except Exception as e:
    print(f"Error updating app.js: {e}")

# 2. FIX DATA.JS
try:
    with open('data.js', 'r', encoding='utf-8') as f:
        data_code = f.read()

    # Part 1: Kimya Bilimi, Atom Sistem
    kimya_bilimi_content = """<b>1. KİMYA BİLİMİ (DETAYLI)</b><br><br>
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
👉 Laboratuvarda: Asit suya eklenir (TERSİ YAPILMAZ), tadına bakılmaz, koklarken direkt çekilmez."""

    atom_sistem_content = """<b>2. ATOM VE PERİYODİK SİSTEM</b><br><br>
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
👉 <b>Trendler:</b> Atom yarıçapı sağa doğru küçülür, Elektronegatiflik sağa doğru artar."""

    etkilesim_content = """<b>3. KİMYASAL ETKİLEŞİMLER (EN KRİTİK KONU)</b><br><br>
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
• <b>3. Dipol-Dipol:</b> Kutuplu (polar) moleküller arasında.<br><br>
<b style="color:var(--primary)">🔗 GÜÇLÜ ETKİLEŞİMLER (Kimyasal Bağlar - Detaylı)</b><br>
<b>⚡ İyonik Bağlar:</b> Metal + ametal. Metal elektron verir (katyon), ametal elektron alır (anyon). Zıt yükler birbirini çeker. (Örn: Na⁺ + Cl⁻ → NaCl). Kristal yapıdadır, yüksek erime noktalıdır ve elektrik iletirler (eriyik/çözelti).<br><br>
<b>🔹 Kovalent Bağlar:</b> Ametal + ametal. Elektron ortak kullanılır. (Apolar: Eşit paylaşım O₂. Polar: Eşitsiz paylaşım H₂O). Düşük erime noktalı ve elektrik iletmezler.<br><br>
<b>🔥 Fiziksel ve Kimyasal Değişimler</b><br>
• <b>Fiziksel Değişim:</b> Sadece görünüş değişir (Buzun erimesi, buharlaşma).<br>
• <b>Kimyasal Değişim:</b> Yeni madde oluşur (Yanma, Paslanma). (İpuçları: Renk değişimi, gaz çıkışı, ısı açığa çıkması)."""

    maddenin_halleri_content = """<b>2. MADDENİN HALLERİ</b><br><br>
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
• <b>Örnek:</b> Güneş, Şimşek"""

    doga_kimya_content = """<b>3. DOĞA VE KİMYA</b><br><br>
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
• Sera gazları artar, Dünya ısınır."""


    def replace_content(module_id, new_content, text):
        pattern = re.compile(rf"(id:\s*'{module_id}'[\s\S]*?content:\s*`)([\s\S]*?)(`,)", re.DOTALL)
        return pattern.sub(rf"\1{new_content}\3", text)

    data_code = replace_content('kimya_bilimi', kimya_bilimi_content, data_code)
    data_code = replace_content('atom_sistem', atom_sistem_content, data_code)
    data_code = replace_content('etkilesimler', etkilesim_content, data_code)
    data_code = replace_content('maddenin_halleri', maddenin_halleri_content, data_code)
    data_code = replace_content('doga_kimya', doga_kimya_content, data_code)

    # ADD SEMESTERS
    data_code = re.sub(r"(id:\s*'kimya_bilimi')", r"semester: 1,\n            \1", data_code)
    data_code = re.sub(r"(id:\s*'atom_sistem')", r"semester: 1,\n            \1", data_code)
    data_code = re.sub(r"(id:\s*'etkilesimler')", r"semester: 1,\n            \1", data_code)
    data_code = re.sub(r"(id:\s*'maddenin_halleri')", r"semester: 2,\n            \1", data_code)
    data_code = re.sub(r"(id:\s*'doga_kimya')", r"semester: 2,\n            \1", data_code)

    # INSERT NEW QUESTIONS
    questions_to_insert = [
        # Kimya Bilimi Semester 1 items
        ('kimya_bilimi', [{"q": "Aşağıdakilerden hangisi simyanın özelliklerinden biridir?", "options": ["Deneyler tekrarlanabilir", "Bilimsel yöntem kullanılır", "Sistemli bilgi içermez", "Matematiksel hesaplamalar yapılır"], "a": "Sistemli bilgi içermez", "difficulty": "easy"}, {"q": "Aşağıdakilerden hangisi kimyanın alt dallarından biri değildir?", "options": ["Analitik kimya", "Organik kimya", "Astronomi", "Biyokimya"], "a": "Astronomi", "difficulty": "easy"}, {"q": "Aşağıdakilerden hangisi kimyacıların çalışma alanlarından biri değildir?", "options": ["İlaç üretimi", "Gıda sektörü", "Uzay teleskopu üretimi", "Çevre analizi"], "a": "Uzay teleskopu üretimi", "difficulty": "easy"}, {"q": "'Na' sembolü hangi elementi temsil eder?", "options": ["Azot", "Sodyum", "Neon", "Nikel"], "a": "Sodyum", "difficulty": "easy"}, {"q": "Aşağıdaki bileşiklerden hangisi suyu gösterir?", "options": ["CO₂", "H₂O", "O₂", "H₂"], "a": "H₂O", "difficulty": "easy"}, {"q": "Laboratuvarda aşağıdakilerden hangisi yapılmamalıdır?", "options": ["Koruyucu gözlük takmak", "Kimyasalı koklarken el ile yönlendirmek", "Maddeleri tatmak", "Eldiven kullanmak"], "a": "Maddeleri tatmak", "difficulty": "easy"}, {"q": "Aşağıdaki atom modellerinden hangisi ilk bilimsel modeldir?", "options": ["Bohr", "Dalton", "Thomson", "Rutherford"], "a": "Dalton", "difficulty": "easy"}, {"q": "Elektronu keşfeden bilim insanı kimdir?", "options": ["Dalton", "Rutherford", "Thomson", "Bohr"], "a": "Thomson", "difficulty": "medium"}, {"q": "Atomun çekirdeğini keşfeden kimdir?", "options": ["Dalton", "Thomson", "Rutherford", "Bohr"], "a": "Rutherford", "difficulty": "medium"}, {"q": "Aşağıdakilerden hangisi atomun temel parçacıklarından biri değildir?", "options": ["Proton", "Elektron", "Nötron", "Molekül"], "a": "Molekül", "difficulty": "easy"}, {"q": "Atom numarası neyi gösterir?", "options": ["Nötron sayısını", "Proton sayısını", "Elektron sayısını", "Kütleyi"], "a": "Proton sayısını", "difficulty": "easy"}, {"q": "Kütle numarası neye eşittir?", "options": ["Proton", "Nötron", "Proton + nötron", "Elektron"], "a": "Proton + nötron", "difficulty": "easy"}, {"q": "Periyodik tabloda yatay sıralara ne denir?", "options": ["Grup", "Periyot", "Katman", "Seri"], "a": "Periyot", "difficulty": "easy"}, {"q": "Aynı gruptaki elementler için ne söylenir?", "options": ["Atom numaraları aynıdır", "Özellikleri benzerdir", "Hepsi metaldir", "Elektron sayıları aynıdır"], "a": "Özellikleri benzerdir", "difficulty": "easy"}, {"q": "Aşağıdakilerden hangisi soy gazdır?", "options": ["Oksijen", "Azot", "Neon", "Karbon"], "a": "Neon", "difficulty": "easy"}, {"q": "Aşağıdakilerden hangisi kimyasal türdür?", "options": ["Atom", "Molekül", "İyon", "Hepsi"], "a": "Hepsi", "difficulty": "easy"}, {"q": "Elektron veren atom ne olur?", "options": ["Anyon", "Katyon", "Molekül", "Nötron"], "a": "Katyon", "difficulty": "easy"}, {"q": "Elektron alan atom ne olur?", "options": ["Katyon", "Anyon", "Atom", "Proton"], "a": "Anyon", "difficulty": "easy"}, {"q": "İyonik bağ hangi türler arasında oluşur?", "options": ["Ametal-ametal", "Metal-ametal", "Metal-metal", "Soy gazlar"], "a": "Metal-ametal", "difficulty": "easy"}, {"q": "Kovalent bağ hangi türler arasında oluşur?", "options": ["Metal-metal", "Metal-ametal", "Ametal-ametal", "Soy gaz"], "a": "Ametal-ametal", "difficulty": "easy"}, {"q": "Metalik bağ nerede görülür?", "options": ["Ametallerde", "Metallerde", "Gazlarda", "Tuzlarda"], "a": "Metallerde", "difficulty": "easy"}, {"q": "Aşağıdakilerden hangisi zayıf etkileşimdir?", "options": ["İyonik bağ", "Kovalent bağ", "Hidrojen bağı", "Metalik bağ"], "a": "Hidrojen bağı", "difficulty": "medium"}, {"q": "Hidrojen bağı hangi atomlarla oluşur?", "options": ["H + C", "H + O", "H + Na", "H + Fe"], "a": "H + O", "difficulty": "medium"}, {"q": "Van der Waals kuvvetleri nasıldır?", "options": ["Çok güçlü", "Orta güçlü", "Zayıf", "Kimyasal bağdır"], "a": "Zayıf", "difficulty": "easy"}, {"q": "Aşağıdakilerden hangisi fiziksel değişim değildir?", "options": ["Buzun erimesi", "Kağıdın yanması", "Suyun buharlaşması", "Tuzun çözünmesi"], "a": "Kağıdın yanması", "difficulty": "easy"}]),
        # Semester 2 elements
        ('etkilesimler', [{"q": "İyonik bağ nasıl oluşur?", "options": ["Elektron paylaşımı", "Proton alışverişi", "Elektron alışverişi", "Nötron paylaşımı"], "a": "Elektron alışverişi", "difficulty": "easy"}, {"q": "İyonik bağ hangi türler arasında olur?", "options": ["Ametal-ametal", "Metal-ametal", "Metal-metal", "Soy gaz"], "a": "Metal-ametal", "difficulty": "easy"}, {"q": "Kovalent bağ nasıl oluşur?", "options": ["Elektron alışverişi", "Elektron ortaklaşa", "Proton aktarımı", "Enerji aktarımı"], "a": "Elektron ortaklaşa", "difficulty": "easy"}, {"q": "Aşağıdakilerden hangisi kovalenttir?", "options": ["NaCl", "H₂O", "KBr", "CaO"], "a": "H₂O", "difficulty": "medium"}, {"q": "Metalik bağ nerede bulunur?", "options": ["Gazlarda", "Metallerde", "Sıvılarda", "Tuzlarda"], "a": "Metallerde", "difficulty": "easy"}, {"q": "Fiziksel değişim nedir?", "options": ["Yeni madde oluşur", "Yapı değişir", "Görünüş değişir", "Atom sayısı değişir"], "a": "Görünüş değişir", "difficulty": "easy"}, {"q": "Kimyasal değişimde ne olur?", "options": ["Yeni madde oluşur", "Sadece şekil değişir", "Hacim değişmez", "Renk değişmez"], "a": "Yeni madde oluşur", "difficulty": "easy"}, {"q": "Yanma olayı nedir?", "options": ["Fiziksel", "Kimyasal", "Nötr", "Mekanik"], "a": "Kimyasal", "difficulty": "easy"}, {"q": "Paslanma nedir?", "options": ["Fiziksel", "Kimyasal", "Buharlaşma", "Yoğuşma"], "a": "Kimyasal", "difficulty": "easy"}, {"q": "Buzun erimesi nedir?", "options": ["Kimyasal", "Fiziksel", "Nükleer", "Biyolojik"], "a": "Fiziksel", "difficulty": "easy"}]),
        ('maddenin_halleri', [{"q": "Katılar nasıl yapıdadır?", "options": ["Boşluklu", "Düzensiz", "Sıkı", "Gaz gibi"], "a": "Sıkı", "difficulty": "easy"}, {"q": "Sıvıların özelliği nedir?", "options": ["Şekil sabit", "Hacim sabit", "Hiçbiri", "Katı gibi"], "a": "Hacim sabit", "difficulty": "easy"}, {"q": "Gazların özelliği nedir?", "options": ["Sabit hacim", "Sabit şekil", "Sıkıştırılamaz", "Sıkıştırılabilir"], "a": "Sıkıştırılabilir", "difficulty": "easy"}, {"q": "Plazma nedir?", "options": ["Katı", "İyonlaşmış gaz", "Sıvı", "Metal"], "a": "İyonlaşmış gaz", "difficulty": "easy"}, {"q": "Katı türü olmayan?", "options": ["Kristal", "Amorf", "Gaz", "Tuz"], "a": "Gaz", "difficulty": "easy"}, {"q": "Gazlar neden sıkıştırılır?", "options": ["Yoğun", "Boşluk fazla", "Ağır", "Katı"], "a": "Boşluk fazla", "difficulty": "medium"}])
    ]

    for m_id, q_list in questions_to_insert:
        marker = f"id: '{m_id}',"
        start_idx = data_code.find(marker)
        if start_idx == -1:
            continue
        q_start = data_code.find('questions: [', start_idx) + 12
        if q_start < 12:
            continue
        q_str = "\\n"
        for q in q_list:
            q_str += f"""                {{ q: "{q['q']}", options: {json.dumps(q['options'], ensure_ascii=False)}, a: "{q['a']}", difficulty: '{q['difficulty']}' }},\\n"""
        data_code = data_code[:q_start] + q_str + data_code[q_start:]

    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(data_code)
    print("data.js updated successfully.")
except Exception as e:
    print(f"Error updating data.js: {e}")
