import { Box, ScrollArea, Stack, Text } from '@mantine/core';
import React from 'react';


/**
 * Fungsi untuk menampilkan detail region hot issue.
 * @param {data} data - menampilkan data.
 * @returns Untuk menampilkan detail region hot issue
 */
export default function DetailRegionHotIssue({ data }: { data: any }) {
  return (
    <>
      <Stack>
        <Box style={{
          backgroundColor: "#760000",
          padding: 20,
          borderRadius: 10,
          height: 400
        }}>
          <Box pb={10}>
            <Text fz={24} fw={"bold"} c={"white"}>REGION HOT ISSUE</Text>
          </Box>
          <ScrollArea w={"100%"} h={315}>
            <Box>
              <Text c={"white"}>
                {data[0].description}
              </Text>
            </Box>
          </ScrollArea>
        </Box>
      </Stack>
    </>
  );
}
