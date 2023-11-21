"use client"
import React, { useEffect, useState } from 'react';
import { useDisclosure, useShallowEffect } from '@mantine/hooks';
import { ActionIcon, AppShell, AppShellNavbar, AppShellSection, BackgroundImage, Box, Burger, Center, Divider, Grid, Group, Image, Modal, NavLink, Skeleton, Stack, Text, Title, Tooltip } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { useAtom, useAtomValue } from 'jotai';
import { isModalLayoutUser, sNavbarSmall } from '../val/isModalLayoutUser';
import ModalLogoutUser from '../components/modal_logout_user';
import { WARNA } from '../..';
import { isModalGlobalCoba } from '@/modules/coba_layout/val/iisGlobalCoba';
import { AiOutlineClose } from 'react-icons/ai';
import { MdArrowForwardIos, MdFreeCancellation, MdGrading, MdHub, MdJoinLeft, MdLiveHelp, MdLiveTv, MdOutlineStarBorderPurple500, MdOutlineStars, MdStorage, MdVerifiedUser } from 'react-icons/md';
import { DataFrontMobile } from '../components/data_mobile';
import { DataFrontNav } from '../components/data_navbar';
import { funLogUser } from '@/modules/user';
import { funLogout } from '@/modules/auth';


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
  const [activemobile, setActivemobile] = useState("");
  const [isSmall, setIsSmall] = useAtom(sNavbarSmall)
  const [isOpenCoba, setOpenCoba] = useState(true);
  const [isNavOpt, setNavOpt] = useState({ width: 300, breakpoint: 'sm', collapsed: { mobile: isOpenCoba } })

  useShallowEffect(() => {
    setActive(pathname);
    setActivemobile(pathname)
  });

  return (
    <>
      <AppShell
        navbar={isNavOpt}
        padding="md"

      >
        {isOpenCoba &&
          (
            <AppShell.Navbar bg={"#1E1B1C"} style={{
              border: "none",
            }}
              w={300}
            >
              <BackgroundImage src="/raven_bg.png" h={"100%"} style={{
                backgroundPosition: "30%",
                backgroundRepeat: "no-repeat",
              }}>
                {/* <Box
                  w={"100%"}
                  h={"100vh"}
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(139, 212, 160, 0) 15%, #231F24 70%)",
                  }}
                  pos={"absolute"}
                > */}
                <Group justify="flex-end" pr={20} pt={30}>
                  <ActionIcon onClick={() => {
                    setNavOpt({ width: 100, breakpoint: 'sm', collapsed: { mobile: isOpenCoba } })
                    setOpenCoba(false)
                  }} variant='subtle' c={"white"}>
                    <AiOutlineClose size={30} />
                  </ActionIcon>
                </Group>
                {DataFrontNav.map((item) => {
                  return (
                    <Box key={item.key} m={5} >
                      <NavLink
                        active
                        label={active === item.link ? (
                          <Box>
                            <Title order={5} onClick={() => router.push(item.link)}>
                              {item.label}
                            </Title>
                            <Grid pt={5}>
                              <Grid.Col span={3}>
                                <Divider color={item.garisBawah} size="lg" />
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
                        c={item.color}
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
                        // position: "absolute",
                        bottom: 160,
                        left: 0,
                        marginTop: 50
                      }}
                    >
                      <NavLink
                        label={<Text>LOGOUT ?</Text>}
                        c={'SETTING' ? "white" : "dark"}
                        variant="subtle"
                        active
                        style={{
                          // position: "absolute",
                          bottom: 120,
                          left: 0,
                        }}
                        pl={50}
                        onClick={async () => {
                          // setOpenModal(true) 
                          await funLogUser({ act: 'LOGOUT', desc: 'User logout dari sistem' })
                          const logout = await funLogout()
                          await new Promise((r) =>
                            setTimeout(r, 500)
                          )
                          router.refresh()
                        }}
                      />
                    </NavLink>
                  </Box>
                </AppShell.Section>
                {/* </Box> */}
                <Box
                  style={{
                    position: "fixed",
                    bottom: 40,
                    zIndex: 0
                  }}
                >
                  <Center pl={20} pr={20}>
                    <Image src={"/raven1.png"} maw={200} mx="auto" alt="logo" />
                  </Center>
                </Box>
              </BackgroundImage>
            </AppShell.Navbar>
          )
        }
        {!isOpenCoba &&
          (
            <AppShellNavbar
              w={100}
              h={"100vh"}
              bg={"#1E1B1C"}
              style={{
                border: "none",
                backgroundSize: "100vh"
              }}
            >
              <AppShellSection pt={30}>
                <Stack align='center' p={"xs"}>
                  {DataFrontMobile.map((item) => {
                    return (
                      <Box key={item.key}>
                        <Tooltip label={item.label}>
                          <ActionIcon
                            c={activemobile === item.link ? item.garisBawah : item.color}
                            radius={"md"}
                            size={30}
                            variant='subtle'
                            onClick={() => router.push(item.link)}
                          >
                            <item.icon size={30} />
                          </ActionIcon>
                        </Tooltip>
                      </Box>
                    )
                  })}
                </Stack>
              </AppShellSection>

              <AppShellSection
                style={{
                  position: "fixed",
                  bottom: 10,
                  zIndex: 0
                }}
                pb={40}
              >
                <Group pl={15}>
                  <Image src={"/raven2.png"} w={70} alt="logo" />
                </Group>
              </AppShellSection>
              <AppShellSection
                pt={20}
              >
                <Group justify='center'>
                  <ActionIcon onClick={() => {
                    setNavOpt({ width: 300, breakpoint: 'sm', collapsed: { mobile: isOpenCoba } })
                    setOpenCoba(true)
                  }} variant='subtle' c={"white"}>
                    <MdArrowForwardIos size={30} />
                  </ActionIcon>
                </Group>
              </AppShellSection>
            </AppShellNavbar>
          )
        }
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
        <ModalLogoutUser />
      </Modal>
    </>
  );
}

