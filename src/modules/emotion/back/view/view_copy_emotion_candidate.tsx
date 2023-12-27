
'use client'

import { ButtonBack } from "@/modules/_global";
import { Box, Button, Center, Group, Modal, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import toast from "react-simple-toasts";
import moment from "moment";
import { useAtom } from "jotai";
import { isModalEmotionPaslon } from "../val/modal_emotion";
import funCekEmotionCandidate from "../fun/cek_emotion_candidate_by_date";
import ModalCopyEmotionCandidate from "../component/modal_copy_emotion_candidate";
import _ from "lodash"


/**
 * Fungsi untuk menampilkan view copy emotion candidate.
 * @param {candidate} candidate - menampilkan candidate.
 * @returns Untuk  menampilkan view copy emotion candidate
 */
export default function ViewCopyEmotionCandidate({ candidate }: { candidate: any }) {
    const [trueFrom, setTrueFrom] = useState<any>(null)
    const [trueTo, setTrueTo] = useState<any>(null)
    const [isFrom, setFrom] = useState(null)
    const [isTo, setTo] = useState(null)
    const [openModal, setOpenModal] = useAtom(isModalEmotionPaslon)
    const [isCandidate, setCandidate] = useState<any>(null)


    function chooseCandidate(can: any) {
        setCandidate(can)
        setFrom(null)
        setTrueFrom(null)
        setTo(null)
        setTrueTo(null)
    }

    async function cekFrom(isDate: any) {
        if (_.isNull(isCandidate)) return toast('Silahkan pilih kandidat', { theme: 'dark' })
        
        const tgl = moment(isDate).format('YYYY-MM-DD')
        const cek = await funCekEmotionCandidate({ date: new Date(tgl), candidate: isCandidate })
        if (!cek.ada) {
            setFrom(null)
            setTrueFrom(null)
            return toast('Tidak ada data', { theme: 'dark' })
        }
        setFrom(isDate)
        setTrueFrom(new Date(tgl))
        return toast('Silahkan pilih tanggal tujuan', { theme: 'dark' })
    }

    async function cekTo(isDate: any) {
        if (_.isNull(isCandidate)) return toast('Silahkan pilih kandidat', { theme: 'dark' })

        const tgl = moment(isDate).format('YYYY-MM-DD')
        const cek = await funCekEmotionCandidate({ date: new Date(tgl), candidate: isCandidate })
        if (cek.ada) {
            setTo(null)
            setTrueTo(null)
            return toast('Sudah ada data', { theme: 'dark' })
        }
        setTo(isDate)
        setTrueTo(new Date(tgl))
        return toast('Silahkan proses', { theme: 'dark' })
    }

    return (
        <>
            <Stack>
                <ButtonBack />
            </Stack>
            <Stack p={"md"}>
                <Box
                    style={{
                        backgroundColor: "gray",
                        padding: 20,
                        borderRadius: 10
                    }}
                >
                    <Text fw={"bold"} c={"white"} mb={20}>COPY DATA EMOTION CANDIDATE</Text>
                    <Box>
                        <Select
                            placeholder="Pilih Kandidat"
                            data={candidate.map((can: any) => ({
                                value: String(can.id),
                                label: can.name
                            }))}
                            required
                            value={isCandidate}
                            label={"Kandidat"}
                            searchable
                            onChange={(val) => { chooseCandidate(val) }}
                        />
                        <SimpleGrid
                            cols={{ base: 1, sm: 2, lg: 2 }}
                            spacing={{ base: 10, sm: "xl" }}
                            verticalSpacing={{ base: "md", sm: "xl" }}
                        >
                            <Box pt={40}>
                                <Center>
                                    <Box>
                                        <Text fw={"bold"} fz={20}>
                                            FROM
                                        </Text>
                                        <Box
                                            style={{
                                                backgroundColor: "white",
                                                padding: 10,
                                                borderRadius: 10,
                                            }}
                                        >
                                            <DatePicker value={isFrom} onChange={(val) => { cekFrom(val) }} />
                                        </Box>
                                    </Box>
                                </Center>
                            </Box>
                            <Box pt={40}>
                                <Center>
                                    <Box>
                                        <Text fw={"bold"} fz={20}>
                                            TO
                                        </Text>
                                        <Box
                                            style={{
                                                backgroundColor: "white",
                                                padding: 10,
                                                borderRadius: 10,
                                            }}
                                        >
                                            <DatePicker value={isTo} onChange={(val) => { cekTo(val) }} />
                                        </Box>
                                        {
                                            (isFrom != null && isTo != null) &&
                                            <Group justify="flex-end">
                                                <Button
                                                    mt={20}
                                                    bg={"gray"}
                                                    onClick={() => setOpenModal(true)}
                                                >
                                                    PROSES
                                                </Button>
                                            </Group>
                                        }
                                    </Box>
                                </Center>
                            </Box>
                        </SimpleGrid>
                    </Box>
                </Box>
            </Stack>


            <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
                centered
                withCloseButton={false}
                closeOnClickOutside={false}
            >
                <ModalCopyEmotionCandidate from={trueFrom} to={trueTo} candidate={isCandidate} onSuccess={(val) => {
                    setFrom(null)
                    setTo(null)
                    setCandidate(null)
                }} />
            </Modal>
        </>
    )
}