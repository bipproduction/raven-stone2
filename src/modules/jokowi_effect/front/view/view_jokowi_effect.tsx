"use client"
import { ActionIcon, Box, Button, Grid, Group, Image, Menu, ScrollArea, SimpleGrid, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { funGetEffectFront } from '../..';
import { PageSubTitle, WARNA } from '@/modules/_global';
import { EchartJokowiEffect, Top10JokowiEffect } from '@/modules/emotion';



/**
 * Fungsi untuk menampilkan Jokowi Effect.
 * @returns {component} menampilakn Jokowi Effect.
 */
export default function ViewJokowiEffect({ effect }: { effect: any }) {
  const [dataEffect, setDataEffect] = useState(effect.data)
  const [dataJamEffect, setDataJamEffect] = useState(effect.dataJam)
  const [isDate, setDate] = useState<any>(new Date())
  const [isBTime, setBTime] = useState(effect.isJam)

  async function chooseDate(value: any) {
    setDate(value)
    const data = await funGetEffectFront({ isDate: value })
    setDataEffect(data.data)
    setDataJamEffect(data.dataJam)
    setBTime(data.isJam)
  }

  async function chooseTime(value: any) {
    setBTime(value)
    const data = await funGetEffectFront({ isDate: isDate, isTime: value })
    setDataEffect(data.data)
  }

  return (
    <>
      <PageSubTitle text1='JOKOWI' text2='EFFECT' />
      <Stack pt={10}>
        <Grid>
          <Grid.Col span={{ md: 3, lg: 3 }}>
            <Box pt={22}>
              <Image alt='candidate' src={"/candidate/c7.png"} maw={300} mx="auto" />
              <Box pt={10}>
                <Text ta={'center'} fw={'bold'} c={"white"}>JOKO WIDODO</Text>
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 2, lg: 2 }}>
            <Box pt={32}>
              <SimpleGrid
                cols={1}
              >
                <Box >
                  <Box style={{
                    backgroundColor: WARNA.hijau,
                    border: "1px solid #ffff",
                    padding: 5,
                    borderRadius: 5
                  }}>
                    <Text ml={5} fz={13} c={"white"}>POSITIVE</Text>
                    <Text ta={'center'} fw={'bold'} c={"white"} fz={24}>57.76%</Text>
                  </Box>
                </Box>
                <Box>
                  <Box style={{
                    backgroundColor: "white",
                    border: "1px solid #ffff",
                    padding: 5,
                    borderRadius: 5
                  }}>
                    <Text ml={5} fz={13} c={WARNA.hijau}>NEUTRAL</Text>
                    <Text ta={'center'} fw={'bold'} c={WARNA.hijau} fz={24}>57.76%</Text>
                  </Box>
                </Box>
                <Box>
                  <Box style={{
                    backgroundColor: WARNA.merah,
                    border: "1px solid #ffff",
                    padding: 5,
                    borderRadius: 5
                  }}>
                    <Text ml={5} fz={13} c={"white"}>NEGATIVE</Text>
                    <Text ta={'center'} fw={'bold'} c={"white"} fz={24}>57.76%</Text>
                  </Box>
                </Box>
              </SimpleGrid>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 7, lg: 7 }}>
            <EchartJokowiEffect />
          </Grid.Col>
        </Grid>
      </Stack>
      <Stack>
        <Box pt={20}>
          <Top10JokowiEffect />
        </Box>
        <Box pt={20}>
          <Group>
            <DateInput
              variant="filled"
              placeholder="SELECT DATE"
              maxDate={new Date()}
              value={isDate}
              onChange={(val) => {
                chooseDate(val)
              }}
            />
            {
              dataJamEffect.map((item: any, i: any) => {
                return (
                  <div key={i}>
                    <Button variant={(isBTime == item.timeContent) ? 'filled' : 'subtle'} c={"white"}
                      onClick={() => {
                        chooseTime(item.timeContent)
                      }}
                    >
                      {item.timeContent}
                    </Button>
                  </div>
                )

              })
            }
            {/* <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="subtle" color="rgba(255, 255, 255, 1)" aria-label="Settings">
                  <HiDotsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown >
                <Menu.Item bg={"#230D37"}>
                  <Text ta={"center"} c={"white"} fz={16}>
                    16.31
                  </Text>
                </Menu.Item>
                <Menu.Item bg={"#230D37"} mt={5}>
                  <Text ta={"center"} c={"white"} fz={16}>
                    18.33
                  </Text>
                </Menu.Item>
                <Menu.Item bg={"#230D37"} mt={5}>
                  <Text ta={"center"} c={"white"} fz={16}>
                    19.45
                  </Text>
                </Menu.Item>
                <Menu.Item bg={"#230D37"} mt={5}>
                  <Text ta={"center"} c={"white"} fz={16}>
                    21.23
                  </Text>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu> */}
          </Group>
        </Box>
        {dataEffect.map((item: any) => {
          return (
            <Box pt={10} key={item.id}>
              <Text c={"#089A31"} fz={20} fw={"bold"}>STRENGTH ANALYSIS IMPROVEMENT</Text>
              <Box pt={10}>
                <Box
                  style={{
                    backgroundColor: "#310943",
                    borderRadius: 10,
                    padding: 20,
                    height: 300
                  }}
                >
                  <ScrollArea h={"100%"} w={"100%"}>
                    <TypeAnimation
                      sequence={[
                        item.content,
                        1000,
                      ]}
                      speed={70}
                      style={{ fontSize: '16', color: "white" }}
                    />
                  </ScrollArea>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Stack>
    </>
  );
}
