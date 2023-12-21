'use server'
import { countProvince, prisma } from "@/modules/_global";
import _ from "lodash"

/**
 * Get data audience berdasarkan area yg dipilih
 * @param find array yang berisikan id provinsi
 * @returns array judul dan data audience
 */

export default async function funGetAudienceByArea({ find }: { find: any }) {
    let titleTrue, dataTable = <any>[], area, th

    // get jumlah provinsi
    const nProv = await countProvince();

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {

        // jika parameter id provinsi > 0 dan <= jumlah provinsi,
        // maka get data audience berdasarkan idprovinsi
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
            },
            orderBy: {
                idKabkot: 'asc'
            }
        })

        dataTable = dataTable.map((v: any) => ({
            ..._.omit(v, ["AreaKabkot"]),
            name: v.AreaKabkot.name
        }))

        // get one data provinsi sesuai dg id
        area = await prisma.areaProvinsi.findUnique({
            where: {
                id: find.idProvinsi
            }
        })

        // set judul
        titleTrue = "PROVINSI " + area?.name
        th = "KABUPATEN/KOTA"

    } else {

        // selain itu maka get all data audience (tanpa kondisi)
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
            },
            orderBy: {
                idProvinsi: 'asc'
            }
        })

        dataTable = dataTable.map((v: any) => ({
            ..._.omit(v, ["AreaProvinsi"]),
            name: v.AreaProvinsi.name
        }))

        // menjumlahkan value audience berdasarkan idProvinsi
        dataTable = _.map(_.groupBy(dataTable, "idProvinsi"), (v: any) => ({
            value: _.sumBy(v, 'value'),
            name: v[0].name
        }))

        // set judul
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