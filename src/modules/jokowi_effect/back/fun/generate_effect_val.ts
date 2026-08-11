import moment from "moment"

/** ID kandidat Joko Widodo — Jokowi Effect selalu terikat pada kandidat ini. */
export const JOKOWI_CANDIDATE_ID = 7

/** Jam konten Jokowi Effect yang dipakai fitur generate (front view mencocokkan jam saat menampilkan). */
export const GENERATE_TIME = "01:00:00"

/** Tanggal hari ini tanpa komponen jam, sesuai kolom dateContent (@db.Date). */
export function todayDateOnly() {
    return toDateOnly(new Date())
}

/** Tanggal terpilih tanpa komponen jam, sesuai kolom dateContent (@db.Date). */
export function toDateOnly(date: Date | string) {
    return new Date(moment(date).format("YYYY-MM-DD"))
}

/** Konversi "HH:mm:ss" ke bentuk yang dipakai kolom timeContent (@db.Time). */
export function toTimeContent(time: string) {
    const base = new Date("1970-01-01 " + time)
    return new Date(base.getTime() - base.getTimezoneOffset() * 60000).toISOString()
}
