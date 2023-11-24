'use client'

import { Box, Button, Divider, Grid, Group, Pagination, Paper, ScrollArea, Select, Stack, Table, Text } from "@mantine/core"
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import funGetLogUser from "../fun/get_log";
import moment from "moment";

/**
 * Fungsi untuk menampilkan table log user.
 * @returns  Hasil menampilkan tabel log user berdasarkan pencarian.
 */

export default function UserLogView({ user }: { user: any }) {
    const [show, setShow] = useState(false)
    const [dateFrom, setDateFrom] = useState<any>(new Date())
    const [dateTo, setDateTo] = useState<any>(new Date())
    const [isUser, setUser] = useState<any>("")
    const [isdata, setData] = useState<any>([])
    const [isNPage, setNPage] = useState(0)
    const [isChoosePage, setChoosePage] = useState(1)
    let noAwal = isChoosePage * 25 - 24;

    async function onLog(p: any) {
        const load = await funGetLogUser({ body: { 'dateFrom': moment(dateFrom).format('YYYY-MM-DD'), 'dateTo': moment(dateTo).format('YYYY-MM-DD'), 'user': isUser, 'page': p } })
        setShow(true)
        setChoosePage(p)
        setData(load.data)
        setNPage(load.nPage)
    }

    return (
        <>
            <Stack>
                <Text fw={"bold"}>LOG USER</Text>
            </Stack>
            <Box pt={30}>
                <Box>
                    <Paper shadow="xs" p="lg">
                        <Text fw={"bold"}>DATA LOG</Text>
                        <Divider mt={10} mb={30} />
                        <Box>
                            <Grid>
                                <Grid.Col span={3}>
                                    <DateInput
                                        mt={5}
                                        placeholder="Tanggal Awal"
                                        radius={"md"}
                                        value={dateFrom}
                                        onChange={(val) => {
                                            setDateFrom(val)
                                        }}
                                    />
                                </Grid.Col>
                                <Grid.Col span={3}>
                                    <DateInput
                                        mt={5}
                                        placeholder="Tanggal Akhir"
                                        radius={"md"}
                                        value={dateTo}
                                        onChange={(val) => {
                                            setDateTo(val)
                                        }}
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <Select
                                        mt={5}
                                        placeholder="Pilih User"
                                        data={user.map((pro: any) => ({
                                            value: String(pro.id),
                                            label: pro.name
                                        }))}
                                        value={isUser}
                                        onChange={(val) => setUser(val)}
                                        searchable
                                    />
                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <Box mt={5}>
                                        <Button
                                            ta={"center"}
                                            fullWidth
                                            radius={"md"}
                                            onClick={() => {
                                                onLog(1)
                                            }}
                                        >
                                            Cari
                                        </Button>
                                    </Box>
                                </Grid.Col>
                            </Grid>
                        </Box>
                        {show &&
                            <>
                                <Box pt={30}>
                                    <ScrollArea>
                                        <Table >
                                            <Table.Thead>
                                                <Table.Tr>
                                                    <Table.Th w={"10px"}>No</Table.Th>
                                                    <Table.Th w={"220px"}>Tanggal</Table.Th>
                                                    <Table.Th w={"120px"}>Name</Table.Th>
                                                    <Table.Th w={"150px"}>Jenis Aktivitas</Table.Th>
                                                    <Table.Th>Deskripsi</Table.Th>
                                                </Table.Tr>
                                            </Table.Thead>
                                            <Table.Tbody>
                                                {isdata.map((e: any, i: any) => (
                                                    <Table.Tr key={i}>
                                                        <Table.Td>{noAwal++}</Table.Td>
                                                        <Table.Td>{moment(e.createdAt).format("llll")}</Table.Td>
                                                        <Table.Td>{e.name}</Table.Td>
                                                        <Table.Td>{e.activity}</Table.Td>
                                                        <Table.Td>{e.description}</Table.Td>
                                                    </Table.Tr>
                                                ))}
                                            </Table.Tbody>
                                        </Table>
                                    </ScrollArea>
                                </Box>
                                <Group justify="right" mt={20}>
                                    <Pagination
                                        value={isChoosePage}
                                        onChange={(val) => {
                                            onLog(val)
                                        }}
                                        total={isNPage}
                                    />
                                </Group>
                            </>
                        }
                    </Paper>
                </Box>
            </Box>
        </>
    )
}