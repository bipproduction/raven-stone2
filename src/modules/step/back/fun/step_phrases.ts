/**
 * Kumpulan kalimat (pool) untuk generate konten STEP dummy per kategori dan
 * sentimen. Disusun bergaya berita dan dibagi menjadi tiga bagian — lead
 * (pembuka), body (isi/uraian), dan closing (penutup) — supaya paragraf yang
 * dirangkai mengalir seperti teks berita, bukan sekadar daftar poin. Tiap
 * elemen adalah satu kalimat utuh berbahasa Indonesia yang diakhiri titik dan
 * tidak memuat titik lain di tengahnya (agar pemenggalan kalimat tetap andal).
 *
 * Struktur: STEP_NARRATIVE[kategori][sentimen] → { lead, body, closing }.
 * Sentimen mengikuti skema model Step: 1 = positive, 2 = negative.
 */

export const STEP_CATEGORIES = ["SOCIAL", "TECHNOLOGY", "ECONOMY", "POLITIC"] as const

export type StepCategory = (typeof STEP_CATEGORIES)[number]

/** Sentimen konten step: 1 = positive, 2 = negative. */
export const STEP_SENTIMENTS = [1, 2] as const

export type StepSentiment = (typeof STEP_SENTIMENTS)[number]

export interface NarrativePool {
    lead: string[]
    body: string[]
    closing: string[]
}

