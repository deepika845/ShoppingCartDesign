import produce from "immer";
import {
  ADD_TO_CART,
  INCREASE_TO_CART,
  DECREASE_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT,
} from "../actionTypes";

const initialState = { dishNames: [], bydishNames: {} };

const cartItems = function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { isVeg, dishName, price, qty } = action.payload;

      const newState = produce(state, (draft) => {
        draft.dishNames.push(dishName);
        draft.bydishNames[dishName] = { isVeg, dishName, price, qty };
      });
      return newState;
    }
    case INCREASE_TO_CART: {
      const { dishName } = action.payload;

      const newState = produce(state, (draft) => {
        draft.bydishNames[dishName].qty = draft.bydishNames[dishName].qty + 1;
      });
      return newState;
    }
    case DECREASE_TO_CART: {
      const { dishName } = action.payload;

      const newState = produce(state, (draft) => {
        draft.bydishNames[dishName].qty = draft.bydishNames[dishName].qty - 1;
      });
      return newState;
    }
    case REMOVE_FROM_CART: {
      const { dishName } = action.payload;

      const newState = produce(state, (draft) => {
        draft.dishNames = draft.dishNames.filter((curr) => curr !== dishName);
        delete draft.bydishNames[dishName];
      });
      return newState;
    }
    case CHECKOUT: {
      console.log("In checkout ssss");
      const checkoutList = localStorage.getItem("cart");
      console.log("Cart here:", checkoutList);
      console.log(
        "After parsing",
        JSON.stringify(Object.values(state.bydishNames))
      );
      if (checkoutList === null) {
        console.log("Cart here:", checkoutList);
        localStorage.setItem(
          "cart",
          JSON.stringify(Object.values(state.bydishNames))
        );
      } else {
        console.log("Cart here:", checkoutList);
        const parsedList = JSON.parse(checkoutList);

        console.log("parse during reducer");

        Object.values(state.bydishNames).forEach((item) => {
          const index = parsedList.findIndex(
            (i) => i.dishName === item.dishName
          );
          if (index === -1) {
            parsedList.push(item);
          } else {
            parsedList[index].qty += item.qty;
          }
        });
        console.log("must be in parse list", parsedList);
        localStorage.setItem("cart", JSON.stringify(parsedList));
      }
      return { dishNames: [], bydishNames: {} };
    }
    default:
      return state;
  }
};
export default cartItems;
