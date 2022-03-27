import "./App.css";
import React from "react";
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

const App = () => {
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
        <MenuList />
        <MenuContentList />
        <CartItems />
      </div>
    </React.StrictMode>
  );
};

export default App;
