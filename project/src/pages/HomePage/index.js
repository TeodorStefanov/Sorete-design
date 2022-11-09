import React from "react";
import Header from "../../Components/headers/header";
import ItemMenu from "../../Components/Main/itemMenu";
import Items from "../../Components/Main/items";
import PageWrapper from "../../Components/page-wrapper";

const HomePage = () => {
  return (
    <PageWrapper>
      <Header />
      <Items />
      <ItemMenu />
    </PageWrapper>
  );
};

export default HomePage;
