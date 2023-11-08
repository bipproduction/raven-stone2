"use client"
import { WARNA } from '@/modules/_global/fun/COLOR';
import { ActionIcon, Box, Button, Flex, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LuShieldCheck } from "react-icons/lu"
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isCode, isIdUser, isPhone } from '../val/val_auth';
import { ViewVerification, funLogin } from '..';

/**
 * Fungsi untuk menampilkan view login.
 * @returns {component} menampilakn view login.
 */


export default function ViewLogin() {
  const focusTrapRef = useFocusTrap();
  const router = useRouter()

  const [isEmail, setEmail] = useState("")
  const [isPassword, setPassword] = useState("")
  const [isOTP, setOTP] = useAtom(isCode)
  const [isValPhone, setValPhone] = useAtom(isPhone)
  const [isUser, setUser] = useAtom(isIdUser)
  const [isVerif, setVerif] = useState(false)

  async function onLogin() {
    if (isEmail == "" || isPassword == "")
      return toast('Please fill in completely', { theme: 'dark' })
    const cek = await funLogin({ email: isEmail, pass: isPassword })
    if (!cek.success)
      return toast(cek.message, { theme: 'dark' })
    const code = Math.floor(Math.random() * 1000) + 1000

    const res = await fetch(`https://wa.wibudev.com/code?nom=${cek.phone}&text=${code}`)
      .then(
        async (res) => {
          if (res.status == 200) {
            toast('Verification code has been sent', { theme: 'dark' })
            setValPhone(cek.phone)
            setOTP(code)
            setUser(cek.id)
            setVerif(true)
          } else {
            toast('Error', { theme: 'dark' })
          }
        }
      );
  }

  if (isVerif) return <ViewVerification />

  return (
    <>
      <Box
        style={{
          backgroundColor: "#000000"
        }}
      >
        <Box ref={focusTrapRef}>
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
                borderRadius: 10
              }}
              w={{ base: 300, sm: 400 }}
            >
              <Group justify="center">
                <Text fw={700} fz={28} c="white">
                  LOGIN
                </Text>
              </Group>
              <TextInput placeholder="Email" mt={30}
                onChange={(val) => setEmail(val.target.value)}
              />
              <PasswordInput placeholder="Password" mt={30}
                onChange={(val) => setPassword(val.target.value)}
              />
              <Group pt={10} justify='space-between'>
                <Group>
                  <ActionIcon variant="subtle" color="#2F9E44" size="xl">
                    <LuShieldCheck size={20} />
                  </ActionIcon>
                  <Text c={"#2F9E44"}>Secure Access</Text>
                </Group>
                <Text c={"#2F9E44"}>Secure Access</Text>
              </Group>
              <Button
                mt={10}
                c={WARNA.ungu}
                bg={"white"}
                fullWidth

                onClick={() => {
                  onLogin()
                }}
              >
                Login
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

