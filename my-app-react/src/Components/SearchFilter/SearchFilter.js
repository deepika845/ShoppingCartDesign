import "./searchFilter.style.css";
import { FaSearch } from "react-icons/fa";

function SearchFilter(props) {
  function handleInput(event) {
    props.onSearchDish(event.target.value);
  }
  function handleFilter(event) {
    props.onFilter(event.target.checked);
    console.log(event.target.checked);
  }
  return (
    <div className="search-filter">
      <div className="search_for_dishes">
        <FaSearch />
        <input
          className="search_for_dishes_input"
          type="text"
          placeholder="Search for dishes..."
          onChange={handleInput}
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
export default SearchFilter;
