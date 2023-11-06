'use client'

import { Box, Button, Group, Paper, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import TableDataEmotionPaslon from "../component/table_emotion_paslon";
import papa from "papaparse"

export default function ViewAdminEmotionPaslon({ param, provinsi, paslon, datatable, datadownload }: { param: any, provinsi: any, paslon: any, datatable: any, datadownload: any }) {
    const router = useRouter()
    const today = new Date();

    const [dataProvinsi, setDataProvinsi] = useState(provinsi)
    const [dataPaslon, setDataPaslon] = useState<any>(paslon)
    const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
    const [isPaslon, setPaslon] = useState<any>(param.idPaslon || null)
    const [isDate, setDate] = useState<any>((_.isNull(param.date)) ? today : new Date(param.date))



    useEffect(() => {
        setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
        setPaslon((param.idPaslon == 0) ? null : param.idPaslon)
        setDate((param.date == null) ? new Date() : new Date(param.date))
    }, [param])

    async function onProvinsi({ idProv }: { idProv: any }) {
        setProvinsi(idProv)
    }


    function onProccess() {
        if (_.isNull(isPaslon)) return toast("Silahkan pilih paslon", { theme: "dark" })
        router.replace('/dashboard-admin/emotion-paslon?paslon=' + isPaslon + '&date=' + moment(isDate).format("YYYY-MM-DD") + '&prov=' + isProvinsi)
    }

    return (
        <>
            <Stack>
                <Text fw={"bold"}>EMOTION EDITOR PASLON</Text>
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
                                <Select
                                    placeholder="Pilih Paslon"
                                    data={dataPaslon.map((can: any) => ({
                                        value: String(can.id),
                                        label: can.name
                                    }))}
                                    required
                                    value={isPaslon}
                                    label={"Paslon"}
                                    searchable
                                    onChange={(val) => { setPaslon(val) }}
                                />
                                <DateInput valueFormat="DD-MM-YYYY" required value={isDate}
                                    label={"Tanggal"} placeholder="Pilih Tanggal" onChange={(val) => { setDate(val) }} />
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
                                    onClick={() => router.push("/dashboard-admin/emotion-paslon/upload")}
                                >
                                    <Text ta={"center"} size="xl" inline>
                                        UPLOAD DATA
                                    </Text>
                                </Box>
                            </Group>
                        </Box>
                        {!_.isNull(datatable.title) && (
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
                                            const dataJson = datadownload.data

                                            const jsonData = papa.unparse(dataJson)
                                            const jsonDataUrl = "data:text/csv;charset=utf-8," + encodeURIComponent(jsonData)

                                            const jsonDwnloadLink = document.createElement("a")
                                            jsonDwnloadLink.href = jsonDataUrl
                                            jsonDwnloadLink.download = datadownload.title + ".csv"
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
                                        onClick={() => router.push("emotion/copy-data")}
                                    >
                                        <Text c={"white"} fw={"bold"} ta={"center"}>
                                            COPY DATA
                                        </Text>
                                    </Box>
                                </Box>
                            </Group>
                        )}
                    </Box>
                </SimpleGrid>
            </Box>
            {!_.isNull(datatable.title) && (
                <Box pt={20}>
                    <TableDataEmotionPaslon param={param} title={datatable.title} data={datatable.data} th={datatable.th} datajam={datatable.jam} />
                </Box>
            )}
        </>
    );
}