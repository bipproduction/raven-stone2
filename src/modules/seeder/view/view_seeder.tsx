'use client'

import { Box, Button, Divider, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core"
import { useState } from "react"
import toast from "react-simple-toasts";
import { funSeederProvinsi } from "../fun/fun_provinsi";
import { funSeederKabupaten } from "../fun/fun_kabupaten";

export default function ViewSeeder({prov}:{prov:any}) {
    const [loading, setLoading] = useState(false)


    // USER
    async function onComponents() {
        setLoading(true);
        // const res = await funSeederComponents();
        // if (res?.success)
        //     return setLoading(false), toast(res?.message, { theme: "dark" });
    }
    async function onUserRole() {
        setLoading(true);
        // const res = await funSeederUserRole();
        // if (res?.success)
        //     return setLoading(false), toast(res?.message, { theme: "dark" });
    }
    async function onUserAccess() {
        setLoading(true);
        // const res = await funSeederUserAccess();
        // if (res?.success)
        //     return setLoading(false), toast(res?.message, { theme: "dark" });
    }
    async function onUser() {
        setLoading(true);
        // const res = await funSeederUser();
        // if (res?.success)
        //     return setLoading(false), toast(res?.message, { theme: "dark" });
    }

    // WILAYAH
    async function onProvince() {
        setLoading(true);
        const res = await prov();
        if (res?.success)
            return setLoading(false), toast(res?.message, { theme: "dark" });
    }
    async function onKabupaten() {
        setLoading(true)
        // const res = await funSeederKabupaten()
        // if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }


    // DATA LAINYA
    async function onLeader() {
        setLoading(true)
        // const res = await funSeederLeader()
        // if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }
    async function onPublic() {
        setLoading(true)
        // const res = await funSeederPublic()
        // if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }
    async function onAudience() {
        setLoading(true)
        // const res = await funSeederAudience()
        // if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }

    async function onPCTFix() {
        setLoading(true)
        // const res = await funSeederPct()
        // if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }

    async function onLTAFix() {
        setLoading(true)
        // const res = await funSeederLta()
        // if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }

    async function onRHIFix() {
        setLoading(true)
        // const res = await funSeederRhi()
        // if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }



    return (
        <>
            <Stack>
                <Text fw={"bold"}>SEEDER</Text>
            </Stack>
            <Box pt={30}>
                <SimpleGrid
                    cols={{ base: 2, sm: 2, lg: 2 }}
                    spacing={{ base: 10, sm: "xl" }}
                    verticalSpacing={{ base: "md", sm: "xl" }}
                >
                    <Box>
                        <Paper shadow="xs" p="lg">
                            <Text fw={"bold"}>USER</Text>
                            <Divider mt={10} mb={20} />
                            <Text fz={10} c={"red"}>** Seeder Mulai Dari Yang Teratas</Text>
                            <Group justify="center" my={15}>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onComponents}>COMPONENTS</Button>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onUserRole}>USER ROLE</Button>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onUserAccess}>USER ACCESS</Button>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onUser}>USER</Button>
                            </Group>
                        </Paper>
                    </Box>
                    <Box>
                        <Paper shadow="xs" p="lg">
                            <Text fw={"bold"}>WILAYAH</Text>
                            <Divider mt={10} mb={20} />
                            <Text fz={10} c={"red"}>** Seeder Mulai Dari Yang Teratas</Text>
                            <Group justify="center" my={15}>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onProvince}>PROVINSI</Button>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onKabupaten}>KABUPATEN / KOTA</Button>
                            </Group>
                        </Paper>
                    </Box>

                </SimpleGrid>
                <Box mt={30}>
                    <Paper shadow="xs" p="lg">
                        <Text fw={"bold"}>DATA LAINNYA...</Text>
                        <Divider mt={10} mb={30} />
                        <Group justify="center" gap="md" grow my={15}>
                            <Button bg={"gray"} loading={loading} onClick={onAudience}>VALUE AUDIENCE</Button>
                            <Button bg={"gray"} loading={loading} onClick={onPCTFix}>VALUE PUBLIC CONCERN TREND</Button>
                        </Group>
                        <Group justify="center" gap="md" grow my={15}>
                            <Button bg={"gray"} loading={loading} onClick={onLTAFix}>VALUE LEADER TRAIT ASSESSMENT</Button>
                            <Button bg={"gray"} loading={loading} onClick={onRHIFix}>VALUE REGION HOT ISSUES</Button>
                        </Group>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}