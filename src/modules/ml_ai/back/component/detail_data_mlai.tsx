'use client'
import { ActionIcon, Box, Center, Collapse, Group, Stack, Table, Text } from "@mantine/core";
import { useState } from "react";
import { CiEdit, CiRead, CiUnread } from "react-icons/ci";
import { MdDelete, MdEditCalendar } from "react-icons/md";
import moment from "moment";
import { useRouter } from "next/navigation";

/**
 * Fungsi untuk menampilkan detail data ml ai.
 * @param {v} v - menampilkan v.
 * @param {i} i - menampilkan i.
 * @param {onClick} onClick - menampilkan onClick.
 * @returns Untuk menampilkan detail data ml ai
 */

export default function DetailDataMLAI({ v, i, onClick }: { v: any; i: any, onClick: (val: any) => void }) {
    const formatDate = moment.utc(v.timeContent).format('HH:mm');
    const open = useState(false);
    const router = useRouter()

    function callBackDelete({ idDel }: { idDel: any }) {
        onClick(idDel)
    }

    return (
        <>
            <Table.Tbody key={i}>
                <Table.Tr>
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>{formatDate}</Table.Td>
                    <Table.Td>
                        <Center>
                            <Stack>
                                <Group>
                                    <ActionIcon
                                        variant="transparent"
                                        color="rgba(5, 128, 23, 1)"
                                        size="xl"
                                        aria-label="Edit"
                                        onClick={() => open[1](!open[0])}
                                    >
                                        {open[0] ? <CiRead size={20} /> : <CiUnread size={20} />}
                                    </ActionIcon>
                                </Group>
                            </Stack>
                            <ActionIcon
                                variant="transparent"
                                color="green"
                                size="xl"
                                aria-label="Edit"
                                onClick={() => router.push(`/dashboard-admin/ml-ai/edit/${v.id}`)}
                            >
                                <CiEdit size={25} />
                            </ActionIcon>
                            <ActionIcon
                                variant="transparent"
                                color="rgba(209, 4, 4, 1)"
                                size="xl"
                                aria-label="Delete"
                                onClick={(val) => {
                                    callBackDelete({ idDel: v.id })
                                }}
                            >
                                <MdDelete size={20} />
                            </ActionIcon>
                        </Center>
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td colSpan={5}>
                        <Collapse
                            in={open[0]}
                            transitionDuration={500}
                            transitionTimingFunction="linear"
                        >
                            <Box
                                style={{
                                    backgroundColor: "gray",
                                    padding: 20,
                                    borderRadius: 10,
                                }}
                            >
                                <Text c={"white"} fw={"bold"} fz={20} mb={10}>
                                    Content
                                </Text>
                                <Stack c={'white'}>
                                    <Box dangerouslySetInnerHTML={{ __html: v.content }} />
                                </Stack>
                            </Box>
                        </Collapse>
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </>
    );
}