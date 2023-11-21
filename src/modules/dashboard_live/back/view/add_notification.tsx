"use client"
import { ButtonBack } from '@/modules/_global';
import { Box, Button, Grid, Group, Modal, Stack, Text, TextInput, Textarea } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalDashboardLive } from '../val/isModalDashboardLive';
import ModalAddNotification from '../components/modal_add_notification';

export default function AddNotification() {
  const [valOpenModal, setOpenModal] = useAtom(isModalDashboardLive)
  return (
    <>
      <Stack>
        <ButtonBack />
        <Box pt={10}>
          <Group pb={10}>
            <Text fw={"bold"}>ADD DATA NOTIFICATION</Text>
          </Group>
          <Box style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20
          }}>
            <Textarea placeholder='Notificaton' label={"Notificaton"} required />
            <Button mt={20} color='gray' w={200} onClick={() => setOpenModal(true)}>Submit</Button>
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
        <ModalAddNotification />
      </Modal>
    </>
  );
}
