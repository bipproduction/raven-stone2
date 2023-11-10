'use client'

import { ActionIcon, AppShell, Box, Burger, Group, Menu, Modal, NavLink, UnstyledButton, rem } from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCircle, FaUserTie } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useState } from "react";
import { funLogout } from "@/modules/auth";
import toast from "react-simple-toasts";
import { funLogUser } from "@/modules/user";
import { useAtom } from "jotai";
import { isModalLayout } from "../val/isModalLayout";
import ModalLogout from "./modal_logout";


export default function LayoutAdmin({ name, menu, children }: { name: any, menu: any, children: React.ReactNode; }) {
    const [valOpenModal, setOpenModal] = useAtom(isModalLayout)
    const [opened, { toggle }] = useDisclosure();
    const dataEmotion = [
        {
            key: "md0",
            link: "/dashboard-admin/emotion-paslon",
            label: "PASLON",
        },
        {
            key: "md1",
            link: "/dashboard-admin/emotion-candidate",
            label: "CANDIDATE",
        },
    ]
    const data1 = [
        {
            key: "md2",
            link: "/dashboard-admin/national-popularity-metric",
            label: "NATIONAL POPULARITY METRIC",
        },
    ];

    const dataRegion = [
        {
            key: "md3",
            link: "/dashboard-admin/audience",
            label: "AUDIENCE",
        },
        {
            key: "md4",
            link: "/dashboard-admin/public-concern-trend",
            label: "PUBLIC CONCERNS TRENDS",
        },
        {
            key: "md5",
            link: "/dashboard-admin/leader-trait-assessment",
            label: "LEADER TRAIT ASSESSMENT",
        },
        {
            key: "md6",
            link: "/dashboard-admin/region-hot-issue",
            label: "REGION HOT ISSUE",
        },
    ];

    const dataDua = [
        {
            key: "md7",
            link: "/dashboard-admin/step",
            label: "STEP",
        },
        {
            key: "md8",
            link: "/dashboard-admin/swot",
            label: "SWOT",
        },
        {
            key: "md9",
            link: "/dashboard-admin/ml-ai",
            label: "ML - AI",
        },
        {
            key: "md10",
            link: "/dashboard-admin/jokowi-effect",
            label: "JOKOWI EFFECT",
        },
    ];

    const dataDeveloper = [
        {
            key: "md11",
            link: "/dashboard-admin/seeder",
            label: "SEEDER",
        },
        {
            key: "md12",
            link: "/dashboard-admin/log-user",
            label: "LOG USER",
        },
        {
            key: "md13",
            link: "/dashboard-admin/role-user",
            label: "ROLE USER",
        },
        {
            key: "md14",
            link: "/dashboard-admin/user",
            label: "USER",
        },
    ];

    const router = useRouter();
    const pathname = usePathname();
    const [active, setActive] = useState("");
    useShallowEffect(() => {
        setActive(pathname);
    });

    return (
        <>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: "sm",
                    collapsed: { mobile: !opened },
                }}
                padding="md"
            >
                <AppShell.Header>
                    <Group h="100%" px="md" justify="space-between">
                        <Group>
                            <Burger
                                opened={opened}
                                onClick={toggle}
                                hiddenFrom="sm"
                                size="sm"
                            />
                            <Box>
                                <UnstyledButton
                                    onClick={() => router.push("/")}
                                    fz={25}
                                    fw={700}
                                >
                                    RAVENSTONE V2
                                </UnstyledButton>
                            </Box>
                        </Group>
                        <Box>
                            <Menu>
                                <Menu.Target>
                                    <ActionIcon
                                        variant="filled"
                                        color="rgba(0, 0, 0, 1)"
                                        radius="xl"
                                        aria-label="Settings"
                                    >
                                        <FaUserCircle
                                            style={{ width: "70%", height: "70%" }}
                                            stroke={1.5}
                                        />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item
                                        leftSection={
                                            <FaUserTie style={{ width: rem(14), height: rem(14) }} />
                                        }
                                    >
                                        {name}
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={
                                            <RiLogoutCircleRLine
                                                style={{ width: rem(14), height: rem(14) }}
                                            />
                                        }
                                        onClick={() => {setOpenModal(true)}}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Box>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p="md" pb={30}>
                    {(menu.menuEmotion.length > 0) &&
                        <NavLink
                            label="EMOTION EDITOR"
                            childrenOffset={28}
                            fw={"bolder"}
                        >
                            {menu.menuEmotion.map((item: any) => {
                                return (
                                    <NavLink
                                        key={item.key}
                                        active={item.link === active}
                                        fw={item.label ? "bolder" : "normal"}
                                        label={item.label}
                                        onClick={() => {
                                            router.push(item.link);
                                        }}
                                        color="#213555"
                                        variant="filled"
                                    />
                                );
                            })}
                        </NavLink>
                    }

                    {menu.menuData1.map((item: any) => {
                        return (
                            <NavLink
                                key={item.key}
                                active={item.link === active}
                                fw={item.label ? "bolder" : "normal"}
                                label={item.label}
                                onClick={() => {
                                    router.push(item.link);
                                }}
                                color="#213555"
                                variant="filled"
                            />
                        );
                    })}

                    {
                        (menu.menuRegion.length > 0) &&
                        <NavLink
                            label="REGION VALUE EDITOR"
                            childrenOffset={28}
                            fw={"bolder"}
                        >
                            {menu.menuRegion.map((item: any) => {
                                return (
                                    <NavLink
                                        key={item.key}
                                        active={item.link === active}
                                        fw={item.label ? "bolder" : "normal"}
                                        label={item.label}
                                        onClick={() => {
                                            router.push(item.link);
                                        }}
                                        color="#213555"
                                        variant="filled"
                                    />
                                );
                            })}
                        </NavLink>
                    }

                    {menu.menuData2.map((item: any) => {
                        return (
                            <NavLink
                                key={item.key}
                                active={item.link === active}
                                fw={item.label ? "bolder" : "normal"}
                                label={item.label}
                                onClick={() => {
                                    router.push(item.link);
                                }}
                                color="#213555"
                                variant="filled"
                            />
                        );
                    })}

                    {
                        (menu.menuDeveloper.length > 0) &&
                        <NavLink
                            label="DEVELOPER"
                            childrenOffset={28}
                            fw={"bolder"}
                        >
                            {menu.menuDeveloper.map((item: any) => {
                                return (
                                    <NavLink
                                        key={item.key}
                                        active={item.link === active}
                                        fw={item.label ? "bolder" : "normal"}
                                        label={item.label}
                                        onClick={() => {
                                            router.push(item.link);
                                        }}
                                        color="#213555"
                                        variant="filled"
                                    />
                                );
                            })}
                        </NavLink>
                    }

                </AppShell.Navbar>
                <AppShell.Main bg={"#EAEAEA"}>
                    <Box p={10} pl={20} pr={20}>
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
                <ModalLogout/>
            </Modal>
        </>
    );
}