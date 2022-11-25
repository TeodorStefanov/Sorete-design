import React from "react";
import Header from "../../Components/headers/header";
import BestItems from "../../Components/Main/bestItems";
import ItemMenu from "../../Components/Main/itemMenu";
import Items from "../../Components/Main/items";
import PageWrapper from "../../Components/page-wrapper";
import styles from "./index.module.css";

const HomePage = () => {
  return (
    <PageWrapper>
      <Header />
      <div className={styles.container}>
        <span>New Collection</span>
        <h1>Best Sellers</h1>
      </div>
      <BestItems />
      <ItemMenu />
    </PageWrapper>
  );
};

export default HomePage;
