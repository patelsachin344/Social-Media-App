import React, { useContext, useRef, useState } from "react";
import "./Share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../redux/Post/action";
export const Share = () => {
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { uploading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  // console.log(currentUser, "response from login ,action redux");
  // console.log(uploading, "uploading");

  const desc = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUser?._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "mybookimg");
      data.append("cloud_name", "deje6buuz");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/deje6buuz/image/upload",
          data
        );
        // console.log(res.data.url);
        newPost.image = res.data.url;
      } catch (error) {
        console.log(error);
      }
    }
    if (desc.current.value || file) {
      dispatch(uploadPost(newPost, currentUser?._id));
      desc.current.value = null;
      setFile(null);
    } else {
      alert("Please enter description or file");
    }
  };
  // console.log(file);
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              currentUser?.profilePicture
                ? currentUser?.profilePicture
                : `https://res.cloudinary.com/deje6buuz/image/upload/v1680505965/images_s29pa0.png`
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + currentUser?.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="cancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};
