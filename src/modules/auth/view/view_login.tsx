"use client"
import { ActionIcon, Box, Button, Flex, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LuShieldCheck } from "react-icons/lu"
import toast from 'react-simple-toasts';
import { funLogin } from '..';
import { funSetCookies } from '../fun/set_cookies';
import { funLogUser } from '@/modules/user';
import { WARNA } from '@/modules/_global';
import packageJson from '../../../../package.json';

/**
 * Menampilkan layout login
 * @returns komponen view login
 */

export default function ViewLogin() {
  const focusTrapRef = useFocusTrap();
  const router = useRouter()

  const [isEmail, setEmail] = useState("")
  const [isPassword, setPassword] = useState("")
  const [isLoading, setLoading] = useState(false)

  async function onLogin() {
    if (isEmail == "" || isPassword == "")
      return toast('Please fill in completely', { theme: 'dark' })

    setLoading(true)
    const cek = await funLogin({ email: isEmail, pass: isPassword })
    if (!cek.success) {
      setLoading(false)
      return toast(cek.message, { theme: 'dark' })
    }

    await funSetCookies({ user: cek.id })
    await funLogUser({ act: 'LOGIN', desc: `User login` })
    router.push('/dashboard/summary')
  }

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
                loading={isLoading}
                loaderProps={{ color: WARNA.ungu }}
                onClick={() => {
                  onLogin()
                }}
              >
                Login
              </Button>
              <Group justify="center" mt={10}>
                <Text fz={12} c="dimmed">v{packageJson.version}</Text>
              </Group>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

