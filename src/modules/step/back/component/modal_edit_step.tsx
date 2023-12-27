import { useAtom } from 'jotai';
import React from 'react';
import { isModalStep } from '../val/modal_step';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import funUpdateStep from '../fun/update_step';
import toast from 'react-simple-toasts';
import { funLogUser } from '@/modules/user';


/**
 * Fungsi untuk menampilkan Modal Edit Step.
 * @param {dataStep} dataStep - menampilkan dataStep.
 * @param {textContent} textContent - menampilkan textContent.
 * @returns Untuk menampilkan Modal Edit Step
 */
export default function ModalEditStep({ dataStep, textContent }: { dataStep: any, textContent: any }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalStep)

  async function editStep() {
    const res = await funUpdateStep({ data: dataStep, textContent: textContent });
    if (!res.success) return toast("Failed! " + res.message, { theme: "dark" });
    await funLogUser({ act: "EDIT", desc: `User EDIT Data Step` })
    toast("Success", { theme: "dark" });
    setOpenModal(false);
}

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO EDIT THIS STEP?</Text>
          <Group justify="space-between" pt={10}>
            <Button
              radius={10}
              color="gray.7"
              w={150}
              onClick={() => setOpenModal(false)}
            >
              NO
            </Button>
            <Button
              radius={10}
              color="gray.7"
              w={150}
              onClick={() => editStep()}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}