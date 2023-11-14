'use client'

import { Box, Button, Center, Group, Modal, ScrollArea, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import DetailDataMLAI from "./detail_data_mlai";
import { useAtom } from "jotai";
import { isModalMlai } from "../val/modal_mlai";
import ModalDeleteMlai from "./modal_delete_mlai";
import { funGetMlaiPaslonDate } from "../..";
import { useRouter } from "next/navigation";

export default function TableDataMLAI({ title, data, searchParam }: { title: any, data: any, searchParam: any }) {
    const [openModal, setOpenModal] = useAtom(isModalMlai);
    const [dataDelete, setDataDelete] = useState(Number)

    const [isData, setData] = useState(data)

    async function onLoad() {
        const dataDB = await funGetMlaiPaslonDate({ date: searchParam.date, paslon: searchParam.idPaslon })
        setData(dataDB.data)
    }

    useEffect(() => {
        setData(data)
    }, [data])

    const router = useRouter()

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
                        <Button bg={"white"} c={"dark"} radius={"md"} onClick={() => router.push("/dashboard-admin/ml-ai/add")}>Add ML AI</Button>
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
                                        <DetailDataMLAI v={v} i={i} key={i} onClick={(val) => {
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
                <ModalDeleteMlai id={dataDelete} onSuccess={() => onLoad()} />
            </Modal>
        </>
    );
}