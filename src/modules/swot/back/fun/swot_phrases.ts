/**
 * Kumpulan kalimat (pool) untuk generate konten SWOT dummy per kategori.
 * Disusun bergaya berita dan dibagi menjadi tiga bagian — lead (pembuka),
 * body (isi/uraian), dan closing (penutup) — supaya paragraf yang dirangkai
 * mengalir seperti teks berita, bukan sekadar daftar poin. Tiap elemen adalah
 * satu kalimat utuh berbahasa Indonesia yang diakhiri titik dan tidak memuat
 * titik lain di tengahnya (agar pemenggalan kalimat tetap andal).
 */

export const SWOT_CATEGORIES = ["STRENGTH", "WEAKNESS", "OPPORTUNITY", "THREAT"] as const

export type SwotCategory = (typeof SWOT_CATEGORIES)[number]

export interface NarrativePool {
    lead: string[]
    body: string[]
    closing: string[]
}

export const SWOT_NARRATIVE: Record<SwotCategory, NarrativePool> = {
    STRENGTH: {
        lead: [
            "Kekuatan utama kandidat terlihat jelas dari basis dukungan yang terbentuk secara konsisten di berbagai wilayah sepanjang tahapan kampanye berlangsung.",
            "Sejumlah pengamat menilai posisi kandidat cukup diuntungkan oleh modal politik yang telah dibangun jauh sebelum masa pemilihan dimulai.",
            "Dalam pemetaan kekuatan menjelang pemilu, nama kandidat kerap disebut sebagai figur yang memiliki fondasi elektoral relatif kokoh.",
            "Rekam jejak kandidat menjadi salah satu aset paling menonjol yang memperkuat daya tarik di mata pemilih dari beragam latar belakang.",
            "Tim pemenangan meyakini bahwa soliditas mesin politik menjadi keunggulan yang membedakan kandidat dari para pesaingnya.",
            "Popularitas kandidat yang terus menanjak di ruang digital dinilai menjadi salah satu kekuatan strategis pada kontestasi kali ini.",
        ],
        body: [
            "Basis massa yang loyal tersebar merata di kawasan perkotaan dan terbukti mampu menggerakkan dukungan secara terorganisir hingga tingkat kelurahan.",
            "Jaringan relawan bekerja hingga ke akar rumput dengan koordinasi yang rapi sehingga pesan kampanye tersampaikan secara efektif ke banyak komunitas.",
            "Penguasaan terhadap isu ekonomi dan penciptaan lapangan kerja memberi kandidat ruang untuk menawarkan solusi yang dianggap relevan oleh pemilih.",
            "Dukungan koalisi partai yang relatif stabil turut memperkuat logistik kampanye sekaligus memperluas jangkauan ke daerah-daerah strategis.",
            "Kemampuan komunikasi publik yang terlatih membantu kandidat membangun kedekatan emosional dengan pemilih di berbagai forum dan kanal media.",
            "Citra positif yang melekat di kalangan pemilih kelas menengah menjadi modal penting untuk menjaga keberlanjutan dukungan hingga hari pemungutan suara.",
            "Konsistensi visi dan program kerja yang ditawarkan sejak awal memperkuat persepsi publik bahwa kandidat memiliki arah kebijakan yang jelas.",
            "Sumber daya kampanye yang memadai memungkinkan tim bergerak lebih leluasa dalam menggarap segmen pemilih yang selama ini belum tersentuh.",
            "Figur kandidat yang mudah dikenali lintas generasi mempercepat proses konsolidasi dukungan di sejumlah basis pemilih tradisional.",
            "Rekam jejak kepemimpinan yang dinilai bersih menjadi bahan kampanye yang efektif untuk meredam serangan dari pihak lawan.",
        ],
        closing: [
            "Kombinasi berbagai faktor tersebut membuat sebagian analis optimistis kandidat mampu mempertahankan momentum hingga akhir kontestasi.",
            "Jika kekuatan ini dikelola secara konsisten, peluang kandidat untuk unggul dinilai akan semakin terbuka lebar.",
            "Modal politik yang kuat ini diperkirakan menjadi penentu arah perolehan suara pada tahapan-tahapan berikutnya.",
            "Para pendukung meyakini keunggulan tersebut cukup untuk menghadapi tekanan persaingan yang semakin ketat.",
            "Dengan fondasi yang tertata, kandidat dinilai berada pada posisi yang menguntungkan menjelang hari pemilihan.",
        ],
    },
    WEAKNESS: {
        lead: [
            "Di balik sejumlah keunggulan, kandidat masih menyimpan sejumlah kelemahan yang berpotensi menghambat laju dukungan menjelang pemilihan.",
            "Beberapa catatan kritis muncul dari kalangan pengamat yang menyoroti titik-titik rawan dalam strategi kampanye kandidat.",
            "Evaluasi internal tim pemenangan mengakui bahwa terdapat pekerjaan rumah yang belum sepenuhnya tuntas dikerjakan.",
            "Sejumlah kelemahan struktural dinilai dapat menjadi celah yang dimanfaatkan oleh para pesaing dalam kontestasi ini.",
            "Analisis peta dukungan memperlihatkan adanya sejumlah segmen pemilih yang belum berhasil dirangkul secara optimal.",
        ],
        body: [
            "Elektabilitas di kalangan pemilih muda masih tergolong rendah sehingga membutuhkan pendekatan yang lebih segar dan komunikatif.",
            "Ketergantungan pada figur tokoh tertentu membuat soliditas dukungan rentan goyah apabila terjadi dinamika politik yang tidak terduga.",
            "Struktur organisasi yang belum merata di sejumlah daerah menyulitkan tim untuk menjaga intensitas kampanye secara konsisten.",
            "Penetrasi pesan kampanye di wilayah pedesaan masih terbatas sehingga sebagian pemilih belum mengenal program unggulan yang ditawarkan.",
            "Koordinasi antar tim di lapangan yang belum berjalan optimal kerap menimbulkan tumpang tindih dalam pelaksanaan agenda kampanye.",
            "Keterbatasan pendanaan di beberapa wilayah strategis memaksa tim membuat prioritas yang tidak selalu ideal secara elektoral.",
            "Rekam jejak tertentu yang mudah dijadikan bahan kritik lawan menuntut tim untuk menyiapkan narasi tandingan yang lebih meyakinkan.",
            "Dukungan internal koalisi yang sesekali terlihat terfragmentasi berisiko melemahkan konsolidasi kekuatan di tingkat daerah.",
            "Respons terhadap isu yang berkembang kerap dinilai lambat sehingga peluang untuk membentuk opini publik tidak selalu termanfaatkan.",
            "Basis pemilih perempuan yang belum tergarap secara maksimal menjadi ruang kosong yang perlu segera diisi dengan program yang tepat sasaran.",
        ],
        closing: [
            "Tanpa pembenahan yang serius, kelemahan tersebut dikhawatirkan akan menekan perolehan suara pada momen yang menentukan.",
            "Tim pemenangan menegaskan akan segera membenahi berbagai kekurangan ini sebelum memasuki tahapan kampanye yang lebih intensif.",
            "Sejumlah pengamat menilai keberhasilan kandidat sangat bergantung pada seberapa cepat kelemahan ini diperbaiki.",
            "Bila dibiarkan, celah-celah tersebut berpotensi dimanfaatkan lawan untuk membalikkan keadaan.",
            "Perbaikan menyeluruh dinilai menjadi syarat penting agar dukungan tidak tergerus lebih jauh.",
        ],
    },
    OPPORTUNITY: {
        lead: [
            "Sejumlah peluang strategis terbuka lebar dan berpotensi mendongkrak posisi kandidat apabila dimanfaatkan secara tepat.",
            "Perkembangan situasi politik terkini dinilai memberi ruang gerak yang menguntungkan bagi kandidat menjelang pemilihan.",
            "Para analis melihat adanya sejumlah momentum yang bisa dikapitalisasi untuk memperluas basis dukungan kandidat.",
            "Dinamika pemilih pada siklus kali ini membuka kesempatan baru yang belum sepenuhnya digarap oleh para kontestan.",
            "Tim pemenangan mengidentifikasi beberapa peluang yang dapat menjadi pengungkit signifikan bagi elektabilitas kandidat.",
        ],
        body: [
            "Jumlah pemilih pemula yang terus meningkat menjadi lahan potensial yang dapat digarap melalui pendekatan digital yang lebih kreatif.",
            "Isu ekonomi yang menjadi perhatian utama publik dapat dijadikan momentum untuk menawarkan program yang menyentuh kebutuhan sehari-hari warga.",
            "Terbukanya ruang kolaborasi dengan komunitas lokal memungkinkan kandidat membangun kedekatan yang lebih personal dengan pemilih di daerah.",
            "Sentimen publik di media digital yang cenderung positif memberi peluang untuk memperkuat citra dan memperluas jangkauan pesan kampanye.",
            "Dukungan tokoh masyarakat yang berpengaruh berpotensi memperluas jaringan sekaligus menambah legitimasi di mata pemilih tradisional.",
            "Program bantuan sosial yang relevan dengan kebutuhan warga dapat menjadi pintu masuk untuk merebut simpati di wilayah-wilayah baru.",
            "Meningkatnya partisipasi publik di kanal daring membuka peluang mobilisasi dukungan dengan biaya yang relatif lebih efisien.",
            "Isu lingkungan yang kian menarik perhatian pemilih muda dapat diangkat menjadi diferensiasi program yang membedakan kandidat dari pesaing.",
            "Kemitraan dengan media lokal berpotensi memperkuat penyebaran pesan hingga ke pelosok yang selama ini sulit dijangkau.",
            "Momentum debat publik yang akan datang bisa dimanfaatkan untuk menonjolkan gagasan sekaligus memperbaiki persepsi pemilih yang masih ragu.",
        ],
        closing: [
            "Jika berbagai peluang ini dieksekusi secara cermat, posisi kandidat diyakini akan menguat secara signifikan.",
            "Para pendukung berharap momentum tersebut tidak terlewat dan segera diterjemahkan menjadi strategi yang konkret.",
            "Pemanfaatan peluang yang optimal dinilai dapat menjadi titik balik dalam peta persaingan menjelang pemilihan.",
            "Dengan pembacaan situasi yang tepat, kandidat memiliki ruang untuk melampaui ekspektasi awal.",
            "Kesempatan ini dipandang sebagai peluang berharga yang sayang untuk dilewatkan begitu saja.",
        ],
    },
    THREAT: {
        lead: [
            "Di sisi lain, sejumlah ancaman membayangi langkah kandidat dan menuntut kewaspadaan ekstra hingga hari pemungutan suara.",
            "Peta persaingan yang semakin memanas memunculkan berbagai risiko yang dapat menggoyahkan posisi kandidat.",
            "Para pengamat mengingatkan adanya sejumlah faktor eksternal yang berpotensi mengganggu jalannya kampanye kandidat.",
            "Ketidakpastian situasi politik menjelang pemilihan menghadirkan tantangan yang tidak bisa dipandang sebelah mata.",
            "Tim pemenangan mengakui bahwa terdapat sejumlah ancaman serius yang perlu diantisipasi sejak dini.",
        ],
        body: [
            "Kampanye negatif dari pihak lawan yang terus digencarkan berpotensi menggerus kepercayaan pemilih yang belum menentukan pilihan.",
            "Sentimen publik yang cenderung fluktuatif menjelang hari pemungutan suara membuat perolehan dukungan sulit diprediksi secara pasti.",
            "Persaingan memperebutkan pemilih mengambang yang berlangsung sangat ketat menuntut strategi yang jauh lebih adaptif dan responsif.",
            "Penyebaran informasi keliru di media sosial yang sulit dikendalikan dapat dengan cepat membentuk opini negatif di tengah masyarakat.",
            "Perubahan peta koalisi yang bisa terjadi secara tidak terduga berisiko mengubah keseimbangan kekuatan dalam waktu singkat.",
            "Tekanan ekonomi global yang memengaruhi daya beli masyarakat berpotensi menggeser fokus pemilih pada isu yang berada di luar kendali kandidat.",
            "Menurunnya kepercayaan terhadap institusi politik dapat memicu sikap apatis yang berujung pada meningkatnya angka golput.",
            "Isu identitas yang kerap dimainkan menjelang pemilu berisiko memecah basis dukungan yang selama ini telah terbangun.",
            "Dinamika hukum dan regulasi kampanye yang ketat menuntut kehati-hatian agar tidak menimbulkan persoalan di kemudian hari.",
            "Mobilisasi pemilih oleh kompetitor yang semakin masif di lapangan menambah beban persaingan yang harus dihadapi tim pemenangan.",
        ],
        closing: [
            "Tanpa mitigasi yang memadai, berbagai ancaman ini dikhawatirkan dapat membalikkan keadaan pada saat yang paling menentukan.",
            "Tim pemenangan menegaskan akan menyiapkan langkah antisipatif untuk meredam dampak dari berbagai risiko tersebut.",
            "Para analis menilai kemampuan kandidat mengelola ancaman ini akan sangat menentukan hasil akhir kontestasi.",
            "Bila tidak diwaspadai, tekanan tersebut berpotensi menggerus dukungan yang telah susah payah dibangun.",
            "Kewaspadaan menjadi kunci agar berbagai ancaman ini tidak berkembang menjadi persoalan yang lebih besar.",
        ],
    },
}
