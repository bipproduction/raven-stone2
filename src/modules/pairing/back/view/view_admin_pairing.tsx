'use client'

import { Box, Button, Group, Paper, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import UploadDataPairing from "../component/upload_data_pairing";
import TableDataPairing from "../component/table_pairing";
import moment from "moment";

export default function ViewAdminPairing({ param, provinsi, kabupaten, candidate, datatable }: { param: any, provinsi: any, kabupaten: any, candidate: any, datatable: any }) {
    const router = useRouter()
    const today = new Date();

    const [dataProvinsi, setDataProvinsi] = useState(provinsi)
    const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
    const [dataCandidate, setDataCandidate] = useState<any>(candidate)
    const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
    const [isKabupaten, setKabupaten] = useState<any>(param.idKabkot || null)
    const [isCandidate1, setCandidate1] = useState<any>(param.idCandidate1 || null)
    const [isCandidate2, setCandidate2] = useState<any>(param.idCandidate2 || null)
    const [isDate, setDate] = useState<any>((_.isNull(param.date)) ? today : new Date(param.date))



    useEffect(() => {
        setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
        setKabupaten((param.idKabkot == 0) ? null : param.idKabkot)
        setCandidate1((param.idCandidate1 == 0) ? null : param.idCandidate1)
        setCandidate2((param.idCandidate2 == 0) ? null : param.idCandidate2)
        setDate((param.date == null) ? new Date() : new Date(param.date))
    }, [param])



    async function onProvinsi({ idProv }: { idProv: any }) {
        setProvinsi(idProv)
        setKabupaten(null)
        setCandidate1(null)
        setCandidate2(null)
        // const dataDbKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
        // const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(idProv), tingkat: 1 } })
        // setDataKabupaten(dataDbKab)
        // setDataCandidate(dataDbCan)
    }

    async function onKabupaten({ idKab }: { idKab: any }) {
        setKabupaten(idKab)
        setCandidate1(null)
        setCandidate2(null)
        // const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(isProvinsi), idKabkot: Number(idKab), tingkat: 2 } })
        // setDataCandidate(dataDbCan)
    }


    function onProccess() {
        if (_.isNull(isProvinsi)) return toast("Silahkan pilih provinsi", { theme: "dark" })
        if (_.isNull(isCandidate1)) return toast("Silahkan pilih kandidat pertama", { theme: "dark" })
        if (_.isNull(isCandidate2)) return toast("Silahkan pilih kandidat kedua", { theme: "dark" })
        router.replace('/dashboard-admin/pairing?prov=' + isProvinsi + '&city=' + isKabupaten + '&can1=' + isCandidate1 + '&can2=' + isCandidate2 + '&date=' + moment(isDate).format("YYYY-MM-DD"))
    }



    return (
        <>
            <Stack>
                <Text fw={"bold"}>REGIONAL DATA PAIRING</Text>
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
                                    placeholder="Pilih Provinsi"
                                    data={dataProvinsi.map((pro: any) => ({
                                        value: String(pro.id),
                                        label: pro.name
                                    }))}
                                    value={isProvinsi}
                                    required
                                    label={"Provinsi"}
                                    searchable
                                    onChange={(val) => onProvinsi({ idProv: val })}
                                />
                                <Select
                                    placeholder="Pilih Kabupaten/Kota"
                                    data={dataKabupaten.map((kab: any) => ({
                                        value: String(kab.id),
                                        label: kab.name
                                    }))}
                                    value={isKabupaten}
                                    label="Kabupaten/Kota"
                                    searchable
                                    onChange={(val) => onKabupaten({ idKab: val })}
                                />
                                <Select
                                    placeholder="KANDIDAT 1"
                                    data={dataCandidate.map((can: any) => ({
                                        value: String(can.id),
                                        label: can.name
                                    }))}
                                    required
                                    value={isCandidate1}
                                    label={"Candidate 1"}
                                    searchable
                                    onChange={(val) => {
                                        setCandidate2(null)
                                        setCandidate1(val)
                                    }}
                                />
                                <Select
                                    placeholder="KANDIDAT 2"
                                    data={dataCandidate.map((can: any) => ({
                                        value: String(can.id),
                                        label: can.name
                                    }))}
                                    required
                                    value={isCandidate2}
                                    label={"Candidate 2"}

                                    onChange={(val) => {
                                        if (val == isCandidate1) {
                                            setCandidate2(null)
                                            toast("Kandidat 1 & 2 tidak boleh sama", { theme: "dark" })
                                        } else {
                                            setCandidate2(val)
                                        }
                                    }}
                                />
                                <DateInput valueFormat="DD-MM-YYYY" required value={isDate}
                                    label={"Select Date"} placeholder="SELECT DATE" onChange={(val) => { setDate(val) }} />
                                <Button bg={"gray"} onClick={() => onProccess()}>
                                    PROSES
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>
                    {(param.idProvinsi > 0) &&
                        <Box>
                            <UploadDataPairing />
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
                                        onClick={() => router.push("pairing/copy-data")}
                                    >
                                        <Text c={"white"} fw={"bold"} ta={"center"}>
                                            COPY DATA
                                        </Text>
                                    </Box>
                                </Box>
                            </Group>
                        </Box>
                    }
                </SimpleGrid>
            </Box>
            {(param.idProvinsi > 0) &&
                <Box pt={30}>
                    <TableDataPairing />
                </Box>
            }
        </>
    );
}