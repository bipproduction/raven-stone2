"use client"
import { WARNA } from '@/modules/_global/fun/COLOR';
import { Box, Button, Grid, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import EchartBarRegionalInsights from './echart_bar_regional_insights';
import { useRouter } from 'next/navigation';

export default function SentimentAnalysis() {
  const router = useRouter()
  return (
    <>
      <Stack>
        <Box>
          <EchartBarRegionalInsights/>
            <Box pt={20}>
          <Group justify='space-around'>
          <Grid gutter="xl">
            <Grid.Col span={{md: 6, lg: 6}}>
              <Text c={WARNA.merah_emotion} fz={15}>Locked Audience</Text>
              <Text ta={'center'} c={WARNA.hijau_emotion} fz={25} fw={'bold'}>3.887.189</Text>
            </Grid.Col>
            <Grid.Col span={{md: 6, lg: 6}}>
              <Text c={WARNA.merah_emotion} fz={15}>Locked Audience</Text>
              <Text ta={'center'} c={WARNA.hijau_emotion} fz={25} fw={'bold'}>3.887.189</Text>
            </Grid.Col>
          </Grid>
          <Box>
            <Button c={"dark"} bg={"white"} onClick={() => router.push('/dashboard/regional-insights/1')} >DETAIL</Button>
          </Box>
          </Group>
            </Box>
        </Box>
      </Stack>
    </>
  );
}
