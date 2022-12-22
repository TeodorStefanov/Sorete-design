import React, { useContext } from "react";
import styles from "./index.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../../Context";
const CartItem = ({ imageUrl, name, total, products, quantity, index }) => {
  const context = useContext(UserContext);
  const { user, setCartItems, cartProducts } = context;
  const handleClick = async () => {
    const newProducts = products.splice(index, 1);
    const newQuantity = quantity.splice(index, 1);
    const promise = await fetch("/deleteItem", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.cart._id,
        product: products,
        quantity: quantity,
      }),
    });
    if (promise.status === 200) {
      const response = await promise.json();
      setCartItems(response.product.length);
    }
  };
  return (
    <div className={styles.container}>
      <img className={styles.picture} src={imageUrl}></img>
      <div className={styles.main}>
        <div className={styles.left}>
          <h1 className={styles.name}>{name}</h1>
          <ul className={styles.price}>
            Quantity:
            <li>Size L: {quantity[index].L}</li>
            <li>Size M: {quantity[index].M}</li>
            <li>Size S: {quantity[index].S}</li>
          </ul>
        </div>
        <div className={styles.right}>
          <p>
            <b>{total} BGN</b>
          </p>
          <FontAwesomeIcon
            className={styles.button}
            icon={faTrashCan}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};
export default CartItem;
