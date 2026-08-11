'use client'

import { ButtonBack } from "@/modules/_global"
import { Box, Button, Modal, Select, Stack, Text } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useAtom } from "jotai"
import { useState } from "react"
import toast from "react-simple-toasts"
import ModalGenerateEmotionPaslon from "../component/modal_generate_emotion_paslon"
import funCekGenerateEmotionPaslon from "../fun/cek_generate_emotion_paslon"
import { GENERATE_TIME } from "../fun/generate_emotion_val"
import { isModalEmotionPaslon } from "../val/modal_emotion"

const ALL_PASLON = "ALL"

/**
 * Fungsi untuk menampilkan view generate emotion paslon.
 * @param {paslon} paslon - daftar paslon.
 * @returns Untuk menampilkan view generate emotion paslon
 */
export default function ViewGenerateEmotionPaslon({ paslon }: { paslon: any }) {
    const [openModal, setOpenModal] = useAtom(isModalEmotionPaslon)
    const [isPaslon, setPaslon] = useState<any>(ALL_PASLON)
    const [isRange, setRange] = useState<[Date | null, Date | null]>([new Date(), new Date()])
    const [isExisting, setExisting] = useState(0)
    const [isChecking, setChecking] = useState(false)

    const idPaslon = isPaslon == ALL_PASLON ? null : isPaslon
    const [startDate, endDate] = isRange

    async function onCek() {
        if (!startDate || !endDate) return toast("Silahkan pilih rentang tanggal", { theme: "dark" })
        setChecking(true)
        try {
            const cek = await funCekGenerateEmotionPaslon({ paslon: idPaslon, startDate, endDate })
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
                        GENERATE DATA EMOTION PASLON
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
                        <DatePickerInput
                            type="range"
                            valueFormat="DD-MM-YYYY"
                            required
                            allowSingleDateInRange
                            value={isRange}
                            label={"Rentang Tanggal"}
                            placeholder="Pilih rentang tanggal"
                            onChange={(val) => setRange(val)}
                        />
                        <Box style={{ backgroundColor: "white", padding: 16, borderRadius: 10 }}>
                            <Text size="sm">
                                Jam: <b>{GENERATE_TIME.slice(0, 5)}</b>
                            </Text>
                            <Text size="sm">Wilayah: seluruh kabupaten/kota</Text>
                            <Text size="sm">Data digenerate untuk setiap tanggal dalam rentang (nilai berbeda tiap tanggal).</Text>
                            <Text size="sm">
                                Nilai tiap metrik 3-4 digit, total seluruh metrik tidak melebihi audience wilayah.
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
                <ModalGenerateEmotionPaslon
                    paslon={idPaslon}
                    startDate={startDate}
                    endDate={endDate}
                    existing={isExisting}
                    onSuccess={() => setExisting(0)}
                />
            </Modal>
        </>
    )
}
