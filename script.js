import menuItems from "./Models/DishModel.js";
import menuList from "./Models/MenuListModel.js";
(function app() {
  const action = {
    change_active_menu: "change_active_menu",
  };
  let state = { activeMenu: 0, activeMenuList: [] };
  function changeState(state, action, payload) {
    switch (action) {
      case action.change_active_menu:
        const { index, menuList } = payload;
        state.activeMenu = index;
        state.activeMenuList = menuList;
        return state;
      default:
        return state;
    }
  }
  function getIndex(item) {
    const sideBarList = document.querySelector(".category");
    console.log(sideBarList);
    const len = sideBarList.childNodes.length;
    console.log(len);
    for (let i = 0; i < len; i++) {
      if (sideBarList.childNodes[i] === item) {
        return i;
      }
    }
    return 0;
  }
  function changeActiveMenu(e) {
    //  console.log("hey");
    const item = e.target;
    console.log(e.target);
    const ind = getIndex(item);
    console.log(ind);
    const menuItems = menuList[ind];
    const updatedState = changeState(state, "change_active_menu", {
      ind,
      menuItems,
    });
  }
  function init() {
    //console.log("Hello");
    const sidebarList = document.querySelector(".category");
    sidebarList.addEventListener("click", changeActiveMenu);
    state.activeMenuList = menuItems[0];
    render();
  }
  function render() {
    console.log(state.activeMenuList);
  }
  window.onload = function () {
    init();
  };
})();
