import { ViewAdminEmotion } from "@/modules/emotion";
import _ from "lodash";

export default function Page({ searchParams }: { searchParams: { prov: any, city: any, can: any, date: any } }) {
    const findData = {
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
        idKabkot: (_.isNaN(Number(searchParams.city)) ? 0 : Number(searchParams.city)),
        tingkat: (_.isNaN(Number(searchParams.city)) ? 1 : 2),
        idCandidate: (_.isNaN(Number(searchParams.can)) ? 0 : Number(searchParams.can)),
        date: (_.isUndefined(searchParams.date) ? null : searchParams.date)
    }


    return (
        <>
            <ViewAdminEmotion candidate={[]} datatable={[]} kabupaten={[]} param={findData} provinsi={[]} />
        </>
    )
}