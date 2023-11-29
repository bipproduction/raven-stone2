'use server'
import { unsealData } from "iron-session"
import { cookies } from "next/headers"
import { prisma } from "../.."
import _ from "lodash"
import { menu_data1, menu_data2, menu_developer, menu_emotion, menu_region } from "../data/menu_emotion"
import { pwd_key_config } from "../../bin/val_global"

/**
 * Untuk mengambil data list menu dashboard admin yg dapat diakses oleh user.
 * @returns list menu
 */

export default async function funGetAccessAdmin() {

    // get cookies user
    const c = cookies().get("_tknRV")
    const dataCookies = await unsealData(c!.value, { password: pwd_key_config as string })

    // mengambil akses component menu sesuai dg id role user (didapat dari cookies)
    const cekDashboardAdmin = await prisma.userAccess.findMany({
        where: {
            idUserRole: Number(dataCookies.cIdRoleUser),
            Component: {
                menu: {
                    startsWith: 'Admin'
                }
            }
        },
        select: {
            Component: {
                select: {
                    keyMenu: true
                }
            }
        }
    })

    const result = cekDashboardAdmin.map((v: any) => ({
        ..._.omit(v, ["Component"]),
        keyMenu: v.Component.keyMenu
    }))

    let emotion = <any>[], data1 = <any>[], region = <any>[], data2 = <any>[], dev = <any>[]


    // looping menu emotion
    for (let i of menu_emotion) {
        // mencari menu yg sesuai dg access menu dari database
        let a = result.find((x) => x.keyMenu == i.key)
        if (a) {
            // jika ada, maka menu masuk ke variable emotion
            emotion.push(i)
        }
    }

    // looping menu data 1
    for (let i of menu_data1) {
        // mencari menu yg sesuai dg access menu dari database
        let a = result.find((x) => x.keyMenu == i.key)
        if (a) {
            // jika ada, maka menu masuk ke variable data1
            data1.push(i)
        }
    }

    // looping menu data region
    for (let i of menu_region) {
        // mencari menu yg sesuai dg access menu dari database
        let a = result.find((x) => x.keyMenu == i.key)
        if (a) {
            // jika ada, maka menu masuk ke variable region
            region.push(i)
        }
    }

    // looping menu data 2
    for (let i of menu_data2) {
        // mencari menu yg sesuai dg access menu dari database
        let a = result.find((x) => x.keyMenu == i.key)
        if (a) {
            // jika ada, maka menu masuk ke variable data2
            data2.push(i)
        }
    }

    // looping menu data developer
    for (let i of menu_developer) {
        // mencari menu yg sesuai dg access menu dari database
        let a = result.find((x) => x.keyMenu == i.key)
        if (a) {
            // jika ada, maka menu masuk ke variable dev
            dev.push(i)
        }
    }


    const allData = {
        menuEmotion: emotion,
        menuData1: data1,
        menuRegion: region,
        menuData2: data2,
        menuDeveloper: dev
    }

    return allData
}