"use client"
import PageSubTitle from '@/modules/_global/front/components/PageSubtitle';
import { Box, Grid, Image, ScrollArea, Select, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import getBayCandidateStep from '../fun/get_by_candidate';
import toast from 'react-simple-toasts';
import { WARNA } from '@/modules/_global/fun/COLOR';
import classes from "../components/step.module.css"
import cx from 'clsx'
import { TypeAnimation } from 'react-type-animation';

const data_step = [
  {
    id: 1,
    name_step: "SOCIAL",
    positive: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election",
    negative: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election"
  },
  {
    id: 2,
    name_step: "TECHNOLOGY",
    positive: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election",
    negative: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election"
  },
  {
    id: 3,
    name_step: "ECONOMY",
    positive: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election",
    negative: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election"
  },
  {
    id: 4,
    name_step: "POLITICS",
    positive: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election",
    negative: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election"
  }
]

export default function ViewStep({ params, kandidate, stepCandidate }: { params: any, kandidate: any, stepCandidate: any }) {
  const [dataKandidate, setDataKandidate] = useState(kandidate)
  const [iskandidate, setIsKandidate] = useState<any>(params.idCandidate || null)
  const [isData, setData] = useState(stepCandidate)

  useEffect(() => {
    setData(stepCandidate)
  }, [stepCandidate])

  async function onChooseKandidat({ idCan }: { idCan: any }) {
    setIsKandidate(idCan)
  }

  function onProsses() {
    if (iskandidate == null) return toast("Silahkan pilih kandidat", { theme: "dark" })
  }

  useEffect(() => {
    setIsKandidate(params.idCandidate == 0 ? null : params.idCandidate)
  }, [params])

  return (
    <>
      {/* <pre>
        {JSON.stringify(isData, null, 1)}
      </pre> */}
      <Stack>
        <PageSubTitle text1='STEP' text2='ASSESSMENT' />
        <Grid gutter={60}>
          <Grid.Col span={{ md: 3, lg: 3 }} >
            {/* {isData.map((item: any) => {
              return ( */}
            {/* ) */}
            {/* })} */}
            <Box >
              <Image alt='candidate'
                src="/candidate/c1.png"
                // src={`/candidate/${item.Image}`} 
                maw={"auto"} mx="auto" />
              <Box pt={10}>
                <Text ta={'center'} fw={'bold'} c={"white"}>PRABOWO SUBIANTO</Text>
              </Box>
            </Box>
            <Box pt={20}>
              <Select placeholder='Candidate'
                data={dataKandidate.map((pro: any) => ({
                  value: String(pro.id),
                  label: pro.name
                }))}
                value={iskandidate}
                searchable
                onChange={(val) => onChooseKandidat({ idCan: val })}
                onClick={() => onProsses()}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 9, lg: 9 }}>
            <ScrollArea h={700}>
              {data_step.map((item) => {
                return (
                  <Box key={item.id}>
                    <Box pb={20}>
                      <Text fz={30} c={"white"} fw={'bold'}>{item.name_step}</Text>
                    </Box>
                    <Grid >
                      <Grid.Col span={{ md: 6, lg: 6 }}>
                        <Text c={"#0DBF0A"} fz={20}>POSITIVE</Text>
                        <Box pt={10} pb={30}>
                          <ScrollArea h={250}>
                            <TypeAnimation
                              sequence={[
                                item.positive,
                                1000,
                              ]}
                              speed={70}
                              style={{ fontSize: '16', color: "white" }}
                            />
                          </ScrollArea>
                        </Box>
                      </Grid.Col>
                      <Grid.Col span={{ md: 6, lg: 6 }}>
                        <Text c={"#D01234"} fz={20}>NEGATIVE</Text>
                        <Box pt={10} pb={30}>
                          <ScrollArea h={250}>
                            <TypeAnimation
                              sequence={[
                                item.negative,
                                1000,
                              ]}
                              speed={70}
                              style={{ fontSize: '16', color: "white" }}
                            />
                          </ScrollArea>
                        </Box>
                      </Grid.Col>
                    </Grid>
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