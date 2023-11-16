'use server'

import { prisma } from "@/modules/_global"

export async function fun_coba_tekan() {
    const data = await prisma.areaKabkot.findMany()
    console.log(data)
    return data
}