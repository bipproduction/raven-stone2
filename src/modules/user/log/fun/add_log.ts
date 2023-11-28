'use server'

import { prisma } from "@/modules/_global"
import { unsealData } from "iron-session"
import { cookies } from "next/headers"
import _ from "lodash"
import { pwd_key_config } from "@/modules/_global/bin/val_global"

export default async function funLogUser({ act, desc }: { act: any, desc: any }) {
    const c = cookies().get("_tknRV")
    const dataCookies = await unsealData(c!.value, { password: pwd_key_config as string })

    // proses tambah data user log
    // data yang di ambil seperti  id user, aktifitas dan deskripsi
    await prisma.userLog.create({
        data: {
            idUser: _.toString(dataCookies.cIdUser),
            activity: act,
            description: desc
        }
    })

      // berfungsi untuk menampilkan data success, message,
     // atau proses pengembalian yang terdiri dari success, message
    return {
        success: true,
        message: 'Sukses'
    }
}