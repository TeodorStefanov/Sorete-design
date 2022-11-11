import React, { useContext, useEffect, useState } from "react";
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
    console.log(products);
    console.log(quantity);
  };
  useEffect(() => {
    handlePic();
  }, []);
  return (
    <PageWrapper>
      {products.length> 0 ? (
        <div className={styles.container}>
          <div className={styles.left}>
            <p className={styles.cartSummary}>Cart Summary</p>
            <div className={styles.item}></div>
          </div>
          <div className={styles.right}>
            <p>{products[0].description}</p>
            <button onClick={handlePic}>BUTTON</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </PageWrapper>
  );
};
export default CartPage;
