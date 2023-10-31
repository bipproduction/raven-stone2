import { ViewAdminLTA } from "@/modules/leader_trait_assessment";
import _ from "lodash"

export default function Page({ searchParams }: { searchParams: { prov: any, city: any, kec: any } }) {
    const findData = {
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
        idKabkot: (_.isNaN(Number(searchParams.city)) ? 0 : Number(searchParams.city)),
        idKec: (_.isNaN(Number(searchParams.kec)) ? 0 : Number(searchParams.kec)),
    }

    // const prov = await MasterProvinceGetAll()
    // const city = await MasterKabGetByProvince({ idProvinsi: findData.idProvinsi })
    // const kec = await MasterKecGetByKab({ idKabkot: findData.idKabkot })
    // const dataDB = await funGetLtaByArea({ find: findData })
    // const datadown = await funDownloadLTA({ find: findData })

    return (
        <ViewAdminLTA datadownload={[]} param={findData} provinsi={[]} kabupaten={[]} kecamatan={[]} datatable={{ title: null, data: [], th: [] }} />
    );
}