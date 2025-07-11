'use client'

import { Box, Group, ScrollArea, Select, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { funDownloadEmotionCandidateByDate, funGetEmotionCandidateDateArea } from "../..";


/**
 * Fungsi untuk menampilkan Modal upload emotion candidate.
 * @param {data} data - menampilkan data.
 * @param {param} param - menampilkan param.
 * @param {title} title - menampilkan title.
 * @param {th} th - menampilkan th.
 * @param {dataJam} dataJam - menampilkan dataJam.
 * @param {onLoad} onLoad - menampilkan onLoad.
 * @returns Untuk menampilkan Modal upload emotion candidate
 */
export default function TableDataEmotionCandidate({ param, title, data, th, datajam, onLoad }: { param: any, title: string, data: any, th: any, datajam: any, onLoad: (val: any) => void }) {
    const [isData, setData] = useState(data)
    const [dataJam, setDataJam] = useState(datajam)
    const [isJam, setJam] = useState((datajam.length > 0) ? datajam[0].timeEmotion : null)

    async function getLoad(valJam: any) {
        setJam(valJam)
        param['jam'] = valJam
        const dataDB = await funGetEmotionCandidateDateArea({ find: param })
        setData(dataDB.data)
        const dataDownload = await funDownloadEmotionCandidateByDate({ find: param })
        onLoad(dataDownload)
    }

    useEffect(() => {
        setData(data)
        setJam((datajam.length > 0) ? datajam[0].timeEmotion : null)
    }, [data, datajam])

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
                                data={datajam.map((can: any) => ({
                                    value: String(can.timeEmotion),
                                    label: can.timeEmotion
                                }))}
                                value={isJam}
                                onChange={(val) => getLoad(val)}
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
                                            <Table.Th>UNCOMFORTABLE</Table.Th>
                                            <Table.Th>NEGATIVE</Table.Th>
                                            <Table.Th>DISSAPPROVAL</Table.Th>
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