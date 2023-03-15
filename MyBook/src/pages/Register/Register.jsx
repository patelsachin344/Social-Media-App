import "./Register.css";

import React, { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const handleChange = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        passwordAgain: passwordAgain.current.value,
      };
      try {
        await axios.post("http://localhost:8080/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
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
          <form className="loginBox" onSubmit={handleChange}>
            <input
              placeholder="Username"
              required
              ref={username}
              type="text"
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="loginInput"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              minLength="6"
              type="password"
              className="loginInput"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              minLength="6"
              type="password"
              className="loginInput"
            />
            <button className="loginButton">Sign Up</button>
            {/* <Link to={"/login"}>
              <button className="loginRegisterButton">Log into Account</button>
            </Link> */}

            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};
