import React from "react";
import styles from "./index.module.css";
const WrongUser = ({ value }) => {
  return <div className={styles.wrongUser}>{value} </div>;
};

export default WrongUser;
