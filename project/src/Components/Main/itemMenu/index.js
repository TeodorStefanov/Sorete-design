import React from "react";
import picOne from "../../../images/itemmenu/picOne.jpg";
import picTwo from "../../../images/itemmenu/picTwo.jpg";
import picThree from "../../../images/itemmenu/picThree.jpg";
import picFour from "../../../images/itemmenu/picFour.jpg";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
const ItemMenu = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.pictureContainer}>
        <img className={styles.picture} src={picOne} />
        <div className={styles.text}>Centered</div>
      </div>
      <div className={styles.pictureContainer}>
        <img className={styles.picture} src={picTwo} />
        <div className={styles.text}>Centered</div>
      </div>
      <div className={styles.pictureContainer}>
        <img className={styles.picture} src={picThree} />
        <div className={styles.text}>Centered</div>
      </div>
      <div className={styles.pictureContainer}>
        <img className={styles.picture} src={picFour} />
        <div className={styles.text}>Centered</div>
      </div>
    </div>
  );
};
export default ItemMenu;
