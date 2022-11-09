import React, { useState } from "react";
import styles from "./index.module.css";
const FrontPage = () => {
  const [picture, setPicture] = useState();
  const arr = [
    "https://res.cloudinary.com/daqcaszkf/image/upload/v1667335480/287135953_388675666648013_1870348635871223426_n_hs9o3l.jpg",
    "https://res.cloudinary.com/daqcaszkf/image/upload/v1667335487/185768023_131816965667219_6469047992459289791_n_ykbqdr.jpg",
    "https://res.cloudinary.com/daqcaszkf/image/upload/v1667335493/175114599_121370816711834_6594704411870767822_n_lewfmi.jpg",
    "https://res.cloudinary.com/daqcaszkf/image/upload/v1667335500/173574680_120133266835589_957808666085687877_n_pgl9xb.jpg",
    "https://res.cloudinary.com/daqcaszkf/image/upload/v1667335506/173569684_120128153502767_2606731922365847447_n_axfx8n.jpg",
    "https://res.cloudinary.com/daqcaszkf/image/upload/v1667335514/173494629_120133263502256_2277135619240773906_n_czfpb6.jpg",
  ];
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={arr[0]} className={styles.leftPicture}></img>
      </div>
      <div className={styles.right}>
        <img src={arr[1]} className={styles.rightPictureLeftTop}></img>
        <img src={arr[2]} className={styles.rightPictureRightTop}></img>
        <img src={arr[3]} className={styles.rightPictureBottom}></img>
      </div>
    </div>
  );
};

export default FrontPage;
