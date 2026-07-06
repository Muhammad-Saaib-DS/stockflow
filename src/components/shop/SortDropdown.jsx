import "./sortDropdown.css";

function SortDropdown({ sortOption, setSortOption }) {
  return (
    <div className="sort-dropdown">

      <label htmlFor="sort">
        Sort By
      </label>

      <select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="default">Default</option>

        <option value="price-low">
          Price: Low to High
        </option>

        <option value="price-high">
          Price: High to Low
        </option>

        <option value="rating">
          Highest Rated
        </option>

        <option value="name">
          Name (A - Z)
        </option>

      </select>

    </div>
  );
}

export default SortDropdown;