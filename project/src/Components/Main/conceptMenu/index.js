import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const ConceptMenu = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/about");
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.container}>
      <p className={styles.top}>SUSTAINABILITY-FOCUSED & DESIGN-ORIENTED</p>
      <h1 className={styles.topMain}>Our Concept</h1>
      <p className={styles.main}>
        Sorete Bath Fashion is a Bulgarian-rooted brand guided by a dedicated
        team with unmatched textile expertise. With a sustainability-focused
        approach and design-oriented mindset, our brand develops sophisticated
        collections that combine design and quality, providing timeless bath
        essentials of simple lines that deliver comfort and aesthetics.
      </p>
      <button className={styles.button} onClick={handleClick}>
        Read More
      </button>
    </div>
  );
};

export default ConceptMenu;
