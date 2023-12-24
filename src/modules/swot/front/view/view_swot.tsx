"use client"
import { Box, Grid, Image, ScrollArea, Select, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { funGetSwotFront } from '../..';
import { PageSubTitle, funGetOneCandidate } from '@/modules/_global';
import _ from 'lodash';
import { useShallowEffect } from '@mantine/hooks';
import TextAnimation from 'react-typing-dynamics';


/**
 * Fungsi untuk menampilkan view Swot.
 * @param {swot} swot - menampilkan swot.
 * @param {candidate} candidate - menampilkan candidate.
 * @param {cCandidate} cCandidate - menampilkan cCandidate.
 * @returns Untuk menampilkan keseluruhan dari View Swot
 */
export default function ViewSwot({ swot, candidate, cCandidate }: { swot: any, candidate: any, cCandidate: any }) {
  const [dataKandidate, setDataKandidate] = useState(candidate)
  const [isData, setData] = useState<any>()

  const [isCandidateName, setCandidateName] = useState((cCandidate.name).toUpperCase())
  const [isCandidate, setCandidate] = useState(cCandidate.id)
  const [isImgCandidate, setImgCandidate] = useState(`/img/candidate/${cCandidate.img}`)

  async function chooseCandidate(value: any) {
    setCandidate(value)
    setData([])
    const dataS = await funGetSwotFront({ candidate: value })
    const dataC = await funGetOneCandidate({ candidate: value })
    setCandidateName(dataC?.name.toUpperCase())
    setImgCandidate(`/img/candidate/${dataC?.img}`)

    const grouping = _.groupBy(
      dataS, (v) => v.category
    )
    setData(grouping)
  }

  useShallowEffect(() => {
    const group = _.groupBy(
      swot, (v) => v.category
    )

    setData(group)
  }, [])

  return (
    <>
      <Stack>
        <PageSubTitle text1='SWOT' text2='EVALUATION' />
        <Grid gutter={40}>
          <Grid.Col span={{ md: 3, lg: 3 }} >
            <Box>
              <Image alt='candidate' src={isImgCandidate} maw={"auto"} mx="auto" />
              <Box pt={10}>
                <Text ta={'center'} fw={'bold'} c={"white"}>{isCandidateName}</Text>
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
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 9, lg: 9 }}>
            <ScrollArea h={"79vh"}>
              {_.keys(isData).map((item: any, i: any) => (
                <Box
                key={i}
                pb={30}
                >
                  <Box 
                   style={{
                    background: "rgba(0,0,0,0.3)",
                    padding: 20,
                    borderRadius: 10
                  }}
                  >
                    <Box>
                      <Text fw={"bold"} fz={24} c={"#089A31"}>{item}</Text>
                    </Box>
                    {(() => {
                      const datanya = isData[item]
                      if (datanya)
                        return (
                          <>
                            <ScrollArea h={200}>
                              <Text c={"white"} m={1}>
                                <TextAnimation
                                  phrases={[...datanya[_.random(0, datanya.length - 1)].content.split('\n')]}
                                  typingSpeed={(i == 0) ? 0 : Number(datanya.id ? Math.floor(Math.random() * 1 + 0) : Math.floor(Math.random() * 1 + 5))}
                                  backspaceDelay={Number(datanya.id ? Math.floor(Math.random() * 899999 + 100000) : Math.floor(Math.random() * 899999 + 100000))}
                                  eraseDelay={Number(datanya.id ? Math.floor(Math.random() * 899999 + 100000) : Math.floor(Math.random() * 899999 + 100000))}
                                  timeComplete={Number(datanya.id ? Math.floor(Math.random() * 899999 + 100000) : Math.floor(Math.random() * 899999 + 100000))}
                                  errorProbability={Number(datanya.id ? 0 : 0.1)}
                                  eraseOnComplete={false}
                                  isSecure={false}
                                />
                              </Text>
                            </ScrollArea>
                          </>
                        )
                    })()}
                  </Box>
                </Box>
              ))}
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}

