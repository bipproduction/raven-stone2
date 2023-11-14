"use client"
import { Box, Button, Grid, Group, Select, Stack } from '@mantine/core';
import React, { useState } from 'react';
import ViewCandidatePopularity from '../components/view_candidate_popularity';
import EchartPopularity from '../components/echart_popularity';
import EchartBarPopularity from '../components/echart_bar_popularity';
import { PageSubTitle, funGetOnePaslon } from '@/modules/_global';
import _ from 'lodash';
import { funGetOnePopularityFront } from '../..';


export default function ViewNationalPopularityMetric({ paslon, cpaslon, dataNow }: { paslon: any, cpaslon: any, dataNow: any }) {

  const [isPaslon, setPaslon] = useState<any>(1)
  const [isDataPaslon, setDataPaslon] = useState(cpaslon)
  const [isDataNow, setDataNow] = useState(dataNow)
  const [dataChart, setDataChart] = useState<any>({
    confidence: Number(isDataNow.confidence),
    supportive: Number(isDataNow.supportive),
    positive: Number(isDataNow.positive),
    undecided: Number(isDataNow.undecided),
    unsupportive: Number(isDataNow.unsupportive),
    uncomfortable: Number(isDataNow.uncomfortable),
    negative: Number(isDataNow.negative),
    dissapproval: Number(isDataNow.dissapproval),
  })

  async function onGenerate() {
    const loadPaslon = await funGetOnePaslon({ paslon: isPaslon })
    setDataPaslon(loadPaslon)
    const loadNow = await funGetOnePopularityFront({ paslon: isPaslon })
    setDataNow(loadNow)
    setDataChart({
      ...dataChart,
      confidence: Number(loadNow?.confidence),
      supportive: Number(loadNow?.supportive),
      positive: Number(loadNow?.positive),
      undecided: Number(loadNow?.undecided),
      unsupportive: Number(loadNow?.unsupportive),
      uncomfortable: Number(loadNow?.uncomfortable),
      negative: Number(loadNow?.negative),
      dissapproval: Number(loadNow?.dissapproval),
    })
  }

  return (
    <>
      <Box style={{
        backgroundColor: "rgba(27,11,47,0.8)",
        zIndex: 100,
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backdropFilter: `blur(10px)`,
        // opacity: 0.8,
      }}></Box>
      <Box>
        <PageSubTitle text1='NATIONAL' text2='POPULARITY METRICS' />
        <Stack pt={10}>
          <Box>
            <Group justify='flex-end'>
              <Select placeholder='Candidate'
                data={paslon.map((pro: any) => ({
                  value: String(pro.id),
                  label: pro.name
                }))}
                value={_.toString(isPaslon)}
                onChange={(val) => { setPaslon(val) }}
              />
              <Button radius={"md"} bg={"white"} c={"dark"} onClick={onGenerate}>GENERATE</Button>
            </Group>
          </Box>
          <Box pt={10}>
            <ViewCandidatePopularity dataPaslon={isDataPaslon} probability={isDataNow.rate} />
          </Box>
          <Box pt={20}>
            <Grid justify="flex-end" align="center">
              <Grid.Col span={{ md: 7, lg: 7 }}>
                <EchartPopularity />
              </Grid.Col>
              <Grid.Col span={{ md: 5, lg: 5 }}>
                <EchartBarPopularity emotion={dataChart} />
              </Grid.Col>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
