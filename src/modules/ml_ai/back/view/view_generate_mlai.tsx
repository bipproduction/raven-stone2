'use client'

import { ButtonBack } from "@/modules/_global"
import { Box, Button, Modal, Select, Stack, Text } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useAtom } from "jotai"
import { useState } from "react"
import toast from "react-simple-toasts"
import ModalGenerateMlai from "../component/modal_generate_mlai"
import funCekGenerateMlai from "../fun/cek_generate_mlai"
import { GENERATE_TIME } from "../fun/generate_mlai_val"
import { isModalGenerateMlai } from "../val/modal_generate_mlai"

const ALL_PASLON = "ALL"

/**
 * Fungsi untuk menampilkan view generate ML-AI.
 * @param {paslon} paslon - daftar paslon.
 * @returns Untuk menampilkan view generate ML-AI
 */
export default function ViewGenerateMlai({ paslon }: { paslon: any }) {
    const [openModal, setOpenModal] = useAtom(isModalGenerateMlai)
    const [isPaslon, setPaslon] = useState<any>(ALL_PASLON)
    const [isDate, setDate] = useState<Date | null>(new Date())
    const [isExisting, setExisting] = useState(0)
    const [isChecking, setChecking] = useState(false)

    const idPaslon = isPaslon == ALL_PASLON ? null : isPaslon

    async function onCek() {
        if (!isDate) return toast("Silahkan pilih tanggal", { theme: "dark" })
        setChecking(true)
        try {
            const cek = await funCekGenerateMlai({ paslon: idPaslon, date: isDate })
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
                        GENERATE DATA ML-AI
                    </Text>
                    <Stack>
                        <Select
                            data={[
                                { value: ALL_PASLON, label: "SEMUA PASLON" },
                                ...paslon.map((pas: any) => ({ value: String(pas.id), label: pas.name })),
                            ]}
                            value={isPaslon}
                            label={"Paslon"}
                            searchable
                            onChange={(val) => setPaslon(val ?? ALL_PASLON)}
                        />
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
                            <Text size="sm">Tiap paslon diisi satu dokumen rekomendasi (Strength Analysis Improvement).</Text>
                            <Text size="sm">
                                Dokumen memuat 5 aspek: Elektabilitas, Komunikasi Publik, Program Kerja, Jaringan Relawan,
                                dan Isu Digital.
                            </Text>
                            <Text size="sm">
                                Tiap aspek berupa 1 paragraf bergaya berita dengan panjang bervariasi (minimal 3 kalimat)
                                yang berbeda tiap kali generate ulang.
                            </Text>
                            <Text size="sm">ML-AI lama pada tanggal & jam yang sama akan diganti (replace) saat generate.</Text>
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
                <ModalGenerateMlai
                    paslon={idPaslon}
                    date={isDate}
                    existing={isExisting}
                    onSuccess={() => setExisting(0)}
                />
            </Modal>
        </>
    )
}
