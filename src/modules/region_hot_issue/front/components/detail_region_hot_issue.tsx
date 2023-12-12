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
        <ScrollArea w={"100%"}>
          <Box style={{
            backgroundColor: "#760000",
            padding: 20,
            borderRadius: 10
          }}>
            <Text fz={24} fw={"bold"} c={"white"}>REGION HOT ISSUE</Text>
            <Box pl={10}>
              <Text c={"white"}>
                {data[0].description}
              </Text>
            </Box>
          </Box>
        </ScrollArea>
      </Stack>
    </>
  );
}
