import { describe, expect, it } from "vitest"
import {
    BASE_MAX,
    BASE_MIN,
    clampRate,
    DATE_FLUCTUATION,
    makeBaseRate,
    makeDateRate,
    RATE_MAX,
    RATE_MIN,
    roundRate,
} from "./build_rate_popularity"

/** LCG deterministik untuk test yang butuh urutan acak yang bisa direproduksi. */
function lcg(seed: number) {
    let state = seed >>> 0
    return () => {
        state = (state * 1664525 + 1013904223) >>> 0
        return state / 0x100000000
    }
}

describe("build_rate_popularity", () => {
    it("clampRate membatasi nilai ke rentang 0-100", () => {
        expect(clampRate(-5)).toBe(RATE_MIN)
        expect(clampRate(150)).toBe(RATE_MAX)
        expect(clampRate(42.3)).toBe(42.3)
    })

    it("roundRate membulatkan ke 1 desimal", () => {
        expect(roundRate(42.36)).toBe(42.4)
        expect(roundRate(42.34)).toBe(42.3)
    })

    it("makeBaseRate selalu berada dalam rentang BASE_MIN..BASE_MAX", () => {
        const random = lcg(1)
        for (let i = 0; i < 1000; i++) {
            const base = makeBaseRate(random)
            expect(base).toBeGreaterThanOrEqual(BASE_MIN)
            expect(base).toBeLessThanOrEqual(BASE_MAX)
        }
    })

    it("makeBaseRate memakai batas rentang saat random di ujung", () => {
        expect(makeBaseRate(() => 0)).toBe(BASE_MIN)
        // random() menghasilkan [0,1); 0.9999.. mendekati BASE_MAX tapi tidak menyentuhnya.
        expect(makeBaseRate(() => 0.5)).toBe((BASE_MIN + BASE_MAX) / 2)
    })

    it("makeDateRate berfluktuasi maksimal DATE_FLUCTUATION di sekitar base", () => {
        const base = 50
        const random = lcg(7)
        for (let i = 0; i < 1000; i++) {
            const rate = makeDateRate(base, random)
            expect(Math.abs(rate - base)).toBeLessThanOrEqual(DATE_FLUCTUATION + 0.05)
        }
    })

    it("makeDateRate selalu menghasilkan rate valid 0-100", () => {
        const random = lcg(3)
        // Base di ujung atas + fluktuasi positif tidak boleh melewati 100.
        for (let i = 0; i < 1000; i++) {
            const rate = makeDateRate(BASE_MAX, random)
            expect(rate).toBeGreaterThanOrEqual(RATE_MIN)
            expect(rate).toBeLessThanOrEqual(RATE_MAX)
        }
    })

    it("makeDateRate di titik nol dan seratus tetap dibatasi", () => {
        // base 0 dengan swing negatif → clamp ke 0
        expect(makeDateRate(0, () => 0)).toBe(0)
        // base 100 dengan swing positif → clamp ke 100
        expect(makeDateRate(100, () => 1)).toBe(100)
    })

    it("makeDateRate menghasilkan nilai berbeda antar tanggal (fluktuasi)", () => {
        const base = 55
        const random = lcg(99)
        const values = Array.from({ length: 30 }, () => makeDateRate(base, random))
        const unique = new Set(values)
        // Dengan 30 tanggal, mayoritas nilai harus berbeda (bukan garis datar).
        expect(unique.size).toBeGreaterThan(10)
    })

    it("base rate independen antar paslon (tidak dijumlahkan jadi 100)", () => {
        const random = lcg(11)
        const rates = [makeBaseRate(random), makeBaseRate(random), makeBaseRate(random)]
        // Tidak ada constraint total = 100; tiap rate berdiri sendiri dalam rentangnya.
        for (const r of rates) {
            expect(r).toBeGreaterThanOrEqual(BASE_MIN)
            expect(r).toBeLessThanOrEqual(BASE_MAX)
        }
        // Sangat kecil kemungkinan ketiganya identik.
        expect(new Set(rates).size).toBeGreaterThan(1)
    })
})
