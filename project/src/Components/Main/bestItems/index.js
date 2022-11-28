import React, { useEffect, useState } from "react";
import BestItem from "../bestitem";

import styles from "./index.module.css";
const BestItems = () => {
  const [products, setProducts] = useState([]);
  const [productsColors, setProductsColors] = useState([]);
  const [changeProducts, setChangeProducts] = useState(true);
  const getGaufreProducts = async () => {
    const promise = await fetch("/products/gaufreColors");
    const response = await promise.json();
    setProducts(response.products);
    setProductsColors(response.productsColors);
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
  const renderProductsColors = () => {
    return productsColors.map((el, index) => {
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

  return (
    <div>
      <div>
        <button
          type="button"
          className={styles.productsButton}
          onClick={() => {
            setChangeProducts(true);
          }}
        >
          SUSTAINABLE COLLECTIONS
        </button>
        <button
          type="button"
          className={styles.productsColorsButton}
          onClick={() => {
            setChangeProducts(false);
          }}
        >
          NEW COLORS
        </button>
      </div>
      {changeProducts ? (
        <div className={styles.container}>{renderProducts()}</div>
      ) : (
        <div className={styles.container}>{renderProductsColors()}</div>
      )}
    </div>
  );
};

export default BestItems;
