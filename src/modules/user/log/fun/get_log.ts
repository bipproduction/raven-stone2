'use server'

import { prisma } from "@/modules/_global"
import { UserLog } from "@prisma/client";
import _ from "lodash"

export default async function funGetLogUser({ body }: { body: any }) {

    const tglAwal = body.dateFrom + ' 23:59:59';
    const tglAkhir = body.dateTo + ' 00:00:00';

    const dataSkip = _.toNumber(body.page) * 25 - 25;

    const data = await prisma.userLog.findMany({
        skip: dataSkip,
        take: 25,
        where: {
            idUser: body.id,
            createdAt: {
                lte: new Date(tglAwal).toISOString(),
                gte: new Date(tglAkhir).toISOString(),
            }
        },
        select: {
            activity: true,
            createdAt: true,
            description: true,
            User: {
                select: {
                    name: true,
                }
            }
        }
    })

    const result = data.map((v) => ({
        ..._.omit(v, ['User']),
        name: v.User.name,
    }))

    // const result = data.map((v) => ({
    //     ..._.omit(v, ['User']),
    //     name: v.User.name,
    // }))

    console.log(result)
    return result
}