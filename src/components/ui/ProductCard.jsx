import { Link } from "react-router-dom";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="product-card"
    >
      <div className="product-image-box">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="product-image"
        />

        <span className="discount-badge">
          -{Math.round(product.discountPercentage)}%
        </span>

        <div className="product-overlay">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="circle-btn"
          >
            <FaShoppingCart />
          </button>

          <Link
            to={`/shop/${product.id}`}
            className="circle-btn"
          >
            <FaEye />
          </Link>
        </div>
      </div>

      <div className="product-info">

        <span className="product-brand">
          {product.brand}
        </span>

        <h3>{product.title}</h3>

        <div className="rating">

          <FaStar color="#facc15"/>

          <span>
            {product.rating}
          </span>

        </div>

        <div className="price-row">

          <h2>

            ${product.price}

          </h2>

          <del>

            $
            {Math.round(
              product.price +
                (product.price *
                  product.discountPercentage) /
                  100
            )}

          </del>

        </div>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="add-cart-btn"
        >
          Add To Cart
        </button>

      </div>
    </motion.div>
  );
}

export default ProductCard;