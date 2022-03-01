import menuItems from "./Models/DishModel.js";
import { NonVegLogo, VegLogo } from "./Models/ImageConstants.js";
import menuList from "./Models/MenuListModel.js";
(function app() {
  const actions = {
    change_active_menu: "change_active_menu",
  };
  let state = { activeMenu: 0, activeMenuList: [] };
  function changeState(state, action, payload) {
    switch (action) {
      case actions.change_active_menu:
        //console.log("Entered");
        const { ind, menuitems } = payload;
        state.activeMenu = ind;
        state.activeMenuList = menuitems;
        return state;

      default:
        return state;
    }
  }
  function getIndex(item) {
    const sideBarList = document.querySelector(".category_side-bar");
    //console.log(sideBarList);
    const len = sideBarList.children.length;
    //console.log(len);
    for (let i = 0; i < len; i++) {
      if (sideBarList.children[i] === item) {
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
    //console.log(ind);
    //console.log(menuList[ind]);
    const menuitems = menuItems[menuList[ind]];
    const updatedState = changeState(state, "change_active_menu", {
      ind,
      menuitems,
    });
    state.activeMenu = updatedState.activeMenu;
    state.activeMenuList = updatedState.activeMenuList;
    console.log(state);
    render();
  }
  function init() {
    //console.log("Hello");

    const sidebarList = document.querySelector(".category_side-bar");
    sidebarList.addEventListener("click", changeActiveMenu);
    state.activeMenu = 0;
    state.activeMenuList = menuItems["Recommended"];
    render();
  }
  function clearList() {
    const sidebar = document.querySelector(".category_side-bar");
    sidebar.innerHTML = "";
    const contentList = document.querySelector(".product-list");
    contentList.innerHTML = "";
  }
  function renderSideBar() {
    const sideBarMenu = document.querySelector(".category_side-bar");
    for (let i = 0; i < menuList.length; i++) {
      const currMenu = document.createElement("li");
      if (i == state.activeMenu) {
        currMenu.setAttribute(
          "class",
          "category-link category-color category-link-active"
        );
      } else {
        currMenu.setAttribute("class", "category-link category-color");
      }
      currMenu.innerHTML = menuList[i];
      sideBarMenu.appendChild(currMenu);
    }
  }
  function renderMenuHeading() {
    const menuHeadline = document.querySelector(".product-details-headline");
    const numItems = document.querySelector(".num-item");
    menuHeadline.innerHTML = `${menuList[state.activeMenu]}`;
    numItems.innerHTML = `${
      menuItems[menuList[state.activeMenu]].length
    } ITEMS`;
  }
  function renderMenuItems(item) {
    const contentList = document.querySelector(".product-list");
    const { dishName, isVeg, isBestSeller, price, desc, image } = item;
    let contentListItem = document.createElement("li");
    contentListItem.setAttribute(
      "class",
      "product--desc--details category-separator"
    );
    contentListItem.innerHTML = `
          <div class="product-seller-item__Desc">
                      <div>
                        <img
                          class="veg-symbol"
                          src=${isVeg ? VegLogo : NonVegLogo}
                          alt="veg-symbol"
                        />
                      </div>
                      <div class="product-items-details__name">
                        <h3>${dishName}</h3>
                      </div>
                      <div class="product-items-details__price">
                        &#8377; ${price}
                      </div>
                      <div class="product-items-details">
                        ${desc}
                      </div>
                    </div>
                    <div class="product-items-details__img">
                      <img
                        class="border-radius dish-items-width"
                        src=${image}
                        alt="garlic-noodles"
                      />
                      <div class="add-button">ADD</div>
                    </div>`;
    contentList.appendChild(contentListItem);
  }
  function render() {
    //console.log("Hey");
    clearList();
    renderSideBar();
    renderMenuHeading();
    for (let i = 0; i < state.activeMenuList.length; i++) {
      renderMenuItems(state.activeMenuList[i]);
    }
  }

  window.onload = function () {
    init();
  };
})();
