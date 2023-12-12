import { Box, Grid, Image, SimpleGrid, Text } from '@mantine/core';
import React from 'react';


/**
 * Fungsi untuk menampilkan view candidate popularity.
 * @param {dataPaslon} dataPaslon - menampilkan dataPaslon.
 * @param {probability} probability - menampilkan probability.
 * @returns Untuk menampilkan view candidate popularity
 */
export default function ViewCandidatePopularity({ dataPaslon, probability }: { dataPaslon: any, probability: any }) {
  return (
    <>
      <Box>
        <Grid gutter={60}>
          <Grid.Col span={{ md: 5, lg: 5 }}>
            <SimpleGrid
              cols={{ sm: 2, lg: 2 }}
              spacing={{ base: 10, sm: 'xl' }}
              verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
              <Box>
                <Image alt='candidate' src={`/img/candidate/${dataPaslon.imgCapres}`} maw={"auto"} mx="auto" />
                <Box pt={10}>
                  <Text ta={'center'} fw={'bold'} c={"white"}>{dataPaslon.nameCapres.toUpperCase()}</Text>
                </Box>
              </Box>
              <Box>
                <Image alt='candidate' src={`/img/candidate/${dataPaslon.imgCawapres}`} maw={"auto"} mx="auto" />
                <Box pt={10}>
                  <Text ta={'center'} fw={'bold'} c={"white"}>{dataPaslon.nameCawapres.toUpperCase()}</Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col span={{ md: 7, lg: 7 }}>
            <Grid justify="flex-end" align="center" pt={20}>
              <Grid.Col span={6} >
                <Text fz={32} fs="italic" c={"white"}>
                  SUCCESS
                  PROBABILITY
                  PROJECTION
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text ta={'start'} fw={"bold"} fz={70} c={"#1EBA1B"}>{probability}%</Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

      </Box >


    </>
  );
}

