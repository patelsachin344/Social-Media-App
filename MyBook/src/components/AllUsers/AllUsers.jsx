import "./AllUsers.css";

import React from "react";
import { Link } from "react-router-dom";

export const AllUsers = ({ friend }) => {
  return (
    <li className="sidebarFriend">
      <Link to={`/friendsprofile/${friend?.username}`}>
        <img
          className="sidebarFriendImg"
          src={
            friend.profilePicture
              ? friend.profilePicture
              : `https://res.cloudinary.com/deje6buuz/image/upload/v1680505965/images_s29pa0.png`
          }
          alt=""
        />
      </Link>

      <span className="sidebarFriendName">{friend.username}</span>
    </li>
  );
};
