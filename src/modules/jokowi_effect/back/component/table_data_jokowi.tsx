'use client'

import { Box, Button, Center, Group, Modal, ScrollArea, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import DetailDataJokowi from "./detail_data_jokowi";
import ModalDeleteJokowi from "./modal_delete_jokowi";
import { useAtom } from "jotai";
import { isModalJokowi } from "../val/modal_jokowi";
import { funGetEffectByDate } from "../..";
import { useRouter } from "next/navigation";
import { useShallowEffect } from "@mantine/hooks";

export default function TableDataJokowi({ title, data, searchParam }: { title: any, data: any, searchParam: any }) {
    const is_client = useState(false)

    useShallowEffect(() => {
      if (window) is_client[1](true)
    }, [])
    const [openModal, setOpenModal] = useAtom(isModalJokowi);
    const [dataDelete, setDataDelete] = useState(Number)
    const router = useRouter()

    const [isData, setData] = useState(data)

    async function onLoad() {
        const dataDB = await funGetEffectByDate({ date: searchParam.date })
        setData(dataDB.data)
    }

    useEffect(() => {
        setData(data)
    }, [data])


    return (
        <>
            <Box mt={30}>
                <Box
                    style={{
                        backgroundColor: "gray",
                        padding: 20,
                        borderRadius: 10,
                    }}
                >
                    <Group justify="space-between" gap="lg">
                        <Text fw={"bold"} c={"white"}>
                            {title}
                        </Text>
                        {/* <Button bg={"gray"} onClick={() => router.push("ml-ai/add?prov=" + searchParams.get('prov') + '&city=' + searchParams.get('city'))}>
                            TAMBAH MLAI
                        </Button> */}
                        <Button bg={"white"} c={"dark"} radius={"md"} onClick={() => router.push("/dashboard-admin/jokowi-effect/add")}>Add JOKOWI EFFECT</Button>
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
                                <Table
                                    withTableBorder
                                    withRowBorders={false}
                                    horizontalSpacing="xl"
                                >
                                    <Table.Thead>
                                        <Table.Tr
                                            style={{
                                                borderBottom: "1px solid #CED4D9",
                                            }}
                                        >
                                            <Table.Th>No</Table.Th>
                                            <Table.Th w={200}>Jam</Table.Th>
                                            <Table.Th>
                                                <Center>Aksi</Center>
                                            </Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    {isData.map((v: any, i: any) => (
                                        <DetailDataJokowi v={v} i={i} key={i} onClick={(val) => {
                                            setDataDelete(val)
                                            setOpenModal(true)
                                        }} />
                                    ))}
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
                <ModalDeleteJokowi id={dataDelete} onSuccess={() => onLoad()} />
            </Modal>
        </>
    );
}