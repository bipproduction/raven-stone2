'use client'

import { Box, Button, Group, Paper, Select, SimpleGrid, Stack, Text } from "@mantine/core"
import _ from "lodash"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-simple-toasts"
import papa from "papaparse"
import TableDataLTA from "../component/table_lta"

export default function ViewAdminLTA({ datadownload, param, provinsi, datatable }: { datadownload: any, param: any, provinsi: any, datatable: any }) {
    const router = useRouter()

    const [dataProvinsi, setDataProvinsi] = useState(provinsi)
    const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)


    useEffect(() => {
        setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
    }, [param])


    async function onProvinsi({ idProv }: { idProv: any }) {
        setProvinsi(idProv)
    }

    function onProccess() {
        router.replace('/dashboard-admin/leader-trait-assessment?prov=' + isProvinsi)
    }

    return (
        <>
            <Stack>
                <Text fw={"bold"}>LEADER TRAIT ASSESSMENT</Text>
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
                                    placeholder="Pilih Provinsi"
                                    data={dataProvinsi.map((pro: any) => ({
                                        value: String(pro.id),
                                        label: pro.name
                                    }))}
                                    value={isProvinsi}
                                    label={"Provinsi"}
                                    searchable
                                    onChange={(val) => onProvinsi({ idProv: val })}
                                />
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
                            onClick={() => router.push("/dashboard-admin/leader-trait-assessment/upload")}
                        >
                            <Text ta={"center"} size="xl" inline>
                                UPLOAD
                            </Text>
                        </Box>

                        {!_.isNull(datatable.title) && (
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
                                    jsonDwnloadLink.download = datadownload.title
                                    jsonDwnloadLink.click()
                                }}
                            >
                                <Text ta={"center"} size="xl" inline>
                                    DOWNLOAD
                                </Text>
                            </Box>
                        )}

                    </Group>
                </SimpleGrid>
            </Box>
            {!_.isNull(datatable.title) && (
                <Box pt={30}>
                    <TableDataLTA data={datatable.data} title={datatable.title} th={datatable.thTitle} />
                </Box>
            )}
        </>
    );
}