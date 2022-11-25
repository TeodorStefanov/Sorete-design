import React, { useEffect, useState } from "react";
import BestItem from "../bestitem";

import styles from "./index.module.css";
const BestItems = () => {
  const [products, setProducts] = useState([]);
  const getGaufreProducts = async () => {
    const promise = await fetch("/products/gaufre");
    const response = await promise.json();
    setProducts(response);
  };
  const renderProducts = () => {
    return products.map((el, index) => {
      return (
        <BestItem
          id={el._id}
          picture={el.imageUrl}
          name={el.name}
          price={el.price}
          key={index}
        />
      );
    });
  };
  useEffect(() => {
    getGaufreProducts();
  }, []);

  return <div className={styles.container}>{renderProducts()}</div>;
};

export default BestItems;
