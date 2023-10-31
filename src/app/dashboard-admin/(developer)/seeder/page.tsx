import { ViewSeeder } from "@/modules/seeder";
import { funSeederProvinsi } from "@/modules/seeder/fun/fun_provinsi";

export default function Page() {
    return (
        <>
            <ViewSeeder prov={funSeederProvinsi}/>
        </>
    )
}