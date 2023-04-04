import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const LIKESUCCESS = "LIKESUCCESS";
export const LIKEFAIL = " LIKEFAIL";
export const LIKELOAD = "LIKELOAD";

export const likeSuccess = (data) => {
  return {
    type: LIKESUCCESS,
    payload: data,
  };
};

export const likeFail = (err) => {
  return {
    type: LIKEFAIL,
    payload: err,
  };
};

export const likeLoad = () => {
  return {
    type: LIKELOAD,
  };
};

export const getLikesDislikes = (userId, postId) => (dispatch) => {
  dispatch(likeLoad());
  try {
    axios.put(`${baseUrl}/post/${postId}/like`, {
      userId: userId,
    });
    dispatch(likeSuccess());
  } catch (error) {
    dispatch(likeFail(error));
  }
};
