import moment from "moment"

/** Jam emotion yang dipakai fitur generate (menu Summary mencocokkan jam secara exact-match). */
export const GENERATE_TIME = "01:00:00"

/** Tanggal hari ini tanpa komponen jam, sesuai kolom dateEmotion (@db.Date). */
export function todayDateOnly() {
    return toDateOnly(new Date())
}

/** Tanggal terpilih tanpa komponen jam, sesuai kolom dateEmotion (@db.Date). */
export function toDateOnly(date: Date | string) {
    return new Date(moment(date).format("YYYY-MM-DD"))
}

/** Konversi "HH:mm:ss" ke bentuk yang dipakai kolom timeEmotion (@db.Time). */
export function toTimeEmotion(time: string) {
    const base = new Date("1970-01-01 " + time)
    return new Date(base.getTime() - base.getTimezoneOffset() * 60000).toISOString()
}
