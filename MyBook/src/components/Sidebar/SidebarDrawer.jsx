import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { useRef } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { MenuOpen } from "@material-ui/icons";

export const SidebarDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <MenuOpen />
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
