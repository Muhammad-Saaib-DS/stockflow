import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaEye,
} from "react-icons/fa";

import { addToCart } from "../../features/cart/cartSlice";

import "./productCard.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const {
    id,
    title,
    thumbnail,
    price,
    rating,
    category,
    discountPercentage,
  } = product;

  return (
    <motion.article
      className="product-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <div className="product-image">

        <img src={thumbnail} alt={title} />

        <span className="discount-badge">
          -{Math.round(discountPercentage)}%
        </span>

        <button className="wishlist-btn">
          <FaHeart />
        </button>

      </div>

      <div className="product-info">

        <span className="product-category">
          {category}
        </span>

        <h3>{title}</h3>

        <div className="rating-row">

          <FaStar />

          <span>{rating}</span>

        </div>

        <div className="price-row">

          <h2>${price}</h2>

        </div>

        <div className="card-buttons">

          <button
            className="add-cart-btn"
            onClick={() => dispatch(addToCart(product))}
          >
            <FaShoppingCart />

            Add To Cart

          </button>

          <Link
            to={`/shop/${id}`}
            className="view-btn"
          >
            <FaEye />
          </Link>

        </div>

      </div>
    </motion.article>
  );
}

export default ProductCard;