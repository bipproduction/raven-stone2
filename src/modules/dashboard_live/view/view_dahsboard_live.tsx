'use client'
import { ActionIcon, Avatar, BackgroundImage, Box, Center, CloseButton, Flex, Grid, Group, Image, Stack, Text } from "@mantine/core";
import { MdArrowDropDown, MdArrowDropUp, MdDelete, MdMap, MdNotificationsActive, MdPlace, MdRemove } from "react-icons/md"
import { Michroma } from 'next/font/google'
import { useShallowEffect, useViewportSize } from "@mantine/hooks";
import _, { shuffle, take } from "lodash";
import { useState } from "react";
import { TextLoop } from "easy-react-text-loop";
import kabu from "../components/asset-data/kab_prov.json"
import provi from "../components/asset-data/prov.json"
import FlipMove from "react-flip-move";
import notif from "../components/asset-data/notif_kab.json"
import toast from "react-simple-toasts";
import { useRouter } from "next/navigation";

export const roboto_mono = Michroma({
    weight: "400",
    subsets: ["latin", "latin-ext"],
    display: "swap",
    preload: true,
    style: ["normal"]
})


const list_color = {
    "red": "#E01E1E",
    "gray": "gray",
    "green": "#06D974"
}

function emotion_color(variant: string) {
    return variant === get_variant("positive") ? list_color.green : variant === get_variant("neutral") ? list_color.gray : list_color.red
}

type type_variant = "positive" | "negative" | "neutral"
const get_variant = function (par: type_variant) {
    return par
}

/**
 * Fungsi untuk menampilkan dashboard live.
 * @param {dataPersen} dataPersen - menampilkan dataPersen.
 * @param {dataNotif} dataNotif - menampilkan dataNotif.
 * @returns Untuk menampilkan dashboard live
 */

