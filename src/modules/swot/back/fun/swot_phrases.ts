/**
 * Kumpulan frasa (pool) untuk generate konten SWOT dummy per kategori.
 * Dipakai untuk merakit beberapa poin acak yang plausibel dan berbeda tiap generate.
 * Bahasa Indonesia, netral, tidak menyebut nama kandidat tertentu.
 */

export const SWOT_CATEGORIES = ["STRENGTH", "WEAKNESS", "OPPORTUNITY", "THREAT"] as const

export type SwotCategory = (typeof SWOT_CATEGORIES)[number]

export const SWOT_PHRASES: Record<SwotCategory, string[]> = {
    STRENGTH: [
        "Basis massa loyal di wilayah perkotaan",
        "Rekam jejak kepemimpinan yang kuat",
        "Jaringan relawan yang solid di akar rumput",
        "Citra positif di kalangan pemilih menengah",
        "Dukungan koalisi partai yang stabil",
        "Penguasaan isu ekonomi dan lapangan kerja",
        "Kemampuan komunikasi publik yang baik",
        "Sumber daya kampanye yang memadai",
        "Popularitas tinggi di media sosial",
        "Konsistensi visi dan program kerja",
    ],
    WEAKNESS: [
        "Elektabilitas rendah di kalangan pemilih muda",
        "Ketergantungan pada figur tokoh tertentu",
        "Struktur organisasi yang belum merata di daerah",
        "Kurangnya penetrasi di wilayah pedesaan",
        "Rekam jejak yang mudah menjadi bahan kritik",
        "Pesan kampanye yang belum menyentuh isu lokal",
        "Koordinasi antar tim yang belum optimal",
        "Keterbatasan pendanaan di sejumlah wilayah",
        "Rendahnya tingkat pengenalan program unggulan",
        "Fragmentasi dukungan di internal koalisi",
    ],
    OPPORTUNITY: [
        "Meningkatnya jumlah pemilih pemula",
        "Isu ekonomi yang bisa dijadikan momentum",
        "Ruang kolaborasi dengan komunitas lokal",
        "Tren positif sentimen publik di media digital",
        "Peluang menggaet suara pemilih mengambang",
        "Dukungan tokoh masyarakat yang berpengaruh",
        "Program bantuan sosial yang relevan dengan kebutuhan",
        "Perluasan jaringan relawan ke daerah baru",
        "Meningkatnya partisipasi publik di kanal daring",
        "Isu lingkungan yang menarik perhatian pemilih muda",
    ],
    THREAT: [
        "Kampanye negatif dari pihak lawan",
        "Volatilitas sentimen publik menjelang pemilu",
        "Persaingan ketat memperebutkan pemilih mengambang",
        "Penyebaran informasi keliru di media sosial",
        "Perubahan peta koalisi yang tidak terduga",
        "Isu ekonomi global yang menekan daya beli",
        "Menurunnya tingkat kepercayaan terhadap institusi",
        "Tingkat golput yang berpotensi meningkat",
        "Serangan isu identitas yang memecah dukungan",
        "Dinamika hukum dan regulasi kampanye",
    ],
}
