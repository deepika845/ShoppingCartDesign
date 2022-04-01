import {
  ADD_TO_CART,
  CHANGE_ACTIVE_MENU,
  INCREASE_TO_CART,
  DECREASE_TO_CART,
  REMOVE_FROM_CART,
  APPLY_FILTER,
} from "./actionTypes";
export const changeActiveMenu = (activeMenu) => ({
  type: CHANGE_ACTIVE_MENU,
  payload: activeMenu,
});
export const addToCart = ({ isVeg, dishName, price, qty }) => ({
  type: ADD_TO_CART,
  payload: { isVeg, dishName, price, qty },
});
export const increaseToCart = ({ dishName }) => ({
  type: INCREASE_TO_CART,
  payload: { dishName },
});
export const decreaseToCart = ({ dishName }) => ({
  type: DECREASE_TO_CART,
  payload: { dishName },
});
export const removeFromCart = ({ dishName }) => ({
  type: REMOVE_FROM_CART,
  payload: { dishName },
});
export const changeActiveMenuList = (activeMenu) => ({
  type: "ACTIVE_MENU_UPDATE",
  payload: activeMenu,
});
export const setVegOnlyFilter = () => ({ type: "VEG_ONLY" });

export const setSearchFilter = (keyword) => ({
  type: APPLY_FILTER,
  payload: keyword,
});
