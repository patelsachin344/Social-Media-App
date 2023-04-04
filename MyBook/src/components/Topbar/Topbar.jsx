import "./topbar.css";
import { Link } from "react-router-dom";

import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { RightDrawer } from "../Rightbar/RightDrawer";
import { SidebarDrawer } from "../Sidebar/SidebarDrawer";
import { Show } from "@chakra-ui/react";
import { Box } from "@material-ui/core";

export const Topbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="topbarcontainer">
      <div className="leftTopbar">
        <Box className="sidebarShower">
          <SidebarDrawer />
        </Box>

        <Link to={"/"} className="topbarHomeButton">
          <span className="logo">MyBook</span>
        </Link>
      </div>
      <div className="centerTopbar">
        <span className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="Search Post , video , friend"
          />
        </span>
      </div>
      <div className="rightTopbar">
        {/* <div className="topbarLinks">
          <span className="topbarLink">HomePage</span>
          <span className="topbarLink">Timeline</span>
        </div> */}
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIcanBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIcanBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIcanBadge">1</span>
          </div>
        </div>

        <Link
          to={`/profile/${currentUser?.username}`}
          className="topbarImgShowerLink"
        >
          <img
            src={
              currentUser?.profilePicture
                ? currentUser?.profilePicture
                : `https://res.cloudinary.com/deje6buuz/image/upload/v1680505965/images_s29pa0.png`
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
      <Box className="rightbarShower">
        <RightDrawer />
      </Box>
    </div>
  );
};
