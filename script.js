import menuItems from "./Models/DishModel.js";
import { NonVegLogo, VegLogo } from "./Models/ImageConstants.js";
import menuList from "./Models/MenuListModel.js";

(function app() {
  const actions = {
    change_active_menu: "change_active_menu",
    add_to_cart: "add_to_cart",
    increase_in_cart: "increase_in_cart",
    decrease_in_cart: "decrease_in_cart",
    search_in_bar: "search_in_bar",
    set_veg_filter: "set_veg_filter",
    remove_veg_filter: "remove_veg_filter",
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
      case actions.decrease_in_cart:
        state.cart[payload].qty -= 1;
        if (state.cart[payload].qty == 0) {
          state.cart = state.cart.filter((curr, index) => payload !== index);
        }
        return state;
      case actions.search_in_bar:
        let currSearchlist = [];

        for (let i = 0; i < menuList.length; i++) {
          const searchInMenu =
            menuItems[menuList[i]] &&
            menuItems[menuList[i]].filter((curr) =>
              curr.dishName.toLowerCase().includes(payload.keyword)
            );
          if (searchInMenu)
            currSearchlist = [...currSearchlist, ...searchInMenu];
        }

        state.activeMenuList = currSearchlist;
        return state;
      case actions.set_veg_filter:
        let currVegList = [];

        for (let i = 0; i < menuList.length; i++) {
          const vegInMenu =
            menuItems[menuList[i]] &&
            menuItems[menuList[i]].filter((curr) => curr.isVeg === true);

          if (vegInMenu) currVegList = [...currVegList, ...vegInMenu];
        }
        state.activeMenuList = currVegList;
        return state;
      case actions.remove_veg_filter:
        state.activeMenuList = menuItems[menuList[state.activeMenu]];
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
    return -1;
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

    render();
  }
  function changeCartList(e) {
    if (e.target.classList[0] === "add-button") {
      const targetItem = e.target.parentElement.parentElement;

      const contentList = document.querySelector(".product-list");

      const index = getIndexInMenu(targetItem, contentList);

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
    if (e.target.classList[0] === "in-menu--plus") {
      const targetItem = e.target.parentNode.parentNode.parentNode;
      const contentList = document.querySelector(".product-list");

      const index = getIndexInMenu(targetItem, contentList);

      const { isVeg, dishName, price } = state.activeMenuList[index];

      const changeindex = state.cart.reduce((acc, curr, currIndex) => {
        if (curr.dishName === dishName) {
          return currIndex;
        }
      }, -1);
      const updatedState = changeState(state, "increase_in_cart", changeindex);
      state = updatedState;
    } else {
      const cartItem = e.target.parentNode.parentNode;
      const cartList = document.querySelector(".selected-item");
      const idx = getIndexInMenu(cartItem, cartList);

      const updatedState = changeState(state, "increase_in_cart", idx);
      state = updatedState;
    }
    render();
  }
  function decreaseCount(e) {
    if (e.target.classList[0] === "in-menu--minus") {
      const targetItem = e.target.parentNode.parentNode.parentNode;
      const contentList = document.querySelector(".product-list");

      const index = getIndexInMenu(targetItem, contentList);

      const { isVeg, dishName, price } = state.activeMenuList[index];

      const changeindex = state.cart.reduce((acc, curr, currIndex) => {
        if (curr.dishName === dishName) {
          return currIndex;
        }
      }, -1);
      const updatedState = changeState(state, "decrease_in_cart", changeindex);
      state = updatedState;
    } else {
      const cartItem = e.target.parentNode.parentNode;
      const cartList = document.querySelector(".selected-item");
      const idx = getIndexInMenu(cartItem, cartList);

      const updatedState = changeState(state, "decrease_in_cart", idx);
      state = updatedState;
    }
    render();
  }
  function handleSearchBar(e) {
    const keyword = e.target.value.trim().toLowerCase();

    const updatedState = changeState(state, "search_in_bar", {
      keyword,
    });
    state = updatedState;
    render();
  }
  function handleVegFilter(e) {
    const vegCheckBox = e.target;
    if (vegCheckBox.checked) {
      const updatedState = changeState(state, "set_veg_filter");
      state = updatedState;
    } else {
      const updatedState = changeState(state, "remove_veg_filter");
      state = updatedState;
    }
    render();
  }
  function handlePromise() {
    return new Promise(function (resolve, reject) {
      const userdata = fetch("https://api.github.com/users").then(
        (response) => {
          if (response.status === 200) {
            resolve();
          } else {
            reject("Error found");
          }
        }
      );
    });
  }
  function handleFakeAPI(e) {
    handlePromise().then(
      function () {
        alert("Success...");
        localStorage.setItem("cartList", JSON.stringify(state.cart));
      },
      function (param) {
        alert("Error found");
      }
    );
  }

  function init() {
    const searchBar = document.querySelector(".search_for_dishes_input");
    searchBar.addEventListener("input", handleSearchBar);

    const sidebarList = document.querySelector(".category_side-bar");
    sidebarList.addEventListener("click", changeActiveMenu);

    const vegOnlyFilter = document.querySelector(".veg-only-check-box");
    vegOnlyFilter.addEventListener("change", handleVegFilter);

    const checkoutButton = document.querySelector(".checkout-button");
    checkoutButton.addEventListener("click", handleFakeAPI);

    state.activeMenu = 0;
    state.activeMenuList = menuItems["Recommended"];
    render();
  }
  function clearList() {
    const sidebar = document.querySelector(".category_side-bar");

    sidebar.innerHTML = "";
    const contentList = document.querySelector(".product-list");
    contentList.innerHTML = "";
    const cartList = document.querySelector(".selected-item");
    cartList.innerHTML = "";
  }
  function renderCartItemCount() {
    const qty = state.cart.reduce((acc, curr) => acc + curr.qty, 0);
    document.querySelector(".item-selected--count").innerHTML = `${qty} ITEMS`;
  }
  function renderTotalAmount() {
    const totalAmount = state.cart.reduce(
      (acc, curr) => acc + curr.qty * curr.price,
      0
    );
    const totalCharge = document.querySelector(".total-charge");
    totalCharge.innerHTML =
      totalAmount == 0
        ? `No Cart Items`
        : `<div>Subtotal</div>
                       <div>${totalAmount}</div>`;
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
      menuItems[menuList[state.activeMenu]] == null
        ? 0
        : menuItems[menuList[state.activeMenu]].length
    } ITEMS`;
  }
  function renderMenuItems(item) {
    const qty = state.cart.reduce((acc, curr) => {
      if (curr.dishName === item.dishName) {
        acc = curr.qty;
      }
      return acc;
    }, -1);

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
                       qty !== -1
                         ? `<div class="selected-item-quantity">
                           <div class="in-menu--plus add-remove-1 plus">+</div>
                           <div class="in-menu add-remove-1">${qty}</div>
                           <div class="in-menu--minus in-menu add-remove-1 minus">-</div>
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
  }
  function render() {
    clearList();
    renderSideBar();
    renderMenuHeading();
    renderCartItemCount();
    if (state.activeMenuList) {
      for (let i = 0; i < state.activeMenuList.length; i++) {
        renderMenuItems(state.activeMenuList[i]);
      }
    }
    const addButton = document.querySelectorAll(".add-button");
    for (let i = 0; i < addButton.length; i++) {
      addButton[i].addEventListener("click", changeCartList);
    }
    for (let i = 0; i < state.cart.length; i++) {
      renderCartItems(state.cart[i]);
    }
    const addPlus = document.querySelectorAll(".plus");
    for (let i = 0; i < addPlus.length; i++) {
      addPlus[i].addEventListener("click", increaseCount);
    }

    const dec = document.querySelectorAll(".minus");
    for (let i = 0; i < addPlus.length; i++) {
      dec[i].addEventListener("click", decreaseCount);
    }

    const menuPlus = document.querySelectorAll(".in-menu--plus");
    for (let i = 0; i < menuPlus.length; i++) {
      menuPlus[i].addEventListener("click", increaseCount);
    }
    const menuMinus = document.querySelectorAll(".in-menu--minus");
    for (let i = 0; i < menuMinus.length; i++) {
      menuMinus[i].addEventListener("click", decreaseCount);
    }
    renderTotalAmount();
  }

  window.onload = function () {
    init();
  };
})();
