import React, { useState } from 'react';
import funDelJamEmotionPaslon from '../fun/del_emotion_paslon';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalEmotionPaslon } from '../val/modal_emotion';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { funLogUser } from '@/modules/user';

export default function ModalDelPaslon({ isPaslon, date, valueJam, onSuccess }: { isPaslon: any, date: any, valueJam: any, onSuccess: (val: any) => void }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalEmotionPaslon)
  const [isLoading, setLoading] = useState(false)

  async function delData() {
    setLoading(true)
    await funDelJamEmotionPaslon({ paslon: isPaslon, date: date, time: valueJam })
    await funLogUser({ act: 'DELETE', desc: `User Delete Data Emotion Paslon (Paslon ID: ${isPaslon}), ${date} ${valueJam}` })
    setLoading(false)
    onSuccess(true)
    toast("Success", { theme: "dark" });
    setOpenModal(false)
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>
            ANDA YAKIN INGIN DELETE DATA EMOTION PASLON?
          </Text>
          <Group justify="space-between" pt={10}>
            <Button
              radius={10}
              color="gray.7"
              w={150}
              onClick={() => setOpenModal(false)}
            >
              NO
            </Button>
            <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => delData()}>
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}
