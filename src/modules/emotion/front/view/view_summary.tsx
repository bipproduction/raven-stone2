"use client"
import { BackgroundImage, Box, Grid, Image, Stack } from '@mantine/core';
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
      <Box style={{
        backgroundColor: "rgba(27,11,47,0.8)",
        zIndex: 100,
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backdropFilter: `blur(10px)`,
      }}>
      </Box>
      <Box>
        <PageSubTitle text1='EMOTIONAL' text2='SPECTRUM CHART' />
        <Stack pt={10}>
          <ViewSummaryCandidate />
          <Box pt={20}>
            <JokowiEffectSummary emotion={[]} locked={[]}/>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

