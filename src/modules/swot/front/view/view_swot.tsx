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
        <Grid gutter={60}>
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
            <ScrollArea h={"85vh"}>
              {_.keys(isData).map((item: any, i: any) => (
                <Box key={i} pb={20}>
                  <Text  c={"#089A31"}>{item}</Text>
                  {(() => {
                    const datanya = isData[item]
                    if (datanya)
                      return (
                        <>
                          <ScrollArea h={150} >
                              <Text c={"white"} fz={14} mt={0}>
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
                              </Text>
                          </ScrollArea>
                        </>
                      )
                  })()}
                </Box>
              ))}
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}

