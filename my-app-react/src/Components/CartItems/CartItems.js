import "./cartItems.style.css";
import { VegLogo, NonVegLogo } from "../../Models/ImageConstants";
function CartItems(props) {
  console.log("Re render :", props.allCartItems.length);
  function increaseTheCount(dishName) {
    props.increaseInCart(dishName);
  }
  function decreaseTheCount(dishName) {
    props.decreaseInCart(dishName);
  }
  let totalqty = 0;
  let totalAmount = 0;
  function totalItems() {
    for (let i = 0; i < props.allCartItems.length; i++){
      totalqty += props.allCartItems[i].qty;
    }
  }
  function totalPrice() {
    for (let i = 0; i < props.allCartItems.length; i++){
      totalAmount += (props.allCartItems[i].qty * props.allCartItems[i].price);
    }
  }
  totalItems();
  totalPrice();
  return (
    <div className="cart-Items">
      <h1 className="cart-heading">Cart Items</h1>
      <div className="cart-heading--secondary">Take a Casual Dinner</div>
      <div className="selected-count">{ totalqty} ITEMS</div>
      <ul className="selected-items">
        {props.allCartItems.map((item) => {
          const { dishName, isVeg, price, qty } = item;
          console.log("inside cart map", dishName, isVeg, price);
          return (
            <li className="selected-item--first" key={dishName}>
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
                    increaseTheCount(dishName);
                  }}
                >
                  +
                </div>
                <div className="add-remove-1">{qty}</div>
                <div
                  className="add-remove-1"
                  onClick={() => {
                    decreaseTheCount(dishName);
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
      {totalAmount!==0 ?  <div class="total-charge">
            <div>Subtotal</div>
            <div>₹ {totalAmount}</div>
          </div>:``}
      <button className="checkout-button">Checkout</button>
    </div>
  );
}
export default CartItems;
