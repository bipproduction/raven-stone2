import { funGetAllProvince } from "@/modules/_global";
import { ViewAdminLTA, funDownloadLtaByArea, funGetLtaByArea } from "@/modules/leader_trait_assessment";
import _ from "lodash"

export default async function Page({ searchParams }: { searchParams: { prov: any } }) {
    const findData = {
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
    }

    const prov = await funGetAllProvince()
    const dataDB = await funGetLtaByArea({ find: findData })
    const datadown = await funDownloadLtaByArea({ find: findData })

    return (
        <ViewAdminLTA datadownload={datadown} param={findData} provinsi={prov} datatable={dataDB} />
    );
}