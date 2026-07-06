import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaTruck,
  FaUndo,
  FaShieldAlt,
} from "react-icons/fa";

import { fetchProducts } from "../products/productsSlice";
import { addToCart } from "../cart/cartSlice";

import "./shopProductDetail.css";

function ShopProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { items, status } = useSelector(
    (state) => state.products
  );

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const product = items.find(
    (item) => item.id === Number(id)
  );

  if (status === "loading") {
    return (
      <div className="detail-loading">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="detail-loading">
        Product Not Found
      </div>
    );
  }

  return (
    <section className="product-detail">

      <div className="detail-grid">

        <motion.div
          className="detail-image"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >

          <img
            src={product.thumbnail}
            alt={product.title}
          />

        </motion.div>

        <motion.div
          className="detail-info"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >

          <span className="detail-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <div className="detail-rating">

            <FaStar />

            <span>{product.rating}</span>

          </div>

          <div className="detail-price">

            ${product.price}

          </div>

          <p className="detail-description">

            {product.description}

          </p>

          <div className="quantity-box">

            <button
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                setQuantity((q) => q + 1)
              }
            >
              +
            </button>

          </div>

          <div className="detail-buttons">

            <button
              className="add-btn"
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  dispatch(addToCart(product));
                }
              }}
            >
              <FaShoppingCart />

              Add To Cart

            </button>

            <button className="wish-btn">

              <FaHeart />

            </button>

          </div>

          <div className="detail-features">

            <div>

              <FaTruck />

              Fast Delivery

            </div>

            <div>

              <FaUndo />

              Easy Returns

            </div>

            <div>

              <FaShieldAlt />

              Secure Payment

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default ShopProductDetail;