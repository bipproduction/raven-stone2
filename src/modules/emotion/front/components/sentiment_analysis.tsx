"use client"
import { Box, Button, Grid, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import EchartBarRegionalInsights from './echart_bar_regional_insights';
import { useRouter } from 'next/navigation';
import { WARNA } from '@/modules/_global';
import _ from 'lodash';

/**
 * Fungsi untuk menampilkan sentiment analysis.
 * @param {dataEmotion} dataEmotion - menampilkan dataEmotion.
 * @param {dataAudience} dataAudience - menampilkan dataAudience.
 * @param {candidate} candidate - menampilkan candidate.
 * @returns Untuk  menampilkan sentiment analysis
 */

export default function SentimentAnalysis({ dataAudience, dataEmotion, candidate }: { dataAudience: any, dataEmotion: any, candidate: any }) {
  const router = useRouter()

  const locked = dataAudience
    .filter((v: any) => v.idProvinsi === dataEmotion.idProvinsi)
    .map((itm: any) => Number(itm.value))


  // const filtered = _.sum([
  //   dataEmotion.confidence,
  //   dataEmotion.dissapproval,
  //   dataEmotion.negative,
  //   dataEmotion.positive,
  //   dataEmotion.supportive,
  //   dataEmotion.uncomfortable,
  //   dataEmotion.undecided,
  //   dataEmotion.unsupportive,
  // ])

  const filtered = dataEmotion.filtered

  return (
    <>
      <Stack>
        <Box>
          <EchartBarRegionalInsights dataEmotion={dataEmotion} />
          <Box pt={20}>
            <Group justify='space-between' gap={20}>
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
