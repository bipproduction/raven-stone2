'use server'
import { prisma } from ".."
import _ from "lodash"

/**
 * Get data semua nama paslon (nama capres - nama cawapres)
 * @returns array data paslon
 */

export default async function funGetAllPaslon() {

    // get data semua paslon
    const data = await prisma.paslon.findMany({
        select: {
            id: true,
            nameCapres: true,
            nameCawapres: true
        }
    });

    // penggabungan value nama capres dan cawapres
    const result = data.map((v: any) => ({
        ..._.omit(v, ["nameCapres", "nameCawapres"]),
        name: v.nameCapres + ' - ' + v.nameCawapres
    }))

    return result
}