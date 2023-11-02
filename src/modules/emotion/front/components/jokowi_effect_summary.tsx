"use client"
import PageSubTitle from '@/modules/_global/front/components/PageSubtitle';
import { Box, Button, Divider, Grid, Group, Image, ScrollArea, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdNavigateNext } from 'react-icons/md';



/**
 * Fungsi untuk menampilkan Jokowi Effect.
 * @returns {component} menampilakn Jokowi Effect.
 */
export default function JokowiEffectSummary() {
  const router = useRouter()
  return (
    <>
      <PageSubTitle text1='JOKOWI' text2='EFFECT' />
      <Stack pt={10}>
        <Grid>
          <Grid.Col span={{ md: 3, lg: 3 }}>
            <Box>
              <Image alt='candidate' src={"/candidate/c7.png"} maw={"auto"} mx="auto" />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 9, lg: 9 }}>
            <Box>
              <Box style={{
                backgroundColor: "#310943",
                borderRadius: 10,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20
              }}>
                <ScrollArea h={170}>
                  <Text c={"white"}>
                    Joko Widodo pertama kali dikenal oleh masyarakat luas setelah ia mulai menjabat
                    sebagai Wali Kota Surakarta (Solo). Dengan gaya kepemimpinan yang dianggap pro-rakyat
                    dan berani menghadapi pejabat regional yang kuat, ia berhasil mengubah kota Solo dari
                    kota yang dipenuhi kejahatan menjadi pusat seni dan budaya region.
                    Joko Widodo pertama kali dikenal oleh masyarakat luas setelah ia mulai menjabat
                    sebagai Wali Kota Surakarta (Solo). Dengan gaya kepemimpinan yang dianggap pro-rakyat
                    dan berani menghadapi pejabat regional yang kuat, ia berhasil mengubah kota Solo dari
                    kota yang dipenuhi kejahatan menjadi pusat seni dan budaya region.
                    Joko Widodo pertama kali dikenal oleh masyarakat luas setelah ia mulai menjabat
                    sebagai Wali Kota Surakarta (Solo). Dengan gaya kepemimpinan yang dianggap pro-rakyat
                    dan berani menghadapi pejabat regional yang kuat, ia berhasil mengubah kota Solo dari
                    kota yang dipenuhi kejahatan menjadi pusat seni dan budaya region
                  </Text>
                </ScrollArea>
                <Box pt={10} pb={10}>
                  <Divider />
                  <Group justify='flex-end' pt={10}>
                    <Box>
                      <Button
                        variant='subtle'
                        radius={"md"} c={"white"}
                        rightSection={<MdNavigateNext size={25} />} onClick={() => router.push("/dashboard/jokowi-effect")} >
                        DETAIL VIEW JOKOWI EFFECT
                      </Button>
                    </Box>
                  </Group>
                </Box>
              </Box>
            </Box>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}

