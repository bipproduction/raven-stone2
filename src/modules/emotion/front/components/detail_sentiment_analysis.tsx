"use client"
import { Box, Button, Grid, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import DetailEchartBarRegionalInsights from './detail_echart_bar_regional_insights';
import { WARNA } from '@/modules/_global';
import _ from 'lodash';

/**
 * Fungsi untuk menampilkan detail sentiment analysis.
 * @param {dataEmotion} dataEmotion - menampilkan dataEmotion.
 * @param {dataAudience} dataAudience - menampilkan dataAudience.
 * @returns Untuk  menampilkan detail sentiment analysis
 */

export default function DetailSentimentAnalysis({ dataAudience, dataEmotion }: { dataAudience: any, dataEmotion: any }) {

  const locked = dataAudience
    .filter((v: any) => v.idKabkot === dataEmotion.idKabkot)
    .map((itm: any) => Number(itm.value))
    
  const filtered = dataEmotion.filtered

  return (
    <>
      <Stack>
        <Box>
          <DetailEchartBarRegionalInsights dataEmotion={dataEmotion} />
          <Group justify='space-between'>
            <Group pl={30}>
              <Box>
                <Text c={WARNA.merah_emotion} fz={15}>Locked Audience</Text>
                <Text ta={'center'} c={WARNA.hijau_emotion} fz={25} fw={'bold'}>{Intl.NumberFormat("id-ID").format(Number(locked))}</Text>
              </Box>
              <Box>
                <Text c={WARNA.merah_emotion} fz={15}>Filtered Audience</Text>
                <Text ta={'center'} c={WARNA.hijau_emotion} fz={25} fw={'bold'}>{Intl.NumberFormat("id-ID").format(Number(filtered))}</Text>
              </Box>
            </Group>
          </Group>
        </Box>
      </Stack>
    </>
  );
}


