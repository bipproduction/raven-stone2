'use client'

import { Box, ScrollArea, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";


export default function TableDataPCT({ title, data, th }: { title: string, data: any, th: any }) {
    const [isData, setData] = useState(data)
  
    useEffect(() => {
      setData(data)
    }, [data])
  
    return (
      <>
        <Box>
          <Box
            style={{
              backgroundColor: "gray",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text fw={"bold"} c={"white"}>
              {title}
            </Text>
            <Box pt={20}>
              <Box
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <ScrollArea>
                  <Table withTableBorder horizontalSpacing="xl">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>NO</Table.Th>
                        <Table.Th>{th}</Table.Th>
                        <Table.Th>PENDIDIKAN</Table.Th>
                        <Table.Th>INFRASTRUKTUR</Table.Th>
                        <Table.Th>LAYANAN KESEHATAN</Table.Th>
                        <Table.Th>KEMISKINAN</Table.Th>
                        <Table.Th>KEADILAN SOSIAL</Table.Th>
                        <Table.Th>LAPANGAN PEKERJAAN</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {isData.map((v: any, i: any) => (
                        <Table.Tr key={i}>
                          <Table.Td>{i + 1}</Table.Td>
                          <Table.Td>{v.name}</Table.Td>
                          <Table.Td>{v.pendidikan}</Table.Td>
                          <Table.Td>{v.infrastruktur}</Table.Td>
                          <Table.Td>{v.layananKesehatan}</Table.Td>
                          <Table.Td>{v.kemiskinan}</Table.Td>
                          <Table.Td>{v.keadilanSosial}</Table.Td>
                          <Table.Td>{v.lapanganPekerjaan}</Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  }