import React from "react";
import styles from "./index.module.css";
const Size = ({ value, onClickMinus, onClickPlus, price, size, onChange }) => {
  return (
    <div className={styles.main}>
      <span className={styles.size}>{size}</span>
      <div className={styles.qualityNumber}>
        <span className={styles.span} onClick={onClickMinus}>-</span>
        <input
          type="text"
          className={styles.valueNumber}
          value={value}
          onChange={onChange}
        />
        <span className={styles.span} onClick={onClickPlus}>+</span>
      </div>
      <span className={styles.price}>{price} BGN</span>
    </div>
  )
}
export default Size;
