import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
const Product = ({ id, imageUrl, name, price, imageUrlTwo, product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${product}/${id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <img
        className={styles.picture}
        src={!isHovered ? imageUrl : imageUrlTwo}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></img>
      <div className={styles.bottom}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>{price.toFixed(2)} BGN</span>
      </div>
    </div>
  );
};

export default Product;
