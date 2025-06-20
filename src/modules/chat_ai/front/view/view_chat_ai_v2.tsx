"use client"
import { ActionIcon, Box, Burger, Center, Container, Drawer, Flex, Group, Loader, NavLink, ScrollArea, Stack, Text, Textarea, UnstyledButton } from "@mantine/core";
import { useLocalStorage, useMediaQuery, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useRef, useState } from "react";
import { MdAccountCircle, MdEdit, MdMoreHoriz, MdMoreVert, MdSend, MdOutlineFace3 } from "react-icons/md"
import superjson from 'superjson'
import showdown from 'showdown'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { WARNA } from "@/modules/_global";


export default function ViewChatAiV2() {
  const router = useRouter()
  const match = useMediaQuery('(min-width: 56.25em)')
  const [openDrawer, setOpenDrawer] = useState(false)
  const [ask, setAsk] = useState("")
  const converter = new showdown.Converter()
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });

  const defaultValue: { id: string, title: string, content: any[] } = {
    "id": "",
    "title": "",
    "content": []
  }

  const defaulrListContent: any[] = []

  const [content, setContent] = useLocalStorage({
    key: "content",
    defaultValue,
    serialize: superjson.stringify,
    deserialize: (str) => str === undefined ? defaultValue : superjson.parse(str)
  })
  const [listContent, setListContent] = useLocalStorage({
    key: "list_content",
    defaultValue: defaulrListContent,
    serialize: superjson.stringify,
    deserialize: (str) => str === undefined ? defaulrListContent : superjson.parse(str)
  })

  useShallowEffect(() => {
    if (viewport.current) {
      new Promise(r => setTimeout(scrollToBottom, 1000))
    }
  }, [])

  return <Box style={{
    height: "100%",
    width: "100%",
    position: "fixed",
    backgroundColor: "#696884",
    display: "flex"
  }}>
    <Drawer
      p={0}
      role="dialog"
      size={"xs"}
      opened={openDrawer}
      onClose={() => setOpenDrawer(false)}>
      <SideMenu />
    </Drawer>
    <Box style={{
      width: 300,
      backgroundColor: "#180928",
      display: !(match ?? false) ? "none" : "block"
    }}>
      <SideMenu />
    </Box>
    <Box style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: WARNA.ungu
    }}>
      <Box
        style={{
          display: "flex",
          width: "100%",
          padding: 8
        }}>
        <Flex gap={"md"} align={"center"}>
          <Box style={{
            display: (match ?? true) ? "none" : "block"
          }}>
            <Burger color="gray" onClick={() => {
              setOpenDrawer(true)
            }} />

          </Box>
          <Text c={"gray"}>V 1.0.0</Text>
        </Flex>
      </Box>
      <Container
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            height: "100%",
            width: 720,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {_.isEmpty(content.id) ?

            <Stack h={"100%"} align="center" justify="center" style={{

            }}>
              <Stack >
                <Center>
                  <MdOutlineFace3 color={"white"} size={46} />
                </Center>
                <Text ta={"center"} c={"white"} fz={24}>How can I help you today?</Text>
                <Text ta={"center"} c={"white"}>More Than Chat</Text>
                <Text ta={"center"} c={"white"}>Realtime Update Data Source</Text>
              </Stack>

            </Stack>
            :
            <Box>
              <ScrollArea
                viewportRef={viewport}
                p={"md"}
                style={{
                  height: "75.5vh",
                  wordWrap: "break-word"
                }}>
                {content.content.map((v, k) => <Stack gap={"lg"} key={k}>
                  <Flex >
                    <Box w={50}>
                      <MdAccountCircle color={"gray"} size={36} />
                    </Box>
                    <Stack gap={"0"}>
                      <Text c={"white"} fw={"bold"}>You</Text>
                      <Text fz={14} c={"gray"}>{v.q}</Text>
                    </Stack>
                  </Flex>
                  <Flex >
                    <Box w={50}>
                      <MdOutlineFace3 color={"#408AE1"} size={34} />
                    </Box>
                    <Stack gap={"0"}>
                      <Text c={"white"} fw={"bold"}>D-AYU AI</Text>
                      {_.isEmpty(v.a) ? <Loader size={16} /> : <Text style={{
                        maxWidth: 600,
                        wordWrap: "break-word"
                      }} fz={14} c={"gray"} dangerouslySetInnerHTML={{ __html: converter.makeHtml(v.a) }} />}

                    </Stack>
                  </Flex>
                </Stack>)}
              </ScrollArea>
            </Box>
          }
          <Center>
            <Box pos={"fixed"} bottom={0}>
              <Flex
                p={"md"}
                align={"center"}
                bg={"#180928"}
                w={{ md: 660, lg: 700, sm: 500, xs: "100%" }}
                style={{
                  border: "1px solid gray",
                  borderRadius: 8
                }}>
                {/* <Text c={"cyan"}>Lukman</Text> */}
                <MdOutlineFace3 color={"#408AE1"} size={36} />
                <Textarea
                  value={ask}
                  onChange={(val) => {
                    setAsk(val.target.value)
                  }}
                  // variant="white"
                  // bg={"#696884"}

                  px={"md"}
                  autosize
                  w={"100%"}
                />
                <ActionIcon
                  disabled={_.isEmpty(ask)}
                  
                  bg={"#696884"}
                  color="rgba(255, 255, 255, 1)"
                  variant="subtle"
                   size="lg"
                  onClick={async () => {
                    setAsk("")
                    const id = `${_.random(11111, 99999)}${_.random(11111, 99999)}${_.random(11111, 99999)}`
                    if (_.isEmpty(content.id)) {
                      content.id = id
                      content.title = ask
                    }

                    const isi = {
                      "id": id,
                      "q": ask,
                      "a": ""
                    }

                    content.content.push(isi)
                    new Promise(r => setTimeout(scrollToBottom, 1000))
                    const res = await fetch(`https://surya-ai.wibudev.com/ask/${ask}`)
                    let data = await res.text()

                    const filter = ["id", "", "SWMLDESCRIPTIONFROMYOURINTERNET_ADDRESS"]
                    for (let f of filter) {
                      if (data.trim() === f.trim()) {
                        data = "ulangi lagi | pertanyaan kurang lengkap !"
                      }
                    }
                    // console.log(data)

                    const _isi = content.content.find((val) => val.id === id)
                    _isi.a = data

                    content.content[content.content.findIndex((v) => v.id === id)] = _isi
                    const _baru = _.cloneDeep(content)
                    setContent(_baru)
                    new Promise(r => setTimeout(scrollToBottom, 1000))

                  }}>
                    <MdSend style={{ width: '70%', height: '70%' }} stroke="1.5" />
                </ActionIcon>
              </Flex>
              <Center c="gray" p={"sm"} fz={12}>D-AYU AI can make mistakes. Consider checking important information.</Center>
            </Box>
          </Center>
        </Box>
      </Container>
    </Box>
  </Box>

  function SideMenu() {
    return <Flex
      direction={"column"}
      justify={"start"}
      bg={"#180928"}
      h={"100%"}>
      <Box
        p={"md"}
        bg={"#1d0a30"}>
        <Flex gap={"md"} align={"center"}>
          <MdOutlineFace3 size={36} color={"#408AE1"} />
          <Text w={"100%"} c={"white"}>D-AYU AI</Text>
          <ActionIcon bg={"#1d0a30"} variant="unstyled" onClick={() => {
            const ada = listContent.find((v) => v.id === content.id)
            if (ada === undefined && content.id !== "") {
              listContent.push(content)
              const _lisContent = _.cloneDeep(listContent)
              setListContent(_lisContent)
              setContent(defaultValue)
              return
            }

            const index = listContent.findIndex((i) => i.id === content.id)
            if (index > 0) {
              listContent[index] = content
              const _lisContent = _.cloneDeep(listContent)
              setListContent(_lisContent)
              setContent(defaultValue)
              return
            }

            setContent(defaultValue)
          }}>
            <MdEdit />
          </ActionIcon>
        </Flex>
      </Box>
      <ScrollArea pos={"relative"} >
        {listContent.map((v, k) =>
          <NavLink
            pos={"relative"}
            onClick={() => {

            }}
            p={"sm"}
            label={<Text fz={"sm"} lineClamp={1} >{v.title}</Text>}
            c={"gray"} key={k} >
            <Stack gap={"xs"} >
              <UnstyledButton onClick={() => setContent(v)} c={"white"} p={"0"}>Insert</UnstyledButton>
              <UnstyledButton c={"white"} p={"0"} onClick={() => {
                const baru = listContent.filter((c) => c.id !== v.id)
                setListContent(baru)
              }}>Delete</UnstyledButton>
            </Stack>
          </NavLink>)}
      </ScrollArea>
      <Box
        pos={"fixed"} style={{
          bottom: 10,
          paddingLeft: 50,

        }}
      >
        <Group justify="center" style={{
          cursor: "pointer"
        }}
          onClick={() => router.push("/dashboard/summary")}
        >
          <ActionIcon variant="subtle" color="gray" size="lg" aria-label="Settings">
            <IoArrowBackCircleSharp style={{ width: '70%', height: '70%' }} stroke="1.5" />
          </ActionIcon>
          <Text c={"gray"}>BACK</Text>
        </Group>
      </Box>
    </Flex>
  }
}

