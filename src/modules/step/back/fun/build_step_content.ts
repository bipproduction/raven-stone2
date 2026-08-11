import { NarrativePool, STEP_NARRATIVE, StepCategory, StepSentiment } from "./step_phrases"

/**
 * Builder konten STEP dummy: tiap "value" adalah satu paragraf bergaya berita
 * yang dirangkai dari pool kalimat kategori & sentimen — dibuka satu kalimat
 * lead, diisi beberapa kalimat body, lalu ditutup satu kalimat closing.
 * Panjangnya bervariasi (minimal MIN_SENTENCES_PER_VALUE kalimat) agar terbaca
 * seperti teks panjang. Dirender sebagai HTML <p> (sesuai format rich text
 * editor form Add Step). Tiap pasangan kategori-sentimen diisi
 * VALUES_PER_SENTIMENT value yang berbeda; berbeda tiap generate.
 */

/** Jumlah minimal kalimat dalam satu value (paragraf). */
export const MIN_SENTENCES_PER_VALUE = 3

/** Jumlah maksimal kalimat dalam satu value (paragraf). */
export const MAX_SENTENCES_PER_VALUE = 6

/** Jumlah value (baris) yang dibuat per pasangan kategori-sentimen. */
export const VALUES_PER_SENTIMENT = 2

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
 * berada di rentang [MIN_SENTENCES_PER_VALUE, MAX_SENTENCES_PER_VALUE], dengan
 * tetap dibatasi jumlah kalimat body yang tersedia di pool.
 */
export function pickBodyCount(pool: NarrativePool, random: () => number = Math.random): number {
    // Total = 1 (lead) + body + 1 (closing) → body = total - 2.
    const minBody = Math.max(1, MIN_SENTENCES_PER_VALUE - 2)
    const maxBody = Math.min(MAX_SENTENCES_PER_VALUE - 2, pool.body.length)
    if (maxBody <= minBody) return Math.max(minBody, maxBody)
    return randomInt(minBody, maxBody, random)
}

/**
 * Bangun satu value STEP: paragraf HTML bergaya berita yang merangkai satu
 * kalimat lead, beberapa kalimat body acak (unik), dan satu kalimat closing.
 * Jumlah kalimat total bervariasi namun minimal MIN_SENTENCES_PER_VALUE.
 * @param category kategori step.
 * @param sentiment sentimen step (1 positive, 2 negative).
 * @param random sumber angka acak [0,1) (default Math.random) — diinjeksi untuk test.
 */
export function buildStepValue(
    category: StepCategory,
    sentiment: StepSentiment,
    random: () => number = Math.random,
): string {
    const pool = STEP_NARRATIVE[category][sentiment]
    const lead = pickRandom(pool.lead, 1, random)
    const body = pickRandom(pool.body, pickBodyCount(pool, random), random)
    const closing = pickRandom(pool.closing, 1, random)
    const sentences = [...lead, ...body, ...closing]
    const paragraph = sentences.map((s) => escapeHtml(s)).join(" ")
    return `<p>${paragraph}</p>`
}

/**
 * Bangun VALUES_PER_SENTIMENT value untuk satu pasangan kategori-sentimen
 * (mis. 2 paragraf terpisah), masing-masing dikembalikan sebagai string HTML
 * tersendiri (satu value = satu baris DB).
 * @param category kategori step.
 * @param sentiment sentimen step (1 positive, 2 negative).
 * @param random sumber angka acak [0,1) (default Math.random) — diinjeksi untuk test.
 */
export function buildStepValues(
    category: StepCategory,
    sentiment: StepSentiment,
    random: () => number = Math.random,
): string[] {
    const values: string[] = []
    for (let i = 0; i < VALUES_PER_SENTIMENT; i++) {
        values.push(buildStepValue(category, sentiment, random))
    }
    return values
}
