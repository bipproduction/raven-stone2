/**
 * Kumpulan kalimat (pool) untuk generate konten Jokowi Effect dummy per aspek.
 * Jokowi Effect menampilkan satu dokumen naratif "Strength Analysis Improvement"
 * yang menyorot dampak faktor Jokowi terhadap kekuatan elektoral, jadi tiap aspek
 * (pengaruh figur, endorsement, persepsi keberlanjutan, basis akar rumput, dan
 * gaung digital) dirangkai menjadi satu paragraf bergaya berita yang terdiri dari
 * tiga bagian — lead (pembuka), body (uraian analisis), dan closing (penutup/arah
 * tindak lanjut). Tiap elemen adalah satu kalimat utuh berbahasa Indonesia yang
 * diakhiri titik dan tidak memuat titik lain di tengahnya (agar pemenggalan
 * kalimat tetap andal).
 *
 * Struktur: EFFECT_NARRATIVE[aspek] → { lead, body, closing }.
 */

export const EFFECT_ASPECTS = [
    "FIGURE_INFLUENCE",
    "ENDORSEMENT",
    "CONTINUITY_PERCEPTION",
    "GRASSROOTS_BASE",
    "DIGITAL_ECHO",
] as const

export type EffectAspect = (typeof EFFECT_ASPECTS)[number]

/** Judul aspek yang ditampilkan sebagai heading tiap paragraf analisis. */
export const EFFECT_ASPECT_TITLE: Record<EffectAspect, string> = {
    FIGURE_INFLUENCE: "Pengaruh Figur Jokowi",
    ENDORSEMENT: "Efek Dukungan dan Endorsement",
    CONTINUITY_PERCEPTION: "Persepsi Keberlanjutan Program",
    GRASSROOTS_BASE: "Basis Pendukung Akar Rumput",
    DIGITAL_ECHO: "Gaung Percakapan Digital",
}

export interface NarrativePool {
    lead: string[]
    body: string[]
    closing: string[]
}

