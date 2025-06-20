import { COLOR_EMOTION, WARNA } from '@/modules/_global';
import { Box, Group, Pagination, ScrollArea, Table } from '@mantine/core';
import _ from 'lodash';
import React, { useState } from 'react';

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
export default function ViewTop10({ data, dataLocked }: { data: any, dataLocked: any }) {
    const [isData, setData] = useState(_.slice(data.data, 0, 10))
    const [totalPage, setTotalPage] = useState(data.nPage)
    const [valPage, setPage] = useState(1)
    let noAwal = valPage * 10 - 9;

    async function onPaging(p: any) {
        const start = (10 * p) - 10;
        const end = start + 10;
        const dataNow = _.slice(data.data, start, end)
        setPage(p)
        setData(dataNow)

        // const dataLoad = await funGetEmotionJokowiEffectAreaFront({ page: p })
        // setTotalPage(dataLoad.nPage)
    }

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
                                <Table.Th>UNDECIDED</Table.Th>
                                <Table.Th>UNSUPPORTIVE</Table.Th>
                                <Table.Th>UNCOMFORTABLE</Table.Th>
                                <Table.Th>NEGATIVE</Table.Th>
                                <Table.Th>DISAPPROVAL</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody c={"white"} >
                            {isData.map((v: any, i: any) => (
                                <Table.Tr key={i}>
                                    <Table.Td>{noAwal++}</Table.Td>
                                    <Table.Td >{v.name}</Table.Td>
                                    <Table.Td align='right' c={"white"}>{
                                        Intl.NumberFormat("id-ID").format(Number(
                                            dataLocked.filter((i: any) => i.idProvinsi === v.idProvinsi)[0].value
                                        ))
                                    }</Table.Td>
                                    <Table.Td align='right' c={"white"}>{
                                        Intl.NumberFormat("id-ID").format(Number(
                                            _.sum([
                                                v.confidence,
                                                v.dissapproval,
                                                v.negative,
                                                v.positive,
                                                v.supportive,
                                                v.uncomfortable,
                                                v.undecided,
                                                v.unsupportive,
                                            ])
                                        ))
                                    }</Table.Td>
                                    <Table.Td align='right' c={COLOR_EMOTION[0].color}>{Intl.NumberFormat("id-ID").format(Number(v.confidence))}</Table.Td>
                                    <Table.Td align='right' c={COLOR_EMOTION[1].color}>{Intl.NumberFormat("id-ID").format(Number(v.supportive))}</Table.Td>
                                    <Table.Td align='right' c={COLOR_EMOTION[2].color}>{Intl.NumberFormat("id-ID").format(Number(v.positive))}</Table.Td>
                                    <Table.Td align='right' c={COLOR_EMOTION[3].color}>{Intl.NumberFormat("id-ID").format(Number(v.undecided))}</Table.Td>
                                    <Table.Td align='right' c={COLOR_EMOTION[4].color}>{Intl.NumberFormat("id-ID").format(Number(v.unsupportive))}</Table.Td>
                                    <Table.Td align='right' c={COLOR_EMOTION[5].color}>{Intl.NumberFormat("id-ID").format(Number(v.uncomfortable))}</Table.Td>
                                    <Table.Td align='right' c={COLOR_EMOTION[6].color}>{Intl.NumberFormat("id-ID").format(Number(v.negative))}</Table.Td>
                                    <Table.Td align='right' c={COLOR_EMOTION[7].color}>{Intl.NumberFormat("id-ID").format(Number(v.dissapproval))}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Box>
            <Box pt={20}>
                <Group justify='flex-end'>
                    <Pagination
                        total={totalPage}
                        color="rgba(70, 5, 120, 1)"
                        value={valPage}
                        onChange={(val) => onPaging(val)}
                    />
                </Group>
            </Box>


        </>
    );
}
