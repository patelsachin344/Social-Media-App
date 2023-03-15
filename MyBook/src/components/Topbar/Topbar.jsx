import React, { useContext } from "react";
import "./topbar.css";
import { Link } from "react-router-dom";

import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContextt";

export const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);
  console.log(user, "from topbar");
  return (
    <div className="topbarcontainer">
      <div className="leftTopbar">
        <Link to={"/"} style={{ textDecoration: "none" }}>
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
        <div className="topbarLinks">
          <span className="topbarLink">HomePage</span>
          <span className="topbarLink">Timeline</span>
        </div>
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

        <Link to={`/profile/${user.user.username}`}>
          <img
            src={
              user.user.profilePicture
                ? user.user.profilePicture
                : PF + "person/images.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
};
