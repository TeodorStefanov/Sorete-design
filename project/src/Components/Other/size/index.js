import React from "react";
import styles from "./index.module.css";
const Size = ({ value, onClickMinus, onClickPlus, price, size }) => {
  return (
    <div className={styles.main}>
      <span className={styles.size}>{size}</span>
      <div className={styles.qualityNumber}>
        <span onClick={onClickMinus}>-</span>
        <input type="text" className={styles.valueNumber} value={value} />
        <span onClick={onClickPlus}>+</span>
      </div>
      <span className={styles.price}>{price} BGN</span>
    </div>
  );
};
export default Size;
