"use client"
import { Box, Button, Grid, Modal, Select, SimpleGrid, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React, { useState } from 'react';

import _ from 'lodash';
import funGetAllJamEmotionPaslon from '../fun/get_all_emotion_paslon';
import funDelJamEmotionPaslon from '../fun/del_emotion_paslon';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalEmotionPaslon } from '../val/modal_emotion';
import ModalDelPaslon from '../component/modal_del_paslon';

export default function ViewDeleteEmotion({ paslon, }: { paslon: any }) {
  const [valOpenModalPaslon, setOpenModalPaslon] = useAtom(isModalEmotionPaslon)
  const [dataPaslon, setDataPaslon] = useState(paslon)
  const [isPaslon, setPaslon] = useState()
  const [date, setDate] = useState()
  const [allData, setAllData] = useState<any>()
  const [isJam, setIsJam] = useState<any>([])
  const [valueJam, setValueJam] = useState()

  async function dataValue(val: any) {
    setDate(val)
    const data = await funGetAllJamEmotionPaslon({ paslon: isPaslon, date: val })
    // console.log(data)
    setAllData(data)
    setIsJam(data)
  }
  console.log({ date, isPaslon })
  // console.log(allData)

  async function delData() {
    const del = await funDelJamEmotionPaslon({ paslon: isPaslon, date: date, time: valueJam })
    toast("Success", { theme: "dark" });
  }

  function validasiUser() {
    setOpenModalPaslon(true);
  }
  return (
    <>

      <Stack pt={10}>
        <Grid gutter={50}>
          <Grid.Col span={{ md: 6, lg: 6 }}>
            <Box style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10
            }}>
              <Text mb={20} ta={"center"} fw={"bold"}>DELETE EMOTION PASLON</Text>
              <SimpleGrid
                cols={{ base: 1, sm: 1, lg: 1 }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
              >
                <Select
                  placeholder="Pilih Paslon"
                  data={dataPaslon.map((can: any) => ({
                    value: String(can.id),
                    label: can.name
                  }))}
                  required
                  value={isPaslon}
                  label={"Paslon"}
                  searchable
                  onChange={(val: any) => { setPaslon(val) }}
                />
                <DateInput
                  valueFormat="DD-MM-YYYY"
                  required
                  value={date}
                  label={"Tanggal"}
                  placeholder="Pilih Tanggal"
                  onChange={(val: any) => {
                    dataValue(val)
                  }}
                />
                <Select
                  data={isJam.map((can: any) => ({
                    value: String(can.timeEmotion),
                    label: can.timeEmotion
                  }))}
                  // value={dataJam}
                  onChange={(val: any) => setValueJam(val)}
                  placeholder='Pilih Jam'
                  mt={10}
                />
                <Button color={"red"} onClick={validasiUser}>DELETE</Button>
              </SimpleGrid>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 6, lg: 6 }}>
            <Box style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10
            }}>
              <Text mb={20} ta={"center"} fw={"bold"}>DELETE EMOTION CANDIDATE</Text>
              <SimpleGrid
                cols={{ base: 1, sm: 1, lg: 1 }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
              >
                <Select
                  placeholder="Pilih Candidate"
                  // data={dataPaslon.map((can: any) => ({
                  //   value: String(can.id),
                  //   label: can.name
                  // }))}
                  required
                  // value={isPaslon}
                  label={"Candidate"}
                  searchable
                // onChange={(val) => { setPaslon(val) }}
                />
                <DateInput
                  valueFormat="DD-MM-YYYY"
                  required
                  // value={isDate}
                  label={"Tanggal"}
                  placeholder="Pilih Tanggal"
                // onChange={(val) => { setDate(val) }} 
                />
                <Select
                  // data={datajam.map((can: any) => ({
                  //   value: String(can.timeEmotion),
                  //   label: can.timeEmotion
                  // }))}
                  // value={isJam}
                  // onChange={(val) => getLoad(val)}
                  placeholder='Pilih Jam'
                  mt={10}
                />
                <Button color={"red"}>DELETE</Button>
              </SimpleGrid>
            </Box>
          </Grid.Col>
        </Grid>

      </Stack>

      <Modal
        size={"md"}
        opened={valOpenModalPaslon}
        onClose={() => setOpenModalPaslon(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalDelPaslon isPaslon={isPaslon} date={date} valueJam={valueJam} />
      </Modal>
    </>
  );
}