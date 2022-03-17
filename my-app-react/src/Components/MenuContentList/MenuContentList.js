import "./menuContentList.style.css";
import menuItems from "../../Models/dishModel";
import { VegLogo } from "../../Models/ImageConstants";
import { NonVegLogo } from "../../Models/ImageConstants";
import MenuContentItem from "../MenuContentItem/MenuContentItem";
function MenuContentList(props) {
  //  const menuItems = menuItems[props.activeMenuItem];
  // console.log("menuItems", menuItems);
  function handleAddButton(addedItem) {
    props.addToCart(addedItem);
  }
  function increaseTheCount(dishName) {
    props.increaseInCart(dishName);
  }
  function decreaseTheCount(dishName) {
    props.decreaseInCart(dishName);
  }
  //const activeMenuList = menuItems[props.activeMenuItem];
  return (
    <div className="menu-content-list">
      <div className="menuHeading">
        <h1 className="content-List-heading">{props.activeMenu}</h1>
        <h3 className="num-items">{props.activeMenuList.length} Items</h3>
      </div>
      <ul className="product-list">
        {props.activeMenuList.map((curr) => {
          const { dishName, isVeg, price, desc, image } = curr;
          let qty = 0;
          for (let i = 0; i < props.currCartItems.length; i++) {
            if (dishName == props.currCartItems[i].dishName) {
              qty = props.currCartItems[i].qty;
              break;
            }
          }

          return (
            <li
              className="product--desc--details category-separator"
              key={dishName}
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
                {qty ? (
                  <div className="selected-item-quantity">
                    <div className="in-menu--plus add-remove-1" onClick={()=>increaseTheCount(dishName)}>+</div>
                    <div className="add-remove-1">{qty}</div>
                    <div className="in-menu--minus add-remove-1" onClick={()=>decreaseTheCount(dishName)}>-</div>
                  </div>
                ) : (
                  <div
                    className="add-button"
                    onClick={() => {
                      handleAddButton({ dishName, isVeg, price, qty: 1 });
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
export default MenuContentList;
