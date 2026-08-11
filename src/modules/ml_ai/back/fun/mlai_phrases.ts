/**
 * Kumpulan kalimat (pool) untuk generate konten ML-AI dummy per aspek strategis.
 * ML-AI menampilkan satu dokumen naratif "Strength Analysis Improvement" per
 * paslon, jadi tiap aspek (elektabilitas, komunikasi publik, program kerja,
 * jaringan relawan, isu digital) dirangkai menjadi satu paragraf bergaya berita
 * yang terdiri dari tiga bagian — lead (pembuka), body (uraian rekomendasi), dan
 * closing (penutup/arah tindak lanjut). Tiap elemen adalah satu kalimat utuh
 * berbahasa Indonesia yang diakhiri titik dan tidak memuat titik lain di
 * tengahnya (agar pemenggalan kalimat tetap andal).
 *
 * Struktur: MLAI_NARRATIVE[aspek] → { lead, body, closing }.
 */

export const MLAI_ASPECTS = [
    "ELECTABILITY",
    "PUBLIC_COMMUNICATION",
    "WORK_PROGRAM",
    "VOLUNTEER_NETWORK",
    "DIGITAL_ISSUE",
] as const

export type MlaiAspect = (typeof MLAI_ASPECTS)[number]

/** Judul aspek yang ditampilkan sebagai heading tiap paragraf rekomendasi. */
export const MLAI_ASPECT_TITLE: Record<MlaiAspect, string> = {
    ELECTABILITY: "Peningkatan Elektabilitas",
    PUBLIC_COMMUNICATION: "Penguatan Komunikasi Publik",
    WORK_PROGRAM: "Penajaman Program Kerja",
    VOLUNTEER_NETWORK: "Optimalisasi Jaringan Relawan",
    DIGITAL_ISSUE: "Pengelolaan Isu Digital",
}

export interface NarrativePool {
    lead: string[]
    body: string[]
    closing: string[]
}

