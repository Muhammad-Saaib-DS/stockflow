import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaTags } from "react-icons/fa";

import "./promoBanner.css";

function PromoBanner() {
  return (
    <section className="promo-banner">

      <div className="promo-overlay"></div>

      <div className="promo-container">

        <motion.div
          className="promo-content"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <span className="promo-badge">
            <FaTags />
            Limited Time Offer
          </span>

          <h2>
            Up To
            <span> 50% OFF </span>
            On Premium Products
          </h2>

          <p>
            Don't miss our biggest sale of the season. Shop thousands of
            premium products with exclusive discounts available for a
            limited time only.
          </p>

          <Link to="/shop" className="promo-btn">
            Shop Now
            <FaArrowRight />
          </Link>

        </motion.div>

        <motion.div
          className="promo-image"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"
            alt="Sale Banner"
          />

        </motion.div>

      </div>

    </section>
  );
}

export default PromoBanner;