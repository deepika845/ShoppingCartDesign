import {VegLogo} from "../../Models/ImageConstants";
import { ChilliGarlicNoodles } from "../../Models/ImageConstants";
import "./menuContentItem.style.css";
import { NonVegLogo } from "../../Models/ImageConstants";

const MenuContentItem = (props) => {
 
   return (
    <li className="menuContentItem">
      <div className="item-description">
        {/* {<img className="veg-logo" src={props.isVeg?"../"+VegLogo:NonVegLogo}></img>} */}
        <h2>
          {props.dishName}
        </h2>
        <div>₹{props.price}</div>
        <p className="faded-color">
          {props.desc}
        </p>
      </div>
      <div>
        {/* <img src={"../"+ChilliGarlicNoodles} className="image-style"></img> */}
        <div className="add-button">ADD</div>
      </div>
    </li>
  );
};
export default MenuContentItem;
