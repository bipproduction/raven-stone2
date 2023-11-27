import { Alert, Box, Button, Group, Text } from '@mantine/core';
import React, { useState } from 'react';
import { isModalEmotionCandidate } from '../val/modal_emotion';
import { useAtom } from 'jotai';
import toast from 'react-simple-toasts';
import funDelJamEmotionCandidate from '../fun/del_emotion_candidate';
import { funLogUser } from '@/modules/user';

export default function ModalDelCandidate({ isCandidate, isDateCan, valueJamCan, onSuccess }: { isCandidate: any, isDateCan: any, valueJamCan: any, onSuccess: (val: any) => void }) {
    const [valOpenModal, setOpenModal] = useAtom(isModalEmotionCandidate)
    const [isLoading, setLoading] = useState(false)

    async function delDataCan() {
        setLoading(true)
        await funDelJamEmotionCandidate({ candidate: isCandidate, dateCan: isDateCan, timeCan: valueJamCan })
        await funLogUser({ act: 'DELETE', desc: `User Delete Data Emotion Candidate (Candidate ID: ${isCandidate}), ${isDateCan} ${valueJamCan}` })
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
                        ANDA YAKIN INGIN MENGHAPUS DATA EMOTION CANDIDATE?
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
                        <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => delDataCan()}>
                            YES
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    );
}
