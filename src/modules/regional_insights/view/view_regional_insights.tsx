"use client"
import { PageSubTitle, WARNA } from '@/modules/_global';
import { SentimentAnalysis, funGetEmotionRegionalFront } from '@/modules/emotion';
import { EcahrtBarPolarRegionalInsights } from '@/modules/leader_trait_assessment';
import { EchartPublicRegionalInsights } from '@/modules/public_concern_trend';
import { Box, Button, Grid, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import _ from 'lodash';
import React, { useState } from 'react';



export default function ViewRegionalInsights({ candidate, provinsi, audience, emotion, pct, lta }: { candidate: any, provinsi: any, audience: any, emotion: any, pct: any, lta: any }) {
  const [isCandidate, setCandidate] = useState(1)
  const [isProvinsi, setProvinsi] = useState(null)
  const [isData, setData] = useState(emotion)

  async function onGenerate() {
    const dataLoad = await funGetEmotionRegionalFront({ candidate: isCandidate, region: isProvinsi })
    setData(dataLoad)
  }

  return (
    <>
      <Box style={{
        backgroundColor: "rgba(27,11,47,0.8)",
        zIndex: 100,
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backdropFilter: `blur(10px)`,
        // opacity: 0.8,
      }}></Box>
      <Stack>
        <PageSubTitle text1='REGIONAL' text2='INSIGHTS' />
        <Box
          style={{
            backgroundColor: WARNA.ungu,
            position: "sticky",
            top: 0,
            zIndex: 99,
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
              searchable
              onChange={(val: any) => setProvinsi(val)}
            />
            <Select placeholder='Candidate'
              data={candidate.map((pro: any) => ({
                value: String(pro.id),
                label: pro.name
              }))}
              value={_.toString(isCandidate)}
              onChange={(val: any) => { setCandidate(val) }}
              required
            />
            <Button radius={"lg"} c={"dark"} bg={"white"} onClick={onGenerate}>GENERATE</Button>
          </Group>
        </Box>
        {isData.map((item: any, i: any) => {
          return (
            <Box pt={20} key={i}>
              <Text fz={33} fw={"bold"} c={"white"}>{item.name}</Text>
              <Grid gutter={40}>
                <Grid.Col span={{ md: 6, lg: 6 }}>
                  <SentimentAnalysis dataAudience={audience} dataEmotion={item} candidate={isCandidate} />
                </Grid.Col>
                <Grid.Col span={{ md: 6, lg: 6 }}>
                  <EchartPublicRegionalInsights dataPct={pct.filter((v: any) => v.idProvinsi === item.idProvinsi)} />
                  <Box pt={30}>
                    <EcahrtBarPolarRegionalInsights dataLta={lta.filter((v: any) => v.idProvinsi === item.idProvinsi)} />
                  </Box>
                </Grid.Col>
              </Grid>
            </Box>
          )
        })}
      </Stack>
    </>
  );
}

