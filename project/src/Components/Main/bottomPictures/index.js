import React from "react";
import picOne from "../../../images/bottomPictures/block1_48.jpg";
import picTwo from "../../../images/bottomPictures/block3_48 (2).jpg";
import styles from "./index.module.css";
const BottomPictures = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={picOne} className={styles.leftPicture}></img>
        <p className={styles.leftBottom}>
          We are committed to sustainability, producing our own electrical
          energy and implementing water-saving measures while keeping
          high-quality standards and certifications.
        </p>
      </div>
      <div className={styles.right}>
        <img src={picTwo} className={styles.rightPicture}></img>
        <div className={styles.rightBottom}>
          <p className={styles.rightBottomTop}>SUSTAINABLE BATH LINENS</p>
          <p className={styles.rightBottоmBottom}>
            The perfect combination of sustainability and comfort.
          </p>
          <button className={styles.rightButton}>SHOP NOW</button>
        </div>
      </div>
    </div>
  );
};
export default BottomPictures;
