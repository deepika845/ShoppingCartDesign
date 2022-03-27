import menuItems from "../../Models/dishModel";
import { ACTIVE_MENU_UPDATE, VEG_ONLY, APPLY_FILTER } from "../actionTypes";
//import { VEG_ONLY } from "../actionTypes";
const initialState = menuItems["Recommended"];
const activeMenuList = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_MENU_UPDATE: {
      console.log("Updated items......");
      let updatedMenuList = [];
      console.log("Rendering Items here", menuItems[action.payload]);
      updatedMenuList = [...updatedMenuList, ...menuItems[action.payload]];
      console.log("updated listr here:", updatedMenuList);
      return updatedMenuList;
    }
    case VEG_ONLY: {
      let updatedMenuList = [];
      for (let dishes in menuItems) {
        const categoryList = menuItems[dishes];
        const vegcategoryList = categoryList.filter(
          (curr) => curr.isVeg === true
        );
        updatedMenuList = [...updatedMenuList, ...vegcategoryList];
      }
      return updatedMenuList;
    }
    case APPLY_FILTER: {
      let updatedMenuList = [];
      for (let dishes in menuItems) {
        const categoryList = menuItems[dishes];
        const searchCategoryList = categoryList.filter((curr) =>
          curr.dishName.includes(action.payload)
        );
        updatedMenuList = [...updatedMenuList, ...searchCategoryList];
      }
      return updatedMenuList;
    }
    default:
      return state;
  }
};
export default activeMenuList;
