import axios from "axios";

export const POSTSUCCESS = "POSTSUCCESS";
export const POSTFAIL = "POSTFAIL";
export const POSTLOAD = "POSTLOAD";

export const UPLOADSUCCESS = "UPLOADSUCCESS";
export const UPLOADFAIL = "UPLOADFAIL";
export const UPLOADING = "UPLOADING";

export const post_success = (data) => {
  return {
    type: POSTSUCCESS,
    payload: data,
  };
};
export const post_fail = (data) => {
  return {
    type: POSTFAIL,
    payload: data,
  };
};
export const post_load = () => {
  return {
    type: POSTLOAD,
  };
};

export const upload_success = (data) => {
  return {
    type: UPLOADSUCCESS,
    payload: data,
  };
};
export const upload_fail = (data) => {
  return {
    type: UPLOADFAIL,
    payload: data,
  };
};
export const upload_load = () => {
  return {
    type: UPLOADING,
  };
};

export const getPost = (username, currentUserId) => async (dispatch) => {
  dispatch(post_load());
  try {
    const res = username
      ? await await axios.get("http://localhost:8080/post/profile/" + username)
      : await await axios.get(
          `http://localhost:8080/post/timeline/${currentUserId}`
        );
    dispatch(
      post_success(
        res.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      )
    );
  } catch (error) {
    dispatch(post_fail(error));
  }
};

export const uploadPost = (newPost, currentUser) => (dispatch) => {
  dispatch(upload_load());
  try {
    axios.post("http://localhost:8080/post", newPost);
    dispatch(upload_success());
    dispatch(getPost(null, currentUser));
  } catch (error) {
    dispatch(upload_fail(error));
  }
};
