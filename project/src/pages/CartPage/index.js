import React, { useContext } from "react";
import PageWrapper from "../../Components/page-wrapper";
import UserContext from "../../Context";
const CartPage = () => {
  const context = useContext(UserContext);
  const { user } = context;
  const handlePic = async () => {
    const promise = await fetch(`/cart/${user._id}`)
      .then((res) => res.json())
      .then((response) => console.log(response.cart));
  };
  return (
    <PageWrapper>
      <div>
        <div>
          <button onClick={handlePic}>BUTTON</button>
        </div>
      </div>
    </PageWrapper>
  );
};
export default CartPage;
