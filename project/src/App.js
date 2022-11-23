import React, { Component } from "react";
import UserContext from "./Context";

import UserContext2 from "./Context2";
function getCookie(name) {
  const cookieValue = document.cookie.match("\\b" + name + "=([^;]*)\\b");
  return cookieValue ? cookieValue[1] : null;
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: null,
      cartItems: 0,
      error: false,
    };
  }
  setCartItems = (number) => {
    console.log("asdddd", number);
    this.setState({ cartItems: number });
    console.log( 'asdddd', number);
  };
  logIn = (user) => {
    console.log(user.cart.product.length);
    this.setState({
      loggedIn: true,
      user,
      cartItems: user.cart.product.length,
    });
  };
  logOut = () => {
    document.cookie = "aid= ; expires = Thu, 1 Jan 1970 00:00:01 GMT;path=/";
    console.log("asd");
    this.setState({
      loggedIn: false,
      user: null,
    });
  };

  async componentDidMount() {
    const token = getCookie("aid");
    if (!token) {
      this.logOut();
      this.setState({ error: true });
      return;
    }
    if (token) {
      const promise = await fetch("/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const response = await promise.json();

      if (response) {
        this.logIn(response);
        this.setState({ error: true });
      } else {
        this.setState({ error: true });
      }
    }
  }
  render() {
    const { loggedIn, user, cartItems } = this.state;
    if (!this.state.error) {
      return "";
    }
    return (
      <UserContext.Provider
        value={{
          loggedIn,
          user,
          cartItems,
          setCartItems: this.setCartItems,
          logIn: this.logIn,
          logOut: this.logOut,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default App;
