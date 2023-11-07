"use client"
import PageSubTitle from '@/modules/_global/front/components/PageSubtitle';
import { WARNA } from '@/modules/_global/fun/COLOR';
import DetailSentimentAnalysis from '@/modules/emotion/front/components/detail_sentiment_analysis';
import DetailEcahrtBarPolarRegionalInsights from '@/modules/leader_trait_assessment/front/components/detail_ecahrt_bar_polar_regional_insights';
import DetailEchartPublicRegionalInsights from '@/modules/public_concern_trend/front/components/detail_echart_public_regional_insights';
import DetailRegionHotIssue from '@/modules/region_hot_issue/front/components/detail_region_hot_issue';
import { ActionIcon, Box, Button, Grid, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
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

export default function ViewDetailRegionalInsights() {
  const router = useRouter()
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
            <Text fz={30} fw={'bold'} c={"white"}>ACEH</Text>
            <Group>
              <TextInput placeholder='Search' />
              <ActionIcon variant="subtle" onClick={() => router.push("/dashboard/regional-insights")} color="rgba(255, 255, 255, 1)" aria-label="close">
                <AiOutlineClose style={{ width: '80%', height: '80%' }} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Group>
        </Box>
        {provinsi.map((item) => {
          return (
            <Box pt={20} key={item.id} pb={20}>
              <Grid gutter={40}>
                <Grid.Col span={{ md: 6, lg: 6 }}>
                  <DetailRegionHotIssue />
                  <Box pt={40}>
                    <DetailEchartPublicRegionalInsights />
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ md: 6, lg: 6 }}>
                  <Text fz={33} fw={"bold"} c={"white"}>{item.name}</Text>
                  <DetailSentimentAnalysis />
                  <Box pt={40}>
                    <DetailEcahrtBarPolarRegionalInsights />
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



