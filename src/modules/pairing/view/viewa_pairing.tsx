"use client"
import { PageSubTitle, WARNA, funGetOnePaslon } from '@/modules/_global';
import { Box, Button, Grid, Group, Image, ScrollArea, Select, SimpleGrid, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import { funGetPairingFront } from '..';
import { funGetRateFront } from '@/modules/national_popularity_metric';
import _ from 'lodash';
import { DetailRegionalDataPairing } from '@/modules/emotion';

export default function ViewaPairing({ paslon, provinsi, cpaslon, data, audience, rate }: { paslon: any, provinsi: any, cpaslon: any, data: any, audience: any, rate: any }) {
  const [isData, setData] = useState(data)
  const [isRate, setRate] = useState(rate)
  const [isPaslon, setPaslon] = useState(1)
  const [isProvinsi, setProvinsi] = useState(null)


  const [isCapres, setCapres] = useState(cpaslon.nameCapres.toUpperCase())
  const [isImgCapres, setImgCapres] = useState(`/img/candidate/${cpaslon.imgCapres}`)
  const [isCawapres, setCawapres] = useState(cpaslon.nameCawapres.toUpperCase())
  const [isImgCawapres, setImgCawapres] = useState(`/img/candidate/${cpaslon.imgCawapres}`)


  async function onGenerate() {
    const dataLoadPaslon = await funGetOnePaslon({ paslon: isPaslon })
    setCapres((dataLoadPaslon?.nameCapres.toUpperCase()))
    setCawapres((dataLoadPaslon?.nameCawapres.toUpperCase()))
    setImgCapres(`/img/candidate/${dataLoadPaslon?.imgCapres}`)
    setImgCawapres(`/img/candidate/${dataLoadPaslon?.imgCawapres}`)

    const dataLoadDB = await funGetPairingFront({ paslon: isPaslon, region: isProvinsi })
    setData(dataLoadDB)

    const dataLoadRate = await funGetRateFront({ paslon: isPaslon })
    setRate(dataLoadRate)

  }

  return (
    <>
      <Stack>
        <PageSubTitle text1='REGIONAL' text2='DATA PAIRING' />
        <Box
          style={{
            backgroundColor: WARNA.ungu,
            position: "sticky",
            top: 0,
            zIndex: 100,
            padding: 10
          }}
        >
          <Group justify='flex-end'>
            <Select
              placeholder="Select Region"
              data={provinsi.map((pro: any) => ({
                value: String(pro.id),
                label: pro.name
              }))}
              value={isProvinsi}
              onChange={(val: any) => setProvinsi(val)}
            />
            <Select placeholder='Candidate'
              data={paslon.map((pro: any) => ({
                value: String(pro.id),
                label: pro.name
              }))}
              value={_.toString(isPaslon)}
              onChange={(val: any) => { setPaslon(val) }}
            />
            <Button bg={"white"} c={"dark"} radius={"lg"} onClick={onGenerate}>GENERATE</Button>
          </Group>
        </Box>
        <Grid pt={20} gutter={40}>
          <Grid.Col span={{ md: 5, lg: 5 }}>
            <SimpleGrid
              cols={{ sm: 2, lg: 2 }}
              spacing={{ base: 10, sm: 'xl' }}
              verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
              <Box>
                <Image alt='candidate' src={isImgCapres} maw={"auto"} mx="auto" />
                <Box pt={10}>
                  <Text ta={'center'} fw={'bold'} c={"white"}>{isCapres}</Text>
                </Box>
              </Box>
              <Box>
                <Image alt='candidate' src={isImgCawapres} maw={"auto"} mx="auto" />
                <Box pt={10}>
                  <Text ta={'center'} fw={'bold'} c={"white"}>{isCawapres}</Text>
                </Box>
              </Box>
            </SimpleGrid>
            <Box pt={40} pb={20}>
              <Text fz={24} fs="italic" c={"#6ABD45"} ta={'center'} >SUCCESS PROBABILITY PROJECTION</Text>
            </Box>
            <Box
              style={{
                backgroundColor: "#269214",
                padding: 20,
                borderRadius: 10
              }}
            >
              <Text ta={"center"} c={"white"} fz={55} fw={"bold"}>
                {(isRate) ? isRate.rate + '%' : '0%'}
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 7, lg: 7 }}>
            <ScrollArea h={600}>
              {isData.map((v: any, i: any) => (
                <Box key={i}>
                  <DetailRegionalDataPairing dataEmotion={v} dataAudience={audience} />
                </Box>
              ))}
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}
