'use client'

import { Accordion, Box, Center, ScrollArea, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";

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
                                            <Table.Th w={20}>
                                                <Center>NO</Center>
                                            </Table.Th>
                                            <Table.Th>{th}</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {isData.map((v: any, i: any) => (
                                            <Table.Tr key={i}>
                                                <Table.Td>
                                                    <Center>{i + 1}</Center>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Accordion transitionDuration={1000}>
                                                        <Accordion.Item key={v.description} value={v.description} style={{
                                                            border: "none",
                                                        }}>
                                                            <Accordion.Control style={{
                                                                borderRadius: 10,

                                                            }}>
                                                                {v.name}
                                                            </Accordion.Control>
                                                            <Accordion.Panel>
                                                                <Box style={{
                                                                    backgroundColor: "gray",
                                                                    padding: 20,
                                                                    borderRadius: 10
                                                                }}>
                                                                    <Text c={"white"}>{v.description}</Text>
                                                                </Box>
                                                            </Accordion.Panel>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Table.Td>
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