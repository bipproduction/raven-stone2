'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

export default async function funGetPctFrontProv() {
    const dataTable = await prisma.publicConcernTrend.findMany({
        select: {
            infrastruktur: true,
            keadilanSosial: true,
            kemiskinan: true,
            lapanganPekerjaan: true,
            layananKesehatan: true,
            pendidikan: true,
            idProvinsi: true,
            AreaProvinsi: {
                select: {
                    name: true
                }
            }
        }
    })

    const format = dataTable.map((v: any) => ({
        ..._.omit(v, ["AreaProvinsi"]),
        name: v.AreaProvinsi.name
    }))

    const result = _.map(_.groupBy(format, "idProvinsi"), (v: any) => ({
        infrastruktur: _.sumBy(v, 'infrastruktur'),
        keadilanSosial: _.sumBy(v, 'keadilanSosial'),
        kemiskinan: _.sumBy(v, 'kemiskinan'),
        lapanganPekerjaan: _.sumBy(v, 'lapanganPekerjaan'),
        layananKesehatan: _.sumBy(v, 'layananKesehatan'),
        pendidikan: _.sumBy(v, 'pendidikan'),
        name: v[0].name,
        idProvinsi: v[0].idProvinsi,
    }))


    return result
}