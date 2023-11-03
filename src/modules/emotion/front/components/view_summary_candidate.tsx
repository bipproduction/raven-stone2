"use client"
import { WARNA } from '@/modules/_global/fun/COLOR';
import { Box, Button, Grid, Group, Image, SimpleGrid, Text } from '@mantine/core';
import React from 'react';
import EchartSummary from './echart_summary';
import ViewTop10 from './view_top10';

const dataSummary = [
  {
    id: 1,
    presiden: "PRABOWO SUBIANTO",
    wakil: "GIBRAN RAKABUMING",
    imgPresiden: "/candidate/c1.png",
    imgWakil: "/candidate/c2.png",
  },
  {
    id: 2,
    presiden: "GANJAR PRANOWO",
    wakil: "MAHFUD MAHMODIN",
    imgPresiden: "/candidate/c3.png",
    imgWakil: "/candidate/c4.png",
  },
  {
    id: 3,
    presiden: "ANIES BASWEDAN",
    wakil: "MUHAIMIN ISKANDAR",
    imgPresiden: "/candidate/c5.png",
    imgWakil: "/candidate/c6.png",
  },
]


/**
 * Fungsi untuk menampilkan summary candidate.
 * @returns {component} menampilakn summary candidate.
 */
export default function ViewSummaryCandidate() {
  return (
    <>
      {dataSummary.map((v, i) => {
        return (
          <Box key={i} pb={20}>
            <Grid>
              <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
                <SimpleGrid
                  cols={{ sm: 2, lg: 2 }}
                  spacing={{ base: 10, sm: 'xl' }}
                  verticalSpacing={{ base: 'md', sm: 'xl' }}
                >
                  <Box>
                    <Image alt='candidate' src={v.imgPresiden} maw={"auto"} mx="auto" />
                    <Box pt={10}>
                      <Text ta={'center'} fw={'bold'} c={"white"}>{v.presiden}</Text>
                    </Box>
                  </Box>
                  <Box>
                    <Image alt='candidate' src={v.imgWakil} maw={"auto"} mx="auto" />
                    <Box pt={10}>
                      <Text ta={'center'} fw={'bold'} c={"white"}>{v.wakil}</Text>
                    </Box>
                  </Box>
                </SimpleGrid>
                <SimpleGrid
                  cols={{ sm: 3, lg: 3 }}
                  spacing={{ base: 10, sm: 'xl' }}
                  verticalSpacing={{ base: 'md', sm: 'xl' }}
                >
                  <Box pt={20}>
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
                  <Box pt={20}>
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
                  <Box pt={20}>
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
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 7, lg: 7 }}>
                <EchartSummary />
              </Grid.Col>
            </Grid>
            <Box pt={20}>
              <ViewTop10 />
            </Box>
          </Box>
        )
      })}
    </>
  );
}
