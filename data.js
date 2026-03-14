// data.js - Veri Katmanı

const KIMYALAB_DATA = {
    // KULLANICI HESAPLARI (Sadece bu 10 kişi giriş yapabilir)
    users: [
        { username: 'ahmet123', password: '123' },
        { username: 'mehmet456', password: '123' },
        { username: 'ayse789', password: '123' },
        { username: 'fatma000', password: '123' },
        { username: 'ali111', password: '123' },
        { username: 'veli222', password: '123' },
        { username: 'zeynep333', password: '123' },
        { username: 'elif444', password: '123' },
        { username: 'mustafa555', password: '123' },
        { username: 'ofjsf', password: '123' } // Ekran görüntüsündeki isim
    ],

    // 1. Temel Elementler (Genişletilmiş)
    elements: [
        { symbol: 'H', name: 'Hidrojen', number: 1 },
        { symbol: 'He', name: 'Helyum', number: 2 },
        { symbol: 'Li', name: 'Lityum', number: 3 },
        { symbol: 'Be', name: 'Berilyum', number: 4 },
        { symbol: 'B', name: 'Bor', number: 5 },
        { symbol: 'C', name: 'Karbon', number: 6 },
        { symbol: 'N', name: 'Azot', number: 7 },
        { symbol: 'O', name: 'Oksijen', number: 8 },
        { symbol: 'F', name: 'Flor', number: 9 },
        { symbol: 'Ne', name: 'Neon', number: 10 },
        { symbol: 'Na', name: 'Sodyum', number: 11 },
        { symbol: 'Mg', name: 'Magnezyum', number: 12 },
        { symbol: 'Al', name: 'Alüminyum', number: 13 },
        { symbol: 'Si', name: 'Silisyum', number: 14 },
        { symbol: 'P', name: 'Fosfor', number: 15 },
        { symbol: 'S', name: 'Kükürt', number: 16 },
        { symbol: 'Cl', name: 'Klor', number: 17 },
        { symbol: 'Ar', name: 'Argon', number: 18 },
        { symbol: 'K', name: 'Potasyum', number: 19 },
        { symbol: 'Ca', name: 'Kalsiyum', number: 20 },
        // Yaygın kullanılan diğer elementler
        { symbol: 'Fe', name: 'Demir', number: 26 },
        { symbol: 'Cu', name: 'Bakır', number: 29 },
        { symbol: 'Zn', name: 'Çinko', number: 30 },
        { symbol: 'Ag', name: 'Gümüş', number: 47 },
        { symbol: 'Au', name: 'Altın', number: 79 },
        { symbol: 'Hg', name: 'Cıva', number: 80 },
        { symbol: 'Pb', name: 'Kurşun', number: 82 }
    ],

    // 2. Kökler ve İyonlar (Tablo Ekranı için Genişletilmiş)
    cations: [
        { symbol: 'Li⁺', name: 'Lityum', charge: '+1' },
        { symbol: 'Na⁺', name: 'Sodyum', charge: '+1' },
        { symbol: 'K⁺', name: 'Potasyum', charge: '+1' },
        { symbol: 'Rb⁺', name: 'Rubidyum', charge: '+1' },
        { symbol: 'Cs⁺', name: 'Sezyum', charge: '+1' },
        { symbol: 'Ag⁺', name: 'Gümüş', charge: '+1' },
        { symbol: 'NH₄⁺', name: 'Amonyum', charge: '+1' }
    ],
    anions: [
        { symbol: 'F⁻', name: 'Florür', charge: '-1' },
        { symbol: 'Cl⁻', name: 'Klorür', charge: '-1' },
        { symbol: 'Br⁻', name: 'Bromür', charge: '-1' },
        { symbol: 'I⁻', name: 'İyodür', charge: '-1' },
        { symbol: 'OH⁻', name: 'Hidroksit', charge: '-1' },
        { symbol: 'NO₃⁻', name: 'Nitrat', charge: '-1' }
    ],

    // Tüm kökler karışık
    radicals: [
        { symbol: 'OH⁻', name: 'Hidroksit', charge: '-1' },
        { symbol: 'NO₃⁻', name: 'Nitrat', charge: '-1' },
        { symbol: 'SO₄²⁻', name: 'Sülfat', charge: '-2' },
        { symbol: 'PO₄³⁻', name: 'Fosfat', charge: '-3' },
        { symbol: 'CO₃²⁻', name: 'Karbonat', charge: '-2' },
        { symbol: 'NH₄⁺', name: 'Amonyum', charge: '+1' }
    ],

    // 3. İlerleme Sistemi (Seviyeler)
    levels: [
        { title: 'Çaylak', requiredScore: 0 },
        { title: 'Asistan', requiredScore: 50 },
        { title: 'Şef', requiredScore: 150 },
        { title: 'Uzman', requiredScore: 300 },
        { title: 'Araştırmacı', requiredScore: 500 },
        { title: 'Profesör', requiredScore: 1000 }
    ],

    // 4. Rozetler (Ekran Görüntüsüne Göre Güncellendi)
    badges: [
        { id: 'b_ilk_oyun', name: 'İlk Oyun', desc: 'İlk oyununu tamamla', icon: 'fa-medal', locked: true },
        { id: 'b_kombo_ustasi', name: 'Kombo Ustası', desc: '5 ardışık doğru cevap ver', icon: 'fa-fire', locked: true },
        { id: 'b_super_kombo', name: 'Süper Kombo', desc: '10 ardışık doğru cevap ver', icon: 'fa-bolt', locked: true },
        { id: 'b_efsane', name: 'Efsane', desc: '15 ardışık doğru cevap ver', icon: 'fa-crown', locked: true },
        { id: 'b_mukemmel', name: 'Mükemmel', desc: 'Bir oyunda tam puan al', icon: 'fa-100', locked: true },
        { id: 'b_tablo_fatihi', name: 'Tablo Fatihi', desc: '4 tabloyu da bitir', icon: 'fa-trophy', locked: true },
        { id: 'b_kararli', name: 'Kararlı', desc: '3 günlük seri yap', icon: 'fa-calendar-days', locked: true },
        { id: 'b_profesor', name: 'Profesör', desc: '601+ puan topla', icon: 'fa-user-graduate', locked: true }
    ]
};

// Basit Utility Fonksiyonları
const utils = {
    // Array'den rastgele eleman seç
    getRandomItem: (arr) => arr[Math.floor(Math.random() * arr.length)],
    
    // Array'i karıştır
    shuffleArray: (arr) => {
        let array = [...arr];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    
    // N tane benzersiz yanlış cevap üret (Tüm elementler listesinden)
    getWrongAnswers: (correctName, count, dataType = 'elements') => {
        let allItems = KIMYALAB_DATA[dataType];
        let wrongOptions = [];
        let limit = 0; // infinite loop guard
        
        while(wrongOptions.length < count && limit < 100) {
            let randItem = utils.getRandomItem(allItems);
            if(randItem.name !== correctName && !wrongOptions.includes(randItem.name)) {
                wrongOptions.push(randItem.name);
            }
            limit++;
        }
        return wrongOptions;
    }
};
