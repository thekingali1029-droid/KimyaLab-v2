const KIMYALAB_DATA = {
    users: [
        { username: 'ali', password: '123', title: 'Çaylak', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ali' },
        { username: 'ayse', password: '456', title: 'Atom Avcısı', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse' },
        { username: 'mehmet', password: '789', title: 'Karışım Ustası', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet' },
        { username: 'fatma', password: '101', title: 'Elektron Efendisi', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatma' },
        { username: 'can', password: '202', title: 'Süper Simyacı', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Can' },
        { username: 'elif', password: '303', title: 'Çaylak', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elif' },
        { username: 'ozan', password: '404', title: 'Çaylak', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ozan' },
        { username: 'sude', password: '505', title: 'Çaylak', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sude' },
        { username: 'berk', password: '606', title: 'Çaylak', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berk' },
        { username: 'ipek', password: '707', title: 'Çaylak', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ipek' }
    ],

    // FULL PERİODİC TABLE (1-118)
    elements: [
        { n: 1, s: "H", name: "Hidrojen", cat: "nonmetal", desc: "Evrenin %75'ini oluşturan en hafif elementtir." },
        { n: 2, s: "He", name: "Helyum", cat: "noble", desc: "Güneş'te gerçekleşen nükleer füzyonun temelidir." },
        { n: 3, s: "Li", name: "Lityum", cat: "alkali", desc: "En hafif metaldir, pillerde yaygın olarak kullanılır." },
        { n: 4, s: "Be", name: "Berilyum", cat: "alkaline", desc: "Havacılık ve uzay sanayisinde kullanılan sert bir metaldir." },
        { n: 5, s: "B", name: "Bor", cat: "metalloid", desc: "Türkiye dünyadaki en büyük bor rezervlerine sahiptir." },
        { n: 6, s: "C", name: "Karbon", cat: "nonmetal", desc: "Yaşamın temelidir; elmas ve grafit karbonun formlarıdır." },
        { n: 7, s: "N", name: "Azot", cat: "nonmetal", desc: "Atmosferin %78'ini oluşturur, soğutma işlemlerinde kullanılır." },
        { n: 8, s: "O", name: "Oksijen", cat: "nonmetal", desc: "Solunum ve yanma olayları için hayati önem taşır." },
        { n: 9, s: "F", name: "Flor", cat: "halogen", desc: "En elektronegatif elementtir, diş macunlarında bulunur." },
        { n: 10, s: "Ne", name: "Neon", cat: "noble", desc: "Tabelalarda parlak turuncu-kırmızı ışık vermek için kullanılır." },
        { n: 11, s: "Na", name: "Sodyum", cat: "alkali", desc: "Sofra tuzunun bir bileşenidir, suyla şiddetli tepkime verir." },
        { n: 12, s: "Mg", name: "Magnezyum", cat: "alkaline", desc: "Hafiftir ve klorofilin merkez atomunu oluşturur." },
        { n: 13, s: "Al", name: "Alüminyum", cat: "transition", desc: "İçecek kutuları ve mutfak folyoları için ideal bir metaldir." },
        { n: 14, s: "Si", name: "Silisyum", cat: "metalloid", desc: "Bilgisayar çipleri ve güneş pillerinde ana malzemedir." },
        { n: 15, s: "P", name: "Fosfor", cat: "nonmetal", desc: "Canlıların DNA ve ATP yapısında yer alan kritik bir maddedir." },
        { n: 16, s: "S", name: "Kükürt", cat: "nonmetal", desc: "Barut ve sülfürik asit üretiminde kilit rol oynar." },
        { n: 17, s: "Cl", name: "Klor", cat: "halogen", desc: "Su arıtma ve dezenfeksiyon işlemlerinde kullanılır." },
        { n: 18, s: "Ar", name: "Argon", cat: "noble", desc: "Ampullerin içini doldurmak için kullanılan asal koruyucudur." },
        { n: 19, s: "K", name: "Potasyum", cat: "alkali", desc: "Sinir iletimi ve kas fonksiyonları için önemlidir." },
        { n: 20, s: "Ca", name: "Kalsiyum", cat: "alkaline", desc: "Kemiklerin ve dişlerin temel yapı taşıdır." },
        { n: 21, s: "Sc", name: "Skandiyum", cat: "transition", desc: "Hafif alaşımlar yapmak için kullanılır; bazen stadyum lambalarında bulunur." },
        { n: 22, s: "Ti", name: "Titanyum", cat: "transition", desc: "Çelik kadar güçlü ama çok daha hafiftir; uçaklarda ve protezlerde kullanılır." },
        { n: 23, s: "V", name: "Vanadyum", cat: "transition", desc: "Çeliği sertleştirmek için kullanılan gümüşi bir metaldir." },
        { n: 24, s: "Cr", name: "Krom", cat: "transition", desc: "Paslanmaz çelik yapımında ve parlak kaplamalarda kullanılır." },
        { n: 25, s: "Mn", name: "Manganez", cat: "transition", desc: "Demir üretim sürecinde oksijeni uzaklaştırmak için hayati önem taşır." },
        { n: 26, s: "Fe", name: "Demir", cat: "transition", desc: "Dünya'nın çekirdeğinin ana bileşenidir ve inşaat sektörünün temel taşıdır." },
        { n: 27, s: "Co", name: "Kobalt", cat: "transition", desc: "Mıknatıs yapımında ve canlı mavi pigmentler oluşturmada kullanılır." },
        { n: 28, s: "Ni", name: "Nikel", cat: "transition", desc: "Madeni paraların yapımında ve korozyona dirençli alaşımlarda bulunur." },
        { n: 29, s: "Cu", name: "Bakır", cat: "transition", desc: "Mükemmel iletkenliği nedeniyle elektrik kablolarının vazgeçilmezidir." },
        { n: 30, s: "Zn", name: "Çinko", cat: "transition", desc: "Demiri paslanmaya karşı korumak için galvanizleme işleminde kullanılır." },
        { n: 31, s: "Ga", name: "Galyum", cat: "transition", desc: "Elde eriyebilen ilginç bir metaldir; LED ve lazerlerde kullanılır." },
        { n: 32, s: "Ge", name: "Germanyum", cat: "metalloid", desc: "Yarı iletken endüstrisinde ve fiber optik kablolarda kilit maddedir." },
        { n: 33, s: "As", name: "Arsenik", cat: "metalloid", desc: "Zehirli özelliğiyle bilinir, ancak lazer ve transistörlerde de kullanılır." },
        { n: 34, s: "Se", name: "Selenyum", cat: "nonmetal", desc: "Işığa duyarlı özellikleri nedeniyle fotokopi makinelerinde kullanılır." },
        { n: 35, s: "Br", name: "Brom", cat: "halogen", desc: "Oda sıcaklığında sıvı halde bulunan tek ametaldir." },
        { n: 36, s: "Kr", name: "Kripton", cat: "noble", desc: "Yüksek yoğunluklu aydınlatma ve fotoğraf flaşlarında kullanılır." },
        { n: 37, s: "Rb", name: "Rubidyum", cat: "alkali", desc: "Hava ile temas eder etmez kendiliğinden tutuşan çok reaktif bir metaldir." },
        { n: 38, s: "Sr", name: "Stronsiyum", cat: "alkaline", desc: "Havai fişeklere parlak kırmızı rengini veren elementtir." },
        { n: 39, s: "Y", name: "İtriyum", cat: "transition", desc: "TV ekranlarında kırmızı renk oluşturmak ve süper iletkenler için kullanılır." },
        { n: 40, s: "Zr", name: "Zirkonyum", cat: "transition", desc: "Nükleer reaktör kılıflarında ve mücevherat (yapay elmas) alanında kullanılır." },
        { n: 41, s: "Nb", name: "Niyobyum", cat: "transition" },
        { n: 42, s: "Mo", name: "Molibden", cat: "transition" },
        { n: 43, s: "Tc", name: "Teknesyum", cat: "transition" },
        { n: 44, s: "Ru", name: "Rutenyum", cat: "transition" },
        { n: 45, s: "Rh", name: "Rodyum", cat: "transition" },
        { n: 46, s: "Pd", name: "Paladyum", cat: "transition" },
        { n: 47, s: "Ag", name: "Gümüş", cat: "transition" },
        { n: 48, s: "Cd", name: "Kadmiyum", cat: "transition" },
        { n: 49, s: "In", name: "İndiyum", cat: "transition" },
        { n: 50, s: "Sn", name: "Kalay", cat: "transition" },
        { n: 51, s: "Sb", name: "Antimon", cat: "metalloid" },
        { n: 52, s: "Te", name: "Tellür", cat: "metalloid" },
        { n: 53, s: "I", name: "İyot", cat: "halogen" },
        { n: 54, s: "Xe", name: "Ksenon", cat: "noble" },
        { n: 55, s: "Cs", name: "Sezyum", cat: "alkali" },
        { n: 56, s: "Ba", name: "Baryum", cat: "alkaline" },
        { n: 57, s: "La", name: "Lantan", cat: "lanthanide" },
        { n: 58, s: "Ce", name: "Seryum", cat: "lanthanide" },
        { n: 59, s: "Pr", name: "Prasedim", cat: "lanthanide" },
        { n: 60, s: "Nd", name: "Neodimyum", cat: "lanthanide" },
        { n: 61, s: "Pm", name: "Prometyum", cat: "lanthanide" },
        { n: 62, s: "Sm", name: "Samaryum", cat: "lanthanide" },
        { n: 63, s: "Eu", name: "Europiyum", cat: "lanthanide" },
        { n: 64, s: "Gd", name: "Gadolinyum", cat: "lanthanide" },
        { n: 65, s: "Tb", name: "Terbiyum", cat: "lanthanide" },
        { n: 66, s: "Dy", name: "Disprozyum", cat: "lanthanide" },
        { n: 67, s: "Ho", name: "Holmiyum", cat: "lanthanide" },
        { n: 68, s: "Er", name: "Erbiyum", cat: "lanthanide" },
        { n: 69, s: "Tm", name: "Tulyum", cat: "lanthanide" },
        { n: 70, s: "Yb", name: "İterbiyum", cat: "lanthanide" },
        { n: 71, s: "Lu", name: "Lutesyum", cat: "lanthanide" },
        { n: 72, s: "Hf", name: "Hafniyum", cat: "transition" },
        { n: 73, s: "Ta", name: "Tantal", cat: "transition" },
        { n: 74, s: "W", name: "Volfram", cat: "transition" },
        { n: 75, s: "Re", name: "Renyum", cat: "transition" },
        { n: 76, s: "Os", name: "Osmiyum", cat: "transition" },
        { n: 77, s: "Ir", name: "İridyum", cat: "transition" },
        { n: 78, s: "Pt", name: "Platin", cat: "transition" },
        { n: 79, s: "Au", name: "Altın", cat: "transition" },
        { n: 80, s: "Hg", name: "Cıva", cat: "transition" },
        { n: 81, s: "Tl", name: "Talyum", cat: "transition" },
        { n: 82, s: "Pb", name: "Kurşun", cat: "transition" },
        { n: 83, s: "Bi", name: "Bizmut", cat: "transition" },
        { n: 84, s: "Po", name: "Polonyum", cat: "metalloid" },
        { n: 85, s: "At", name: "Astatin", cat: "halogen" },
        { n: 86, s: "Rn", name: "Radon", cat: "noble" },
        { n: 87, s: "Fr", name: "Fransiyum", cat: "alkali" },
        { n: 88, s: "Ra", name: "Radyum", cat: "alkaline" },
        { n: 89, s: "Ac", name: "Aktinyum", cat: "actinide" },
        { n: 90, s: "Th", name: "Toryum", cat: "actinide" },
        { n: 91, s: "Pa", name: "Protaktinyum", cat: "actinide" },
        { n: 92, s: "U", name: "Uranyum", cat: "actinide" },
        { n: 93, s: "Np", name: "Neptunyum", cat: "actinide" },
        { n: 94, s: "Pu", name: "Plutonyum", cat: "actinide" },
        { n: 95, s: "Am", name: "Amerikyum", cat: "actinide" },
        { n: 96, s: "Cm", name: "Küriyum", cat: "actinide" },
        { n: 97, s: "Bk", name: "Berkelyum", cat: "actinide" },
        { n: 98, s: "Cf", name: "Kaliforniyum", cat: "actinide" },
        { n: 99, s: "Es", name: "Aynştaynyum", cat: "actinide" },
        { n: 100, s: "Fm", name: "Fermiyum", cat: "actinide" },
        { n: 101, s: "Md", name: "Mendelevyum", cat: "actinide" },
        { n: 102, s: "No", name: "Nobelyum", cat: "actinide" },
        { n: 103, s: "Lr", name: "Lavrensiyum", cat: "actinide" },
        { n: 104, s: "Rf", name: "Rutherfordiyum", cat: "transition" },
        { n: 105, s: "Db", name: "Dubniyum", cat: "transition" },
        { n: 106, s: "Sg", name: "Seaborgiyum", cat: "transition" },
        { n: 107, s: "Bh", name: "Bohriyum", cat: "transition" },
        { n: 108, s: "Hs", name: "Hassiyum", cat: "transition" },
        { n: 109, s: "Mt", name: "Meitneriyum", cat: "transition" },
        { n: 110, s: "Ds", name: "Darmstadtiyum", cat: "transition" },
        { n: 111, s: "Rg", name: "Röntgenyum", cat: "transition" },
        { n: 112, s: "Cn", name: "Kopernikyum", cat: "transition" },
        { n: 113, s: "Nh", name: "Nihonyum", cat: "transition" },
        { n: 114, s: "Fl", name: "Flerovyum", cat: "transition" },
        { n: 115, s: "Mc", name: "Moskovyum", cat: "transition" },
        { n: 116, s: "Lv", name: "Livermoryum", cat: "transition" },
        { n: 117, s: "Ts", name: "Tennessin", cat: "halogen" },
        { n: 118, s: "Og", name: "Oganesson", cat: "noble" }
    ],

    cations: [
        { symbol: 'H⁺', name: 'Hidrojen', charge: '+1', desc: 'Asitliğin temelini oluşturan protondur.' },
        { symbol: 'Li⁺', name: 'Lityum', charge: '+1', desc: 'Lityum pillerinin ana bileşenidir.' },
        { symbol: 'Na⁺', name: 'Sodyum', charge: '+1', desc: 'Vücut sıvılarındaki ana katyondur.' },
        { symbol: 'K⁺', name: 'Potasyum', charge: '+1', desc: 'Hücre içi sinir iletiminde hayati rol oynar.' },
        { symbol: 'NH₄⁺', name: 'Amonyum', charge: '+1', desc: 'Gübre sanayisinde yaygın kullanılan çok atomlu bir iyondur.' },
        { symbol: 'Mg²⁺', name: 'Magnezyum', charge: '+2', desc: 'Klorofilin yapısında bulunur.' },
        { symbol: 'Ca²⁺', name: 'Kalsiyum', charge: '+2', desc: 'Kemik yapısının ana bileşenidir.' },
        { symbol: 'Ba²⁺', name: 'Baryum', charge: '+2', desc: 'X-ışını görüntülemede kontrast maddesi olarak kullanılır.' },
        { symbol: 'Fe²⁺', name: 'Demir (II)', charge: '+2', desc: 'Hemoglobinin yapısında bulunur.' },
        { symbol: 'Fe³⁺', name: 'Demir (III)', charge: '+3', desc: 'Pirit ve hematit gibi cevherlerde bulunur.' },
        { symbol: 'Al³⁺', name: 'Alüminyum', charge: '+3', desc: 'Hafif ve korozyona dayanıklı alaşımlar için kilit iyon.' },
        { symbol: 'Cu⁺', name: 'Bakır (I)', charge: '+1', desc: 'Bakır iyonlarının daha az kararlı halidir.' },
        { symbol: 'Cu²⁺', name: 'Bakır (II)', charge: '+2', desc: 'Çözeltilere mavi renk veren iyon.' },
        { symbol: 'Ag⁺', name: 'Gümüş', charge: '+1', desc: 'Fotoğrafçılık ve ayna üretiminde kullanılır.' },
        { symbol: 'Zn²⁺', name: 'Çinko', charge: '+2', desc: 'Enzim fonksiyonları için önemli bir katyondır.' },
        { symbol: 'Pb²⁺', name: 'Kurşun (II)', charge: '+2', desc: 'Akülerde kullanılan ağır bir metal iyonudur.' },
        { symbol: 'Hg²⁺', name: 'Cıva (II)', charge: '+2', desc: 'Sıvı metal olan cıvanın kararlı iyonudur.' },
        { symbol: 'Sn²⁺', name: 'Kalay (II)', charge: '+2', desc: 'Kalay kaplamacılıkta kullanılır.' },
        { symbol: 'Cr³⁺', name: 'Krom (III)', charge: '+3', desc: 'Metabolizma için esansiyel bir iz elementtir.' }
    ],
    anions: [
        { symbol: 'F⁻', name: 'Florür', charge: '-1', desc: 'Diş minesini güçlendiren iyondur.' },
        { symbol: 'Cl⁻', name: 'Klorür', charge: '-1', desc: 'Mide asidinin ana bileşenidir.' },
        { symbol: 'Br⁻', name: 'Bromür', charge: '-1', desc: 'Eskiden sakinleştirici olarak kullanılırdı.' },
        { symbol: 'I⁻', name: 'İyodür', charge: '-1', desc: 'Tiroit bezinin düzgün çalışması için gereklidir.' },
        { symbol: 'OH⁻', name: 'Hidroksit', charge: '-1', desc: 'Bazik özellik gösteren temel iyondur.' },
        { symbol: 'CN⁻', name: 'Siyanür', charge: '-1', desc: 'Çok zehirli ve sanayide kullanılan bir anyondur.' },
        { symbol: 'NO₃⁻', name: 'Nitrat', charge: '-1', desc: 'Bitki besini olarak gübrelerde bulunur.' },
        { symbol: 'NO₂⁻', name: 'Nitrit', charge: '-1', desc: 'Gıda koruyucusu olarak kullanılır.' },
        { symbol: 'SO₄²⁻', name: 'Sülfat', charge: '-2', desc: 'Sanayide çok yönlü kullanılan bir anyondur.' },
        { symbol: 'SO₃²⁻', name: 'Sülfit', charge: '-2', desc: 'Bazı gıdalarda antioksidan olarak kullanılır.' },
        { symbol: 'CO₃²⁻', name: 'Karbonat', charge: '-2', desc: 'Kireçtaşının ana bileşenidir.' },
        { symbol: 'PO₄³⁻', name: 'Fosfat', charge: '-3', desc: 'DNA ve enerji molekülü ATP\'nin parçasıdır.' },
        { symbol: 'MnO₄⁻', name: 'Permanganat', charge: '-1', desc: 'Güçlü bir yükseltgendir.' },
        { symbol: 'Cr₂O₇²⁻', name: 'Dikromat', charge: '-2', desc: 'Laboratuvarda oksidasyon için kullanılır.' },
        { symbol: 'CH₃COO⁻', name: 'Asetat', charge: '-1', desc: 'Sirkenin içindeki asidin anyonudur.' },
        { symbol: 'ClO⁻', name: 'Hipoklorit', charge: '-1', desc: 'Çamaşır suyunun aktif maddesidir.' },
        { symbol: 'ClO₄⁻', name: 'Perklorat', charge: '-1', desc: 'Roket yakıtlarında oksitleyici olarak kullanılır.' }
    ],
    metals: [
        { symbol: 'Fe', name: 'Demir', desc: 'Dünyanın en çok kullanılan metalidir, inşaat ve araçlarda temel taşıdır.' },
        { symbol: 'Cu', name: 'Bakır', desc: 'Mükemmel bir iletkendir, elektrik kablolarında vazgeçilmezdir.' },
        { symbol: 'Au', name: 'Altın', desc: 'Asla paslanmayan ve çok değerli olan bir soy metaldir.' },
        { symbol: 'Ag', name: 'Gümüş', desc: 'Bilinen en iyi elektrik ve ısı iletkenidir.' },
        { symbol: 'Al', name: 'Alüminyum', desc: 'Hafifliği ve korozyon direnci ile havacılıkta kullanılır.' },
        { symbol: 'Zn', name: 'Çinko', desc: 'Demiri korozyondan korumak için galvanizlemede kullanılır.' },
        { symbol: 'Hg', name: 'Cıva', desc: 'Oda sıcaklığında sıvı halde bulunan tek metaldir.' },
        { symbol: 'Ti', name: 'Titanyum', desc: 'Çok dayanıklı ve vücut dostudur, tıbbi protezlerde kullanılır.' },
        { symbol: 'Pb', name: 'Kurşun', desc: 'Radyasyon kalkanı ve akü yapımında kullanılan ağır bir metaldir.' },
        { symbol: 'Sn', name: 'Kalay', desc: 'Paslanmaya karşı dirençlidir, lehim yapımında kullanılır.' },
        { symbol: 'Pt', name: 'Platin', desc: 'Aşınmaya dirençli, katalizör olarak kullanılan değerli bir metaldir.' },
        { symbol: 'Ni', name: 'Nikel', desc: 'Paslanmaz çelik üretiminde ve madeni paralarda kullanılır.' },
        { symbol: 'Cr', name: 'Krom', desc: 'Sertlik kazandırır, metalleri parlatmak ve korumak için kullanılır.' },
        { symbol: 'Mn', name: 'Manganez', desc: 'Çelik üretiminde oksijen ve kükürt giderici olarak kullanılır.' },
        { symbol: 'W', name: 'Volfram', desc: 'Erime noktası en yüksek olan metaldir, ampul tellerinde kullanılır.' },
        { symbol: 'Na', name: 'Sodyum', desc: 'Yumuşak, gümüş-beyaz renkli, suyla şiddetli reaksiyon veren aktif metal.' },
        { symbol: 'K', name: 'Potasyum', desc: 'Bitki beslenmesi için hayati önem taşıyan çok aktif bir alkali metal.' },
        { symbol: 'Mg', name: 'Magnezyum', desc: 'Hafif alaşımlarda ve fotoğraf makinesi flaşlarında kullanılır.' },
        { symbol: 'Ca', name: 'Kalsiyum', desc: 'Kemiklerin ve dişlerin yapısında bulunan alkali toprak metal.' },
        { symbol: 'Li', name: 'Lityum', desc: 'Pillerde kullanılan, bilinen en hafif katı elementtir.' },
        { symbol: 'Co', name: 'Kobalt', desc: 'Mıknatıs yapımında ve lityum pillerin katotlarında kullanılan önemli bir metaldir.' },
        { symbol: 'Pd', name: 'Paladyum', desc: 'Katalizör olarak kullanılan, hidrojeni emme özelliğiyle bilinen nadir bir metaldir.' },
        { symbol: 'Cd', name: 'Kadmiyum', desc: 'Pillerde ve pigmentlerde kullanılan, ancak zehirli özelliği olan bir metaldir.' },
        { symbol: 'Ba', name: 'Baryum', desc: 'X-ışını kontrast maddelerinde ve havai fişeklere yeşil renk vermede kullanılır.' },
        { symbol: 'Cs', name: 'Sezyum', desc: 'Atom saatlerinde kullanılan, en reaktif kararlı alkali metallerden biridir.' },
        { symbol: 'Fr', name: 'Fransiyum', desc: 'Doğada çok nadir bulunan ve çok kısa ömürlü olan radyoaktif bir alkali metal.' },
        { symbol: 'Ra', name: 'Radyum', desc: 'Marie Curie tarafından keşfedilen, eskiden karanlıkta parlayan boyalar için kullanılan radyoaktif metal.' },
        { symbol: 'U', name: 'Uranyum', desc: 'Nükleer enerji ve savunma sanayisinin temel hammaddesi olan ağır metal.' },
        { symbol: 'Pu', name: 'Plutonyum', desc: 'Nükleer reaktörlerde yakıt veya nükleer silahlarda kullanılan yapay metal.' },
        { symbol: 'Th', name: 'Toryum', desc: 'Gelecekte nükleer yakıt olarak kullanılması planlanan, uranyuma göre daha güvenli bir metal.' },
        { symbol: 'Ga', name: 'Galyum', desc: 'Vücut sıcaklığında (29.7°C) eriyebilen, yarı iletkenlerde kullanılan ilginç bir metal.' },
        { symbol: 'Ge', name: 'Germanyum', desc: 'Transistörlerin icadında rol oynamış, kızılötesi optiklerde kullanılan bir yarı iletkendir.' },
        { symbol: 'In', name: 'İndiyum', desc: 'LCD ekranlarda ve dokunmatik panellerde şeffaf elektrot olarak kullanılır.' },
        { symbol: 'Bi', name: 'Bizmut', desc: 'En az zehirli ağır metaldir; kozmetikte ve ilaçlarda (mide rahatsızlıkları) kullanılır.' },
        { symbol: 'Po', name: 'Polonyum', desc: 'Çok güçlü bir alfa radyasyon kaynağı olan, Curie ailesi tarafından keşfedilen metal.' },
        { symbol: 'Sc', name: 'Skandiyum', desc: 'Yüksek mukavemetli alüminyum alaşımları yapmak için kullanılan hafif bir geçiş metali.' },
        { symbol: 'V', name: 'Vanadyum', desc: 'Çelik alaşımlarına yüksek darbe dayanımı ve esneklik kazandıran gümüşi metal.' },
        { symbol: 'Y', name: 'İtriyum', desc: 'Lazerlerde (YAG) ve TV tüplerinde kırmızı renk oluşturmak için kullanılır.' },
        { symbol: 'Zr', name: 'Zirkonyum', desc: 'Korozyona aşırı dirençli olduğu için nükleer reaktör kılıflarında tercih edilir.' },
        { symbol: 'Nb', name: 'Niyobyum', desc: 'MR cihazlarındaki süper iletken mıknatısların yapımında kullanılan kritik metal.' }
    ],
    first20Elements: [
        { symbol: 'H', name: 'Hidrojen', number: 1, desc: 'Evrenin en bol ve en hafif elementidir.' },
        { symbol: 'He', name: 'Helyum', number: 2, desc: 'Uçan balonlarda kullanılan hafif soygaz.' },
        { symbol: 'Li', name: 'Lityum', number: 3, desc: 'Şarj edilebilir pillerin ana maddesi.' },
        { symbol: 'Be', name: 'Berilyum', number: 4, desc: 'Hafif ama çelikten daha sert olan metal.' },
        { symbol: 'B', name: 'Bor', number: 5, desc: 'Türkiye\'de dünyadaki en büyük rezervi bulunan yarı metal.' },
        { symbol: 'C', name: 'Karbon', number: 6, desc: 'Yaşamın temel taşı, elmas ve grafitin ana maddesi.' },
        { symbol: 'N', name: 'Azot', number: 7, desc: 'Atmosferin %78\'ini oluşturan, soğutmada kullanılan gaz.' },
        { symbol: 'O', name: 'Oksijen', number: 8, desc: 'Solunum için gerekli olan aktif gaz.' },
        { symbol: 'F', name: 'Flor', number: 9, desc: 'En elektronegatif element, diş macunlarında bulunur.' },
        { symbol: 'Ne', name: 'Neon', number: 10, desc: 'Renkli reklam tabelalarında kullanılan soygaz.' },
        { symbol: 'Na', name: 'Sodyum', number: 11, desc: 'Yemek tuzunun ana bileşenlerinden olan aktif metal.' },
        { symbol: 'Mg', name: 'Magnezyum', number: 12, desc: 'Hafif ve beyaz ışık saçarak yanan bir metal.' },
        { symbol: 'Al', name: 'Alüminyum', number: 13, desc: 'Folyo ve mutfak gereçlerinde yaygın kullanılan metal.' },
        { symbol: 'Si', name: 'Silisyum', number: 14, desc: 'Yarı iletken teknolojisinin ve kumun ana maddesi.' },
        { symbol: 'P', name: 'Fosfor', number: 15, desc: 'Kibrit yapımında ve kemik yapısında bulunan ametal.' },
        { symbol: 'S', name: 'Kükürt', number: 16, desc: 'Barut ve sülfürik asit yapımında kullanılan sarı ametal.' },
        { symbol: 'Cl', name: 'Klor', number: 17, desc: 'Suların dezenfeksiyonunda kullanılan zehirli gaz.' },
        { symbol: 'Ar', name: 'Argon', number: 18, desc: 'Ampullerin içinde koruyucu atmosfer oluşturan soygaz.' },
        { symbol: 'K', name: 'Potasyum', number: 19, desc: 'Gübre yapımında ve sinir iletiminde önemli metal.' },
        { symbol: 'Ca', name: 'Kalsiyum', number: 20, desc: 'Mermer ve sütte bulunan, kemik gelişimi için kilit element.' }
    ],
    acidsBases: [
        { symbol: 'HCl', name: 'Hidroklorik Asit (Tuz Ruhu)', charge: 'Asit', desc: 'Midede sindirime yardımcı olan güçlü asit.' },
        { symbol: 'H₂SO₄', name: 'Sülfürik Asit (Zaç Yağı)', charge: 'Asit', desc: 'Sanayinin temel taşı olan en önemli asitlerden biri.' },
        { symbol: 'HNO₃', name: 'Nitrik Asit (Kezzap)', charge: 'Asit', desc: 'Gübre ve patlayıcı üretiminde kullanılan yakıcı asit.' },
        { symbol: 'CH₃COOH', name: 'Asetik Asit (Sirke Ruhu)', charge: 'Asit', desc: 'Zayıf bir asit olup gıdalarda kullanılır.' },
        { symbol: 'H₃PO₄', name: 'Fosforik Asit', charge: 'Asit', desc: 'Gübre üretiminde ve gıda sektöründe asitlik düzenleyici olarak kullanılır.' },
        { symbol: 'H₂CO₃', name: 'Karbonik Asit', charge: 'Asit', desc: 'Gazlı içeceklerde bulunan, karbondioksitin suda çözünmesiyle oluşan zayıf asit.' },
        { symbol: 'HCOOH', name: 'Formik Asit (Karınca Asidi)', charge: 'Asit', desc: 'Doğada karıncaların salgısında bulunan, tekstil ve deri sanayisinde kullanılan asit.' },
        { symbol: 'NaOH', name: 'Sodyum Hidroksit (Sud Kostik)', charge: 'Baz', desc: 'Sabun ve temizlik ürünleri yapımında kullanılan kuvvetli baz.' },
        { symbol: 'KOH', name: 'Potasyum Hidroksit (Potas Kostik)', charge: 'Baz', desc: 'Arap sabunu ve pillerde kullanılan bazdır.' },
        { symbol: 'NH₃', name: 'Amonyak', charge: 'Baz', desc: 'Keskin kokulu, azotlu gübrelerin hammaddesi olan zayıf baz.' },
        { symbol: 'Ca(OH)₂', name: 'Kalsiyum Hidroksit (Sönmüş Kireç)', charge: 'Baz', desc: 'İnşaat ve su arıtma işlemlerinde kullanılır.' },
        { symbol: 'Mg(OH)₂', name: 'Magnezyum Hidroksit (Magnesia Sütü)', charge: 'Baz', desc: 'Mide asidini dengelemek için antiasit olarak kullanılan bazdır.' },
        { symbol: 'Al(OH)₃', name: 'Alüminyum Hidroksit', charge: 'Baz', desc: 'Su arıtma ve mide ilaçlarında kullanılan bir bazik bileşiktir.' }
    ],
    labEquip: [
        { symbol: '🧪', name: 'Beherglas', charge: 'Sıvı Karıştırma', desc: 'Çözelti hazırlama ve karıştırma için kullanılır.' },
        { symbol: '⚗️', name: 'Erlenmayer', charge: 'Saklama/Çalkalama', desc: 'Ağzının dar olması sayesinde sıvıların çalkalanması ve saklanması için idealdir.' },
        { symbol: '🌡️', name: 'Dereceli Silindir', charge: 'Hacim Ölçümü', desc: 'Sıvıların hacmini hassas ölçmek için kullanılır.' },
        { symbol: '🔥', name: 'Bunzen Beki', charge: 'Isıtma', desc: 'Laboratuvarda kontrol edilebilir alev kaynağıdır.' },
        { symbol: '📏', name: 'Büret', charge: 'Titrasyon', desc: 'Hacim analizi (titrasyon) işlemlerinde kullanılır.' },
        { symbol: '⚖️', name: 'Analitik Terazi', charge: 'Hassas Tartım', desc: 'Kütleyi çok yüksek hassasiyetle ölçer.' },
        { symbol: '🥣', name: 'Havan', charge: 'Ezme/Öğütme', desc: 'Katı maddeleri toz haline getirmek için kullanılan porselen kap.' },
        { symbol: '🔬', name: 'Ayırma Hunisi', charge: 'Ayırma', desc: 'Birbiriyle karışmayan sıvıları (zeytinyağı-su gibi) ayırmak için kullanılır.' },
        { symbol: '🥢', name: 'Spatül', charge: 'Madde Taşıma', desc: 'Toz halindeki kimyasalları tartım veya aktarım sırasında almak için kullanılır.' },
        { symbol: '🍵', name: 'Saat Camı', charge: 'Kurutma/Tartım', desc: 'Az miktardaki katıların kurutulması veya tartılması için kullanılır.' }
    ],
    quizQuestions: [
        { q: "Suyun formülü nedir?", options: ["H2O", "CO2", "O2", "NaCl"], a: "H2O" },
        { q: "Hangi gazı soluruz?", options: ["Oksijen", "Azot", "Helyum", "Cıva"], a: "Oksijen" },
        { q: "Tuzun sembolü hangisidir?", options: ["NaCl", "H2O", "HCl", "NaOH"], a: "NaCl" },
        { q: "Demir'in sembolü nedir?", options: ["Fe", "I", "D", "Ir"], a: "Fe" },
        { q: "Altın'ın sembolü nedir?", options: ["Au", "Ag", "Al", "At"], a: "Au" },
        { q: "Bakır'ın sembolü nedir?", options: ["Cu", "B", "Ba", "Bk"], a: "Cu" },
        { q: "Uçan balonlarda hangi gaz bulunur?", options: ["Helyum", "Klor", "Oksijen", "Azot"], a: "Helyum" },
        { q: "Karbon'un sembolü nedir?", options: ["C", "Ca", "Cr", "K"], a: "C" },
        { q: "Gümüş'ün sembolü nedir?", options: ["Ag", "Au", "Al", "As"], a: "Ag" },
        { q: "Hangisi bir sıvıdır?", options: ["Su", "Demir", "Taş", "Oksijen"], a: "Su" },
        { q: "Dişlerimize ne iyi gelir?", options: ["Kalsiyum", "Demir", "Bakır", "Altın"], a: "Kalsiyum" },
        { q: "Oda sıcaklığında sıvı metal?", options: ["Cıva", "Demir", "Bakır", "Kurşun"], a: "Cıva" },
        { q: "Paslanmaz çelikte hangisi bulunur?", options: ["Demir", "Plastik", "Tahta", "Pamuk"], a: "Demir" },
        { q: "Güneş en çok hangi gazdan oluşur?", options: ["Hidrojen", "Oksijen", "Azot", "Karbondioksit"], a: "Hidrojen" },
        { q: "Bitkilerin besini için ne gereklidir?", options: ["Karbondioksit", "Altın", "Demir", "Helyum"], a: "Karbondioksit" },
        { q: "Kurşun kalemin ucu neyden yapılır?", options: ["Karbon(Grafit)", "Kurşun", "Demir", "Gümüş"], a: "Karbon(Grafit)" },
        { q: "Alüminyum folyo hangi metaldir?", options: ["Alüminyum", "Bakır", "Çinko", "Altın"], a: "Alüminyum" },
        { q: "Elektrik kablolarında ne kullanılır?", options: ["Bakır", "Tahta", "Plastik", "Cam"], a: "Bakır" }
    ],
    titles: [
        { score: 0, title: "Çaylak" },
        { score: 1000, title: "Atom Avcısı" },
        { score: 2500, title: "Karışım Ustası" },
        { score: 5000, title: "Elektron Efendisi" },
        { score: 10000, title: "Süper Simyacı" },
        { score: 25000, title: "Bilim Efsanesi" }
    ],
    vipTitles: [
        { score: 0, title: "V.I.P Prenses 👑" },
        { score: 1000, title: "Kelebek Kraliçesi 🦋" },
        { score: 2500, title: "Sihirli Simyacı ✨" },
        { score: 5000, title: "Elmas Deha 💎" },
        { score: 10000, title: "Bilim Tanrıçası 💖" }
    ],
    avatars: [
        'school_logo.jpg',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Caleb',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Sasha',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Willow'
    ],
    vipAvatars: [
        'vip_1.png', // Kimyager Prenses
        'vip_2.png', // Zarif Bilim Kızı
        'vip_3.png', // Modern Prenses
        'vip_4.png', // Kristal Deha
        'vip_5.png'  // Kraliyet Asistanı
    ],
    badges: [
        { id: 'b_caylak', name: 'Bilim Yolcusu', desc: '100 puana ulaştın!', icon: 'fa-walking' },
        { id: 'b_ilk_oyun', name: 'Deney Başladı', desc: 'İlk oyununu tamamladın!', icon: 'fa-flask' },
        { id: 'b_combo_5', name: 'Hızlı Reaksiyon', desc: '5x Combo yaptın!', icon: 'fa-bolt' },
        { id: 'b_combo_15', name: 'Atom Parçalayıcı', desc: '15x Combo yaptın!', icon: 'fa-atom' },
        { id: 'b_quiz_master', name: 'Quiz Master', desc: '10 quiz sorusunu doğru bil.', icon: 'fa-brain' },
        { id: 'b_asit_uzmani', name: 'Asitlerin Efendisi', desc: 'Asit/Baz oyununda uzmanlaştın.', icon: 'fa-vial-circle-check' },
        { id: 'b_profesor', name: 'Kimya Profesörü', desc: '500 puana ulaştın!', icon: 'fa-graduation-cap' },
        { id: 'b_lab_faresi', name: 'Laboratuvar Faresi', desc: '50 oyun tamamladın!', icon: 'fa-microscope' },
        { id: 'b_legend', name: 'Bilim Efsanesi', desc: '1000 puan barajını aştın!', icon: 'fa-crown' },
        { id: 'b_nobel', name: 'Nobel Yolcusu', desc: 'Zor modda kusursuz galibiyet!', icon: 'fa-award' },
        { id: 'b_simyaci', name: 'Büyük Simyacı', desc: '50,000 toplama puana ulaştın!', icon: 'fa-wand-magic-sparkles' }
    ],
    levels: [
        { title: 'Çaylak', requiredScore: 0 },
        { title: 'Asistan', requiredScore: 500 },
        { title: 'Uzman', requiredScore: 1500 },
        { title: 'Bilgin', requiredScore: 3000 },
        { title: 'Deha', requiredScore: 7000 },
        { title: 'Nobel Adayı', requiredScore: 15000 }
    ],
    compounds: [
        { symbol: 'NaCl', name: 'Yemek Tuzu (Sodyum Klorür)', desc: 'Sofra tuzu olarak bilinir, gıdaları korumak ve tatlandırmak için kullanılır.' },
        { symbol: 'CaCO₃', name: 'Kireç Taşı (Kalsiyum Karbonat)', desc: 'İnşaat malzemesi, tebeşir ve mermerin ana bileşenidir.' },
        { symbol: 'NaHCO₃', name: 'Yemek Sodası (Sodyum Bikarbonat)', desc: 'Hamur işlerinde kabartma tozu olarak kullanılır.' },
        { symbol: 'NH₄Cl', name: 'Nişadır (Amonyum Klorür)', desc: 'Pillerde, lehimlemede ve bazı öksürük şuruplarında bulunur.' },
        { symbol: 'CaO', name: 'Sönmemiş Kireç (Kalsiyum Oksit)', desc: 'Sanayide, özellikle çimento ve cam üretiminde yaygın kullanılır.' },
        { symbol: 'Ca(OH)₂', name: 'Sönmüş Kireç (Kalsiyum Hidroksit)', desc: 'Badana yapımında ve su arıtma işlemlerinde kullanılır.' },
        { symbol: 'CuSO₄', name: 'Göz Taşı (Bakır (II) Sülfat)', desc: 'Tarımda fungusit (mantar öldürücü) olarak kullanılır.' },
        { symbol: 'KNO₃', name: 'Güherçile (Potasyum Nitrat)', desc: 'Barut yapımında ve gübre sektöründe kullanılan oksitleyici bir maddedir.' },
        { symbol: 'CH₃OH', name: 'Metil Alkol (Odun Alkolü)', desc: 'Çok zehirlidir, endüstride çözücü olarak kullanılır.' },
    ],
    fusionQuestions: [
        { s: 'H', n: 'Hidrojen' }, { s: 'He', n: 'Helyum' }, { s: 'Li', n: 'Lityum' }, { s: 'Be', n: 'Berilyum' },
        { s: 'B', n: 'Bor' }, { s: 'C', n: 'Karbon' }, { s: 'N', n: 'Azot' }, { s: 'O', n: 'Oksijen' },
        { s: 'F', n: 'Flor' }, { s: 'Ne', n: 'Neon' }, { s: 'Na', n: 'Sodyum' }, { s: 'Mg', n: 'Magnezyum' },
        { s: 'Al', n: 'Alüminyum' }, { s: 'Si', n: 'Silisyum' }, { s: 'P', n: 'Fosfor' }, { s: 'S', n: 'Kükürt' },
        { s: 'Cl', n: 'Klor' }, { s: 'Ar', n: 'Argon' }, { s: 'K', n: 'Potasyum' }, { s: 'Ca', n: 'Kalsiyum' },
        { s: 'Fe', n: 'Demir' }, { s: 'Cu', n: 'Bakır' }, { s: 'Au', n: 'Altın' }, { s: 'Ag', n: 'Gümüş' },
        { s: 'Zn', n: 'Çinko' }, { s: 'Hg', n: 'Cıva' }, { s: 'Pb', n: 'Kurşun' }, { s: 'Sn', n: 'Kalay' },
        { s: 'NaCl', n: 'Tuz' }, { s: 'H₂O', n: 'Su' }, { s: 'CO₂', n: 'Karbondioksit' }
    ],
    grade11: [
        {
            id: 'org_sema',
            name: 'ORGANİZASYON ŞEMASI',
            desc: 'Kimya disiplinleri ve çalışma alanlarını kapsayan organizasyon yapısı.',
            content: `Kimya bilimi, maddenin yapısını, özelliklerini ve değişimlerini inceleyen geniş bir alandır. Başlıca alt dalları:
            • <b>Analitik Kimya:</b> Maddenin bileşenlerini nitel ve nicel olarak inceler.
            • <b>Biyokimya:</b> Canlı organizmaların yapısındaki kimyasal süreçleri inceler.
            • <b>Fizikokimya:</b> Kimyasal sistemlerdeki enerji ve iş değişimlerini fiziksel ilkelerle açıklar.
            • <b>Polimer Kimyası:</b> Çok sayıda küçük molekülün birleşerek oluşturduğu dev molekülleri inceler.
            • <b>Anorganik Kimya:</b> Genellikle karbon içermeyen (asit, baz, tuz, metal) bileşikleri inceler.
            • <b>Organik Kimya:</b> Karbon temelli bileşikleri inceler.`,
            questions: [
                { q: "Kan, idrar gibi örneklerin içeriğini inceleyen kimya alt dalı hangisidir?", options: ["Biyokimya", "Analitik Kimya", "Fizikokimya", "Polimer Kimyası"], a: "Biyokimya", difficulty: 'easy' },
                { q: "Maden sularının mineral içeriğini belirleyen kimya dalı hangisidir?", options: ["Analitik Kimya", "Organik Kimya", "Fizikokimya", "Biyokimya"], a: "Analitik Kimya", difficulty: 'easy' },
                { q: "Plastik, naylon, kauçuk gibi maddelerin üretimini hangi alan inceler?", options: ["Polimer Kimyası", "Anorganik Kimya", "Biyokimya", "Analitik Kimya"], a: "Polimer Kimyası", difficulty: 'easy' },
                { q: "Tepkime hızlarını ve enerji değişimlerini inceleyen alan hangisidir?", options: ["Fizikokimya", "Organik Kimya", "Analitik Kimya", "Nükleer Kimya"], a: "Fizikokimya", difficulty: 'medium' },
                { q: "Asitler, bazlar ve metaller gibi karbon içermeyen bileşikleri inceler?", options: ["Anorganik Kimya", "Organik Kimya", "Fizikokimya", "Biyokimya"], a: "Anorganik Kimya", difficulty: 'medium' },
                { q: "Farmasötik kimya hangi temel alanın bir uygulama dalıdır?", options: ["Analitik ve Biyokimya", "Fizikokimya", "Endüstriyel Kimya", "Nükleer Kimya"], a: "Analitik ve Biyokimya", difficulty: 'hard' },
                { q: "Petrokimya tesislerinde hangi hammadde ana odak noktasıdır?", options: ["Ham Petrol", "Doğal Gaz", "Kömür", "Biyokütle"], a: "Ham Petrol", difficulty: 'medium' },
                { q: "Boyaların maddeler üzerindeki etkisini ve yapısını inceleyen alan?", options: ["Tekstil Kimyası", "Polimer Kimyası", "Biyokimya", "Tarım Kimyası"], a: "Tekstil Kimyası", difficulty: 'medium' },
                { q: "Endüstride hammadde üretimini ve maliyet analizini yapan alan?", options: ["Endüstriyel Kimya", "Analitik Kimya", "Fizikokimya", "Anorganik Kimya"], a: "Endüstriyel Kimya", difficulty: 'hard' },
                { q: "Adli tıpta suç kanıtlarının (saç, tükürük vb.) analizi hangi alana girer?", options: ["Adli Kimya", "Fizikokimya", "Anorganik Kimya", "Organik Kimya"], a: "Adli Kimya", difficulty: 'easy' },
                { q: "Gıdaların raf ömrünü ve katkı maddelerini inceleyen alan?", options: ["Gıda Kimyası", "Biyokimya", "Nükleer Kimya", "Analitik Kimya"], a: "Gıda Kimyası", difficulty: 'easy' },
                { q: "Metabolizma süreçlerini moleküler düzeyde inceleyen bilim dalı?", options: ["Biyokimya", "Fizikokimya", "Jeokimya", "Polimer Kimyası"], a: "Biyokimya", difficulty: 'medium' },
                { q: "Ozon tabakasındaki değişimleri inceleyen kimya dalı hangisidir?", options: ["Çevre Kimyası", "Organik Kimya", "Fizikokimya", "Adli Kimya"], a: "Çevre Kimyası", difficulty: 'medium' },
                { q: "İlaçların sentezi ve vücuda etkisini araştıran uygulama alanı?", options: ["Farmasötik Kimya", "Nükleer Kimya", "Endüstriyel Kimya", "Polimer Kimyası"], a: "Farmasötik Kimya", difficulty: 'hard' },
                { q: "Güneş panelleri için yeni yarı iletken maddelerin geliştirilmesi?", options: ["Malzeme Kimyası", "Analitik Kimya", "Biyokimya", "Gıda Kimyası"], a: "Malzeme Kimyası", difficulty: 'hard' },
                { q: "Toprak analizi yaparak gübre ihtiyacını belirleyen alan?", options: ["Agrokimya", "Polimer Kimyası", "Fizikokimya", "Organik Kimya"], a: "Agrokimya", difficulty: 'easy' },
                { q: "Parfümlerin koku bileşenlerini tasarlayan kimya alanı?", options: ["Kozmetik Kimyası", "Anorganik Kimya", "Analitik Kimya", "Nükleer Kimya"], a: "Kozmetik Kimyası", difficulty: 'medium' },
                { q: "Çamaşır suyu ve tuz ruhu gibi temizlik maddelerini inceleyen alan?", options: ["Deterjan Kimyası", "Biyokimya", "Organik Kimya", "Fizikokimya"], a: "Deterjan Kimyası", difficulty: 'easy' },
                { q: "Bir numunede 'ne olduğu' (nitel) ve 'ne kadar olduğu' (nicel) analizi?", options: ["Analitik Kimya", "Fizikokimya", "Anorganik Kimya", "Polimer Kimyası"], a: "Analitik Kimya", difficulty: 'medium' },
                { q: "Pillerin ve şarj edilebilir bataryaların kimyasını inceleyen dal?", options: ["Elektrokimya", "Gıda Kimyası", "Biyokimya", "Jeokimya"], a: "Elektrokimya", difficulty: 'hard' }
            ]
        },
        {
            id: 'lab_guvenlik',
            name: 'LABORATUVAR GÜVENLİK SEMBOLLERİ',
            desc: 'Kimyasalların üzerindeki tehlike işaretleri ve anlamları.',
            content: `Laboratuvarda güvenli çalışma için piktogramları tanımak hayati önem taşır:
            • <b>Yanıcı (Alev):</b> Kolay tutuşan maddeler. Alkol, aseton gibi.
            • <b>Yakıcı (Oksitleyici):</b> Başka maddelerin yanmasını sağlayan, O harfi üzerinde alev sembolü. Hidrojen peroksit gibi.
            • <b>Korozif (Aşındırıcı):</b> Ciltte veya metalde aşınma yapan maddeler. Kuvvetli asit ve bazlar.
            • <b>Toksik (Zehirli):</b> Vücuda girdiğinde ciddi zararlar veren (kurukafa sembolü).
            • <b>Çevreye Zararlı:</b> Doğaya atıldığında zararlı olan, balık ve ağaç sembolü.`,
            questions: [
                // Eski 20 soru (Güncellenmiş İpuçları ve Çözümleriyle)
                { q: "O harfi üzerinde alev sembolü neyi ifade eder?", options: ["Yanıcı", "Yakıcı", "Zehirli", "Radyoaktif"], a: "Yakıcı", difficulty: 'easy', hint: "Alevin altındaki Oksijen harfini temsil eder.", explanation: "Yakıcı (oksitleyici) maddeler 'O' harfi üzerinde alev şekliyle gösterilir." },
                { q: "Asit kaplarının üzerinde hangi sembolün bulunması beklenir?", options: ["Korozif", "Yanıcı", "Radyoaktif", "Patlayıcı"], a: "Korozif", difficulty: 'easy', hint: "Metali ve eli delen bir sıvı simgesidir.", explanation: "Korozif (aşındırıcı) madde; canlı dokulara ve yüzeylere geri dönülmez hasarlar (aşınma) verir." },
                { q: "Kurukafa sembolü ne anlama gelir?", options: ["Toksik (Zehirli)", "Yakıcı", "Tahriş Edici", "Ekolojik Risk"], a: "Toksik (Zehirli)", difficulty: 'easy', hint: "Korsan bayrağını andırır, tehlike ve ölüm riskini gösterir.", explanation: "Kurukafa sembolü maddenin ağız, solunum ya da cilt yoluyla zehirlenmeye (toksik risk) yol açacağını gösterir." },
                { q: "Ünlem işareti (!) sembolü neyi belirtir?", options: ["Tahriş Edici", "Toksik", "Radyoaktif", "Yanıcı"], a: "Tahriş Edici", difficulty: 'medium', hint: "Zehirli kadar riskli olmasa da dikkat edilmesi gerekir.", explanation: "Ünlem işareti maddenin cildi veya solunum yollarını tahriş edebileceği anlamına gelir." },
                { q: "Ölü balık ve kurumuş ağaç sembolü neyi ifade eder?", options: ["Çevreye Zararlı", "Biyolojik Tehlike", "Su kirliliği", "Atık madde"], a: "Çevreye Zararlı", difficulty: 'medium', hint: "Doğal yaşam için büyük risk taşır.", explanation: "Ekotoksik maddeler sulara ve doğaya karıştığında bitkilere ve hayvanlara uzun süreli zararlar verir." },
                { q: "HF (Hidroflorik asit) gibi maddeler neden özel kaplarda saklanmalıdır?", options: ["Camı aşındırdığı için", "Yanıcı olduğu için", "Pahalı olduğu için", "Kokusu olduğu için"], a: "Camı aşındırdığı için", difficulty: 'hard', hint: "Plastik veya teflon gibi şişelerde tutulur.", explanation: "HF zayıf bir asittir fakat cama (silisyum dioksit) etki edebilen az sayıdaki asitlerden biridir." },
                { q: "Laboratuvarda kimyasalın güvenlik bilgi formuna ne ad verilir?", options: ["MSDS", "HPLC", "ASTM", "TSE"], a: "MSDS", difficulty: 'hard', hint: "Material Safety Data Sheet kısaltmasıdır.", explanation: "MSDS (Malzeme Güvenlik Bilgi Formu) kimyasalın her türlü sağlık, saklama ve risk bilgisini içeren dosyadır." },
                { q: "Radyoaktif maddelerle çalışılırken hangi kurşun önlük giyilmesinin temel sebebi nedir?", options: ["Radyasyonu emmek", "Sıcaklıktan korumak", "Ağırlık yapmak", "Şık durmak"], a: "Radyasyonu emmek", difficulty: 'medium', hint: "Kurşun, yoğunluğu çok yüksek ve ağır bir metaldir.", explanation: "Radyasyon (X ve gama ışınları) kurşun plakalar yardımıyla sönümlenerek vücuda zarar vermesi engellenir." },
                { q: "LPG tankları üzerinde hangi sembol mutlaka bulunur?", options: ["Yanıcı", "Oksitleyici", "Korozif", "Toksik"], a: "Yanıcı", difficulty: 'easy', hint: "Ufak bir kıvılcımla parlayabilir.", explanation: "Sıvılaştırılmış petrol gazı (LPG) yüksek düzeyde parlayıcı/yanıcı özelliğe sahiptir." },
                { q: "Kanserojen olduğunu belirten sembolde ne tasvir edilir?", options: ["Göğüste yıldız şekli", "Kurukafa", "Ünlem", "Alev"], a: "Göğüste yıldız şekli", difficulty: 'medium', hint: "İnsan sağlığını içeriden bozan bir simgeyi temsil eder.", explanation: "İnsan silüetindeki yıldız veya çatlak sembolü, maddenin mutajen, kanserojen ve ciddi sağlık riski barındırdığı anlamına gelir." },
                { q: "Patlayıcı maddeler için kullanılan sembol hangisidir?", options: ["Dağılan parçalar", "Alev", "Ölü ağaç", "Çarpı işareti"], a: "Dağılan parçalar", difficulty: 'easy', hint: "Bomba patlıyormuş gibi parçacıklar savrulur.", explanation: "Çevreye saçılan şarapnel taneleri şeklindeki bu ikona Patlayıcı (Explosive) sembolü denir." },
                { q: "Basınçlı tüplerin üzerindeki sembol hangisidir?", options: ["Gaz tüpü", "Alev", "Ünlem", "Pervane"], a: "Gaz tüpü", difficulty: 'easy', hint: "Bir silindir tasarımıdır.", explanation: "Sıkıştırılmış gaz içeren tüpler ısınma veya delinme sonucu mermi gibi fırlayabileceği için bu sembolle etiketlenir." },
                { q: "Biyolojik tehlike sembolü (Biohazard) nerede görülür?", options: ["Tıbbi atıklarda", "Asit şişelerinde", "Tuz paketlerinde", "Ocaklarda"], a: "Tıbbi atıklarda", difficulty: 'medium', hint: "Hastanelerin çöp poşetlerinde sıkça rastlanır.", explanation: "Virüs, bakteri veya doku kalıntıları enfeksiyon riski taşıdığı için biyolojik tehlike sınıfına girer." },
                { q: "Gözlük ve eldiven kullanımını mecburi kılan kural hangisidir?", options: ["Kişisel Koruyucu Donanım", "Laboratuvar Hijyeni", "Analiz Metodu", "Genel Temizlik"], a: "Kişisel Koruyucu Donanım", difficulty: 'easy', hint: "KKD olarak da kısaltılır.", explanation: "Laboratuvar çalışma yasalarında bu teçhizatlar Kişisel Koruyucu Donanım (KKD) olarak adlandırılır." },
                { q: "Cam balon ve erlenmayer arasındaki temel fark nedir?", options: ["Taban şekli", "Hacmi", "Rengi", "Malzemesi"], a: "Taban şekli", difficulty: 'medium', hint: "Balonun altı tıpkı bir küre gibidir.", explanation: "Cam balon yuvarlak bir tabana sahipken, erlenmayer masaya düz oturacak şekilde tasarlanmış konik tabanlıdır." },
                { q: "Titrasyon işlemlerinde kullanılan musluklu cam alet hangisidir?", options: ["Büret", "Pipet", "Mezur", "Beher"], a: "Büret", difficulty: 'medium', hint: "Uzun, dereceli ve alt tarafında musluğu vardır.", explanation: "Titrasyon analizlerinde sıvıları çok hassas ve harmanlayarak aktarmak için büret vazgeçilmezdir." },
                { q: "Hassas sıvı aktarımlarında kullanılan uzun alet hangisidir?", options: ["Pipet", "Huni", "Ayırma Hunisi", "Cam Çubuk"], a: "Pipet", difficulty: 'easy', hint: "Ucuna genelde puar takılır.", explanation: "Düşük hacimli sıvıları bir yerden bir yere çekerken kalibre edilmiş cam pipetler kullanılır." },
                { q: "Zeytinyağı ve suyu (iki sıvı) ayırmak için ne kullanılır?", options: ["Ayırma hunisi", "Süzgeç kağıdı", "Cam balon", "Havan"], a: "Ayırma hunisi", difficulty: 'hard', hint: "Armut şekilli, dibi musluklu cam bir araçtır.", explanation: "İki karışmayan (heterojen) yoğunluk farkı olan sıvılar ayırma hunisi kullanılarak birbirinden damla damla süzülerek ayrıştırılır." },
                { q: "Katı maddeleri laboratuvarda toz haline getirmek için ne kullanılır?", options: ["Havan", "Desikatör", "Kroze", "Saat camı"], a: "Havan", difficulty: 'medium', hint: "Sarımsak döveceğine de benzer.", explanation: "Maddeleri ezip yüzey alanını artırmak ve toz boyutuna ufalatmak için seramik laboratuvar havanı kullanılır." },
                { q: "Maddeleri nemsiz (kuru) ortamda saklamak için kullanılır?", options: ["Desikatör", "Etüv", "Bek alevi", "İspirto ocağı"], a: "Desikatör", difficulty: 'hard', hint: "Kalın duvarlı, altında kalsiyum klorür gibi nemsizleştiriciler olan tabaktır.", explanation: "Higroskopik (neme duyarlı) maddeleri güvenle korumak ve tartımdan önce soğutmak için cam kapaklı ve içi vakumlu silikajelli desikatör kullanılır." },

                // YENİ EKLENEN 30 GÜVENLİK SORUSU 
                { q: "Hangi alet sıvıların hacmini en az hassasiyetle -kaba- ölçer?", options: ["Beher", "Büret", "Pipet", "Balon Joje"], a: "Beher", difficulty: 'medium', hint: "Bardak formundadır.", explanation: "Beherler, hassas ölçümlerden ziyade çözelti karıştırma ve kaba hacimsel ölçümler için yapılmış geniş ağızlı kaplardır." },
                { q: "Puar ne işe yarar?", options: ["Pipete sıvı çekmeye", "Isıtmaya", "Kurutmaya", "Tartım almaya"], a: "Pipete sıvı çekmeye", difficulty: 'easy', hint: "Ağızla çekilmemesi gereken tehlikeli sıvılarda kullanılır.", explanation: "Laboratuvarda kimyasalların pipete güvenle, ağız temas etmeden dolmasını sağlayan kauçuk topaktır." },
                { q: "Laboratuvarda şişesi üzerinde 'Alevlenebilir' sembolü olan madde nasıl saklanmalıdır?", options: ["Isı kaynaklarından uzak", "Buzdolabında", "Güneş altında", "Masanın üstünde"], a: "Isı kaynaklarından uzak", difficulty: 'easy', hint: "Çünkü alev hızlıca bulaşabilir.", explanation: "Alevlenebilir (parlayıcı) kimyasallar kesinlikle bek, ısıtıcı veya kıvılcım kaynaklarının yanında olmamalıdır." },
                { q: "Güvenlik sembollerindeki sarı zemin üzerine siyah şekil neyi temsil eder?", options: ["Uyarı işaretleri", "Zorunluluk", "Yasak", "Güvenli durum"], a: "Uyarı işaretleri", difficulty: 'medium', hint: "Üçgen yapı genellikle bu sarı zemine sahiptir.", explanation: "ISO normlarına göre sarı zeminli siyah üçgen piktogramlar (işaretler) yaklaşan bir tehlike/uyarı durumunu belirtir." },
                { q: "Aşağıdakilerden hangisi laboratuvarda yapılmamalıdır?", options: ["Asit üzerine su dökmek", "Su üzerine asit dökmek", "Eldiven takmak", "Çeker ocak kullanmak"], a: "Asit üzerine su dökmek", difficulty: 'hard', hint: "Sıçrama riskine dikkat!", explanation: "Asidin üzerine su dökmek çok yüksek ısı açığa çıkarır ve kaynayarak suyun patlama şeklinde sıçramasına yol açar." },
                { q: "Çeker ocak (Fume Hood) hangi amaçla kullanılır?", options: ["Zehirli gazları uzaklaştırmak", "Malzeme tartmak", "Titrasyon yapmak", "Tüp dizmek"], a: "Zehirli gazları uzaklaştırmak", difficulty: 'medium', hint: "Aspiratör / havalandırma sistemidir.", explanation: "Deney sırasında çıkan zararlı, yanıcı veya zehirli gazları odaya yayılmadan sistem üzerinden dışarı fırlatan vakumlu kabindir." },
                { q: "Tüp pensi (maşa) ne zaman kullanılmalıdır?", options: ["Isıtma işlemleri sırasında", "Tartım sırasında", "Tüpün içini temizlerken", "Asit dökerken"], a: "Isıtma işlemleri sırasında", difficulty: 'easy', hint: "Tüpe elimizle dokunmamak için.", explanation: "Isıtılan ve el yakan deney tüpünü güvenli mesafeden tutmak ve alevden uzak kalmak için tüp pensi şarttır." },
                { q: "Santrifüj cihazı ne işe yarar?", options: ["Katı ve sivıyı çöktürerek ayırmaya", "Sıcaklık artırmaya", "Basıncı düzeltmeye", "Asitlik ölçmeye"], a: "Katı ve sivıyı çöktürerek ayırmaya", difficulty: 'medium', hint: "Yüksek devirde kendi ekseni etrafında döner.", explanation: "Sıvı ile katı süspansiyon karışımlarını merkezkaç kuvveti yardımıyla çok hızlı çöktürerek ayrıştıran motordur." },
                { q: "Deney tüpleri ısınırken tüpün açık ucu nereye bakmalıdır?", options: ["Kimsenin olmadığı yöne", "Kendi yüzümüze", "Öğretmene", "Duvara"], a: "Kimsenin olmadığı yöne", difficulty: 'easy', hint: "Kaynama anındaki sıçrama bir başkasına zarar verebilir.", explanation: "İçindeki sıvının patlaması ya da sert kaynaması (bumping) riskine karşı uç her zaman boşluğa (bireylerden uzağa) doğrultulmalıdır." },
                { q: "Spesifik bir hacimde(örneğin 250mL) standart çözelti hazırlamak için laboratuvarda ilk tercih edilecek araç?", options: ["Balon joje", "Beher", "Erlen", "Saat camı"], a: "Balon joje", difficulty: 'hard', hint: "Boyun kısmında tek bir net çizgi bulunur.", explanation: "Balon joje (Volumetrik şişe) üzerinde kesin ve tam olarak tek bir kalibrasyon çizgisi bulunan standart çözelti hazırlama kabıdır." },
                { q: "Laboratuvar bek alevinde mavi ve sarı alev farkı nedir?", options: ["Mavi daha sıcaktır", "Sarı daha sıcaktır", "Sarı oksijeni çoktur", "Fark yoktur"], a: "Mavi daha sıcaktır", difficulty: 'medium', hint: "Tam yanma olayı.", explanation: "Hava kapağı açıldığında gaz tam yanarak (is bırakmadan) mavi renk alır ve bu alev sarı olandan çok daha sıcaktır." },
                { q: "Kimyasal atıklar tepkime sonrası nereye dökülmelidir?", options: ["Atık şişelerine", "Lavaboya", "Çöpe", "Pencereden"], a: "Atık şişelerine", difficulty: 'easy', hint: "Maddelerin suya karışmasını önlemek gerekir.", explanation: "Kimyasal tepkimelerde oluşan asidik/bazik atıklar lavaboları eritmemesi ve doğayı bozmaması için özel atık varillerinde biriktirilir." },
                { q: "Kroze laboratuvarda ne amaçla kullanılır?", options: ["Kül tayini ve yüksek sıcaklık ısıtmalarında", "Sıvı hacmini ölçmede", "Gaz basını ölçmede", "Deney tüplerini dizmede"], a: "Kül tayini ve yüksek sıcaklık ısıtmalarında", difficulty: 'hard', hint: "Dayanıklı kaliteli bir fincana benzer.", explanation: "Krozeler yüksek sıcaklığa (1000 °C üzeri) dayanıklı porselen/metallerdir. Fırınlama (kurutma/kül tayini) gibi işlemlerde kullanılır." },
                { q: "Radyasyon uyarı sembolü (Yonca şeklinde) görüldüğünde aşağıdakilerden hangisi risk altındadır?", options: ["DNA yapısı", "Tırnaklar", "Sadece ses telleri", "Sadece el derisi"], a: "DNA yapısı", difficulty: 'medium', hint: "İyonlaştırıcı ışınlar doğrudan hücre çekirdeğine saldırır.", explanation: "Radyoaktif elementler ve radyasyon, iyonlaştırıcı gücü sayesinde direkt genetiği (DNA) bozarak mutasyon oluşturur." },
                { q: "Bir kimyasal göze sıçradığında ilk yapılması gereken şey nedir?", options: ["Göz duşunda en az 15 dk yıkamak", "Gözü ovuşturmak", "Krem sürmek", "Gözyaşıyla geçmesini beklemek"], a: "Göz duşunda en az 15 dk yıkamak", difficulty: 'easy', hint: "Asidi ya da bazı acilen uzaklaştırmak kritik.", explanation: "Kimyasal madde göze temas ettiğinde derhal özel göz yıkama duşuyla bol suyla uzun süre temizlenmelidir." },
                { q: "Baget (cam çubuk) ne için kullanılır?", options: ["Karıştırma işlemi", "Isı yansıtma", "Madde ezme", "Asıtlara karşı güvenlik"], a: "Karıştırma işlemi", difficulty: 'easy', hint: "Evdeki çay kaşığının görevini yapar.", explanation: "Asit/baz veya farklı kimyasallarla tepkimeye girmemesi için camdan yapılmış karıştırıcı, yönlendirici çubuktur." },
                { q: "Laboratuvarda bir çözeltiyi hızlı soğutmak için ne kullanılır?", options: ["Buz banyosu", "Desikatör", "Etüv", "Santrifüj"], a: "Buz banyosu", difficulty: 'medium', hint: "Dış kaba buz koyarak içindeki reaksiyon kabı oturtulur.", explanation: "Özellikle çok ekzotermik tepkimelerde reaksiyonun patlamsını önlemek için beher, su ve buz dolu bir başka kaba gömülür." },
                { q: "Turnusol kağıdının kırmızı renk vermesi neyi ifade eder?", options: ["Asidik ortamı", "Bazik ortamı", "Nötr ortamı", "Yanıcı maddeyi"], a: "Asidik ortamı", difficulty: 'easy', hint: "Anneler 'Asit kızartır, Baz morartır' der.", explanation: "Turnusol kağıdı indikatördür, pH değeri 7'nin altındaysa madde kırmızı, 7'nin üstündeyse mavi/mor renk alır." },
                { q: "Katı kimyasalları tartarken terazi kefesine kimyasal maddeden bağımsız olarak ne konur?", options: ["Saat camı / tartım kayığı", "Doğrudan kimyasal konur", "Süzgeç kağıdı", "Beher"], a: "Saat camı / tartım kayığı", difficulty: 'medium', hint: "Terazi plakasını korozyondan korumalıyız.", explanation: "Metaller asit ve nemle aşınmaması ve net kütle almak adına katılar daima ağırlığı tam bilinen (dara) bir materyalin üzerinde tartılır." },
                { q: "Bir asit dökülmesi durumunda onu temizlemek için nötralize etmek amacıyla ortama ne serpilmelidir?", options: ["Zayıf baz (Sodyum bikarbonat)", "Daha güçlü asit", "Alkol", "Zeytinyağı"], a: "Zayıf baz (Sodyum bikarbonat)", difficulty: 'hard', hint: "Karbonat tuzları bu iş için idealdir.", explanation: "Tehlike anında güçlü asidi yok etmek isterseniz (ve gaz çıkarmayan) hafif zayıf bir baz kullanırsınız, böylece ortam nötrleşir." },
                { q: "İspirto ocağını söndürmek için en doğru yöntem nedir?", options: ["Kapağını kapatıp havasız bırakmak", "Üfleyerek söndürmek", "Su dökmek", "Sallamak"], a: "Kapağını kapatıp havasız bırakmak", difficulty: 'easy', hint: "Ateşin oksijenini kesmek yeterlidir.", explanation: "Alkol/İspirto uçucu olduğu için üflemek alevi etrafa yayabilir; kendi kapağını hemen kapatarak havasızlıktan sönmesi en doğru yoldur." },
                { q: "Ph metre ile ölçüm yapıldıktan sonra prob neyin içine konulmalıdır?", options: ["Koruyucu sıvı (KCI) veya saf su", "Havanın içinde bırakmak", "Asitin içinde", "Cebin içine"], a: "Koruyucu sıvı (KCI) veya saf su", difficulty: 'medium', hint: "Prob başlığının kurumaması gerekir.", explanation: "pH metre cihazının ucundaki cam elektrot kuruduğunda kalibrasyon bozulur ve çatlar; bu yüzden tampon veya saklama çözeltisinde kalmalıdır." },
                { q: "Erime noktası tayini genellikle hangi cihaz ve tüp kullanılarak yapılır?", options: ["Kılcal tüp (Kapiler)", "Dereceli silindir", "Büyük havan", "Büret"], a: "Kılcal tüp (Kapiler)", difficulty: 'hard', hint: "Saç teli kadar ince cam çubuklardır.", explanation: "Az miktarda katı numune ince kılcal cam boruların (kapiler) içerisine alınarak erime termometre aleti/sıvı banyosunda incelenir." },
                { q: "Tuz ruhu ile çamaşır suyunun (birlikte) karıştırılması neden yasaktır?", options: ["Zehirli Klor gazı açığa çıkarır", "Patlama olur", "Alev alır", "Etkileri yok olur"], a: "Zehirli Klor gazı açığa çıkarır", difficulty: 'medium', hint: "İkisi tepkimeye girip havayı genzinizi yakan bir kokuya çevirir.", explanation: "HCl ve NaClO etkileştiğinde (mide bulantısı ve akciğer hasarı yapan) solunmamamsı gereken zehirli Cl2 gazı çıkışı olmaktdır." },
                { q: "Geri soğutucu (Kondenser) genellikle nerede kullanılır?", options: ["Damıtma sistemlerinde", "Ağırlık ölçme sistemlerinde", "Basınç ölçme sistemlerinde", "Kan alma işlemlerinde"], a: "Damıtma sistemlerinde", difficulty: 'medium', hint: "Buharı sıvıya dönüştürür.", explanation: "Geri soğutucu dış ceketinde suyun dolaştığı; distilasyonda yukarı fırlayan gazları soğutup dışarıya tekrar saf sıvı damlatmasını sağlayan tüptür." },
                { q: "Laboratuvarda kıyafet seçimi nasıl olmalıdır?", options: ["Tam kapalı kıyafet ve düz ayakkabı", "Şort ve terlik", "Sadece kışın ceket", "Kravatlı"], a: "Tam kapalı kıyafet ve düz ayakkabı", difficulty: 'easy', hint: "Ciltle maddenin teması minimal olmalıdır.", explanation: "Kimyasal sıçramalar düşünülerek açık ayakla ve kısa giysiyle laba girmek uluslararası standartlara aykırıdır." },
                { q: "Eğer vücudunuza yüksek miktarda bir kimyasal sıçrarsa hangi donanım kullanılır?", options: ["Acil vücut duşu", "Çeşme", "Göz duşu", "Peçete"], a: "Acil vücut duşu", difficulty: 'easy', hint: "Yukarıdan suları tepeden bırakan sistem.", explanation: "Tüm kimya lablarında tehlike sâniyesinde hızlıca kordonu çekilen bol sulu vücut/güvenlik duşu bulunur." },
                { q: "Spatül kullanılırken nelere dikkat edilmelidir?", options: ["Temiz ve kuru olmalıdır", "Asitle yıkanmalıdır", "Islak bırakılmalıdır", "Birkaç maddeyle aynı anda alınmalıdır"], a: "Temiz ve kuru olmalıdır", difficulty: 'medium', hint: "Bir maddenin diğer kavanoza bulaşmasını istemeyiz.", explanation: "Spatüller arası çapraz kontaminasyon dediğimiz yabancı madde bulaşmasını engellemek için her madde geçişinde iyice temizlenmelidir." },
                { q: "Bir deneyde asit veya bazın cilde teması halinde cildiniz nasıl hisseder?", options: ["Yanma ve kayganlık", "Sadece ıslaklık", "Üşüme", "Uyşma"], a: "Yanma ve kayganlık", difficulty: 'medium', hint: "Özellikle sabun gibi bazlar kaygan yapar.", explanation: "Maddenin korozif doğasından dolayı asit yakıcı ve delici sızlama; bazik maddeler ise protein tahribinden kayganlık ve yıpranma yapar." },
                { q: "Laboratuvarda yalnız çalışmak niçin tavsiye edilmez?", options: ["Acil bir kaza anında müdahale edecek kimse olmaması", "Sıkıcı olması", "Maddeleri taşıyamamak", "Sıcaklığı ölçecek ikincil kişi"], a: "Acil bir kaza anında müdahale edecek kimse olmaması", difficulty: 'easy', hint: "Bilinç kaybı riski yaşanırsa yardım çağrılamaz.", explanation: "Güvenlik standartlarına (GLP) göre acil durumlar, yaralanma ve solunum problemlerine en hızlı tepki için yalnız çalışma tehlikelidir." }
            ]
        },
        {
            id: 'modern_atom',
            name: 'MODERN ATOM TEORİSİ',
            desc: 'Kuantum modeli, orbitaller ve periyodik sistem.',
            content: `Modern atom teorisi (Kuantum Modeli), elektronun yerinin tam olarak belirlenemeyeceğini, sadece bulunma olasılığının yüksek olduğu bölgeler (orbitaller) olduğunu savunur.
            • <b>Baş kuantum sayısı (n):</b> Enerji düzeyini belirtir.
            • <b>Açısal momentum kuantum sayısı (l):</b> Orbitalin şeklini belirtir (s:0, p:1, d:2, f:3).
            • <b>Elektron Dizilimi İstisnaları:</b> 24Cr ([Ar] 4s1 3d5) ve 29Cu ([Ar] 4s1 3d10) küresel simetri nedeni ile istisnadır.`,
            questions: [
                { q: "Elektronlerin bulunma olasılığının yüksek olduğu bölgelere ne denir?", options: ["Yörünge", "Orbital", "Çekirdek", "Katman"], a: "Orbital", difficulty: 'easy' },
                { q: "l=1 kuantum sayısı hangi orbital türünü temsil eder?", options: ["s", "p", "d", "f"], a: "p", difficulty: 'easy' },
                { q: "24Cr atomunun elektron dizilimi aşağıdakilerden hangisidir?", options: ["[Ar] 4s2 3d4", "[Ar] 4s1 3d5", "[Ar] 4s0 3d6", "[Ne] 3s2 3p6"], a: "[Ar] 4s1 3d5", difficulty: 'hard' },
                { q: "Pauli dışlama ilkesine göre bir orbitalde en fazla kaç elektron bulunabilir?", options: ["1", "2", "6", "10"], a: "2", difficulty: 'easy' },
                { q: "d orbitali en fazla kaç elektron alabilir?", options: ["2", "6", "10", "14"], a: "10", difficulty: 'medium' },
                { q: "H2SO4 bileşiğinde Kükürt (S) atomunun yükseltgenme basamağı nedir?", options: ["+2", "+4", "+6", "-2"], a: "+6", difficulty: 'medium' },
                { q: "29Cu atomunun elektron diziliminde l=0 olan kaç elektron vardır?", options: ["6", "7", "8", "9"], a: "7", difficulty: 'hard' },
                { q: "4d orbitali için baş kuantum sayısı (n) ve orbital şekli (l) nedir?", options: ["n=4, l=2", "n=4, l=1", "n=3, l=2", "n=5, l=0"], a: "n=4, l=2", difficulty: 'medium' },
                { q: "Bir orbitalde n=3 ve l=1 ise bu orbital hangisidir?", options: ["3s", "3p", "3d", "2p"], a: "3p", difficulty: 'easy' },
                { q: "KMnO4 bileşiğinde Mn elementinin yükseltgenme basamağı?", options: ["+5", "+6", "+7", "+2"], a: "+7", difficulty: 'hard' },
                { q: "Heisenberg Belirsizlik İlkesi neyi savunur?", options: ["Konum ve hız aynı anda bilinemez", "Orbitalleri", "Proton sayısını", "Atom kütlesini"], a: "Konum ve hız aynı anda bilinemez", difficulty: 'medium' },
                { q: "Manyetik kuantum sayısı (ml) l=2 için hangi değerleri alabilir?", options: ["0, 1", "-1, 0, 1", "-2'den +2'ye kadar", "Sadece 0"], a: "-2'den +2'ye kadar", difficulty: 'medium' },
                { q: "Spin kuantum sayısı (ms) hangi değerleri alabilir?", options: ["0, 1", "+1/2, -1/2", "1, 2, 3", "-l, +l"], a: "+1/2, -1/2", difficulty: 'easy' },
                { q: "Hund Kuralı aşağıdakilerden hangisi ile ilgilidir?", options: ["Orbitallere önce teker teker yerleşme", "Baş kuantum sayısı", "Işık hızı", "Atom çapı"], a: "Orbitallere önce teker teker yerleşme", difficulty: 'medium' },
                { q: "4s orbitalinin enerjisi 3d orbitalinden neden daha düşüktür?", options: ["n+l değeri daha düşük olduğu için", "Daha büyük olduğu için", "Daha çok elektron aldığı için", "Çekirdeğe uzak olduğu için"], a: "n+l değeri daha düşük olduğu için", difficulty: 'hard' },
                { q: "Periyodik sistemde aynı grupta yukarıdan aşağıya inildikçe çap nasıl değişir?", options: ["Artar", "Azalır", "Değişmez", "Önce artar sonra azalır"], a: "Artar", difficulty: 'easy' },
                { q: "Elektronegatifliği en yüksek olan element hangisidir?", options: ["F (Flor)", "O (Oksijen)", "Fr (Fransiyum)", "Cs (Sezyum)"], a: "F (Flor)", difficulty: 'easy' },
                { q: "Gaz halindeki bir atomdan elektron koparmak için gereken enerjiye ne denir?", options: ["İyonlaşma enerjisi", "Elektron ilgisi", "Elektronegatiflik", "Bağ enerjisi"], a: "İyonlaşma enerjisi", difficulty: 'medium' },
                { q: "Periyodik tabloda 3. periyot 5A grubunda bulunan atomun proton sayısı?", options: ["13", "15", "17", "11"], a: "15", difficulty: 'hard' },
                { q: "Geçiş metalleri (B grupları) hangi orbitallerle biter?", options: ["s veya p", "d", "f", "Sadece s"], a: "d", difficulty: 'medium' }
            ]
        },
        {
            id: 'gazlar',
            name: 'GAZLAR',
            desc: 'Gaz yasaları, ideal gas denklemi ve kinetik teori.',
            content: `Gazların davranışlarını açıklayan temel yasalar ve kavramlar:
            • <b>İdeal Gaz Denklemi:</b> P.V = n.R.T
            • <b>Kinetik Teori:</b> Gazların hızı sıcaklığın kareköküyle doğru, mol kütlesinin kareköküyle ters orantılıdır (V1/V2 = √(M2/M1) * √(T1/T2)).`,
            questions: [
                                { q: "Avogadro Yasasına göre aynı koşullarda eşit hacimli gazların nesi eşittir?", options: ["Kütleleri", "Molekül sayıları", "Yoğunlukları", "Hızları"], a: "Molekül sayıları", difficulty: 'medium' },
                { q: "Gazların yayılma hızı (difüzyon) sıcaklıkla nasıl değişir?", options: ["Kareköküyle doğru orantılı", "Doğru orantılı", "Ters orantılı", "Etkilemez"], a: "Kareköküyle doğru orantılı", difficulty: 'hard' },
                { q: "Mutlak sıfır noktası kaç Kelvin'dir?", options: ["0 K", "273 K", "-273 K", "100 K"], a: "0 K", difficulty: 'easy' },
                { q: "Gay-Lussac Yasası hangi değişkenleri sabit hacimde inceler?", options: ["Basınç-Sıcaklık", "Hacim-Miktar", "Basınç-Hacim", "Miktar-Sıcaklık"], a: "Basınç-Sıcaklık", difficulty: 'medium' },
                { q: "Basınç birimi olan 1 atm kaç cmHg değerine eşittir?", options: ["76", "100", "760", "1.013"], a: "76", difficulty: 'easy' },
                { q: "Gerçek gazların sıvılaşabildiği en yüksek sıcaklığa ne denir?", options: ["Kritik sıcaklık", "Yüzleşme sıcaklığı", "Kaynama noktası", "Donma noktası"], a: "Kritik sıcaklık", difficulty: 'hard' },
                { q: "Joule-Thomson olayı nedir?", options: ["Gazların genişlerken soğuması", "Gazların yanması", "Gazların karışması", "Gazların iyonlaşması"], a: "Gazların genişlerken soğuması", difficulty: 'hard' },
                { q: "Sabit hacimli bir kapta sıcaklık 2 katına (Kelvin) çıkarsa basınç nasıl değişir?", options: ["2 katına çıkar", "Yarıya iner", "4 katına çıkar", "Değişmez"], a: "2 katına çıkar", difficulty: 'medium' },
                { q: "H2 gazının (MA:2) hızı O2 gazının (MA:32) hızının kaç katıdır?", options: ["4", "16", "2", "8"], a: "4", difficulty: 'hard' },
                { q: "Kısmi basınç hesabı yapılırken hangisinden yararlanılır?", options: ["Mol kesri", "Mol kütlesi", "Hacim", "Sıcaklık"], a: "Mol kesri", difficulty: 'medium' },
                { q: "Hava bir gaz karışımıdır. Havadaki en bol gaz hangisidir?", options: ["Azot (N2)", "Oksijen (O2)", "Argon", "CO2"], a: "Azot (N2)", difficulty: 'easy' }
            ]
        },
        {
            id: 'cozeltiler',
            name: 'SIVI ÇÖZELTİLER VE ÇÖZÜNÜRLÜK',
            desc: 'Derişim birimleri, sulu çözelti hazırlama, koligatif özellikler ve çözünürlük.',
            content: `Çözeltiler, çözücü ve çözünenden oluşan homojen karışımlardır.
            • <b>Derişim Birimleri:</b> Molarite (n/V), Molalite (n/kg), ppm, Mol Kesri ve Kütlece/Hacimce yüzde.
            • <b>Koligatif Özellikler:</b> Tanecik derişimine bağlı basınç düşmesi, kaynama noktası yükselmesi (Ebülyoskopi) ve donma noktası alçalması (Kriyoskopi).
            • <b>Çözünürlük:</b> Belirli sıcaklık ve basınçta, 100 gram çözücüde çözünebilen maksimum madde miktarıdır. Sıcaklık, basınç ve ortak iyon çözünürlüğe etki eder.`,
            questions: [
                { q: "1 molar 500 mL çözelti hazırlamak için kaç mol madde gerekir?", options: ["0.5 mol", "1 mol", "5 mol", "10 mol"], a: "0.5 mol", difficulty: 'easy' },
                { q: "Sıcaklık artışı genellikle hangi maddelerin sudaki çözünürlüğünü azaltır?", options: ["Tuzlar", "Şekerler", "Gazlar", "Metaller"], a: "Gazlar", difficulty: 'easy' },
                { q: "Aşağıdakilerden hangisi bir derişim birimi değildir?", options: ["Molarite", "Molalite", "ppm", "Litre"], a: "Litre", difficulty: 'easy' },
                { q: "100 gram suda 18 gram glikoz (C6H12O6:180) çözülürse çözelti kaç molal olur?", options: ["1 molal", "0.1 molal", "0.5 molal", "2 molal"], a: "1 molal", difficulty: 'hard' },
                { q: "Donma noktası alçalması hangisine bağlıdır?", options: ["Tanecik derişimine", "Kabın hacmine", "Maddenin rengine", "Çözeltinin kütlesine"], a: "Tanecik derişimine", difficulty: 'medium' },
                { q: "Ters Ozmoz sistemi en çok hangi alanda kullanılır?", options: ["Deniz suyundan tatlı su elde etme", "Metal parlatma", "Isı yalıtımı", "Tekstil boyama"], a: "Deniz suyundan tatlı su elde etme", difficulty: 'hard' },
                { q: "Kütlece %20'lik 200 gram tuzlu suya 300 gram saf su eklenirse yeni yüzde kaç olur?", options: ["%8", "%10", "%12", "%15"], a: "%8", difficulty: 'hard' },
                { q: "Polar maddeler polar çözücülerde iyi çözünür kuralına ne denir?", options: ["Benzer benzeri çözer", "Dalton Yasası", "Henry Yasası", "Raoult Yasası"], a: "Benzer benzeri çözer", difficulty: 'medium' },
                { q: "Hangi karışım türünde tanecik boyutu 1 nm'den küçüktür?", options: ["Çözelti", "Kolloit", "Süspansiyon", "Emülsiyon"], a: "Çözelti", difficulty: 'medium' },
                { q: "Kandaki hemoglobin miktarını belirtmek için genellikle hangi birim kullanılır?", options: ["ppm", "Molarite", "Molalite", "Hacimce %"], a: "ppm", difficulty: 'medium' },
                { q: "500 gram suda 40 gram NaOH (MA:40) çözülürse molalite ne olur?", options: ["2 m", "1 m", "0.5 m", "4 m"], a: "2 m", difficulty: 'hard' },
                { q: "ppm biriminin açılımı nedir?", options: ["Parts per million", "Percentage per mass", "Potential per molar", "Parts per meter"], a: "Parts per million", difficulty: 'easy' },
                { q: "Deniz seviyesinde tuzlu suyun kaynamaya başlama sıcaklığı nasıldır?", options: ["100°C'den büyüktür", "100°C'dir", "100°C'den küçüktür", "0°C'dir"], a: "100°C'den büyüktür", difficulty: 'easy' },
                { q: "Buzlu yollara tuz dökülmesinin sebebi nedir?", options: ["Donma noktasını düşürmek", "Kaynama noktası yükseltmek", "Buzu eriterek ısıtmak", "Yolu parlatmak"], a: "Donma noktasını düşürmek", difficulty: 'easy' },
                { q: "Yarı geçirgen zar aracılığıyla çözücünün az yoğundan çok yoğuna geçişine ne denir?", options: ["Osmoz", "Difüzyon", "Elektroliz", "Hidroliz"], a: "Osmoz", difficulty: 'medium' },
                { q: "Doymuş bir çözeltiye aynı sıcaklıkta bir miktar daha çözücü eklenirse ne olur?", options: ["Doymamış hale gelir", "Aşırı doymuş olur", "Çözünürlük artar", "Çözünürlük azalır"], a: "Doymamış hale gelir", difficulty: 'medium' },
                { q: "Gazların sudaki çözünürlüğü basınç artışıyla nasıl değişir?", options: ["Artar", "Azalır", "Değişmez", "Önce artar sonra azalır"], a: "Artar", difficulty: 'easy' },
                { q: "Mol kesri (X) toplamı bir karışımda kaça eşittir?", options: ["1", "0", "100", "Bilinemez"], a: "1", difficulty: 'medium' },
                { q: "Alkollü su (kolonya) hangi tip çözeltiye örnektir?", options: ["Sıvı-Sıvı", "Katı-Sıvı", "Gaz-Sıvı", "Katı-Katı"], a: "Sıvı-Sıvı", difficulty: 'easy' },
                { q: "Hidrasyon nedir?", options: ["Çözünenin su molekülleriyle sarılması", "Suyun buharlaşması", "Maddenin yanması", "Tuzun kristalleşmesi"], a: "Çözünenin su molekülleriyle sarılması", difficulty: 'hard' }
            ]
        },
        {
            id: 'enerji',
            name: 'KİMYASAL TEPKİMELERDE ENERJİ',
            desc: 'Tepkime ısıları, entalpi, oluşum entalpisi ve Hess yasası.',
            content: `Kimyasal tepkimeler sırasında meydana gelen enerji değişimlerini inceler.
            • <b>Ekzotermik Tepkimeler:</b> Dışarıya ısı veren tepkimelerdir (ΔH < 0). Yanma tepkimeleri (N2 hariç) örnektir.
            • <b>Endotermik Tepkimeler:</b> Dışarıdan ısı alan tepkimelerdir (ΔH > 0). Analiz tepkimeleri ve bağ kırılması örnektir.
            • <b>Hess Yasası:</b> Bir tepkimenin entalpi değişimi, tepkimenin izlediği yola bağlı değildir; ara basamakların toplamına eşittir.`,
            questions: [
                { q: "Aşağıdakilerden hangisi daima ekzotermiktir?", options: ["Bağ oluşumu", "Bağ kırılması", "Elektroliz", "Buharlaşma"], a: "Bağ oluşumu", difficulty: 'easy' },
                { q: "ΔH değeri negatif (-) olan tepkimelere ne ad verilir?", options: ["Endotermik", "Ekzotermik", "İzotermik", "Katalitik"], a: "Ekzotermik", difficulty: 'easy' },
                { q: "Elementlerin standart koşullarda en kararlı hallerinin oluşum entalpisi kaçtır?", options: ["1", "0", "-1", "100"], a: "0", difficulty: 'medium' },
                { q: "Hess Yasası neyi ifade eder?", options: ["Tepkime hızını", "Enerjinin korunumunu", "Gaz yasalarını", "Denge sabitini"], a: "Enerjinin korunumunu", difficulty: 'medium' },
                { q: "Bir bileşiğin elementlerinden oluştuğu tepkimenin ısısına ne denir?", options: ["Oluşum entalpisi", "Yanma ısısı", "Nötürleşme ısısı", "Bağ enerjisi"], a: "Oluşum entalpisi", difficulty: 'easy' },
                { q: "Isı kapasitesi neye bağlıdır?", options: ["Madde miktarına", "Sıcaklığa", "Basınca", "Hacme"], a: "Madde miktarına", difficulty: 'hard' },
                { q: "Fotosentez tepkimesi enerji bakımından nasıldır?", options: ["Endotermik", "Ekzotermik", "Yalıtılmış", "Nötr"], a: "Endotermik", difficulty: 'medium' },
                { q: "Azot gazının (N2) yanması diğer yanmalardan farklı olarak nasıldır?", options: ["Endotermik", "Ekzotermik", "Patlayıcı", "Yavaş"], a: "Endotermik", difficulty: 'medium' },
                { q: "Kırağılaşma (Gaz → Katı) olayı enerji bakımından nasıldır?", options: ["Ekzotermik", "Endotermik", "Hücresel", "Fiziksel değil"], a: "Ekzotermik", difficulty: 'easy' },
                { q: "Ürünlerin enerjisi girenlerden düşükse tepkime nasıldır?", options: ["Ekzotermik", "Endotermik", "Dengede", "Belirsiz"], a: "Ekzotermik", difficulty: 'medium' },
                { q: "Standart şartlar (entalpi için) hangi değerleri ifade eder?", options: ["25°C, 1 atm", "0°C, 1 atm", "25°C, 0 atm", "100°C, 1 atm"], a: "25°C, 1 atm", difficulty: 'easy' },
                { q: "Entalpi değişimi (ΔH) neye eşittir?", options: ["H_ürün - H_giren", "H_giren - H_ürün", "H_ürün + H_giren", "H_ürün / H_giren"], a: "H_ürün - H_giren", difficulty: 'medium' },
                { q: "Bir tepkime ters çevrilirse ΔH değeri nasıl değişir?", options: ["İşareti değişir", "Değişmez", "Sıfır olur", "İki katına çıkar"], a: "İşareti değişir", difficulty: 'medium' },
                { q: "Bağ enerjisi arttıkça bağın sağlamlığı nasıl değişir?", options: ["Artar", "Azalır", "Değişmez", "Kısalır"], a: "Artar", difficulty: 'easy' },
                { q: "Kalorimetre kabı neyi ölçmek için kullanılır?", options: ["Tepkime ısısını", "Basıncı", "Hacmi", "Işık hızını"], a: "Tepkime ısısını", difficulty: 'easy' },
                { q: "Kömürün yanması sırasında açığa çıkan enerjiye ne denir?", options: ["Yanma entalpisi", "Oluşum entalpisi", "Erime ısısı", "İyonlaşma enerjisi"], a: "Yanma entalpisi", difficulty: 'easy' },
                { q: "H2(g) + 1/2 O2(g) → H2O(s) tepkimesinin ΔH'ı neyi verir?", options: ["H2O'nun oluşum entalpisi", "H2'nin yanma ısısı", "Her ikisi de", "Hiçbiri"], a: "Her ikisi de", difficulty: 'hard' },
                { q: "Nötrleşme tepkimeleri (Asit + Baz) genellikle nasıldır?", options: ["Ekzotermik", "Endotermik", "Yavaş", "Enerjisiz"], a: "Ekzotermik", difficulty: 'medium' },
                { q: "Atomların gaz halinde birleşerek bağ oluşturması nasıldır?", options: ["Ekzotermik", "Endotermik", "Kararsız", "İzole"], a: "Ekzotermik", difficulty: 'hard' },
                { q: "Buharlaşma entalpisi hangi hal değişimi içindir?", options: ["Sıvı → Gaz", "Katı → Sıvı", "Gaz → Sıvı", "Sıvı → Katı"], a: "Sıvı → Gaz", difficulty: 'easy' }
            ]
        },
        {
            id: 'hiz',
            name: 'KİMYASAL TEPKİMELERDE HIZ',
            desc: 'Çarpışma teorisi, aktifleşme enerjisi ve hıza etki eden faktörler.',
            content: `Birim zamanda harcanan veya oluşan madde miktarıdır.
            • <b>Çarpışma Teorisi:</b> Tepkimenin gerçekleşmesi için taneciklerin uygun geometride ve yeterli enerjide (eşik enerjisi) çarpışması gerekir.
            • <b>Hıza Etki Edenler:</b> Derişim artışı çarpışma sayısını artırır. Sıcaklık artışı hem çarpışma sayısını hem de enerjisini artırır. Katalizör ise eşik enerjisini düşürerek hızı artırır.`,
            questions: [
                { q: "Hangisi bir tepkimenin eşik enerjisini (Aktifleşme enerjisi) değiştirir?", options: ["Sıcaklık", "Katalizör", "Derişim", "Temas yüzeyi"], a: "Katalizör", difficulty: 'medium' },
                { q: "Sıcaklık artışı tepkime hızını nasıl etkiler?", options: ["Daima artırır", "Daima azaltır", "Etkilemez", "Sadece endotermiklerde artırır"], a: "Daima artırır", difficulty: 'easy' },
                { q: "Hız ifadesi (r = k.[A]) olan bir tepkimenin derecesi kaçtır?", options: ["0", "1", "2", "3"], a: "1", difficulty: 'easy' },
                { q: "Heterojen bir tepkimede katı haldeki maddenin temas yüzeyi artırılırsa hangisi değişmez?", options: ["Hız sabiti (k)", "Hız", "Eşik enerjisi", "Birim zamandaki çarpışma sayısı"], a: "Eşik enerjisi", difficulty: 'hard' },
                { q: "Aktifleşmiş kompleks nedir?", options: ["En düşük enerjili hal", "Kararsız ara yapı", "Ürün", "Giren madde"], a: "Kararsız ara yapı", difficulty: 'medium' },
                { q: "İnhibitör nedir?", options: ["Hızı azaltan katalizör", "Hızı artıran madde", "Ürün", "Basınç ölçer"], a: "Hızı azaltan katalizör", difficulty: 'medium' },
                { q: "Ortalama hız nasıl hesaplanır?", options: ["Derişim değişimi / Zaman", "Hacim / Sıcaklık", "Mol / Basınç", "Basınç / Zaman"], a: "Derişim değişimi / Zaman", difficulty: 'easy' },
                { q: "Hangisi hız sabiti 'k' değerini etkiler?", options: ["Sıcaklık", "Katalizör", "Temas yüzeyi", "Hepsi"], a: "Hepsi", difficulty: 'medium' },
                { q: "Tepkime mekanizması neyi gösterir?", options: ["Tepkimenin ara basamaklarını", "Hızını", "Verimini", "Sıcaklığını"], a: "Tepkimenin ara basamaklarını", difficulty: 'hard' },
                { q: "Mekanizmalı tepkimelerde hızı hangi basamak belirler?", options: ["En yavaş basamak", "En hızlı basamak", "İlk basamak", "Son basamak"], a: "En yavaş basamak", difficulty: 'hard' },
                { q: "Molekülerite nedir?", options: ["Net tepkimedeki katsayılar toplamı", "Hız ifadesindeki üsler", "Atom sayısı", "Hacim"], a: "Net tepkimedeki katsayılar toplamı", difficulty: 'hard' },
                { q: "Hız sabiti k'nın birimi neye bağlıdır?", options: ["Tepkimenin derecesine", "Sıcaklığa", "Hacme", "Kaba"], a: "Tepkimenin derecesine", difficulty: 'medium' },
                { q: "Katalizör ΔH değerini nasıl etkiler?", options: ["Etkilemez", "Artırır", "Azaltır", "Sıfırlar"], a: "Etkilemez", difficulty: 'medium' },
                { q: "Buzdolabına konan besinlerin geç bozulması ne ile ilgilidir?", options: ["Düşük sıcaklık-düşük hız", "Yüksek basınç", "Işık azlığı", "Nem"], a: "Düşük sıcaklık-düşük hız", difficulty: 'easy' },
                { q: "Hız ifadesine hangileri yazılmaz?", options: ["Saf katılar ve sıvılar", "Gazlar", "Sulu çözeltiler", "İyonlar"], a: "Saf katılar ve sıvılar", difficulty: 'medium' },
                { q: "Homojen katalizör nedir?", options: ["Tepkimeyle aynı fazda olan", "Farklı fazda olan", "Katı olan", "Sıvı olan"], a: "Tepkimeyle aynı fazda olan", difficulty: 'medium' },
                { q: "Aktifleşme enerjisinin birimi genellikle nedir?", options: ["kJ/mol", "L/mol", "atm", "Kelvin"], a: "kJ/mol", difficulty: 'easy' },
                { q: "Potansiyel enerji diyagramında tepe noktası neyi temsil eder?", options: ["Aktifleşmiş kompleks", "Girenler", "Ürünler", "Katalizör"], a: "Aktifleşmiş kompleks", difficulty: 'easy' },
                { q: "Hız ifadesi r = k.[A]^2.[B] olan tepkime A'ya göre kaçıncı derecedendir?", options: ["2", "1", "3", "0"], a: "2", difficulty: 'easy' },
                { q: "Toz şekerin küp şekerden hızlı çözünmesi ne ile açıklanır?", options: ["Temas yüzeyi", "Sıcaklık", "Katalizör", "Derişim"], a: "Temas yüzeyi", difficulty: 'easy' }
            ]
        },
        {
            id: 'denge',
            name: 'KİMYASAL TEPKİMELERDE DENGE',
            desc: 'Kimyasal denge, Le Chatelier ilkesi ve sulu çözelti dengeleri (pH/pOH).',
            content: `Kapalı bir sistemde ileri ve geri yöndeki tepkime hızlarının eşitlendiği haldir.
            • <b>Le Chatelier İlkesi:</b> Denge halindeki bir sisteme dışarıdan bir etki yapılırsa, sistem bu etkiyi azaltacak yöne kayar.
            • <b>Asit-Baz Dengesi:</b> pH = -log[H+]. Saf suda 25°C'de pH + pOH = 14'tür. 
            • <b>Tampon Çözeltiler:</b> Küçük miktarlarda asit/baz eklendiğinde pH değişimine direnç gösteren çözeltilerdir.`,
            questions: [
                { q: "25°C'de pH değeri 3 olan bir çözeltinin pOH değeri kaçtır?", options: ["3", "7", "11", "14"], a: "11", difficulty: 'easy' },
                { q: "Denge sabitini (Kc) değiştiren tek faktör hangisidir?", options: ["Derişim", "Hacim", "Sıcaklık", "Katalizör"], a: "Sıcaklık", difficulty: 'medium' },
                { q: "Hangisi dengeyi ürünler yönüne kaydırır (A + B ⇌ C + Isı)?", options: ["Sıcaklığı artırmak", "Sıcaklığı azaltmak", "C eklemek", "Katalizör eklemek"], a: "Sıcaklığı azaltmak", difficulty: 'medium' },
                { q: "Zayıf bir asit ile bu asidin eşlenik bazını içeren çözeltiye ne denir?", options: ["Doymuş çözelti", "Titrasyon", "Tampon çözelti", "İdeal çözelti"], a: "Tampon çözelti", difficulty: 'hard' },
                { q: "Saf suyun oda sıcaklığındaki iyonlaşma sabiti (Ksu) kaçtır?", options: ["10^-7", "10^-14", "1", "14"], a: "10^-14", difficulty: 'easy' },
                { q: "Bronsted-Lowry asit-baz tanımına göre proton (H+) veren madde nedir?", options: ["Asit", "Baz", "Tuz", "Nötr"], a: "Asit", difficulty: 'easy' },
                { q: "Maksimum düzensizlik ve minimum enerji eğilimi uzlaştığında ne oluşur?", options: ["Denge", "Patlama", "Çözünme", "Donma"], a: "Denge", difficulty: 'medium' },
                { q: "Hangi maddeler denge bağıntısına (Kc) yazılmaz?", options: ["Saf katılar ve sıvılar", "Gazlar", "Sulu çözeltiler", "İyonlar"], a: "Saf katılar ve sıvılar", difficulty: 'easy' },
                { q: "Kp ve Kc arasındaki ilişki bağıntısı nedir?", options: ["Kp = Kc.(RT)^Δn", "Kp = Kc / RT", "Kp = Kc + RT", "Kc = Kp.RT"], a: "Kp = Kc.(RT)^Δn", difficulty: 'hard' },
                { q: "Denge tepkimesine katalizör eklenirse ne olur?", options: ["Denge hızlanır ama yeri değişmez", "Denge sağa kayar", "Kc büyür", "Kc küçülür"], a: "Denge hızlanır ama yeri değişmez", difficulty: 'medium' },
                { q: "Hacim azaltılırsa gaz fazındaki denge hangi yöne kayar?", options: ["Mol sayısının az olduğu yöne", "Molün çok olduğu yöne", "Değişmez", "Ürünlere"], a: "Mol sayısının az olduğu yöne", difficulty: 'hard' },
                { q: "Amfoter madde nedir?", options: ["Hem asit hem baz gibi davranan", "Sadece asit olan", "Sadece baz olan", "Nötr olan"], a: "Hem asit hem baz gibi davranan", difficulty: 'medium' },
                { q: "Kuvvetli bir asit ile zayıf bir bazın tepkimesinden oluşan tuz nasıldır?", options: ["Asidik", "Bazik", "Nötr", "İyonik değil"], a: "Asidik", difficulty: 'medium' },
                { q: "Titrasyonda renk değişiminin olduğu noktaya ne denir?", options: ["Eşdeğerlik noktası", "Başlangıç", "Doygunluk", " donma noktası"], a: "Eşdeğerlik noktası", difficulty: 'easy' },
                { q: "KÇÇ (Çözünürlük Çarpımı) hangi maddeler için kullanılır?", options: ["Az çözünen tuzlar", "Çok çözünen tuzlar", "Gazlar", "Sıvılar"], a: "Az çözünen tuzlar", difficulty: 'medium' },
                { q: "Ortak iyon etkisi çözünürlüğü nasıl etkiler?", options: ["Azaltır", "Artırır", "Etkilemez", "Sıfırlar"], a: "Azaltır", difficulty: 'hard' },
                { q: "Oto-iyonizasyon nedir?", options: ["Suyun kendi kendine iyonlaşması", "Maddenin yanması", "Tuzun erimesi", "Gazın sıvılaşması"], a: "Suyun kendi kendine iyonlaşması", difficulty: 'medium' },
                { q: "pH değeri 7'den küçük olan çözeltiler nasıldır?", options: ["Asidik", "Bazik", "Nötr", "Tuzlu"], a: "Asidik", difficulty: 'easy' },
                { q: "Konjuge (eşlenik) asit-baz çifti arasında kaç H farlı vardır?", options: ["1", "2", "3", "0"], a: "1", difficulty: 'hard' },
                { q: "Dengede ileri hız sabiti (ki) ve geri hız sabiti (kg) oranı neyi verir?", options: ["Kc", "Kp", "k", "ΔH"], a: "Kc", difficulty: 'medium' }
            ]
        }
    ]
};


const utils = {
    getRandomItem: (arr) => arr[Math.floor(Math.random() * arr.length)],
    shuffleArray: (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },
    getWrongAnswers: (correct, count, type) => {
        const pool = KIMYALAB_DATA[type] || KIMYALAB_DATA.elements;
        // Cevap türünü (Sembol mü İsim mi) girdi üzerinden tespit et
        const isSymbol = pool.some(e => (e.s || e.symbol) === correct);
        
        // SADECE aynı kategoriden veya benzer uzunlukta şıklar seçerek "Sızmayı" (Farklılığı) engelle
        const filtered = pool.filter(e => {
            const sym = e.s || e.symbol;
            const name = e.name || (typeof e.n === 'string' ? e.n : null);
            return sym !== correct && name !== correct;
        });

        return utils.shuffleArray(filtered).slice(0, count).map(e => {
            if (isSymbol) return (e.s || e.symbol);
            return e.name || (typeof e.n === 'string' ? e.n : e.name);
        });
    }
};
