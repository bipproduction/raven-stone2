"use client"
import { WARNA } from '@/modules/_global/fun/COLOR';
import { Box, Button, Grid, Group, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EchartRegionalDataPairing from './echart_regional_data_pairing';
import { funGetLockedAudience } from '@/modules/audience';

export default function DetailRegionalDataPairing({ data }: { data: any }) {
  console.log('detail',data);
  const router = useRouter()
  const [isLocked, setLocked] = useState(0)

  async function getLoad(prov: any) {
    // console.log('ini detail', prov)
    const load = await funGetLockedAudience({ provinsi: prov })
    // console.log(load)
    // setLocked(load)
  }

  useEffect(() => {
    getLoad(data.idProvinsi)
  }, [data])


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


