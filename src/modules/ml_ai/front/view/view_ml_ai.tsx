"use client"
import { ActionIcon, Box, Button, Grid, Group, Image, Menu, ScrollArea, Select, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { funGetMlaiFront } from '../..';
import _ from 'lodash';
import { PageSubTitle, funGetOnePaslon } from '@/modules/_global';
import { HiDotsHorizontal } from "react-icons/hi"
import { useAtom } from 'jotai';
import { _valReadIdMlai } from '../val/val_mlai';
import Wrapper from '../component/wrapper_push_id';
import Head from 'next/head';
import TextAnimation from 'react-typing-dynamics';

/**
 * Fungsi untuk menampilkan view ml ai.
 * @param {data} data - menampilkan data.
 * @param {paslon} paslon - menampilkan paslon.
 * @param {cpaslon} cpaslon - menampilkan cpaslon.
 * @returns Untuk menampilkan view ml ai
 */
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
    const [valRead, setRead] = useAtom(_valReadIdMlai)

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

    function RubahHTML(c: any) {
        return {
            __html: c
        }
    }


    return (
        <>
            <Stack pb={60}>
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
                                    minDate={new Date('2023-09-01')}
                                    value={isDate}
                                    onChange={(val) => {
                                        chooseDate(val)
                                    }}
                                />
                                {
                                    dataJamMlai.slice(0, 5).map((item: any, i: any) => {
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
                                {dataJamMlai.length > 5 &&
                                    <Menu shadow="md" width={200}>
                                        <Menu.Target>
                                            <ActionIcon variant="subtle" color="rgba(255, 255, 255, 1)" aria-label="Settings">
                                                <HiDotsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <ScrollArea h={300}>
                                                {
                                                    dataJamMlai.slice(5, dataJamMlai.length).map((item: any, i: any) => {
                                                        return (
                                                            <Menu.Item mb={5} bg={(isBTime == item.timeContent) ? 'blue' : "#230D37"} key={i} onClick={() => { chooseTime(item.timeContent) }}>
                                                                <Text ta={"center"} c={"white"} fz={16}>
                                                                    {item.timeContent}
                                                                </Text>
                                                            </Menu.Item>
                                                        )

                                                    })
                                                }
                                            </ScrollArea>

                                        </Menu.Dropdown>
                                    </Menu>
                                }

                            </Group>
                        </Box>
                        {dataMlai.map((item: any) => {
                            return (
                                <Box pt={20} key={item.id}>
                                    <Text c={"#089A31"} fz={20} fw={"bold"}>STRENGTH ANALYSIS IMPROVEMENT</Text>
                                    <Box pt={10}>

                                        <ScrollArea h={500} w={"100%"}>
                                            {
                                                valRead.includes(item.id) ? (
                                                    <>
                                                        <Text style={{ fontSize: '16', color: "white" }} dangerouslySetInnerHTML={RubahHTML(item.content)} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Wrapper id={item.id}>
                                                            <Stack c={"white"}>
                                                                <TextAnimation
                                                                    phrases={[...item.content.split('\n')]}
                                                                    typingSpeed={0}
                                                                    backspaceDelay={0}
                                                                    eraseDelay={0}
                                                                    timeComplete={0}
                                                                    errorProbability={0}
                                                                    eraseOnComplete={false}
                                                                    isSecure={false}
                                                                />
                                                            </Stack>
                                                        </Wrapper>
                                                    </>
                                                )
                                            }

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
