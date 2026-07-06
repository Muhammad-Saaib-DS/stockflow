import { FaSearch } from "react-icons/fa";
import "./searchBar.css";

function SearchBar({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="search-bar">

      <FaSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    </div>
  );
}

export default SearchBar;