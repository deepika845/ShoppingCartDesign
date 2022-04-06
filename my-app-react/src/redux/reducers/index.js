import { combineReducers } from "redux";
import activeMenu from "./activeMenuReducer.js";
import cartItems from "./cartReducer.js";
import activeMenuList from "./activeMenuListReducer.js";
export default combineReducers({
  activeMenu: activeMenu,
  activeMenuList: activeMenuList,
  cartItems: cartItems,
});
