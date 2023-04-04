import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";

import { AllUsers } from "../AllUsers/AllUsers";
import { useDispatch, useSelector } from "react-redux";
import { logedinUser } from "../../redux/Login/action";
import { get_All_Users } from "../../redux/Friends/action";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const { getAllUsers } = useSelector((state) => state.friends);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(get_All_Users(currentUser?._id));
  }, []);

  const [logout, setLogout] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear("userToken");
    dispatch(logedinUser());
    setLogout(!logout);
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <span className="sidebarListItemText">Feed</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span
              className="sidebarListItemText"
              onClick={() => handleLogout()}
            >
              Log Out
            </span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          Show All Users
          {getAllUsers &&
            getAllUsers.map((friend) => (
              <AllUsers key={friend.username} friend={friend} />
            ))}
        </ul>
      </div>
    </div>
  );
};
