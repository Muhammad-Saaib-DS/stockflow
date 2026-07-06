import "./filterSidebar.css";

function FilterSidebar({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <aside className="filter-sidebar">

      <div className="filter-card">

        <h3>Categories</h3>

        <button
          className={
            selectedCategory === "all"
              ? "category-btn active"
              : "category-btn"
          }
          onClick={() => setSelectedCategory("all")}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category.slug || category.name}
            className={
              selectedCategory === (category.slug || category.name)
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() =>
              setSelectedCategory(category.slug || category.name)
            }
          >
            {category.name}
          </button>
        ))}

      </div>

    </aside>
  );
}

export default FilterSidebar;