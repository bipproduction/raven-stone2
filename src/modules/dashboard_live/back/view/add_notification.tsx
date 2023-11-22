"use client"
import { ButtonBack } from '@/modules/_global';
import { Box, Button, Grid, Group, Modal, Stack, Text, TextInput, Textarea } from '@mantine/core';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { isModalDashboardLive } from '../val/isModalDashboardLive';
import ModalAddNotification from '../components/modal_add_notification';
import { useFocusTrap } from '@mantine/hooks';
import toast from 'react-simple-toasts';

export default function AddNotification() {
  const focusTrapRef = useFocusTrap();
  const [valOpenModal, setOpenModal] = useAtom(isModalDashboardLive)
  const [dataNotif, setDataNotif] = useState({
    description: ""
  })


  function validasiAddNotif() {
    if (Object.values(dataNotif).includes(""))
      return toast("The form cannot be empty", { theme: "dark" });
    setOpenModal(true);
  }

  return (
    <>
      <Stack>
        <ButtonBack />
        <Box pt={10} ref={focusTrapRef}>
          <Group pb={10}>
            <Text fw={"bold"}>ADD DATA NOTIFICATION</Text>
          </Group>
          <Box style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20
          }}>
            <Textarea
              placeholder='Notificaton'
              label={"Notificaton"}
              required
              onChange={(val) =>
                setDataNotif({
                  ...dataNotif,
                  description: val.target.value
                })
              }
            />
            <Button mt={20} color='gray' w={200} onClick={validasiAddNotif}>Submit</Button>
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
        <ModalAddNotification isData={dataNotif} />
      </Modal>
    </>
  );
}
