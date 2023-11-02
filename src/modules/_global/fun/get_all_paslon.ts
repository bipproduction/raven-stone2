'use server'

import { prisma } from ".."
import _ from "lodash"

export default async function funGetAllPaslon() {
    const data = await prisma.paslon.findMany({
        select: {
            id: true,
            nameCapres: true,
            nameCawapres: true
        }
    });

    const result = data.map((v: any) => ({
        ..._.omit(v, ["nameCapres", "nameCawapres"]),
        name: v.nameCapres+' - '+v.nameCawapres
    }))

    return result
}