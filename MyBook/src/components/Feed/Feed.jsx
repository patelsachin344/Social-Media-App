import React, { useEffect } from "react";
import { Post } from "../Post/Post";
import { Share } from "../Share/Share";
import "./Feed.css";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../redux/Post/action";

export const Feed = ({ username }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  // console.log(posts, "from feed");

  useEffect(() => {
    dispatch(getPost(username, currentUser.user?._id));
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === currentUser.user?.username) && <Share />}

        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
