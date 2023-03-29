import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const FRIENDSUCCESS = "FRIENDSUCCESS";
export const FRIENDFAIL = "FRIENDFAIL";
export const FRIENDLOAD = "FRIENDLOAD";

export const GETALLUSER = "GETALLUSER";
export const GETALLUSERFAIL = "GETALLUSERFAIL";
export const GETCURRENTUSERLOAD = "GETCURRENTUSERLOAD";

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

export const get_allUser = (data) => {
  return {
    type: GETALLUSER,
    payload: data,
  };
};
export const fail_allUser = () => {
  return {
    type: GETALLUSERFAIL,
  };
};
export const load_allUser = () => {
  return {
    type: GETCURRENTUSERLOAD,
  };
};

export const getFriends = (userId) => async (dispatch) => {
  dispatch(friends_load());
  try {
    const res = await axios.get(`${baseUrl}/users/friends/${userId}`);
    dispatch(friends_success(res.data));
  } catch (error) {
    dispatch(friends_fail());
  }
};

export const get_All_Users = () => async (dispatch) => {
  dispatch(load_allUser());
  try {
    const res = await axios.get(`${baseUrl}/users/allUsers`);
    dispatch(get_allUser(res.data));
  } catch (error) {
    dispatch(fail_allUser());
  }
};
