import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaShoppingBag, FaStar } from "react-icons/fa";

import "./heroSection.css";

function HeroSection() {
  return (
    <section className="hero">

      <div className="hero-container">

        <div className="hero-left">

          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🔥 New Collection 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            Shop Smarter With
            <span> StockFlow</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover premium electronics, fashion, furniture,
            beauty products and much more. Enjoy secure shopping,
            fast delivery and the best prices.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/shop" className="shop-btn">
              Shop Now
              <FaArrowRight />
            </Link>

            <Link to="/about" className="learn-btn">
              Learn More
            </Link>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div>
              <h3>10K+</h3>
              <span>Products</span>
            </div>

            <div>
              <h3>25K+</h3>
              <span>Customers</span>
            </div>

            <div>
              <h3>4.9</h3>
              <span>
                <FaStar />
                Rating
              </span>
            </div>
          </motion.div>

        </div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
            alt="Hero Product"
          />

          <div className="floating-card top-card">
            <FaShoppingBag />
            <div>
              <h4>Fast Delivery</h4>
              <p>Within 24 Hours</p>
            </div>
          </div>

          <div className="floating-card bottom-card">
            ⭐ 4.9 Customer Rating
          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default HeroSection;