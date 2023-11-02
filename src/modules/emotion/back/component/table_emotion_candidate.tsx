'use client'

import { Box, ScrollArea, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function TableDataEmotionCandidate({ title, data, th }: { title: string, data: any, th: any }) {
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
                                                <Table.Td>{i + 1}</Table.Td>
                                                <Table.Td>{v.name}</Table.Td>
                                                <Table.Td>{v.confidence}</Table.Td>
                                                <Table.Td>{v.supportive}</Table.Td>
                                                <Table.Td>{v.positive}</Table.Td>
                                                <Table.Td>{v.undecided}</Table.Td>
                                                <Table.Td>{v.unsupportive}</Table.Td>
                                                <Table.Td>{v.negative}</Table.Td>
                                                <Table.Td>{v.disapproval}</Table.Td>
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