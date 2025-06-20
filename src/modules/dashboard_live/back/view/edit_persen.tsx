"use client"
import { ButtonBack } from '@/modules/_global';
import { Box, Button, Group, Modal, NumberInput, Select, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { isModalDashboardLive } from '../val/isModalDashboardLive';
import ModalEditPersen from '../components/modal_edit_persen';
import toast from 'react-simple-toasts';


/**
 * Fungsi untuk menampilkan  edit persen.
 * @param {data} data - menampilkan data.
 * @returns Untuk menampilkan  edit persen
 */
export default function EditPersen({ data }: { data: any }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalDashboardLive)

  const [dataEditPersen, setDataEditPersen] = useState(data)


  function validasiEdit() {
    if (Object.values(dataEditPersen).includes(""))
      return toast("The form cannot be empty", { theme: "dark" });
    setOpenModal(true);
  }

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

              <TextInput
                value={data?.Paslon?.nameCapres + '-' + data?.Paslon?.nameCawapres}
                label={"Paslon"}
                required
                placeholder='Paslon'
                readOnly
                disabled

              />
              <NumberInput
                value={dataEditPersen.positive}
                label={"Positive"}
                required
                placeholder='Positive'
                onChange={(val) =>
                  setDataEditPersen({
                    ...dataEditPersen,
                    positive: val
                  })
                }
              />
              <NumberInput
                value={dataEditPersen.neutral}
                label={"Neutral"}
                required
                placeholder='Neutral'
                onChange={(val) =>
                  setDataEditPersen({
                    ...dataEditPersen,
                    neutral: val
                  })
                }
              />
              <NumberInput
                value={dataEditPersen.negative}
                label={"Negative"}
                required
                placeholder='Negative'
                onChange={(val) =>
                  setDataEditPersen({
                    ...dataEditPersen,
                    negative: val
                  })
                }
              />
              <Button w={200} color='gray' onClick={validasiEdit}>Submit</Button>
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
        <ModalEditPersen data={dataEditPersen} />
      </Modal>
    </>
  );
}
