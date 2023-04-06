import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import "./RightDrawer.css";
import { useRef } from "react";
import { Rightbar } from "./Rightbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Online } from "../Online/Online";

export const RightDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  const { friends } = useSelector((state) => state.friends);

  return (
    <>
      <Button bg={"#1877f2"} ref={btnRef} onClick={onOpen}>
        <img
          className="rightDrawerImage"
          src={
            currentUser?.profilePicture
              ? currentUser?.profilePicture
              : `https://res.cloudinary.com/deje6buuz/image/upload/v1680505965/images_s29pa0.png`
          }
          alt="profile"
        />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Link
            to={`/profile/${currentUser?.username}`}
            className="rightDrawerProfileDiv"
          >
            <img
              src={
                currentUser?.profilePicture
                  ? currentUser?.profilePicture
                  : `https://res.cloudinary.com/deje6buuz/image/upload/v1680505965/images_s29pa0.png`
              }
              alt=""
              className="rightDrawerProfile"
            />
            <div style={{ textAlign: "center" }}>{currentUser?.username}</div>
          </Link>
          {/* <Rightbar /> */}
          <ul className="rightDrawerFriendList">
            {friends &&
              friends.map((friend) => (
                <Online key={friend.username} friend={friend} />
              ))}
          </ul>
          <DrawerCloseButton />
        </DrawerContent>
      </Drawer>
    </>
  );
};
