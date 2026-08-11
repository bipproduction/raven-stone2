import { NarrativePool, SWOT_NARRATIVE, SwotCategory } from "./swot_phrases"

/**
 * Builder konten SWOT dummy: tiap "value" adalah satu paragraf bergaya berita
 * yang dirangkai dari pool kalimat kategori — dibuka satu kalimat lead, diisi
 * beberapa kalimat body, lalu ditutup satu kalimat closing. Panjangnya bervariasi
 * (minimal MIN_SENTENCES_PER_VALUE kalimat) agar terbaca seperti teks panjang.
 * Dirender sebagai HTML <p> (sesuai format rich text editor form Add SWOT).
 * Tiap kategori diisi VALUES_PER_CATEGORY value yang berbeda; berbeda tiap generate.
 */

/** Jumlah minimal kalimat dalam satu value (paragraf). */
export const MIN_SENTENCES_PER_VALUE = 3

/** Jumlah maksimal kalimat dalam satu value (paragraf). */
export const MAX_SENTENCES_PER_VALUE = 6

/** Jumlah value (baris) yang dibuat per kategori. */
export const VALUES_PER_CATEGORY = 3

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
 * Bangun satu value SWOT: paragraf HTML bergaya berita yang merangkai satu
 * kalimat lead, beberapa kalimat body acak (unik), dan satu kalimat closing.
 * Jumlah kalimat total bervariasi namun minimal MIN_SENTENCES_PER_VALUE.
 * @param category kategori SWOT.
 * @param random sumber angka acak [0,1) (default Math.random) — diinjeksi untuk test.
 */
export function buildSwotValue(category: SwotCategory, random: () => number = Math.random): string {
    const pool = SWOT_NARRATIVE[category]
    const lead = pickRandom(pool.lead, 1, random)
    const body = pickRandom(pool.body, pickBodyCount(pool, random), random)
    const closing = pickRandom(pool.closing, 1, random)
    const sentences = [...lead, ...body, ...closing]
    const paragraph = sentences.map((s) => escapeHtml(s)).join(" ")
    return `<p>${paragraph}</p>`
}

/**
 * Bangun VALUES_PER_CATEGORY value untuk satu kategori (mis. 3 paragraf terpisah),
 * masing-masing dikembalikan sebagai string HTML tersendiri (satu value = satu baris DB).
 * @param category kategori SWOT.
 * @param random sumber angka acak [0,1) (default Math.random) — diinjeksi untuk test.
 */
export function buildSwotValues(category: SwotCategory, random: () => number = Math.random): string[] {
    const values: string[] = []
    for (let i = 0; i < VALUES_PER_CATEGORY; i++) {
        values.push(buildSwotValue(category, random))
    }
    return values
}
