'use server'

import { prisma } from "..";

export default async function funGetAllProvince() {
    const data = await prisma.areaProvinsi.findMany({
        where: {
            isActive: true
        }
    })

    return data;
}