import { describe, expect, it } from "vitest"
import {
    buildEmotionMetrics,
    EMOTION_METRICS,
    METRIC_MAX,
    METRIC_MIN,
    MIN_AUDIENCE,
} from "./build_emotion_metrics"

function totalOf(metrics: Record<string, number>) {
    return EMOTION_METRICS.reduce((sum, m) => sum + metrics[m], 0)
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
})
