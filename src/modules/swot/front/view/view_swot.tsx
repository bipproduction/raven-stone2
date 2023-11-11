"use client"
import PageSubTitle from '@/modules/_global/front/components/PageSubtitle';
import { Box, Grid, Image, ScrollArea, Select, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { funGetSwotFront } from '../..';
import { funGetOneCandidate } from '@/modules/_global';
import _ from 'lodash';


export default function ViewSwot({ swot, candidate, cCandidate }: { swot: any, candidate: any, cCandidate: any }) {
  const [dataKandidate, setDataKandidate] = useState(candidate)
  const [isData, setData] = useState(swot)

  const [isCandidateName, setCandidateName] = useState((cCandidate.name).toUpperCase())
  const [isCandidate, setCandidate] = useState(cCandidate.id)
  const [isImgCandidate, setImgCandidate] = useState(`/img/candidate/${cCandidate.img}`)

  async function chooseCandidate(value: any) {
    setCandidate(value)
    const dataS = await funGetSwotFront({ candidate: value })
    const dataC = await funGetOneCandidate({ candidate: value })
    setCandidateName(dataC?.name.toUpperCase())
    setImgCandidate(`/img/candidate/${dataC?.img}`)
    setData(dataS)
  }

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
            <ScrollArea h={700}>
              {isData.map((item:any, i:any) => {
                return (
                  <Box key={item.id}>
                    <Text fz={24} c={"#089A31"}>{item.category}</Text>
                    <ScrollArea h={200}>
                      <TypeAnimation
                        sequence={[
                          item.content,
                          1000,
                        ]}
                        speed={70}
                        style={{ fontSize: '16', color: "white" }}
                      />
                    </ScrollArea>
                  </Box>
                )
              })}
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}

