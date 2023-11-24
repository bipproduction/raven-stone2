'use server'

import { prisma } from "@/modules/_global"
import _, { ceil } from "lodash"

export default async function funGetLogUser({ body }: { body: any }) {

    let kondisi

    const tglAwal = body.dateFrom + ' 00:00:00';
    const tglAkhir = body.dateTo + ' 23:59:59';

    const dataSkip = _.toNumber(body.page) * 25 - 25;

    if (_.isNull(body.user) || body.user == "") {
        kondisi = {
            isActive: true,
            createdAt: {
                gte: new Date(tglAwal).toISOString(),
                lte: new Date(tglAkhir).toISOString(),
            }
        }
    } else {
        kondisi = {
            isActive: true,
            idUser: body.user,
            createdAt: {
                gte: new Date(tglAwal).toISOString(),
                lte: new Date(tglAkhir).toISOString(),
            }
        }
    }

    const data = await prisma.userLog.findMany({
        skip: dataSkip,
        take: 25,
        where: kondisi,
        select: {
            activity: true,
            createdAt: true,
            description: true,
            User: {
                select: {
                    name: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    const result = data.map((v) => ({
        ..._.omit(v, ['User']),
        name: v.User.name,

    }))

    const nData = await prisma.userLog.count({
        where: kondisi,
    })

    const allData = {
        data: result,
        nPage: ceil(nData / 25)
    }


    return allData
}