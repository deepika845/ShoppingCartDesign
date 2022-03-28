import produce from "immer";
import {
  ADD_TO_CART,
  INCREASE_TO_CART,
  DECREASE_TO_CART,
  REMOVE_FROM_CART,
} from "../actionTypes";

const initialState = { dishNames: [], bydishNames: {} };

const cartItems = function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { isVeg, dishName, price, qty } = action.payload;
      // console.log("after action add-to-cart", isVeg, dishName, price, qty);
      // return {
      //   ...state,
      //   dishNames: [...state.dishNames, dishName],
      //   bydishNames: {
      //     ...state.bydishNames,
      //     [dishName]: { isVeg, dishName, price, qty },
      //   },
      // };
      const newState = produce(state, (draft) => {
        draft.dishNames.push(dishName);
        draft.bydishNames[dishName] = { isVeg, dishName, price, qty };
      });
      return newState;
    }
    case INCREASE_TO_CART: {
      const { dishName } = action.payload;
      // return {
      //   ...state,
      //   bydishNames: {
      //     ...state.bydishNames,
      //     [dishName]: {
      //       ...state.bydishNames[dishName],
      //       qty: state.bydishNames[dishName].qty + 1,
      //     },
      //   },
      // };
      const newState = produce(state, (draft) => {
        draft.bydishNames[dishName].qty = draft.bydishNames[dishName].qty + 1;
      });
      return newState;
    }
    case DECREASE_TO_CART: {
      console.log("called!!!");
      const { dishName } = action.payload;
      // return {
      //   ...state,
      //   bydishNames: {
      //     ...state.bydishNames,
      //     [dishName]: {
      //       ...state.bydishNames[dishName],
      //       qty: state.bydishNames[dishName].qty - 1,
      //     },
      //   },
      // };
      const newState = produce(state, (draft) => {
        draft.bydishNames[dishName].qty = draft.bydishNames[dishName].qty - 1;
      });
      return newState;
    }
    case REMOVE_FROM_CART: {
      const { dishName } = action.payload;
      const updatedCartItems = { ...state.bydishNames };

      delete updatedCartItems[dishName];
      return {
        ...state,
        dishNames: state.dishNames.filter((item) => item !== dishName),
        updatedCartItems,
      };
    }
    default:
      return state;
  }
};
export default cartItems;
