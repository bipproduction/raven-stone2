import { SWOT_PHRASES, SwotCategory } from "./swot_phrases"

/**
 * Builder konten SWOT dummy: memilih beberapa frasa acak dari pool kategori
 * lalu merangkainya menjadi HTML bullet list (sesuai format rich text editor
 * yang dipakai form Add SWOT). Berbeda tiap generate karena pemilihan acak.
 */

/** Jumlah minimum & maksimum poin per kategori. */
export const MIN_POINTS = 2
export const MAX_POINTS = 4

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

/** Escape karakter HTML agar konten aman disisipkan ke markup list. */
export function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

/**
 * Bangun konten HTML SWOT untuk satu kategori: 2-4 poin acak sebagai bullet list.
 * @param category kategori SWOT.
 * @param random sumber angka acak [0,1) (default Math.random) — diinjeksi untuk test.
 */
export function buildSwotContent(category: SwotCategory, random: () => number = Math.random): string {
    const pool = SWOT_PHRASES[category]
    const span = MAX_POINTS - MIN_POINTS + 1
    const count = MIN_POINTS + Math.floor(random() * span)
    const points = pickRandom(pool, count, random)
    const items = points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")
    return `<ul>${items}</ul>`
}
