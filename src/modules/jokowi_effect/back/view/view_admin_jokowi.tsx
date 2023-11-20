'use client'

import { Box, Button, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TableDataJokowi from "../component/table_data_jokowi";
import papa from "papaparse"
import { useShallowEffect } from "@mantine/hooks";

export default function ViewAdminJokowi({ param, datatable, datadownload }: { param: any, datatable: any, datadownload: any }) {
    const router = useRouter()
    const [isDate, setDate] = useState<any>(param.date)

    function onProccess() {
        router.replace('/dashboard-admin/jokowi-effect?date=' + moment(isDate).format("YYYY-MM-DD"))
    }

    const is_client = useState(false)

    useShallowEffect(() => {
      if (window) is_client[1](true)
    }, [])

    return (
        <>
            <Stack>
                <Text fw={"bold"}>JOKOWI EFFECT</Text>
            </Stack>
            <Box pt={30}>
                <SimpleGrid
                    cols={{ base: 1, sm: 2, lg: 2 }}
                    spacing={{ base: 10, sm: "xl" }}
                >
                    <Box>
                        <Paper shadow="xs" p="xl">
                            <Stack>
                                <DateInput valueFormat="DD-MM-YYYY" value={isDate} required
                                    label={"Tanggal"} placeholder="Pilih Tanggal" onChange={(val) => { setDate(val) }} />
                                <Button
                                    bg={"gray"}
                                    onClick={() => onProccess()}
                                >
                                    PROSES
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>
                    <Group
                        justify="left"
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                        }}
                        px={50}
                    >
                        <Box
                            style={{
                                border: "1px dashed gray",
                                borderRadius: 10,
                                padding: 40,
                                cursor: "pointer",
                            }}
                            onClick={() => router.push("/dashboard-admin/jokowi-effect/upload")}
                        >
                            <Text ta={"center"} size="xl" inline>
                                UPLOAD
                            </Text>
                        </Box>

                        <Box
                            style={{
                                border: "1px dashed gray",
                                borderRadius: 10,
                                padding: 40,
                                cursor: "pointer",
                            }}

                            onClick={() => {
                                const dataJson = datadownload.data

                                const jsonData = papa.unparse(dataJson)
                                const jsonDataUrl = "data:text/csv;charset=utf-8," + encodeURIComponent(jsonData)

                                const jsonDwnloadLink = document.createElement("a")
                                jsonDwnloadLink.href = jsonDataUrl
                                jsonDwnloadLink.download = datadownload.title + ".csv"
                                jsonDwnloadLink.click()
                            }}
                        >
                            <Text ta={"center"} size="xl" inline>
                                DOWNLOAD
                            </Text>
                        </Box>

                    </Group>
                </SimpleGrid>
            </Box>

            {!_.isNull(datatable.title) &&
                <TableDataJokowi title={datatable.title} data={datatable.data} searchParam={param} />
            }
        </>
    )
}