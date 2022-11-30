import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../../Context";
const HeaderLink = () => {
  const navigate = useNavigate();
  const { loggedIn, logOut, user, cartItems } = useContext(UserContext);
  const [quantityCart, setQuantityCart] = useState(0);
  const handleClick = () => {
    const id = user._id;
    navigate(`/${id}/cart`);
    window.scrollTo(0, 0);
  };
  const handleClickNew = () => {
    navigate("/profile");
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.container}>
      <Link to="/about" className={styles.about}>
        About us
      </Link>

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
              className={styles.picture}
              onClick={handleClickNew}
            />
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
