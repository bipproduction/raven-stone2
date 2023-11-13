"use client"
import { Box, Grid, Stack } from '@mantine/core';
import React from 'react';
import JokowiEffectSummary from '../components/jokowi_effect_summary';
import ViewSummaryCandidate from '../components/view_summary_candidate';
import { PageSubTitle } from '@/modules/_global';


/**
 * Fungsi untuk menampilkan view summary.
 * @returns {component} menampilakn view summary.
 */
export default function ViewSummary() {
  return (
    <>
      <PageSubTitle text1='EMOTIONAL' text2='SPECTRUM CHART' />
      <Stack pt={10}>
        <ViewSummaryCandidate />
        <Box pt={20}>
          <JokowiEffectSummary />
        </Box>
      </Stack>
    </>
  );
}

