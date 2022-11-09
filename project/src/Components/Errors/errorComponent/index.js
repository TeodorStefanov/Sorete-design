import React, { useContext, useEffect } from "react";
import UserContext2 from "../../../Context2";

import styles from "./index.module.css";

const ErrorComponent = () => {
  const context = useContext(UserContext2);
  const handleSubmit = () => {
    context.error2();
  };
  return (
    <div className={styles.container}>
      Wrong password
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ErrorComponent;
