import React, { useState } from "react";
import PageWrapper from "../../Components/page-wrapper";
import picOne from "../../images/contactPage/block1_202.jpg";
import imgTwo from "../../images/contactPage/block1_204.jpg";
import {
  nameValidator,
  emailValidator,
  messageValidator,
} from "../../utils/email";
import styles from "./index.module.css";
const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name &&
      email &&
      message &&
      nameError === "" &&
      emailError === "" &&
      messageError === ""
    ) {
      const promise = await fetch("/contactsEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });
      if (promise.status === 200) {
        alert("Your message has been sand.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };
  const handleBlurName = () => {
    setNameError(nameValidator(name));
  };
  const handleBlurEmail = () => {
    setEmailError(emailValidator(email));
  };
  const handleBlurMessage = () => {
    setMessageError(messageValidator(message));
  };
  return (
    <PageWrapper>
      <div className={styles.container}>
        <img src={picOne} className={styles.picture} />
        <div className={styles.top}>
          <h1>Contacts</h1>
          <p>
            We hope you've enjoyed our collections. We would love to hear from
            you. <br />
            If you need any help or just want to say hi, please feel free to get
            in touch with us.
          </p>
        </div>
        <div className={styles.middle}>
          <img src={imgTwo} className={styles.pictureTwo} />
          <form className={styles.middleForm} onSubmit={handleSubmit}>
            <p className={styles.middleP}>Contact us</p>
            <p>Please let us know if you need any further information.</p>
            <label htmlFor="name" type="text">
              Name
              <input
                id="name"
                className={`${styles.middleInputName} ${
                  !nameError ? styles.errorDiv : ""
                }`}
                value={name}
                onBlur={handleBlurName}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {nameError ? (
              <div className={styles.errorMessage}>{nameError}</div>
            ) : (
              ""
            )}
            <label htmlFor="email" type="email">
              Email
              <input
                id="email"
                className={`${styles.middleInputEmail} ${
                  !emailError ? styles.errorDiv : ""
                }`}
                onBlur={handleBlurEmail}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {emailError ? (
              <div className={styles.errorMessage}>{emailError}</div>
            ) : (
              ""
            )}
            <label htmlFor="message" type="text">
              Message
              <input
                id="message"
                type="text"
                onBlur={handleBlurMessage}
                required
                className={`${styles.middleInputMessage} ${
                  !messageError ? styles.errorDiv : ""
                }`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            {messageError ? (
              <div className={styles.errorMessage}>{messageError}</div>
            ) : (
              ""
            )}
            <button type="submit" className={styles.middleButton}>
              Send
            </button>
          </form>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <p className={styles.bottomP}>HEAD-QUARTERS</p>
            <p>
              22 Tsar Kaloyan Street, <br />
              Sofia Bulgaria
            </p>
            <p>
              Email: sorete@abc.com <br />
              Tel: +359 2 428 35 <br />
              Fax: +359 2 428 36
            </p>
          </div>
          <div className={styles.bottomMiddle}>
            <p className={styles.bottomP}>LOGISTICS</p>
            <p>
              12 Tsar Shishman Street, <br />
              Sofia Bulgaria
            </p>
            <p>
              Email: soreteLogistics@abc.com <br />
              Tel: +359 2 533 28 <br />
              Fax: +359 2 533 27
            </p>
          </div>
          <div className={styles.bottomRight}>
            <p className={styles.bottomP}>SHOWROOM AND COMMERCIAL OFFICE</p>
            <p>
              20 Tsar Boris III Streen, <br />
              Sofia Bulgaria
            </p>
            <p>
              Email: soreteOffice@abc.com <br />
              Tel: +359 2 422 22 <br />
              Fax: +359 2 422 23
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
export default ContactPage;
