'use client'

import { Box, ScrollArea, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";


/**
 * Fungsi untuk menampilkan table data leader trait assessment.
 * @param {data} data - menampilkan data.
 * @param {title} title - menampilkan title.
 * @param {th} th - menampilkan th.
 * @returns Untuk menampilkan table data leader trait assessment
 */
export default function TableDataLTA({ title, data, th }: { title: string, data: any, th: any }) {
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
                                            <Table.Th>NO</Table.Th>
                                            <Table.Th>{th}</Table.Th>
                                            <Table.Th>CERDAS</Table.Th>
                                            <Table.Th>JUJUR</Table.Th>
                                            <Table.Th>TEGAS</Table.Th>
                                            <Table.Th>AGAMIS</Table.Th>
                                            <Table.Th>PEKERJA KERAS</Table.Th>
                                            <Table.Th>BERPENGALAMAN MEMIMPIN</Table.Th>
                                            <Table.Th>BERPRESTASI</Table.Th>
                                            <Table.Th>MERAKYAT</Table.Th>
                                            <Table.Th>LATAR BELAKANG MILITER</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {isData.map((v: any, i: any) => (
                                            <Table.Tr key={i}>
                                                <Table.Td>{i + 1}</Table.Td>
                                                <Table.Td>{v.name}</Table.Td>
                                                <Table.Td>{v.cerdas}</Table.Td>
                                                <Table.Td>{v.jujur}</Table.Td>
                                                <Table.Td>{v.tegas}</Table.Td>
                                                <Table.Td>{v.agamis}</Table.Td>
                                                <Table.Td>{v.pekerjaKeras}</Table.Td>
                                                <Table.Td>{v.berpengalamanMemimpin}</Table.Td>
                                                <Table.Td>{v.berprestasi}</Table.Td>
                                                <Table.Td>{v.merakyat}</Table.Td>
                                                <Table.Td>{v.latarBelakangMiliter}</Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            </ScrollArea>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}