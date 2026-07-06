import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">

        <motion.span
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
          className="hero-tag"
        >
          New Collection 2026
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
        >
          Upgrade Your Lifestyle
          <br />
          With Premium Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .4 }}
        >
          Discover thousands of premium products with unbeatable
          prices, fast delivery and secure checkout.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .6 }}
        >
          <Link className="hero-btn" to="/shop">
            Shop Now
          </Link>

          <Link className="hero-btn-outline" to="/about">
            Learn More
          </Link>
        </motion.div>

      </div>

      <motion.div
        className="hero-image"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: .8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
          alt="Hero"
        />
      </motion.div>
    </section>
  );
}

export default Hero;