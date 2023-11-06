"use client"
import PageSubTitle from '@/modules/_global/front/components/PageSubtitle';
import { Box, Grid, Image, ScrollArea, Select, Stack, Text } from '@mantine/core';
import React from 'react';

const data_step = [
  {
    id: 1,
    name_step: "SOCIAL",
    positive: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election",
    negative: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election"
  },
  {
    id: 2,
    name_step: "TECHNOLOGY",
    positive: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election",
    negative: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election"
  },
  {
    id: 3,
    name_step: "ECONOMY",
    positive: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election",
    negative: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election"
  },
  {
    id: 4,
    name_step: "POLITICS",
    positive: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election",
    negative: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election"
  }
]

export default function ViewStep() {
  return (
    <>
      <Stack>
        <PageSubTitle text1='STEP' text2='ASSESSMENT' />
        <Grid gutter={60}>
          <Grid.Col span={{ md: 3, lg: 3 }}>
            <Image alt='candidate' src={"/candidate/c1.png"} maw={"auto"} mx="auto" />
            <Box pt={10}>
              <Text ta={'center'} fw={'bold'} c={"white"}>PRABOWO SUBIANTO</Text>
            </Box>
            <Box pt={20}>
              <Select placeholder='Candidate'
                data={['Prabowo', 'Gibran', 'Anis', 'Ganjar', 'Mahfud MD', 'Jokowi', 'Muhaimin']}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 9, lg: 9 }}>
            {data_step.map((item) => {
              return (
                <Box key={item.id}>
                  <Box pb={20}>
                    <Text fz={30} c={"white"} fw={'bold'}>{item.name_step}</Text>
                  </Box>
                  <Grid >
                    <Grid.Col span={{ md: 6, lg: 6 }}>
                      <Text c={"#0DBF0A"} fz={20}>POSITIVE</Text>
                      <Box pt={10} pb={30}>
                        <ScrollArea h={250}>
                          <Text c={"#C1C2C5"}> {item.positive}</Text>
                        </ScrollArea>
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={{ md: 6, lg: 6 }}>
                      <Text c={"#D01234"} fz={20}>NEGATIVE</Text>
                      <Box pt={10} pb={30}>
                        <ScrollArea h={250}>
                          <Text c={"#C1C2C5"}> {item.negative}</Text>
                        </ScrollArea>
                      </Box>
                    </Grid.Col>
                  </Grid>
                </Box>
              )
            })}
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}
