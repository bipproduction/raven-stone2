'use client'

import { Button, Group, Select, Stack, Text } from "@mantine/core";
import _ from "lodash";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import TableDataStep from "../component/table_data_step";
import { useRouter } from "next/navigation";

export default function ViewAdminStep({ params, provinsi, kabupaten, datatable }: { params: any, provinsi: any, kabupaten: any, datatable: any }) {
    const router = useRouter();
    const [dataProvinsi, setDataProvinsi] = useState(provinsi)
    const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
    const [isProvinsi, setProvinsi] = useState<any>(params.idProvinsi || null)
    const [isKabupaten, setKabupaten] = useState<any>(params.idKabkot || null)

    async function onKabupaten({ idProv }: { idProv: any }) {
        setProvinsi(idProv)
        setKabupaten(null)
        // const dataKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
        // setDataKabupaten(dataKab)
    }

    function onProsses() {
        if (isProvinsi == null) return toast("Silahkan pilih provinsi", { theme: "dark" })
        router.replace("/dashboard-admin/step?prov=" + isProvinsi + "&city=" + isKabupaten)
    }

    useEffect(() => {
        setProvinsi(params.idProvinsi == 0 ? null : params.idProvinsi)
        setKabupaten(params.idKabkot == 0 ? null : params.idKabkot)
    }, [params])

    return (
        <>
            <Stack>
                <Text fw={"bold"}>STEP</Text>
            </Stack>
            <Group grow mt={30}>
                <Select
                    placeholder="Pilih Provinsi"
                    data={dataProvinsi.map((val: any) => ({
                        value: String(val.id),
                        label: val.name,
                    }))}
                    required
                    value={isProvinsi}
                    onChange={(val) => (
                        onKabupaten({ idProv: val })
                    )}
                    label={"Provinsi"}
                    searchable
                />
                <Select
                    placeholder="Pilih Kabupaten/Kota"
                    label={"Kabupaten"}
                    searchable
                    data={dataKabupaten.map((val: any) => ({
                        value: String(val.id),
                        label: val.name,
                    }))}
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
                <TableDataStep title={datatable.title} data={datatable.data} searchParam={params} />
            }
        </>
    )
}