import React, { useContext } from "react";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import UserContext from "../../../Context";
const HeaderLink = () => {
  const { loggedIn, logOut, user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Link to="/about" className={styles.about}>
        About us
      </Link>

      <section className={styles.login}>
        {loggedIn ? (
          <div className={styles.logged}>
            <img src={user.picture} className={styles.picture} />
            <Link to="/" className={styles.link} onClick={logOut}>
              Изход
            </Link>
          </div>
        ) : (
          <Link to="/login" className={styles.link}>
            Вход
          </Link>
        )}
      </section>
    </div>
  );
};

export default HeaderLink;
