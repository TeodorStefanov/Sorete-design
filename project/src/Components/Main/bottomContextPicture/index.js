import React from "react";
import pictureOne from "../../../images/bottomPicture/block1_4.jpg";
import pictureTwo from "../../../images/bottomPicture/block2_4.jpg";
import styles from "./index.module.css";
const BottomContextPicture = () => {
  return (
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
  );
};

export default BottomContextPicture;
