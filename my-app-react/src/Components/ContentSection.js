import BreadCrumb from "./BreadCrumbList/BreadCrumb";
import MiddleContainer from "./MiddleContainer/MiddleContainer";
import DishOffer from "./DishOffer/DishOffer";
import OfferPercent from "./OfferPercent/OfferPercent";
import SearchFilter from "./SearchFilter/SearchFilter";
import MenuList from "./MenuList/MenuList";
import MenuContentList from "./MenuContentList/MenuContentList";
import CartItems from "./CartItems/CartItems";
import { FoodOffer } from "../Models/ImageConstants";
import { withRouter } from "react-router-dom";

const ContentSection = ({ history }) => {
  return (
    <div>
      <BreadCrumb />
      <MiddleContainer>
        <img src={FoodOffer} className="container-image" alt="food-offer"></img>

        <DishOffer />

        <OfferPercent />
      </MiddleContainer>
      <SearchFilter></SearchFilter>
      <div className="test">
        <MenuList />
        <MenuContentList />
        <CartItems history={history} />
      </div>
    </div>
  );
};
export default withRouter(ContentSection);
