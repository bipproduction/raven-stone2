'use server'

import { unsealData } from "iron-session"
import { cookies } from "next/headers"
import { prisma } from "../.."
import _ from "lodash"
import { menu_data1, menu_data2, menu_developer, menu_emotion, menu_region } from "../data/menu_emotion"
import { pwd_key_config } from "../../bin/val_global"

export default async function funGetAccessAdmin() {
    const c = cookies().get("_tknRV")
    const dataCookies = await unsealData(c!.value, { password: pwd_key_config as string })


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

    let emotion=<any>[], data1=<any>[], region=<any>[], data2=<any>[], dev=<any>[]

    for (let i of menu_emotion) {
        let a = result.find((x) => x.keyMenu == i.key)
        if(a){
             emotion.push(i)
        }
    }

    for (let i of menu_data1) {
        let a = result.find((x) => x.keyMenu == i.key)
        if(a){
             data1.push(i)
        }
    }

    for (let i of menu_region) {
        let a = result.find((x) => x.keyMenu == i.key)
        if(a){
             region.push(i)
        }
    }

    for (let i of menu_data2) {
        let a = result.find((x) => x.keyMenu == i.key)
        if(a){
             data2.push(i)
        }
    }

    for (let i of menu_developer) {
        let a = result.find((x) => x.keyMenu == i.key)
        if(a){
             dev.push(i)
        }
    }


    const allData = {
        menuEmotion : emotion,
        menuData1:data1,
        menuRegion:region,
        menuData2:data2,
        menuDeveloper:dev
    }

    return allData
}