'use client'

import { Box, Button, Group, Paper, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import TableDataMLAI from "../component/table_data_mlai";
import papa from "papaparse"
import { DateInput } from "@mantine/dates";
import moment from "moment";
import { useShallowEffect } from "@mantine/hooks";


/**
 * Fungsi untuk menampilkan view admin ml ai.
 * @param {params} params - menampilkan params.
 * @param {paslon} paslon - menampilkan paslon.
 * @param {datatable} datatable - menampilkan datatable.
 * @param {datadownload} datadownload - menampilkan datadownload.
 * @returns Untuk menampilkan view admin ml ai
 */
export default function ViewAdminMLAI({ params, paslon, datatable, datadownload }: { params: any, paslon: any, datatable: any, datadownload: any }) {
    const router = useRouter();
    const [dataPaslon, setDataPaslon] = useState(paslon)
    const [isPaslon, setPaslon] = useState<any>(params.idPaslon || null)
    const [isDate, setDate] = useState<any>(params.date)

    async function onChoose({ idPaslon }: { idPaslon: any }) {
        setPaslon(idPaslon)
    }

    function onProsses() {
        if (isPaslon == null) return toast("Silahkan pilih paslon", { theme: "dark" })
        router.replace("/dashboard-admin/ml-ai?paslon=" + isPaslon + '&date=' + moment(isDate).format('YYYY-MM-DD'))
    }

    useEffect(() => {
        setPaslon(params.idPaslon == 0 ? null : params.idPaslon)
    }, [params])

    const is_client = useState(false)

    useShallowEffect(() => {
      if (window) is_client[1](true)
    }, [])

    return (
        <>
            <Stack>
                <Text fw={"bold"}>ML - AI</Text>
            </Stack>
            <Box pt={30}>
                <SimpleGrid
                    cols={{ base: 1, sm: 2, lg: 2 }}
                    spacing={{ base: 10, sm: "xl" }}
                >
                    <Box>
                        <Paper shadow="xs" p="xl">
                            <Stack>
                                <Select
                                    placeholder="Pilih Paslon"
                                    data={dataPaslon.map((pro: any) => ({
                                        value: String(pro.id),
                                        label: pro.name
                                    }))}
                                    value={isPaslon}
                                    label={"Paslon"}
                                    searchable
                                    required
                                    onChange={(val) => onChoose({ idPaslon: val })}
                                />
                                <DateInput valueFormat="DD-MM-YYYY" value={isDate} required
                                    label={"Tanggal"} placeholder="Pilih Tanggal" onChange={(val) => { setDate(val) }} />
                                <Button
                                    bg={"gray"}
                                    onClick={() => onProsses()}
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
                            onClick={() => router.push("/dashboard-admin/ml-ai/upload")}
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
                <TableDataMLAI title={datatable.title} data={datatable.data} searchParam={params} />
            }
        </>
    )
}