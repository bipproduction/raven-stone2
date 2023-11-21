'use server'

import { prisma } from "@/modules/_global"
import { pwd_key_config } from "@/modules/_global/bin/val_global"
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
            cIdRoleUser: dataUser?.idUserRole
        },
        { password: pwd_key_config as string })


    cookies().set(
        {
            name: "_tknRV",
            value: tkn
        }
    )


    return {
        success: true,
        message: "success"
    }
}