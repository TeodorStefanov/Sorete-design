import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../Components/Main/products";
import PageWrapper from "../../Components/page-wrapper";
import styles from "./index.module.css";
const SearchPage = () => {
  const params = useParams();
  const searchMenu = params.searchMenu;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getSearch = async () => {
    const promise = await fetch(`/search/${searchMenu}`);
    const response = await promise.json();
    if (response) {
      setIsLoading(false);
    }
    if (promise.status === 200) {
      setItems(response);
    }
  };
  const renderItems = () => {
    return items.map((el, index) => {
      return (
        <Product
          id={el.id}
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
    getSearch();
  }, [items]);
  return (
    <PageWrapper>
      {isLoading ? (
        <div>Loading</div>
      ) : items.length > 0 ? (
        <div className={styles.container}>{renderItems()}</div>
      ) : (
        <div>We did not find results for the search</div>
      )}
    </PageWrapper>
  );
};
export default SearchPage;
