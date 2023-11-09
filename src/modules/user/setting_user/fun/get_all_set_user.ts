"use server"

import { prisma } from "@/modules/_global"
import _ from "lodash"

export async function funGetAllSetUser() {
    const data = await prisma.user.findMany({
        where: {
            isActive: true,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            phone: true,
            UserRole: {
                select: {
                    name: true
                }
            }
        }
    })

    const dataOmit = data.map((item) => ({
        ..._.omit(item, ["User"], ["userRole"]),
        name: item.name,
        email: item.email,
        password: item.password,
        phone: item.phone,
        UserRole: item.UserRole.name
    }))

    return dataOmit
}