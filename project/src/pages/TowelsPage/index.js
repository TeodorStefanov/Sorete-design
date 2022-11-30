import React, { useEffect, useState } from "react";
import Product from "../../Components/Main/products";
import PageWrapper from "../../Components/page-wrapper";
import styles from "./index.module.css";
const TowelsPage = ({ type }) => {
  const [towels, setTowels] = useState([]);
  const getTowels = async () => {
    const promise = await fetch(`/${type}`);
    const response = await promise.json();
    setTowels(response);
  };
  const renderTowels = () => {
    return towels.map((el, index) => {
      return (
        <Product
          id={el._id}
          imageUrl={el.imageUrl}
          imageUrlTwo={el.imageUrlTwo}
          name={el.name}
          price={el.price}
          key={index}
        />
      );
    });
  };
  useEffect(() => {
    getTowels();
  }, []);
  return (
    <PageWrapper>
      <div className={styles.container}>{renderTowels()}</div>
    </PageWrapper>
  );
};

export default TowelsPage;
