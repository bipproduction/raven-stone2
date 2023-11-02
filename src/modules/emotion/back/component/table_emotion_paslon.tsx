'use client'

import { Box, Group, ScrollArea, Select, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function TableDataEmotionPaslon({ title, data, th, datajam }: { title: string, data: any, th: any, datajam: any }) {
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
                    <Group justify="space-between">
                        <Text fw={"bold"} c={"white"}>
                            {title}
                        </Text>
                        {
                            (datajam.length > 0) &&
                            <Select
                                data={datajam}
                            />
                        }

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
                                            <Table.Th>NO</Table.Th>
                                            <Table.Th>{th}</Table.Th>
                                            <Table.Th>CONFIDENCE</Table.Th>
                                            <Table.Th>SUPPORTIVE</Table.Th>
                                            <Table.Th>POSITIVE</Table.Th>
                                            <Table.Th>UNDECIDED</Table.Th>
                                            <Table.Th>UNSUPPORTIVE</Table.Th>
                                            <Table.Th>NEGATIVE</Table.Th>
                                            <Table.Th>DISAPPROVAL</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {isData.map((v: any, i: any) => (
                                            <Table.Tr key={i}>
                                                <Table.Td>{v.id}</Table.Td>
                                                <Table.Td>{v.kabupaten}</Table.Td>
                                                <Table.Td>{v.Confidence}</Table.Td>
                                                <Table.Td>{v.Supportive}</Table.Td>
                                                <Table.Td>{v.Positive}</Table.Td>
                                                <Table.Td>{v.Undecided}</Table.Td>
                                                <Table.Td>{v.Unsupportive}</Table.Td>
                                                <Table.Td>{v.Negative}</Table.Td>
                                                <Table.Td>{v.Disapproval}</Table.Td>
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