import { funGetAllProvince } from "@/modules/_global"
import { ViewAdminPCT, funDownloadPctByArea, funGetPctByArea } from "@/modules/public_concern_trend"
import _ from "lodash"

export default async function Page({ searchParams }: { searchParams: { prov: any } }) {
    const findData = {
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov))
    }

    const prov = await funGetAllProvince()
    const data = await funGetPctByArea({ find: findData })
    const dataDownload = await funDownloadPctByArea({ find: findData })

    return <ViewAdminPCT param={findData} provinsi={prov} datatable={data} datadownload={dataDownload} />;
}