import React, { useContext } from "react";
import PageWrapper from "../../Components/page-wrapper";
import UserContext from "../../Context";
import styles from "./index.module.css";
const CartPage = () => {
  const context = useContext(UserContext);
  const { user } = context;
  const handlePic = async () => {
    const promise = await fetch(`/cart/${user._id}`);
    const response = await promise.json();
    const products = response.cart.product;
    const quantity = response.cart.quantity;
    products.map((el, index) => {});
  };
  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.cartSummary}>Cart Summary</p>
          <div className={styles.item}>
          </div>
        </div>
        <div className={styles.right}>
            <label for="cars">Choose a car:</label>
            <select id="cars" name="cars" size="3">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          <p>Summary</p>
          <button onClick={handlePic}>BUTTON</button>
        </div>
      </div>
    </PageWrapper>
  );
};
export default CartPage;
