'use server'

import { prisma } from "@/modules/_global"
import { unsealData } from "iron-session"
import { cookies } from "next/headers"
import _ from "lodash"

export default async function funLogUser({ act, desc }: { act: any, desc: any }) {
    const c = cookies().get("_tknRV")
    const dataCookies = await unsealData(c!.value, { password: process.env.PWD as string })

    await prisma.userLog.create({
        data: {
            idUser: _.toString(dataCookies.cIdUser),
            activity: act,
            description: desc
        }
    })

    return {
        success: true,
        message: 'Sukses'
    }
}