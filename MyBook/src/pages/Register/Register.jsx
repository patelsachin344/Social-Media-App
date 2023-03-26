import "./Register.css";

import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/Login/action";

export const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
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
      dispatch(signupUser(user));
      navigate("/login");
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">MyBook</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on MyBook.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleChange}>
            <input
              placeholder="Username"
              required
              ref={username}
              type="text"
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="registerInput"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              minLength="6"
              type="password"
              className="registerInput"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              minLength="6"
              type="password"
              className="registerInput"
            />
            <button className="registerButton">Sign Up</button>
            <Link to={"/login"}>
              <button className="registerRegisterButton">Log in</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
