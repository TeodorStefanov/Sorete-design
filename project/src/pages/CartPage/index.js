import React, { useContext, useEffect, useState } from "react";
import CartItem from "../../Components/Other/CartItem";
import PageWrapper from "../../Components/page-wrapper";
import UserContext from "../../Context";
import styles from "./index.module.css";
const CartPage = () => {
  const context = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);
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
  useEffect(() => {
    handlePic();
    allTotal();
  }, []);
  return (
    <PageWrapper>
      {products.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.left}>
            <p className={styles.cartSummary}>SHOPPING CART</p>
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
                  total={(el.price * total).toFixed(2)}
                />
              );
            })}
          </div>
          <div className={styles.right}>
            <p>Total</p>
            <p>{allTotal()} BGN</p>
            <button className={styles.button} onClick={handlePic}>
              CONTINUE
            </button>
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
