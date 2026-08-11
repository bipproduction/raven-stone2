import moment from "moment"
import { describe, expect, it } from "vitest"
import { GENERATE_TIME, toDateOnly, todayDateOnly } from "./generate_emotion_val"

describe("generate_emotion_val", () => {
    it("GENERATE_TIME adalah jam 01:00", () => {
        expect(GENERATE_TIME).toBe("01:00:00")
    })

    it("toDateOnly mempertahankan tanggal terpilih dan membuang komponen jam", () => {
        const result = toDateOnly(new Date("2026-03-15T13:45:30"))
        // Kolom @db.Date disimpan sebagai UTC-midnight, jadi tanggal harus utuh tanpa jam.
        expect(moment(result).format("YYYY-MM-DD")).toBe("2026-03-15")
        expect(result.getUTCHours()).toBe(0)
        expect(result.getUTCMinutes()).toBe(0)
        expect(result.getUTCSeconds()).toBe(0)
    })

    it("toDateOnly menerima string tanggal", () => {
        const result = toDateOnly("2026-08-11")
        expect(moment(result).format("YYYY-MM-DD")).toBe("2026-08-11")
        expect(result.getUTCHours()).toBe(0)
    })

    it("todayDateOnly mengembalikan tanggal hari ini tanpa komponen jam", () => {
        const result = todayDateOnly()
        expect(moment(result).format("YYYY-MM-DD")).toBe(moment().format("YYYY-MM-DD"))
        expect(result.getUTCHours()).toBe(0)
        expect(result.getUTCMinutes()).toBe(0)
    })
})
