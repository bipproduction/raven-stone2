"use client";
import React, { useState } from "react";
import AnimateCssReact from "animate-css-reactjs";
import {
  ActionIcon,
  AppShell,
  AppShellNavbar,
  AppShellSection,
  Box,
  Burger,
  Button,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useAtom } from "jotai";
import {
  sNavbarOpen,
  sNavbarSmall,
} from "../_global/front/val/isModalLayoutUser";
import { CiDiscount1 } from "react-icons/ci";
import { MdArrowForwardIos, MdClose } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineClose } from "react-icons/ai";
import { isModalGlobalCoba } from "./val/iisGlobalCoba";

const mobile = [
  {
    id: 1,
    icon: CiDiscount1,
    label: "COBA MENU",
  },
  {
    id: 2,
    icon: CiDiscount1,
    label: "COBA MENU",
  },
  {
    id: 3,
    icon: CiDiscount1,
    label: "COBA MENU",
  },
  {
    id: 4,
    icon: CiDiscount1,
    label: "COBA MENU",
  },
];

export default function CobaNavbar() {
  const [opened, { toggle }] = useDisclosure();
  const [disabled, { toggle: toggleDisabled }] = useDisclosure();
  const [isOpenCoba, setOpenCoba] = useAtom(isModalGlobalCoba);

  return (
    <AppShell
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
      disabled={isOpenCoba}
    >
      <AppShell.Navbar p="md">
        <Group justify="flex-end">
          <ActionIcon onClick={() => setOpenCoba(true)}>
            <AiOutlineClose />
          </ActionIcon>
        </Group>
        {mobile.map((item) => {
          return (
            <Box key={item.id}>
              <Tooltip label={item.label}>
                <ActionIcon
                  bg={item.label ? "dark" : ""}
                  radius={100}
                  size={32}
                  variant="light"
                >
                  <item.icon size={32} color={"white"} />
                </ActionIcon>
              </Tooltip>
            </Box>
          );
        })}
      </AppShell.Navbar>
      <AppShellSection>
        <Button onClick={() => setOpenCoba(false)}>buka</Button>
        {mobile.map((item) => {
          return (
            <Box key={item.id}>
              <Tooltip label={item.label}>
                <ActionIcon
                  bg={item.label ? "dark" : ""}
                  radius={100}
                  size={32}
                  variant="light"
                >
                  <item.icon size={32} color={"white"} />
                </ActionIcon>
              </Tooltip>
            </Box>
          );
        })}
      </AppShellSection>
      <AppShell.Main>
        <Text>Selamat Datang</Text>
      </AppShell.Main>
    </AppShell>
  );
}
