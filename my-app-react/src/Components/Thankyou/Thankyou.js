import "./thankyou.style.css";
import { withRouter } from "react-router-dom";
import { VegLogo, NonVegLogo } from "../../Models/ImageConstants";
function Thankyou({ history }) {
  function cartList() {
    const cartItems = JSON.parse(localStorage.getItem("cart"));

    const cartItemsList = cartItems;

    return cartItemsList;
  }
  const cartItems = cartList();
  function cartItemsMap() {
    const returnedList = cartItems.map(({ isVeg, dishName, price, qty }) => {
      return (
        <li key={`dishName ${dishName}`} className="selected-cart-item">
          <img
            className="veg-symbol"
            src={isVeg ? VegLogo : NonVegLogo}
            alt="veg-symbol"
          />
          <div>{dishName}</div>
          <div>{price}</div>
          <div>{qty}</div>
        </li>
      );
    });
    return returnedList;
  }
  function getSubTotal() {
    return cartItems.reduce((acc, { price, qty }) => {
      return acc + price * qty;
    }, 0);
  }
  return (
    <div>
      <h2 className="order-note">Order placed successfully</h2>
      <div>
        <ul className="cart-list">{cartItemsMap()}</ul>
      </div>
      <div className="subtotal">{`Subtotal :  ${getSubTotal()}`}</div>
    </div>
  );
}
export default withRouter(Thankyou);
