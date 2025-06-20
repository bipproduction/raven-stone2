'use client'

import { Box, Button, Group, Paper, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import papa from "papaparse"
import TableDataPopularity from "../component/table_popularity";

/**
 * Fungsi untuk menampilkan view admin popularity.
 * @param {param} param - menampilkan param.
 * @param {datatable} datatable - menampilkan datatable.
 * @param {datadownload} datadownload - menampilkan datadownload.
 * @returns Untuk menampilkan view admin popularity
 */
export default function ViewAdminPopularity({ param, datatable, datadownload }: { param: any, datatable: any, datadownload: any }) {
    const router = useRouter()
    const [dataDownload, setDataDownload] = useState(datadownload)
    const [isDate, setDate] = useState<any>(param.date)




    useEffect(() => {
        setDate((param.date == null) ? new Date() : new Date(param.date))
        setDataDownload(datadownload)
    }, [param, datadownload])



    function onProccess() {
        router.replace('/dashboard-admin/national-popularity-metric?&date=' + moment(isDate).format("YYYY-MM-DD"))
    }

    return (
        <>
            <Stack>
                <Text fw={"bold"}>NATIONAL POPULARITY METRIC</Text>
            </Stack>
            <Box pt={30}>
                <SimpleGrid
                    cols={{ base: 1, sm: 2, lg: 2 }}
                    spacing={{ base: 10, sm: "xl" }}
                    verticalSpacing={{ base: "md", sm: "xl" }}
                >
                    <Box>
                        <Paper shadow="xs" p="xl">
                            <Stack>
                                <DateInput valueFormat="DD-MM-YYYY" required value={isDate}
                                    label={"Tanggal"} placeholder="Pilih Tanggal" onChange={(val) => { setDate(val) }} />
                                <Button bg={"gray"} onClick={() => onProccess()}>
                                    PROSES
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>
                    <Box>
                        <Box style={{
                            backgroundColor: "white",
                            padding: 16,
                            borderRadius: 10
                        }}>
                            <Group justify="center">
                                <Box
                                    style={{
                                        border: "1px dashed gray",
                                        borderRadius: 10,
                                        padding: 40,
                                        cursor: "pointer",
                                    }}
                                    onClick={() => router.push("/dashboard-admin/national-popularity-metric/upload")}
                                >
                                    <Text ta={"center"} size="xl" inline>
                                        UPLOAD DATA
                                    </Text>
                                </Box>
                            </Group>
                        </Box>
                        <Group justify="space-between" grow pt={30}>
                            <Box>
                                <Box
                                    style={{
                                        borderRadius: 10,
                                        padding: 30,
                                        paddingTop: 50,
                                        paddingBottom: 50,
                                        backgroundColor: "gray",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        const dataJson = dataDownload.data

                                        const jsonData = papa.unparse(dataJson)
                                        const jsonDataUrl = "data:text/csv;charset=utf-8," + encodeURIComponent(jsonData)

                                        const jsonDwnloadLink = document.createElement("a")
                                        jsonDwnloadLink.href = jsonDataUrl
                                        jsonDwnloadLink.download = dataDownload.title + ".csv"
                                        jsonDwnloadLink.click()
                                    }}
                                >
                                    <Text c={"white"} fw={"bold"} ta={"center"}>
                                        DOWNLOAD
                                    </Text>
                                </Box>
                            </Box>
                            <Box>
                                <Box
                                    style={{
                                        borderRadius: 10,
                                        padding: 30,
                                        paddingTop: 50,
                                        paddingBottom: 50,
                                        backgroundColor: "gray",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => router.push("/dashboard-admin/national-popularity-metric/copy-data")}
                                >
                                    <Text c={"white"} fw={"bold"} ta={"center"}>
                                        COPY DATA
                                    </Text>
                                </Box>
                            </Box>
                        </Group>
                    </Box>
                </SimpleGrid>
            </Box>
            {!_.isNull(datatable.title) && (
                <Box pt={20}>
                    <TableDataPopularity param={param} title={datatable.title} data={datatable.data} datajam={datatable.dataJam}
                        onLoad={(val) => {
                            setDataDownload(val)
                        }} />
                </Box>
            )}
        </>
    );
}