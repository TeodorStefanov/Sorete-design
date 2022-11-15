import React from "react";
import styles from "./index.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
const CartItem = ({
  imageUrl,
  name,
  quantityL,
  quantityM,
  quantityS,
  price,
  total,
}) => {
  return (
    <div className={styles.container}>
      <img className={styles.picture} src={imageUrl}></img>
      <div className={styles.main}>
        <div className={styles.left}>
          <h1 className={styles.name}>{name}</h1>
          <ul className={styles.price}>
            Quantity:
            <li>Size L: {quantityL}</li>
            <li>Size M: {quantityM}</li>
            <li>Size S: {quantityS}</li>
          </ul>
        </div>
        <div className={styles.right}>
          <p>
            <b>{total} BGN</b>
          </p>
          <FontAwesomeIcon className={styles.button} icon={faTrashCan} />
        </div>
      </div>
    </div>
  );
};
export default CartItem;
