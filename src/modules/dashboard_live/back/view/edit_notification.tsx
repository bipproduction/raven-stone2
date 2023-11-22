"use client"
import { ButtonBack } from '@/modules/_global';
import { Box, Button, Group, Modal, Stack, Text, Textarea } from '@mantine/core';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { isModalDashboardLive } from '../val/isModalDashboardLive';
import ModalEditNotification from '../components/modal_edit_notification';
import toast from 'react-simple-toasts';

export default function EditNotification({ data }: { data: any }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalDashboardLive)

  const [dataEditNotif, setDataEditNotif] = useState(data)

  function validasiEdit() {
    if (Object.values(dataEditNotif).includes(""))
      return toast("The form cannot be empty", { theme: "dark" });
    setOpenModal(true);
  }

  return (
    <>
      <Stack>
        <ButtonBack />
        <Box pt={10}>
          <Group pb={10}>
            <Text fw={"bold"}>EDIT DATA NOTIFICATION</Text>
          </Group>
          <Box style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20
          }}>
            <Textarea
              value={dataEditNotif.description}
              placeholder='Notificaton'
              label={"Notificaton"}
              required
              onChange={(val) =>
                setDataEditNotif({
                  ...dataEditNotif,
                  description: val.target.value
                })
              }
            />
            <Button mt={20} color='gray' w={200} onClick={validasiEdit}>Submit</Button>
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
        <ModalEditNotification data={dataEditNotif} />
      </Modal>
    </>
  );
}