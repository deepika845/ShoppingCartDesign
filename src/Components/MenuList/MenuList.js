import "./menuList.style.css";
import menuListModel from "../../Models/menuListModel";
import { changeActiveMenu, changeActiveMenuList } from "../../redux/actions";
import { connect } from "react-redux";
import { getActiveMenu } from "../../redux/selectors.js";
import { bindActionCreators } from "redux";
function MenuList({ activeState, changeActiveMenu, changeActiveMenuList }) {
  function renderCategory(isActiveMenu, categoryName) {
    return (
      <li
        className="dish-item"
        key={categoryName}
        onClick={() => {
          changeActiveMenu(categoryName);
          changeActiveMenuList(categoryName);
        }}
      >
        <a className={isActiveMenu ? "menu-link menu--active" : "menu-link"}>
          {categoryName}
        </a>
      </li>
    );
  }
  return (
    <ul className="menu-list">
      {menuListModel.map((curr) => renderCategory(curr === activeState, curr))}
    </ul>
  );
}
const mapStateToProps = (state) => {
  const { activeState } = getActiveMenu(state);
  return { activeState };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { changeActiveMenu, changeActiveMenuList },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
