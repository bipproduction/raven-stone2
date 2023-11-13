"use client"
import { ActionIcon, Box, Button, Grid, Group, Image, Menu, ScrollArea, Select, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { funGetMlaiFront } from '../..';
import _ from 'lodash';
import { PageSubTitle, funGetOnePaslon } from '@/modules/_global';

const data_ml = [
    {
        id: 1,
        desc: "Here are some suggestions that can be done to improve strength in Strength analysis: Prabowo Subianto is expected to be able to highlight a firm personal character in responding to various important issues today. Especially in relation to national defense. Prabowo Subianto can take a role in international issues by participating in policies. Such as how to respond and take a stance with the countries in the BRICS alliance, namely Brazil, Russia, India, China and the United States of Africa which are in the process of creating a new currency. This is very important, Indonesia's involvement in participating in the international economic recession. Prabowo Subianto is a figure with a fierce and firm persona. When carrying out activities other than politics, activities that seem relaxed can be published. Here are some suggestions that can be done to improve strength in Strength analysis. Prabowo Subianto is expected to be able to highlight a firm personal character in responding to various important issues today. Especially in relation to national defense. Prabowo Subianto can take a role in international issues by participating in policies. Such as how to respond and take a stance with the countries in the BRICS alliance, namely Brazil, Russia, India, China and the United States of Africa which are in the process of creating a new currency. This is very important, Indonesia's involvement in participating in the international economic recession. Prabowo Subianto is a figure with a fierce and firm persona. When carrying out activities other than politics, activities that seem relaxed can be published."
    }
]

export default function ViewMlAi({ data, paslon, cpaslon }: { data: any, paslon: any, cpaslon: any }) {
    const [dataMlai, setDataMlai] = useState(data.data)
    const [dataJamMlai, setDataJamMlai] = useState(data.dataJam)
    const [dataPaslon, setDataPaslon] = useState(paslon)
    const [isDate, setDate] = useState<any>(new Date())
    const [isBTime, setBTime] = useState(data.isJam)
    const [isPaslon, setPaslon] = useState(1)
    const [isCapres, setCapres] = useState(cpaslon.nameCapres.toUpperCase())
    const [isImgCapres, setImgCapres] = useState(`/img/candidate/${cpaslon.imgCapres}`)
    const [isCawapres, setCawapres] = useState(cpaslon.nameCawapres.toUpperCase())
    const [isImgCawapres, setImgCawapres] = useState(`/img/candidate/${cpaslon.imgCawapres}`)

    async function chooseDate(value: any) {
        setDate(value)
        const dataDB = await funGetMlaiFront({ isPaslon: isPaslon, isDate: value })
        setDataMlai(dataDB.data)
        setDataJamMlai(dataDB.dataJam)
        setBTime(dataDB.isJam)
    }

    async function chooseTime(value: any) {
        setBTime(value)
        const data = await funGetMlaiFront({ isPaslon: isPaslon, isDate: isDate, isTime: value })
        setDataMlai(data.data)
    }

    async function choosePaslon(value: any) {
        setPaslon(value)
        const dataDB = await funGetMlaiFront({ isPaslon: value, isDate: isDate })
        const dataLoadPaslon = await funGetOnePaslon({ paslon: value })
        setCapres((dataLoadPaslon?.nameCapres.toUpperCase()))
        setCawapres((dataLoadPaslon?.nameCawapres.toUpperCase()))
        setImgCapres(`/img/candidate/${dataLoadPaslon?.imgCapres}`)
        setImgCawapres(`/img/candidate/${dataLoadPaslon?.imgCawapres}`)
        setDataMlai(dataDB.data)
        setDataJamMlai(dataDB.dataJam)
        setBTime(dataDB.isJam)
    }

    return (
        <>
            <Stack>
                <PageSubTitle text1='ML-AI' text2='PROMPT RECOMENDATIONS' />
                <Grid gutter={60}>
                    <Grid.Col span={{ md: 3, lg: 3 }}>
                        <Box>
                            <Image alt='candidate' src={isImgCapres} maw={"auto"} mx="auto" />
                            <Box pt={10}>
                                <Text ta={'center'} fw={'bold'} c={"white"}>{isCapres}</Text>
                            </Box>
                        </Box>
                        <Box pt={20}>
                            <Image alt='candidate' src={isImgCawapres} maw={"auto"} mx="auto" />
                            <Box pt={10}>
                                <Text ta={'center'} fw={'bold'} c={"white"}>{isCawapres}</Text>
                            </Box>
                        </Box>
                        <Box pt={20}>
                            <Select placeholder='Candidate'
                                data={dataPaslon.map((pro: any) => ({
                                    value: String(pro.id),
                                    label: pro.name
                                }))}
                                value={_.toString(isPaslon)}
                                onChange={(val) => { choosePaslon(val) }}
                            />
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={{ md: 9, lg: 9 }}>
                        <Box>
                            <Group>
                                <DateInput
                                    variant="filled"
                                    placeholder="SELECT DATE"
                                    maxDate={new Date()}
                                    value={isDate}
                                    onChange={(val) => {
                                        chooseDate(val)
                                    }}
                                />
                                {
                                    dataJamMlai.map((item: any, i: any) => {
                                        return (
                                            <div key={i}>
                                                <Button variant={(isBTime == item.timeContent) ? 'filled' : 'subtle'} c={"white"}
                                                    onClick={() => {
                                                        chooseTime(item.timeContent)
                                                    }}
                                                >
                                                    {item.timeContent}
                                                </Button>
                                            </div>
                                        )

                                    })
                                }
                                {/* <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                        <ActionIcon variant="subtle" color="rgba(255, 255, 255, 1)" aria-label="Settings">
                                            <HiDotsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item bg={"#230D37"}>
                                            <Text ta={"center"} c={"white"} fz={16}>
                                                16.31
                                            </Text>
                                        </Menu.Item>
                                        <Menu.Item bg={"#230D37"} mt={5}>
                                            <Text ta={"center"} c={"white"} fz={16}>
                                                18.33
                                            </Text>
                                        </Menu.Item>
                                        <Menu.Item bg={"#230D37"} mt={5}>
                                            <Text ta={"center"} c={"white"} fz={16}>
                                                19.45
                                            </Text>
                                        </Menu.Item>
                                        <Menu.Item bg={"#230D37"} mt={5}>
                                            <Text ta={"center"} c={"white"} fz={16}>
                                                21.23
                                            </Text>
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu> */}
                            </Group>
                        </Box>
                        {dataMlai.map((item: any) => {
                            return (
                                <Box pt={20} key={item.id}>
                                    <Text c={"#089A31"} fz={20} fw={"bold"}>STRENGTH ANALYSIS IMPROVEMENT</Text>
                                    <Box pt={10}>
                                        <ScrollArea h={"100%"} w={"100%"}>
                                            <TypeAnimation
                                                sequence={[
                                                    item.content,
                                                    1000,
                                                ]}
                                                speed={70}
                                                style={{ fontSize: '16', color: "white" }}
                                            // repeat={Infinity}
                                            />
                                            {/* <Text c={"#C1C2C5"} >{item.desc}</Text> */}
                                        </ScrollArea>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Grid.Col>
                </Grid>
            </Stack>
        </>
    );
}
