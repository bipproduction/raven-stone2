"use client"
import { Box, Grid, Image, ScrollArea, Select, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import _ from 'lodash';
import { PageSubTitle, funGetOneCandidate } from '@/modules/_global';
import funGetStepFront from '../fun/get_step_front';
import TextAnimation from 'react-typing-dynamics';

/**
 * Fungsi untuk menampilkan view Step.
 * @param {kandidate} kandidate - menampilkan kandidate.
 * @param {stepCandidate} stepCandidate - menampilkan stepCandidate.
 * @param {cCandidate} cCandidate - menampilkan cCandidate.
 * @returns Untuk menampilkan keseluruhan dari View step
 */

export default function ViewStep({ kandidate, stepCandidate, cCandidate }: { kandidate: any, stepCandidate: any, cCandidate: any }) {
  const [dataKandidate, setDataKandidate] = useState(kandidate)
  const [isData, setData] = useState(stepCandidate)


  const [isCandidateName, setCandidateName] = useState((cCandidate.name).toUpperCase())
  const [isCandidate, setCandidate] = useState(cCandidate.id)
  const [isImgCandidate, setImgCandidate] = useState(`/img/candidate/${cCandidate.img}`)

  async function chooseCandidate(value: any) {
    setCandidate(value)
    setData([])
    const dataS = await funGetStepFront({ candidate: value })
    const dataC = await funGetOneCandidate({ candidate: value })
    setCandidateName(dataC?.name.toUpperCase())
    setImgCandidate(`/img/candidate/${dataC?.img}`)
    setData(dataS)
  }


  return (
    <>
      <Stack>
        <PageSubTitle text1='STEP' text2='ASSESSMENT' />
        <Grid gutter={60}>
          <Grid.Col span={{ md: 3, lg: 3 }} >
            <Box >
              <Image alt='candidate'
                src={isImgCandidate}
                maw={"auto"} mx="auto" />
              <Box pt={10}>
                <Text ta={'center'} fw={'bold'} c={"white"}>{isCandidateName}</Text>
              </Box>
            </Box>
            <Box pt={20}>
              <Select placeholder='Candidate'
                data={dataKandidate.map((pro: any) => ({
                  value: String(pro.id),
                  label: pro.name
                }))}
                value={isCandidate}
                onChange={(val) => {
                  chooseCandidate(val)
                }}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 9, lg: 9 }}>
            <ScrollArea h={"79vh"}>
              {!_.isEmpty(isData) ? (
                <Box>
                  {
                    _.keys(isData).map((v, i) => (
                      <Box key={i}>
                        <Box pb={20}>
                          <Text fz={30} c={"white"} fw={'bold'}>{_.upperCase(v)}</Text>
                        </Box>
                        <Grid pb={30} gutter={30} >
                          <Grid.Col span={{ md: 6, lg: 6 }}>
                            <Box h={200}>
                              <Text c={"#0DBF0A"} fz={20}>POSITIVE</Text>
                              {(() => {
                                const datanya = _.groupBy(
                                  isData[v],
                                  (v3) => v3.sentiment
                                )["1"];

                                if (!datanya) return <>
                                
                                </>;
                                return (
                                  <>
                                    <Box pt={10} pb={30}>
                                      <ScrollArea h={200}>
                                        <Stack c={"white"}>
                                          <TextAnimation
                                            phrases={[...datanya[_.random(0, datanya.length - 1)].content.split('\n')]}
                                            typingSpeed={0}
                                            backspaceDelay={0}
                                            eraseDelay={0}
                                            timeComplete={0}
                                            errorProbability={0}
                                            eraseOnComplete={false}
                                            isSecure={false}
                                          />
                                        </Stack>
                                      </ScrollArea>
                                    </Box>
                                  </>
                                )
                              })()}
                            </Box>
                          </Grid.Col>
                          <Grid.Col span={{ md: 6, lg: 6 }}>
                            <Text c={"#D01234"} fz={20}>NEGATIVE</Text>
                            {(() => {
                              const datanya = _.groupBy(
                                isData[v],
                                (v3) => v3.sentiment
                              )["2"];

                              if (!datanya) return <></>;
                              return (
                                <>
                                  <Box pt={10} pb={30}>
                                    <ScrollArea h={200}>
                                      <Stack c={"white"}>
                                        <TextAnimation
                                          phrases={[...datanya[_.random(0, datanya.length - 1)].content.split('\n')]}
                                          typingSpeed={0}
                                          backspaceDelay={0}
                                          eraseDelay={0}
                                          timeComplete={0}
                                          errorProbability={0}
                                          eraseOnComplete={false}
                                          isSecure={false}
                                        />
                                      </Stack>
                                    </ScrollArea>
                                  </Box>
                                </>
                              )
                            })()}
                          </Grid.Col>
                        </Grid>
                      </Box>
                    ))
                  }
                </Box>
              ) : (
                <Text c={"white"}></Text>
              )}
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}