import React, { useEffect, useState } from "react";
import "./App.css";

import Header from "./Components/Header/Header.js";
import BreadCrumb from "./Components/BreadCrumbList/BreadCrumb.js";
import DishOffer from "./Components//DishOffer/DishOffer.js";
import MiddleContainer from "./Components/MiddleContainer/MiddleContainer";
import FoodOffer from "./Images/Food_Offer.png";
import SearchFilter from "./Components/SearchFilter/SearchFilter.js";
import MenuList from "./Components/MenuList/MenuList.js";
import MenuContentList from "./Components/MenuContentList/MenuContentList";
import OfferPercent from "./Components/OfferPercent/OfferPercent";
import CartItems from "./Components/CartItems/CartItems.js";
import menuItems from "./Models/dishModel.js";
import menuList from "./Models/menuListModel";
const App = () => {
  const [activeMenu, setActiveMenu] = useState("Recommended");
  const [activeMenuItems, setActiveMenuItem] = useState(menuItems[activeMenu]);
  const [currCartItems, setCartItems] = useState([]);
  function selectedHandler(currItem) {
    setActiveMenu(currItem);
    let updatedMenuItems = [];
    updatedMenuItems = [...updatedMenuItems, ...menuItems[currItem]];
    setActiveMenuItem(updatedMenuItems);
  }
  function increaseInCart(myname) {
    let updatedCartItems;

    currCartItems.find((currItem, currIndex) => {
      if (currItem.dishName === myname) {
        updatedCartItems = [...currCartItems];
        updatedCartItems[currIndex].qty += 1;
      } else {
      }
    });
    setCartItems(updatedCartItems);
  }
  function decreaseInCart(myname) {
    let updatedCartItems;

    currCartItems.find((currItem, currIndex) => {
      if (currItem.dishName === myname) {
        updatedCartItems = [...currCartItems];
        updatedCartItems[currIndex].qty -= 1;
        if (updatedCartItems[currIndex].qty === 0) {
          updatedCartItems = updatedCartItems.filter((curr) => {
            return curr.dishName !== myname;
          });
        }
      }
    });
    setCartItems(updatedCartItems);
  }
  function addToCart(newCartItem) {
    const updatedCartItems = [...currCartItems, newCartItem];

    setCartItems(updatedCartItems);
  }
  function onSearchDish(keyword) {
    if (keyword === "") {
      setActiveMenu(activeMenu);
    }
    let updatedMenuItems = [];
    menuList.forEach((currList) => {
      const searchInMenu = menuItems[currList].filter((curr) =>
        curr.dishName.toLowerCase().includes(keyword.toLowerCase())
      );
      updatedMenuItems = [...updatedMenuItems, ...searchInMenu];
    });
    setActiveMenuItem(updatedMenuItems);
  }
  function onFilter(isChecked) {
    let updatedMenuItems = [];
    if (isChecked) {
      menuList.forEach((curr) => {
        const allVegItem =
          menuItems[curr] &&
          menuItems[curr].filter((currItem) => currItem.isVeg === true);
        if (allVegItem) updatedMenuItems = [...updatedMenuItems, ...allVegItem];
      });
    } else {
      updatedMenuItems = menuItems[activeMenu];
    }
    console.log(updatedMenuItems);

    setActiveMenuItem(updatedMenuItems);
  }
  function checkoutFakeAPI() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Checkout");
      }, 2000);
    });
  }
  async function handleCheckout() {
    checkoutFakeAPI()
      .then((response) => {
        localStorage.setItem("cart", JSON.stringify(currCartItems));
        alert(response);
      })
      .catch((error) => {
        alert(`Oops Something: ${error.message}`);
      });
  }

  useEffect(() => {
    setActiveMenu(activeMenu);
    setActiveMenuItem(activeMenuItems);
    setCartItems(currCartItems);
  }, [activeMenu, currCartItems, activeMenuItems]);

  return (
    <React.StrictMode>
      <Header />
      <BreadCrumb />
      <MiddleContainer>
        <img src={FoodOffer} className="container-image" alt="food-logo"></img>

        <DishOffer />

        <OfferPercent />
      </MiddleContainer>
      <SearchFilter
        onSearchDish={onSearchDish}
        onFilter={onFilter}
      ></SearchFilter>
      <div className="test">
        <MenuList onSelect={selectedHandler} activeMenu={activeMenu} />
        <MenuContentList
          activeMenu={activeMenu}
          activeMenuList={activeMenuItems}
          addToCart={addToCart}
          currCartItems={currCartItems}
          increaseInCart={increaseInCart}
          decreaseInCart={decreaseInCart}
        />
        <CartItems
          allCartItems={currCartItems}
          increaseInCart={increaseInCart}
          decreaseInCart={decreaseInCart}
          addToLocalStorage={handleCheckout}
        />
      </div>
    </React.StrictMode>
  );
};

export default App;