export const STEP_NARRATIVE: Record<StepCategory, Record<StepSentiment, NarrativePool>> = {
    SOCIAL: {
        1: {
            lead: [
                "Langkah kandidat di bidang sosial mendapat sorotan positif karena dinilai menyentuh persoalan yang selama ini dirasakan langsung oleh masyarakat kecil.",
                "Sejumlah pegiat menilai pendekatan sosial kandidat mampu membangun kedekatan yang tulus dengan warga di berbagai lapisan.",
                "Dalam beberapa pekan terakhir kandidat kerap dipuji karena konsisten menempatkan isu kesejahteraan sosial sebagai prioritas kampanye.",
                "Rekam jejak kandidat dalam kegiatan kemasyarakatan menjadi salah satu daya tarik yang memperkuat simpati pemilih.",
            ],
            body: [
                "Program pemberdayaan komunitas yang digagas tim kandidat berhasil menjangkau kelompok rentan hingga ke permukiman padat penduduk.",
                "Kegiatan bakti sosial yang rutin digelar dinilai efektif membangun kepercayaan warga terhadap kepedulian kandidat.",
                "Dialog terbuka bersama warga membuat aspirasi masyarakat lebih mudah ditampung dan ditindaklanjuti secara konkret.",
                "Perhatian kandidat terhadap isu pendidikan dan kesehatan dasar dianggap relevan dengan kebutuhan keluarga berpenghasilan rendah.",
                "Jaringan relawan sosial bekerja hingga tingkat kelurahan sehingga bantuan dapat disalurkan secara tepat sasaran.",
                "Sikap kandidat yang mudah ditemui masyarakat memperkuat citra sebagai figur yang dekat dengan rakyat.",
                "Inisiatif menggandeng komunitas lokal memberi ruang partisipasi yang lebih luas bagi warga dalam menyusun program.",
                "Konsistensi dalam mendampingi kelompok marjinal menjadi bukti bahwa komitmen sosial kandidat bukan sekadar janji kampanye.",
            ],
            closing: [
                "Modal sosial yang terbangun ini diyakini menjadi fondasi kuat untuk menjaga loyalitas dukungan hingga hari pemungutan suara.",
                "Tim pemenangan optimistis pendekatan humanis tersebut akan terus memperluas basis simpati di akar rumput.",
                "Banyak pihak menilai keunggulan sosial inilah yang membedakan kandidat dari para pesaingnya.",
                "Konsistensi menjaga hubungan dengan warga dinilai akan berbuah dukungan yang lebih solid ke depan.",
            ],
        },
        2: {
            lead: [
                "Di sisi lain, pendekatan sosial kandidat tidak lepas dari kritik karena dianggap belum menyentuh persoalan yang paling mendasar.",
                "Sejumlah pengamat menyoroti kelemahan kandidat dalam merespons isu sosial yang berkembang di tengah masyarakat.",
                "Kritik mengarah pada program sosial kandidat yang dinilai lebih bersifat seremonial ketimbang solusi berkelanjutan.",
                "Beberapa kalangan mempertanyakan konsistensi kandidat dalam menangani persoalan kesejahteraan warga.",
            ],
            body: [
                "Program bantuan yang digulirkan dinilai belum menyasar kelompok yang paling membutuhkan secara merata.",
                "Komunikasi dengan warga di daerah pinggiran dianggap masih lemah sehingga aspirasi mereka kurang terserap.",
                "Sebagian kegiatan sosial dinilai hanya ramai menjelang masa kampanye dan sepi setelahnya.",
                "Koordinasi antar relawan yang belum rapi membuat penyaluran bantuan kerap tidak tepat sasaran.",
                "Kandidat dinilai kurang tegas menyikapi isu kesenjangan sosial yang menjadi keluhan utama masyarakat.",
                "Rekam jejak dalam menuntaskan program sosial sebelumnya masih dipertanyakan sejumlah pihak.",
                "Kehadiran kandidat di tengah warga dianggap belum konsisten dan cenderung situasional.",
                "Janji perbaikan layanan dasar dinilai belum disertai peta jalan yang jelas dan terukur.",
            ],
            closing: [
                "Kelemahan ini berpotensi menggerus kepercayaan jika tidak segera diperbaiki menjelang hari pemilihan.",
                "Pengamat mengingatkan celah tersebut bisa dimanfaatkan lawan untuk merebut simpati pemilih.",
                "Tanpa langkah konkret, kritik sosial ini diprediksi terus membayangi kampanye kandidat.",
                "Sejumlah pihak mendesak kandidat memperjelas komitmen agar keraguan publik dapat diredam.",
            ],
        },
    },
    TECHNOLOGY: {
        1: {
            lead: [
                "Penguasaan kandidat terhadap isu teknologi mendapat apresiasi karena dinilai relevan dengan kebutuhan zaman.",
                "Sejumlah pengamat menilai visi digital kandidat menjadi salah satu keunggulan yang menonjol pada kontestasi kali ini.",
                "Dalam berbagai forum, gagasan kandidat soal transformasi digital kerap dinilai matang dan aplikatif.",
                "Kandidat dianggap piawai memanfaatkan kanal digital untuk mendekatkan diri dengan pemilih muda.",
            ],
            body: [
                "Program digitalisasi layanan publik yang ditawarkan dinilai mampu memangkas birokrasi yang selama ini berbelit.",
                "Pemanfaatan media sosial yang terukur membantu kandidat menyampaikan pesan kampanye secara efektif dan tepat sasaran.",
                "Gagasan membangun ekosistem ekonomi digital dinilai membuka peluang kerja baru bagi generasi muda.",
                "Perhatian terhadap literasi digital masyarakat menjadi nilai tambah yang jarang diangkat kandidat lain.",
                "Rencana penguatan infrastruktur internet hingga pelosok dianggap menyentuh kebutuhan nyata warga daerah.",
                "Tim kampanye memanfaatkan analitik data untuk memetakan aspirasi pemilih secara lebih presisi.",
                "Dukungan terhadap pengembangan talenta teknologi lokal memperkuat citra kandidat sebagai figur berorientasi masa depan.",
                "Konsep pemerintahan berbasis data yang ditawarkan dinilai menjanjikan transparansi yang lebih baik.",
            ],
            closing: [
                "Visi teknologi ini diyakini menjadi magnet kuat bagi pemilih muda yang mendambakan perubahan.",
                "Tim pemenangan menilai keunggulan digital tersebut sulit ditandingi para pesaing.",
                "Banyak kalangan menilai gagasan ini menempatkan kandidat selangkah di depan dalam adaptasi zaman.",
                "Konsistensi mengusung agenda digital dinilai akan memperluas dukungan lintas generasi.",
            ],
        },
        2: {
            lead: [
                "Namun gagasan teknologi kandidat juga menuai kritik karena dianggap terlalu ambisius dan minim kejelasan.",
                "Sejumlah pengamat meragukan kesiapan kandidat mewujudkan janji transformasi digital yang digaungkan.",
                "Kritik muncul terhadap program digital kandidat yang dinilai belum menyentuh persoalan mendasar di lapangan.",
                "Beberapa kalangan menyoroti lemahnya pemahaman teknis di balik janji-janji teknologi kandidat.",
            ],
            body: [
                "Rencana digitalisasi dinilai belum disertai perhitungan anggaran dan tahapan yang realistis.",
                "Janji pemerataan internet dianggap sulit terealisasi tanpa dukungan infrastruktur yang memadai.",
                "Sebagian program teknologi dinilai lebih menyasar kalangan urban dan mengabaikan warga pedesaan.",
                "Isu keamanan data pribadi warga dinilai belum mendapat perhatian serius dari kandidat.",
                "Ketergantungan pada narasi digital dianggap mengaburkan solusi untuk masalah yang lebih mendesak.",
                "Kesenjangan literasi digital masyarakat dinilai belum dijawab dengan program yang konkret.",
                "Rekam jejak kandidat dalam proyek teknologi sebelumnya dipertanyakan sejumlah pihak.",
                "Gagasan yang ditawarkan dinilai lebih banyak berupa slogan ketimbang peta jalan yang terukur.",
            ],
            closing: [
                "Tanpa kejelasan teknis, janji teknologi ini berisiko dianggap sekadar gimik kampanye.",
                "Pengamat menilai kelemahan ini bisa menurunkan kepercayaan pemilih yang kritis terhadap isu digital.",
                "Kandidat didesak menyusun rencana yang lebih membumi agar keraguan publik dapat diatasi.",
                "Celah tersebut dinilai rawan dimanfaatkan lawan untuk mempertanyakan kredibilitas kandidat.",
            ],
        },
    },
    ECONOMY: {
        1: {
            lead: [
                "Gagasan ekonomi kandidat mendapat sambutan positif karena dinilai berpihak pada kepentingan rakyat kecil.",
                "Sejumlah pengamat menilai program ekonomi kandidat cukup realistis dan menyentuh kebutuhan pelaku usaha kecil.",
                "Dalam berbagai kesempatan, visi kesejahteraan ekonomi kandidat kerap dinilai jelas dan terukur.",
                "Kandidat dianggap memahami persoalan ekonomi rakyat berkat rekam jejak yang dekat dengan dunia usaha.",
            ],
            body: [
                "Program penguatan usaha mikro dinilai mampu membuka lapangan kerja baru di tingkat lokal.",
                "Rencana memperluas akses permodalan bagi pelaku UMKM dianggap menyentuh persoalan yang selama ini menghambat.",
                "Perhatian terhadap stabilitas harga kebutuhan pokok menjadi isu yang dinilai relevan bagi keluarga berpenghasilan rendah.",
                "Gagasan hilirisasi sumber daya lokal dinilai berpotensi meningkatkan nilai tambah ekonomi daerah.",
                "Dukungan terhadap petani dan nelayan memperkuat citra kandidat sebagai figur yang peduli sektor produktif.",
                "Rencana penciptaan lapangan kerja bagi angkatan muda dianggap menjawab kegelisahan pemilih pemula.",
                "Konsep ekonomi kerakyatan yang diusung dinilai konsisten dengan kebutuhan masyarakat menengah ke bawah.",
                "Tim kandidat menawarkan skema insentif usaha yang dinilai mendorong pertumbuhan sektor informal.",
            ],
            closing: [
                "Program ekonomi yang membumi ini diyakini menjadi daya tarik kuat bagi pemilih dari kalangan pekerja.",
                "Tim pemenangan optimistis gagasan tersebut mampu memperluas dukungan di sentra-sentra ekonomi rakyat.",
                "Banyak pihak menilai keberpihakan ekonomi inilah yang memperkuat posisi kandidat.",
                "Konsistensi mengusung ekonomi kerakyatan dinilai akan berbuah kepercayaan yang lebih luas.",
            ],
        },
        2: {
            lead: [
                "Sebaliknya, program ekonomi kandidat juga menuai kritik karena dianggap kurang realistis dan minim rincian.",
                "Sejumlah ekonom meragukan kelayakan janji-janji ekonomi yang digaungkan kandidat.",
                "Kritik mengarah pada gagasan ekonomi kandidat yang dinilai lebih populis ketimbang berkelanjutan.",
                "Beberapa kalangan mempertanyakan sumber pembiayaan di balik program ekonomi ambisius kandidat.",
            ],
            body: [
                "Janji penciptaan lapangan kerja dinilai belum disertai strategi yang jelas dan terukur.",
                "Rencana subsidi yang ditawarkan dianggap berisiko membebani anggaran daerah dalam jangka panjang.",
                "Program pemberdayaan UMKM dinilai belum menyentuh persoalan akses pasar yang menjadi kendala utama.",
                "Perhatian terhadap sektor pertanian dianggap masih sebatas retorika tanpa langkah konkret.",
                "Isu ketimpangan ekonomi antarwilayah dinilai belum dijawab dengan solusi yang memadai.",
                "Ketergantungan pada janji bantuan langsung dianggap tidak menyelesaikan akar masalah kemiskinan.",
                "Rekam jejak kandidat dalam mengelola program ekonomi sebelumnya masih dipertanyakan publik.",
                "Gagasan yang ditawarkan dinilai kurang memperhitungkan kondisi fiskal yang sebenarnya.",
            ],
            closing: [
                "Tanpa rincian yang jelas, program ekonomi ini berisiko dianggap sekadar janji manis kampanye.",
                "Pengamat menilai kelemahan ini bisa menurunkan kepercayaan pemilih yang rasional.",
                "Kandidat didesak memperjelas skema pembiayaan agar keraguan publik dapat diredam.",
                "Celah tersebut dinilai rawan menjadi bahan serangan dari kubu lawan.",
            ],
        },
    },
    POLITIC: {
        1: {
            lead: [
                "Manuver politik kandidat dinilai matang karena mampu menjaga soliditas koalisi sekaligus memperluas dukungan.",
                "Sejumlah pengamat menilai kepiawaian politik kandidat menjadi salah satu keunggulan yang menonjol.",
                "Dalam pemetaan kekuatan, kandidat kerap disebut sebagai figur yang memiliki jaringan politik relatif kokoh.",
                "Rekam jejak kandidat dalam membangun komunikasi lintas partai menjadi modal politik yang diperhitungkan.",
            ],
            body: [
                "Dukungan koalisi partai yang stabil memperkuat logistik kampanye sekaligus memperluas jangkauan ke daerah strategis.",
                "Kemampuan merangkul beragam kelompok kepentingan membuat basis dukungan kandidat semakin beragam.",
                "Komunikasi politik yang santun dinilai efektif meredam potensi gesekan dengan kubu lain.",
                "Konsolidasi mesin partai hingga tingkat bawah berjalan rapi dan terorganisir dengan baik.",
                "Sikap kandidat yang menjaga etika politik memperkuat citra sebagai figur negarawan.",
                "Kemampuan membaca peta politik lokal membantu tim menyusun strategi yang tepat sasaran.",
                "Dukungan tokoh berpengaruh di sejumlah daerah menambah bobot elektoral kandidat.",
                "Konsistensi menjaga janji politik membuat kepercayaan mitra koalisi tetap terjaga.",
            ],
            closing: [
                "Soliditas politik ini diyakini menjadi fondasi kuat untuk memenangkan kontestasi.",
                "Tim pemenangan optimistis jaringan politik tersebut akan terus memperluas dukungan.",
                "Banyak pihak menilai kematangan politik inilah yang membedakan kandidat dari pesaingnya.",
                "Konsistensi menjaga koalisi dinilai akan berbuah stabilitas dukungan hingga akhir.",
            ],
        },
        2: {
            lead: [
                "Namun langkah politik kandidat juga menuai kritik karena dinilai kerap berubah arah dan tidak konsisten.",
                "Sejumlah pengamat menyoroti kelemahan kandidat dalam menjaga soliditas dukungan politiknya.",
                "Kritik mengarah pada manuver politik kandidat yang dianggap lebih pragmatis ketimbang berprinsip.",
                "Beberapa kalangan mempertanyakan komitmen kandidat terhadap janji politik yang pernah diucapkan.",
            ],
            body: [
                "Hubungan dengan sebagian mitra koalisi dinilai rapuh dan rawan pecah menjelang hari pemilihan.",
                "Komunikasi politik yang kerap berubah membuat publik ragu terhadap konsistensi sikap kandidat.",
                "Sejumlah manuver dinilai lebih mengutamakan kepentingan jangka pendek ketimbang visi jangka panjang.",
                "Ketegangan dengan kelompok tertentu berpotensi menggerus basis dukungan yang sudah terbangun.",
                "Rekam jejak dalam menjaga janji politik sebelumnya masih menjadi sorotan sejumlah pihak.",
                "Konsolidasi internal yang belum solid dianggap melemahkan kekuatan mesin politik kandidat.",
                "Sikap yang dinilai ambigu pada isu sensitif membuat sebagian pemilih ragu menentukan pilihan.",
                "Ketergantungan pada tokoh tertentu dianggap membuat posisi kandidat mudah goyah.",
            ],
            closing: [
                "Tanpa perbaikan, kelemahan politik ini berpotensi menggerus dukungan menjelang pemilihan.",
                "Pengamat menilai celah tersebut bisa dimanfaatkan lawan untuk melemahkan posisi kandidat.",
                "Kandidat didesak menegaskan sikap agar keraguan publik terhadap konsistensinya dapat diredam.",
                "Instabilitas koalisi ini diprediksi terus membayangi langkah kampanye kandidat.",
            ],
        },
    },
}
