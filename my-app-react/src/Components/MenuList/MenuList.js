import "./menuList.style.css";
import menuListModel from "../../Models/menuListModel";
import { changeActiveMenu, changeActiveMenuList } from "../../redux/actions";
import { connect } from "react-redux";
import { getActiveMenu } from "../../redux/selectors.js";
function MenuList({ activeState, changeActiveMenu, changeActiveMenuList }) {
  return (
    <ul className="menu-list">
      {menuListModel.map((item, index) => (
        <li
          className="dish-item"
          key={index}
          onClick={() => {
            changeActiveMenu(item);
            changeActiveMenuList(item);
          }}
        >
          <a
            className={
              item === activeState ? "menu-link menu--active" : "menu-link"
            }
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}
const mapStateToProps = (state) => {
  const { activeState } = getActiveMenu(state);
  return { activeState };
};

export default connect(mapStateToProps, {
  changeActiveMenu,
  changeActiveMenuList,
})(MenuList);
