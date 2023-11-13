'use client'

import { Box, Button, Center, Group, Modal, ScrollArea, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import DetailDataStep from "./detail_data_step";
import ModalDeleteStep from "./modal_del_step";
import { useAtom } from "jotai";
import { isModalStep } from "../val/modal_step";
import { funGetStepByCandidate } from "../..";

export default function TableDataStep({ title, data, searchParam }: { title: any, data: any, searchParam: any }) {
  const [openModal, setOpenModal] = useAtom(isModalStep);
  const [dataDelete, setDataDelete] = useState(Number)

  const [isData, setData] = useState(data)

  async function onLoad() {
    const dataDB = await funGetStepByCandidate({ candidate: searchParam.idCandidate })
    setData(dataDB.data)
  }

  useEffect(() => {
    setData(data)
  }, [data])

  return (
    <>
      <Box mt={30}>
        <Box
          style={{
            backgroundColor: "gray",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Group justify="space-between" gap="lg">
            <Text fw={"bold"} c={"white"}>
              {title}
            </Text>
            {/* <Button bg={"gray"} onClick={() => router.push("step/add?prov=" + searchParams.get('prov') + '&city=' + searchParams.get('city'))}>
                TAMBAH STEP
              </Button> */}
          </Group>
          <Box pt={20}>
            <Box
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <ScrollArea>
                <Table
                  withTableBorder
                  withRowBorders={false}
                  horizontalSpacing="xl"
                >
                  <Table.Thead>
                    <Table.Tr
                      style={{
                        borderBottom: "1px solid #CED4D9",
                      }}
                    >
                      <Table.Th>No</Table.Th>
                      {/* <Table.Th w={200}>Kandidat</Table.Th> */}
                      <Table.Th>Kategori</Table.Th>
                      <Table.Th>Sentiment</Table.Th>
                      <Table.Th>
                        <Center>Aksi</Center>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  {isData.map((v: any, i: any) => (
                    <DetailDataStep v={v} i={i} key={i} onClick={(val) => {
                      setDataDelete(val)
                      setOpenModal(true)
                    }} />
                  ))}
                </Table>
              </ScrollArea>
            </Box>
          </Box>
        </Box>
      </Box>

      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalDeleteStep id={dataDelete} onSuccess={() => onLoad()} />
      </Modal>
    </>
  );
}