import "./AllUsers.css";

import React from "react";
import { Link } from "react-router-dom";

export const AllUsers = ({ friend }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <Link to={`/friendsprofile/${friend?.username}`}>
        <img
          className="sidebarFriendImg"
          src={
            friend.profilePicture
              ? friend.profilePicture
              : PF + "person/images.png"
          }
          alt=""
        />
      </Link>

      <span className="sidebarFriendName">{friend.username}</span>
    </li>
  );
};
