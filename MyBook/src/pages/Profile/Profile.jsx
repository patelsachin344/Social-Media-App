import "./Profile.css";

import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Feed } from "../../components/Feed/Feed";
import { Rightbar } from "../../components/Rightbar/Rightbar";
import { Topbar } from "../../components/Topbar/Topbar";

export const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={`${PF}/post/3.jpeg`}
                alt=""
              />
              <img
                className="profileUserImg"
                src={`${PF}/person/7.jpeg`}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Sachin Patel</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </div>
  );
};
