import React from "react";
import styles from "./index.module.css";
const CartItem = ({
  imageUrl,
  name,
  quantityL,
  quantityM,
  quantityS,
  price,
}) => {
  return (
    <div className={styles.container}>
      <img className={styles.picture} src={imageUrl}></img>
      <div className={styles.main}>
        <div className={styles.left}>
          <h1 className={styles.name}>{name}</h1>
          <ul className={styles.price}>
            <b>Quantity:</b>
            <li>L: {quantityL}</li>
            <li>M: {quantityM}</li>
            <li>S: {quantityS}</li>
          </ul>
          <p>
            <b>Price:</b> {price} BGN
          </p>
        </div>
        <div className={styles.right}>
          <p>Total:</p>
          <button>Remove</button>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
