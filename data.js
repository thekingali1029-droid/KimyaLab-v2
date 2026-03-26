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
                { q: "Endüstride hammadde üretimini ve maliyet analizini yapan alan?", options: ["Endüstriyel Kimya", "Analitik Kimya", "Fizikokimya", "Anorganik Kimya"], a: "Endüstriyel Kimya", difficulty: 'hard' }
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
                { q: "O harfi üzerinde alev sembolü neyi ifade eder?", options: ["Yanıcı", "Yakıcı", "Zehirli", "Radyoaktif"], a: "Yakıcı", difficulty: 'easy' },
                { q: "Asit kaplarının üzerinde hangi sembolün bulunması beklenir?", options: ["Korozif", "Yanıcı", "Radyoaktif", "Patlayıcı"], a: "Korozif", difficulty: 'easy' },
                { q: "Kurukafa sembolü ne anlama gelir?", options: ["Toksik (Zehirli)", "Yakıcı", "Tahriş Edici", "Ekolojik Risk"], a: "Toksik (Zehirli)", difficulty: 'easy' },
                { q: "Ünlem işareti (!) sembolü neyi belirtir?", options: ["Tahriş Edici", "Toksik", "Radyoaktif", "Yanıcı"], a: "Tahriş Edici", difficulty: 'medium' },
                { q: "Ölü balık ve kurumuş ağaç sembolü neyi ifade eder?", options: ["Çevreye Zararlı", "Biyolojik Tehlike", "Su kirliliği", "Atık madde"], a: "Çevreye Zararlı", difficulty: 'medium' },
                { q: "HF (Hidroflorik asit) gibi maddeler neden özel kaplarda saklanmalıdır?", options: ["Camı aşındırdığı için", "Yanıcı olduğu için", "Pahalı olduğu için", "Kokusu olduğu için"], a: "Camı aşındırdığı için", difficulty: 'hard' },
                { q: "Laboratuvarda bir kimyasalın güvenlik bilgi formuna ne ad verilir?", options: ["MSDS", "HPLC", "ASTM", "TSE"], a: "MSDS", difficulty: 'hard' },
                { q: "Radyoaktif maddelerle çalışılırken hangi kurşun önlük giyilmesinin temel sebebi nedir?", options: ["Radyasyonu emmek", "Sıcaklıktan korumak", "Ağırlık yapmak", "Şık durmak"], a: "Radyasyonu emmek", difficulty: 'medium' }
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
                { q: "Elektronların bulunma olasılığının yüksek olduğu bölgelere ne denir?", options: ["Yörünge", "Orbital", "Çekirdek", "Katman"], a: "Orbital", difficulty: 'easy' },
                { q: "l=1 kuantum sayısı hangi orbital türünü temsil eder?", options: ["s", "p", "d", "f"], a: "p", difficulty: 'easy' },
                { q: "24Cr atomunun elektron dizilimi aşağıdakilerden hangisidir?", options: ["[Ar] 4s2 3d4", "[Ar] 4s1 3d5", "[Ar] 4s0 3d6", "[Ne] 3s2 3p6"], a: "[Ar] 4s1 3d5", difficulty: 'hard' },
                { q: "Pauli dışlama ilkesine göre bir orbitalde en fazla kaç elektron bulunabilir?", options: ["1", "2", "6", "10"], a: "2", difficulty: 'easy' },
                { q: "d orbitali en fazla kaç elektron alabilir?", options: ["2", "6", "10", "14"], a: "10", difficulty: 'medium' },
                { q: "H2SO4 bileşiğinde Kükürt (S) atomunun yükseltgenme basamağı nedir?", options: ["+2", "+4", "+6", "-2"], a: "+6", difficulty: 'medium' },
                { q: "29Cu atomunun elektron diziliminde l=0 olan kaç elektron vardır?", options: ["6", "7", "8", "9"], a: "7", difficulty: 'hard' },
                { q: "4d orbitali için baş kuantum sayısı (n) ve orbital şekli (l) nedir?", options: ["n=4, l=2", "n=4, l=1", "n=3, l=2", "n=5, l=0"], a: "n=4, l=2", difficulty: 'medium' },
                { q: "Bir orbitalde n=3 ve l=1 ise bu orbital hangisidir?", options: ["3s", "3p", "3d", "2p"], a: "3p", difficulty: 'easy' },
                { q: "KMnO4 bileşiğinde Mn elementinin yükseltgenme basamağı?", options: ["+5", "+6", "+7", "+2"], a: "+7", difficulty: 'hard' }
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
                { q: "İdeal gas denkleminde sıcaklık birimi mutlaka ne olmalıdır?", options: ["Celsius", "Fahrenheit", "Kelvin", "Reaumur"], a: "Kelvin", difficulty: 'easy' },
                { q: "Sabit sıcaklıkta bir gazın basıncı 2 katına çıkarsa hacmi nasıl değişir?", options: ["Yarıya iner", "2 katına çıkar", "Değişmez", "4 katına çıkar"], a: "Yarıya iner", difficulty: 'easy' },
                { q: "Hangisi gazların idealliğe en yakın olduğu durumdur?", options: ["Yüksek P, Düşük T", "Düşük P, Yüksek T", "Yüksek P, Yüksek T", "Düşük P, Düşük T"], a: "Düşük P, Yüksek T", difficulty: 'medium' },
                { q: "CH4 (MA:16) ve SO2 (MA:64) gazlarından hangisi aynı sıcaklıkta daha hızlı yayılır?", options: ["CH4 2 kat daha hızlıdır", "SO2 2 kat daha hızlıdır", "Hızları eşittir", "CH4 4 kat daha hızlıdır"], a: "CH4 2 kat daha hızlıdır", difficulty: 'hard' },
                { q: "0°C ve 1 atm basınç altında 1 mol ideal gas kaç litre hacim kaplar?", options: ["11.2", "22.4", "24.5", "44.8"], a: "22.4", difficulty: 'medium' },
                { q: "Gerçek bir gazın ideallikten sapmasının temel sebebi nedir?", options: ["Moleküller arası çekim", "Molekül ağırlığı", "Kabın şekli", "Sıcaklık artışı"], a: "Moleküller arası çekim", difficulty: 'hard' },
                { q: "Dalton Kısmi Basınçlar Yasasına göre toplam basınç neye eşittir?", options: ["Kısmi basınçlar toplamına", "Kısmi basınçlar ortalamasına", "Sıcaklığa", "Hacme"], a: "Kısmi basınçlar toplamına", difficulty: 'easy' },
                { q: "PV/RT oranı 1 olan gaza ne denir?", options: ["İdeal gas", "Gerçek gas", "Asal gas", "Sıvılaştırılmış gas"], a: "İdeal gas", difficulty: 'medium' }
            ]
        },
        {
            id: 'cozeltiler',
            name: 'SIVI ÇÖZELTİLER VE ÇÖZÜNÜRLÜK',
            desc: 'Derişim birimleri ve çözünürlüğe etki eden faktörler.',
            content: `Çözeltiler, çözücü ve çözünenden oluşan homojen karışımlardır.
            • <b>Molarite (M):</b> M = n / V (Litre)
            • <b>Koligatif Özellikler:</b> Tanecik sayısına bağlı değişen özellikler (ΔTk = Kk . m . i).`,
            questions: [
                { q: "1 molar 500 mL çözelti hazırlamak için kaç mol madde gerekir?", options: ["0.5 mol", "1 mol", "5 mol", "10 mol"], a: "0.5 mol", difficulty: 'easy' },
                { q: "Sıcaklık artışı genellikle hangi maddelerin sudaki çözünürlüğünü azaltır?", options: ["Tuzlar", "Şekerler", "Gazlar", "Metaller"], a: "Gazlar", difficulty: 'easy' },
                { q: "Aşağıdakilerden hangisi bir derişim birimi değildir?", options: ["Molarite", "Molalite", "ppm", "Litre"], a: "Litre", difficulty: 'easy' },
                { q: "100 gram suda 18 gram glikoz (C6H12O6:180) çözülürse çözelti kaç molal olur?", options: ["1 molal", "0.1 molal", "0.5 molal", "2 molal"], a: "1 molal", difficulty: 'hard' },
                { q: "Donma noktası alçalması hangisine bağlıdır?", options: ["Tanecik derişimine", "Kabın hacmine", "Maddenin rengine", "Çözeltinin kütlesine"], a: "Tanecik derişimine", difficulty: 'medium' },
                { q: "Ters Ozmoz sistemi en çok hangi alanda kullanılır?", options: ["Deniz suyundan tatlı su elde etme", "Metal parlatma", "Isı yalıtımı", "Tekstil boyama"], a: "Deniz suyundan tatlı su elde etme", difficulty: 'hard' },
                { q: "Kütlece %20'lik 200 gram tuzlu suya 300 gram saf su eklenirse yeni yüzde kaç olur?", options: ["%8", "%10", "%12", "%15"], a: "%8", difficulty: 'hard' },
                { q: "Polar maddeler polar çözücülerde iyi çözünür kuralına ne denir?", options: ["Benzer benzeri çözer", "Dalton Yasası", "Henry Yasası", "Raoult Yasası"], a: "Benzer benzeri çözer", difficulty: 'medium' }
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
