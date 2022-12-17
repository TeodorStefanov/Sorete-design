import React, { useContext, useState } from "react";
import getNavigation from "../../../utils/navigation";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "../../Other/link";
import UserContext from "../../../Context";
import { Navigate, useNavigate } from "react-router-dom";
const Aside = () => {
  const context = useContext(UserContext);
  const [searchMenu, setSearchMenu] = useState("");
  const { loggedIn, user } = context;

  const links = getNavigation(loggedIn, user);
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate(`/searchPage/${searchMenu}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <aside className={styles.container}>
      <nav className={styles["list-item"]}>
        {links.map((el, index) => {
          return <Link link={el.link} title={el.title} key={index}></Link>;
        })}
      </nav>
      <div>
        <input
          className={styles.div}
          value={searchMenu}
          onChange={(event) => setSearchMenu(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search our catalog"
        ></input>
        <FontAwesomeIcon
          className={styles.magnifyingGlass}
          icon={faMagnifyingGlass}
          onClick={handleClick}
        />
      </div>
    </aside>
  );
};

export default Aside;
