import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./index.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerText}>
        <h1>Контакти</h1>
        <p>България, град Варна</p>
      </div>
      <section className={styles.a}>
        <a href="https://www.youtube.com">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
