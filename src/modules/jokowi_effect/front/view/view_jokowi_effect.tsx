"use client"
import PageSubTitle from '@/modules/_global/front/components/PageSubtitle';
import { WARNA } from '@/modules/_global/fun/COLOR';
import EchartJokowiEffect from '@/modules/emotion/front/components/echart_jokowi_effect';
import Top10JokowiEffect from '@/modules/emotion/front/components/top10_jokowi_effect';
import { ActionIcon, Box, Button, Divider, Grid, Group, Image, Menu, ScrollArea, SimpleGrid, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { values } from 'lodash';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdNavigateNext } from 'react-icons/md';


const data_jokowi = [
  {
    id: 1,
    decs: "Joko Widodo pertama kali dikenal oleh masyarakat luas setelah ia mulai menjabat sebagai Wali Kota Surakarta (Solo). Dengan gaya kepemimpinan yang dianggap pro-rakyat dan berani menghadapi pejabat regional yang kuat, ia berhasil mengubah kota Solo dari kota yang dipenuhi kejahatan menjadi pusat seni dan budaya region. Joko Widodo pertama kali dikenal oleh masyarakat luas setelah ia mulai menjabat sebagai Wali Kota Surakarta (Solo). Dengan gaya kepemimpinan yang dianggap pro-rakyat dan berani menghadapi pejabat regional yang kuat, ia berhasil mengubah kota Solo dari kota yang dipenuhi kejahatan menjadi pusat seni dan budaya region. Joko Widodo pertama kali dikenal oleh masyarakat luas setelah ia mulai menjabat sebagai Wali Kota Surakarta (Solo). Dengan gaya kepemimpinan yang dianggap pro-rakyat dan berani menghadapi pejabat regional yang kuat, ia berhasil mengubah kota Solo dari kota yang dipenuhi kejahatan menjadi pusat seni dan budaya region"

  }
]


/**
 * Fungsi untuk menampilkan Jokowi Effect.
 * @returns {component} menampilakn Jokowi Effect.
 */
export default function ViewJokowiEffect() {
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
            <EchartJokowiEffect />
          </Grid.Col>
        </Grid>
      </Stack>
      <Stack>
        <Box pt={20}>
          <Top10JokowiEffect />
        </Box>
        <Box pt={20}>
          <Group>
            <DateInput
              variant="filled"
              placeholder="SELECT DATE"
            />
            <Button variant='subtle' c={"white"}>10.30 WIB</Button>
            <Button variant='subtle' c={"white"}>12.30 WIB</Button>
            <Button variant='subtle' c={"white"}>13.30 WIB</Button>
            <Button variant='subtle' c={"white"}>15.30 WIB</Button>
            <Button variant='subtle' c={"white"}>15.30 WIB</Button>
            <Button variant='subtle' c={"white"}>15.30 WIB</Button>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="subtle" color="rgba(255, 255, 255, 1)" aria-label="Settings">
                  <HiDotsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown bg={"#230D37"}>
                <Menu.Item bg={"#230D37"}>
                  <Button variant='subtle' fullWidth c={"white"}>16.30 WIB</Button>
                </Menu.Item>
                <Menu.Item bg={"#230D37"}>
                  <Button variant='subtle' fullWidth c={"white"}>17.30 WIB</Button>
                </Menu.Item>
                <Menu.Item bg={"#230D37"}>
                  <Button variant='subtle' fullWidth c={"white"}>18.30 WIB</Button>
                </Menu.Item>
                <Menu.Item bg={"#230D37"}>
                  <Button variant='subtle' fullWidth c={"white"}>19.30 WIB</Button>
                </Menu.Item>
                <Menu.Item bg={"#230D37"}>
                  <Button variant='subtle' fullWidth c={"white"}>20.30 WIB</Button>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Box>
        {data_jokowi.map((item) => {
          return (
            <Box pt={10} key={item.id}>
              <Text c={"#089A31"} fz={20} fw={"bold"}>STRENGTH ANALYSIS IMPROVEMENT</Text>
              <Box pt={10}>
                <Box
                  style={{
                    backgroundColor: "#310943",
                    borderRadius: 10,
                    padding: 20
                  }}
                >
                  <ScrollArea h={"100%"} w={"100%"}>
                    <Text c={"#C1C2C5"} >{item.decs}</Text>
                  </ScrollArea>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Stack>
    </>
  );
}
