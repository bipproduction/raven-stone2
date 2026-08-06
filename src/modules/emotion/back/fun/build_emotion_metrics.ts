/**
 * Nama kolom metrik emotion pada tabel CandidateEmotion.
 */
export const EMOTION_METRICS = [
    "confidence",
    "supportive",
    "positive",
    "undecided",
    "unsupportive",
    "uncomfortable",
    "negative",
    "dissapproval",
] as const

export type EmotionMetric = (typeof EMOTION_METRICS)[number]
export type EmotionMetricValues = Record<EmotionMetric, number>

/** Batas nilai per metrik: 3 sampai 4 digit. */
export const METRIC_MIN = 100
export const METRIC_MAX = 9999

/** Total minimum yang harus bisa ditampung audience agar semua metrik tetap 3 digit. */
export const MIN_AUDIENCE = METRIC_MIN * EMOTION_METRICS.length

/**
 * Membangun satu set nilai metrik emotion acak untuk satu wilayah.
 * Setiap metrik bernilai 3-4 digit dan total seluruh metrik tidak melebihi audience wilayah.
 * Mengembalikan null jika audience terlalu kecil untuk menampung nilai 3 digit di semua metrik.
 */
export function buildEmotionMetrics({
    audience,
    random = Math.random,
}: {
    audience: number
    random?: () => number
}): EmotionMetricValues | null {
    if (!Number.isFinite(audience) || audience < MIN_AUDIENCE) return null

    // Urutan diacak supaya sisa budget tidak selalu habis di metrik yang sama.
    const order = shuffle([...EMOTION_METRICS], random)

    let budget = Math.min(Math.floor(audience), METRIC_MAX * EMOTION_METRICS.length)
    const result = {} as EmotionMetricValues

    order.forEach((metric, index) => {
        const metricsLeft = order.length - index - 1
        const upper = Math.min(METRIC_MAX, budget - METRIC_MIN * metricsLeft)
        const value = METRIC_MIN + Math.floor(random() * (upper - METRIC_MIN + 1))
        result[metric] = value
        budget -= value
    })

    return result
}

function shuffle<T>(items: T[], random: () => number): T[] {
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1))
        const tmp = items[i]
        items[i] = items[j]
        items[j] = tmp
    }
    return items
}
