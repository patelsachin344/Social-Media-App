import React, { useEffect } from "react";
import "./Post.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getLikesDislikes } from "../../redux/Likes/action";

export const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser?._id));
  }, [currentUser?._id, post.like]);

  const likeHandler = () => {
    dispatch(getLikesDislikes(currentUser?._id, post?._id));
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/friendsprofile/${post?.userId?.username}`}>
              <img
                className="postProfileImg"
                src={
                  post?.userId?.profilePicture
                    ? post?.userId?.profilePicture
                    : `https://res.cloudinary.com/deje6buuz/image/upload/v1680505965/images_s29pa0.png`
                }
                alt=""
              />
            </Link>
            {}
            <span className="postUsername">{post?.userId?.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post?.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`https://res.cloudinary.com/deje6buuz/image/upload/v1680505715/like_tzcbzv.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`https://res.cloudinary.com/deje6buuz/image/upload/v1680505715/heart_pg4she.png`}
              s
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};
