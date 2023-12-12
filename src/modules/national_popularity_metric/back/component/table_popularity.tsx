'use client'

import { Box, Group, ScrollArea, Select, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";

/**
 * Fungsi untuk menampilkan modal upload popularity.
 * @param {data} data - menampilkan data.
 * @param {title} title - menampilkan title.
 * @returns Untuk menampilkan modal upload popularity
 */
export default function TableDataPopularity({ title, data }: { title: string, data: any }) {
    const [isData, setData] = useState(data)
    let angka

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
                    <Group justify="space-between">
                        <Text fw={"bold"} c={"white"}>
                            {title}
                        </Text>
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
                                            <Table.Th>JAM</Table.Th>
                                            <Table.Th>RATE</Table.Th>
                                            <Table.Th>CONFIDENCE</Table.Th>
                                            <Table.Th>SUPPORTIVE</Table.Th>
                                            <Table.Th>POSITIVE</Table.Th>
                                            <Table.Th>UNDECIDED</Table.Th>
                                            <Table.Th>UNSUPPORTIVE</Table.Th>
                                            <Table.Th>UNCOMFORTABLE</Table.Th>
                                            <Table.Th>NEGATIVE</Table.Th>
                                            <Table.Th>DISSAPPROVAL</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {isData.map((v: any, i: any) => (
                                            <Table.Tr key={i}>
                                                <Table.Td>{v.name}</Table.Td>
                                                <Table.Td>{v.timeEmotion}</Table.Td>
                                                <Table.Td>{(v.rate).toFixed(2)}%</Table.Td>
                                                <Table.Td>{v.confidence}</Table.Td>
                                                <Table.Td>{v.supportive}</Table.Td>
                                                <Table.Td>{v.positive}</Table.Td>
                                                <Table.Td>{v.undecided}</Table.Td>
                                                <Table.Td>{v.unsupportive}</Table.Td>
                                                <Table.Td>{v.uncomfortable}</Table.Td>
                                                <Table.Td>{v.negative}</Table.Td>
                                                <Table.Td>{v.dissapproval}</Table.Td>
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