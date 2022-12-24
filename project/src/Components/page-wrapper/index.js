import React from "react";
import Aside from "../headers/navigation";
import Footer from "../Footer/footer";
import styles from "./index.module.css";
import HeaderLink from "../headers/headerLink";

const PageWrapper = (props) => {
  return (
    <div className={styles.totalAll}>
      <HeaderLink />
      <div>
        <Aside />
        <main className={styles.all}>
          <div className={styles["inner-container"]}>{props.children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PageWrapper;
