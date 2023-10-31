import { ViewAdminSwot } from "@/modules/swot";
import _ from "lodash";

export default async function Page({ searchParams }: { searchParams: { prov: string, city: string } }) {
    const dataSwot = {
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
        idKabkot: (_.isNaN(Number(searchParams.city)) ? 0 : Number(searchParams.city)),
        tingkat: (_.isNaN(Number(searchParams.city)) ? 1 : 2)
    }

    // const pro = await MasterProvinceGetAll()
    // const kab = await MasterKabGetByProvince({ idProvinsi: dataSwot.idProvinsi })
    // const dataDB = await funGetAllSwot({ find: dataSwot })

    return (
        <>
            <ViewAdminSwot params={dataSwot} provinsi={[]} kabupaten={[]} datatable={{ title: null, data: [], th: [] }} />
        </>
    );
}