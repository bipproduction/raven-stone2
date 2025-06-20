'use client'
import { ActionIcon, AppShell, Box, Burger, Group, Menu, Modal, NavLink, ScrollArea, UnstyledButton, rem } from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCircle, FaUserTie } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useState } from "react";
import { funLogout } from "@/modules/auth";
import { funLogUser } from "@/modules/user";
import { useAtom } from "jotai";
import { isModalLayout } from "../val/isModalLayout";
import ModalLogout from "./modal_logout";

/**
 * Menampilkan layout admin,
 * berisikan menu navbar, header dan modal logout
 * @param name nama user 
 * @param menu list menu yang diperbolehkan utk diakses
 * @param children content children
 * @returns komponen layout admin
 */

export default function LayoutAdmin({ name, menu, children }: { name: any, menu: any | null, children: React.ReactNode; }) {
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
        {
            key: "md15",
            link: "/dashboard-admin/live",
            label: "SETTING DASHBOARD LIVE",
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
        {
            key: "md15",
            link: "/dashboard-admin/delete-emotion-candidate",
            label: "DELETE EMOTION CANDIDATE",
        },
        {
            key: "md17",
            link: "/dashboard-admin/delete-emotion",
            label: "DELETE EMOTION",
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
                                            stroke="1.5"
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
                                        onClick={async () => {
                                            // setOpenModal(true) 
                                            await funLogUser({ act: 'LOGOUT', desc: 'User logout' })
                                            const logout = await funLogout()
                                            await new Promise((r) =>
                                                setTimeout(r, 500)
                                            )
                                            router.refresh()
                                        }}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Box>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p="md" pb={30}>
                    <ScrollArea >

                    {(menu && menu.menuEmotion && menu.menuEmotion.length > 0) &&
                        // {(dataEmotion.length > 0) &&
                        <NavLink
                            label="EMOTION EDITOR"
                            childrenOffset={28}
                            fw={"bolder"}
                        >
                            {menu.menuEmotion.map((item: any) => {
                                // {dataEmotion.map((item: any) => {
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

                    {menu && menu.menuData1.map((item: any) => {
                        // {data1.map((item: any) => {
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

                        (menu && menu.menuRegion.length > 0) &&
                        // (dataRegion.length > 0) &&
                        <NavLink
                            label="REGION VALUE EDITOR"
                            childrenOffset={28}
                            fw={"bolder"}
                        >

                            {menu.menuRegion.map((item: any) => {
                                // {dataRegion.map((item: any) => {
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

                    {menu && menu.menuData2.map((item: any) => {
                        // {dataDua.map((item: any) => {
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

                        (menu && menu.menuDeveloper.length > 0) &&
                        // (dataDeveloper.length > 0) &&
                        <NavLink
                            label="DEVELOPER"
                            childrenOffset={28}
                            fw={"bolder"}
                        >

                            {menu.menuDeveloper.map((item: any) => {
                                // {dataDeveloper.map((item: any) => {
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
                    </ScrollArea>


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
                <ModalLogout />
            </Modal>
        </>
    );
}