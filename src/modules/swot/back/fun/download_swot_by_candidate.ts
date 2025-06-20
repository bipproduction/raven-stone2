'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"


/**
 * Fungsi untuk download swot by candidate.
 * @param {candidate} candidate - menampilakan candidate.
 * @returns {candidate} Proses ini untuk download data swot by candidate.
 */
export default async function funDownloadSwotByCandidate({ candidate }: { candidate: any }) {
    let result

    // proses ini mengecek swot by idCandidate
    const cek = await prisma.swot.count({
        where: {
            idCandidate: candidate,
            isActive: true
        }
    })

    // proses ini menampilkan data uniq seperti id yang ada di candidate
    const dCandidate = await prisma.candidate.findUnique({
        where: {
            id: candidate
        }
    })

    // prose menampilkan data yang akan keluar ketika di download
    // jika terdapat data akan muncul id
    // dan jika masih belum terdapat data makan id tersebut kosong
    if (cek > 0) {
        result = await prisma.swot.findMany({
            where: {
                idCandidate: candidate,
                isActive: true
            },
            select: {
                id: true,
                idCandidate: true,
                category: true,
                content: true
            }
        })

        result = result.map((v: any) => ({
            ..._.omit(v, ["content", "category", "sentiment"]),
            id: v.id,
            idCandidate: candidate,
            candidate: dCandidate?.name,
            category: v.category,
            content: v.content
        }))
    } else {
        result = [{
            id: '',
            idCandidate: candidate,
            candidate: dCandidate?.name,
            category: '(STRENGTH/WEAKNESS/OPPORTUNITY/THREAT)',
            content: '(DESKRIPSI)'
        }]
    }




    // proses menampilkan keseluruhan data yg terdiri dari title yang di ambil dari id candidate
    // dan mengambil data yang ada di result
    const allData = {
        title: 'SWOT - ' + dCandidate?.name,
        data: result
    }

    // proses pengembalian allData
    return allData
}