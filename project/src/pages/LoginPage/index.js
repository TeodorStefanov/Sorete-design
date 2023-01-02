import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Other/input";
import PageWrapper from "../../Components/page-wrapper";
import UserContext from "../../Context";
import styles from "./index.module.css";
import { usernameValidator, passwordValidator } from "../../utils/login";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const context = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const promise = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const response = await promise.json();
    if (promise.status === 200) {
      context.logIn(response);
      navigate("/");
      window.scrollTo(0, 0);
    }
  };
  const handleClick = () => {
    navigate("/forgotYourPassword");
  };
  const handleBlurUsername = () => {
    setUsernameError(usernameValidator(username));
  };
  const handleBlurPassword = () => {
    setPasswordError(passwordValidator(password));
  };
  return (
    <PageWrapper>
      <div className={styles.container}>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            value={username}
            onBlur={handleBlurUsername}
            lebal="Username"
            onChange={(e) => setUsername(e.target.value)}
            placeHolder="Enter your username"
            error={usernameError}
          />
          <Input
            name="password"
            value={password}
            type="password"
            onBlur={handleBlurPassword}
            lebal="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeHolder="Enter yoyr password"
            error={passwordError}
          />
          <div className={styles.forgotYourPassword} onClick={handleClick}>
            Forgot your password?
          </div>
          <button className={styles.submit}>Login</button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
