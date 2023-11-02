import { Box, Divider, Group, Text, Title } from '@mantine/core';
import _ from 'lodash';
import React from 'react';

/**
 * Fungsi untuk menampilkanPage Subtitle.
 * @returns {component} menampilaknPage Subtitle.
 */
export const PageSubTitle = ({ text1, text2 }: { text1: string, text2: string }) => {
  const now = new Date();
  const bulan = now.toLocaleString('default', { month: 'long' })
  const dateFull = now.getDate() + ' ' + _.upperCase(bulan) + ' ' + now.getFullYear() + ' ' + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ', GMT+8'
  return (
    <>
      <Box>
        <Group justify='space-between'>
          <Group gap={15}>
            <Title c='white' fw={'bold'} fz={32}>{text1}</Title>
            <Text c='white' fz={32}>{text2}</Text>
          </Group>
          <Group pt={13}>
            <Text fz={16}  c='white'>
              {dateFull}
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
