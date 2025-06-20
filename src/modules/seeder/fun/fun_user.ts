"use server"

import { prisma } from "@/modules/_global"
import { seederUser } from ".."

/**
 * Fungsi untuk ambil data seeder user.
 * @returns hasil untuk data seeder user
 */

export async function funSeederUser() {
    for (let data of seederUser) {
        await prisma.user.upsert({
            where: {
                id: data.id
            },
            create: {
                id: data.id,
                email: data.email,
                idUserRole: data.idUserRole,
                name: data.name,
                password: data.password,
                phone: data.phone,
                isAllArea: data.isAllArea
            },
            update: {
                id: data.id,
                email: data.email,
                idUserRole: data.idUserRole,
                name: data.name,
                password: data.password,
                phone: data.phone,
                isAllArea: data.isAllArea
            }
        })
    }

    return {
        success: true,
        message: "Success User"
    }
}