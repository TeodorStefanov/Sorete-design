import React, { Component } from "react";
import Item from "../item";

import styles from "./index.module.css";
class Kartichki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    }; 
  }

  getItems = async () => {
    const promise = await fetch("http://localhost:9000/");
    const items = await promise.json();
    console.log(items);
    this.setState({ items });
  };
  renderItems = () => {
    const { items } = this.state;
    return items.map((el, index) => {
      return (
        <Item
          id={el._id}
          name={el.name}
          description={el.description}
          imageUrl={el.imageUrl}
          price={el.price}
          key={index}
        />
      );
    });
  };
  componentDidMount() {
    this.getItems();
  }
  render() {
    return <div className={styles.container}>{this.renderItems()}</div>;
  }
}

export default Kartichki;
