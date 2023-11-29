'use client'
import { Box, Group, Text } from "@mantine/core"
import { useRouter } from "next/navigation"
import { BiArrowBack } from "react-icons/bi"

/**
 * Menampilkan button back,
 * yg jika diklik maka akan ke link tujuan / kembali
 * @param to link tujuan back
 * @returns komponen button back
 */

export default function ButtonBack({ to }: { to?: string }) {
    const router = useRouter()

    // fungsi untuk mendeteksi adakah variable to
    function toPage() {
        if (to === undefined) {
            // jika variable to undefined, maka akan diarahkan ke halaman sebelumnya
            router.back()
        } else {
            // selain itu maka akan diarahkan ke halaman variable to
            router.push(to)
        }
    }
    return (
        <>
            <Group>
                <Box onClick={toPage} style={{ textDecoration: "none" }}>
                    <Group style={{ cursor: "pointer" }}>
                        <BiArrowBack size="20" />
                        <Text fz={15} fw={700} color="dark.9">
                            Kembali
                        </Text>
                    </Group>
                </Box>
            </Group>
        </>
    )
}