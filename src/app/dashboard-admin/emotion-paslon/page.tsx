import { funGetAllPaslon, funGetAllProvince } from "@/modules/_global"
import { ViewAdminEmotionPaslon, funDownloadEmotionPaslonDate, funGetEmotionPaslonDateArea } from "@/modules/emotion"
import _ from "lodash"

export default async function Page({ searchParams }: { searchParams: { prov: any, paslon: any, date: any, jam: any } }) {

    const findData = {
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
        idPaslon: (_.isNaN(Number(searchParams.paslon)) ? 1 : Number(searchParams.paslon)),
        date: (_.isUndefined(searchParams.date) ? new Date() : new Date(searchParams.date)),
        jam: (_.isUndefined(searchParams.jam) ? null : searchParams.jam)
    }

    const dataPaslon = await funGetAllPaslon();
    const dataProv = await funGetAllProvince();
    const dataDB = await funGetEmotionPaslonDateArea({ find: findData });
    const dataDownload = await funDownloadEmotionPaslonDate({ find: findData })


    return (
        <>
            <ViewAdminEmotionPaslon paslon={dataPaslon} datatable={dataDB} param={findData} provinsi={dataProv} datadownload={dataDownload} />
        </>
    )
}