import React, { useContext } from "react";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../../Context";
const HeaderLink = () => {
  const navigate = useNavigate();
  const { loggedIn, logOut, user, cartItems } = useContext(UserContext);
  const handleClick = () => {
    const id = user._id;
    navigate(`/${id}/cart`);
    window.scrollTo(0, 0);
  };
  const handleClickNew = () => {
    navigate("/profile");
    window.scrollTo(0, 0);
  };
  const handleClickNew2 = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.container}>
      <div>
        <Link to="/about" className={styles.about}>
          About us
        </Link>
        <Link to="/contacts" className={styles.contact}>
          Contact us
        </Link>
      </div>
      <div className={styles.logo} onClick={handleClickNew2}>
        Sorete Design
      </div>
      <section className={styles.login}>
        {loggedIn ? (
          <div className={styles.logged}>
            <FontAwesomeIcon
              className={styles.cartShopping}
              icon={faCartShopping}
              onClick={handleClick}
            />
            {cartItems > 0 ? (
              <span className={styles.span} onClick={handleClick}>
                {cartItems}
              </span>
            ) : (
              ""
            )}
            <img
              src={user.picture}
              className={`${styles.picture} ${
                cartItems === 0 ? styles.total : ""
              }`}
              onClick={handleClickNew}
              alt=""
            />
            <Link to="/" className={styles.link} onClick={logOut}>
              Log Out
            </Link>
          </div>
        ) : (
          <div className={styles.bottom}>
            <Link to="/login" className={styles.link}>
              Log In
            </Link>
            <Link to="/registration" className={styles.link}>
              Registration
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default HeaderLink;
