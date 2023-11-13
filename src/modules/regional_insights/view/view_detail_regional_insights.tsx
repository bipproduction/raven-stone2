"use client"
import { PageSubTitle, WARNA } from '@/modules/_global';
import { DetailSentimentAnalysis, funGetEmotionDetailRegionalFront } from '@/modules/emotion';
import { DetailEcahrtBarPolarRegionalInsights } from '@/modules/leader_trait_assessment';
import { DetailEchartPublicRegionalInsights } from '@/modules/public_concern_trend';
import { DetailRegionHotIssue } from '@/modules/region_hot_issue';
import { ActionIcon, Box, Grid, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const provinsi = [
  {
    id: 1,
    name: 'ACEH BARAT',
  },
  {
    id: 2,
    name: 'ACEH BARAT DAYA',
  },
  {
    id: 3,
    name: 'ACEH BESAR',
  },
  {
    id: 4,
    name: 'ACEH JAYA',
  },
  {
    id: 5,
    name: 'ACEH SELATAN',
  },

]

export default function ViewDetailRegionalInsights({ parameter, emotion, audience, rhi, lta, pct, region, kabupaten }: { parameter: any, emotion: any, audience: any, rhi: any, lta: any, pct: any, region: any, kabupaten: any }) {
  const [isEmotion, setEmotion] = useState(emotion)
  const [isKabupaten, setKabupaten] = useState(null)
  const router = useRouter()

  async function onChoose(value: any) {
    setKabupaten(value)
    const loadData = await funGetEmotionDetailRegionalFront({ candidate: parameter.idCandidate, provinsi: parameter.idProvinsi, kabupaten: value })
    setEmotion(loadData)
  }
  return (
    <>
      <Stack>
        <PageSubTitle text1='REGIONAL' text2='INSIGHTS' />
        <Box
          style={{
            backgroundColor: WARNA.ungu,
            position: "sticky",
            top: 0,
            zIndex: 100,
            padding: 10
          }}
        >
          <Group justify='space-between'>
            <Text fz={30} fw={'bold'} c={"white"}>{region.name}</Text>
            <Group>
              <Select
                placeholder="Select Region"
                data={kabupaten.map((pro: any) => ({
                  value: String(pro.id),
                  label: pro.name
                }))}
                value={isKabupaten}
                searchable
                onChange={(val: any) => onChoose(val)}
              />
              <ActionIcon variant="subtle" onClick={() => router.push("/dashboard/regional-insights")} color="rgba(255, 255, 255, 1)" aria-label="close">
                <AiOutlineClose style={{ width: '80%', height: '80%' }} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Group>
        </Box>
        {isEmotion.map((item: any, i: any) => {
          return (
            <Box pt={20} key={i} pb={20}>
              <Grid gutter={40}>
                <Grid.Col span={{ md: 6, lg: 6 }}>
                  <DetailRegionHotIssue data={rhi.filter((v: any) => v.idKabkot === item.idKabkot)} />
                  <Box pt={40}>
                    <DetailEchartPublicRegionalInsights dataPct={pct.filter((v: any) => v.idKabkot === item.idKabkot)} />
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ md: 6, lg: 6 }}>
                  <Text fz={33} fw={"bold"} c={"white"}>{item.name}</Text>
                  <DetailSentimentAnalysis dataAudience={audience} dataEmotion={item} />
                  <Box pt={40}>
                    <DetailEcahrtBarPolarRegionalInsights dataLta={lta.filter((v: any) => v.idKabkot === item.idKabkot)} />
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



