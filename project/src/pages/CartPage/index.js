import React, { useContext, useEffect, useState } from "react";
import CartItem from "../../Components/Other/CartItem";
import PageWrapper from "../../Components/page-wrapper";
import UserContext from "../../Context";
import styles from "./index.module.css";
const CartPage = () => {
  const context = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [checkCode, setCheckCode] = useState(false);
  const { user } = context;
  const handlePic = async () => {
    const promise = await fetch(`/cart/${user._id}`);
    const response = await promise.json();
    if (response) {
      setProducts(response.cart.product);
      setQuantity(response.cart.quantity);
    }
  };
  const allTotal = () => {
    let allTotal = 0;
    products.map((el, index) => {
      const total = quantity[index].L + quantity[index].M + quantity[index].S;
      allTotal += total * el.price;
    });
    return allTotal.toFixed(2);
  };
  const handleClick = () => {
    setCheckCode(true);
  };
  useEffect(() => {
    handlePic();
    allTotal();
  }, []);
  return (
    <PageWrapper>
      {products.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.main}>
            <div className={styles.cartSummary}>
              <p>
                <b>SHOPPING CART </b>({products.length} Products)
              </p>
              <p>Confirm the products and quantities of your order</p>
            </div>
            {products.map((el, index) => {
              const total =
                quantity[index].L + quantity[index].M + quantity[index].S;
              return (
                <CartItem
                  imageUrl={el.imageUrl}
                  name={el.name}
                  quantityL={quantity[index].L}
                  quantityM={quantity[index].M}
                  quantityS={quantity[index].S}
                  price={el.price.toFixed(2)}
                  key={index}
                  products={products}
                  quantity={quantity}
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
              {checkCode ? <p className={styles.promoCode}>Please enter valid Promo code</p> : ""}
            </div>
            <div className={styles.bottomRight}>
              <p>Total (Tax incl.)</p>
              <p>{allTotal()} BGN</p>
              <button className={styles.button} onClick={handlePic}>
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
      )}
    </PageWrapper>
  );
};
export default CartPage;
