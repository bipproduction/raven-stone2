"use server"

import { prisma } from "@/modules/_global"
import { seederUserRole } from ".."

/**
 * Fungsi untuk ambil data seeder user role.
 * @returns hasil untuk data seeder user role
 */
export async function funSeederUserRole() {
    for (let data of seederUserRole) {
        await prisma.userRole.upsert({
            where: {
                id: data.id
            },
            create: {
                name: data.name,
                id: data.id
            },
            update: {
                id: data.id,
                name: data.name
            }
        })
    }

    return {
        success: true,
        message: "Success User Role"
    }
}