import React, { useContext, useEffect, useState } from "react";
import { Post } from "../Post/Post";
import { Share } from "../Share/Share";
import axios from "axios";
import "./Feed.css";
import { useSelector } from "react-redux";

export const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state);

  // console.log(user, "from feed");
  useEffect(() => {
    getPost();
  }, []);
  // console.log(username, "from feed");
  const getPost = async () => {
    const res = username
      ? await await axios.get("http://localhost:8080/post/profile/" + username)
      : await await axios.get(
          `http://localhost:8080/post/timeline/${currentUser._id}`
        );
    // console.log(res.data);
    setPosts(
      res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === currentUser.username) && <Share />}

        {posts.map((ele) => (
          <Post key={ele._id} post={ele} />
        ))}
      </div>
    </div>
  );
};
