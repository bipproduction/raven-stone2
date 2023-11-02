'use client'

import { Box, Button, Group, Paper, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import UploadDataEmotionCandidate from "../component/upload_data_emotion_candidate";
import TableDataEmotionCandidate from "../component/table_emotion_candidate";
import papa from "papaparse"

export default function ViewAdminEmotionCandidate({ param, provinsi, candidate, datatable, datadownload }: { param: any, provinsi: any, candidate: any, datatable: any, datadownload: any }) {
    const router = useRouter()



    const [dataProvinsi, setDataProvinsi] = useState(provinsi)
    const [dataCandidate, setDataCandidate] = useState(candidate)
    const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
    const [isCandidate, setCandidate] = useState<any>(param.idCandidate || null)
    const [isDate, setDate] = useState<any>(param.date)




    useEffect(() => {
        setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
        //setCandidate((param.idCandidate) ? console.log('ini') : console.log('else'))
        setDate((param.date == null) ? new Date() : new Date(param.date))
    }, [param])



    function onProccess() {
        if (_.isNull(isCandidate)) return toast("Silahkan pilih kandidat", { theme: "dark" })
        router.replace('/dashboard-admin/emotion-candidate?candidate=' + isCandidate + '&date=' + moment(isDate).format("YYYY-MM-DD") + '&prov=' + isProvinsi)
    }

    return (
        <>
            <Stack>
                <Text fw={"bold"}>EMOTION EDITOR CANDIDATE</Text>
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
                                    placeholder="Pilih Kandidat"
                                    data={dataCandidate.map((can: any) => ({
                                        value: String(can.id),
                                        label: can.name
                                    }))}
                                    required
                                    value={isCandidate}
                                    label={"Kandidat"}
                                    searchable
                                    onChange={(val) => { setCandidate(val) }}
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
                                    onChange={(val) => setProvinsi(val)}
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

                                <UploadDataEmotionCandidate />
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
                    <TableDataEmotionCandidate title={datatable.title} data={datatable.data} th={datatable.th} />
                </Box>
            )}
        </>
    );
}