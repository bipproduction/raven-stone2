import { Box, Center, Flex, Grid, Group, Image, SimpleGrid, Text, Title } from '@mantine/core';
import React from 'react';

export default function ViewCandidatePopularity() {
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
                <Text ta={'start'} fw={"bold"} fz={70} c={"#1EBA1B"}>51.05%</Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

      </Box >


    </>
  );
}

