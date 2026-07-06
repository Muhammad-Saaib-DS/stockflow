import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts } from "../../features/products/productsSlice";
import ProductCard from "../product/ProductCard";

import "./featuredProducts.css";

function FeaturedProducts() {
  const dispatch = useDispatch();

  const {
    items: products = [],
    status,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const featuredProducts = products.slice(0, 8);

  if (status === "loading") {
    return (
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Loading Products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-section">

      <div className="section-header">

        <h2>Featured Products</h2>

        <p>
          Discover our most popular products carefully selected
          for our customers.
        </p>

      </div>

      <div className="featured-grid">

        {featuredProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

      <div className="view-all">

        <Link to="/shop">

          View All Products

        </Link>

      </div>

    </section>
  );
}

export default FeaturedProducts;