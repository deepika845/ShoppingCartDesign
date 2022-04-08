import "./breadCrumbItem.style.css";

function BreadCrumbItem(props) {
  return (
    <a href="#" className="breadCrumbItem">
      {props.value}
    </a>
  );
}
export default BreadCrumbItem;
