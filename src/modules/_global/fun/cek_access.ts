'use server'

import { unsealData } from "iron-session"
import { cookies } from "next/headers"
import { prisma } from ".."

export default async function funCekAkses() {
    const c = cookies().get("_tknRV")
    const dataCookies = await unsealData(c!.value, { password: process.env.PWD as string })


    const cekDashboardUser = await prisma.userAccess.findMany({
        where: {
            idUserRole: Number(dataCookies.cIdRoleUser),
            Component: {
                menu: 'User Dashboard'
            }
        }
    })

    const cekDashboardAdmin = await prisma.userAccess.findMany({
        where: {
            idUserRole: Number(dataCookies.cIdRoleUser),
            Component: {
                menu: {
                    startsWith: 'Admin'
                }
            }
        }
    })

    const allData = {
        dashboardUser: (cekDashboardUser.length > 0) ? true : false,
        dashboardAdmin: (cekDashboardAdmin.length > 0) ? true : false
    }

    return allData

}