import React from "react";
const UserContext = React.createContext({
  loggedIn: false,
  user: null,
  cartItems: 0,
  setCartItems: () => {},
  logIn: () => {},
  logOut: () => {},
});

export default UserContext;
