"use client"
import { WARNA } from '@/modules/_global/fun/COLOR';
import { Box, Button, Grid, Group, Image, SimpleGrid, Text } from '@mantine/core';
import React from 'react';
import EchartSummary from './echart_summary';


/**
 * Fungsi untuk menampilkan summary candidate.
 * @returns {component} menampilakn summary candidate.
 */
export default function ViewSummaryCandidate() {
  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <SimpleGrid
            cols={{ sm: 2, lg: 2 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
          >
            <Box>
              <Image alt='candidate' src={"/candidate/c1.png"} maw={"auto"} mx="auto" />
              <Box pt={10}>
                <Text ta={'center'} fw={'bold'} c={"white"}>PRABOWO SUBIANTO</Text>
              </Box>
            </Box>
            <Box>
              <Image alt='candidate' src={"/candidate/c2.png"} maw={"auto"} mx="auto" />
              <Box pt={10}>
                <Text ta={'center'} fw={'bold'} c={"white"}>GIBRAN RAKABUMING</Text>
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

          <EchartSummary/>
        </Grid.Col>
      </Grid>
    </>
  );
}
