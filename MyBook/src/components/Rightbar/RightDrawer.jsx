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
import { Rightbar } from "./Rightbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const RightDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <MenuOpen />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Link to={`/profile/${currentUser?.username}`}>
            <img
              src={
                currentUser?.profilePicture
                  ? currentUser?.profilePicture
                  : `https://res.cloudinary.com/deje6buuz/image/upload/v1680505965/images_s29pa0.png`
              }
              alt=""
              className="topbarImg"
            />
            <div>{currentUser?.username}</div>
          </Link>
          <Rightbar />
          <DrawerCloseButton />
        </DrawerContent>
      </Drawer>
    </>
  );
};
