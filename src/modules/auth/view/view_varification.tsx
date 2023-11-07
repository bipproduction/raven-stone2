"use client";
import { WARNA } from "@/modules/_global/fun/COLOR";
import {
  Anchor,
  Box,
  Button,
  Flex,
  Group,
  PinInput,
  Stack,
  Text,
} from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


/**
 * Fungsi untuk menampilkan view varification.
 * @returns {component} menampilakn view varification.
 */
export default function ViewVarification() {
  const focusTrapRef = useFocusTrap();
  const router = useRouter()
  return (
    <>
      {/* <Flex>
        <ButtonBack link="/" />
      </Flex> */}
      <Box
        style={{
          backgroundColor: "#000000"
        }}
      >
        <Flex
          justify={"center"}
          align={"center"}
          direction={"column"}
          h={"100vh"}
        >
          <Box
            style={{
              backgroundColor: WARNA.ungu,
              padding: 30,
              borderRadius: 10,
            }}
            w={{ base: 300, sm: 400 }}
          >
            <Group justify="center">
              <Text fw={700} fz={28} color="white">
                LOGIN
              </Text>
            </Group>
            <Group justify="center" mt={10}>
              <Text c="white">Enter Verification Code</Text>
            </Group>
            <div ref={focusTrapRef}>
              <Group justify="center" mt={30}>
                <PinInput
                // onChange={setotp} 
                />
              </Group>
            </div>
            <Group justify="center">
              <Button
                mt={30}
                c={WARNA.ungu}
                bg={"white"}
                w={250}
                // onClick={getverification}
                onClick={() => router.push("/dashboard")}
              >
                Submit
              </Button>
            </Group>
            <Group justify="center" mt={10}>
              <Text fz={12} c="white">
                Didnt receive a code ? {""}
                <Anchor c="white"
                  // onClick={sendOTP}
                  fz={12}
                >
                  Resend
                </Anchor>
              </Text>
            </Group>
          </Box>
        </Flex>
      </Box>
    </>
  );
}