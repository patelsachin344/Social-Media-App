import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const LOGINSUCCESS = "LOGINSUCCESS";
export const LOGINFAIL = "LOGINFAIL";
export const LOGINLOAD = "LOGINLOAD";
export const LOGINTRUE = "LOGINTRUE";

export const SIGNUPSUCCESS = "SIGNUPSUCCESS";
export const SIGNUPFAIL = "SIGNUPFAIL";
export const SIGNUPLOAD = "SIGNUPLOAD";

export const GETCURRENTUSER = "GETSINGLEUSER";
export const GETSINGLEUSERBYUSERNAME = "GETSINGLEUSERBYUSERNAME";

export const UPLOADUSERIMG = "UPLOADUSERIMG";

export const login_success = (data) => {
  return {
    type: LOGINSUCCESS,
    payload: data,
  };
};
export const login_true = () => {
  return {
    type: LOGINTRUE,
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

export const get_CurrentUser = (data) => {
  return {
    type: GETCURRENTUSER,
    payload: data,
  };
};

export const get_singleUserbyUsername = (data) => {
  return {
    type: GETSINGLEUSERBYUSERNAME,
    payload: data,
  };
};
export const upload_userImg = (data) => {
  return {
    type: UPLOADUSERIMG,
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
    // console.log(res.data, "response from action redux");
    localStorage.setItem("userToken", res.data?.token);
    dispatch(login_true());
  } catch (error) {
    dispatch(login_fail());
  }
};

export const logedinUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("userToken");
    // console.log(token);
    if (token) {
      const res = await axios.get("http://localhost:8080/auth/logedin", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // console.log(res.data);
      dispatch(login_success(res.data));
    }
  } catch (error) {
    dispatch(login_fail());
  }
};

export const getCurrentUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/users?userId=${userId}`);

    dispatch(get_CurrentUser(res.data));
  } catch (error) {
    dispatch(login_fail());
  }
};

export const uploadUserImg = (userId, data) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:8080/users/${userId}`, data);
    dispatch(upload_userImg());
  } catch (error) {
    console.log(error);
  }
};

export const getSingleUserbyusername = (username) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/users?username=${username}`
    );
    console.log(res.data);

    dispatch(get_singleUserbyUsername(res.data));
  } catch (error) {
    dispatch(login_fail());
  }
};
