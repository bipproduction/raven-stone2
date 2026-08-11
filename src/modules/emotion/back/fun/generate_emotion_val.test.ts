import moment from "moment"
import { describe, expect, it } from "vitest"
import { expandDateRange, GENERATE_TIME, MAX_RANGE_DAYS, toDateOnly, todayDateOnly } from "./generate_emotion_val"

function toStr(dates: Date[]) {
    return dates.map((d) => moment(d).format("YYYY-MM-DD"))
}

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

    describe("expandDateRange", () => {
        it("menghasilkan seluruh tanggal inklusif dari start sampai end", () => {
            const result = expandDateRange("2026-08-01", "2026-08-04")
            expect(toStr(result)).toEqual(["2026-08-01", "2026-08-02", "2026-08-03", "2026-08-04"])
        })

        it("mengembalikan satu tanggal bila start sama dengan end", () => {
            const result = expandDateRange("2026-08-11", "2026-08-11")
            expect(toStr(result)).toEqual(["2026-08-11"])
        })

        it("menukar urutan bila end mendahului start", () => {
            const result = expandDateRange("2026-08-04", "2026-08-01")
            expect(toStr(result)).toEqual(["2026-08-01", "2026-08-02", "2026-08-03", "2026-08-04"])
        })

        it("melewati batas bulan dengan benar", () => {
            const result = expandDateRange("2026-01-30", "2026-02-02")
            expect(toStr(result)).toEqual(["2026-01-30", "2026-01-31", "2026-02-01", "2026-02-02"])
        })

        it("setiap tanggal tanpa komponen jam (UTC-midnight)", () => {
            for (const d of expandDateRange("2026-03-14", "2026-03-16")) {
                expect(d.getUTCHours()).toBe(0)
                expect(d.getUTCMinutes()).toBe(0)
            }
        })

        it("dibatasi MAX_RANGE_DAYS untuk range yang sangat besar", () => {
            const result = expandDateRange("2000-01-01", "2100-01-01")
            expect(result.length).toBe(MAX_RANGE_DAYS)
        })
    })
})
