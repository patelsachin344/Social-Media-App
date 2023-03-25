import React, { useEffect } from "react";
import { Post } from "../Post/Post";
import { Share } from "../Share/Share";
import "./Feed.css";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../redux/Post/action";
import { useParams } from "react-router-dom";

export const Feed = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { currentUsername } = useParams();
  useEffect(() => {
    dispatch(getPost(currentUsername, currentUser.user?._id));
  }, []);
  console.log(
    currentUsername,
    currentUser.user?.username,
    "from feed username"
  );
  return (
    <div className="feed">
      <div className="feedWrapper">
        {currentUsername === currentUser.user?.username && <Share />}

        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
