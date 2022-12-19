import React, { useContext, useEffect, useState } from "react";
import CartItem from "../../Components/Other/CartItem";
import PageWrapper from "../../Components/page-wrapper";
import UserContext from "../../Context";
import styles from "./index.module.css";
const CartPage = () => {
  const {
    user,
    cartProducts,
    cartQuantity,
    setCartProduct,
    setCartQuantity,
    setCartItems,
  } = useContext(UserContext);
  const [checkCode, setCheckCode] = useState(false);
  const [buy, setBuy] = useState(false);
  const allTotal = () => {
    let allTotal = 0;
    cartProducts.map((el, index) => {
      const total =
        cartQuantity[index].L + cartQuantity[index].M + cartQuantity[index].S;
      allTotal += total * el.price;
    });
    return allTotal.toFixed(2);
  };
  const handleClick = () => {
    setCheckCode(true);
  };
  const handleBuyClick = async () => {
    const promise = await fetch("/buyItems", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.cart._id, product: [], quantity: [] }),
    });
    const response = await promise.json();
    console.log(response);
    if (promise.status === 200) {
      setCartProduct(response.product);
      setCartQuantity(response.quantity);
      setCartItems(response.product.length);
      setBuy(true);
    }
  };
  return (
    <PageWrapper>
      {!buy ? (
        cartProducts && cartProducts.length > 0 ? (
          <div className={styles.container}>
            <div className={styles.main}>
              <div className={styles.cartSummary}>
                <p>
                  <b>SHOPPING CART </b>({cartProducts.length} Products)
                </p>
                <p>Confirm the products and quantities of your order</p>
              </div>
              {cartProducts.map((el, index) => {
                const total =
                  cartQuantity[index].L +
                  cartQuantity[index].M +
                  cartQuantity[index].S;
                return (
                  <CartItem
                    imageUrl={el.imageUrl}
                    name={el.name}
                    price={el.price.toFixed(2)}
                    key={index}
                    products={cartProducts}
                    quantity={cartQuantity}
                    index={index}
                    total={(el.price * total).toFixed(2)}
                  />
                );
              })}
            </div>
            <div className={styles.bottom}>
              <div className={styles.bottomLeft}>
                <p>PROMO CODE</p>
                <input className={styles.input}></input>
                <button className={styles.applyButton} onClick={handleClick}>
                  APPLY
                </button>
                {checkCode ? (
                  <p className={styles.promoCode}>
                    Please enter valid Promo code
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.bottomRight}>
                <p>Total (Tax incl.)</p>
                <p>{allTotal()} BGN</p>
                <button className={styles.button} onClick={handleBuyClick}>
                  BUY
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.left}>
              <p className={styles.cartSummary}>SHOPPING CART</p>
              <h1>Your shopping cart is empty !</h1>
            </div>
          </div>
        )
      ) : (
        <div>Your order has been send.</div>
      )}
    </PageWrapper>
  );
};
export default CartPage;
