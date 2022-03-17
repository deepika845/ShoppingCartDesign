import "./menuList.style.css";
import menuListModel from "../../Models/menuListModel";
import { useEffect, useState } from "react";

function MenuList(props) {

  const selectTheMenuItem = (event) => {
    console.log(event.target.textContent)
    props.onSelect(event.target.textContent);
    
  };
  // const [activeState, setActiveState] = useState('Recommended');
  // function selectTheMenuItem(index) {
  //   setActiveState(index);
  // }
  // useEffect(() => {
  //   props.onSelect(activeState);
  // },[activeState])

  return (
    <ul className="menu-list">
      {menuListModel.map((item, index) => (
        <li className="dish-item" key={index} onClick={selectTheMenuItem}>
          <a
            className={
              item === props.activeMenu ? "menu-link menu--active" : "menu-link"
            }
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}
export default MenuList;
