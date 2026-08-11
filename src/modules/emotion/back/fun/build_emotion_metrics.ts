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
/** Bias per metrik berupa eksponen: >1 menekan nilai ke bawah, <1 menaikkan ke atas, 1 = netral. */
export type EmotionBias = Partial<Record<EmotionMetric, number>>

/** Batas nilai per metrik: 3 sampai 4 digit. */
export const METRIC_MIN = 100
export const METRIC_MAX = 9999

/** Total minimum yang harus bisa ditampung audience agar semua metrik tetap 3 digit. */
export const MIN_AUDIENCE = METRIC_MIN * EMOTION_METRICS.length

/** Metrik yang membentuk bucket POSITIVE pada visualisasi emotional spectrum. */
export const POSITIVE_METRICS: EmotionMetric[] = ["confidence", "supportive", "positive"]
/** Metrik yang membentuk bucket NEGATIVE pada visualisasi emotional spectrum. */
export const NEGATIVE_METRICS: EmotionMetric[] = ["unsupportive", "uncomfortable", "negative", "dissapproval"]

/**
 * Kekuatan skew profil sentimen. Dipilih 1.2 agar selisih persentase agregat
 * antar paslon halus (~±4-6%) sambil menjaga bucket NEUTRAL tetap ~12-13%.
 */
export const BIAS_STRENGTH = 1.2

/**
 * Membuat bias sentimen dari satu nilai swing di rentang [-1, 1].
 * swing > 0 mencondongkan agregat ke POSITIVE, swing < 0 ke NEGATIVE, 0 = netral.
 * Bucket NEUTRAL (undecided) tidak diubah supaya proporsinya stabil.
 */
export function makeSentimentBias(swing: number): EmotionBias {
    const clamped = Math.max(-1, Math.min(1, swing))
    const w = Math.pow(BIAS_STRENGTH, clamped)
    const bias: EmotionBias = {}
    for (const metric of POSITIVE_METRICS) bias[metric] = 1 / w
    for (const metric of NEGATIVE_METRICS) bias[metric] = w
    return bias
}

/**
 * Membangun satu set nilai metrik emotion acak untuk satu wilayah.
 * Setiap metrik bernilai 3-4 digit dan total seluruh metrik tidak melebihi audience wilayah.
 * Mengembalikan null jika audience terlalu kecil untuk menampung nilai 3 digit di semua metrik.
 */
export function buildEmotionMetrics({
    audience,
    random = Math.random,
    bias,
}: {
    audience: number
    random?: () => number
    /** Skew per metrik (eksponen). Tanpa bias, semua metrik memakai distribusi seragam yang sama. */
    bias?: EmotionBias
}): EmotionMetricValues | null {
    if (!Number.isFinite(audience) || audience < MIN_AUDIENCE) return null

    // Urutan diacak supaya sisa budget tidak selalu habis di metrik yang sama.
    const order = shuffle([...EMOTION_METRICS], random)

    let budget = Math.min(Math.floor(audience), METRIC_MAX * EMOTION_METRICS.length)
    const result = {} as EmotionMetricValues

    order.forEach((metric, index) => {
        const metricsLeft = order.length - index - 1
        const upper = Math.min(METRIC_MAX, budget - METRIC_MIN * metricsLeft)
        // Eksponen bias membengkokkan distribusi seragam: exp>1 menggeser nilai ke bawah,
        // exp<1 ke atas. Tanpa bias exp=1 sehingga perilaku tetap seragam seperti semula.
        const exp = bias?.[metric] ?? 1
        const frac = exp === 1 ? random() : Math.pow(random(), exp)
        const value = METRIC_MIN + Math.floor(frac * (upper - METRIC_MIN + 1))
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
