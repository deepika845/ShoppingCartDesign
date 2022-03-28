import "./searchFilter.style.css";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";
import {
  setVegOnlyFilter,
  changeActiveMenuList,
  setSearchFilter,
} from "../../redux/actions";

function SearchFilter({
  activeState,
  changeActiveMenuList,
  setVegOnlyFilter,
  setSearchFilter,
}) {
  function handleSearch(event) {
    setSearchFilter(event.target.value);
  }
  function handleFilter(event) {
    if (event.target.checked) {
      setVegOnlyFilter();
    } else {
      changeActiveMenuList(activeState);
    }
  }
  return (
    <div className="search-filter">
      <div className="search_for_dishes">
        <FaSearch />
        <input
          className="search_for_dishes_input"
          type="text"
          placeholder="Search for dishes..."
          onChange={handleSearch}
        />
      </div>
      <div className="search_with_veg_only">
        <input
          onChange={handleFilter}
          id="veg-only-check-box"
          type="checkbox"
          className="veg-only-check-box"
        />
        <label htmlFor="veg-only-check-box">Veg Only</label>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { activeMenu } = state;
  const { activeState } = activeMenu;
  return { activeState };
};
export default connect(mapStateToProps, {
  changeActiveMenuList,
  setVegOnlyFilter,
  setSearchFilter,
})(SearchFilter);
