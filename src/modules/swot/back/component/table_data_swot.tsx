'use client'

import { Box, Button, Center, Group, Modal, ScrollArea, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import DetailDataSwot from "./detail_data_swot";
import { useAtom } from "jotai";
import { isModalSwot } from "../val/modal_swot";
import ModalDeleteSwot from "./modal_del_swot";
import { funGetSwotByCandidate } from "../..";
import { useRouter } from "next/navigation";


/**
 * Fungsi untuk menampilkan Table Data Swot.
 * @param {data} data - menampilkan data.
 * @param {title} title - menampilkan title.
 * @param {searchParam} searchParam - menampilkan searchParam.
 * @returns Untuk menampilkan Table Data Swot
 */
export default function TableDataSwot({ title, data, searchParam }: { title: any, data: any, searchParam: any }) {
  const [openModal, setOpenModal] = useAtom(isModalSwot);
  const [dataDelete, setDataDelete] = useState(Number)
  const router = useRouter()


  const [isData, setData] = useState(data)

  async function onLoad() {
    const dataDB = await funGetSwotByCandidate({ candidate: searchParam.idCandidate })
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
            <Button bg={"gray"} onClick={() => router.push("/dashboard-admin/swot/add")}>
                ADD SWOT
              </Button>
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
                      <Table.Th>Kategori</Table.Th>
                      <Table.Th w={180}>
                        <Center>Aksi</Center>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  {isData.map((v: any, i: any) => (
                    <DetailDataSwot v={v} i={i} key={i} onClick={(val) => {
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
        <ModalDeleteSwot id={dataDelete} onSuccess={() => onLoad()} />
      </Modal>
    </>
  );
}