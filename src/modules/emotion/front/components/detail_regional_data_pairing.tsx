"use client"
import { Box, Grid, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import EchartRegionalDataPairing from './echart_regional_data_pairing';
import _, { filter } from 'lodash';
import { WARNA } from '@/modules/_global';


/**
 * Fungsi untuk menampilkan detail regional data pairing.
 * @param {dataEmotion} dataEmotion - menampilkan dataEmotion.
 * @param {dataAudience} dataAudience - menampilkan dataAudience.
 * @returns Untuk  menampilkan detail regional data pairing
 */
export default function DetailRegionalDataPairing({ dataEmotion, dataAudience }: { dataEmotion: any, dataAudience: any }) {
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
      <Stack mb={50}>
        <Box>
          <EchartRegionalDataPairing dataEmotion={dataEmotion} total={filtered} />
          <Group pl={20}>
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
          </Group>
        </Box>
      </Stack>
    </>
  );
}


