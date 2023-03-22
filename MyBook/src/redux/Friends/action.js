import axios from "axios";

export const FRIENDSUCCESS = "FRIENDSUCCESS";
export const FRIENDFAIL = "FRIENDFAIL";
export const FRIENDLOAD = "FRIENDLOAD";

export const friends_success = (data) => {
  return {
    type: FRIENDSUCCESS,
    payload: data,
  };
};
export const friends_fail = (data) => {
  return {
    type: FRIENDFAIL,
    payload: data,
  };
};
export const friends_load = () => {
  return {
    type: FRIENDLOAD,
  };
};

export const getFriends = (userId) => async (dispatch) => {
  dispatch(friends_load());
  try {
    const res = await axios.get(
      `http://localhost:8080/users/friends/${userId}`
    );
    dispatch(friends_success(res.data));
  } catch (error) {
    dispatch(friends_fail());
  }
};
