'use server'

import { prisma } from "@/modules/_global"
import { sealData } from "iron-session"
import { cookies } from 'next/headers'

export async function funSetCookies({ user }: { user: string }) {
    const dataUser = await prisma.user.findUnique({
        where: {
            id: user
        }
    })

    const tkn = await sealData(
        {
            cName: dataUser?.name,
            cIdUser: dataUser?.id,
        },
        { password: process.env.PWD as string })


    cookies().set(
        {
            name: "_tkn",
            value: tkn
        }
    )


    return {
        success: true,
        message: "success"
    }
}