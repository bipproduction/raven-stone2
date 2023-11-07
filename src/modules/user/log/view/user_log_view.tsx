'use client'

import { Box, Button, Divider, Grid, Paper, Select, Stack, Text } from "@mantine/core"
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import TableLogUser from "../component/table_log_user";
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
    const [isUser, setUser] = useState("")
    const [data, setData] = useState<any>([])

    async function onLog() {
        const data = funGetLogUser({ body: { 'dateFrom': moment(dateFrom).format('YYYY-MM-DD'), 'dateTo': moment(dateTo).format('YYYY-MM-DD'), 'user': isUser, 'page': 1 } })
        setShow(true)
        setData(data)
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
                                                onLog()
                                            }}
                                        >
                                            Cari
                                        </Button>
                                    </Box>
                                </Grid.Col>
                            </Grid>
                        </Box>
                        {show && <TableLogUser />}
                    </Paper>
                </Box>
            </Box>
        </>
    )
}