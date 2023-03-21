import axios from "axios";

export const loginLoading = () => {
  return {
    type: "LoginLoading",
  };
};
export const loginSuccess = (data) => {
  return {
    type: "LoginSuccess",
    payload: data,
  };
};
export const loginError = (data) => {
  return {
    type: "LoginError",
    payload: data,
  };
};
export const followSuccess = (data) => {
  return {
    type: "FollowSuccess",
    payload: data,
  };
};
export const unFollowSuccess = (data) => {
  return {
    type: "UnFollowSuccess",
    payload: data,
  };
};

export const getLoginUser = async (loginBoby, dispatch) => {
  dispatch({ type: "LoginLoading" });
  try {
    const res = await axios.post("http://localhost:8080/auth/login", loginBoby);
    // console.log(res.data?.user, "response");
    dispatch({ type: "LoginSuccess", payload: res.data });
  } catch (error) {
    dispatch({ type: "LoginError", payload: error });
  }
};
