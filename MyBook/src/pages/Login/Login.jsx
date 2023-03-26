import "./Login.css";

import React, { useEffect, useRef, useState } from "react";
import { getLoginUser } from "../../context/AuthAction";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logedinUser, loginUser } from "../../redux/Login/action";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [log, setLog] = useState(false);
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state) => state.user);
  // console.log(currentUser, "currentUser");
  console.log(loading, "loading");
  const handlesubmin = (e) => {
    e.preventDefault();
    console.log(email.current.value, password.current.value);
    dispatch(
      loginUser({
        email: email.current.value,
        password: password.current.value,
      })
    );
    setLog(true);
    navigate("/");
  };
  useEffect(() => {
    dispatch(logedinUser());
  }, [currentUser?.user]);

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
              {/* {loading ? <CircularProgress size="30px" /> : "Log In"} */}
              Login
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to={"/register"}>
              <button className="loginRegisterButton">
                {loading ? <CircularProgress /> : "Create a New Account"}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
