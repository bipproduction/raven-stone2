import {
    MLAI_ASPECT_TITLE,
    MLAI_ASPECTS,
    MLAI_NARRATIVE,
    MlaiAspect,
    NarrativePool,
} from "./mlai_phrases"

/**
 * Builder konten ML-AI dummy: satu dokumen rekomendasi "Strength Analysis
 * Improvement" per paslon. Dokumen dirangkai dari beberapa aspek strategis
 * (elektabilitas, komunikasi publik, program kerja, jaringan relawan, isu
 * digital); tiap aspek menjadi satu paragraf HTML <p> bergaya berita yang
 * dibuka satu kalimat lead, diisi beberapa kalimat body, lalu ditutup satu
 * kalimat closing. Panjang tiap paragraf bervariasi (minimal
 * MIN_SENTENCES_PER_ASPECT kalimat) agar terbaca seperti teks panjang, dan
 * berbeda tiap kali generate. Paragraf digabung dengan newline karena front
 * view memenggal konten per baris untuk animasi ketik.
 */

/** Jumlah minimal kalimat dalam satu paragraf aspek. */
export const MIN_SENTENCES_PER_ASPECT = 3

/** Jumlah maksimal kalimat dalam satu paragraf aspek. */
export const MAX_SENTENCES_PER_ASPECT = 6

/** Ambil n elemen acak unik dari array (Fisher-Yates parsial). */
export function pickRandom<T>(items: T[], n: number, random: () => number = Math.random): T[] {
    const pool = [...items]
    const count = Math.max(0, Math.min(n, pool.length))
    for (let i = 0; i < count; i++) {
        const j = i + Math.floor(random() * (pool.length - i))
        const tmp = pool[i]
        pool[i] = pool[j]
        pool[j] = tmp
    }
    return pool.slice(0, count)
}

/** Bilangan bulat acak dalam rentang [min, max] (inklusif). */
export function randomInt(min: number, max: number, random: () => number = Math.random): number {
    const lo = Math.ceil(min)
    const hi = Math.floor(max)
    return lo + Math.floor(random() * (hi - lo + 1))
}

/** Escape karakter HTML agar konten aman disisipkan ke markup. */
export function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

/**
 * Tentukan jumlah kalimat body agar total kalimat (1 lead + body + 1 closing)
 * berada di rentang [MIN_SENTENCES_PER_ASPECT, MAX_SENTENCES_PER_ASPECT], dengan
 * tetap dibatasi jumlah kalimat body yang tersedia di pool.
 */
export function pickBodyCount(pool: NarrativePool, random: () => number = Math.random): number {
    // Total = 1 (lead) + body + 1 (closing) → body = total - 2.
    const minBody = Math.max(1, MIN_SENTENCES_PER_ASPECT - 2)
    const maxBody = Math.min(MAX_SENTENCES_PER_ASPECT - 2, pool.body.length)
    if (maxBody <= minBody) return Math.max(minBody, maxBody)
    return randomInt(minBody, maxBody, random)
}

/**
 * Bangun satu paragraf aspek ML-AI: <p> HTML bergaya berita yang diawali judul
 * aspek (dicetak tebal), lalu satu kalimat lead, beberapa kalimat body acak
 * (unik), dan satu kalimat closing. Jumlah kalimat total bervariasi namun
 * minimal MIN_SENTENCES_PER_ASPECT.
 * @param aspect aspek strategis ML-AI.
 * @param random sumber angka acak [0,1) (default Math.random) — diinjeksi untuk test.
 */
export function buildMlaiAspectParagraph(
    aspect: MlaiAspect,
    random: () => number = Math.random,
): string {
    const pool = MLAI_NARRATIVE[aspect]
    const lead = pickRandom(pool.lead, 1, random)
    const body = pickRandom(pool.body, pickBodyCount(pool, random), random)
    const closing = pickRandom(pool.closing, 1, random)
    const sentences = [...lead, ...body, ...closing]
    const paragraph = sentences.map((s) => escapeHtml(s)).join(" ")
    const title = escapeHtml(MLAI_ASPECT_TITLE[aspect])
    return `<p><strong>${title}.</strong> ${paragraph}</p>`
}

/**
 * Bangun satu dokumen konten ML-AI utuh untuk satu paslon: gabungan paragraf
 * dari SELURUH aspek (MLAI_ASPECTS), dipisah newline agar front view dapat
 * memenggalnya per baris untuk animasi ketik. Isi berbeda tiap generate.
 * @param random sumber angka acak [0,1) (default Math.random) — diinjeksi untuk test.
 */
export function buildMlaiContent(random: () => number = Math.random): string {
    return MLAI_ASPECTS.map((aspect) => buildMlaiAspectParagraph(aspect, random)).join("\n")
}
