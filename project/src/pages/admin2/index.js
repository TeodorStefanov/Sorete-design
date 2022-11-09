import React, { Component } from "react";
import Input from "../../Components/Other/input";
import PageWrapper from "../../Components/page-wrapper";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.descriptionInput = React.createRef();
    this.imageUrlInput = React.createRef();
    this.priceInput = React.createRef();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("name:", this.nameInput.current.value);
    console.log("description:", this.descriptionInput.current.value);
    console.log("imageUrl:", this.imageUrlInput.current.value);
    console.log("price:", this.priceInput.current.value);
    const promise = await fetch(
      `http://localhost:9000/create?obj=${this.state}`
    );
  };
  render() {
    return (
      <PageWrapper>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">name:</label>
              <input ref={this.nameInput} id="name" />
            </div>
            <div>
              <label htmlFor="description">description:</label>
              <input ref={this.descriptionInput} id="description" />
            </div>
            <div>
              <label htmlFor="imageUrl">imageUrl:</label>
              <input ref={this.imageUrlInput} id="imageUrl" />
            </div>
            <div>
              <label htmlFor="price">price:</label>
              <input ref={this.priceInput} id="price" />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      </PageWrapper>
    );
  }
}

export default Admin;
