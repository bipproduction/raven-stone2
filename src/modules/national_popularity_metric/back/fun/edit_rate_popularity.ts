'use server'
import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"

export default async function funEditRate({ data }: { data: any }) {

    await prisma.paslonPopularityNew.update({
        where: {
            id: data.id1
        },
        data: {
            rate: data.rate1
        }
    })

    await prisma.paslonPopularityNew.update({
        where: {
            id: data.id2
        },
        data: {
            rate: data.rate2
        }
    })

    await prisma.paslonPopularityNew.update({
        where: {
            id: data.id3
        },
        data: {
            rate: data.rate3
        }
    })

    const dataDb = await prisma.paslonPopularityNew.findUnique({
        where: {
            id: data.id1
        }
    })

    revalidatePath('dashboard-admin/rate-popularity?&date=' + dataDb?.dateEmotion)

    return true
}