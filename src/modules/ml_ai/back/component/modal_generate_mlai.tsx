'use client'

import { funLogUser } from "@/modules/user"
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { useState } from "react"
import toast from "react-simple-toasts"
import funGenerateMlai from "../fun/generate_mlai"
import { isModalGenerateMlai } from "../val/modal_generate_mlai"

/**
 * Modal konfirmasi generate ML-AI.
 * @param {paslon} paslon - id paslon, null berarti seluruh paslon.
 * @param {date} date - tanggal konten yang akan digenerate.
 * @param {existing} existing - jumlah konten aktif yang sudah ada pada tanggal & jam generate.
 * @param {onSuccess} onSuccess - dipanggil setelah generate berhasil.
 */
export default function ModalGenerateMlai({
    paslon,
    date,
    existing,
    onSuccess,
}: {
    paslon: any
    date: any
    existing: number
    onSuccess: (val: any) => void
}) {
    const [openModal, setOpenModal] = useAtom(isModalGenerateMlai)
    const [isLoading, setLoading] = useState(false)

    async function onGenerate() {
        setLoading(true)
        try {
            const res = await funGenerateMlai({ paslon, date, replace: existing > 0 })
            if (!res.success) return toast(res.message, { theme: "dark" })

            await funLogUser({
                act: "GENERATE DATA",
                desc: `User Generate ML-AI (Paslon ID : ${paslon ?? "ALL"}, Inserted : ${res.inserted})`,
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
                        ? "ML-AI PADA TANGGAL & JAM INI SUDAH ADA"
                        : "ANDA YAKIN INGIN GENERATE DATA ML-AI?"}
                </Text>
                {existing > 0 && (
                    <Text ta={"center"} size="sm" mb={20}>
                        {existing} konten ML-AI lama akan dinonaktifkan lalu digenerate ulang. Lanjutkan?
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
