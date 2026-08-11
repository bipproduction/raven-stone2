import moment from "moment"
import { describe, expect, it } from "vitest"
import { expandDateRange, GENERATE_TIME, MAX_RANGE_DAYS, toDateOnly, todayDateOnly } from "./generate_rate_val"

function toStr(dates: Date[]) {
    return dates.map((d) => moment(d).format("YYYY-MM-DD"))
}

describe("generate_rate_val", () => {
    it("GENERATE_TIME adalah jam 01:00", () => {
        expect(GENERATE_TIME).toBe("01:00:00")
    })

    it("toDateOnly mempertahankan tanggal terpilih dan membuang komponen jam", () => {
        const result = toDateOnly(new Date("2026-03-15T13:45:30"))
        expect(moment(result).format("YYYY-MM-DD")).toBe("2026-03-15")
        expect(result.getUTCHours()).toBe(0)
        expect(result.getUTCMinutes()).toBe(0)
        expect(result.getUTCSeconds()).toBe(0)
    })

    it("todayDateOnly menghasilkan tanggal hari ini tanpa jam", () => {
        const result = todayDateOnly()
        expect(moment(result).format("YYYY-MM-DD")).toBe(moment().format("YYYY-MM-DD"))
    })

    it("expandDateRange inklusif dari start sampai end", () => {
        const dates = expandDateRange("2026-03-01", "2026-03-04")
        expect(toStr(dates)).toEqual(["2026-03-01", "2026-03-02", "2026-03-03", "2026-03-04"])
    })

    it("expandDateRange satu tanggal menghasilkan satu elemen", () => {
        const dates = expandDateRange("2026-03-10", "2026-03-10")
        expect(toStr(dates)).toEqual(["2026-03-10"])
    })

    it("expandDateRange menukar urutan bila end mendahului start", () => {
        const dates = expandDateRange("2026-03-04", "2026-03-01")
        expect(toStr(dates)).toEqual(["2026-03-01", "2026-03-02", "2026-03-03", "2026-03-04"])
    })

    it("expandDateRange dibatasi MAX_RANGE_DAYS", () => {
        const dates = expandDateRange("2020-01-01", "2030-01-01")
        expect(dates.length).toBe(MAX_RANGE_DAYS)
    })
})
