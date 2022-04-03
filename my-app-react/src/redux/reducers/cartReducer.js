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
      const checkoutList = localStorage.getItem("cart");

      if (checkoutList === null) {
        localStorage.setItem(
          "cart",
          JSON.stringify(Object.values(state.bydishNames))
        );
      } else {
        const parsedList = JSON.parse(checkoutList);

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

        localStorage.setItem("cart", JSON.stringify(parsedList));
      }
      return { dishNames: [], bydishNames: {} };
    }
    default:
      return state;
  }
};
export default cartItems;
