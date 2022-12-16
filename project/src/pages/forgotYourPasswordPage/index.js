import React, { useState } from "react";
import PageWrapper from "../../Components/page-wrapper";
import styles from "./index.module.css";
const ForgotYourPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailResponse, setEmailResponse] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const promise = await fetch(`/changePassword/${email}`);
    const response = await promise.json();
    if (promise.status === 200) {
      setEmailResponse("Please check your email to proceed");
    } else {
      setEmailResponse("The email is not valid.");
    }
  };
  return (
    <PageWrapper>
      {emailResponse ? (
        <div>{emailResponse}</div>
      ) : (
        <div className={styles.container}>
          <h1>Forgot your password?</h1>
          <span>
            Enter your email adress associated with your Sorete account.
          </span>
          <form className={styles.emailForm} onSubmit={handleSubmit}>
            <label className={styles.EmailLabel}>
              <input
                className={styles.emailInput}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </label>
            <button className={styles.emailButton} type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </PageWrapper>
  );
};
export default ForgotYourPasswordPage;
