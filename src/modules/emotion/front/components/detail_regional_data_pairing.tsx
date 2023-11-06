"use client"
import { WARNA } from '@/modules/_global/fun/COLOR';
import { Box, Button, Grid, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import { useRouter } from 'next/navigation';
import EchartRegionalDataPairing from './echart_regional_data_pairing';

export default function DetailRegionalDataPairing() {
  const router = useRouter()
  return (
    <>
      <Stack>
        <Box>
          <EchartRegionalDataPairing />
          <Group pl={20}>
            <Grid gutter="xl">
              <Grid.Col span={{ md: 6, lg: 6 }}>
                <Text c={WARNA.merah_emotion} fz={15}>Locked Audience</Text>
                <Text ta={'center'} c={WARNA.hijau_emotion} fz={25} fw={'bold'}>3.887.189</Text>
              </Grid.Col>
              <Grid.Col span={{ md: 6, lg: 6 }}>
                <Text c={WARNA.merah_emotion} fz={15}>Locked Audience</Text>
                <Text ta={'center'} c={WARNA.hijau_emotion} fz={25} fw={'bold'}>3.887.189</Text>
              </Grid.Col>
            </Grid>
          </Group>
        </Box>
      </Stack>
    </>
  );
}


