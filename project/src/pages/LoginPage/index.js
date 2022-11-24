import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Other/input";
import PageWrapper from "../../Components/page-wrapper";
import WrongUser from "../../Components/NOT USED/wrongUser";
import UserContext from "../../Context";
import UserContext2 from "../../Context2";
import styles from "./index.module.css";
import { usernameValidator, passwordValidator } from "../../utils/login";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const context = useContext(UserContext);
  const context2 = useContext(UserContext2);
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
    if (promise.status === 200) {
      const response = await promise.json();
      context.logIn(response);
      navigate("/");
    }
    if (promise.status === 401) { 
      setIsFailed(true);
      //context2.isError2();
    }
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
        <h1>Влез</h1>
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
            onBlur={handleBlurPassword}
            lebal="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeHolder="Enter yoyr password"
            error={passwordError}
          />
          <button className={styles.submit}>Login</button>
        </form>
        {isFailed ? <WrongUser /> : ""}
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
