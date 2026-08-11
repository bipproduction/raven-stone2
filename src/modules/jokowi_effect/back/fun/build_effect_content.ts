import {
    EFFECT_ASPECT_TITLE,
    EFFECT_ASPECTS,
    EFFECT_NARRATIVE,
    EffectAspect,
    NarrativePool,
} from "./effect_phrases"

/**
 * Builder konten Jokowi Effect dummy: satu dokumen analisis "Strength Analysis
 * Improvement". Dokumen dirangkai dari beberapa aspek efek Jokowi (pengaruh
 * figur, endorsement, persepsi keberlanjutan, basis akar rumput, gaung digital);
 * tiap aspek menjadi satu paragraf HTML <p> bergaya berita yang dibuka satu
 * kalimat lead, diisi beberapa kalimat body, lalu ditutup satu kalimat closing.
 * Panjang tiap paragraf bervariasi (minimal MIN_SENTENCES_PER_ASPECT kalimat)
 * agar terbaca seperti teks panjang, dan berbeda tiap kali generate. Paragraf
 * digabung dengan newline karena front view memenggal konten per baris untuk
 * animasi ketik.
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
 * Bangun satu paragraf aspek Jokowi Effect: <p> HTML bergaya berita yang diawali
 * judul aspek (dicetak tebal), lalu satu kalimat lead, beberapa kalimat body acak
 * (unik), dan satu kalimat closing. Jumlah kalimat total bervariasi namun minimal
 * MIN_SENTENCES_PER_ASPECT.
 * @param aspect aspek analisis Jokowi Effect.
 * @param random sumber angka acak [0,1) (default Math.random) — diinjeksi untuk test.
 */
export function buildEffectAspectParagraph(
    aspect: EffectAspect,
    random: () => number = Math.random,
): string {
    const pool = EFFECT_NARRATIVE[aspect]
    const lead = pickRandom(pool.lead, 1, random)
    const body = pickRandom(pool.body, pickBodyCount(pool, random), random)
    const closing = pickRandom(pool.closing, 1, random)
    const sentences = [...lead, ...body, ...closing]
    const paragraph = sentences.map((s) => escapeHtml(s)).join(" ")
    const title = escapeHtml(EFFECT_ASPECT_TITLE[aspect])
    return `<p><strong>${title}.</strong> ${paragraph}</p>`
}

/**
 * Bangun satu dokumen konten Jokowi Effect utuh: gabungan paragraf dari SELURUH
 * aspek (EFFECT_ASPECTS), dipisah newline agar front view dapat memenggalnya per
 * baris untuk animasi ketik. Isi berbeda tiap generate.
 * @param random sumber angka acak [0,1) (default Math.random) — diinjeksi untuk test.
 */
export function buildEffectContent(random: () => number = Math.random): string {
    return EFFECT_ASPECTS.map((aspect) => buildEffectAspectParagraph(aspect, random)).join("\n")
}
