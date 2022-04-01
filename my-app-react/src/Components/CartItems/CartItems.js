import React, { useMemo } from "react";
import "./cartItems.style.css";
import { VegLogo, NonVegLogo } from "../../Models/ImageConstants";
import { connect } from "react-redux";
import { getCartListByName } from "../../redux/selectors";
import {
  increaseToCart,
  decreaseToCart,
  removeFromCart,
} from "../../redux/actions";
function CartItems({
  cartItems,
  increaseToCart,
  decreaseToCart,
  removeFromCart,
}) {
  let totalqty = 0;
  totalqty = useMemo(() => {
    const totalItems = cartItems.reduce((acc, curr) => acc + curr.qty, 0);
    return totalItems;
  }, [cartItems]);
  let totalAmount = 0;

  totalAmount = useMemo(() => {
    const totalPrice = cartItems.reduce(
      (acc, curr) => acc + curr.price * curr.qty,
      0
    );
    return totalPrice;
  }, [cartItems]);

  function checkoutFakeAPI() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Checkout");
      }, 2000);
    });
  }
  async function handleCheckout() {
    checkoutFakeAPI()
      .then((response) => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
        alert(response);
      })
      .catch((error) => {
        alert(`Oops Something: ${error.message}`);
      });
  }
  function createCartList() {
    return cartItems.map((item) => {
      const { dishName, isVeg, price, qty } = item;

      return (
        <li className="selected-item--first" key={`dishName${dishName}`}>
          <img
            className="veg-symbol"
            src={isVeg ? VegLogo : NonVegLogo}
            alt="veg-symbol"
          />
          <div className="selected-item-name">{dishName}</div>
          <div className="selected-item-quantity">
            <div
              className="add-remove-1"
              onClick={() => {
                increaseToCart({ dishName });
              }}
            >
              +
            </div>
            <div className="add-remove-1">{qty}</div>
            <div
              className="add-remove-1"
              onClick={() => {
                if (qty === 1) {
                  removeFromCart({ dishName });
                } else {
                  decreaseToCart({ dishName });
                }
              }}
            >
              -
            </div>
          </div>

          <div className="item-price">₹{price}</div>
        </li>
      );
    });
  }
  return (
    <div className="cart-Items">
      <h1 className="cart-heading">Cart Items</h1>
      <div className="cart-heading--secondary">Take a Casual Dinner</div>
      <div className="selected-count">{totalqty} ITEMS</div>
      <ul className="selected-items">{createCartList()}</ul>
      <div>Extra Charges may apply</div>
      {totalAmount !== 0 ? (
        <div className="total-charge">
          <div>Subtotal</div>
          <div>₹ {totalAmount}</div>
        </div>
      ) : (
        ``
      )}
      <button className="checkout-button" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  const cartItems = getCartListByName(state);
  return { cartItems };
};
export default connect(mapStateToProps, {
  increaseToCart,
  removeFromCart,
  decreaseToCart,
})(CartItems);
