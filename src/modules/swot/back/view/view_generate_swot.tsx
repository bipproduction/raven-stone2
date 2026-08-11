'use client'

import { ButtonBack } from "@/modules/_global"
import { Box, Button, Modal, Select, Stack, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { useState } from "react"
import toast from "react-simple-toasts"
import ModalGenerateSwot from "../component/modal_generate_swot"
import funCekGenerateSwot from "../fun/cek_generate_swot"
import { isModalGenerateSwot } from "../val/modal_generate_swot"

const ALL_CANDIDATE = "ALL"

/**
 * Fungsi untuk menampilkan view generate SWOT.
 * @param {candidate} candidate - daftar kandidat.
 * @returns Untuk menampilkan view generate SWOT
 */
export default function ViewGenerateSwot({ candidate }: { candidate: any }) {
    const [openModal, setOpenModal] = useAtom(isModalGenerateSwot)
    const [isCandidate, setCandidate] = useState<any>(ALL_CANDIDATE)
    const [isExisting, setExisting] = useState(0)
    const [isChecking, setChecking] = useState(false)

    const idCandidate = isCandidate == ALL_CANDIDATE ? null : isCandidate

    async function onCek() {
        setChecking(true)
        try {
            const cek = await funCekGenerateSwot({ candidate: idCandidate })
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
                        GENERATE DATA SWOT
                    </Text>
                    <Stack>
                        <Select
                            data={[
                                { value: ALL_CANDIDATE, label: "SEMUA KANDIDAT" },
                                ...candidate.map((can: any) => ({ value: String(can.id), label: can.name })),
                            ]}
                            value={isCandidate}
                            label={"Kandidat"}
                            searchable
                            onChange={(val) => setCandidate(val ?? ALL_CANDIDATE)}
                        />
                        <Box style={{ backgroundColor: "white", padding: 16, borderRadius: 10 }}>
                            <Text size="sm">Tiap kandidat diisi 4 kategori: STRENGTH, WEAKNESS, OPPORTUNITY, THREAT.</Text>
                            <Text size="sm">
                                Tiap kategori berisi 3 value, dan tiap value adalah 1 paragraf berisi 3 kalimat acak
                                yang berbeda tiap kali generate ulang.
                            </Text>
                            <Text size="sm">SWOT lama kandidat akan diganti (replace) saat generate.</Text>
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
                <ModalGenerateSwot
                    candidate={idCandidate}
                    existing={isExisting}
                    onSuccess={() => setExisting(0)}
                />
            </Modal>
        </>
    )
}
