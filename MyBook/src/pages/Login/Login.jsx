import "./Login.css";

import React, { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContextt";
import { getLoginUser } from "../../context/AuthAction";
import { CircularProgress } from "@material-ui/core";

export const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isLoading, error, dispatch } = useContext(AuthContext);
  const handlesubmin = (e) => {
    e.preventDefault();
    console.log(email.current.value, password.current.value);
    getLoginUser(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user?.payload.user, "from login");
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MyBook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on MyBook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handlesubmin}>
            <input
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              ref={password}
              minLength="6"
              className="loginInput"
            />
            <button className="loginButton">
              {isLoading ? (
                <CircularProgress color="white" size="30px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isLoading ? <CircularProgress /> : "Create a New Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
