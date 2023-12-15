"use client"
import { Avatar, BackgroundImage, Box, CloseButton, Grid, Group, Image, Stack } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ViewCoba() {
  const router = useRouter()
  return (
    <>
      <BackgroundImage h={"100vh"} pos={"fixed"} src="/assets-img/bg_dashbaoard.png">
        <Stack gap={"md"} p={20}>
          <Group justify='space-between' >
            <Image src={'/assets-img/logo_raven.png'} alt="" width={50} height={50} />
            <Avatar radius={100} bg={"red"} onClick={() => router.push("/dashboard/ml-ai")}>
              <CloseButton radius={100} />
            </Avatar>
          </Group>
        <Grid>
          <Grid.Col span={{base: 3, md: 3, lg: 3 }}>
            <Box
            style={{
              background: `linear-gradient(0deg, rgba(2,2,16,1) 0%, rgba(13,26,88,1) 60%, rgba(29,58,118,1) 100%)`,
              height: "100vh",
              borderRadius: 10,
              opacity: 0.7
            }}
            >

            </Box>
          </Grid.Col>
          <Grid.Col span={{base: 6, md: 6, lg: 6 }}>
          <Box
            style={{
              background: `linear-gradient(0deg, rgba(10,66,82,1) 0%, rgba(12,22,55,0) 16%)`,
              height: "45vh",
              borderRadius: 10,
              opacity: 0.7
            }}
            mb={20}
            >

            </Box>
          <Box
            style={{
              background: `linear-gradient(0deg, rgba(20,76,169,1) 0%, rgba(10,43,102,1) 45%, rgba(12,22,55,0.01) 88%)`,
              height: "45vh",
              borderRadius: 10,
              opacity: 0.7
            }}
            >

            </Box>
          </Grid.Col>
          <Grid.Col span={{base: 3, md: 3, lg: 3 }}>
          <Box
            style={{
              background: `linear-gradient(0deg, rgba(2,2,16,1) 0%, rgba(13,26,88,1) 60%, rgba(29,58,118,1) 100%)`,
              height: "100vh",
              borderRadius: 10,
              opacity: 0.7
            }}
            >

            </Box>
          </Grid.Col>

        </Grid>
        </Stack>

      </BackgroundImage>
    </>
  );
}