export const MLAI_NARRATIVE: Record<MlaiAspect, NarrativePool> = {
    ELECTABILITY: {
        lead: [
            "Analisis terbaru menunjukkan elektabilitas paslon masih memiliki ruang tumbuh yang signifikan bila strategi penetrasi pemilih dibenahi secara terukur.",
            "Model prediksi mengindikasikan momentum dukungan paslon dapat dikapitalisasi lebih agresif menjelang masa tenang kampanye.",
            "Rekomendasi sistem mengarahkan tim pemenangan untuk memperluas basis suara di segmen pemilih yang selama ini belum tergarap optimal.",
            "Pemetaan data memperlihatkan sejumlah kantong suara potensial yang dapat mendongkrak elektabilitas bila diprioritaskan sejak dini.",
        ],
        body: [
            "Segmen pemilih muda perkotaan disarankan menjadi prioritas karena elastisitas dukungannya paling tinggi terhadap pesan kampanye yang tepat.",
            "Konsolidasi suara di wilayah dengan margin tipis perlu diperkuat melalui kunjungan langsung dan penguatan tokoh lokal.",
            "Diferensiasi gagasan dari pesaing terdekat dinilai penting agar pemilih mengambang memiliki alasan rasional untuk berpindah dukungan.",
            "Alokasi sumber daya kampanye sebaiknya digeser mengikuti peta sensitivitas suara yang dihasilkan model, bukan sekadar sebaran historis.",
            "Penguatan citra sebagai figur solutif direkomendasikan untuk menaikkan konversi simpati menjadi dukungan yang terkunci.",
            "Pemantauan tren dukungan secara harian memungkinkan tim merespons pergeseran opini sebelum berdampak pada elektabilitas.",
            "Kolaborasi dengan simpul komunitas dinilai efektif memperpendek jarak antara popularitas dan keterpilihan.",
        ],
        closing: [
            "Bila rekomendasi ini dijalankan konsisten, proyeksi elektabilitas paslon berpeluang naik secara bertahap hingga hari pemungutan suara.",
            "Sistem menyarankan evaluasi mingguan agar penambahan dukungan tetap terukur dan dapat dikoreksi cepat.",
            "Fokus pada segmen paling elastis diyakini memberi dampak elektoral terbesar dengan biaya kampanye paling efisien.",
            "Konsistensi eksekusi menjadi kunci agar tren positif tidak kehilangan momentum di pekan-pekan kritis.",
        ],
    },
    PUBLIC_COMMUNICATION: {
        lead: [
            "Evaluasi pola komunikasi publik menyoroti perlunya pesan yang lebih konsisten dan mudah dicerna lintas kelompok pemilih.",
            "Analisis sistem menemukan bahwa narasi kampanye paslon akan lebih efektif bila disederhanakan menjadi beberapa pesan inti yang berulang.",
            "Rekomendasi mengarah pada penyelarasan gaya komunikasi paslon dengan karakter audiens di tiap kanal.",
            "Data respons publik mengindikasikan ruang perbaikan pada kecepatan dan ketepatan paslon dalam menanggapi isu yang berkembang.",
        ],
        body: [
            "Penyusunan pesan inti yang ringkas disarankan agar publik lebih mudah mengingat posisi paslon pada isu utama.",
            "Konsistensi nada bicara antara panggung kampanye dan kanal digital dinilai penting untuk menjaga kredibilitas.",
            "Respons cepat terhadap isu sensitif direkomendasikan untuk mencegah ruang kosong yang dapat dimanfaatkan lawan.",
            "Penggunaan bahasa yang membumi dinilai memperkuat kedekatan paslon dengan pemilih akar rumput.",
            "Pelibatan juru bicara terlatih dapat menjaga disiplin pesan sekaligus memperluas jangkauan komunikasi.",
            "Cerita keberhasilan konkret disarankan lebih sering diangkat karena terbukti lebih persuasif dibanding klaim umum.",
            "Penyesuaian format pesan untuk tiap platform membantu paslon menjangkau audiens dengan gaya konsumsi berbeda.",
        ],
        closing: [
            "Dengan komunikasi yang lebih terarah, persepsi publik terhadap paslon diperkirakan membaik secara konsisten.",
            "Sistem menyarankan pengukuran resonansi pesan agar strategi komunikasi dapat terus disempurnakan.",
            "Disiplin pada pesan inti diyakini menjaga citra paslon tetap solid di tengah derasnya arus informasi.",
            "Perbaikan ini menjadi fondasi penting untuk memperkuat kepercayaan pemilih menjelang hari pemilihan.",
        ],
    },
    WORK_PROGRAM: {
        lead: [
            "Telaah terhadap program kerja menunjukkan gagasan paslon akan lebih meyakinkan bila disertai peta jalan yang konkret dan terukur.",
            "Rekomendasi sistem menekankan pentingnya menautkan setiap janji program dengan kebutuhan nyata di tiap wilayah.",
            "Analisis mengindikasikan program unggulan paslon berpotensi menonjol bila dikomunikasikan dengan indikator keberhasilan yang jelas.",
            "Pemetaan prioritas memperlihatkan beberapa program yang paling relevan dengan kekhawatiran utama pemilih saat ini.",
        ],
        body: [
            "Penajaman program unggulan disarankan agar pemilih dapat membedakan tawaran paslon dari sekadar janji normatif.",
            "Penyertaan target waktu dan indikator terukur dinilai memperkuat kredibilitas program di mata pemilih kritis.",
            "Penyesuaian program dengan isu lokal direkomendasikan supaya kampanye terasa relevan di tiap daerah.",
            "Pelibatan pemangku kepentingan sejak tahap gagasan dapat memperkuat rasa memiliki terhadap program.",
            "Komunikasi manfaat langsung bagi keluarga berpenghasilan rendah dinilai paling efektif mendongkrak dukungan.",
            "Penyederhanaan penjelasan teknis membantu publik memahami dampak nyata program pada kehidupan sehari-hari.",
            "Konsistensi antara program dan rekam jejak paslon memperkuat keyakinan pemilih terhadap kemampuan eksekusi.",
        ],
        closing: [
            "Program yang tajam dan terukur diyakini menjadi pembeda utama yang memperkuat posisi paslon.",
            "Sistem menyarankan uji resonansi program di sejumlah wilayah sebelum diangkat sebagai isu utama kampanye.",
            "Kejelasan peta jalan diharapkan mengubah simpati menjadi keyakinan pemilih yang lebih kokoh.",
            "Relevansi program terhadap kebutuhan warga menjadi kunci menjaga daya tarik kampanye hingga akhir.",
        ],
    },
    VOLUNTEER_NETWORK: {
        lead: [
            "Pemetaan jaringan relawan mengungkap potensi mobilisasi yang belum sepenuhnya dioptimalkan hingga tingkat akar rumput.",
            "Analisis sistem merekomendasikan penguatan struktur relawan agar distribusi pesan kampanye lebih merata dan cepat.",
            "Data lapangan menunjukkan soliditas relawan menjadi salah satu faktor penentu efektivitas kampanye paslon.",
            "Rekomendasi mengarah pada peningkatan koordinasi relawan untuk menutup celah cakupan di wilayah tertentu.",
        ],
        body: [
            "Penguatan koordinasi antarsimpul relawan disarankan agar instruksi kampanye tersampaikan tanpa distorsi.",
            "Pelatihan relawan mengenai pesan inti dinilai penting untuk menjaga konsistensi narasi di lapangan.",
            "Pemetaan wilayah dengan cakupan relawan tipis perlu diprioritaskan untuk penambahan personel.",
            "Pemberian apresiasi berkala kepada relawan dapat menjaga semangat dan menekan angka kejenuhan.",
            "Pemanfaatan data kunjungan lapangan membantu tim menilai efektivitas mobilisasi secara objektif.",
            "Sinergi relawan dengan tokoh lokal dinilai memperkuat legitimasi kampanye di mata warga.",
            "Sistem pelaporan sederhana memudahkan relawan menyampaikan dinamika lapangan secara cepat.",
        ],
        closing: [
            "Jaringan relawan yang solid diyakini menjadi tulang punggung mobilisasi suara pada hari pemilihan.",
            "Sistem menyarankan evaluasi cakupan relawan secara berkala agar tidak ada wilayah yang terabaikan.",
            "Penguatan kapasitas relawan diharapkan meningkatkan konversi interaksi lapangan menjadi dukungan nyata.",
            "Koordinasi yang rapi menjadi pembeda antara popularitas dan kemenangan yang terkelola dengan baik.",
        ],
    },
    DIGITAL_ISSUE: {
        lead: [
            "Pemantauan ruang digital menyoroti perlunya kesiapan paslon menghadapi dinamika isu yang bergerak cepat di media sosial.",
            "Analisis sistem menemukan sejumlah percakapan daring yang berpotensi memengaruhi persepsi publik terhadap paslon.",
            "Rekomendasi mengarah pada penguatan tata kelola isu digital agar narasi negatif tidak berkembang tanpa tanggapan.",
            "Data sentimen daring mengindikasikan peluang paslon memperkuat citra positif melalui konten yang lebih terkurasi.",
        ],
        body: [
            "Pemantauan sentimen secara berkala disarankan agar isu sensitif dapat diantisipasi sebelum meluas.",
            "Penyediaan klarifikasi cepat dan berbasis fakta dinilai efektif meredam penyebaran informasi keliru.",
            "Produksi konten positif yang konsisten membantu menyeimbangkan percakapan di ruang digital.",
            "Kolaborasi dengan pegiat media sosial dapat memperluas jangkauan pesan kampanye secara organik.",
            "Pemetaan kanal dengan pengaruh terbesar membantu tim memfokuskan energi pada titik yang paling menentukan.",
            "Penguatan literasi tim digital dinilai penting untuk membedakan isu genuin dari serangan terkoordinasi.",
            "Respons yang proporsional terhadap kritik daring membantu menjaga citra paslon tetap dewasa dan terbuka.",
        ],
        closing: [
            "Pengelolaan isu digital yang cekatan diyakini melindungi reputasi paslon dari gejolak informasi yang tidak terkendali.",
            "Sistem menyarankan pembaruan strategi konten mengikuti pergeseran tren percakapan daring.",
            "Kesiapan menghadapi isu digital menjadi faktor krusial dalam menjaga stabilitas dukungan.",
            "Narasi positif yang terjaga diharapkan memperkuat kepercayaan publik hingga masa akhir kampanye.",
        ],
    },
}
