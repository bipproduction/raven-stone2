import { describe, expect, it } from "vitest"
import {
    buildMlaiAspectParagraph,
    buildMlaiContent,
    escapeHtml,
    MAX_SENTENCES_PER_ASPECT,
    MIN_SENTENCES_PER_ASPECT,
    pickRandom,
    randomInt,
} from "./build_mlai_content"
import { MLAI_ASPECT_TITLE, MLAI_ASPECTS, MLAI_NARRATIVE, MlaiAspect } from "./mlai_phrases"

/** LCG deterministik untuk test yang butuh urutan acak yang bisa direproduksi. */
function lcg(seed: number) {
    let state = seed >>> 0
    return () => {
        state = (state * 1664525 + 1013904223) >>> 0
        return state / 0x100000000
    }
}

/** Ambil isi dalam <p>...</p>. */
function paragraphInner(html: string) {
    const m = html.match(/^<p>([\s\S]*)<\/p>$/)
    return m ? m[1] : ""
}

/** Buang prefix judul (<strong>...</strong> ) dan kembalikan bagian kalimat naratif. */
function narrativePart(html: string) {
    return paragraphInner(html).replace(/^<strong>[\s\S]*?<\/strong>\s*/, "")
}

/** Pisah teks menjadi kalimat (berakhir titik). */
function splitSentences(text: string) {
    return text.split(/(?<=\.)\s+/).filter((s) => s.trim().length > 0)
}

/** Semua kalimat naratif yang valid untuk satu aspek. */
function allSentences(aspect: MlaiAspect) {
    const pool = MLAI_NARRATIVE[aspect]
    return [...pool.lead, ...pool.body, ...pool.closing]
}

describe("build_mlai_content", () => {
    it("pickRandom mengembalikan n elemen unik dari pool", () => {
        const picked = pickRandom([1, 2, 3, 4, 5], 3, lcg(1))
        expect(picked.length).toBe(3)
        expect(new Set(picked).size).toBe(3)
    })

    it("pickRandom dibatasi panjang pool bila n melebihi", () => {
        expect(pickRandom([1, 2], 5, lcg(2)).length).toBe(2)
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

    it("buildMlaiAspectParagraph menghasilkan satu paragraf HTML dengan judul tebal", () => {
        const html = buildMlaiAspectParagraph("ELECTABILITY", lcg(5))
        expect(html.startsWith("<p>")).toBe(true)
        expect(html.endsWith("</p>")).toBe(true)
        expect(html).toContain(`<strong>${MLAI_ASPECT_TITLE.ELECTABILITY}.</strong>`)
    })

    it("tiap paragraf berisi minimal MIN dan tak melebihi MAX kalimat naratif", () => {
        const random = lcg(7)
        for (let i = 0; i < 300; i++) {
            for (const aspect of MLAI_ASPECTS) {
                const sentences = splitSentences(narrativePart(buildMlaiAspectParagraph(aspect, random)))
                expect(sentences.length).toBeGreaterThanOrEqual(MIN_SENTENCES_PER_ASPECT)
                expect(sentences.length).toBeLessThanOrEqual(MAX_SENTENCES_PER_ASPECT)
            }
        }
    })

    it("jumlah kalimat bervariasi antar paragraf (bukan selalu sama)", () => {
        const random = lcg(8)
        const counts = new Set<number>()
        for (let i = 0; i < 200; i++) {
            counts.add(splitSentences(narrativePart(buildMlaiAspectParagraph("WORK_PROGRAM", random))).length)
        }
        expect(counts.size).toBeGreaterThan(1)
    })

    it("setiap kalimat naratif berasal dari pool aspek yang benar dan diakhiri titik", () => {
        const random = lcg(9)
        for (let i = 0; i < 60; i++) {
            for (const aspect of MLAI_ASPECTS) {
                const sentences = splitSentences(narrativePart(buildMlaiAspectParagraph(aspect, random)))
                const valid = allSentences(aspect)
                sentences.forEach((s) => {
                    expect(s.endsWith(".")).toBe(true)
                    expect(valid).toContain(s)
                })
            }
        }
    })

    it("paragraf diawali kalimat lead dan diakhiri kalimat closing", () => {
        const random = lcg(10)
        for (const aspect of MLAI_ASPECTS) {
            const pool = MLAI_NARRATIVE[aspect]
            const sentences = splitSentences(narrativePart(buildMlaiAspectParagraph(aspect, random)))
            expect(pool.lead).toContain(sentences[0])
            expect(pool.closing).toContain(sentences[sentences.length - 1])
        }
    })

    it("kalimat dalam satu paragraf tidak duplikat", () => {
        const random = lcg(11)
        for (let i = 0; i < 200; i++) {
            const sentences = splitSentences(narrativePart(buildMlaiAspectParagraph("DIGITAL_ISSUE", random)))
            expect(new Set(sentences).size).toBe(sentences.length)
        }
    })

    it("buildMlaiContent memuat seluruh aspek, dipisah newline", () => {
        const content = buildMlaiContent(lcg(13))
        const lines = content.split("\n")
        expect(lines.length).toBe(MLAI_ASPECTS.length)
        lines.forEach((line) => {
            expect(line.startsWith("<p>")).toBe(true)
            expect(line.endsWith("</p>")).toBe(true)
        })
        for (const aspect of MLAI_ASPECTS) {
            expect(content).toContain(`<strong>${MLAI_ASPECT_TITLE[aspect]}.</strong>`)
        }
    })

    it("menghasilkan konten berbeda antar generate (acak)", () => {
        const random = lcg(17)
        const outputs = new Set<string>()
        for (let i = 0; i < 20; i++) outputs.add(buildMlaiContent(random))
        expect(outputs.size).toBeGreaterThan(5)
    })

    it("tiap aspek punya pool lead/body/closing yang cukup", () => {
        for (const aspect of MLAI_ASPECTS) {
            const pool = MLAI_NARRATIVE[aspect]
            expect(pool.lead.length).toBeGreaterThanOrEqual(1)
            expect(pool.closing.length).toBeGreaterThanOrEqual(1)
            expect(pool.body.length).toBeGreaterThanOrEqual(MAX_SENTENCES_PER_ASPECT - 2)
        }
    })
})
