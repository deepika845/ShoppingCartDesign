import "./menuListItem.style.css";
function MenuListItem(props) {
  return (
    <li className="dish-item" key={props.currItem}>
      <a
        className={props.isActive ? "menu-link menu--active" : "menu-link"}
        onClick={props.onClick}
      >
        {props.value}
      </a>
    </li>
  );
}
export default MenuListItem;
