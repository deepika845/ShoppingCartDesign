import React, { useEffect, useState } from "react";
import "./App.css";

import Header from "./Components/Header/Header.js";
import BreadCrumb from "./Components/BreadCrumbList/BreadCrumb.js";
import DishOffer from "./Components//DishOffer/DishOffer.js";
import MiddleContainer from "./Components/MiddleContainer/MiddleContainer";
import DishDetails from "./Components/DishDetails/DishDetails.js";
import FoodOffer from "./Images/Food_Offer.png";
import SearchFilter from "./Components/SearchFilter/SearchFilter.js"
import MenuList from "./Components/MenuList/MenuList.js";
import MenuContentList from "./Components/MenuContentList/MenuContentList";
import OfferPercent from "./Components/OfferPercent/OfferPercent";
import CartItems from "./Components/CartItems/CartItems.js";
import dishModel from "./Models/dishModel.js";
import menuList from "./Models/menuListModel";
const App = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Recommended");
  const [currCartItems, setCartItems] = useState([]);
  function selectedHandler(currItem) {
    setActiveMenuItem(currItem);
  }
  function increaseInCart(myname) {
    console.log("increase in cart", myname);
    let updatedCartItems;
    console.log("before loop : ", currCartItems);
    for (let i = 0; i < currCartItems.length; i++) {
      if (currCartItems[i].dishName === myname) {
        updatedCartItems = [...currCartItems];
        updatedCartItems[i].qty += 1;
        console.log("updated one : ", updatedCartItems);
        console.log("old one : ", currCartItems);
        break;
      }
    }
    setCartItems(updatedCartItems);
  }
  function decreaseInCart(myname) {
    console.log("increase in cart", myname);
    let updatedCartItems;
    console.log("before loop : ", currCartItems);
    for (let i = 0; i < currCartItems.length; i++) {
      if (currCartItems[i].dishName === myname) {
        updatedCartItems = [...currCartItems];
        updatedCartItems[i].qty -= 1;
        if (updatedCartItems[i].qty === 0) {
          updatedCartItems = updatedCartItems.filter((curr) => {
           return curr.dishName !== myname;
          });
        }
        console.log("updated one : ", updatedCartItems);
        console.log("old one : ", currCartItems);
        break;
      }
    }
    setCartItems(updatedCartItems);
  }
  function addToCart(newCartItem) {
    const updatedCartItems = [...currCartItems, newCartItem];
    console.log("new cart items", updatedCartItems);
    setCartItems(updatedCartItems);
  }

  useEffect(() => {
    setActiveMenuItem(activeMenuItem);
    setCartItems(currCartItems);
    //console.log("increase in cart", currCartItems);
  }, [activeMenuItem, currCartItems]);

  return (
    <React.StrictMode>
      <Header />
      <BreadCrumb />
      <MiddleContainer>
        <img src={FoodOffer} className="container-image"></img>

        <DishOffer />

        <OfferPercent />
      </MiddleContainer>
      <SearchFilter></SearchFilter>
      <div className="test">
        <MenuList onSelect={selectedHandler} activeMenuu={activeMenuItem} />
        <MenuContentList
          activeMenuItem={activeMenuItem}
          addToCart={addToCart}
          currCartItems={currCartItems}
          increaseInCart={increaseInCart}
          decreaseInCart ={decreaseInCart}
        />
        <CartItems
          allCartItems={currCartItems}
          increaseInCart={increaseInCart}
          decreaseInCart ={decreaseInCart}
        />
      </div>
    </React.StrictMode>
  );
};

export default App;
