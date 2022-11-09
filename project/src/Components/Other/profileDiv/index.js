import React from "react";
import styles from "./index.module.css";

const DivComponent = ({ title, name, img }) => {
  return (
    <div className={styles.name}>
      {img ? <img className={styles.pic} src={img}></img> : ""}
      <b>{title}</b> {name}
    </div>
  );
};

export default DivComponent;
