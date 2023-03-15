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

export const getLoginUser = async (loginBoby, dispatch) => {
  dispatch({ type: "LoginLoading" });
  try {
    console.log("try to login", loginBoby);
    const res = await axios.post("http://localhost:8080/auth/login", loginBoby);
    console.log(res.data?.user, "response");
    dispatch({ type: "LoginSuccess", payload: res.data });
  } catch (error) {
    dispatch({ type: "LoginError", payload: error });
  }
};
