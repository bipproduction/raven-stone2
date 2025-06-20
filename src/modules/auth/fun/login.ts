'use server'
import { prisma } from "@/modules/_global"

/**
 * Login dengan email dan password
 * @param email email user
 * @param pass password user
 * @returns array data success, message, phone, dan id user
 */

export default async function funLogin({ email, pass }: { email: any, pass: any }) {

    // cek user dengan email, password dan isActive
    const data = await prisma.user.findUnique({
        where: {
            email: email,
            password: pass,
            isActive: true
        },
        select: {
            phone: true,
            id: true
        }
    })

    if (!data) {
        // jika data kosong maka akan return seperti berikut
        return {
            success: false,
            message: 'Incorrect email or password',
            phone: '',
            id: ''
        }
    }

    // return data berikut jika data tidak kosong
    return {
        success: true,
        message: '',
        phone: data.phone,
        id: data.id
    }
}