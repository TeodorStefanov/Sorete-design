import React, { useEffect, useState } from "react";
import Product from "../../Components/Main/products";
import PageWrapper from "../../Components/page-wrapper";
import styles from "./index.module.css";
const ProductsPage = ({ type }) => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const promise = await fetch(`/${type}`);
    const response = await promise.json();
    setProducts(response);
  };
  const renderProducts = () => {
    return products.map((el, index) => {
      return (
        <Product
          id={el._id}
          imageUrl={el.imageUrl}
          imageUrlTwo={el.imageUrlTwo}
          name={el.name}
          price={el.price}
          key={index}
          product={el.category}
        />
      );
    });
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <PageWrapper>
      <div className={styles.container}>{renderProducts()}</div>
    </PageWrapper>
  );
};

export default ProductsPage;
