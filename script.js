import menuItems from "./Models/DishModel.js";
import { NonVegLogo, VegLogo } from "./Models/ImageConstants.js";
import menuList from "./Models/MenuListModel.js";
(function app() {
  const actions = {
    change_active_menu: "change_active_menu",
    add_to_cart: "add_to_cart",
    increase_in_cart: "increase_in_cart",
  };
  let state = { activeMenu: 0, activeMenuList: [], cart: [] };
  function changeState(state, action, payload) {
    switch (action) {
      case actions.change_active_menu:
        const { ind, menuitems } = payload;
        state.activeMenu = ind;
        state.activeMenuList = menuitems;
        return state;
      case actions.add_to_cart:
        const { isVeg, dishName, price, qty } = payload;
        state.cart = [...state.cart, payload];
        return state;
      case actions.increase_in_cart:
        state.cart[payload].qty += 1;
        return state;

      default:
        return state;
    }
  }
  function getIndex(item) {
    const sideBarList = document.querySelector(".category_side-bar");

    const len = sideBarList.children.length;

    for (let i = 0; i < len; i++) {
      if (sideBarList.children[i] === item) {
        return i;
      }
    }
    return 0;
  }

  function getIndexInMenu(target, contentList) {
    for (let i = 0; i < contentList.children.length; i++) {
      if (contentList.children[i] === target) {
        return i;
      }
    }
    return 0;
  }
  function changeActiveMenu(e) {
    const item = e.target;
    console.log(e.target);
    const ind = getIndex(item);

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
  function changeCartList(e) {
    console.log("Hey");

    if (e.target.classList[0] === "add-button") {
      const targetItem = e.target.parentNode.parentNode;
      const menuList = document.querySelector(".product-list");

      /*<div class="selected-item-quantity">
            <div class="add-remove-1">+</div>
            <div class="add-remove-1">${qty}</div>
            <div class="add-remove-1">-</div> */

      const index = getIndexInMenu(targetItem, menuList);
      console.log(index);
      const { isVeg, dishName, price } = state.activeMenuList[index];
      const updatedState = changeState(state, "add_to_cart", {
        isVeg,
        dishName,
        price,
        qty: 1,
      });
      state = updatedState;

      render();
    }
  }

  function increaseCount(e) {
    console.log("hiiii");
    const cartItem = e.target.parentNode.parentNode;
    const cartList = document.querySelector(".selected-item");
    const idx = getIndexInMenu(cartItem, cartList);
    console.log(idx);
    const updatedState = changeState(state, "increase_in_cart", idx);
    state = updatedState;
    render();
  }
  function init() {
    console.log("Hello");

    const sidebarList = document.querySelector(".category_side-bar");

    sidebarList.addEventListener("click", changeActiveMenu);

    state.activeMenu = 0;
    state.activeMenuList = menuItems["Recommended"];
    render();

    const addButton = document.querySelector(".add-button");
    addButton.addEventListener("click", changeCartList);

    const addPlus = document.querySelector(".plus");
    addPlus && addPlus.addEventListener("click", increaseCount);
  }
  function clearList() {
    const sidebar = document.querySelector(".category_side-bar");

    sidebar.innerHTML = "";
    const contentList = document.querySelector(".product-list");
    contentList.innerHTML = "";
    const cartList = document.querySelector(".selected-item");
    cartList.innerHTML = "";
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
    let qty;
    for (let i = 0; i < state.cart.length; i++) {
      if (item.dishName === state.cart[i].dishName) {
        qty = state.cart[i].qty;
        break;
      }
    }

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
                     ${
                       qty
                         ? `<div class="selected-item-quantity">
                           <div class="add-remove-1 plus">+</div>
                           <div class="add-remove-1">${qty}</div>
                           <div class="add-remove-1 minus">-</div>
                         </div>
                       `
                         : `
                         <div class="add-button">ADD</div>
                       `
                     }
                    </div>`;
    contentList.appendChild(contentListItem);
  }
  function renderCartItems(item) {
    const { isVeg, dishName, price, qty } = item;
    const cartList = document.querySelector(".selected-item");
    const addItem = document.createElement("div");
    addItem.setAttribute("class", "selected-item--first");
    addItem.innerHTML = `<img
            class="veg-symbol"
            src=${isVeg ? VegLogo : NonVegLogo}
            alt="veg-symbol"
            />
            <div class="selected-item-name">${dishName}</div>
            <div class="selected-item-quantity">
            <div class="add-remove-1 plus">+</div>
            <div class="add-remove-1">${qty}</div>
            <div class="add-remove-1 minus">-</div>
            </div>

           <div class="item-price">₹ ${price}</div>`;
    cartList.appendChild(addItem);
    const addPlus = document.querySelector(".plus");
    addPlus && addPlus.addEventListener("click", increaseCount);
  }
  function render() {
    clearList();
    renderSideBar();
    renderMenuHeading();
    for (let i = 0; i < state.activeMenuList.length; i++) {
      renderMenuItems(state.activeMenuList[i]);
    }

    const addButton = document.querySelector(".add-button");
    addButton !== null && addButton.addEventListener("click", changeCartList);

    for (let i = 0; i < state.cart.length; i++) {
      renderCartItems(state.cart[i]);
    }
    console.log(state.cart);
  }

  window.onload = function () {
    init();
  };
})();
