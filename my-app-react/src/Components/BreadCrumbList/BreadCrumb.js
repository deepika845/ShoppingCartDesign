import BreadCrumbItem from "./BreadCrumbItem";
import "./breadCrumb.style.css";
const navItems = ["Home", "Delhi", "Geeta Colony", "Tsar a Casual Dinner"];

function BreadCrumb() {
  return (
    <div className="bread-crumb-list">
      {navItems.map((navItem) => (
        <BreadCrumbItem value={navItem} key={navItem}></BreadCrumbItem>
      ))}
    </div>
  );
}
export default BreadCrumb;
