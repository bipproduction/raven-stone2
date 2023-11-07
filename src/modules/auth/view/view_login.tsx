"use client"
import { WARNA } from '@/modules/_global/fun/COLOR';
import { ActionIcon, Box, Button, Flex, Group, Text, TextInput } from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LuShieldCheck } from "react-icons/lu"

/**
 * Fungsi untuk menampilkan view login.
 * @returns {component} menampilakn view login.
 */
export default function ViewLogin() {
  const focusTrapRef = useFocusTrap();
  const router = useRouter()
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
              // onChange={(val) => setInpTlp(val.target.value)} 
              />
              <TextInput placeholder="Password" mt={30}
              // onChange={(val) => setInpTlp(val.target.value)} 
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
                // onClick={() => {
                //   sendOTP()
                // }}
                onClick={() => router.push("/varification")}
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

