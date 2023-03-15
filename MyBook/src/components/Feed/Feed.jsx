import React, { useContext, useEffect, useState } from "react";
import { Post } from "../Post/Post";
import { Share } from "../Share/Share";
import axios from "axios";
import "./Feed.css";
import { AuthContext } from "../../context/AuthContextt";

export const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user, "from feed");
  useEffect(() => {
    getPost();
  }, []);
  console.log(username, "from feed");
  const getPost = async () => {
    const res = username
      ? await await axios.get("http://localhost:8080/post/profile/" + username)
      : await await axios.get(
          `http://localhost:8080/post/timeline/${user.user._id}`
        );
    // console.log(res.data);
    setPosts(res.data);
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />

        {posts.map((ele) => (
          <Post key={ele._id} post={ele} />
        ))}
      </div>
    </div>
  );
};
