"use client"
import { ActionIcon, Box, Button, Divider, Grid, Group, Image, Menu, ScrollArea, SimpleGrid, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import ViewSummaryCandidate from '../components/view_summary_candidate';
import { PageSubTitle, WARNA } from '@/modules/_global';
import { EchartJokowiEffect, Top10JokowiEffect } from '../..';
import { useAtom } from 'jotai';
import { _valReadIdEffect } from '@/modules/jokowi_effect/front/val/val_jokowi_effect';
import { funGetEffectFront } from '@/modules/jokowi_effect';
import { useShallowEffect } from '@mantine/hooks';
import _ from 'lodash';
import { DateInput } from '@mantine/dates';
import { HiDotsHorizontal } from 'react-icons/hi';
import WrapperEffect from '@/modules/jokowi_effect/front/component/wrapper_push_read_effect';
import TextAnimation from 'react-typing-dynamics';
import { MdNavigateNext } from 'react-icons/md';
import { useRouter } from 'next/navigation';

/**
 * Fungsi untuk menampilkan view summary.
 * @param {effect} effect - menampilkan effect.
 * @param {emotion} emotion - menampilkan emotion.
 * @param {locked} locked - menampilkan locked.
 * @param {persen} persen - menampilkan persen.
 * @param {emotionChart} emotionChart - menampilkan emotionChart.
 * @returns Untuk  menampilkan view summary
 */

export default function ViewSummary({ summaryTable, paslon, effect, emotion, locked, persen, emotionChart }: { summaryTable: any, paslon: any, effect: any, emotion: any, locked: any, persen: any, emotionChart: any }) {
  const [dataEffect, setDataEffect] = useState(effect.data)
  const [dataJamEffect, setDataJamEffect] = useState(effect.dataJam)
  const [isDate, setDate] = useState<any>(new Date())
  const [isBTime, setBTime] = useState(effect.isJam)
  const [valRead, setRead] = useAtom(_valReadIdEffect)
  const [presentase, setPresentase] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });
  const router = useRouter()

  useShallowEffect(() => {
    const total = _.reduce(
      persen,
      (result, value) => {
        return {
          confidence: result.confidence + value.confidence,
          supportive: result.supportive + value.supportive,
          positive: result.positive + value.positive,
          undecided: result.undecided + value.undecided,
          unsupportive: result.unsupportive + value.unsupportive,
          uncomfortable: result.uncomfortable + value.uncomfortable,
          negative: result.negative + value.negative,
          dissapproval: result.dissapproval + value.dissapproval,
          value: result.value + value.total,
        };
      },
      {
        confidence: 0,
        supportive: 0,
        positive: 0,
        undecided: 0,
        unsupportive: 0,
        uncomfortable: 0,
        negative: 0,
        dissapproval: 0,
        value: 0,
      }
    );

    const positive = total.confidence + total.supportive + total.positive;
    const neutral = total.undecided;
    const negative = total.unsupportive + total.uncomfortable + total.negative + total.dissapproval;
    const totalEmotions = total.value;

    const result = {
      positive: Number(((positive / totalEmotions) * 100).toFixed(2)),
      neutral: Number(((neutral / totalEmotions) * 100).toFixed(2)),
      negative: Number(((negative / totalEmotions) * 100).toFixed(2)),
    }

    if (!_.isEmpty(persen)) {
      setPresentase(result);
    }
  }, [persen]);


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
      <Box>
        <PageSubTitle text1='EMOTIONAL' text2='SPECTRUM CHART' />
        <Stack pt={10}>
          <ViewSummaryCandidate paslon={paslon} table={summaryTable} dataLocked={locked} />
          <Box pt={20}>
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
                          <Text ta={'center'} fw={'bold'} c={"white"} fz={24}>{presentase.positive} %</Text>
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
                          <Text ta={'center'} fw={'bold'} c={WARNA.hijau} fz={24}>{presentase.neutral} %</Text>
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
                          <Text ta={'center'} fw={'bold'} c={"white"} fz={24}>{presentase.negative} %</Text>
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
            <Stack>
              <Box pt={20}>
                <Top10JokowiEffect data={emotion} dataLocked={locked} />
              </Box>
              <Box pt={20}>
                <Box
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    padding: 20,
                    borderRadius: 10
                  }}
                >
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

                  {dataEffect.map((item: any) => {
                    return (
                      <Box pt={20} key={item.id}>
                        <Text c={"#089A31"} fz={20} fw={"bold"}>STRENGTH ANALYSIS IMPROVEMENT</Text>
                        <Box pt={10}>
                          <Box
                          >
                            <ScrollArea h={300}>
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
                            <Divider />
                            <Group justify='flex-end' pt={10}>
                              <Box>
                                <Button
                                  variant='subtle'
                                  radius={"md"} c={"white"}
                                  rightSection={<MdNavigateNext size={25} />} onClick={() => router.push("/dashboard/jokowi-effect")} >
                                  DETAIL VIEW JOKOWI EFFECT
                                </Button>
                              </Box>
                            </Group>
                          </Box>
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

