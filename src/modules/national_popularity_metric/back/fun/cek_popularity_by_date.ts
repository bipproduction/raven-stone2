'use server'

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk ngecek popuparity.
 * @param {data} data - menampilkan data.
 * @returns Untuk ngecek popuparity
 */
export default async function funCekPopularity({ date }: { date: any }) {
    const data = await prisma.paslonPopularity.count({
        where: {
            dateEmotion: date
        }
    })


    if (data > 0) {
        return { ada: true }
    }

    return { ada: false }
}