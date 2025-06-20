'use client'
import { Box, Divider, Group, Text, Title } from '@mantine/core';
import { useInterval, useShallowEffect } from '@mantine/hooks';
import _ from 'lodash';
import React, { useState } from 'react';

/**
 * Menampilkan title page dan jam berjalan
 * @param text1 kata yang ingin di bold
 * @param text2 kata yang tidak ingin di bold
 * @returns komponen subtitle page
 */

export const PageSubTitle = ({ text1, text2 }: { text1: string, text2: string }) => {
  const now = new Date();
  const bulan = now.toLocaleString('default', { month: 'long' })
  const [isDateFull, setDateFull] = useState("")

  // fungsi interval untuk update jam setiap 1 menit
  const interval = useInterval(() => {
    const nowLoad = new Date()
    setDateFull(nowLoad.getDate() + ' ' + _.upperCase(bulan) + ' ' + nowLoad.getFullYear() + ' ' + nowLoad.getHours() + ':' + (nowLoad.getMinutes() < 10 ? '0' + nowLoad.getMinutes() : nowLoad.getMinutes()) + ', GMT+8')
  }, 60000)


  useShallowEffect(() => {
    // set awal jam
    const now1 = now.getDate() + ' ' + _.upperCase(bulan) + ' ' + now.getFullYear() + ' ' + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ', GMT+8'
    setDateFull(now1)

    // run fungsi interval
    interval.start()
  }, [])


  return (
    <>
      <Box>
        <Group justify='space-between'>
          <Group gap={15}>
            <Title c='white' fw={'bold'} fz={32}>{text1}</Title>
            <Text c='white' fz={32}>{text2}</Text>
          </Group>
          <Group pt={13}>
            <Text fz={16} c='white'>
              {isDateFull}
            </Text>
          </Group>
        </Group>
        <Box>
          <Divider color='gray' my={"sm"} />
        </Box>
      </Box>
    </>
  );
}

export default PageSubTitle;
