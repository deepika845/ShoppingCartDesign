import produce from "immer";
import { CHANGE_ACTIVE_MENU } from "../actionTypes";
const initialState = { activeState: "Recommended" };
// eslint-disable-next-line import/no-anonymous-default-export
const activeMenu = function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_ACTIVE_MENU: {
      // return { ...state, activeState: action.payload };
      const newState = produce(state, (draft) => {
        draft.activeState = action.payload;
      });
      return newState;
    }
    default:
      return state;
  }
};
export default activeMenu;
