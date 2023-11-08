"use client"
import PageSubTitle from '@/modules/_global/front/components/PageSubtitle';
import { ActionIcon, Box, Button, Grid, Group, Image, Menu, ScrollArea, Select, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React from 'react';
import { HiDotsHorizontal } from "react-icons/hi"
import { TypeAnimation } from 'react-type-animation';

const data_ml = [
    {
        id: 1,
        desc: "Here are some suggestions that can be done to improve strength in Strength analysis: Prabowo Subianto is expected to be able to highlight a firm personal character in responding to various important issues today. Especially in relation to national defense. Prabowo Subianto can take a role in international issues by participating in policies. Such as how to respond and take a stance with the countries in the BRICS alliance, namely Brazil, Russia, India, China and the United States of Africa which are in the process of creating a new currency. This is very important, Indonesia's involvement in participating in the international economic recession. Prabowo Subianto is a figure with a fierce and firm persona. When carrying out activities other than politics, activities that seem relaxed can be published. Here are some suggestions that can be done to improve strength in Strength analysis. Prabowo Subianto is expected to be able to highlight a firm personal character in responding to various important issues today. Especially in relation to national defense. Prabowo Subianto can take a role in international issues by participating in policies. Such as how to respond and take a stance with the countries in the BRICS alliance, namely Brazil, Russia, India, China and the United States of Africa which are in the process of creating a new currency. This is very important, Indonesia's involvement in participating in the international economic recession. Prabowo Subianto is a figure with a fierce and firm persona. When carrying out activities other than politics, activities that seem relaxed can be published."
    }
]

export default function ViewMlAi() {
    return (
        <>
            <Stack>
                <PageSubTitle text1='ML-AI' text2='PROMPT RECOMENDATIONS' />
                <Grid gutter={60}>
                    <Grid.Col span={{ md: 3, lg: 3 }}>
                        <Box>
                            <Image alt='candidate' src={"/candidate/c1.png"} maw={"auto"} mx="auto" />
                            <Box pt={10}>
                                <Text ta={'center'} fw={'bold'} c={"white"}>PRABOWO SUBIANTO</Text>
                            </Box>
                        </Box>
                        <Box pt={20}>
                            <Image alt='candidate' src={"/candidate/c2.png"} maw={"auto"} mx="auto" />
                            <Box pt={10}>
                                <Text ta={'center'} fw={'bold'} c={"white"}>GIBRAN RAKABUMING</Text>
                            </Box>
                        </Box>
                        <Box pt={20}>
                            <Select placeholder='Candidate'
                                data={['Prabowo', 'Gibran', 'Anis', 'Ganjar', 'Mahfud MD', 'Jokowi', 'Muhaimin']}
                            />
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={{ md: 9, lg: 9 }}>
                        <Box>
                            <Group>
                                <DateInput
                                    variant="filled"
                                    placeholder="SELECT DATE"
                                />
                                <Button variant='subtle' c={"white"}>10.30</Button>
                                <Button variant='subtle' c={"white"}>12.30</Button>
                                <Button variant='subtle' c={"white"}>13.30</Button>
                                <Button variant='subtle' c={"white"}>15.30</Button>
                                <Button variant='subtle' c={"white"}>15.30</Button>
                                <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                        <ActionIcon variant="subtle" color="rgba(255, 255, 255, 1)" aria-label="Settings">
                                            <HiDotsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown bg={"#230D37"}>
                                        <Menu.Item bg={"#230D37"}>
                                            <Button variant='subtle' fullWidth c={"white"}>16.30</Button>
                                        </Menu.Item>
                                        <Menu.Item bg={"#230D37"}>
                                            <Button variant='subtle' fullWidth c={"white"}>17.30</Button>
                                        </Menu.Item>
                                        <Menu.Item bg={"#230D37"}>
                                            <Button variant='subtle' fullWidth c={"white"}>18.30</Button>
                                        </Menu.Item>
                                        <Menu.Item bg={"#230D37"}>
                                            <Button variant='subtle' fullWidth c={"white"}>19.30</Button>
                                        </Menu.Item>
                                        <Menu.Item bg={"#230D37"}>
                                            <Button variant='subtle' fullWidth c={"white"}>20.30</Button>
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        </Box>
                        {data_ml.map((item) => {
                            return (
                                <Box pt={20} key={item.id}>
                                    <Text c={"#089A31"} fz={20} fw={"bold"}>STRENGTH ANALYSIS IMPROVEMENT</Text>
                                    <Box pt={10}>
                                        <ScrollArea h={"100%"} w={"100%"}>
                                            <TypeAnimation
                                                sequence={[
                                                   item.desc,
                                                    1000,
                                                ]}
                                                speed={70}
                                                style={{ fontSize: '16', color: "white" }}
                                                // repeat={Infinity}
                                            />
                                            {/* <Text c={"#C1C2C5"} >{item.desc}</Text> */}
                                        </ScrollArea>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Grid.Col>
                </Grid>
            </Stack>
        </>
    );
}
