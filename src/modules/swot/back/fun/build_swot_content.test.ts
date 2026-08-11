import { describe, expect, it } from "vitest"
import { buildSwotContent, escapeHtml, MAX_POINTS, MIN_POINTS, pickRandom } from "./build_swot_content"
import { SWOT_CATEGORIES, SWOT_PHRASES } from "./swot_phrases"

/** LCG deterministik untuk test yang butuh urutan acak yang bisa direproduksi. */
function lcg(seed: number) {
    let state = seed >>> 0
    return () => {
        state = (state * 1664525 + 1013904223) >>> 0
        return state / 0x100000000
    }
}

/** Hitung jumlah <li> dalam string HTML. */
function countLi(html: string) {
    return (html.match(/<li>/g) ?? []).length
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

    it("buildSwotContent menghasilkan bullet list HTML", () => {
        const html = buildSwotContent("STRENGTH", lcg(5))
        expect(html.startsWith("<ul>")).toBe(true)
        expect(html.endsWith("</ul>")).toBe(true)
        expect(countLi(html)).toBeGreaterThanOrEqual(MIN_POINTS)
    })

    it("jumlah poin selalu antara MIN_POINTS dan MAX_POINTS", () => {
        const random = lcg(7)
        for (let i = 0; i < 500; i++) {
            for (const cat of SWOT_CATEGORIES) {
                const n = countLi(buildSwotContent(cat, random))
                expect(n).toBeGreaterThanOrEqual(MIN_POINTS)
                expect(n).toBeLessThanOrEqual(MAX_POINTS)
            }
        }
    })

    it("setiap poin berasal dari pool kategori yang benar", () => {
        const random = lcg(9)
        for (const cat of SWOT_CATEGORIES) {
            const html = buildSwotContent(cat, random)
            const items = Array.from(html.matchAll(/<li>(.*?)<\/li>/g)).map((m) => m[1])
            items.forEach((text) => expect(SWOT_PHRASES[cat]).toContain(text))
        }
    })

    it("poin dalam satu kategori tidak duplikat", () => {
        const random = lcg(11)
        for (let i = 0; i < 200; i++) {
            const html = buildSwotContent("THREAT", random)
            const items = Array.from(html.matchAll(/<li>(.*?)<\/li>/g)).map((m) => m[1])
            expect(new Set(items).size).toBe(items.length)
        }
    })

    it("menghasilkan konten berbeda antar generate (acak)", () => {
        const random = lcg(13)
        const outputs = new Set<string>()
        for (let i = 0; i < 20; i++) outputs.add(buildSwotContent("OPPORTUNITY", random))
        // Dengan 20 kali generate, mayoritas hasil harus berbeda (bukan konstan).
        expect(outputs.size).toBeGreaterThan(5)
    })

    it("keempat kategori punya pool frasa yang cukup", () => {
        for (const cat of SWOT_CATEGORIES) {
            expect(SWOT_PHRASES[cat].length).toBeGreaterThanOrEqual(MAX_POINTS)
        }
    })
})
