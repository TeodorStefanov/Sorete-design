import React, { Component } from "react";
import Input from "../../Components/Other/input";
import PageWrapper from "../../Components/page-wrapper";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      descriptionTwo: "",
      composition: "",
      imageUrl: "",
      imageUrlTwo: "",
      price: "",
      category: "",
    };
  }

  onChange = (event, type) => {
    const newState = {};
    newState[type] = event.target.value;

    this.setState(newState);
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const promise = await fetch(`/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(this.state),
      });
      if (promise.status(200)) {
        this.props.history("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "daqcaszkf",
        uploadPreset: "softuni",
      },
      (error, result) => {
        if (error) {
          console.log("Error:", error);
        }
        if (result.event === "success") {
          const newState = {};
          newState["imageUrl"] = result.info.url;
          this.setState(newState);
        }
      }
    );
    widget.open();
  };
  openWidgetTwo = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "daqcaszkf",
        uploadPreset: "softuni",
      },
      (error, result) => {
        if (error) {
          console.log("Error:", error);
        }
        if (result.event === "success") {
          const newState = {};
          newState["imageUrlTwo"] = result.info.url;
          this.setState(newState);
        }
      }
    );
    widget.open();
  };

  render() {
    const { name, description, descriptionTwo, composition, price, category } =
      this.state;
    return (
      <PageWrapper>
        <div className={styles.container}>
          <form onSubmit={this.handleSubmit} className={styles.form}>
            <Input
              name="name"
              lebal="name"
              type="text"
              value={name}
              onChange={(e) => this.onChange(e, "name")}
            />
            <Input
              name="description"
              lebal="description"
              type="text"
              value={description}
              onChange={(e) => this.onChange(e, "description")}
            />
            <Input
              name="descriptionTwo"
              lebal="descriptionTwo"
              type="text"
              value={descriptionTwo}
              onChange={(e) => this.onChange(e, "descriptionTwo")}
            />
            <Input
              name="composition"
              lebal="composition"
              type="text"
              value={composition}
              onChange={(e) => this.onChange(e, "composition")}
            />
            <div>
              Image:
              <button type="button" onClick={this.openWidget}>
                Upload image
              </button>
            </div>
            <div>
              Image:
              <button type="button" onClick={this.openWidgetTwo}>
                Upload imageTwo
              </button>
            </div>
            <Input
              name="price"
              lebal="price"
              type="number"
              value={price}
              step={0.1}
              onChange={(e) => this.onChange(e, "price")}
            />
            <Input
              name="category"
              lebal="category"
              type="text"
              value={category}
              onChange={(e) => this.onChange(e, "category")}
            />
            <button type="submit">login</button>
          </form>
        </div>
      </PageWrapper>
    );
  }
}

export default (props) => <Admin history={useNavigate()} />;
