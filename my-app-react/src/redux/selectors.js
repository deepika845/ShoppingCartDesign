import menuItems from "../Models/dishModel";
export const getActiveMenuByFilter = (activeMenu) => {
  console.log(menuItems[activeMenu]);
  return menuItems[activeMenu];
};

export const getActiveMenu = (store) => store.activeMenu;

export const getCartItems = (store) => {
  const { cartItems } = store;
  console.log("finally in", cartItems);
  return cartItems;
};
export const getCartItemsNameList = (store) =>
  getCartItems(store) ? getCartItems(store).dishNames : [];

export const getCartItemByName = (store, dishName) => {
  const res = getCartItems(store)
    ? { ...getCartItems(store).bydishNames[dishName], dishName }
    : {};
  console.log("from here to", getCartItems(store));

  return res;
};
export const getCartListByName = (store) =>
  getCartItemsNameList(store) &&
  getCartItemsNameList(store).map((dishName) =>
    getCartItemByName(store, dishName)
  );
