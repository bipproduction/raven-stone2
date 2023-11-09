"use server"

import { prisma } from "@/modules/_global"

export default async function funGetOneRoleUser({ id }: { id: number }) {
    const data = await prisma.userRole.findUnique({
        where: {
            isActive: true,
            id: Number(id),
        },
        select: {
            id: true,
            name: true
        }
    })

    const dataAccess = await prisma.userAccess.findMany({
        where: {
            idUserRole: Number(id)
        },
        select: {
            idComponent: true
        }
    })



    const allData = {
        dataRole: data,
        dataComponent: dataAccess.map((v) => (v.idComponent))
    }

    // console.log(dataAccess.map((v) => (v.idComponent)))

    return allData
}