import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";

const follow_user = () => {
  return {
    type: FOLLOW,
  };
};
const unfollow_user = () => {
  return {
    type: UNFOLLOW,
  };
};

const followUser = (userId, currentUserId) => async (dispatch) => {
  try {
    await axios.put(`${baseUrl}/users/${userId}/unfollow`, {
      userId: currentUserId,
    });
  } catch (error) {}
};
const unfollowUser = () => (dispatch) => {};
