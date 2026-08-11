'use client'

import { funLogUser } from "@/modules/user"
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { useState } from "react"
import toast from "react-simple-toasts"
import funGenerateEmotionCandidate from "../fun/generate_emotion_candidate"
import { isModalEmotionCandidate } from "../val/modal_emotion"

/**
 * Modal konfirmasi generate emotion candidate.
 * @param {candidate} candidate - id kandidat, null berarti seluruh kandidat.
 * @param {startDate} startDate - tanggal awal rentang untuk generate.
 * @param {endDate} endDate - tanggal akhir rentang untuk generate.
 * @param {existing} existing - jumlah data yang sudah ada pada rentang & jam generate.
 * @param {onSuccess} onSuccess - dipanggil setelah generate berhasil.
 */
export default function ModalGenerateEmotionCandidate({
    candidate,
    startDate,
    endDate,
    existing,
    onSuccess,
}: {
    candidate: any
    startDate: any
    endDate: any
    existing: number
    onSuccess: (val: any) => void
}) {
    const [openModal, setOpenModal] = useAtom(isModalEmotionCandidate)
    const [isLoading, setLoading] = useState(false)

    async function onGenerate() {
        setLoading(true)
        try {
            const res = await funGenerateEmotionCandidate({ candidate, startDate, endDate, replace: existing > 0 })
            if (!res.success) return toast(res.message, { theme: "dark" })

            await funLogUser({
                act: "GENERATE DATA",
                desc: `User Generate Emotion Candidate (Candidate ID : ${candidate ?? "ALL"}, Inserted : ${res.inserted}, Deleted : ${res.deleted})`,
            })
            toast(`Sukses generate ${res.inserted} data`, { theme: "dark" })
            onSuccess(res)
        } catch (e: any) {
            toast(`Gagal generate: ${e?.message ?? "unknown error"}`, { theme: "dark" })
        } finally {
            setLoading(false)
            setOpenModal(false)
        }
    }

    return (
        <Box>
            <Alert color="gray" variant="outline">
                <Text fw={700} ta={"center"} mb={10} mt={20}>
                    {existing > 0
                        ? "DATA PADA TANGGAL & JAM INI SUDAH ADA"
                        : "ANDA YAKIN INGIN GENERATE DATA EMOTION CANDIDATE?"}
                </Text>
                {existing > 0 && (
                    <Text ta={"center"} size="sm" mb={20}>
                        {existing} baris akan dihapus lalu digenerate ulang. Lanjutkan?
                    </Text>
                )}
                <Group justify="space-between" pt={10}>
                    <Button radius={10} color="gray.7" w={150} onClick={() => setOpenModal(false)}>
                        NO
                    </Button>
                    <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={onGenerate}>
                        YES
                    </Button>
                </Group>
            </Alert>
        </Box>
    )
}
