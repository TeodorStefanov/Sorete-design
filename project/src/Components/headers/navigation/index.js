import React, { Component } from "react";
import getNavigation from "../../../utils/navigation";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "../../Other/link";
import UserContext from "../../../Context";
class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchMenu: "",
    };
  }
  static contextType = UserContext;

  handleClick = async () => {
    const { searchMenu } = this.state;
    const promise = await fetch(`/search/${searchMenu}`);
  };
  onChange = (event, type) => {
    const newState = {};
    newState[type] = event.target.value;
    this.setState(newState);
  };
  render() {
    const { searchMenu } = this.state;
    const { loggedIn, user } = this.context;
    const links = getNavigation(loggedIn, user);
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
            onChange={(e) => this.onChange(e, "searchMenu")}
          ></input>
          <FontAwesomeIcon
            className={styles.magnifyingGlass}
            icon={faMagnifyingGlass}
            onClick={this.handleClick}
          />
        </div>
      </aside>
    );
  }
}

export default Aside;
