import "./cartItems.style.css";
import { VegLogo, NonVegLogo } from "../../Models/ImageConstants";
import { connect } from "react-redux";
import { getCartListByName, getCartItemsNameList } from "../../redux/selectors";
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
  console.log("Re render :", cartItems.length);
  /* function increaseTheCount(dishName) {
    props.increaseInCart(dishName);
  }
  function decreaseTheCount(dishName) {
    props.decreaseInCart(dishName);
  }*/
  let totalqty = 0;
  let totalAmount = 0;
  function totalItems() {
    for (let i = 0; i < cartItems.length; i++) {
      totalqty += cartItems[i].qty;
    }
  }
  function totalPrice() {
    for (let i = 0; i < cartItems.length; i++) {
      totalAmount += cartItems[i].qty * cartItems[i].price;
    }
  }
  /*function handleCheckout(event) {
    props.addToLocalStorage();
  }*/
  totalItems();
  totalPrice();
  return (
    <div className="cart-Items">
      <h1 className="cart-heading">Cart Items</h1>
      <div className="cart-heading--secondary">Take a Casual Dinner</div>
      <div className="selected-count">{totalqty} ITEMS</div>
      <ul className="selected-items">
        {cartItems.map((item) => {
          const { dishName, isVeg, price, qty } = item;
          console.log("inside cart map", dishName, isVeg, price);
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
                  /* onClick={() => {
                    increaseTheCount(dishName);
                  }}*/
                  onClick={() => {
                    increaseToCart({ dishName });
                  }}
                >
                  +
                </div>
                <div className="add-remove-1">{qty}</div>
                <div
                  className="add-remove-1"
                  /*onClick={() => {
                    decreaseTheCount(dishName);
                  }}*/
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
        })}
      </ul>
      <div>Extra Charges may apply</div>
      {totalAmount !== 0 ? (
        <div className="total-charge">
          <div>Subtotal</div>
          <div>₹ {totalAmount}</div>
        </div>
      ) : (
        ``
      )}
      <button className="checkout-button" /* onClick={handleCheckout}*/>
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
