'use client'

import { funLogUser } from "@/modules/user"
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { useState } from "react"
import toast from "react-simple-toasts"
import funGenerateEmotionPaslon from "../fun/generate_emotion_paslon"
import { isModalEmotionPaslon } from "../val/modal_emotion"

/**
 * Modal konfirmasi generate emotion paslon.
 * @param {paslon} paslon - id paslon, null berarti seluruh paslon.
 * @param {startDate} startDate - tanggal awal rentang untuk generate.
 * @param {endDate} endDate - tanggal akhir rentang untuk generate.
 * @param {existing} existing - jumlah data yang sudah ada pada rentang & jam generate.
 * @param {onSuccess} onSuccess - dipanggil setelah generate berhasil.
 */
export default function ModalGenerateEmotionPaslon({
    paslon,
    startDate,
    endDate,
    existing,
    onSuccess,
}: {
    paslon: any
    startDate: any
    endDate: any
    existing: number
    onSuccess: (val: any) => void
}) {
    const [openModal, setOpenModal] = useAtom(isModalEmotionPaslon)
    const [isLoading, setLoading] = useState(false)

    async function onGenerate() {
        setLoading(true)
        try {
            const res = await funGenerateEmotionPaslon({ paslon, startDate, endDate, replace: existing > 0 })
            if (!res.success) return toast(res.message, { theme: "dark" })

            await funLogUser({
                act: "GENERATE DATA",
                desc: `User Generate Emotion Paslon (Paslon ID : ${paslon ?? "ALL"}, Inserted : ${res.inserted}, Deleted : ${res.deleted})`,
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
                        : "ANDA YAKIN INGIN GENERATE DATA EMOTION PASLON?"}
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
