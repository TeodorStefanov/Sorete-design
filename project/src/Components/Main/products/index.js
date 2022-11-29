import React, { useState } from "react";
import styles from "./index.module.css";
const Product = ({ imageUrl, name, price, imageUrlTwo }) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(imageUrl);
  return (
    <div className={styles.container}>
      <img
        className={styles.picture}
        src={!isHovered ? imageUrl : imageUrlTwo}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></img>
      <div className={styles.bottom}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>{price} BGN</span>
      </div>
    </div>
  );
};

export default Product;
