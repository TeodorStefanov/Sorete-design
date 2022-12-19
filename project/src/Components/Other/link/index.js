import React, { useState } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
const LinkComponent = ({ link, title }) => {
  return (
    <div className={styles["list-item"]}>
      <Link to={link} className={styles.link}>
        {title}
        {window.scrollTo(0, 0)}
      </Link>
    </div>
  );
};
export default LinkComponent;
