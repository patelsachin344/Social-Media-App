import React, { useEffect, useState } from "react";
// import { Posts } from "../../DummyData";
import { Post } from "../Post/Post";
import { Share } from "../Share/Share";
import axios from "axios";
import "./Feed.css";

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const res = await await axios.get(
      "http://localhost:8080/post/timeline/6401fa2298bb25ff2bf06624"
    );
    console.log(res.data);
    setPosts(res.data);
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};
