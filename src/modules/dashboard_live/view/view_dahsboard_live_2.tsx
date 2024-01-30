'use client'
import { ActionIcon, Avatar, BackgroundImage, Box, Center, CloseButton, Container, Flex, Grid, Group, Image, Stack, Text } from "@mantine/core";
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
import { GoDotFill } from "react-icons/go";
import { WARNA } from "@/modules/_global";
import ChartPaslon from "../components/echart/chart_paslon";
import ChartPaslon2 from "../components/echart/chart_paslon2";

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

export default function ViewDahsboardLive2({ dataPersen, dataNotif, emotionPersen, dataProvinsi, dataKabkot }: { dataPersen: any, dataNotif: any, emotionPersen: any, dataProvinsi: any, dataKabkot: any }) {
  const [list_prov, set_list_prov] = useState<any[]>(dataProvinsi)
  // const [list_media, set_list_media] = useState<any[]>([])
  const [list_kab, set_list_kab] = useState<any[]>(dataKabkot)
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

    }, 50000)

    return () => clearInterval(inter)
  }, [])

  useShallowEffect(() => {
    let index = 0
    // let ran = _.random(0, kabu.length - 1)
    let kab = _.clone(shuffle(list_kab))

    if (kab.length > 0) {
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
      }, 50000)

      return () => clearInterval(inter)
    }
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
                    {/* {v.emotion === 0 ? <MdArrowDropUp color={"green"} size={32} /> : v.emotion === 1 ? <MdRemove color={"gray"} size={32} /> : <MdArrowDropDown color={"red"} size={32} />} */}
                    <GoDotFill color={"gray"} size={25} />
                    <Text c={"yellow.2"} style={{}}>
                      <code>{_.startCase(_.lowerCase(v.name))}</code>
                    </Text>
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
                    {/* {v.emotion === 0 ? <MdArrowDropUp color={"green"} size={32} /> : v.emotion === 1 ? <MdRemove color={"gray"} size={32} /> : <MdArrowDropDown color={"red"} size={32} />} */}
                    <GoDotFill color={"gray"} size={25} />
                    <Text c={"gray.1"} style={{
                      // fontSize: 12
                    }}><code>{_.startCase(_.lowerCase(v.name))}</code></Text>
                  </Flex>)}
                </FlipMove>
              </Box>
            </Stack>
          </Box>
        </Box>
        {/* pertama penutup */}

        {/* kedua 1 pembuka */}
        <Box
          w={"75%"}
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
                // background: `linear-gradient(0deg, rgba(10,66,82,1) 0%, rgba(12,22,55,0) 16%)`,
                height: "40vh",
                borderRadius: 10,
                opacity: 1
              }}
            >
              <Grid>
                <Grid.Col span={5}>
                  <Group justify="center">
                    <Box pl={70}>
                      <Image h={400}
                        w="auto" src={'/Capres1.png'} alt="paslon" />
                    </Box>
                  </Group>

                </Grid.Col>
                <Grid.Col span={2}>
                  <Group justify="center">
                    <Box pt={50}>
                      <Image h={350}
                        w="auto" src={'/vs.png'} alt="paslon" />
                    </Box>
                  </Group>

                </Grid.Col>
                <Grid.Col span={5}>
                  <Group justify="center">
                    <Box pr={100}>
                      <Image h={400}
                        w="auto" src={'/Capres2.png'} alt="paslon" />
                    </Box>
                  </Group>
                </Grid.Col>
              </Grid>


            </Box>
            {/* kedua 1 penutup */}

            {/* kedua 2 pembukan */}
            <Box
              style={{
                background: `linear-gradient(0deg, rgba(20,76,169,1) 0%, rgba(10,43,102,1) 45%, rgba(12,22,55,0.01) 88%)`,
                height: "50vh",
                borderRadius: 10,
                opacity: 0.7
              }}
            >
              <Box pt={40} >

                <Grid gutter="xs">
                  <Grid.Col span={4.5}>
                    <ChartPaslon />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Stack>
                      <Box pt={85}>
                        <Center>
                          <Group>
                            <Text fz={12} c={WARNA.hijau}>54.0 %</Text>
                            <Text ml={5} mr={5} fz={13}>POSITIVE</Text>
                            <Text fz={12} c={WARNA.hijau}>54.0 %</Text>
                          </Group>
                        </Center>
                      </Box>
                      <Box pt={35} pb={35}>
                        <Center>
                          <Group>
                            <Text fz={12} c={"white"}>54.0 %</Text>
                            <Text ml={5} mr={5} fz={13}>NEUTRAL</Text>
                            <Text fz={12} c={"white"}>54.0 %</Text>
                          </Group>
                        </Center>
                      </Box>
                      <Box >
                        <Center>
                          <Group>
                            <Text fz={12} c={WARNA.merah}>54.0 %</Text>
                            <Text ml={5} mr={5} fz={12}>NEGATIVE</Text>
                            <Text fz={12} c={WARNA.merah}>54.0 %</Text>
                          </Group>
                        </Center>
                      </Box>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={4.5}>
                    <ChartPaslon2 />
                  </Grid.Col>
                </Grid>

              </Box>
            </Box>
            {/* kedua 2 penutup */}
          </Stack>
        </Box>
      </Flex >
    </Stack >
  </BackgroundImage >
}
