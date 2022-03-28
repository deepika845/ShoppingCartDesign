import React from "react";
import "./menuContentList.style.css";
import { VegLogo } from "../../Models/ImageConstants";
import { NonVegLogo } from "../../Models/ImageConstants";
import { connect } from "react-redux";
import {
  addToCart,
  increaseToCart,
  decreaseToCart,
  removeFromCart,
} from "../../redux/actions.js";
import { getCartListByName } from "../../redux/selectors.js";
function MenuContentList({
  activeState,
  activeMenuList,
  cartItems,
  addToCart,
  decreaseToCart,
  increaseToCart,
  removeFromCart,
}) {
  return (
    <div className="menu-content-list">
      <div className="menuHeading">
        <h1 className="content-List-heading">{activeState}</h1>
        <h3 className="num-items">{activeMenuList.length} Items</h3>
      </div>
      <ul className="product-list">
        {activeMenuList.map((curr) => {
          const { dishName, isVeg, price, desc, image } = curr;
          let inCart = false;
          let qty = 0;
          for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].dishName === dishName) {
              inCart = true;
              qty = cartItems[i].qty;
            }
          }

          return (
            <li
              className="product--desc--details category-separator"
              key={`dishName:${dishName}`}
            >
              <div className="product-seller-item__Desc">
                <div>
                  <img
                    className="veg-symbol"
                    src={isVeg ? VegLogo : NonVegLogo}
                    alt="veg-symbol"
                  />
                </div>
                <div className="product-items-details__name">
                  <h3>{dishName}</h3>
                </div>
                <div className="product-items-details__price">
                  &#8377;{price}
                </div>
                <div className="product-items-details">{desc}</div>
              </div>
              <div className="product-items-details__img">
                <img
                  className="border-radius dish-items-width"
                  src={image}
                  alt="garlic-noodles"
                />
                {inCart ? (
                  <div className="selected-item-quantity">
                    <div
                      className="in-menu--plus add-remove-1"
                      /*onClick={() => increaseTheCount(dishName)}*/
                      onClick={() => {
                        console.log("in cart c");
                        increaseToCart({ dishName });
                      }}
                    >
                      +
                    </div>
                    <div className="add-remove-1">{qty}</div>
                    <div
                      className="in-menu--minus add-remove-1"
                      // onClick={() => decreaseTheCount(dishName)}

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
                ) : (
                  <div
                    className="add-button"
                    onClick={() => {
                      addToCart({ dishName, isVeg, price, qty: 1 });
                    }}
                  >
                    ADD
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { activeMenu, activeMenuList } = state;
  console.log("In active menu List",activeMenuList)
  const { activeState } = activeMenu;
  const cartItems = getCartListByName(state);

  return { activeState, activeMenuList, cartItems };
};
export default connect(mapStateToProps, {
  addToCart,
  increaseToCart,
  decreaseToCart,
  removeFromCart,
})(MenuContentList);
