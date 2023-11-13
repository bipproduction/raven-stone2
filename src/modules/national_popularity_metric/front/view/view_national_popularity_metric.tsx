"use client"
import { Box, Button, Grid, Group, Select, Stack } from '@mantine/core';
import React from 'react';
import ViewCandidatePopularity from '../components/view_candidate_popularity';
import EchartPopularity from '../components/echart_popularity';
import EchartBarPopularity from '../components/echart_bar_popularity';
import { PageSubTitle } from '@/modules/_global';


export default function ViewNationalPopularityMetric() {
  return (
    <>
      <PageSubTitle text1='NATIONAL' text2='POPULARITY METRICS' />
      <Stack pt={10}>
        <Box>
          <Group justify='flex-end'>
            <Select
              placeholder="SELECT CANDIDATE"
              data={['PRABOWO & GIBRAN', 'GANJAR & MAHFUD', 'AMIS & MUHAIMIN']}
              radius={'md'}
            />
            <Button radius={"md"} bg={"white"} c={"dark"}>GENERATE</Button>
          </Group>
        </Box>
        <Box pt={10}>
          <ViewCandidatePopularity />
        </Box>
        <Box pt={20}>
          <Grid justify="flex-end" align="center">
            <Grid.Col span={{ md: 7, lg: 7 }}>
              <EchartPopularity />

            </Grid.Col>
            <Grid.Col span={{ md: 5, lg: 5 }}>
              <EchartBarPopularity/>
            </Grid.Col>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
