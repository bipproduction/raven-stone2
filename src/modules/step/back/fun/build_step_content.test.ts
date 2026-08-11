import { describe, expect, it } from "vitest"
import {
    buildStepValue,
    buildStepValues,
    escapeHtml,
    MAX_SENTENCES_PER_VALUE,
    MIN_SENTENCES_PER_VALUE,
    pickRandom,
    randomInt,
    VALUES_PER_SENTIMENT,
} from "./build_step_content"
import { STEP_CATEGORIES, STEP_NARRATIVE, STEP_SENTIMENTS, StepCategory, StepSentiment } from "./step_phrases"

/** LCG deterministik untuk test yang butuh urutan acak yang bisa direproduksi. */
function lcg(seed: number) {
    let state = seed >>> 0
    return () => {
        state = (state * 1664525 + 1013904223) >>> 0
        return state / 0x100000000
    }
}

/** Ambil teks paragraf dari satu value HTML <p>...</p>. */
function paragraphText(html: string) {
    const m = html.match(/^<p>([\s\S]*)<\/p>$/)
    return m ? m[1] : ""
}

/** Pisah paragraf menjadi kalimat (berakhir titik). */
function splitSentences(text: string) {
    return text.split(/(?<=\.)\s+/).filter((s) => s.trim().length > 0)
}

/** Semua kalimat yang valid untuk satu pasangan kategori-sentimen. */
function allSentences(cat: StepCategory, sentiment: StepSentiment) {
    const pool = STEP_NARRATIVE[cat][sentiment]
    return [...pool.lead, ...pool.body, ...pool.closing]
}

/** Iterasi seluruh pasangan kategori × sentimen. */
function eachPair(cb: (cat: StepCategory, sentiment: StepSentiment) => void) {
    for (const cat of STEP_CATEGORIES) {
        for (const sentiment of STEP_SENTIMENTS) {
            cb(cat, sentiment)
        }
    }
}

describe("build_step_content", () => {
    it("pickRandom mengembalikan n elemen unik dari pool", () => {
        const random = lcg(1)
        const items = [1, 2, 3, 4, 5]
        const picked = pickRandom(items, 3, random)
        expect(picked.length).toBe(3)
        expect(new Set(picked).size).toBe(3)
        picked.forEach((p) => expect(items).toContain(p))
    })

    it("pickRandom dibatasi panjang pool bila n melebihi", () => {
        const picked = pickRandom([1, 2], 5, lcg(2))
        expect(picked.length).toBe(2)
    })

    it("randomInt menghasilkan nilai dalam rentang inklusif", () => {
        const random = lcg(3)
        for (let i = 0; i < 500; i++) {
            const v = randomInt(3, 6, random)
            expect(v).toBeGreaterThanOrEqual(3)
            expect(v).toBeLessThanOrEqual(6)
            expect(Number.isInteger(v)).toBe(true)
        }
    })

    it("escapeHtml meng-escape karakter berbahaya", () => {
        expect(escapeHtml("a < b & c > d")).toBe("a &lt; b &amp; c &gt; d")
    })

    it("buildStepValue menghasilkan satu paragraf HTML", () => {
        const html = buildStepValue("SOCIAL", 1, lcg(5))
        expect(html.startsWith("<p>")).toBe(true)
        expect(html.endsWith("</p>")).toBe(true)
    })

    it("tiap value berisi minimal MIN_SENTENCES_PER_VALUE kalimat dan tak melebihi MAX", () => {
        const random = lcg(7)
        for (let i = 0; i < 300; i++) {
            eachPair((cat, sentiment) => {
                const html = buildStepValue(cat, sentiment, random)
                const sentences = splitSentences(paragraphText(html))
                expect(sentences.length).toBeGreaterThanOrEqual(MIN_SENTENCES_PER_VALUE)
                expect(sentences.length).toBeLessThanOrEqual(MAX_SENTENCES_PER_VALUE)
            })
        }
    })

    it("jumlah kalimat bervariasi antar value (bukan selalu sama)", () => {
        const random = lcg(8)
        const counts = new Set<number>()
        for (let i = 0; i < 200; i++) {
            const sentences = splitSentences(paragraphText(buildStepValue("SOCIAL", 1, random)))
            counts.add(sentences.length)
        }
        expect(counts.size).toBeGreaterThan(1)
    })

    it("setiap kalimat berasal dari pool kategori-sentimen yang benar dan diakhiri titik", () => {
        const random = lcg(9)
        for (let i = 0; i < 60; i++) {
            eachPair((cat, sentiment) => {
                const sentences = splitSentences(paragraphText(buildStepValue(cat, sentiment, random)))
                const valid = allSentences(cat, sentiment)
                sentences.forEach((s) => {
                    expect(s.endsWith(".")).toBe(true)
                    expect(valid).toContain(s)
                })
            })
        }
    })

    it("sentimen positif dan negatif memakai pool kalimat yang berbeda", () => {
        for (const cat of STEP_CATEGORIES) {
            const pos = new Set(allSentences(cat, 1))
            const neg = allSentences(cat, 2)
            neg.forEach((s) => expect(pos.has(s)).toBe(false))
        }
    })

    it("value diawali kalimat lead dan diakhiri kalimat closing", () => {
        const random = lcg(10)
        eachPair((cat, sentiment) => {
            const pool = STEP_NARRATIVE[cat][sentiment]
            const sentences = splitSentences(paragraphText(buildStepValue(cat, sentiment, random)))
            expect(pool.lead).toContain(sentences[0])
            expect(pool.closing).toContain(sentences[sentences.length - 1])
        })
    })

    it("kalimat dalam satu value tidak duplikat", () => {
        const random = lcg(11)
        for (let i = 0; i < 200; i++) {
            const sentences = splitSentences(paragraphText(buildStepValue("POLITIC", 2, random)))
            expect(new Set(sentences).size).toBe(sentences.length)
        }
    })

    it("buildStepValues menghasilkan VALUES_PER_SENTIMENT value", () => {
        const values = buildStepValues("ECONOMY", 1, lcg(13))
        expect(values.length).toBe(VALUES_PER_SENTIMENT)
        values.forEach((v) => {
            expect(v.startsWith("<p>")).toBe(true)
            expect(splitSentences(paragraphText(v)).length).toBeGreaterThanOrEqual(MIN_SENTENCES_PER_VALUE)
        })
    })

    it("menghasilkan konten berbeda antar generate (acak)", () => {
        const random = lcg(17)
        const outputs = new Set<string>()
        for (let i = 0; i < 20; i++) outputs.add(buildStepValue("TECHNOLOGY", 1, random))
        expect(outputs.size).toBeGreaterThan(5)
    })

    it("tiap pasangan kategori-sentimen punya pool lead/body/closing yang cukup", () => {
        eachPair((cat, sentiment) => {
            const pool = STEP_NARRATIVE[cat][sentiment]
            expect(pool.lead.length).toBeGreaterThanOrEqual(1)
            expect(pool.closing.length).toBeGreaterThanOrEqual(1)
            // Body harus cukup untuk mengisi paragraf maksimal (MAX - lead - closing).
            expect(pool.body.length).toBeGreaterThanOrEqual(MAX_SENTENCES_PER_VALUE - 2)
        })
    })
})
