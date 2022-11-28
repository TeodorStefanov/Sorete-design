import React from "react";
import Header from "../../Components/headers/header";
import BestItems from "../../Components/Main/bestItems";
import BottomPictures from "../../Components/Main/bottomPictures";
import ConceptMenu from "../../Components/Main/conceptMenu";
import ItemMenu from "../../Components/Main/itemMenu";
import Items from "../../Components/Main/items";
import PageWrapper from "../../Components/page-wrapper";
import styles from "./index.module.css";
import BottomContextPicture from "../../Components/Main/bottomContextPicture";
const HomePage = () => {
  return (
    <PageWrapper>
      <Header />
      <div className={styles.container}>
        <span>New Collection</span>
        <h1 className={styles.topBottom}>Best Sellers</h1>
      </div>
      <BestItems />
      <ItemMenu />
      <ConceptMenu />
      <BottomPictures />
      <BottomContextPicture />
    </PageWrapper>
  );
};

export default HomePage;
