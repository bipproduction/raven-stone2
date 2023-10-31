'use client'

import { Button, Group, Select, Stack, Text } from "@mantine/core"
import _ from "lodash"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-simple-toasts"
import TableDataSwot from "../component/table_data_swot"

export default function ViewAdminSwot({ params, provinsi, kabupaten, datatable }: { params: any, provinsi: any, kabupaten: any, datatable: any }) {
    const router = useRouter()

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
        router.replace("/dashboard-admin/swot?prov=" + isProvinsi + "&city=" + isKabupaten)
    }

    useEffect(() => {
        setProvinsi(params.idProvinsi == 0 ? null : params.idProvinsi)
        setKabupaten(params.idKabkot == 0 ? null : params.idKabkot)
    }, [params])

    return (
        <>
            <Stack>
                <Text fw={"bold"}>SWOT</Text>
            </Stack>
            <Group grow mt={30}>
                <Select
                    placeholder="Pilih Provinsi"
                    data={dataProvinsi.map((pro: any) => ({
                        value: String(pro.id),
                        label: pro.name,
                    }))}
                    required
                    label={"Provinsi"}
                    searchable
                    value={isProvinsi}
                    onChange={(val) => (
                        onKabupaten({ idProv: val })
                    )}
                />
                <Select
                    label={"Kabupaten"}
                    placeholder="Pilih Kabupaten/Kota"
                    data={dataKabupaten.map((kab: any) => ({
                        value: String(kab.id),
                        label: kab.name,
                    }))}
                    value={isKabupaten}
                    onChange={(val) => (
                        setKabupaten(val)
                    )}
                    searchable
                />
                <Button mt={25} bg={"gray"} onClick={() => onProsses()}>
                    PROSES
                </Button>
            </Group>
            {!_.isNull(datatable.title) &&
                <TableDataSwot title={datatable.title} data={datatable.data} searchParam={params} />
            }
        </>
    )
}