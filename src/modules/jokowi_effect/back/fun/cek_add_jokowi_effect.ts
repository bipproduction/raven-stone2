"use server"

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk cek add Jokowi Effect.
 * @param {tanggal} tanggal - menampilkan tanggal.
 * @param {waktu} waktu - menampilkan waktu.
 * @returns Untuk cek add Jokowi Effect
 */
export default async function funCekAddJokowiEffect({ tanggal, waktu }: { tanggal: any, waktu: any }) {
    const data = await prisma.effect.count({
        where: {
            idCandidate: 7,
            dateContent: tanggal,
            timeContent: waktu
        }
    })

    if (data > 0) {
        return { ada: true }
    }

    return { ada: false }
}