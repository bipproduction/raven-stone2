import { SWOT_SENTENCES, SwotCategory } from "./swot_phrases"

/**
 * Builder konten SWOT dummy: tiap "value" adalah satu paragraf berisi tepat
 * SENTENCES_PER_VALUE kalimat acak dari pool kategori, dirender sebagai HTML
 * <p> (sesuai format rich text editor form Add SWOT). Tiap kategori diisi
 * VALUES_PER_CATEGORY value yang berbeda. Berbeda tiap generate karena acak.
 */

/** Jumlah kalimat dalam satu value (paragraf). */
export const SENTENCES_PER_VALUE = 3

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

/** Escape karakter HTML agar konten aman disisipkan ke markup. */
export function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

/**
 * Bangun satu value SWOT: paragraf HTML berisi tepat SENTENCES_PER_VALUE kalimat
 * acak (unik) dari pool kategori, digabung dengan spasi menjadi satu paragraf.
 * @param category kategori SWOT.
 * @param random sumber angka acak [0,1) (default Math.random) — diinjeksi untuk test.
 */
export function buildSwotValue(category: SwotCategory, random: () => number = Math.random): string {
    const sentences = pickRandom(SWOT_SENTENCES[category], SENTENCES_PER_VALUE, random)
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
