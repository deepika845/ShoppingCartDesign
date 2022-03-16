import MiddleContainer from "../../Components/MiddleContainer/MiddleContainer.js";
import "./container.style.css";
function Container(props) {
  return <div className="container">{props.children}</div>;
}
export default Container;
