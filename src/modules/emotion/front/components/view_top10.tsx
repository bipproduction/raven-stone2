import { WARNA } from '@/modules/_global';
import { Box, Group, Pagination, ScrollArea, Table } from '@mantine/core';
import React from 'react';

const top10 = [
    {
        id: 1,
        provinsi: "Jawa Barat",
        locked: "2.890.900",
        filtered: "1.891.891",
        confidence: "3.908.178",
        supportive: "4.890.901",
        positive: "1.221.333",
        negative: "2.009.009",
    },
    {
        id: 2,
        provinsi: "Jawa Timur",
        locked: "2.890.900",
        filtered: "1.891.891",
        confidence: "3.908.178",
        supportive: "4.890.901",
        positive: "1.221.333",
        negative: "2.009.009",
    },
    {
        id: 3,
        provinsi: "Jawa Tengah",
        locked: "2.890.900",
        filtered: "1.891.891",
        confidence: "3.908.178",
        supportive: "4.890.901",
        positive: "1.221.333",
        negative: "2.009.009",
    },
    {
        id: 4,
        provinsi: "Banten",
        locked: "2.890.900",
        filtered: "1.891.891",
        confidence: "3.908.178",
        supportive: "4.890.901",
        positive: "1.221.333",
        negative: "2.009.009",
    },
    {
        id: 5,
        provinsi: "Jakarta",
        locked: "2.890.900",
        filtered: "1.891.891",
        confidence: "3.908.178",
        supportive: "4.890.901",
        positive: "1.221.333",
        negative: "2.009.009",
    },
    {
        id: 6,
        provinsi: "Lampung",
        locked: "2.890.900",
        filtered: "1.891.891",
        confidence: "3.908.178",
        supportive: "4.890.901",
        positive: "1.221.333",
        negative: "2.009.009",
    },
    {
        id: 7,
        provinsi: "Sumatera Selatan",
        locked: "2.890.900",
        filtered: "1.891.891",
        confidence: "3.908.178",
        supportive: "4.890.901",
        positive: "1.221.333",
        negative: "2.009.009",
    },
    {
        id: 8,
        provinsi: "Sulawesi Selatan",
        locked: "2.890.900",
        filtered: "1.891.891",
        confidence: "3.908.178",
        supportive: "4.890.901",
        positive: "1.221.333",
        negative: "2.009.009",
    },
    {
        id: 9,
        provinsi: "Sumatera Utara",
        locked: "2.890.900",
        filtered: "1.891.891",
        confidence: "3.908.178",
        supportive: "4.890.901",
        positive: "1.221.333",
        negative: "2.009.009",
    },
    {
        id: 10,
        provinsi: "Bali",
        locked: "2.890.900",
        filtered: "1.891.891",
        confidence: "3.908.178",
        supportive: "4.890.901",
        positive: "1.221.333",
        negative: "2.009.009",
    },
]


/**
 * Fungsi untuk menampilkan top 10.
 * @returns {component} menampilakn top 10.
 */
export default function ViewTop10() {

    return (
        <>
            <Box style={{
                // backgroundColor: "#101010",
                background: "rgba(0,0,0,0.3)",
                padding: 20,
                borderRadius: 10
            }}>
                <ScrollArea>
                    <Table withRowBorders={false}>
                        <Table.Thead c={"white"}>
                            <Table.Tr >
                                <Table.Th>NO</Table.Th>
                                <Table.Th>PROVINCE</Table.Th>
                                <Table.Th>LOCKED AUDIENCE</Table.Th>
                                <Table.Th>FILTERED AUDIENCE</Table.Th>
                                <Table.Th>CONFIDENCE</Table.Th>
                                <Table.Th>SUPPORTIVE</Table.Th>
                                <Table.Th>POSITIVE</Table.Th>
                                <Table.Th>NEGATIVE</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody c={"white"} >
                            {top10.map((v, i) => (
                                <Table.Tr key={i}>
                                    <Table.Td>{i + 1}</Table.Td>
                                    <Table.Td>{v.provinsi}</Table.Td>
                                    <Table.Td c={"white"}>{v.locked}</Table.Td>
                                    <Table.Td c={"white"}>{v.filtered}</Table.Td>
                                    <Table.Td c={"#6ABD45"}>{v.confidence}</Table.Td>
                                    <Table.Td c={"#98CC6F"}>{v.supportive}</Table.Td>
                                    <Table.Td c={"#C6E2B7"}>{v.positive}</Table.Td>
                                    <Table.Td c={WARNA.merah}>{v.negative}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Box>
                <Box pt={20}>
                    <Group justify='flex-end'>
                        <Pagination total={10} color="rgba(70, 5, 120, 1)" />
                    </Group>
                </Box>


        </>
    );
}
