"use client"
import PageSubTitle from '@/modules/_global/front/components/PageSubtitle';
import { WARNA } from '@/modules/_global/fun/COLOR';
import EchartBarRegionalInsights from '@/modules/emotion/front/components/echart_bar_regional_insights';
import SentimentAnalysis from '@/modules/emotion/front/components/sentiment_analysis';
import EcahrtBarPolarRegionalInsights from '@/modules/leader_trait_assessment/front/components/ecahrt_bar_polar_regional_insights';
import EchartPublicRegionalInsights from '@/modules/public_concern_trend/front/components/echart_public_regional_insights';
import { Box, Button, Grid, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import React from 'react';

const provinsi = [
  {
    id: 1,
    name: 'ACEH',
  },
  {
    id: 2,
    name: 'BALI',
  },
  {
    id: 3,
    name: 'JAWA TIMUR',
  },
  {
    id: 4,
    name: 'JAWA TENGAH',
  },
  {
    id: 5,
    name: 'JAWA BARAT',
  },

]

export default function ViewRegionalInsights() {
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
          <Group justify='flex-end'>
            <TextInput placeholder='Search' />
            <Select
              placeholder="Candidate"
              data={['Prabowo', 'Anis', 'Ganjar']}
            />
            <Button radius={"lg"} c={"dark"} bg={"white"}>GENERATE</Button>
          </Group>
        </Box>
        {provinsi.map((item) => {
          return (
            <Box pt={20} key={item.id}>
              <Text fz={33} fw={"bold"} c={"white"}>{item.name}</Text>
              <Grid gutter={40}>
                <Grid.Col span={{ md: 6, lg: 6 }}>
                  <SentimentAnalysis />
                </Grid.Col>
                <Grid.Col span={{ md: 6, lg: 6 }}>
                  <EchartPublicRegionalInsights />
                  <Box pt={30}>
                    <EcahrtBarPolarRegionalInsights />
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

