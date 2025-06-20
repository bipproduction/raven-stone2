"use client"
import { Box, Button, Divider, Grid, Group, Image, ScrollArea, SimpleGrid, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdNavigateNext } from 'react-icons/md';
import EchartJokowiEffect from './echart_jokowi_effect';
import Top10JokowiEffect from './top10_jokowi_effect';
import { TypeAnimation } from 'react-type-animation';
import { PageSubTitle, WARNA } from '@/modules/_global';

const data_jokowi = [
  {
    id: 1,
    desc: "Joko Widodo pertama kali dikenal oleh masyarakat luas setelah ia mulai menjabat sebagai Wali Kota Surakarta (Solo). Dengan gaya kepemimpinan yang dianggap pro-rakyat dan berani menghadapi pejabat regional yang kuat, ia berhasil mengubah kota Solo dari kota yang dipenuhi kejahatan menjadi pusat seni dan budaya region. Joko Widodo pertama kali dikenal oleh masyarakat luas setelah ia mulai menjabat sebagai Wali Kota Surakarta (Solo). Dengan gaya kepemimpinan yang dianggap pro-rakyat dan berani menghadapi pejabat regional yang kuat, ia berhasil mengubah kota Solo dari kota yang dipenuhi kejahatan menjadi pusat seni dan budaya region. Joko Widodo pertama kali dikenal oleh masyarakat luas setelah ia mulai menjabat sebagai Wali Kota Surakarta (Solo). Dengan gaya kepemimpinan yang dianggap pro-rakyat dan berani menghadapi pejabat regional yang kuat, ia berhasil mengubah kota Solo dari kota yang dipenuhi kejahatan menjadi pusat seni dan budaya region"
  }
]

/**
 * Fungsi untuk menampilkan jokowi effext summary.
 * @param {emotion} emotion - menampilkan emotion.
 * @param {locked} locked - menampilkan locked.
 * @returns Untuk  menampilkan jokowi effext summary
 */
export default function JokowiEffectSummary({ emotion, locked }: { emotion: any, locked: any }) {
  const router = useRouter()
  return (
    <>
      <PageSubTitle text1='JOKOWI' text2='EFFECT' />
      <Stack pt={10}>
        <Grid>
          <Grid.Col span={{ md: 3, lg: 3 }}>
            <Box pt={22}>
              <Image alt='candidate' src={"/candidate/c7.png"} maw={300} mx="auto" />
              <Box pt={10}>
                <Text ta={'center'} fw={'bold'} c={"white"}>JOKO WIDODO</Text>
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 2, lg: 2 }}>
            <Box pt={32}>
              <SimpleGrid
                cols={1}
              >
                <Box >
                  <Box style={{
                    backgroundColor: WARNA.hijau,
                    border: "1px solid #ffff",
                    padding: 5,
                    borderRadius: 5
                  }}>
                    <Text ml={5} fz={13} c={"white"}>POSITIVE</Text>
                    <Text ta={'center'} fw={'bold'} c={"white"} fz={24}>57.76%</Text>
                  </Box>
                </Box>
                <Box>
                  <Box style={{
                    backgroundColor: "white",
                    border: "1px solid #ffff",
                    padding: 5,
                    borderRadius: 5
                  }}>
                    <Text ml={5} fz={13} c={WARNA.hijau}>NEUTRAL</Text>
                    <Text ta={'center'} fw={'bold'} c={WARNA.hijau} fz={24}>57.76%</Text>
                  </Box>
                </Box>
                <Box>
                  <Box style={{
                    backgroundColor: WARNA.merah,
                    border: "1px solid #ffff",
                    padding: 5,
                    borderRadius: 5
                  }}>
                    <Text ml={5} fz={13} c={"white"}>NEGATIVE</Text>
                    <Text ta={'center'} fw={'bold'} c={"white"} fz={24}>57.76%</Text>
                  </Box>
                </Box>
              </SimpleGrid>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 7, lg: 7 }}>
            <EchartJokowiEffect data={[]} />
          </Grid.Col>
        </Grid>
      </Stack>
      <Stack>
        <Box pt={20}>
          <Top10JokowiEffect data={emotion} dataLocked={locked} />
        </Box>
        <Box pt={20}>
          <Box style={{
            backgroundColor: "#310943",
            borderRadius: 10,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20
          }}>
            {data_jokowi.map((item) => {
              return (
                <ScrollArea h={170} key={item.id}>
                  <TypeAnimation
                    sequence={[
                      item.desc,
                      1000,
                    ]}
                    speed={70}
                    style={{ fontSize: '16', color: "white" }}
                  />
                </ScrollArea>
              )
            })}
            <Box pt={10} pb={10}>
              <Divider />
              <Group justify='flex-end' pt={10}>
                <Box>
                  <Button
                    variant='subtle'
                    radius={"md"} c={"white"}
                    rightSection={<MdNavigateNext size={25} />} onClick={() => router.push("/dashboard/jokowi-effect")} >
                    DETAIL VIEW JOKOWI EFFECT
                  </Button>
                </Box>
              </Group>
            </Box>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

