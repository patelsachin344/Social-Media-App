import "./Online.css";

import React from "react";

export const Online = ({ friend }) => {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={
            friend.profilePicture
              ? friend.profilePicture
              : `https://res.cloudinary.com/deje6buuz/image/upload/v1680505965/images_s29pa0.png`
          }
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{friend.username}</span>
    </li>
  );
};
