import menuItems from './Models/DishModel.js';
import { NonVegLogo, VegLogo } from './Models/ImageConstants.js';
import menuList from './Models/MenuListModel.js';

(function app() {
  const actions = {
    change_active_menu: 'change_active_menu',
    add_to_cart: 'add_to_cart',
    increase_in_cart: 'increase_in_cart',
    decrease_in_cart: 'decrease_in_cart',
    search_in_bar: 'search_in_bar',
    set_veg_filter: 'set_veg_filter',
    remove_veg_filter: 'remove_veg_filter',
  };
  let state = { activeMenu: 0, activeMenuList: [], cart: [] };
  function changeState(action, payload) {
    switch (action) {
      case actions.change_active_menu: {
        const { ind, menuitems } = payload;
        state.activeMenu = ind;
        state.activeMenuList = menuitems;
        return state;
      }
      case actions.add_to_cart:
        state.cart = [...state.cart, payload];
        return state;
      case actions.increase_in_cart:
        state.cart[payload].qty += 1;
        return state;
      case actions.decrease_in_cart:
        state.cart[payload].qty -= 1;
        if (state.cart[payload].qty === 0) {
          state.cart = state.cart.filter((curr, index) => payload !== index);
        }
        return state;
      case actions.search_in_bar: {
        let currSearchlist = [];

        for (let i = 0; i < menuList.length; i += 1) {
          const searchInMenu = menuItems[menuList[i]]

            && menuItems[menuList[i]].filter(
              (curr) => curr.dishName.toLowerCase().includes(payload.keyword),
            );
          if (searchInMenu) { currSearchlist = [...currSearchlist, ...searchInMenu]; }
        }

        state.activeMenuList = currSearchlist;
        return state;
      }
      case actions.set_veg_filter: {
        let currVegList = [];

        menuList.forEach((currElement) => {
          const vegInMenu = menuItems[currElement]
            && menuItems[currElement].filter((curr) => curr.isVeg === true);

          if (vegInMenu) currVegList = [...currVegList, ...vegInMenu];
        });

        state.activeMenuList = currVegList;
        return state;
      }
      case actions.remove_veg_filter:
        state.activeMenuList = menuItems[menuList[state.activeMenu]];
        return state;

      default:
        return state;
    }
  }
  function getIndex(item) {
    const sideBarList = document.querySelectorAll('.category-link');
    return [...sideBarList].indexOf(item);
  }

  function getIndexInMenu(target, contentList) {
    return [...contentList.children].indexOf(target);
  }

  function checkoutFakeAPI() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Checkout');
      }, 2000);
    });
  }
  async function handleCheckout() {
    checkoutFakeAPI().then((response) => {
      localStorage.setItem('cart', JSON.stringify(state.cart));
      alert(response);
    }).catch((error) => {
      alert(`Oops Something: ${error.message}`);
    });
  }
  function clearList() {
    const sidebar = document.querySelector('.category_side-bar');

    sidebar.innerHTML = '';
    const contentList = document.querySelector('.product-list');
    contentList.innerHTML = '';
    const cartList = document.querySelector('.selected-item');
    cartList.innerHTML = '';
  }
  function renderCartItemCount() {
    const qty = state.cart.reduce((acc, curr) => acc + curr.qty, 0);
    document.querySelector('.item-selected--count').innerHTML = `${qty} ITEMS`;
  }
  function renderTotalAmount() {
    const totalAmount = state.cart.reduce(
      (acc, curr) => acc + curr.qty * curr.price,
      0,
    );
    const totalCharge = document.querySelector('.total-charge');
    totalCharge.innerHTML = totalAmount === 0
      ? 'No Cart Items'
      : `<div>Subtotal</div>
                       <div>${totalAmount}</div>`;
  }

  function renderSideBar() {
    const sideBarMenu = document.querySelector('.category_side-bar');
    menuList.forEach((currElement, currIndex) => {
      const currMenu = document.createElement('li');
      if (currIndex === state.activeMenu) {
        currMenu.setAttribute(
          'class',
          'category-link category-color category-link-active',
        );
      } else {
        currMenu.setAttribute('class', 'category-link category-color');
      }
      currMenu.innerHTML = currElement;
      sideBarMenu.appendChild(currMenu);
    });
  }
  function renderMenuHeading() {
    const menuHeadline = document.querySelector('.product-details-headline');
    const numItems = document.querySelector('.num-item');
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
        return curr.qty;
      }
      return acc;
    }, -1);

    const contentList = document.querySelector('.product-list');
    const {
      dishName, isVeg, price, desc, image,
    } = item;
    const contentListItem = document.createElement('li');
    contentListItem.setAttribute(
      'class',
      'product--desc--details category-separator',
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
    const {
      isVeg, dishName, price, qty,
    } = item;
    const cartList = document.querySelector('.selected-item');
    const addItem = document.createElement('div');
    addItem.setAttribute('class', 'selected-item--first');
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
  const changeActiveMenu = (e) => {
    const item = e.target;

    const ind = getIndex(item);
    const menuitems = menuItems[menuList[ind]];
    const updatedState = changeState('change_active_menu', {
      ind,
      menuitems,
    });
    state.activeMenu = updatedState.activeMenu;
    state.activeMenuList = updatedState.activeMenuList;

    render();
  };
  const changeCartList = (e) => {
    if (e.target.classList[0] === 'add-button') {
      const targetItem = e.target.parentElement.parentElement;

      const contentList = document.querySelector('.product-list');

      const index = getIndexInMenu(targetItem, contentList);

      const { isVeg, dishName, price } = state.activeMenuList[index];
      const updatedState = changeState('add_to_cart', {
        isVeg,
        dishName,
        price,
        qty: 1,
      });
      state = updatedState;

      render();
    }
  };
  const increaseCount = (e) => {
    if (e.target.classList[0] === 'in-menu--plus') {
      const targetItem = e.target.parentNode.parentNode.parentNode;
      const contentList = document.querySelector('.product-list');

      const index = getIndexInMenu(targetItem, contentList);

      const { dishName } = state.activeMenuList[index];

      const changeindex = state.cart.reduce((acc, curr, currIndex) => {
        if (curr.dishName === dishName) {
          return currIndex;
        }
        return acc;
      }, -1);
      const updatedState = changeState('increase_in_cart', changeindex);
      state = updatedState;
    } else {
      const cartItem = e.target.parentNode.parentNode;
      const cartList = document.querySelector('.selected-item');
      const idx = getIndexInMenu(cartItem, cartList);

      const updatedState = changeState('increase_in_cart', idx);
      state = updatedState;
    }
    render();
  };
  const decreaseCount = (e) => {
    if (e.target.classList[0] === 'in-menu--minus') {
      const targetItem = e.target.parentNode.parentNode.parentNode;
      const contentList = document.querySelector('.product-list');

      const index = getIndexInMenu(targetItem, contentList);

      const { dishName } = state.activeMenuList[index];

      const changeindex = state.cart.reduce((acc, curr, currIndex) => {
        if (curr.dishName === dishName) {
          return currIndex;
        }
        return acc;
      }, -1);
      const updatedState = changeState('decrease_in_cart', changeindex);
      state = updatedState;
    } else {
      const cartItem = e.target.parentNode.parentNode;
      const cartList = document.querySelector('.selected-item');
      const idx = getIndexInMenu(cartItem, cartList);

      const updatedState = changeState('decrease_in_cart', idx);
      state = updatedState;
    }
    render();
  };
  const handleSearchBar = (e) => {
    const keyword = e.target.value.trim().toLowerCase();

    const updatedState = changeState('search_in_bar', {
      keyword,
    });
    state = updatedState;
    render();
  };
  const handleVegFilter = (e) => {
    const vegCheckBox = e.target;
    if (vegCheckBox.checked) {
      const updatedState = changeState('set_veg_filter');
      state = updatedState;
    } else {
      const updatedState = changeState('remove_veg_filter');
      state = updatedState;
    }
    render();
  };
  function init() {
    const searchBar = document.querySelector('.search_for_dishes_input');
    searchBar.addEventListener('input', handleSearchBar);

    const sidebarList = document.querySelector('.category_side-bar');
    sidebarList.addEventListener('click', changeActiveMenu);

    const vegOnlyFilter = document.querySelector('.veg-only-check-box');
    vegOnlyFilter.addEventListener('change', handleVegFilter);

    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', handleCheckout);

    state.activeMenu = 0;
    state.activeMenuList = menuItems.Recommended;
    render();
  }
  function render() {
    clearList();
    renderSideBar();
    renderMenuHeading();
    renderCartItemCount();
    if (state.activeMenuList) {
      for (let i = 0; i < state.activeMenuList.length; i += 1) {
        renderMenuItems(state.activeMenuList[i]);
      }
    }
    const addButton = document.querySelectorAll('.add-button');
    addButton.forEach((currElement) => {
      currElement.addEventListener('click', changeCartList);
    });
    state.cart.forEach((currElement) => {
      renderCartItems(currElement);
    });
    const addPlus = document.querySelectorAll('.plus');
    addPlus.forEach((currElement) => {
      currElement.addEventListener('click', increaseCount);
    });

    const dec = document.querySelectorAll('.minus');
    dec.forEach((currElement) => {
      currElement.addEventListener('click', decreaseCount);
    });

    const menuPlus = document.querySelectorAll('.in-menu--plus');
    menuPlus.forEach((currElement) => {
      currElement.addEventListener('click', increaseCount);
    });
    const menuMinus = document.querySelectorAll('.in-menu--minus');
    menuMinus.forEach((currElement) => {
      currElement.addEventListener('click', decreaseCount);
    });
    renderTotalAmount();
  }
  window.onload = function () {
    console.log('init called');
    init();
  };
}());
