import { ViewAdminPairing } from "@/modules/pairing";
import _ from "lodash";

export default function Page({ searchParams }: { searchParams: { prov: any, city: any, can1: any, can2: any, date: any } }) {
    const findData = {
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
        idKabkot: (_.isNaN(Number(searchParams.city)) ? 0 : Number(searchParams.city)),
        tingkat: (_.isNaN(Number(searchParams.city)) ? 1 : 2),
        idCandidate1: (_.isNaN(Number(searchParams.can1)) ? 0 : Number(searchParams.can1)),
        idCandidate2: (_.isNaN(Number(searchParams.can2)) ? 0 : Number(searchParams.can2)),
        date: (_.isUndefined(searchParams.date) ? null : searchParams.date)
    }




    return <ViewAdminPairing param={findData} provinsi={[]} kabupaten={[]} candidate={[]} datatable={[]} />;
}