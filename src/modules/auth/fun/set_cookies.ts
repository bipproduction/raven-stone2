'use server'
import { prisma } from "@/modules/_global"
import { pwd_key_config } from "@/modules/_global/bin/val_global"
import { sealData } from "iron-session"
import { cookies } from 'next/headers'

/**
 * Setting cookies setelah login dan verification berhasil
 * @param user id user
 * @returns array data success dan message
 */

export async function funSetCookies({ user }: { user: string }) {

    // get data user berdasarkan id user
    const dataUser = await prisma.user.findUnique({
        where: {
            id: user
        }
    })

    // menyimpan dan mengunci data nama, id, dan role user
    const tkn = await sealData(
        {
            cName: dataUser?.name,
            cIdUser: dataUser?.id,
            cIdRoleUser: dataUser?.idUserRole
        },
        { password: pwd_key_config as string })


    // set cookies yg berisi data yang telah dikunci
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