'use server'

import { prisma } from "@/modules/_global"

export default async function funLog({ user, act, desc }: { user: any, act: any, desc: any }) {
    await prisma.userLog.create({
        data: {
            idUser: user,
            activity: act,
            description: desc
        }
    })

    return {
        success: true,
        message: 'Sukses'
    }
}