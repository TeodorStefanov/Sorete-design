import React, { Component } from "react";
import getNavigation from "../../../utils/navigation";

import styles from "./index.module.css";
import Link from "../../Other/link";
import UserContext from "../../../Context";
class Aside extends Component {
  constructor(props) {
    super(props);
  }
  static contextType = UserContext;
  render() {
    const { loggedIn, user } = this.context;
    const links = getNavigation(loggedIn, user);
    return (
      <aside className={styles.container}>
        <nav className={styles["list-item"]}>
          {links.map((el, index) => {
            return <Link link={el.link} title={el.title} key={index}></Link>;
          })}
        </nav>
      </aside>
    );
  }
}

export default Aside;
