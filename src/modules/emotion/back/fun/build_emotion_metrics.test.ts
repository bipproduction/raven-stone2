import { describe, expect, it } from "vitest"
import {
    buildEmotionMetrics,
    EMOTION_METRICS,
    makeSentimentBias,
    METRIC_MAX,
    METRIC_MIN,
    MIN_AUDIENCE,
    NEGATIVE_METRICS,
    POSITIVE_METRICS,
} from "./build_emotion_metrics"

function totalOf(metrics: Record<string, number>) {
    return EMOTION_METRICS.reduce((sum, m) => sum + metrics[m], 0)
}

function lcg(seed: number) {
    let n = seed
    return () => (n = (n * 1664525 + 1013904223) % 4294967296) / 4294967296
}

/** Agregasi bucket seperti pada visualisasi emotional spectrum, lintas banyak wilayah. */
function aggregateShare(bias: any, random: () => number, regions = 400) {
    const sum = Object.fromEntries(EMOTION_METRICS.map((m) => [m, 0])) as Record<string, number>
    for (let i = 0; i < regions; i++) {
        const audience = 5_000 + Math.floor(random() * 500_000)
        const m = buildEmotionMetrics({ audience, random, bias })!
        for (const k of EMOTION_METRICS) sum[k] += m[k]
    }
    const pos = POSITIVE_METRICS.reduce((s, m) => s + sum[m], 0)
    const neg = NEGATIVE_METRICS.reduce((s, m) => s + sum[m], 0)
    const neu = sum.undecided
    const total = pos + neg + neu
    return { pos: (pos / total) * 100, neu: (neu / total) * 100, neg: (neg / total) * 100 }
}

describe("buildEmotionMetrics", () => {
    it("mengisi seluruh metrik emotion", () => {
        const result = buildEmotionMetrics({ audience: 500_000 })!
        expect(Object.keys(result).sort()).toEqual([...EMOTION_METRICS].sort())
    })

    it("setiap nilai berada di rentang 3 sampai 4 digit", () => {
        for (const audience of [MIN_AUDIENCE, 6_780, 50_000, 343_959, 3_390_029]) {
            for (let i = 0; i < 200; i++) {
                const result = buildEmotionMetrics({ audience })!
                for (const metric of EMOTION_METRICS) {
                    expect(result[metric]).toBeGreaterThanOrEqual(METRIC_MIN)
                    expect(result[metric]).toBeLessThanOrEqual(METRIC_MAX)
                    expect(Number.isInteger(result[metric])).toBe(true)
                }
            }
        }
    })

    it("total seluruh metrik tidak melebihi audience", () => {
        for (const audience of [MIN_AUDIENCE, MIN_AUDIENCE + 1, 6_780, 20_000, 3_390_029]) {
            for (let i = 0; i < 200; i++) {
                expect(totalOf(buildEmotionMetrics({ audience })!)).toBeLessThanOrEqual(audience)
            }
        }
    })

    it("mengembalikan null jika audience lebih kecil dari total minimum", () => {
        expect(buildEmotionMetrics({ audience: MIN_AUDIENCE - 1 })).toBeNull()
        expect(buildEmotionMetrics({ audience: 0 })).toBeNull()
        expect(buildEmotionMetrics({ audience: Number.NaN })).toBeNull()
    })

    it("mengisi nilai minimum saat audience tepat di batas bawah", () => {
        const result = buildEmotionMetrics({ audience: MIN_AUDIENCE })!
        for (const metric of EMOTION_METRICS) {
            expect(result[metric]).toBe(METRIC_MIN)
        }
    })

    it("tidak melebihi batas 4 digit walau audience sangat besar", () => {
        const result = buildEmotionMetrics({ audience: 1_000_000_000, random: () => 0.999999 })!
        expect(totalOf(result)).toBe(METRIC_MAX * EMOTION_METRICS.length)
    })

    it("deterministik untuk sumber acak yang sama", () => {
        const seeded = () => {
            let n = 0
            return () => ((n = (n * 1664525 + 1013904223) % 4294967296) / 4294967296)
        }
        const a = buildEmotionMetrics({ audience: 100_000, random: seeded() })
        const b = buildEmotionMetrics({ audience: 100_000, random: seeded() })
        expect(a).toEqual(b)
    })

    it("bias tetap menjaga seluruh invarian (rentang & total)", () => {
        const bias = makeSentimentBias(1)
        for (const audience of [MIN_AUDIENCE, 6_780, 50_000, 3_390_029]) {
            for (let i = 0; i < 200; i++) {
                const result = buildEmotionMetrics({ audience, bias })!
                expect(totalOf(result)).toBeLessThanOrEqual(audience)
                for (const metric of EMOTION_METRICS) {
                    expect(result[metric]).toBeGreaterThanOrEqual(METRIC_MIN)
                    expect(result[metric]).toBeLessThanOrEqual(METRIC_MAX)
                    expect(Number.isInteger(result[metric])).toBe(true)
                }
            }
        }
    })
})

describe("makeSentimentBias", () => {
    it("swing 0 menghasilkan bias netral (semua eksponen 1)", () => {
        const bias = makeSentimentBias(0)
        for (const metric of [...POSITIVE_METRICS, ...NEGATIVE_METRICS]) {
            expect(bias[metric]).toBeCloseTo(1, 10)
        }
    })

    it("swing positif menaikkan POSITIVE dan menurunkan NEGATIVE (eksponen berlawanan arah)", () => {
        const bias = makeSentimentBias(1)
        for (const metric of POSITIVE_METRICS) expect(bias[metric]!).toBeLessThan(1)
        for (const metric of NEGATIVE_METRICS) expect(bias[metric]!).toBeGreaterThan(1)
    })

    it("swing di luar [-1,1] di-clamp", () => {
        expect(makeSentimentBias(5)).toEqual(makeSentimentBias(1))
        expect(makeSentimentBias(-5)).toEqual(makeSentimentBias(-1))
    })

    it("bias positif menaikkan persentase agregat POSITIVE dibanding negatif", () => {
        const posShare = aggregateShare(makeSentimentBias(1), lcg(42))
        const negShare = aggregateShare(makeSentimentBias(-1), lcg(42))
        expect(posShare.pos).toBeGreaterThan(negShare.pos)
        expect(posShare.neg).toBeLessThan(negShare.neg)
    })

    it("selisih agregat antar profil halus (±4-6%) dan NEUTRAL tetap ~12-13%", () => {
        const pos = aggregateShare(makeSentimentBias(1), lcg(7))
        const neu = aggregateShare(makeSentimentBias(0), lcg(7))
        const neg = aggregateShare(makeSentimentBias(-1), lcg(7))
        // Rentang swing positif->negatif untuk POSITIVE berada di kisaran ~8-12 poin (halus).
        expect(pos.pos - neg.pos).toBeGreaterThan(3)
        expect(pos.pos - neg.pos).toBeLessThan(14)
        // NEUTRAL harus stabil di sekitar 12-13% pada semua profil.
        for (const share of [pos, neu, neg]) {
            expect(share.neu).toBeGreaterThan(11)
            expect(share.neu).toBeLessThan(14)
        }
    })
})
