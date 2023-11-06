import { Box, ScrollArea, Stack, Text } from '@mantine/core';
import React from 'react';

export default function DetailRegionHotIssue() {
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
                Prabowo Subianto is expected to be able to highlight a
                firm personal character in responding to various important
                issues today. Especially in relation to national defense.
                Prabowo Subianto can take a role in international issues by participating in policies.
                Such as how to respond and take a stance with the countries in the BRICS alliance,
                namely Brazil, Russia, India, China and the United States of Africa which are in the
                process of creating a new currency.
              </Text>
            </Box>
          </Box>
        </ScrollArea>
      </Stack>
    </>
  );
}
