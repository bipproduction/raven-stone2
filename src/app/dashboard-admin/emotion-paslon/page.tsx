import { funGetAllPaslon, funGetAllProvince } from "@/modules/_global"
import { ViewAdminEmotionPaslon } from "@/modules/emotion"
import _ from "lodash"

export default async function Page({ searchParams }: { searchParams: { prov: any, paslon: any, date: any } }) {
    const findData = {
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
        idPaslon: (_.isNaN(Number(searchParams.paslon)) ? 0 : Number(searchParams.paslon)),
        date: (_.isUndefined(searchParams.date) ? null : searchParams.date)
    }

    const dataPaslon = await funGetAllPaslon();
    const dataProv = await funGetAllProvince();


    return (
        <>
            <ViewAdminEmotionPaslon paslon={dataPaslon} datatable={[]} param={findData} provinsi={dataProv} />
        </>
    )
}