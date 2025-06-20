'use server'

import { prisma } from "@/modules/_global"
import _, { ceil } from "lodash"


/**
 * Fungsi untuk menampilkan swot.
 * @param {body} body - menampilakan body.
 * @returns {body} Proses ini akan menampilakan log user.
 */
export default async function funGetLogUser({ body }: { body: any }) {

    let kondisi

    const tglAwal = body.dateFrom + ' 00:00:00';
    const tglAkhir = body.dateTo + ' 23:59:59';

    const dataSkip = _.toNumber(body.page) * 25 - 25;

    // proses ini digunakan untuk proses pencarian data dan id user
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

    // proses menampilkan user log sesuai kondisi
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

    // proses omit untuk merapikan hasil dari nama user agar sesuai apa yg diinginkan
    const result = data.map((v) => ({
        ..._.omit(v, ['User']),
        name: v.User.name,

    }))

    // proses menghitung baris dari kondisi user log
    const nData = await prisma.userLog.count({
        where: kondisi,
    })

    // menampilkan data yang di ambil dari result dan nData unutk page
    const allData = {
        data: result,
        nPage: ceil(nData / 25)
    }


    // proses pengembalian allData
    return allData
}