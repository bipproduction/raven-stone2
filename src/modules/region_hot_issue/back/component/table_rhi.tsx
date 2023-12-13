'use client'

import { Accordion, ActionIcon, Box, Center, ScrollArea, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { MdEditCalendar } from "react-icons/md";
import ComponentTableRhi from "./component_table_rhi";


/**
 * Fungsi untuk Menampilkan table data rhi.
 * @param {data} data - menampilkan data.
 * @param {title} title - menampilkan title.
 * @param {th} th - menampilkan th.
 * @returns Untuk Menampilkan table data rhi
 */
export default function TableDataRHI({ title, data, th }: { title: string, data: any, th: any }) {
    const [isData, setData] = useState(data)

    useEffect(() => {
        setData(data)
    }, [data])

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
                    <Text fw={"bold"} c={"white"}>
                        {title}
                    </Text>
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
                                            <Table.Th w={30}>
                                                <Center>NO</Center>
                                            </Table.Th>
                                            <Table.Th w={300}>{th}</Table.Th>
                                            <Table.Th >
                                                <Center>
                                                    Aksi
                                                </Center>
                                            </Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    {isData.map((v: any, i: any) => (
                                        <ComponentTableRhi v={v} i={i} key={i} />
                                        ))}
                                </Table>
                            </ScrollArea>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}