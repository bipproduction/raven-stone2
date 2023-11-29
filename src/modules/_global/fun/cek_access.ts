'use server'
import { unsealData } from "iron-session"
import { cookies } from "next/headers"
import { prisma } from ".."
import { pwd_key_config } from "../bin/val_global"

/**
 * Cek akses user login (apakah dapat akses ke dashboard user &/ admin)
 * @returns array
 */

export default async function funCekAkses() {


    // get cookies user
    const c = cookies().get("_tknRV")
    const dataCookies = await unsealData(c!.value, { password: pwd_key_config as string })

    // cek akses roleuser di dashboard user
    const cekDashboardUser = await prisma.userAccess.findMany({
        where: {
            idUserRole: Number(dataCookies.cIdRoleUser),
            Component: {
                menu: 'User Dashboard'
            }
        }
    })

    // cek akses roleuser di dashboard admin
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