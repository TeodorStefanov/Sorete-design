import React, { Component } from "react";
import Input from "../../Components/Other/input";

import PageWrapper from "../../Components/page-wrapper";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context";
import {
  emailValidator,
  familyNameValidator,
  firstNameValidator,
  passwordValidator,
  phoneNumberValidator,
  rePasswordValidator,
  usernameValidator,
} from "../../utils/registration";
class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      familyName: "",
      phoneNumber: "",
      username: "",
      password: "",
      rePassword: "",
      email: "",
      emailError: "",
      usernameError: "",
      passwordError: "",
      rePasswordError: "",
      firstNameError: "",
      familyNameError: "",
      isFailed: false,
      error: "",
    };
  }
  onChange = (event, type) => {
    const newState = {};

    newState[type] = event.target.value;

    this.setState(newState);
  };
  static contextType = UserContext;
  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state);
    const {
      firstName,
      familyName,
      phoneNumber,
      username,
      password,
      rePassword,
      email,
      emailError,
      usernameError,
      passwordError,
      rePasswordError,
      firstNameError,
      familyNameError,
      phoneNumberError,
    } = this.state;
    if (
      firstName &&
      familyName &&
      phoneNumber &&
      username &&
      password &&
      rePassword &&
      email &&
      emailError === "" &&
      usernameError === "" &&
      passwordError === "" &&
      rePasswordError === "" &&
      firstNameError === "" &&
      familyNameError === "" &&
      phoneNumberError === "" &&
      password === rePassword
    ) {
      const promise = await fetch("/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      });
      if (promise.status === 200) {
        this.props.history("/login");
      } else {
        const response = await promise.json();
        if (response["error"].includes("Username")) {
          this.setState({ isFailed: true });
          this.setState({ error: "Username already exists" });
        } else if (response["error"].includes("Email")) {
          this.setState({ isFailed: true });
          this.setState({ error: "Email already exists" });
        } else {
          this.setState({ isFailed: "There is an error" });
        }
      }
    } else {
      this.setState({ isFailed: true });
      this.setState({ error: "Please enter valid credentials" });
    }
  };
  handleBlurEmail = () => {
    this.setState({ emailError: emailValidator(this.state.email) });
  };
  handleBlurUsername = () => {
    this.setState({ usernameError: usernameValidator(this.state.username) });
  };
  handleBlurPassword = () => {
    this.setState({ passwordError: passwordValidator(this.state.password) });
  };
  handleBlurRePassword = () => {
    this.setState({
      rePasswordError: rePasswordValidator(
        this.state.password,
        this.state.rePassword
      ),
    });
  };
  handleBlurFirstName = () => {
    this.setState({ firstNameError: firstNameValidator(this.state.firstName) });
  };
  handleBlurFamilyName = () => {
    this.setState({
      familyNameError: familyNameValidator(this.state.familyName),
    });
  };
  handleBlurPhoneNumber = () => {
    this.setState({
      phoneNumberError: phoneNumberValidator(this.state.phoneNumber),
    });
  };
  render() {
    const {
      firstName,
      familyName,
      phoneNumber,
      username,
      password,
      rePassword,
      email,
      emailError,
      usernameError,
      passwordError,
      rePasswordError,
      firstNameError,
      familyNameError,
      phoneNumberError,
      error,
    } = this.state;
    
    
    return (
      <PageWrapper>
        <div className={styles.container}>
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            <h2>Personal information</h2>
            <Input
              name={"firstName"}
              value={firstName}
              onBlur={this.handleBlurFirstName}
              lebal={"First Name"}
              onChange={(e) => this.onChange(e, "firstName")}
              placeHolder={"Enter your first name"}
              error={firstNameError}
            />
            <Input
              name={"familyName"}
              value={familyName}
              onBlur={this.handleBlurFamilyName}
              lebal={"Family Name"}
              onChange={(e) => this.onChange(e, "familyName")}
              placeHolder={"Enter your family Name"}
              error={familyNameError}
            />
            <Input
              name={"phoneNumber"}
              type={"tel"}
              onBlur={this.handleBlurPhoneNumber}
              value={phoneNumber}
              lebal={"Phone number"}
              onChange={(e) => this.onChange(e, "phoneNumber")}
              placeHolder={"Enter your phone number"}
              error={phoneNumberError}
            />
            <Input
              name={"email"}
              value={email}
              onBlur={this.handleBlurEmail}
              lebal={"Email"}
              type="email"
              onChange={(e) => this.onChange(e, "email")}
              placeHolder={"Enter your email"}
              error={emailError}
            />
            <h2>User Information</h2>
            <Input
              name={"username"}
              value={username}
              onBlur={this.handleBlurUsername}
              lebal={"Username"}
              onChange={(e) => this.onChange(e, "username")}
              placeHolder={"Enter your username"}
              error={usernameError}
            />

            <Input
              name={"password"}
              value={password}
              onBlur={this.handleBlurPassword}
              lebal={"Password"}
              type="password"
              onChange={(e) => this.onChange(e, "password")}
              placeHolder={"Enter your password"}
              error={passwordError}
            />
            <Input
              name={"rePassword"}
              value={rePassword}
              onBlur={this.handleBlurRePassword}
              lebal={"Confirm Password"}
              type="text"
              onChange={(e) => this.onChange(e, "rePassword")}
              placeHolder={"Confirm your password"}
              error={rePasswordError}
            />

            <button type="submit" className={styles.submit}>
              registation
            </button>
          </form>
          {this.state.isFailed ? (
            <div className={styles.error}>{error}</div>
          ) : (
            ""
          )}
        </div>
      </PageWrapper>
    );
  }
}

export default (props) => <RegisterPage history={useNavigate()} />;
