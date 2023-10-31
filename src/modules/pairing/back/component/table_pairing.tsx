'use client'

import { Box, Table } from "@mantine/core";

const data = [
    {
      id: 1,
      candidate1: "I Wayan Adi",
      candidate2: "I Komang Ayu",
      Confidence: 22221,
      Kabupaten: 12123,
      Supportive: 12121,
    },
    {
      id: 2,
      candidate1: "I Wayan Adi",
      candidate2: "I Komang Ayu",
      Confidence: 22221,
      Kabupaten: 12123,
      Supportive: 12121,
    },
    {
      id: 3,
      candidate1: "I Wayan Adi",
      candidate2: "I Komang Ayu",
      Confidence: 22221,
      Kabupaten: 12123,
      Supportive: 12121,
    },
    {
      id: 4,
      candidate1: "I Wayan Adi",
      candidate2: "I Komang Ayu",
      Confidence: 22221,
      Kabupaten: 12123,
      Supportive: 12121,
    },
    {
      id: 5,
      candidate1: "I Wayan Adi",
      candidate2: "I Komang Ayu",
      Confidence: 22221,
      Kabupaten: 12123,
      Supportive: 12121,
    },
    {
      id: 6,
      candidate1: "I Wayan Adi",
      candidate2: "I Komang Ayu",
      Confidence: 22221,
      Kabupaten: 12123,
      Supportive: 12121,
    },
    {
      id: 7,
      candidate1: "I Wayan Adi",
      candidate2: "I Komang Ayu",
      Confidence: 22221,
      Kabupaten: 12123,
      Supportive: 12121,
    },
    {
      id: 8,
      candidate1: "I Wayan Adi",
      candidate2: "I Komang Ayu",
      Confidence: 22221,
      Kabupaten: 12123,
      Supportive: 12121,
    },
    {
      id: 9,
      candidate1: "I Wayan Adi",
      candidate2: "I Komang Ayu",
      Confidence: 22221,
      Kabupaten: 12123,
      Supportive: 12121,
    },
    {
      id: 10,
      candidate1: "I Wayan Adi",
      candidate2: "I Komang Ayu",
      Confidence: 22221,
      Kabupaten: 12123,
      Supportive: 12121,
    },
  ];
  /**
   * Fungsi menampilkan halaman table data pairing.
   * @returns  Hasil dari table data pairing untuk menampilkan data table
   */
  export default function TableDataPairing() {
    return (
      <>
        <Box
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: "5px",
          }}
        >
          <Table withTableBorder horizontalSpacing="xl">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>KANDIDAT 1</Table.Th>
                <Table.Th>KANDIDAT 2</Table.Th>
                <Table.Th>KABUPATEN ID</Table.Th>
                <Table.Th>CONFIDENCE</Table.Th>
                <Table.Th>SUPPORTIVE</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((v, i) => (
                <Table.Tr key={i}>
                  <Table.Td>{v.id}</Table.Td>
                  <Table.Td>{v.candidate1}</Table.Td>
                  <Table.Td>{v.candidate2}</Table.Td>
                  <Table.Td>{v.Kabupaten}</Table.Td>
                  <Table.Td>{v.Confidence}</Table.Td>
                  <Table.Td>{v.Supportive}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
      </>
    );
  }