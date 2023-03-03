import React, { useEffect } from "react";
import "./Post.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { MoreVert } from "@material-ui/icons";
// import { Users } from "../../DummyData";
import { useState } from "react";
import axios from "axios";

export const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState("");
  useEffect(() => {
    getUser();
  }, [post.userId]);

  // console.log(user.profilePicture);
  const getUser = async () => {
    const res = await axios.get(`http://localhost:8080/users/${post.userId}`);
    // console.log(res.data);
    setUser(res.data);
  };

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.userId}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture || PF + "person/images.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};
