"use client";
import {
  Anchor,
  Box,
  Button,
  Flex,
  Group,
  PinInput,
  Text,
} from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { isCode, isIdUser, isPhone } from "../val/val_auth";
import toast from "react-simple-toasts";
import { funSetCookies } from "../fun/set_cookies";
import { funLogUser } from "@/modules/user";
import { WARNA } from "@/modules/_global";


/**
 * Fungsi untuk menampilkan view varification.
 * @returns {component} menampilakn view varification.
 */
export default function ViewVerification() {
  const focusTrapRef = useFocusTrap()
  const router = useRouter()
  const [isOTP, setOTP] = useAtom(isCode)
  const [isValPhone, setValPhone] = useAtom(isPhone)
  const [inputOTP, setInputOTP] = useState<any>()
  const [isUser, setUser] = useAtom(isIdUser)


  async function onResend() {
    const code = Math.floor(Math.random() * 1000) + 1000
    const res = await fetch(`https://wa.wibudev.com/code?nom=${isValPhone}&text=${code}`)
      .then(
        async (res) => {
          if (res.status == 200) {
            toast('Verification code has been sent', { theme: 'dark' })
            setOTP(code)
          } else {
            toast('Error', { theme: 'dark' })
          }
        }
      );
  }

  async function getVerification() {
    if (isOTP == inputOTP) {
      const setC = await funSetCookies({ user: isUser })
      await funLogUser({ act: 'LOGIN', desc:`User login` })
      router.push('/dashboard/summary')
      toast("Verification code is correct", { theme: "dark" })
    } else {
      toast("Incorrect verification code", { theme: "dark" })
    }
  }




  return (
    <>
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
                  onChange={(val) => {
                    setInputOTP(val)
                  }}
                />
              </Group>
            </div>
            <Group justify="center">
              <Button
                mt={30}
                c={WARNA.ungu}
                bg={"white"}
                w={250}
                onClick={() => { getVerification() }}
              >
                Submit
              </Button>
            </Group>
            <Group justify="center" mt={10}>
              <Text fz={12} c="white">
                Didnt receive a code ? {""}
                <Anchor c="white"
                  onClick={() => { onResend() }}
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