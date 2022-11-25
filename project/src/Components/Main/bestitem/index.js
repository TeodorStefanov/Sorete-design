import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
const BestItem = ({ picture, name, price, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${id}`);
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <img className={styles.picture} src={picture}></img>
      <p className={styles.name}>{name}</p>
      <span className={styles.price}>{price} BGN</span>
    </div>
  );
};
export default BestItem

