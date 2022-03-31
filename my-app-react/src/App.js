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
    updatedMenuItems = [...updatedMenuItems, ...menuItems[currItem]]
  
    setActiveMenuItem(updatedMenuItems);
  }
  function increaseInCart(myname) {
  
    let updatedCartItems;
   
    for (let i = 0; i < currCartItems.length; i++) {
      if (currCartItems[i].dishName === myname) {
        updatedCartItems = [...currCartItems];
        updatedCartItems[i].qty += 1;
       
       
        break;
      }
    }
    setCartItems(updatedCartItems);
  }
  function decreaseInCart(myname) {
    console.log("increase in cart", myname);
    let updatedCartItems;
    
    for (let i = 0; i < currCartItems.length; i++) {
      if (currCartItems[i].dishName === myname) {
        updatedCartItems = [...currCartItems];
        updatedCartItems[i].qty -= 1;
        if (updatedCartItems[i].qty === 0) {
          updatedCartItems = updatedCartItems.filter((curr) => {
            return curr.dishName !== myname;
          });
        }
        
       
        break;
      }
    }
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
    for (let i = 0; i < menuList.length; i++) {
      const searchInMenu = menuItems[menuList[i]].filter((curr) =>
        curr.dishName.toLowerCase().includes(keyword.toLowerCase())
      );
      updatedMenuItems = [...updatedMenuItems, ...searchInMenu];
    }
    setActiveMenuItem(updatedMenuItems);
  }
  function onFilter(isChecked) {
    let updatedMenuItems = [];
    if (isChecked) {
      for (let i = 0; i < menuList.length; i++) {
        const vegItems = menuItems[menuList[i]].filter((curr) => {
          return curr.isVeg === true;
        });
        updatedMenuItems = [...updatedMenuItems, ...vegItems];
      }
    }
    else {
      updatedMenuItems = menuItems[activeMenu];
    }
    
    setActiveMenuItem(updatedMenuItems);
    
  }
  function handlePromise() {
    return new Promise(function (resolve, reject) {
      const userdata = fetch("https://api.github.com/users").then(
        (response) => {
          if (response.status === 200) {
            alert("Success...")
            resolve();
          } else {
            reject("Error found");
          }
        }
      );
    });
  }
  function addToLocalStorage() {
    handlePromise().then(
      function () {
        localStorage.setItem("cartList", JSON.stringify(currCartItems));
      
      },
      function (param) {
       alert('Error')
      }
    );
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
        <img src={FoodOffer} className="container-image"></img>

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
          addToLocalStorage={addToLocalStorage}
        />
      </div>
    </React.StrictMode>
  );
};

export default App;
