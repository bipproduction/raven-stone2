"use client"
import { ActionIcon, Box, Button, Grid, Group, Image, Menu, ScrollArea, SimpleGrid, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React, { useState } from 'react';
import { funGetEffectFront } from '../..';
import { PageSubTitle, WARNA } from '@/modules/_global';
import { EchartJokowiEffect, Top10JokowiEffect } from '@/modules/emotion';
import { HiDotsHorizontal } from "react-icons/hi"
import { useAtom } from 'jotai';
import { _valReadIdEffect } from '../val/val_jokowi_effect';
import WrapperEffect from '../component/wrapper_push_read_effect';
import { useShallowEffect } from '@mantine/hooks';
import TextAnimation from 'react-typing-dynamics';
import _ from "lodash"

/**
 * Fungsi untuk menampilkan view admin Jokowi Effect.
 * @param {effect} effect - menampilkan effect.
 * @param {emotion} emotion - menampilkan emotion.
 * @param {locked} locked - menampilkan locked.
 * @param {persen} persen - menampilkan persen.
 * @param {emotionChart} emotionChart - menampilkan emotionChart.
 * @returns Untuk menampilkan view admin Jokowi Effect
 */

export default function ViewJokowiEffect({ effect, emotion, locked, persen, emotionChart }: { effect: any, emotion: any, locked: any, persen: any, emotionChart: any }) {
  const [dataEffect, setDataEffect] = useState(effect.data)
  const [dataJamEffect, setDataJamEffect] = useState(effect.dataJam)
  const [isDate, setDate] = useState<any>(new Date())
  const [isBTime, setBTime] = useState(effect.isJam)
  const [valRead, setRead] = useAtom(_valReadIdEffect)

  async function chooseDate(value: any) {
    setDate(value)
    const data = await funGetEffectFront({ isDate: value })
    setDataEffect(data.data)
    setDataJamEffect(data.dataJam)
    setBTime(data.isJam)
  }

  async function chooseTime(value: any) {
    setBTime(value)
    const data = await funGetEffectFront({ isDate: isDate, isTime: value })
    setDataEffect(data.data)
  }

  const is_client = useState(false)

  useShallowEffect(() => {
    if (window) is_client[1](true)
  }, [])

  function RubahHTML(c: any) {
    return {
      __html: c
    }
  }


  return (
    <>
      <Box h={"100%"}>
        <PageSubTitle text1='JOKOWI' text2='EFFECT' />
        <Stack pt={10}>
          <Grid>
            <Grid.Col span={{ md: 3, lg: 3 }}>
              <Box pt={22}>
                <Image alt='candidate' src={"/candidate/c7.png"} maw={300} mx="auto" />
                <Box pt={10}>
                  <Text ta={'center'} fw={'bold'} c={"white"}>JOKO WIDODO</Text>
                </Box>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ md: 2, lg: 2 }}>
              <Box pt={32}>
                <SimpleGrid
                  cols={1}
                >
                  <Box >
                    <Box style={{
                      backgroundColor: WARNA.hijau,
                      border: "1px solid #ffff",
                      padding: 5,
                      borderRadius: 5
                    }}>
                      <Text ml={5} fz={13} c={"white"}>POSITIVE</Text>
                      <Text ta={'center'} fw={'bold'} c={"white"} fz={24}>{_.isNaN(persen.positive) ? 0 : persen.positive}%</Text>
                    </Box>
                  </Box>
                  <Box>
                    <Box style={{
                      backgroundColor: "white",
                      border: "1px solid #ffff",
                      padding: 5,
                      borderRadius: 5
                    }}>
                      <Text ml={5} fz={13} c={WARNA.hijau}>NEUTRAL</Text>
                      <Text ta={'center'} fw={'bold'} c={WARNA.hijau} fz={24}>{_.isNaN(persen.neutral) ? 0 : persen.neutral}%</Text>
                    </Box>
                  </Box>
                  <Box>
                    <Box style={{
                      backgroundColor: WARNA.merah,
                      border: "1px solid #ffff",
                      padding: 5,
                      borderRadius: 5
                    }}>
                      <Text ml={5} fz={13} c={"white"}>NEGATIVE</Text>
                      <Text ta={'center'} fw={'bold'} c={"white"} fz={24}>{_.isNaN(persen.negative) ? 0 : persen.negative}%</Text>
                    </Box>
                  </Box>
                </SimpleGrid>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ md: 7, lg: 7 }}>
              <EchartJokowiEffect data={emotionChart} />
            </Grid.Col>
          </Grid>
        </Stack>
        <Stack pb={60}>
          <Box pt={20}>
            <Top10JokowiEffect data={emotion} dataLocked={locked} />
          </Box>
          <Box pt={20}>
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
                dataJamEffect.slice(0, 5).map((item: any, i: any) => {
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
              {dataJamEffect.length > 5 &&
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="rgba(255, 255, 255, 1)" aria-label="Settings">
                      <HiDotsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <ScrollArea h={300}>
                      {
                        dataJamEffect.slice(5, dataJamEffect.length).map((item: any, i: any) => {
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
          {dataEffect.map((item: any) => {
            return (
              <Box pt={10} key={item.id}>
                <Text c={"#089A31"} fz={20} fw={"bold"}>STRENGTH ANALYSIS IMPROVEMENT</Text>
                <Box pt={10}>
                  <Box
                    style={{
                      backgroundColor: "#310943",
                      borderRadius: 10,
                      padding: 20,
                      height: 300
                    }}
                  >
                    <ScrollArea h={"100%"} w={"100%"}>
                      {
                        valRead.includes(item.id) ? (
                          <>
                            <Text style={{ fontSize: '16', color: "white" }} dangerouslySetInnerHTML={RubahHTML(item.content)} />
                            {/* <Text style={{ fontSize: '16', color: "white" }}>{parse(item.content)}</Text> */}
                          </>
                        ) : (
                          <>
                            <WrapperEffect id={item.id} >
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
                            </WrapperEffect>
                          </>
                        )
                      }
                    </ScrollArea>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Stack>
      </Box>
    </>
  );
}
