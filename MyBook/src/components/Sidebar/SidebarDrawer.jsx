import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import "./SidebarDrawer.css";

import { useRef } from "react";
import { Sidebar } from "../Sidebar/Sidebar";

export const SidebarDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Button bg={"#1877f2"} ref={btnRef} onClick={onOpen}>
        <GiHamburgerMenu />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar />
          <DrawerCloseButton />
        </DrawerContent>
      </Drawer>
    </>
  );
};
