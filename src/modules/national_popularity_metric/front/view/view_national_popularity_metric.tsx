"use client"
import { Box, Button, Grid, Group, Select, Stack } from '@mantine/core';
import React, { useState } from 'react';
import ViewCandidatePopularity from '../components/view_candidate_popularity';
import EchartPopularity from '../components/echart_popularity';
import EchartBarPopularity from '../components/echart_bar_popularity';
import { PageSubTitle, funGetOnePaslon } from '@/modules/_global';
import _ from 'lodash';
import { funGetOnePopularityFront, funGetPopularityFront } from '../..';
import moment from "moment";

/**
 * Fungsi untuk Menampilkan view national popularity metric.
 * @param {paslon} paslon - menampilkan paslon.
 * @param {cpaslon} cpaslon - menampilkan cpaslon.
 * @param {dataNow} dataNow - menampilkan dataNow.
 * @returns Untuk Menampilkan view national popularity metric
 */
export default function ViewNationalPopularityMetric({ paslon, cpaslon, dataNow, dbChart }: { paslon: any, cpaslon: any, dataNow: any, dbChart: any }) {

  const [isPaslon, setPaslon] = useState<any>(1)
  const [isDataPaslon, setDataPaslon] = useState(cpaslon)
  const [isDataNow, setDataNow] = useState(dataNow)
  const [dataChart, setDataChart] = useState<any>({
    confidence: Number(isDataNow?.confidence),
    supportive: Number(isDataNow?.supportive),
    positive: Number(isDataNow?.positive),
    undecided: Number(isDataNow?.undecided),
    unsupportive: Number(isDataNow?.unsupportive),
    uncomfortable: Number(isDataNow?.uncomfortable),
    negative: Number(isDataNow?.negative),
    dissapproval: Number(isDataNow?.dissapproval),
  })
  const [isChartLine, setChartLine] = useState(dbChart)

  async function onGenerate() {
    const loadPaslon = await funGetOnePaslon({ paslon: isPaslon })
    setDataPaslon(loadPaslon)
    const loadChart = await funGetPopularityFront({ paslon: isPaslon, startDate: moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"), endDate: moment(new Date()).format("YYYY-MM-DD") })
    setChartLine(loadChart)
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
            <ViewCandidatePopularity dataPaslon={isDataPaslon} probability={isDataNow?.rate} />
          </Box>
          <Box pt={20}>
            <Grid justify="flex-end" align="center">
              <Grid.Col span={{ md: 7, lg: 7 }}>
                <EchartPopularity data={isChartLine} paslon={isPaslon} />
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
