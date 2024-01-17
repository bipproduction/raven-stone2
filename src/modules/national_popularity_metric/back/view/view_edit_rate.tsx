'use client'
import { ButtonBack } from "@/modules/_global"
import { ActionIcon, Box, Button, Group, Modal, NumberInput, SimpleGrid, Stack, Table, Text } from "@mantine/core"
import { DateInput, TimeInput } from "@mantine/dates"
import { useAtom } from "jotai";
import _ from "lodash";
import moment from "moment";
import { useRef, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import toast from "react-simple-toasts";
import { isModalPopularity } from "../val/modal_popularity";
import ModalEditPopularity from "../component/modal_edit_popularity";

export default function ViewEditRatePaslon({ data }: { data: any }) {
    const [valOpenModal, setOpenModal] = useAtom(isModalPopularity)
    const ref = useRef<HTMLInputElement>(null)
    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <AiOutlineClockCircle style={{ width: "70%", height: "70%" }} />
        </ActionIcon>
    )

    const [isDataWaktu, setDataWaktu] = useState({
        date: data.date,
        time: data.time,
    })

    const [isRate, setRate] = useState({
        id1: data.data[0].id,
        rate1: data.data[0].rate,
        id2: data.data[1].id,
        rate2: data.data[1].rate,
        id3: data.data[2].id,
        rate3: data.data[2].rate,
    })

    function submitData() {
        if (isDataWaktu.date == '' || isDataWaktu.time == '') {
            return toast("The form cannot be empty", { theme: "dark" });
        }
        setOpenModal(true)
    }

    return (
        <>
            <Stack>
                <ButtonBack />
                <Group pt={30}>
                    <Text fw={"bold"}>EDIT RATE POPULARITY</Text>
                </Group>
                <SimpleGrid
                    cols={{ base: 2, sm: 2, lg: 2 }}
                    spacing={{ base: 10, sm: "xl" }}
                >
                    <Box>
                        <DateInput valueFormat="DD-MM-YYYY" required
                            label={"Tanggal"}
                            placeholder="Pilih Tanggal"
                            value={(isDataWaktu.date == '') ? null : new Date(isDataWaktu.date)}
                            onChange={(e) => {
                                setDataWaktu({
                                    ...isDataWaktu,
                                    date: moment(e).format("YYYY-MM-DD"),
                                });
                            }}
                            disabled
                        />
                    </Box>
                    <Box>
                        <TimeInput
                            label="Jam"
                            required ref={ref}
                            rightSection={pickerControl}
                            value={isDataWaktu.time}
                            onChange={(val) =>
                                setDataWaktu({
                                    ...isDataWaktu,
                                    time: String(val.target.value)
                                })
                            }
                            disabled
                        />
                    </Box>
                </SimpleGrid>
            </Stack>
            <Stack>
                <Box
                    style={{
                        backgroundColor: "white",
                        padding: 10,
                        borderRadius: 10,
                        marginTop: 30
                    }}
                >
                    <Table withTableBorder horizontalSpacing="xs">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>PASLON</Table.Th>
                                <Table.Th>RATE</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td>Anies Baswedan - Muhaimin Iskandar</Table.Td>
                                <Table.Td>
                                    <NumberInput
                                        placeholder="Percents"
                                        suffix="%"
                                        value={Number(isRate.rate1)}
                                        onChange={(val) => {
                                            setRate({
                                                ...isRate,
                                                rate1: Number(val)
                                            })
                                        }}
                                    />
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>Prabowo Subianto - Gibran Rakabuming</Table.Td>
                                <Table.Td>
                                    <NumberInput
                                        placeholder="Percents"
                                        suffix="%"
                                        value={Number(isRate.rate2)}
                                        onChange={(val) => {
                                            setRate({
                                                ...isRate,
                                                rate2: Number(val)
                                            })
                                        }}
                                    />
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>Ganjar Pranowo - Mahfud MD</Table.Td>
                                <Table.Td>
                                    <NumberInput
                                        placeholder="Percents"
                                        suffix="%"
                                        value={Number(isRate.rate3)}
                                        onChange={(val) => {
                                            setRate({
                                                ...isRate,
                                                rate3: Number(val)
                                            })
                                        }}
                                    />
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Box>
            </Stack>
            <Group justify='flex-end' pt={20}>
                <Button color={"gray"} w={200} onClick={submitData}>SUBMIT</Button>
            </Group>

            <Modal
                size={"md"}
                opened={valOpenModal}
                onClose={() => { setOpenModal(false) }}
                centered
                withCloseButton={false}
                closeOnClickOutside={false}
            >
                <ModalEditPopularity dataRate={isRate} />
            </Modal>
        </>
    )
}