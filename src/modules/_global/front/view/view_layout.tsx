"use client"
import React, { useState } from 'react';
import { useDisclosure, useShallowEffect } from '@mantine/hooks';
import { AppShell, BackgroundImage, Box, Burger, Center, Divider, Grid, Group, Image, Modal, NavLink, Skeleton, Text, Title } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { WARNA } from '../../fun/COLOR';
import { funLogUser } from '@/modules/user';
import { funLogout } from '@/modules/auth';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalLayoutUser } from '../val/isModalLayoutUser';
import ModalLogoutUser from '../components/modal_logout_user';

const dataFront = [
  {
    key: "0",
    link: "/dashboard/",
    label: "LIVE DASHBOARD",
  },
  {
    key: "1",
    link: "/dashboard/summary",
    label: "SUMMARY"
  },
  {
    key: "2",
    link: "/dashboard/national-popularity-metric",
    label: "NATIONAL POPULARITY METRIC"
  },
  {
    key: "3",
    link: "/dashboard/regional-insights",
    label: "REGIONAL INSIGHTS"
  },
  {
    key: "4",
    link: "/dashboard/regional-data-pairing",
    label: "REGIONAL DATA PAIRING"
  },
  {
    key: "5",
    link: "/dashboard/swot",
    label: "SWOT EVALUATION"
  },
  {
    key: "6",
    link: "/dashboard/step",
    label: "STEP ASSESSMENT"
  },
  {
    key: "7",
    link: "/dashboard/ml-ai",
    label: "ML-AI"
  },
  {
    key: "8",
    link: "/dashboard/jokowi-effect",
    label: "JOKOWI EFFECT"
  },
]

const settingName = [
  {
    key: "8",
    label: "SETTING",
    label2: "LOGOUT"
  }
]


/**
 * Fungsi untuk menampilkan layout dashboard.
 * @returns {component} menampilakn layout dashboard.
 */
export default function ViewLayout({ children }: { children: React.ReactNode }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalLayoutUser)
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState("");

  useShallowEffect(() => {
    setActive(pathname);
  });




  return (
    <>
      <AppShell
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"

      >
        <AppShell.Navbar bg={"#1E1B1C"} style={{
          border: "none",
        }}>
          <BackgroundImage src="/raven.png" h={"100%"} style={{
            backgroundPosition: "30%",
            backgroundRepeat: "no-repeat",
          }}>
            <Box
              w={"100%"}
              h={"100vh"}
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(139, 212, 160, 0) 15%, #231F24 70%)",
              }}
              pos={"absolute"}
            >
              {dataFront.map((item) => {
                return (
                  <Box key={item.key} m={"xs"}>
                    <NavLink
                      active
                      label={active === item.link ? (
                        <Box>
                          <Title order={5} onClick={() => router.push(item.link)}>
                            {item.label}
                          </Title>
                          <Grid pt={5}>
                            <Grid.Col span={3}>
                              <Divider color="red.9" size="lg" />
                            </Grid.Col>
                          </Grid>
                        </Box>
                      ) : (
                        <Box>
                          <Text onClick={() => router.push(item.link)}>
                            {item.label}
                          </Text>

                        </Box>
                      )
                      }
                      onClick={() => {
                        router.push(item.link);
                      }}
                      c={item.label ? "white" : "dark"}
                      variant="subtle"
                    />
                  </Box>
                )
              })}
              <AppShell.Section >
                {/* {settingName.map((item) => {
                  return ( */}
                <Box key="8" m={'xs'}>
                  <NavLink
                    label={<Text>SETTING</Text>}
                    childrenOffset={28}
                    c={'SETTING' ? "white" : "dark"}
                    variant="subtle"
                    active
                    style={{
                      position: "absolute",
                      bottom: 160,
                      left: 0,
                    }}
                  >
                    <NavLink
                      label={<Text>LOGOUT</Text>}
                      c={'SETTING' ? "white" : "dark"}
                      variant="subtle"
                      active
                      style={{
                        position: "absolute",
                        bottom: 120,
                        left: 0,
                      }}
                      pl={50}
                      onClick={() => { setOpenModal(true) }}
                    />
                  </NavLink>
                </Box>
                {/* )
                })} */}
              </AppShell.Section>
            </Box>
          </BackgroundImage>
          <Box
            style={{
              position: "absolute",
              bottom: 40,
            }}
          >
            <Center pl={20} pr={20}>
              <Image src={"/raven1.png"} maw={200} mx="auto" alt="logo" />
            </Center>
          </Box>
        </AppShell.Navbar>
        <AppShell.Main bg={WARNA.bgGradasi}>
          <Box p={20}>
            {children}
          </Box>
        </AppShell.Main>
      </AppShell>
      <Modal
        opened={valOpenModal}
        onClose={() => setOpenModal(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalLogoutUser/>
      </Modal>
    </>
  );
}

