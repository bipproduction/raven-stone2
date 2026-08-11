/**
 * Kumpulan kalimat (pool) untuk generate konten SWOT dummy per kategori.
 * Dipakai untuk merangkai paragraf berisi beberapa kalimat acak yang plausibel
 * dan berbeda tiap generate. Bahasa Indonesia, netral, tanpa menyebut nama
 * kandidat tertentu. Tiap elemen adalah kalimat utuh yang diakhiri titik.
 */

export const SWOT_CATEGORIES = ["STRENGTH", "WEAKNESS", "OPPORTUNITY", "THREAT"] as const

export type SwotCategory = (typeof SWOT_CATEGORIES)[number]

export const SWOT_SENTENCES: Record<SwotCategory, string[]> = {
    STRENGTH: [
        "Kandidat memiliki basis massa loyal yang tersebar di wilayah perkotaan.",
        "Rekam jejak kepemimpinannya dinilai kuat oleh sebagian besar pemilih.",
        "Jaringan relawan bekerja solid hingga ke tingkat akar rumput.",
        "Citra positif terbangun di kalangan pemilih kelas menengah.",
        "Dukungan koalisi partai relatif stabil menjelang masa kampanye.",
        "Penguasaan isu ekonomi dan lapangan kerja menjadi nilai tambah tersendiri.",
        "Kemampuan komunikasi publik membantu menyampaikan program secara efektif.",
        "Sumber daya kampanye tersedia cukup untuk menjangkau banyak daerah.",
        "Popularitas di media sosial terus menunjukkan tren yang menguat.",
        "Konsistensi visi dan program kerja memperkuat kepercayaan pendukung.",
        "Tim pemenangan memiliki struktur yang rapi dan terkoordinasi.",
        "Figur kandidat mudah dikenali oleh berbagai lapisan masyarakat.",
    ],
    WEAKNESS: [
        "Elektabilitas masih tergolong rendah di kalangan pemilih muda.",
        "Dukungan sangat bergantung pada figur tokoh tertentu.",
        "Struktur organisasi belum merata di sejumlah daerah.",
        "Penetrasi pesan kampanye di wilayah pedesaan masih terbatas.",
        "Rekam jejak tertentu mudah dijadikan bahan kritik lawan.",
        "Program unggulan belum sepenuhnya menyentuh isu-isu lokal.",
        "Koordinasi antar tim di lapangan belum berjalan optimal.",
        "Keterbatasan pendanaan dirasakan di beberapa wilayah strategis.",
        "Tingkat pengenalan program unggulan masih perlu ditingkatkan.",
        "Dukungan internal koalisi sesekali terlihat terfragmentasi.",
        "Respons terhadap isu yang berkembang kerap dinilai lambat.",
        "Basis pemilih perempuan belum tergarap secara maksimal.",
    ],
    OPPORTUNITY: [
        "Jumlah pemilih pemula terus meningkat pada siklus pemilu ini.",
        "Isu ekonomi dapat dijadikan momentum untuk menarik simpati publik.",
        "Terbuka ruang kolaborasi yang luas dengan komunitas lokal.",
        "Sentimen publik di media digital menunjukkan kecenderungan positif.",
        "Peluang menggaet pemilih mengambang masih cukup besar.",
        "Dukungan tokoh masyarakat berpengaruh dapat memperluas jangkauan.",
        "Program bantuan sosial relevan dengan kebutuhan warga di banyak daerah.",
        "Jaringan relawan berpotensi diperluas ke wilayah-wilayah baru.",
        "Partisipasi publik di kanal daring terus mengalami peningkatan.",
        "Isu lingkungan menarik perhatian pemilih muda yang kian kritis.",
        "Kemitraan dengan media lokal dapat memperkuat penyebaran pesan.",
        "Momentum debat publik bisa dimanfaatkan untuk menonjolkan gagasan.",
    ],
    THREAT: [
        "Kampanye negatif dari pihak lawan berpotensi menggerus dukungan.",
        "Sentimen publik cenderung fluktuatif menjelang hari pemungutan suara.",
        "Persaingan memperebutkan pemilih mengambang berlangsung sangat ketat.",
        "Penyebaran informasi keliru di media sosial sulit dikendalikan.",
        "Perubahan peta koalisi dapat terjadi secara tidak terduga.",
        "Tekanan ekonomi global berpotensi memengaruhi daya beli masyarakat.",
        "Kepercayaan terhadap institusi politik cenderung menurun.",
        "Tingkat golput yang tinggi menjadi ancaman bagi perolehan suara.",
        "Isu identitas dapat dimanfaatkan untuk memecah basis dukungan.",
        "Dinamika hukum dan regulasi kampanye menuntut kehati-hatian ekstra.",
        "Serangan personal berisiko mengalihkan fokus dari isu substantif.",
        "Mobilisasi pemilih oleh kompetitor semakin masif di lapangan.",
    ],
}
