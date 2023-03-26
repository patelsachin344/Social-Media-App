import "./Profile.css";

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

export const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { username } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleUserbyusername(username));
  }, [username]);

  const uploadImg = {
    userId: currentUser?._id,
  };

  const handleUpload = async () => {
    if (profileFile) {
      const data = new FormData();
      data.append("file", profileFile);
      data.append("upload_preset", "mybookimg");
      data.append("cloud_name", "deje6buuz");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/deje6buuz/image/upload",
          data
        );
        // console.log(res.data.url);
        uploadImg.profilePicture = res.data.url;
      } catch (error) {
        console.log(error);
      }
    } else if (coverFile) {
      const data = new FormData();
      data.append("file", coverFile);
      data.append("upload_preset", "mybookimg");
      data.append("cloud_name", "deje6buuz");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/deje6buuz/image/upload",
          data
        );
        // console.log(res.data.url);
        uploadImg.coverPicture = res.data.url;
      } catch (error) {
        console.log(error);
      }
    }
    if (profileFile || coverFile) {
      dispatch(uploadUserImg(currentUser?._id, uploadImg));
      setProfileFile(null);
      setCoverFile(null);
    }
  };

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
                    currentUser?.coverPicture
                      ? currentUser?.coverPicture
                      : PF + "/person/noCover.jpeg"
                  }
                  alt=""
                />
                <input
                  type="file"
                  id="coverFile"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setCoverFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
              <label htmlFor="profileFile">
                <img
                  className="profileUserImg"
                  src={
                    currentUser?.profilePicture
                      ? currentUser?.profilePicture
                      : PF + "/person/images.png"
                  }
                  alt=""
                />
                <input
                  type="file"
                  id="profileFile"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setProfileFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
              {profileFile && (
                <div className="uploadProfileImgContainer">
                  <img
                    src={URL.createObjectURL(profileFile)}
                    alt=""
                    className="uploadProfileImg"
                  />
                  <Cancel
                    className="uploadProfilecancelImg"
                    onClick={() => setProfileFile(null)}
                  />
                  <CloudUpload onClick={handleUpload} />
                </div>
              )}

              {coverFile && (
                <div className="uploadCoverImgContainer">
                  <img
                    src={URL.createObjectURL(coverFile)}
                    alt=""
                    className="uploadCoverImg"
                  />
                  <Cancel
                    className="uploadCovercancelImg"
                    onClick={() => setCoverFile(null)}
                  />
                  <CloudUpload onClick={handleUpload} />
                </div>
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{currentUser?.username}</h4>
              <span className="profileInfoDesc">{currentUser?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};