export default function DashboardLive({ dataPersen, dataNotif, emotionPersen }: { dataPersen: any, dataNotif: any, emotionPersen: any }) {
    const [list_prov, set_list_prov] = useState<any[]>(provi)
    // const [list_media, set_list_media] = useState<any[]>([])
    const [list_kab, set_list_kab] = useState<any[]>(kabu)
    const [list_notif, set_list_notif] = useState<any[]>([])
    const router = useRouter()

    useShallowEffect(() => {
        let dd = (localStorage.getItem('list_notif') ?? JSON.stringify(_.take(dataNotif, 2)))
        let ld: any[] = JSON.parse(dd)
        set_list_notif(ld)

        const inter = setInterval(() => {

            try {
                let dat = (localStorage.getItem('list_notif') ?? JSON.stringify(_.take(dataNotif, 2)))
                let list_data: any[] = JSON.parse(dat)
                if (list_data.length > (dataNotif.length - 1)) {
                    console.log("error length notif")
                    list_data = []
                    localStorage.setItem('list_notif', '[]')
                }
                const target = dataNotif[list_data.length]
                list_data.unshift(target)
                localStorage.setItem('list_notif', JSON.stringify(list_data))
                set_list_notif(list_data)

            } catch (error) {
                console.log("error length notif")
                localStorage.setItem('list_notif', '[]')
            }

        }, 60000)

        return () => clearInterval(inter)
    }, [])

    useShallowEffect(() => {
        const inter = setInterval(() => {
            let data = _.clone(list_prov)
            data.forEach((a, v) => {
                data[v].emotion = _.random(0, 2)
            })
            set_list_prov(shuffle(data))

        }, 10000)

        return () => clearInterval(inter)
    }, [])

    useShallowEffect(() => {
        let index = 0
        // let ran = _.random(0, kabu.length - 1)
        let kab = _.clone(shuffle(kabu))
        const inter = setInterval(() => {

            for (let k in kab) {
                kab[k].emotion = _.random(0, 2)
            }

            const a = kab[index]
            const b = kab[index + 1]

            a.emotion = 2

            const idx = _.indexOf(kab.map((v) => v.id), a.id)
            if (idx) {
                kab.splice(idx, 1)
            }

            kab[index + 1] = a
            kab[index] = b
            kab[index].emotion = 0
            set_list_kab(take(kab, 10))
            index++;
            if (index > 10) {
                index = 0
                // ran = 5
                kab = shuffle(kab)
            }
        }, 2000)

        return () => clearInterval(inter)
    }, [])

    const view = useViewportSize()

    return <BackgroundImage src="/assets-img/bg_dashbaoard.png" h={"100vh"} className={roboto_mono.className} pos={"fixed"} >
        <Stack c={"white"} gap={"md"} p={0} >
            <Group justify='space-between' pl={10} pr={10} pt={5}>
                <Image src={'/assets-img/logo_raven.png'} alt="" width={50} height={50} />
                <Avatar radius={100} bg={"red"} onClick={() => router.push("/dashboard/summary")}>
                    <CloseButton radius={100} />
                </Avatar>
            </Group>
            <Flex h={"95vh"} >
                {/* pertama pembuka */}
                <Box w={"25%"} p={"sm"} >
                    <Box
                        style={{
                            background: `linear-gradient(0deg, rgba(2,2,16,1) 0%, rgba(13,26,88,1) 60%, rgba(29,58,118,1) 100%)`,
                            height: "100vh",
                            borderRadius: 10,
                            opacity: 0.7
                        }}
                        pos={"relative"}
                        w={"100%"} h={"100%"} p={"sm"}
                    >
                        <Stack justify="space-between" pos={"relative"}>
                            <Box h={view.height / 2.3} style={{
                                overflow: "hidden"
                            }} >
                                <Flex gap={"md"}>
                                    <MdMap size={24} />
                                    <Text c={"yellow"} w={"100%"}>Analyze By Province</Text>
                                </Flex>
                                <FlipMove>
                                    {list_prov.map((v, k) => <Flex justify={"left"} key={v.id} align={"center"} gap={"md"}>
                                        {v.emotion === 0 ? <MdArrowDropUp color={"green"} size={32} /> : v.emotion === 1 ? <MdRemove color={"gray"} size={32} /> : <MdArrowDropDown color={"red"} size={32} />}
                                        <Text c={"yellow.2"} style={{
                                            // fontSize: 12
                                        }}><code>{v.name}</code></Text>
                                    </Flex>)}
                                </FlipMove>
                            </Box>
                            <Box style={{
                                overflow: "hidden"
                            }}>
                                <Flex gap={"md"}>
                                    <MdPlace size={24} />
                                    <Text c={"yellow"} w={"100%"}>Analyze By District</Text>
                                </Flex>
                                <FlipMove>
                                    {list_kab.map((v, k) => <Flex justify={"left"} key={v.id} align={"center"} gap={"md"}>
                                        {v.emotion === 0 ? <MdArrowDropUp color={"green"} size={32} /> : v.emotion === 1 ? <MdRemove color={"gray"} size={32} /> : <MdArrowDropDown color={"red"} size={32} />}
                                        <Text c={"gray.1"} style={{
                                            // fontSize: 12
                                        }}><code>{v.kab_name}</code></Text>
                                    </Flex>)}
                                </FlipMove>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
                {/* pertama penutup */}

                {/* kedua 1 pembuka */}
                <Box
                    w={"70%"}
                    py={"sm"}
                    h={"95vh"}>
                    <Stack
                        h={"93vh"}
                        gap={0}
                        p={0}
                        align="stretch"
                        justify="space-between">
                        <Box
                            style={{
                                background: `linear-gradient(0deg, rgba(10,66,82,1) 0%, rgba(12,22,55,0) 16%)`,
                                height: "40vh",
                                borderRadius: 10,
                                opacity: 0.7
                            }}
                        >
                            <Stack>
                                <Flex align={"center"} gap={"80"} justify={"center"}>
                                    <Stack>
                                        <Image width={150} height={150} src={"/assets-img/prabowo.png"} alt="" />
                                        <BackgroundImage src="/assets-img/bg_title.png" p={"xs"}>
                                            <Center><Text>PRABOWO</Text></Center>
                                        </BackgroundImage>
                                    </Stack>
                                    <Stack>
                                        <Image width={150} height={150} src={"/assets-img/gibran.png"} alt="" />
                                        <BackgroundImage src="/assets-img/bg_title.png" p={"xs"} >
                                            <Center><Text>GIBRAN</Text></Center>
                                        </BackgroundImage>
                                    </Stack>
                                </Flex>
                                <Group
                                    align={"center"}
                                    justify={"center"}
                                    gap={"md"}
                                    style={{
                                        borderRadius: 20
                                    }} 
                                    pt={10}
                                    >
                                    <Flex align={"center"} p={0}>
                                        <Flex px={"lg"} pb={10} direction={"column"} gap={0} p={0} >
                                            {/* <Text style={{
                                                fontSize: 20,
                                                fontWeight: "bolder"
                                            }}>{dataPersen[0]?.positive} %</Text> */}
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: "bolder"
                                            }}>{_.isNaN(emotionPersen[2].positive) ? 0 : emotionPersen[2].positive} %</Text>
                                            <Group justify="end" style={{
                                                fontWeight: "bold"
                                            }} p={0} c={"white"} >
                                                <Text style={{
                                                    fontSize: 10,
                                                }} bg={emotion_color('positive')}>positive</Text>
                                            </Group>
                                        </Flex>
                                        {/* <MdArrowDropUp color={emotion_color('positive')} size={60} /> */}
                                    </Flex>

                                    <Flex align={"center"} p={0}>
                                        <Flex px={"lg"} pb={10} direction={"column"} gap={0} p={0} >
                                            {/* <Text style={{
                                                fontSize: 20,
                                                fontWeight: "bolder"
                                            }}>{dataPersen[0]?.neutral} %</Text> */}
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: "bolder"
                                            }}>{_.isNaN(emotionPersen[2].neutral) ? 0 : emotionPersen[2].neutral} %</Text>
                                            <Group justify="end" style={{
                                                fontWeight: "bold"
                                            }} p={0} c={"white"} >
                                                <Text style={{
                                                    fontSize: 10,
                                                }} bg={emotion_color('neutral')}>neutral</Text>
                                            </Group>
                                        </Flex>
                                        {/* <MdArrowDropUp color={emotion_color('neutral')} size={60} /> */}
                                    </Flex>

                                    <Flex align={"center"} p={0}>
                                        <Flex px={"lg"} pb={10} direction={"column"} gap={0} p={0} >
                                            {/* <Text style={{
                                                fontSize: 20,
                                                fontWeight: "bolder"
                                            }}>{dataPersen[0]?.negative} %</Text> */}
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: "bolder"
                                            }}>{_.isNaN(emotionPersen[2].negative) ? 0 : emotionPersen[2].negative} %</Text>
                                            <Group justify="end" style={{
                                                fontWeight: "bold"
                                            }} p={0} c={"white"} >
                                                <Text style={{
                                                    fontSize: 10,
                                                }} bg={emotion_color('negative')}>negative</Text>
                                            </Group>
                                        </Flex>
                                        {/* <MdArrowDropUp color={emotion_color('negative')} size={60} /> */}
                                    </Flex>
                                </Group>
                            </Stack>
                            {/* kedua 1 penutup */}

                            {/* kedua 2 pembukan */}


                        </Box>
                        <Box
                            style={{
                                background: `linear-gradient(0deg, rgba(20,76,169,1) 0%, rgba(10,43,102,1) 45%, rgba(12,22,55,0.01) 88%)`,
                                // height: "55vh",
                                borderRadius: 10,
                                opacity: 0.7
                            }}
                        >

                            <Flex justify={"center"} gap={"200"} h={365}>
                                <Stack py={"lg"} gap={"lg"}>
                                    <Flex gap={"md"} justify={"center"}>
                                        <Image width={100} height={100} src='/assets-img/ganjar.png' alt="" />
                                        <Image width={100} height={100} src='/assets-img/mahfud.png' alt="" />
                                    </Flex>
                                    <Flex
                                        gap="md"
                                        justify="center"
                                        align="center"
                                        direction="column"
                                        wrap="wrap"
                                    >
                                        <Group>
                                            <Box>
                                                {/* <Text>{dataPersen[1]?.positive} %</Text> */}
                                                <Text>{_.isNaN(emotionPersen[3].positive) ? 0 : emotionPersen[3].positive} %</Text>
                                                <Group justify="flex-end">
                                                    <Text bg={"#06D974"} fz={10}>positive</Text>
                                                </Group>
                                            </Box>
                                            {/* <MdArrowDropDown color={"#06D974"} size={50} /> */}
                                        </Group>
                                        <Group>
                                            <Box>
                                                {/* <Text>{dataPersen[1]?.neutral} %</Text> */}
                                                <Text>{_.isNaN(emotionPersen[3].neutral) ? 0 : emotionPersen[3].neutral} %</Text>
                                                <Group justify="flex-end">
                                                    <Text bg={'gray'} fz={10}>neutral</Text>
                                                </Group>
                                            </Box>
                                            {/* <MdArrowDropDown color={"gray"} size={50} /> */}
                                        </Group>
                                        <Group>
                                            <Box>
                                                {/* <Text>{dataPersen[1]?.negative} %</Text> */}
                                                <Text>{_.isNaN(emotionPersen[3].negative) ? 0 : emotionPersen[3].negative} %</Text>
                                                <Group justify="flex-end">
                                                    <Text bg={"#E01E1E"} fz={10}>negative</Text>
                                                </Group>
                                            </Box>
                                            {/* <MdArrowDropDown color={"#E01E1E"} size={50} /> */}
                                        </Group>
                                    </Flex>
                                </Stack>



                                <Stack py={"lg"} gap={"lg"}>
                                    <Flex gap={"md"} justify={"center"}>
                                        <Image width={100} height={100} src='/assets-img/anis.png' alt="" />
                                        <Image width={100} height={100} src='/assets-img/imin.png' alt="" />
                                    </Flex>
                                    <Flex
                                        gap="md"
                                        justify="center"
                                        align="center"
                                        direction="column"
                                        wrap="wrap"
                                    >
                                        <Group>
                                            <Box>
                                                {/* <Text>{dataPersen[2]?.positive} %</Text> */}
                                                <Text>{_.isNaN(emotionPersen[1].positive) ? 0 : emotionPersen[1].positive} %</Text>
                                                <Group justify="flex-end">
                                                    <Text bg={"#06D974"} fz={10}>positive</Text>
                                                </Group>
                                            </Box>
                                            {/* <MdArrowDropDown color={"#06D974"} size={50} /> */}
                                        </Group>
                                        <Group>
                                            <Box>
                                                {/* <Text>{dataPersen[2]?.neutral} %</Text> */}
                                                <Text>{_.isNaN(emotionPersen[1].neutral) ? 0 : emotionPersen[1].neutral} %</Text>
                                                <Group justify="flex-end">
                                                    <Text bg={'gray'} fz={10}>neutral</Text>
                                                </Group>
                                            </Box>
                                            {/* <MdArrowDropDown color={"gray"} size={50} /> */}
                                        </Group>
                                        <Group>
                                            <Box>
                                                {/* <Text>{dataPersen[2]?.negative} %</Text> */}
                                                <Text>{_.isNaN(emotionPersen[1].negative) ? 0 : emotionPersen[1].negative} %</Text>
                                                <Group justify="flex-end">
                                                    <Text bg={"#E01E1E"} fz={10}>negative</Text>
                                                </Group>
                                            </Box>
                                            {/* <MdArrowDropDown color={"#E01E1E"} size={50} /> */}
                                        </Group>
                                    </Flex>
                                </Stack>
                            </Flex>
                        </Box>

                        {/* kedua 2 penutup */}



                    </Stack>
                </Box>
                {/* kedua 3 pembuka */}
                <Box w={"25%"} p={"sm"} >
                    <Box
                        style={{
                            background: `linear-gradient(0deg, rgba(2,2,16,1) 0%, rgba(13,26,88,1) 60%, rgba(29,58,118,1) 100%)`,
                            height: "100vh",
                            borderRadius: 10,
                            opacity: 0.7
                        }}
                        w={"100%"} h={"100%"} p={"sm"}
                    >
                        <Stack>
                            <Flex>
                                <Text c={"yellow"} w={"100%"}>Notification Center</Text>
                                {/* <ActionIcon radius={100} onClick={() => {
                                    localStorage.setItem('list_notif', '[]')
                                    set_list_notif([])
                                    toast("success")
                                }}>
                                    <MdDelete />
                                </ActionIcon> */}
                            </Flex>
                            <FlipMove>
                                {list_notif.map((v, k) => <Grid
                                    key={v && v.id ? v.id : k}
                                    bg={k === 0 ? "blue" : ""}
                                    style={{
                                        borderRadius: 4
                                    }}
                                >
                                    <Grid.Col span={"content"}>
                                        <MdNotificationsActive />
                                    </Grid.Col>
                                    <Grid.Col span={"auto"} p={"sm"}>
                                        <Text style={{
                                            fontSize: 12,
                                            fontStyle: "italic"
                                        }}>{v && v.description}</Text>
                                    </Grid.Col>
                                </Grid>)}
                            </FlipMove>
                        </Stack>

                    </Box>
                </Box>

                {/* kedua 3 penutup */}
            </Flex>
        </Stack>
    </BackgroundImage>
}