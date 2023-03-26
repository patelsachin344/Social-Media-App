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
    await axios.put(`http://localhost:8080/users/${userId}/unfollow`, {
      userId: currentUserId,
    });
  } catch (error) {}
};
const unfollowUser = () => (dispatch) => {};
