import "./FriendsProfile.css";

import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Feed } from "../../components/Feed/Feed";
import { Rightbar } from "../../components/Rightbar/Rightbar";
import { Topbar } from "../../components/Topbar/Topbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleUserbyusername,
  uploadUserImg,
} from "../../redux/Login/action";
import { Cancel, CloudUpload } from "@material-ui/icons";
import axios from "axios";

export const FriendsProfile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const { currentUser, getUserByUsername } = useSelector((state) => state.user);
  const { friendUsername } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleUserbyusername(friendUsername));
  }, [friendUsername]);

  return (
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <label htmlFor="coverFile">
                <img
                  className="profileCoverImg"
                  src={
                    getUserByUsername?.coverPicture
                      ? getUserByUsername?.coverPicture
                      : PF + "/person/noCover.jpeg"
                  }
                  alt=""
                />
              </label>
              <label htmlFor="profileFile">
                <img
                  className="profileUserImg"
                  src={
                    getUserByUsername?.profilePicture
                      ? getUserByUsername?.profilePicture
                      : PF + "/person/images.png"
                  }
                  alt=""
                />
              </label>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{getUserByUsername.username}</h4>
              <span className="profileInfoDesc">{getUserByUsername.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={friendUsername} />
            <Rightbar user={getUserByUsername} />
          </div>
        </div>
      </div>
    </div>
  );
};