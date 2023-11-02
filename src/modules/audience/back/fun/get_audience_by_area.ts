'use server'

import { countProvince, prisma } from "@/modules/_global";
import _ from "lodash"

export default async function funGetAudienceByArea({ find }: { find: any }) {
    let titleTrue, dataTable = <any>[], area, th

    const nProv = await countProvince();

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {

        dataTable = await prisma.audience.findMany({
            where: {
                idProvinsi: find.idProvinsi
            },
            select: {
                value: true,
                idKabkot: true,
                AreaKabkot: {
                    select: {
                        name: true
                    }
                }
            }
        })

        dataTable = dataTable.map((v: any) => ({
            ..._.omit(v, ["AreaKabkot"]),
            name: v.AreaKabkot.name
        }))

        area = await prisma.areaProvinsi.findUnique({
            where: {
                id: find.idProvinsi
            }
        })
        titleTrue = "PROVINSI " + area?.name
        th = "KABUPATEN/KOTA"

    } else {
        dataTable = await prisma.audience.findMany({
            select: {
                value: true,
                idProvinsi: true,
                idKabkot: true,
                AreaProvinsi: {
                    select: {
                        name: true
                    }
                }
            }
        })

        dataTable = dataTable.map((v: any) => ({
            ..._.omit(v, ["AreaProvinsi"]),
            name: v.AreaProvinsi.name
        }))

        dataTable = _.map(_.groupBy(dataTable, "idProvinsi"), (v: any) => ({
            value: _.sumBy(v, 'value'),
            name: v[0].name
        }))
        titleTrue = "SELURUH PROVINSI"
        th = "PROVINSI"
    }

    const allData = {
        title: titleTrue,
        thTitle: th,
        data: dataTable
    }


    return allData
}