import { funSeederAudience, funSeederCandidate, funSeederComponents, funSeederKabupaten, funSeederLta, funSeederPaslon, funSeederPct, funSeederProvinsi, funSeederRhi, funSeederUser, funSeederUserAccess, funSeederUserRole } from "@/modules/seeder";

export default async function Page() {
    let status = 'loading'
    const comp = await funSeederComponents()
    const role = await funSeederUserRole()
    const access = await funSeederUserAccess()
    const user = await funSeederUser()
    const prov = await funSeederProvinsi()
    const kab = await funSeederKabupaten()
    const audience = await funSeederAudience()
    const pct = await funSeederPct()
    const lta = await funSeederLta()
    const rhi = await funSeederRhi()
    const can = await funSeederCandidate()
    const pas = await funSeederPaslon()

    if (comp.success && role.success && access.success && user.success && prov.success && kab.success && audience.success && pct.success && lta.success && rhi.success && can.success && pas.success)
        status = 'success';

    return (
        <>{status}</>
    )
}