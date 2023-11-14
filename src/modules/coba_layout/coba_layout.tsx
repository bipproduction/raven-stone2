"use client";
import React from "react";
import AnimateCssReact from "animate-css-reactjs";
import {
  ActionIcon,
  AppShell,
  AppShellNavbar,
  AppShellSection,
  Box,
  Stack,
  Tooltip,
} from "@mantine/core";
import { useAtom } from "jotai";
import {
  sNavbarOpen,
  sNavbarSmall,
} from "../_global/front/val/isModalLayoutUser";
import { CiDiscount1 } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";

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

const CobaLayout = () => {
  const [isOpenSmall, setIsOpenSmall] = useAtom(sNavbarSmall);
  const [isNavbarOpen, setNavbarOpen] = useAtom(sNavbarOpen);
  return (
    <>
      <AppShell>
        <AnimateCssReact animation="fadeIn">
          <AppShellNavbar hidden={!isNavbarOpen} w={{ sm: 100, lg: 100 }}>
            <AppShellSection grow>
              <Stack align="center" p={"xs"}>
                {mobile.map((v, i) => (
                  <Box key={i}>
                    <Tooltip label={v.label}>
                      <ActionIcon
                        bg={v.label ? "dark" : ""}
                        radius={100}
                        size={30}
                        variant="subtle"
                      >
                        <v.icon size={30} color={"white"} />
                      </ActionIcon>
                    </Tooltip>
                  </Box>
                ))}
              </Stack>
            </AppShellSection>
            <AppShellSection>
              <ActionIcon
                onClick={() => setIsOpenSmall(false)}
                m={"md"}
                radius={100}
                size={34}
              >
                <MdArrowForwardIos size={34} />
              </ActionIcon>
            </AppShellSection>
          </AppShellNavbar>
        </AnimateCssReact>
      </AppShell>
    </>
  );
};

export function NavbarFull() {
  return (
    <>
    
    </>
  )
}
export default CobaLayout;
