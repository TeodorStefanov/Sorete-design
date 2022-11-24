import React from "react";
const UserContext = React.createContext({
  loggedIn: false,
  user: null,
  cartItems: 0,
  cartProduct: [],
  cartQuantity: [],
  setCartItems: () => {},
  setCartProduct: () => {},
  setCartQuantity: () => {},
  logIn: () => {},
  logOut: () => {},
});

export default UserContext;
