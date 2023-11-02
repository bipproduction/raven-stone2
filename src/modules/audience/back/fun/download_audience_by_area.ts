'use server'

import { countProvince, prisma } from "@/modules/_global";
import _ from "lodash"

export default async function funDownloadAudienceByArea({ find }: { find: any }) {
    let titleTrue, dataTable = <any>[], area, kondisi

    const nProv = await countProvince();

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {
        kondisi = {
            idProvinsi: find.idProvinsi
        }

        area = await prisma.areaProvinsi.findUnique({
            where: {
                id: find.idProvinsi
            }
        })
        titleTrue = "AUDIENCE - PROVINSI " + area?.name

    } else {
        kondisi = {}

        titleTrue = "AUDIENCE - SELURUH PROVINSI "
    }

    dataTable = await prisma.audience.findMany({
        where: kondisi,
        select: {
            id: true,
            value: true,
            AreaProvinsi: {
                select: {
                    name: true,
                }
            },
            AreaKabkot: {
                select: {
                    name: true,
                }
            }
        },
        orderBy: {
            id: 'asc',
        }
    })

    dataTable = dataTable.map((v: any) => ({
        ..._.omit(v, ["value", "AreaProvinsi", "AreaKabkot"]),
        Provinsi: v.AreaProvinsi.name,
        Kabkot: v.AreaKabkot.name,
        value: v.value
    }))

    const allData = {
        title: titleTrue,
        data: dataTable
    }

    return allData
}