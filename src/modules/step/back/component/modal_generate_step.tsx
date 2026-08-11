'use client'

import { funLogUser } from "@/modules/user"
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { useState } from "react"
import toast from "react-simple-toasts"
import funGenerateStep from "../fun/generate_step"
import { isModalGenerateStep } from "../val/modal_generate_step"

/**
 * Modal konfirmasi generate STEP.
 * @param {candidate} candidate - id kandidat, null berarti seluruh kandidat.
 * @param {existing} existing - jumlah STEP aktif yang sudah ada.
 * @param {onSuccess} onSuccess - dipanggil setelah generate berhasil.
 */
export default function ModalGenerateStep({
    candidate,
    existing,
    onSuccess,
}: {
    candidate: any
    existing: number
    onSuccess: (val: any) => void
}) {
    const [openModal, setOpenModal] = useAtom(isModalGenerateStep)
    const [isLoading, setLoading] = useState(false)

    async function onGenerate() {
        setLoading(true)
        try {
            const res = await funGenerateStep({ candidate, replace: existing > 0 })
            if (!res.success) return toast(res.message, { theme: "dark" })

            await funLogUser({
                act: "GENERATE DATA",
                desc: `User Generate STEP (Candidate ID : ${candidate ?? "ALL"}, Inserted : ${res.inserted})`,
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
                    {existing > 0 ? "STEP KANDIDAT INI SUDAH ADA" : "ANDA YAKIN INGIN GENERATE DATA STEP?"}
                </Text>
                {existing > 0 && (
                    <Text ta={"center"} size="sm" mb={20}>
                        {existing} baris STEP lama akan dinonaktifkan lalu digenerate ulang. Lanjutkan?
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
