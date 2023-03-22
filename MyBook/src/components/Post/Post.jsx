import React, { useEffect } from "react";
import "./Post.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../../redux/Login/action";

export const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { currentUser, getUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleUser(post.userId));
  }, [post.userId]);
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.like]);

  const likeHandler = () => {
    try {
      axios.put(`http://localhost:8080/post/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${getUser.username}`}>
              <img
                className="postProfileImg"
                src={
                  getUser.profilePicture
                    ? getUser.profilePicture
                    : PF + "person/images.png"
                }
                alt=""
              />
            </Link>
            {/* <span className="postUsername">{getUser.username}</span> */}
            <span className="postUsername">{post.userId}</span>
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
              s
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
