import React, { useContext } from "react";
import Header from "../headers/header";
import Aside from "../headers/navigation";
import Footer from "../Footer/footer";
import styles from "./index.module.css";
import HeaderLink from "../headers/headerLink";
import ErrorComponent from "../Errors/errorComponent";
import UserContext2 from "../../Context2";

const PageWrapper = (props) => {
  const { isError } = useContext(UserContext2);
  return (
    <div className={styles.totalAll}>
      <HeaderLink />
      <div>
        <Aside />
        <main className={styles.all}>
          <div className={styles["inner-container"]}>{props.children}</div>
        </main>
      </div> 
      {isError ? <ErrorComponent /> : ""}
      <Footer />
    </div>
  );
};

export default PageWrapper;
