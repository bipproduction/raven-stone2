'use client'

import { funLogUser } from "@/modules/user"
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { useState } from "react"
import toast from "react-simple-toasts"
import funGenerateSwot from "../fun/generate_swot"
import { isModalGenerateSwot } from "../val/modal_generate_swot"

/**
 * Modal konfirmasi generate SWOT.
 * @param {candidate} candidate - id kandidat, null berarti seluruh kandidat.
 * @param {existing} existing - jumlah SWOT aktif yang sudah ada.
 * @param {onSuccess} onSuccess - dipanggil setelah generate berhasil.
 */
export default function ModalGenerateSwot({
    candidate,
    existing,
    onSuccess,
}: {
    candidate: any
    existing: number
    onSuccess: (val: any) => void
}) {
    const [openModal, setOpenModal] = useAtom(isModalGenerateSwot)
    const [isLoading, setLoading] = useState(false)

    async function onGenerate() {
        setLoading(true)
        try {
            const res = await funGenerateSwot({ candidate, replace: existing > 0 })
            if (!res.success) return toast(res.message, { theme: "dark" })

            await funLogUser({
                act: "GENERATE DATA",
                desc: `User Generate SWOT (Candidate ID : ${candidate ?? "ALL"}, Inserted : ${res.inserted})`,
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
                    {existing > 0 ? "SWOT KANDIDAT INI SUDAH ADA" : "ANDA YAKIN INGIN GENERATE DATA SWOT?"}
                </Text>
                {existing > 0 && (
                    <Text ta={"center"} size="sm" mb={20}>
                        {existing} baris SWOT lama akan dinonaktifkan lalu digenerate ulang. Lanjutkan?
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
