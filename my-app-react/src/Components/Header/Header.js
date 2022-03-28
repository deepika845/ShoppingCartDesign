//import { HeaderLogo } from "../../Models/ImageConstants.js";
import  Header_Logo  from "../../Images/Header_Logo.png";
import "./header.style.css";

const Header = () => {
  return (
    <div className="header">
      <img type="link" src={ Header_Logo} className="header-logo" />
      <div className="header-address">
        <span className="header-address__primary">Shahdara</span>
        <span className="header-header-address__secondary">
          Block N Shahdara, Delhi, 110032, India
        </span>
      </div>
      <ul className="header-bar-navigation">
        <li className="header-bar-navigation--child">Search</li>
        <li className="header-bar-navigation--child">Offer</li>
        <li className="header-bar-navigation--child">Help</li>
        <li className="header-bar-navigation--child">Profile</li>
        <li className="header-bar-navigation--child">Cart</li>
      </ul>
    </div>
  );
};
export default Header;
