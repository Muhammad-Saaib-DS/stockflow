import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaLaptop,
  FaMobileAlt,
  FaTshirt,
  FaCouch,
  FaShoppingBag,
  FaHeart,
  FaGem,
  FaHome,
} from "react-icons/fa";

import "./categorySection.css";

const iconMap = {
  smartphones: <FaMobileAlt />,
  laptops: <FaLaptop />,
  furniture: <FaCouch />,
  groceries: <FaShoppingBag />,
  beauty: <FaHeart />,
  fragrances: <FaGem />,
  "home-decoration": <FaHome />,
  tops: <FaTshirt />,
};

function CategorySection() {
  const { items: categories = [], status } = useSelector(
    (state) => state.categories
  );

  if (status === "loading") {
    return (
      <section className="category-section">
        <div className="section-header">
          <h2>Shop By Category</h2>
          <p>Loading categories...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="category-section">

      <div className="section-header">
        <h2>Shop By Category</h2>

        <p>
          Explore thousands of products across our most popular
          categories.
        </p>
      </div>

      <div className="category-grid">

        {categories.map((category, index) => (
          <motion.div
            key={category.slug || category.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
            }}
          >
            <Link
              className="category-card"
              to={`/category/${category.slug || category.name}`}
            >
              <div className="category-icon">
                {iconMap[category.slug] || <FaShoppingBag />}
              </div>

              <h3>{category.name}</h3>

              <span>Explore Products</span>
            </Link>
          </motion.div>
        ))}

      </div>

    </section>
  );
}

export default CategorySection;