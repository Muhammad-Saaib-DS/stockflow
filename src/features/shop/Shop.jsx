import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../products/productsSlice";
import { fetchCategories } from "../categories/categoriesSlice";

import SearchBar from "../../components/shop/SearchBar";
import FilterSidebar from "../../components/shop/FilterSidebar";
import SortDropdown from "../../components/shop/SortDropdown";
import ProductCard from "../../components/product/ProductCard";

import "./shop.css";

function Shop() {
  const dispatch = useDispatch();

  const {
    items: products = [],
    status,
  } = useSelector((state) => state.products);

  const {
    items: categories = [],
  } = useSelector((state) => state.categories);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }

    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, status, categories.length]);

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (selectedCategory !== "all") {
      data = data.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      data = data.filter((product) =>
        product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case "price-low":
        data.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        data.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        data.sort((a, b) => b.rating - a.rating);
        break;

      case "name":
        data.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      default:
        break;
    }

    return data;
  }, [
    products,
    searchTerm,
    selectedCategory,
    sortOption,
  ]);

  if (status === "loading") {
    return (
      <div className="shop-loading">
        Loading Products...
      </div>
    );
  }

  return (
    <section className="shop-page">

      <div className="shop-header">
        <h1>Shop</h1>
        <p>Discover premium products at the best prices.</p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="shop-layout">

        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="shop-content">

          <SortDropdown
            sortOption={sortOption}
            setSortOption={setSortOption}
          />

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-products">
              <h2>No Products Found</h2>
              <p>Try another search or category.</p>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}

export default Shop;