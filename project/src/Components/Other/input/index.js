import React from "react";
import styles from "./index.module.css";

const Input = ({
  name,
  lebal,
  onChange,
  value,
  type,
  placeHolder,
  onBlur,
  error,
}) => { 
  return (
    <div className={styles.container}>
      <label htmlFor={name}>
        <div className={styles["input-label"]}>
          <b>{lebal}</b>
        </div>
        <input
          id={name}
          className={styles.input}
          onBlur={onBlur}
          value={value}
          type={type}
          required
          onChange={onChange}
          placeholder={placeHolder}
        />
      </label>
      <div className={styles.error}>{error ? error : ""}</div>
    </div>
  );
};

export default Input;
