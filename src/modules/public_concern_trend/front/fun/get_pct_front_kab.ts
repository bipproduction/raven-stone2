'use server'

import { prisma } from '@/modules/_global'
import _ from 'lodash'

/**
 * Fungsi untuk function get pct front Kab.
 * @param {provinsi} provinsi - menampilkan provinsi.
 * @returns Untuk function get pct front Kab
 */
export default async function funGetPctFrontKab({ provinsi }: { provinsi: any }) {
    const dataTable = await prisma.publicConcernTrend.findMany({
        where: {
            idProvinsi: Number(provinsi),
        },
        select: {
            infrastruktur: true,
            keadilanSosial: true,
            kemiskinan: true,
            lapanganPekerjaan: true,
            layananKesehatan: true,
            pendidikan: true,
            idKabkot: true,
            AreaKabkot: {
                select: {
                    name: true
                }
            }
        }
    })

    const result = dataTable.map((v: any) => ({
        ..._.omit(v, ["AreaKabkot"]),
        name: v.AreaKabkot.name
    }))


    return result


}