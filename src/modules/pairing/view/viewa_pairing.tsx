"use client"
import PageSubTitle from '@/modules/_global/front/components/PageSubtitle';
import { WARNA } from '@/modules/_global/fun/COLOR';
import DetailRegionalDataPairing from '@/modules/emotion/front/components/detail_regional_data_pairing';
import { Box, Button, Grid, Group, Image, Select, SimpleGrid, Stack, Text } from '@mantine/core';
import React from 'react';

export default function ViewaPairing() {
  return (
    <>
      <Stack>
        <PageSubTitle text1='REGIONAL' text2='DATA PAIRING' />
        <Box
            style={{
              backgroundColor: WARNA.ungu,
              position: "sticky",
              top: 0,
              zIndex: 100,
              padding:10
            }}
            >
              <Group justify='flex-end'>
                <Select
                  placeholder='Select Region'
                  data={['Bali', 'Jawa Barat', "Jawa Timur"]}
                />
                <Select
                  placeholder='Select Candidate'
                  data={['Prabowo x Gibran', 'Ganjar x Mahfud MD', "Anis x Muhaimin"]}
                />
                <Button bg={"white"} c={"dark"} radius={"lg"}>GENERATE</Button>
              </Group>
            </Box>
        <Grid pt={20} gutter={40}>
          <Grid.Col span={{ md: 5, lg: 5 }}>
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
                <Image alt='candidate' src="/candidate/c2.png" maw={"auto"} mx="auto" />
                <Box pt={10}>
                  <Text ta={'center'} fw={'bold'} c={"white"}>GIBRAN RAKABUMING</Text>
                </Box>
              </Box>
            </SimpleGrid>
            <Box pt={40} pb={20}>
              <Text fz={24} fs="italic" c={"#6ABD45"} ta={'center'} >SUCCESS PROBABILITY PROJECTION</Text>
            </Box>
            <Box
              style={{
                backgroundColor: "#269214",
                padding: 20,
                borderRadius: 10
              }}
            >
              <Text ta={"center"} c={"white"} fz={55} fw={"bold"}>
                76.90%
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 7, lg: 7 }}>
            <Box>
              <DetailRegionalDataPairing />
            </Box>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}
