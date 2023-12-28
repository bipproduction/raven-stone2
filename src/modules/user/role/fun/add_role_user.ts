"use server"
import { prisma } from '@/modules/_global';
import { revalidatePath } from 'next/cache';


/**
 * Fungsi untuk menambahkan User Role.
 * @param {name} name - data dari name.
 * @param {component} component - data dari iuser access.
 * @returns {name, component} Proses ini akan menghasilkan dari data name dan component.
 */
export default async function funAddUserRole({ name, component }: { name: any, component: any }) {

    // proses add data user role yaitu  nama
    const role = await prisma.userRole.create({
        data: {
            name: name
        }
    })

    // proses looping data user access
    // dan mengambil id user role yang bisa di akses
    for (let i of component) {
        await prisma.userAccess.create({
            data: {
                idUserRole: role.id,
                idComponent: i,
            }
        })
    }


    // berfungsi kembali ke path yang tertera pada url
    revalidatePath("/dashboard-admin/role-user")

    // berfungsi untuk menampilkan data success, message,
    // atau proses pengembalian yang terdiri dari success, message
    return {
        success: true,
        message: "Success"
    }
}