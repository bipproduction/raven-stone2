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

const list_menu = [
    {
        id: 1,
        title: "menu 1"
    },
    {
        id: 2,
        title: "menu 2"
    },
    {
        id: 3,
        title: "menu 3"
    }
]


const list_media_listener = [
    {
        id: "1",
        user: "suparman",
        text: `Momen mahasiswa Unisma lebih memilih Pulang saat salah satu Cawapres Berpidato
        Sepurane  2024 Mahasiswa All In Prabowo`,
    },
    {
        id: "2",
        user: "ndon_76",
        text: `Begini nih hasil survei Charta Politika terakhir yang bukan HOAX, pasangan Ganjar-Mahfud perolehannya 36.9%. Sementara Prabowo-Gibran 35.3%.

        Baiknya kubu Prabowo jangan mainan hoax lagi deh. Nanti orang pada inget Nenek Oplas.. Sang Lejen!!`,
    },
    {
        id: "3",
        user: "argawinata",
        text: `Dua kali dukung prabowo subianto, kenapa tahun 2019 jadi penghianat malah ikut memenangkan JOMA,gegara ulah anda istri tercinta sampe mengembuskan nafas di rs singapore 

        Emang susah kalau sudah tersandera pelanggaran HAM waktu di militer`,
    },
    {
        id: "4",
        user: "andre",
        text: `Survei Charta Politika: Ganjar Pranowo - Mahfud Md unggul dari Prabowo - Gibran dan AMIN

        Survei GAMA Unggul
        Hasil Survei Membuktikan`,
    },
    {
        id: "5",
        user: "elang pemburu",
        text: `Momen mahasiswa Unisma lebih memilih Pulang saat salah satu Cawapres Berpidato
        Sepurane  2024 Mahasiswa All In Prabowo`,
    },
    {
        id: "6",
        user: "deddy",
        text: `Ini cocok menggambarkan para penikmat kekuasaan yg 2 kali pemilu melawan Prabowo dan skrg tersungkur menyembah dikaki nya tanpa rasa malu!`,
    }
]


const list_emotion = [
    {
        id: 1,
        name: "positive",
        value: '49.06 %',
        variant: "positive",
    },
    {
        id: 2,
        name: "neutrall",
        value: '12.88 %',
        variant: "neutrall"
    },
    {
        id: 3,
        name: "negative",
        value: '38.06 %',
        variant: "negative"
    }
]

const list_color = {
    "red": "#E01E1E",
    "gray": "gray",
    "green": "#06D974"
}

function emotion_color(variant: string) {
    return variant === get_variant("positive") ? list_color.green : variant === get_variant("neutrall") ? list_color.gray : list_color.red
}

type type_variant = "positive" | "negative" | "neutrall"
const get_variant = function (par: type_variant) {
    return par
}

const list_paslon = [
    {
        id: "1",
        pas1_name: "anies",
        pas2_name: "imin",
        pas1_img: "/assets-img/anis.png",
        pas2_img: "/assets-img/imin.png",
        value: 29393,
        indicator: "up"
    },
    {
        id: "2",
        pas1_name: "ganjar",
        pas2_name: "mahfud",
        pas1_img: "/assets-img/ganjar.png",
        pas2_img: "/assets-img/mahfud.png",
        value: 64862736,
        indicator: "down"
    }
]

interface MODEL_KAB {
    id: number
    prov_id: number
    kab_id: string
    prov_name: string
    kab_name: string
    emotion: number
}

