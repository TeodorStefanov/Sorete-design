import React from "react";
import PageWrapper from "../../Components/page-wrapper";
import picOne from "../../images/contactPage/block1_202.jpg";
import imgTwo from "../../images/contactPage/block1_204.jpg";
import styles from "./index.module.css";
const ContactPage = () => {
  return (
    <PageWrapper>
      <div className={styles.container}>
        <img src={picOne} className={styles.picture} />
        <div className={styles.middle}>
          <h1>Contacts</h1>
          <p>
            We hope you've enjoyed our collections. We would love to hear from
            you.
            <div>
              If you need any help or just want to say hi, please feel free to
              get in touch with us.
            </div>
          </p>
        </div>
        <div className={styles.bottom}>
          <img src={imgTwo} className={styles.pictureTwo} />
          <form className={styles.bottomForm}>
            <p className={styles.bottomP}>Contact us</p>
            <p>Please let us know if you need any further information.</p>
            <lebal htmlFor="name" type="text">
              Name
            </lebal>
            <input id="name" className={styles.bottomInputName}></input>
            <lebal htmlFor="email" type="email">
              Email
            </lebal>
            <input className={styles.bottomInputEmail}></input>
            <lebal htmlFor="message" type="text">
              Message
            </lebal>
            <input type="text" className={styles.bottomInputMessage}></input>
            <button type="submit" className={styles.bottomButton}></button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};
export default ContactPage;
