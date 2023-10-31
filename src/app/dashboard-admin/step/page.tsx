import { ViewAdminStep } from "@/modules/step";
import _ from "lodash";

export default function Page({ searchParams }: { searchParams: { prov: string, city: string } }) {
    const datastep = {
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
        idKabkot: (_.isNaN(Number(searchParams.city)) ? 0 : Number(searchParams.city)),
        tingkat: (_.isNaN(Number(searchParams.city)) ? 1 : 2)
    }

    // const pro = await MasterProvinceGetAll()
    // const kab = await MasterKabGetByProvince({ idProvinsi: datastep.idProvinsi })
    // const dataDB = await funGetAllStap({ find: datastep })

    return (
        <>
            <ViewAdminStep params={datastep} provinsi={[]} kabupaten={[]} datatable={{ title: null, data: [], th: [] }} />
        </>
    );
}