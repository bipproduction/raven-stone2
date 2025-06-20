'use client'
import { Box, ScrollArea, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";

/**
 * Menampilkan table data audience
 * @param title judul table
 * @param data data yg dari database
 * @param th th kolom table
 * @returns komponen table data audience
 */

export default function TableDataAudience({ title, data, th }: { title: string, data: any, th: any }) {
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
                                            <Table.Th>VALUE</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {isData.map((v: any, i: any) => (
                                            <Table.Tr key={i}>
                                                <Table.Td>{i + 1}</Table.Td>
                                                <Table.Td>{v.name}</Table.Td>
                                                <Table.Td>{v.value}</Table.Td>
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