import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const LOGINSUCCESS = "LOGINSUCCESS";
export const LOGINFAIL = "LOGINFAIL";
export const LOGINLOAD = "LOGINLOAD";

export const SIGNUPSUCCESS = "SIGNUPSUCCESS";
export const SIGNUPFAIL = "SIGNUPFAIL";
export const SIGNUPLOAD = "SIGNUPLOAD";

export const GETSINGLEUSER = "GETSINGLEUSER";

export const login_success = (data) => {
  return {
    type: LOGINSUCCESS,
    payload: data,
  };
};
export const login_fail = () => {
  return {
    type: LOGINFAIL,
  };
};
export const login_load = () => {
  return {
    type: LOGINLOAD,
  };
};

export const signup_success = () => {
  return {
    type: SIGNUPSUCCESS,
  };
};
export const signup_fail = () => {
  return {
    type: SIGNUPFAIL,
  };
};
export const signup_load = () => {
  return {
    type: SIGNUPLOAD,
  };
};

export const get_singleUser = (data) => {
  return {
    type: GETSINGLEUSER,
    payload: data,
  };
};

export const signupUser = (user) => async (dispatch) => {
  //   const navigate = useNavigate();

  dispatch(signup_load());
  try {
    await axios.post("http://localhost:8080/auth/register", user);
    // navigate("/login");
  } catch (error) {
    dispatch(signup_fail());
  }
};

export const loginUser = (user) => async (dispatch) => {
  console.log("try to login", user);

  dispatch(login_load());
  try {
    const res = await axios.post("http://localhost:8080/auth/login", user);
    // console.log(res.data.user, "response from action redux");
    dispatch(login_success(res.data.user));
  } catch (error) {
    dispatch(login_fail());
  }
};

export const getSingleUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/users?userId=${userId}`);
    dispatch(get_singleUser(res.data));
  } catch (error) {
    dispatch(login_fail());
  }
};
