import React from "react";
import PageWrapper from "../../Components/page-wrapper";
import styles from "./index.module.css";
import headerPic from "../../images/about/block1_273.jpg";
import firstPic from "../../images/about/firstPic.jpg";
import secondPic from "../../images/about/secondPic.jpg";
import thirdPic from "../../images/about/thirdPic.jpg";
const AboutPage = () => {
  return (
    <PageWrapper>
      <div className={styles.container}>
        <img className={styles.headerPic} src={headerPic} />
        <div className={styles.top}>
          <p>MADE IN BULGARIA. SINCE 1964.</p>
          <p className={styles.mainP}>Our Story</p>
          <p>
            Our journey began more than 46 years ago with our mother company,
            Sorete, the oldest existing company in Europe producing bath rugs.
            Over the years we have grown in experience, know-how and tradition,
            with a devoted team of experts that allowed us to expand our
            products range and led the way for Sorema to become one of the most
            prestigious manufacturers of bath textiles in the world.
          </p>
        </div>
        <div className={styles.middle}>
          <div className={styles.upperM}>
            <img className={styles.upperPic} src={firstPic} />
            <p className={styles.upperText}>
              Created by Manuel and Duarte Relvas in 1974, the early days were
              not easy for this father and son venture due to the Portuguese
              revolution. But the company persevered and grew, with product
              development and design being the company's motto and making it the
              oldest existing in Europe producing bath rugs.
            </p>
          </div>
          <div className={styles.middleM}>
            <p className={styles.middleText}>
              After spending most of their childhood holidays in the factory,
              Duarte's three sons have joined the team, full of determination to
              carry over the legacy of their father and grandfather and make
              Sorete even bigger household name in the textile industry in the
              north of Portugal.
            </p>
            <img className={styles.middlePic} src={secondPic} />
          </div>
          <div className={styles.bottomM}>
            <img className={styles.bottomPic} src={thirdPic}/>
            <p className={styles.bottomText}>
              With more than 140 employees, the Sorema family continues to grow,
              confident in its work, and always ready for whatever the future
              brings, certain that family bonds will continue to be the key to
              success.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
export default AboutPage;
