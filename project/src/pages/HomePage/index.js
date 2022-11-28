import React from "react";
import Header from "../../Components/headers/header";
import BestItems from "../../Components/Main/bestItems";
import BottomPictures from "../../Components/Main/bottomPictures";
import ConceptMenu from "../../Components/Main/conceptMenu";
import ItemMenu from "../../Components/Main/itemMenu";
import Items from "../../Components/Main/items";
import PageWrapper from "../../Components/page-wrapper";
import styles from "./index.module.css";
import pictureOne from "../../images/bottomPicture/block1_4.jpg";
import pictureTwo from "../../images/bottomPicture/block2_4.jpg";
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
      <div className={styles.pictures}>
        <div className={styles.left}>
          <img src={pictureOne} className={styles.pictureOne} />
          <div className={styles.leftMiddle}>
            <p>CELEBRATE YOUR BATHROOM WITH US</p>
            <h2>Sorete Bath Fashion</h2>
            <p>
              Our philosophy is simple: we want our products to coordinate with
              each other, to mix and match allowing our customers to create a
              unique and personalized environment.
            </p>
          </div>
        </div>
        <img src={pictureTwo} className={styles.pictureTwo} />
      </div>
    </PageWrapper>
  );
};

export default HomePage;