export default function DashboardLive() {
    const [list_prov, set_list_prov] = useState<any[]>(provi)
    // const [list_media, set_list_media] = useState<any[]>([])
    const [list_kab, set_list_kab] = useState<any[]>(kabu)
    const [list_notif, set_list_notif] = useState<any[]>([])
    const router = useRouter()

    useShallowEffect(() => {
        let dd = (localStorage.getItem('list_notif') ?? JSON.stringify(_.take(notif, 2)))
        let ld: any[] = JSON.parse(dd)
        set_list_notif(ld)

        const inter = setInterval(() => {

            try {
                let dat = (localStorage.getItem('list_notif') ?? JSON.stringify(_.take(notif, 2)))
                let list_data: any[] = JSON.parse(dat)
                if (list_data.length > (notif.length - 1)) {
                    console.log("error length notif")
                    list_data = []
                    localStorage.setItem('list_notif', '[]')
                }
                const target = notif[list_data.length]
                list_data.unshift(target)
                localStorage.setItem('list_notif', JSON.stringify(list_data))
                set_list_notif(list_data)

            } catch (error) {
                console.log("error length notif")
                localStorage.setItem('list_notif', '[]')
            }

        }, 10000)

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
            // console.log(idx)
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
            <Box h={"5vh"} >
                <Flex justify={"space-between"} p={"md"} pos={"relative"}>
                    <Image src={'/assets-img/logo_raven.png'} alt="" width={50} height={50} />
                    <Avatar radius={100} bg={"red"} onClick={() => router.push("/dashboard/ml-ai")}>
                        <CloseButton radius={100} />
                    </Avatar>
                </Flex>
            </Box>
            <Flex h={"95vh"} >
                <Box w={"25%"} p={"sm"} >
                    <BackgroundImage style={{
                        borderRadius: "12px"
                    }} pos={"relative"} src="/assets-img/bg_side.png" w={"100%"} h={"100%"} p={"sm"}>
                        <Stack justify="space-between" pos={"relative"}>
                            <Box h={view.height / 2.3} style={{
                                overflow: "hidden"
                            }} >
                                <Flex gap={"md"}>
                                    <MdMap size={24} />
                                    <Text c={"yellow"} w={"100%"}>Analize By Province</Text>
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
                                    <Text c={"yellow"} w={"100%"}>Analize By District</Text>
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
                    </BackgroundImage>
                </Box>
                <Box
                    w={"70%"}
                    py={"sm"}
                    h={"95vh"}>
                    <Stack
                        h={"95vh"}
                        gap={0}
                        p={0}
                        align="stretch"
                        justify="space-between">
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
                                bg={"url(/assets-img/bg_bottom.png)"}
                                align={"center"}
                                justify={"center"}
                                gap={"md"}
                                style={{
                                    borderRadius: 20
                                }} >
                                {list_emotion.map((v, k) => <Flex key={k} align={"center"} p={0}>
                                    <Flex px={"xs"} pb={10} direction={"column"} gap={0} p={0} >
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: "bolder"
                                        }}>{v.value}</Text>
                                        <Group justify="end" style={{
                                            fontWeight: "bold"
                                        }} p={0} c={"white"} >
                                            <Text style={{
                                                fontSize: 10,
                                            }} bg={emotion_color(v.variant)}>{v.name} </Text>
                                        </Group>
                                    </Flex>
                                    <MdArrowDropUp color={emotion_color(v.variant)} size={60} />
                                </Flex>)}
                            </Group>
                        </Stack>
                        <BackgroundImage
                            bottom={0}
                            pos={"relative"}
                            src="/assets-img/bg_bottom_4.png" style={{
                                borderRadius: 12,
                            }} >
                            <Flex justify={"center"} gap={"200"} align={"end"} h={300}>
                                {list_paslon.map((v, k) => <Stack key={k} py={"lg"} gap={"lg"}>
                                    <Flex gap={"md"} justify={"center"} key={k}>
                                        <Image width={100} height={100} src={v.pas1_img} alt="" />
                                        <Image width={100} height={100} src={v.pas2_img} alt="" />
                                    </Flex>
                                    <Flex justify={"center"} align={"center"} py={"xs"} pos={"relative"}>
                                        {/* <TextLoop animation="inertia" > */}
                                            <Flex align={"center"} 
                                            // bg={"url(/assets-img/bg_bottom_4.png)"}
                                            >
                                                <Text>44.17 %</Text>
                                                <MdArrowDropUp color={"green"} size={50} />
                                            </Flex>
                                            {/* <Flex align={"center"} bg={"url(/assets-img/bg_bottom_4.png)"}>
                                                <Text>2345</Text>
                                                <MdArrowDropDown color={"red"} size={50} />
                                            </Flex>
                                            <Flex align={"center"} bg={"url(/assets-img/bg_bottom_4.png)"}>
                                                <Text>3345</Text>
                                                <MdArrowDropUp color={"green"} size={50} />
                                            </Flex>
                                            <Flex align={"center"} bg={"url(/assets-img/bg_bottom_4.png)"}>
                                                <Text>7345</Text>
                                                <MdArrowDropDown color={"red"} size={50} />
                                            </Flex> */}
                                        {/* </TextLoop> */}
                                    </Flex>
                                </Stack>)}
                            </Flex>
                        </BackgroundImage>
                    </Stack>
                </Box>
                <Box w={"25%"} p={"sm"} >
                    <BackgroundImage style={{
                        borderRadius: "12px"
                    }} src="/assets-img/bg_side.png" w={"100%"} h={"100%"} p={"sm"}>
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
                                        }}>{v && v.name}</Text>
                                    </Grid.Col>
                                </Grid>)}
                            </FlipMove>
                        </Stack>
                    </BackgroundImage>
                </Box>

            </Flex>
        </Stack>
    </BackgroundImage>
}