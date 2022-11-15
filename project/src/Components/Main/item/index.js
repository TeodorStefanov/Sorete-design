import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const Item = ({ name, description, imageUrl, price, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${id}`);
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.top}>
        <img className={styles.image} src={imageUrl}></img>
      </div>
      <div className={styles.bottom}>
        <div>{name}</div>
        <div>{price.toFixed(2)} BGN</div>
      </div>
    </div>
  );
};

export default Item;
