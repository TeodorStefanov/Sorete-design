import React, { useContext, useEffect, useState } from "react";
import CartItem from "../../Components/Other/CartItem";
import PageWrapper from "../../Components/page-wrapper";
import UserContext from "../../Context";
import styles from "./index.module.css";
const CartPage = () => {
  const { cartProducts, cartQuantity } = useContext(UserContext);
  const [checkCode, setCheckCode] = useState(false);
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

  return (
    <PageWrapper>
      {cartProducts ? (
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
              <button className={styles.button}>BUY</button>
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
      )}
    </PageWrapper>
  );
};
export default CartPage;
