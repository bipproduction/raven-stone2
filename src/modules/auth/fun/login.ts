'use server'

import { prisma } from "@/modules/_global"

export default async function funLogin({ email, pass }: { email: any, pass: any }) {
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
        return {
            success: false,
            message: 'Incorrect email or password',
            phone: '',
            id: ''
        }
    }

    return {
        success: true,
        message: '',
        phone: data.phone,
        id: data.id
    }
}