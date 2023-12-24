'use client'

import { Box, Button, Group, Paper, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import _ from "lodash";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import TableDataStep from "../component/table_data_step";
import { useRouter } from "next/navigation";
import papa from "papaparse";

/**
 * Fungsi untuk menampilkan view Admin Step.
 * @param {kandidat} kandidat - menampilkan kandidat.
 * @param {params} params - menampilkan params.
 * @param {datatable} datatable - menampilkan datatable.
 * @param {datadownload} datadownload - menampilkan datadownload.
 * @returns Untuk menampilkan keseluruhan dari View Admin Step
 */
export default function ViewAdminStep({ params, kandidat, datatable, datadownload }: { params: any, kandidat: any, datatable: any, datadownload: any }) {
    const router = useRouter();
    const [dataKandidat, setDataKandidat] = useState(kandidat)
    const [isKandidat, setKandidat] = useState<any>(params.idCandidate || null)

    async function onChooseKandidat({ idCan }: { idCan: any }) {
        setKandidat(idCan)
    }

    function onProsses() {
        if (isKandidat == null) return toast("Silahkan pilih kandidat", { theme: "dark" })
        router.replace("/dashboard-admin/step?candidate=" + isKandidat)
    }

    useEffect(() => {
        setKandidat(params.idCandidate == 0 ? null : params.idCandidate)
    }, [params])

    return (
        <>
            <Stack>
                <Text fw={"bold"}>STEP</Text>
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
                                    placeholder="Pilih Kandidat"
                                    data={dataKandidat.map((pro: any) => ({
                                        value: String(pro.id),
                                        label: pro.name
                                    }))}
                                    value={isKandidat}
                                    label={"Kandidat"}
                                    searchable
                                    onChange={(val) => onChooseKandidat({ idCan: val })}
                                />
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
                            onClick={() => router.push("/dashboard-admin/step/upload")}
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
                <TableDataStep title={datatable.title} data={datatable.data} searchParam={params} />
            }
        </>
    )
}