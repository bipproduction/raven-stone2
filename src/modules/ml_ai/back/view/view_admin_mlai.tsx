'use client'

import { Button, Group, Select, Stack, Text } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import TableDataMLAI from "../component/table_data_mlai";

export default function ViewAdminMLAI({ params, provinsi, kabupaten, datatable }: { params: any, provinsi: any, kabupaten: any, datatable: any }) {
    const router = useRouter();
    const [dataProvinsi, setDataProvinsi] = useState(provinsi)
    const [dataKabupaten, setDatakabupaten] = useState<any>(kabupaten)
    const [isProvinsi, setProvinsi] = useState<any>(params.idProvinsi || null)
    const [isKabupaten, setKabupaten] = useState<any>(params.idKabkot || null)

    async function onKabupaten({ idProv }: { idProv: any }) {
        setProvinsi(idProv)
        setKabupaten(null)
        // const dataKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
        // setDatakabupaten(dataKab)
    }

    function onProsses() {
        if (isProvinsi == null) return toast("Silahkan pilih provinsi", { theme: "dark" })
        router.replace("/dashboard-admin/ml-ai?prov=" + isProvinsi + "&city=" + isKabupaten)
    }

    useEffect(() => {
        setProvinsi(params.idProvinsi == 0 ? null : params.idProvinsi)
        setKabupaten(params.idKabkot == 0 ? null : params.idKabkot)
    }, [params])

    return (
        <>
            <Stack>
                <Text fw={"bold"}>ML - AI</Text>
            </Stack>
            <Group grow mt={30}>
                <Select
                    placeholder="Pilih Provinsi"
                    data={dataProvinsi.map((pro: any) => ({
                        value: String(pro.id),
                        label: pro.name
                    }))}
                    required
                    label={"Provinsi"}
                    value={isProvinsi}
                    onChange={(val) => (
                        onKabupaten({ idProv: val })
                    )}
                    searchable
                />
                <Select
                    placeholder="Pilih Kabupaten/Kota"
                    data={dataKabupaten.map((kab: any) => ({
                        value: String(kab.id),
                        label: kab.name
                    }))}
                    label={"Kabupaten"}
                    value={isKabupaten}
                    onChange={(val) => (
                        setKabupaten(val)
                    )}
                />
                <Button mt={25} bg={"gray"} onClick={() => onProsses()}>
                    PROSES
                </Button>
            </Group>
            {!_.isNull(datatable.title) &&
                <TableDataMLAI title={datatable.title} data={datatable.data} searchParam={params} />
            }
        </>
    )
}