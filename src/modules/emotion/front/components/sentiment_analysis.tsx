"use client"
import { Box, Button, Grid, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import EchartBarRegionalInsights from './echart_bar_regional_insights';
import { useRouter } from 'next/navigation';
import { WARNA } from '@/modules/_global';
import _ from 'lodash';

export default function SentimentAnalysis({ dataAudience, dataEmotion, candidate }: { dataAudience: any, dataEmotion: any, candidate: any }) {
  const router = useRouter()

  const locked = dataAudience
    .filter((v: any) => v.idProvinsi === dataEmotion.idProvinsi)
    .map((itm: any) => Number(itm.value))


  const filtered = _.sum([
    dataEmotion.confidence,
    dataEmotion.dissapproval,
    dataEmotion.negative,
    dataEmotion.positive,
    dataEmotion.supportive,
    dataEmotion.uncomfortable,
    dataEmotion.undecided,
    dataEmotion.unsupportive,
  ])

  return (
    <>
      <Stack>
        <Box>
          <EchartBarRegionalInsights dataEmotion={dataEmotion} />
          <Box pt={20}>
            <Group justify='space-around'>
              <Grid gutter="xl">
                <Grid.Col span={{ md: 6, lg: 6 }}>
                  <Text c={WARNA.merah_emotion} fz={15}>Locked Audience</Text>
                  <Text ta={'center'} c={WARNA.hijau_emotion} fz={25} fw={'bold'}>{Intl.NumberFormat("id-ID").format(Number(locked))}</Text>
                </Grid.Col>
                <Grid.Col span={{ md: 6, lg: 6 }}>
                  <Text c={WARNA.merah_emotion} fz={15}>Locked Audience</Text>
                  <Text ta={'center'} c={WARNA.hijau_emotion} fz={25} fw={'bold'}>{Intl.NumberFormat("id-ID").format(Number(filtered))}</Text>
                </Grid.Col>
              </Grid>
              <Box>
                <Button c={"dark"} bg={"white"} onClick={() => router.push('/dashboard/regional-insights/' + candidate + '/' + dataEmotion.idProvinsi)} >DETAIL</Button>
              </Box>
            </Group>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
