import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../Components/Other/input";
import PageWrapper from "../../Components/page-wrapper";
import {
  passwordValidator,
  rePasswordValidator,
} from "../../utils/registration";
import styles from "./index.module.css";
const ChangedPasswordPage = () => {
  const params = useParams();
  const userId = params.userId;
  const uniqueString = params.uniqueString;
  const [password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [activeted, setActiveted] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleBlurPassword = () => {
    setPasswordError(passwordValidator(password));
  };
  const handleBlurRePassword = () => {
    setRePasswordError(rePasswordValidator(password, rePassword));
  };
  const getVerified = async () => {
    const promise = await fetch(`/getVerified/${userId}/${uniqueString}`);
    const response = await promise.json();
    if (promise.status === 200) {
      setActiveted(true);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const promise = await fetch(`/changePassword/${userId}/${uniqueString}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, rePassword }),
    });
    const response = await promise.json();
    if (promise.status === 200) {
      navigate("/login");
    } else {
      setActiveted(false);
    }
  };
  useEffect(() => {
    getVerified();
  }, []);

  return (
    <PageWrapper>
      {!activeted ? (
        <div>Error. Your link has been activeted already or wrong details</div>
      ) : (
        <div className={styles.container}>
          <p>
            <b className={styles.top}>Enter your new Password</b>
          </p>
          <form onSubmit={handleSubmit}>
            <Input
              name="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              lebal="Password"
              placeHolder="Enter your Password"
              onBlur={handleBlurPassword}
              error={passwordError}
            />
            <Input
              name="rePassword"
              value={rePassword}
              type="password"
              onChange={(e) => setRepassword(e.target.value)}
              lebal="Confirm Password"
              placeHolder="Confirm your password"
              onBlur={handleBlurRePassword}
              error={rePasswordError}
            />
            <button className={styles.submit} type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </PageWrapper>
  );
};
export default ChangedPasswordPage;