export const EFFECT_NARRATIVE: Record<EffectAspect, NarrativePool> = {
    FIGURE_INFLUENCE: {
        lead: [
            "Analisis terbaru menunjukkan figur Jokowi masih menjadi variabel penting yang membentuk preferensi pemilih di sejumlah segmen kunci.",
            "Model prediksi mengindikasikan pengaruh sosok Jokowi dapat menggerakkan dukungan bila diterjemahkan ke dalam narasi kampanye yang tepat.",
            "Pemetaan data memperlihatkan efek Jokowi bekerja paling kuat pada pemilih yang menilai capaian pemerintahan secara positif.",
            "Rekomendasi sistem mengarahkan tim untuk membaca sejauh mana asosiasi dengan Jokowi menguntungkan posisi paslon di tiap wilayah.",
        ],
        body: [
            "Segmen pemilih yang puas terhadap kinerja pemerintahan cenderung lebih terbuka terhadap kandidat yang dipandang melanjutkan arah kebijakan Jokowi.",
            "Kedekatan simbolik dengan Jokowi dinilai menaikkan rasa aman pemilih terhadap stabilitas yang ditawarkan paslon.",
            "Wilayah dengan tingkat kepuasan tinggi terhadap program nasional memperlihatkan sensitivitas dukungan yang lebih besar terhadap faktor Jokowi.",
            "Penggunaan asosiasi figur perlu ditakar agar memperkuat citra tanpa menghapus identitas mandiri paslon.",
            "Pemilih rasional merespons lebih baik ketika pengaruh Jokowi dikaitkan dengan hasil konkret ketimbang sekadar kedekatan personal.",
            "Pemantauan reaksi publik membantu tim menilai kapan asosiasi figur menguatkan dan kapan justru menimbulkan resistensi.",
            "Penyelarasan pesan dengan capaian yang paling diapresiasi publik memperbesar peluang konversi simpati menjadi dukungan.",
        ],
        closing: [
            "Bila faktor figur dikelola cermat, pengaruh Jokowi berpeluang menjadi pengungkit elektoral yang stabil hingga hari pemungutan suara.",
            "Sistem menyarankan evaluasi berkala agar pemanfaatan efek Jokowi tetap proporsional dan tidak kontraproduktif.",
            "Fokus pada segmen yang paling responsif diyakini memberi dampak elektoral terbesar dengan risiko paling terkendali.",
            "Konsistensi dalam merawat asosiasi positif menjadi kunci menjaga momentum dukungan di pekan-pekan kritis.",
        ],
    },
    ENDORSEMENT: {
        lead: [
            "Evaluasi terhadap efek dukungan menunjukkan endorsement bernilai tinggi bila datang pada momen dan kanal yang tepat.",
            "Analisis sistem menemukan bahwa sinyal dukungan dari figur berpengaruh dapat mempercepat konsolidasi suara paslon.",
            "Rekomendasi mengarah pada pengelolaan endorsement secara terukur agar dampaknya optimal tanpa terkesan berlebihan.",
            "Data respons publik mengindikasikan dukungan yang otentik lebih persuasif dibanding pernyataan yang tampak transaksional.",
        ],
        body: [
            "Penempatan momen endorsement menjelang fase kritis kampanye dinilai memaksimalkan gaung di ruang publik.",
            "Dukungan yang disampaikan dengan narasi konkret lebih efektif dibanding pernyataan dukungan yang bersifat umum.",
            "Segmen pemilih mengambang merespons endorsement bila diikuti alasan rasional yang mudah dipahami.",
            "Keselarasan antara pemberi dukungan dan nilai yang diusung paslon memperkuat kredibilitas pesan.",
            "Endorsement dari tokoh yang relevan secara lokal dinilai lebih menggerakkan dibanding sekadar nama besar nasional.",
            "Pengukuran resonansi tiap dukungan membantu tim menilai mana yang benar-benar berdampak pada persepsi.",
            "Distribusi pesan dukungan lintas kanal memperluas jangkauan tanpa kehilangan konteks aslinya.",
        ],
        closing: [
            "Dengan pengelolaan endorsement yang cermat, dukungan strategis diperkirakan memperkuat momentum paslon secara konsisten.",
            "Sistem menyarankan pemetaan pemberi dukungan berdasarkan relevansi segmen sebelum diaktifkan.",
            "Otentisitas dukungan diyakini menjaga kepercayaan pemilih di tengah derasnya klaim kampanye.",
            "Penempatan momen yang tepat menjadi pembeda antara endorsement yang berdampak dan yang berlalu tanpa jejak.",
        ],
    },
    CONTINUITY_PERCEPTION: {
        lead: [
            "Telaah persepsi publik menunjukkan tema keberlanjutan program menjadi salah satu daya tarik utama yang menautkan paslon dengan capaian pemerintahan.",
            "Rekomendasi sistem menekankan pentingnya menautkan janji paslon dengan program yang telah dirasakan manfaatnya oleh publik.",
            "Analisis mengindikasikan pemilih menghargai kepastian arah kebijakan ketika kandidat dipandang melanjutkan program yang berhasil.",
            "Pemetaan opini memperlihatkan narasi keberlanjutan paling kuat di wilayah yang merasakan dampak langsung program nasional.",
        ],
        body: [
            "Penegasan komitmen melanjutkan program populer disarankan agar pemilih memperoleh gambaran arah yang jelas.",
            "Penyertaan bukti manfaat konkret dinilai memperkuat kredibilitas klaim keberlanjutan di mata pemilih kritis.",
            "Penyesuaian narasi dengan program yang paling diapresiasi di tiap daerah membuat pesan terasa relevan.",
            "Keseimbangan antara melanjutkan dan menawarkan pembaruan penting agar paslon tidak terlihat sekadar penerus pasif.",
            "Komunikasi dampak langsung bagi keluarga penerima manfaat dinilai paling efektif mengunci dukungan.",
            "Konsistensi antara janji keberlanjutan dan rekam jejak memperkuat keyakinan pemilih terhadap kemampuan eksekusi.",
            "Penyederhanaan penjelasan kebijakan membantu publik memahami mengapa keberlanjutan menguntungkan mereka.",
        ],
        closing: [
            "Narasi keberlanjutan yang meyakinkan diyakini menjadi jembatan antara capaian pemerintahan dan dukungan terhadap paslon.",
            "Sistem menyarankan uji resonansi tema keberlanjutan sebelum diangkat sebagai isu utama kampanye.",
            "Kejelasan komitmen diharapkan mengubah kepuasan atas program menjadi keyakinan elektoral yang kokoh.",
            "Relevansi tema terhadap kebutuhan warga menjadi kunci menjaga daya tariknya hingga akhir kampanye.",
        ],
    },
    GRASSROOTS_BASE: {
        lead: [
            "Pemetaan basis akar rumput mengungkap potensi loyalitas pendukung yang selama ini terafiliasi dengan figur Jokowi.",
            "Analisis sistem merekomendasikan penguatan kanal ke basis pendukung agar efek Jokowi tersalurkan hingga tingkat komunitas.",
            "Data lapangan menunjukkan soliditas basis akar rumput menjadi faktor penting yang memperkuat mobilisasi suara paslon.",
            "Rekomendasi mengarah pada perawatan basis pendukung agar antusiasme tidak menurun menjelang hari pemilihan.",
        ],
        body: [
            "Penguatan komunikasi dengan simpul komunitas disarankan agar pesan keberlanjutan tersampaikan tanpa distorsi.",
            "Pelibatan tokoh lokal yang dihormati dinilai memperpendek jarak antara paslon dan pemilih akar rumput.",
            "Pemetaan wilayah dengan basis pendukung kuat membantu memfokuskan energi mobilisasi secara efisien.",
            "Pemberian ruang partisipasi bagi pendukung dapat menjaga rasa memiliki terhadap kemenangan bersama.",
            "Pemanfaatan jejaring komunitas mempercepat penyebaran narasi positif secara organik.",
            "Sinergi dengan kelompok penerima manfaat program dinilai memperkuat legitimasi kampanye di mata warga.",
            "Pemantauan dinamika lapangan membantu tim menilai efektivitas mobilisasi secara objektif.",
        ],
        closing: [
            "Basis akar rumput yang solid diyakini menjadi tulang punggung penyaluran efek Jokowi pada hari pemilihan.",
            "Sistem menyarankan evaluasi cakupan basis pendukung secara berkala agar tidak ada wilayah yang terabaikan.",
            "Perawatan antusiasme pendukung diharapkan meningkatkan konversi loyalitas menjadi partisipasi nyata.",
            "Koordinasi yang rapi menjadi pembeda antara dukungan pasif dan mobilisasi yang terkelola dengan baik.",
        ],
    },
    DIGITAL_ECHO: {
        lead: [
            "Pemantauan ruang digital menyoroti bagaimana percakapan seputar Jokowi turut membentuk persepsi publik terhadap paslon.",
            "Analisis sistem menemukan sejumlah percakapan daring yang mengaitkan capaian pemerintahan dengan pilihan elektoral.",
            "Rekomendasi mengarah pada penguatan tata kelola narasi digital agar gaung positif tidak tenggelam oleh isu negatif.",
            "Data sentimen daring mengindikasikan peluang memperkuat citra paslon melalui konten yang menautkan keberhasilan program.",
        ],
        body: [
            "Pemantauan sentimen secara berkala disarankan agar isu terkait figur Jokowi dapat diantisipasi sebelum meluas.",
            "Penyediaan klarifikasi cepat berbasis fakta dinilai efektif meredam penyebaran informasi keliru.",
            "Produksi konten yang menautkan manfaat program dengan sosok paslon membantu menyeimbangkan percakapan digital.",
            "Kolaborasi dengan pegiat media sosial dapat memperluas jangkauan pesan secara organik.",
            "Pemetaan kanal dengan pengaruh terbesar membantu tim memfokuskan energi pada titik yang paling menentukan.",
            "Penguatan literasi tim digital penting untuk membedakan percakapan genuin dari serangan terkoordinasi.",
            "Respons proporsional terhadap kritik daring membantu menjaga citra paslon tetap dewasa dan terbuka.",
        ],
        closing: [
            "Pengelolaan gaung digital yang cekatan diyakini melindungi asosiasi positif paslon dari gejolak informasi yang tidak terkendali.",
            "Sistem menyarankan pembaruan strategi konten mengikuti pergeseran tren percakapan daring.",
            "Kesiapan menghadapi dinamika digital menjadi faktor krusial dalam menjaga stabilitas dukungan.",
            "Narasi positif yang terjaga diharapkan memperkuat kepercayaan publik hingga masa akhir kampanye.",
        ],
    },
}
