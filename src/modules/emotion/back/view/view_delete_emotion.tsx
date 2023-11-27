"use client"
import { Box, Button, Grid, Modal, Select, SimpleGrid, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React, { useState } from 'react';

import _ from 'lodash';
import funGetAllJamEmotionPaslon from '../fun/get_all_emotion_paslon';
import funDelJamEmotionPaslon from '../fun/del_emotion_paslon';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalEmotionCandidate, isModalEmotionPaslon } from '../val/modal_emotion';
import ModalDelPaslon from '../component/modal_del_paslon';
import funGetAllJamEmotionCandidate from '../fun/get_all_emotion_candidate';
import ModalDelCandidate from '../component/modal_del_candidate';

export default function ViewDeleteEmotion({ paslon, candidate }: { paslon: any, candidate: any }) {

  // CANDIDATE
  const [valOpenModalCandidate, setOpenModalCandidate] = useAtom(isModalEmotionCandidate)
  const [dataCandidate, setDataCandidate] = useState(candidate)
  const [isCandidate, setCandidate] = useState<any>()
  const [isDateCan, setIsDateCan] = useState<any>()
  const [isJamCan, setIsJamCan] = useState<any>([])
  const [valueJamCan, setValueJamCan] = useState<any>()


  async function dataValueCan(val: any) {
    if (_.isUndefined(isCandidate) || _.isNull(isCandidate)) {
      setIsDateCan(null)
      toast("Silahkan pilih kandidat terlebih dahulu", { theme: "dark" })
    } else {
      setIsDateCan(val)
      const data = await funGetAllJamEmotionCandidate({ candidate: isCandidate, dateCan: val })
      setIsJamCan(data)
    }
  }

  function chooseCandidate(val: any) {
    setCandidate(val)
    setIsDateCan(null)
    setIsJamCan([])
    setValueJamCan(null)
  }

  function validasiUserCan() {
    setOpenModalCandidate(true);
  }


  // PASLON
  const [valOpenModalPaslon, setOpenModalPaslon] = useAtom(isModalEmotionPaslon)
  const [dataPaslon, setDataPaslon] = useState(paslon)
  const [isPaslon, setPaslon] = useState()
  const [date, setDate] = useState()
  const [isJam, setIsJam] = useState<any>([])
  const [valueJam, setValueJam] = useState()

  async function dataValue(val: any) {
    setDate(val)
    const data = await funGetAllJamEmotionPaslon({ paslon: isPaslon, date: val })
    setIsJam(data)
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
                  label="Jam"
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
                  data={dataCandidate.map((can: any) => ({
                    value: String(can.id),
                    label: can.name
                  }))}
                  required
                  value={isCandidate}
                  label={"Candidate"}
                  searchable
                  onChange={(val: any) => { chooseCandidate(val) }}
                />
                <DateInput
                  valueFormat="DD-MM-YYYY"
                  required
                  value={isDateCan}
                  label={"Tanggal"}
                  placeholder="Pilih Tanggal"
                  onChange={(val: any) => { dataValueCan(val) }}
                />
                <Select
                  label="Jam"
                  data={isJamCan.map((can: any) => ({
                    value: String(can.timeEmotion),
                    label: can.timeEmotion
                  }))}
                  value={valueJamCan}
                  onChange={(val: any) => setValueJamCan(val)}
                  placeholder='Pilih Jam'
                  mt={10}
                />
                <Button color={"red"} onClick={validasiUserCan}>DELETE</Button>
              </SimpleGrid>
            </Box>
          </Grid.Col>
        </Grid>

      </Stack>

      {/* MODAL PASLON */}
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


      {/* MODAL CANDIDATE */}
      <Modal
        size={"md"}
        opened={valOpenModalCandidate}
        onClose={() => setOpenModalCandidate(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalDelCandidate isCandidate={isCandidate} isDateCan={isDateCan} valueJamCan={valueJamCan} onSuccess={() => {
          setValueJamCan(null)
          setCandidate(null)
          setIsDateCan(null)
          setIsJamCan([])
        }} />
      </Modal>
    </>
  );
}