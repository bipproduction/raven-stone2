'use client'

import { ActionIcon, AppShell, Box, Burger, Group, Menu, NavLink, UnstyledButton, rem } from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCircle, FaUserTie } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useState } from "react";


export default function LayoutAdmin({ children }: { children: React.ReactNode; }) {
    const [opened, { toggle }] = useDisclosure();
    const dataDashboard = [
        // {
        //     key: "md0",
        //     link: "/dashboard-admin",
        //     label: "BERANDA",
        // },
        {
            key: "md1",
            link: "/dashboard-admin/emotion",
            label: "EMOTION EDITOR",
        },
        {
            key: "md2",
            link: "/dashboard-admin/pairing",
            label: "REGIONAL DATA PAIRING",
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
                                        Moh Alif Al Lukman
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={
                                            <RiLogoutCircleRLine
                                                style={{ width: rem(14), height: rem(14) }}
                                            />
                                        }
                                    // onClick={onLogout}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Box>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p="md" pb={30}>
                    {dataDashboard.map((item) => {
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
                    <NavLink
                        label="REGION VALUE EDITOR"
                        childrenOffset={28}
                        fw={"bolder"}
                    >
                        {dataRegion.map((item) => {
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
                    {dataDua.map((item) => {
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
                </AppShell.Navbar>
                <AppShell.Main bg={"#EAEAEA"}>
                    <Box p={10} pl={20} pr={20}>
                        {children}
                    </Box>
                </AppShell.Main>
            </AppShell>
        </>
    );
}