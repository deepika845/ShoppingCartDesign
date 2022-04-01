import Header_Logo from "../../Images/Header_Logo.png";
import "./header.style.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { GiShakingHands } from "react-icons/gi";
import { MdLocalOffer } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
const Header = () => {
  return (
    <div className="header">
      <img type="link" src={Header_Logo} className="header-logo" />
      <div className="header-address">
        <span className="header-address__primary">Shahdara</span>
        <span className="header-header-address__secondary">
          Block N Shahdara, Delhi, 110032, India
        </span>
      </div>
      <ul className="header-bar-navigation">
        <li className="header-bar-navigation--child">
          <span>
            <FaSearch />
          </span>

          <span>Search</span>
        </li>
        <li className="header-bar-navigation--child">
          <span>
            <MdLocalOffer />
          </span>
          <span>Offer</span>
        </li>
        <li className="header-bar-navigation--child">
          <span>
            <GiShakingHands />
          </span>
          <span>Help</span>
        </li>
        <li className="header-bar-navigation--child">
          <span>
            <CgProfile />
          </span>
          <span>Profile</span>
        </li>
        <li className="header-bar-navigation--child">
          <span>
            <FaShoppingCart />
          </span>
          <span>Cart</span>
        </li>
      </ul>
    </div>
  );
};
export default Header;
