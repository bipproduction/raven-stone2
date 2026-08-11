/**
 * Helper penghasil nilai rate popularity.
 *
 * rate = persentase popularitas (0-100%), INDEPENDEN per paslon — tidak dijumlahkan
 * menjadi 100%. Tiap paslon mendapat base rate acak sendiri per generate, lalu tiap
 * tanggal berfluktuasi wajar di sekitar base itu (berbeda tiap tanggal, berbeda tiap
 * generate ulang) sehingga garis rate terlihat naik-turun secara wajar, bukan melompat
 * acak dari 0 ke 100.
 */

/** Batas bawah/atas nilai rate yang valid (persen). */
export const RATE_MIN = 0
export const RATE_MAX = 100

/** Rentang base rate acak per paslon per generate. */
export const BASE_MIN = 20
export const BASE_MAX = 80

/** Amplitudo fluktuasi wajar per tanggal di sekitar base rate (persen poin). */
export const DATE_FLUCTUATION = 8

/** Batasi nilai rate ke rentang 0-100. */
export function clampRate(value: number): number {
    return Math.max(RATE_MIN, Math.min(RATE_MAX, value))
}

/** Bulatkan rate ke 1 desimal. */
export function roundRate(value: number): number {
    return Math.round(value * 10) / 10
}

/**
 * Base rate acak per paslon per generate, independen antar paslon.
 * @param random sumber angka acak [0,1) (default Math.random) — diinjeksi untuk test.
 */
export function makeBaseRate(random: () => number = Math.random): number {
    return BASE_MIN + random() * (BASE_MAX - BASE_MIN)
}

/**
 * Rate untuk satu tanggal: base + fluktuasi wajar (±DATE_FLUCTUATION), dibatasi 0-100.
 * @param base base rate paslon tersebut.
 * @param random sumber angka acak [0,1) (default Math.random) — diinjeksi untuk test.
 */
export function makeDateRate(base: number, random: () => number = Math.random): number {
    const swing = (random() * 2 - 1) * DATE_FLUCTUATION
    return roundRate(clampRate(base + swing))
}
