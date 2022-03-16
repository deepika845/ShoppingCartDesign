import "./searchFilter.style.css";
import { FaSearch } from "react-icons/fa";

function SearchFilter() {
  return (
    <div class="search-filter">
      <div class="search_for_dishes">
        <FaSearch/>
        <input 
          class="search_for_dishes_input"
          type="text"
          placeholder="Search for dishes..."
        />
      </div>
      <div class="search_with_veg_only">
        <input
          id="veg-only-check-box"
          type="checkbox"
          class="veg-only-check-box"
        />
        <label  for="veg-only-check-box">
          Veg Only
        </label>
      </div>
    </div>
  );
}
export default SearchFilter;
