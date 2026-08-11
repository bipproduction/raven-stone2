'use client'

import { ButtonBack } from "@/modules/_global"
import { Box, Button, Modal, Stack, Text } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useAtom } from "jotai"
import { useState } from "react"
import toast from "react-simple-toasts"
import ModalGenerateJokowi from "../component/modal_generate_jokowi"
import funCekGenerateEffect from "../fun/cek_generate_effect"
import { GENERATE_TIME } from "../fun/generate_effect_val"
import { isModalGenerateJokowi } from "../val/modal_generate_jokowi"

/**
 * Fungsi untuk menampilkan view generate Jokowi Effect.
 * @returns Untuk menampilkan view generate Jokowi Effect
 */
export default function ViewGenerateJokowi() {
    const [openModal, setOpenModal] = useAtom(isModalGenerateJokowi)
    const [isDate, setDate] = useState<Date | null>(new Date())
    const [isExisting, setExisting] = useState(0)
    const [isChecking, setChecking] = useState(false)

    async function onCek() {
        if (!isDate) return toast("Silahkan pilih tanggal", { theme: "dark" })
        setChecking(true)
        try {
            const cek = await funCekGenerateEffect({ date: isDate })
            setExisting(cek.total)
            setOpenModal(true)
        } catch (e: any) {
            toast(`Gagal cek data: ${e?.message ?? "unknown error"}`, { theme: "dark" })
        } finally {
            setChecking(false)
        }
    }

    return (
        <>
            <Stack>
                <ButtonBack />
            </Stack>
            <Stack p={"md"}>
                <Box style={{ backgroundColor: "gray", padding: 20, borderRadius: 10 }}>
                    <Text fw={"bold"} c={"white"} mb={20}>
                        GENERATE DATA JOKOWI EFFECT
                    </Text>
                    <Stack>
                        <DateInput
                            valueFormat="DD-MM-YYYY"
                            required
                            value={isDate}
                            label={"Tanggal"}
                            placeholder="Pilih tanggal"
                            onChange={(val) => setDate(val)}
                        />
                        <Box style={{ backgroundColor: "white", padding: 16, borderRadius: 10 }}>
                            <Text size="sm">
                                Jam: <b>{GENERATE_TIME.slice(0, 5)}</b>
                            </Text>
                            <Text size="sm">Dibuat satu dokumen analisis (Strength Analysis Improvement) untuk Joko Widodo.</Text>
                            <Text size="sm">
                                Dokumen memuat 5 aspek: Pengaruh Figur, Endorsement, Persepsi Keberlanjutan, Basis Akar
                                Rumput, dan Gaung Digital.
                            </Text>
                            <Text size="sm">
                                Tiap aspek berupa 1 paragraf bergaya berita dengan panjang bervariasi (minimal 3 kalimat)
                                yang berbeda tiap kali generate ulang.
                            </Text>
                            <Text size="sm">
                                Jokowi Effect lama pada tanggal & jam yang sama akan diganti (replace) saat generate.
                            </Text>
                        </Box>
                        <Button bg={"dark"} loading={isChecking} onClick={onCek}>
                            GENERATE
                        </Button>
                    </Stack>
                </Box>
            </Stack>

            <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
                centered
                withCloseButton={false}
                closeOnClickOutside={false}
            >
                <ModalGenerateJokowi date={isDate} existing={isExisting} onSuccess={() => setExisting(0)} />
            </Modal>
        </>
    )
}
