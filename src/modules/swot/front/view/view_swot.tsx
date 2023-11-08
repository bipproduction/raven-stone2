"use client"
import PageSubTitle from '@/modules/_global/front/components/PageSubtitle';
import { Box, Grid, Image, ScrollArea, Select, Stack, Text } from '@mantine/core';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
const data_swot = [
  {
    id: 1,
    name_swot: "STRENGTH",
    desc: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election"
  },
  {
    id: 2,
    name_swot: "WEAKNESS",
    desc: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election"
  },
  {
    id: 3,
    name_swot: "OPPORTUNITY",
    desc: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election"
  },
  {
    id: 4,
    name_swot: "THREAT",
    desc: "Some of the criticism directed at Prabowo Subianto relates to his past as a military officer, including accusations of his involvement in human rights violations in 1998. He was also tried for alleged involvement in the kidnapping and torture of activists in 1998. Many other opinions also claim Prabowo Subianto is often in a hurry and emotional. This was demonstrated by the way he campaigned in the past and his unilateral declaration of victory in the 2019 presidential election"
  }
]

export default function ViewSwot() {
  return (
    <>
      <Stack>
        <PageSubTitle text1='SWOT' text2='EVALUATION' />
        <Grid gutter={60}>
          <Grid.Col span={{ md: 3, lg: 3 }} >
            <Box>
              <Image alt='candidate' src={"/candidate/c1.png"} maw={"auto"} mx="auto" />
              <Box pt={10}>
                <Text ta={'center'} fw={'bold'} c={"white"}>PRABOWO SUBIANTO</Text>
              </Box>
              <Box pt={20}>
                <Select placeholder='Candidate'
                  data={['Prabowo', 'Gibran', 'Anis', 'Ganjar', 'Mahfud MD', 'Jokowi', 'Muhaimin']}
                />
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 9, lg: 9 }}>
          <ScrollArea h={700}>
            {data_swot.map((item) => {
              return (
                <Box key={item.id}>
                  <Text fz={24} c={"#089A31"}>{item.name_swot}</Text>
                  <ScrollArea h={200}>
                  <TypeAnimation
                    sequence={[
                      item.desc,
                      1000,
                    ]}
                    speed={70}
                    style={{ fontSize: '16', color: "white" }}
                  />
                  </ScrollArea>
                </Box>
              )
            })}
          </ScrollArea>
            {/* {data_swot == undefined ? (
                      <Stack>
                        <Text>...</Text>
                      </Stack>
                    ) : (
                      <Trs text={text} lang={lang}>
                        {(val: any) => (
                          <>
                            {val && (
                              <TextAnimation
                                phrases={[val]}
                                typingSpeed={10}
                                backspaceDelay={500}
                                eraseDelay={0}
                                errorProbability={0.1}
                                eraseOnComplete={false}
                              />
                            )}
                          </>
                        )}
                      </Trs>
                    )} */}
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}

