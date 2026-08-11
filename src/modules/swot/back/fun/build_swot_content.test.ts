import { describe, expect, it } from "vitest"
import {
    buildSwotValue,
    buildSwotValues,
    escapeHtml,
    pickRandom,
    SENTENCES_PER_VALUE,
    VALUES_PER_CATEGORY,
} from "./build_swot_content"
import { SWOT_CATEGORIES, SWOT_SENTENCES } from "./swot_phrases"

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

describe("build_swot_content", () => {
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

    it("escapeHtml meng-escape karakter berbahaya", () => {
        expect(escapeHtml("a < b & c > d")).toBe("a &lt; b &amp; c &gt; d")
    })

    it("buildSwotValue menghasilkan satu paragraf HTML", () => {
        const html = buildSwotValue("STRENGTH", lcg(5))
        expect(html.startsWith("<p>")).toBe(true)
        expect(html.endsWith("</p>")).toBe(true)
    })

    it("tiap value berisi tepat SENTENCES_PER_VALUE kalimat", () => {
        const random = lcg(7)
        for (let i = 0; i < 500; i++) {
            for (const cat of SWOT_CATEGORIES) {
                const html = buildSwotValue(cat, random)
                const sentences = splitSentences(paragraphText(html))
                expect(sentences.length).toBe(SENTENCES_PER_VALUE)
            }
        }
    })

    it("setiap kalimat berasal dari pool kategori yang benar dan diakhiri titik", () => {
        const random = lcg(9)
        for (const cat of SWOT_CATEGORIES) {
            const sentences = splitSentences(paragraphText(buildSwotValue(cat, random)))
            sentences.forEach((s) => {
                expect(s.endsWith(".")).toBe(true)
                expect(SWOT_SENTENCES[cat]).toContain(s)
            })
        }
    })

    it("kalimat dalam satu value tidak duplikat", () => {
        const random = lcg(11)
        for (let i = 0; i < 200; i++) {
            const sentences = splitSentences(paragraphText(buildSwotValue("THREAT", random)))
            expect(new Set(sentences).size).toBe(sentences.length)
        }
    })

    it("buildSwotValues menghasilkan VALUES_PER_CATEGORY value", () => {
        const values = buildSwotValues("OPPORTUNITY", lcg(13))
        expect(values.length).toBe(VALUES_PER_CATEGORY)
        values.forEach((v) => {
            expect(v.startsWith("<p>")).toBe(true)
            expect(splitSentences(paragraphText(v)).length).toBe(SENTENCES_PER_VALUE)
        })
    })

    it("menghasilkan konten berbeda antar generate (acak)", () => {
        const random = lcg(17)
        const outputs = new Set<string>()
        for (let i = 0; i < 20; i++) outputs.add(buildSwotValue("OPPORTUNITY", random))
        expect(outputs.size).toBeGreaterThan(5)
    })

    it("keempat kategori punya pool kalimat yang cukup", () => {
        for (const cat of SWOT_CATEGORIES) {
            expect(SWOT_SENTENCES[cat].length).toBeGreaterThanOrEqual(SENTENCES_PER_VALUE)
        }
    })
})
