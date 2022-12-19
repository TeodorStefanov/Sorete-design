import React from "react";
import picOne from "../../../images/itemmenu/picOne.jpg";
import picTwo from "../../../images/itemmenu/picTwo.jpg";
import picThree from "../../../images/itemmenu/picThree.jpg";
import picFour from "../../../images/itemmenu/picFour.jpg";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
const ItemMenu = () => {
  const navigate = useNavigate();
  const handleClickTowels = () => {
    navigate("/Towels");
    window.scrollTo(0, 0);
  };
  const handleClickBathrobes = () => {
    navigate("/Bathrobes");
    window.scrollTo(0, 0);
  };
  const handleClickBathRugsAndMats = () => {
    navigate("/Bath-Rugs-and-Mats");
    window.scrollTo(0, 0);
  };
  const handleClickBathAccessories = () => {
    navigate("/BathAccessories");
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.container}>
      <div className={styles.pictureContainer} onClick={handleClickTowels}>
        <img className={styles.picture} src={picOne} />
        <div className={styles.text}>Towels</div>
      </div>
      <div className={styles.pictureContainer} onClick={handleClickBathrobes}>
        <img className={styles.picture} src={picTwo} />
        <div className={styles.text}>Bathrobes</div>
      </div>
      <div
        className={styles.pictureContainer}
        onClick={handleClickBathRugsAndMats}
      >
        <img className={styles.picture} src={picThree} />
        <div className={styles.text}>Bath Rugs & Mats</div>
      </div>
      <div
        className={styles.pictureContainer}
        onClick={handleClickBathAccessories}
      >
        <img className={styles.picture} src={picFour} />
        <div className={styles.text}>Bath Accessories</div>
      </div>
    </div>
  );
};
export default ItemMenu;
