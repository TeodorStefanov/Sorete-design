import React, { useState } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
const LinkComponent = ({ link, title }) => {
  return (
    <div className={styles["list-item"]}>
      <Link onClick={() => window.scrollTo(0, 0)} to={link} className={styles.link}>
        {title}
      </Link>
    </div>
  );
};
export default LinkComponent;
