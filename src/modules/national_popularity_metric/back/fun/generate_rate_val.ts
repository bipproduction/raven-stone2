import moment from "moment"

/** Jam yang dipakai fitur generate rate popularity (mengikuti pola generate emotion). */
export const GENERATE_TIME = "01:00:00"

/** Tanggal hari ini tanpa komponen jam, sesuai kolom dateEmotion (@db.Date). */
export function todayDateOnly() {
    return toDateOnly(new Date())
}

/** Tanggal terpilih tanpa komponen jam, sesuai kolom dateEmotion (@db.Date). */
export function toDateOnly(date: Date | string) {
    return new Date(moment(date).format("YYYY-MM-DD"))
}

/** Batas jumlah hari dalam satu rentang generate agar tidak membuat range raksasa. */
export const MAX_RANGE_DAYS = 366

/**
 * Membentuk daftar tanggal (dateOnly) dari start sampai end secara inklusif.
 * Bila end mendahului start, urutan otomatis ditukar. Dibatasi MAX_RANGE_DAYS.
 */
export function expandDateRange(start: Date | string, end: Date | string): Date[] {
    let from = moment(start).startOf("day")
    let to = moment(end).startOf("day")
    if (to.isBefore(from)) {
        const tmp = from
        from = to
        to = tmp
    }

    const dates: Date[] = []
    const cursor = from.clone()
    while (!cursor.isAfter(to) && dates.length < MAX_RANGE_DAYS) {
        dates.push(new Date(cursor.format("YYYY-MM-DD")))
        cursor.add(1, "day")
    }
    return dates
}

/** Konversi "HH:mm:ss" ke bentuk yang dipakai kolom timeEmotion (@db.Time). */
export function toTimeEmotion(time: string) {
    const base = new Date("1970-01-01 " + time)
    return new Date(base.getTime() - base.getTimezoneOffset() * 60000).toISOString()
}
