import React from "react";
import picOne from "../../../images/bottomPictures/1643905766_394e7ca207a0c8c6bf1cb71760cd3f9d.jpg";
import picTwo from "../../../images/bottomPictures/block1_48.jpg";
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
        <p className={styles.rightTop}>SUSTAINABLE BATH LINENS</p>
        <p className={styles.rightBottоm}>
          The perfect combination of sustainability and comfort.
        </p>
      </div>
    </div>
  );
};
export default BottomPictures;
