
'use client'

import { ButtonBack } from "@/modules/_global";
import { Box, Button, Center, Group, Modal, SimpleGrid, Stack, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import funCekEmotionPaslon from "../fun/cek_emotion_paslon_by_date";
import toast from "react-simple-toasts";
import moment from "moment";
import ModalCopyEmotionPaslon from "../component/modal_copy_emotion_paslon";
import { useAtom } from "jotai";
import { isModalEmotionPaslon } from "../val/modal_emotion";


export default function ViewCopyEmotionPaslon() {
    const [trueFrom, setTrueFrom] = useState<any>(null)
    const [trueTo, setTrueTo] = useState<any>(null)
    const [isFrom, setFrom] = useState(null)
    const [isTo, setTo] = useState(null)
    const [openModal, setOpenModal] = useAtom(isModalEmotionPaslon)

    async function cekFrom(isDate: any) {
        const tgl = moment(isDate).format('YYYY-MM-DD')
        const cek = await funCekEmotionPaslon({ date: new Date(tgl) })
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
        const tgl = moment(isDate).format('YYYY-MM-DD')
        const cek = await funCekEmotionPaslon({ date: new Date(tgl) })
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
                    <Text fw={"bold"} c={"white"} mb={20}>COPY DATA EMOTION PASLON</Text>
                    <Box>
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
                <ModalCopyEmotionPaslon from={trueFrom} to={trueTo} onSuccess={(val) => {
                    setFrom(null)
                    setTo(null)
                }} />
            </Modal>
        </>
    )
}