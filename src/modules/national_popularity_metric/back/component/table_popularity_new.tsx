'use client'
import { ActionIcon, Box, Button, Group, Menu, Modal, ScrollArea, Select, Table, Text, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import funGetAllRatePopularityNew from "../fun/get_rate_popularity_new";
import { MdDelete, MdEditCalendar } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi"
import { useAtom } from "jotai";
import { isModalPopularity } from "../val/modal_popularity";
import ModalDeletePopularity from "./modal_delete_rate_popularity";
import { useShallowEffect } from "@mantine/hooks";

/**
 * Fungsi untuk menampilkan modal upload popularity.
 * @param {data} data - menampilkan data.
 * @param {title} title - menampilkan title.
 * @returns Untuk menampilkan modal upload popularity
 */

export default function TableDataPopularityNew({ param, title, data, datajam }: { param: any, title: string, data: any, datajam: any }) {
    const [openModal, setOpenModal] = useAtom(isModalPopularity)
    const [isData, setData] = useState(data)
    const [dataJam, setDataJam] = useState(datajam)
    const [isJam, setJam] = useState((dataJam.length > 0) ? dataJam[0].timeEmotion : null)
    const router = useRouter()

    async function getLoad(valJam: any) {
        setJam(valJam)
        param['jam'] = valJam
        const dataDB = await funGetAllRatePopularityNew({ find: param })
        setData(dataDB.data)
    }

    async function onLoad() {
        const dataLoad = await funGetAllRatePopularityNew({ find: { date: param.date } })
        setData(dataLoad.data)
        setDataJam(dataLoad.dataJam)
        setJam((dataLoad.dataJam.length > 0) ? dataLoad.dataJam[0].timeEmotion : null)
    }

    useShallowEffect(() => {
        setData(data)
        setJam((datajam.length > 0) ? datajam[0].timeEmotion : null)
        setDataJam(datajam)
    }, [data, datajam])

    return (
        <>
            <Box>
                <Box
                    style={{
                        backgroundColor: "gray",
                        padding: 20,
                        borderRadius: 10,
                    }}
                >
                    <Group justify="space-between">
                        <Text fw={"bold"} c={"white"}>
                            {title}
                        </Text>
                        <Group>
                            {
                                (dataJam.length > 0) &&
                                <>

                                    <Select
                                        data={dataJam.map((can: any) => ({
                                            value: String(can.timeEmotion),
                                            label: can.timeEmotion
                                        }))}
                                        value={isJam}
                                        onChange={(val) => getLoad(val)}
                                    />
                                    <Menu shadow="md" width={200}>
                                        <Menu.Target>
                                            <ActionIcon variant="filled" color="gray" aria-label="Settings">
                                                <HiDotsVertical style={{ width: '70%', height: '70%' }} stroke="1.5" />
                                            </ActionIcon>
                                        </Menu.Target>

                                        <Menu.Dropdown>
                                            <Menu.Item leftSection={<MdEditCalendar style={{ width: rem(14), height: rem(14), color: 'rgba(5, 128, 23, 1)' }} />}
                                            onClick={()=>{router.push("/dashboard-admin/rate-popularity/edit/"+isData[0].id)}}>
                                                Edit
                                            </Menu.Item>
                                            <Menu.Item
                                                leftSection={<MdDelete style={{ width: rem(14), height: rem(14), color: 'rgba(209, 4, 4, 1)' }} />}
                                                onClick={() => { setOpenModal(true) }}>
                                                Delete
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </>
                            }
                        </Group>
                    </Group>

                    <Box pt={20}>
                        <Box
                            style={{
                                backgroundColor: "white",
                                padding: 10,
                                borderRadius: 10,
                            }}
                        >
                            <ScrollArea>
                                <Table withTableBorder horizontalSpacing="xl">
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>PASLON</Table.Th>
                                            <Table.Th>RATE</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {isData.map((v: any, i: any) => (
                                            <Table.Tr key={i}>
                                                <Table.Td>{v.name}</Table.Td>
                                                <Table.Td>{(v.rate).toFixed(2)} %</Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            </ScrollArea>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
                centered
                withCloseButton={false}
                closeOnClickOutside={false}
            >
                <ModalDeletePopularity tgl={param.date} time={isJam} onSuccess={() => onLoad()} />
            </Modal>
        </>
    );
}