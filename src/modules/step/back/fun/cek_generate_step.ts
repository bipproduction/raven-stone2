'use server'

import { prisma } from "@/modules/_global"

/**
 * Cek apakah sudah ada data STEP aktif untuk kandidat terpilih (atau seluruh kandidat).
 * @param candidate id kandidat, atau null untuk mengecek seluruh kandidat
 */
export default async function funCekGenerateStep({ candidate }: { candidate?: any }) {
    const total = await prisma.step.count({
        where: {
            isActive: true,
            ...(candidate ? { idCandidate: Number(candidate) } : {}),
        },
    })

    return { ada: total > 0, total }
}
