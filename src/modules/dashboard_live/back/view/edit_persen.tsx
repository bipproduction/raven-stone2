"use client"
import { ButtonBack } from '@/modules/_global';
import { Box, Button, Group, Modal, NumberInput, Select, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalDashboardLive } from '../val/isModalDashboardLive';
import ModalEditPersen from '../components/modal_edit_persen';

export default function EditPersen({ data }: { data: string }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalDashboardLive)
  return (
    <>
      <Stack>
        <ButtonBack />
        <Box pt={10}>
          <Group pb={10}>
            <Text fw={"bold"}>EDIT DATA PERSEN</Text>
          </Group>
          <Box style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20
          }}>
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 2 }}
              spacing={{ base: 10, sm: 'xl' }}
              verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
              <Select label={"Paslon"} required placeholder='Paslon' disabled />
              <NumberInput label={"Positive"} required placeholder='Positive' />
              <NumberInput label={"Neutral"} required placeholder='Neutral' />
              <NumberInput label={"Negative"} required placeholder='Negative' />
              <Button w={200} color='gray' onClick={() => setOpenModal(true)}>Submit</Button>
            </SimpleGrid>
          </Box>
        </Box>
      </Stack>
      <Modal
        size={"md"}
        opened={valOpenModal}
        onClose={() => { setOpenModal(false) }}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalEditPersen />
      </Modal>
    </>
  );
}
