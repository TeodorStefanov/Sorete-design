import React, { useEffect, useState } from "react";
import imgOne from "../../113bc499ddc6df6ec03b7a272b3a16aa725fb922_bby.jpg";
import imgTwo from "../../images/banner23_gb.jpg";
import imgThree from "../../images/desktop_bath_towels_FP.jpg";
import styles from "./index.module.css";
const FrontPics = () => {
  const images = [imgOne, imgTwo, imgThree];
  const [pictures, setPictures] = useState(images);
  const [currentImg, setCurrentImg] = useState(0);
  useEffect(() => {
    const interval = setInterval(changeImage, 5000);
    return () => clearInterval(interval);
  }, [currentImg]);
  const changeImage = () => {
    let newCurrentImg = 0;
    const length = pictures.length;
    if (currentImg !== length - 1) {
      newCurrentImg = currentImg + 1;
      console.log(newCurrentImg);
    }

    setCurrentImg(newCurrentImg);
  };
  return (
    <div className={styles.container}>
      <img src={pictures[currentImg]} className={styles.picture}></img>
    </div>
  );
};
export default FrontPics;
