import { Link } from "react-router-dom";
import {
  FaLaptop,
  FaMobileAlt,
  FaCouch,
  FaTshirt,
  FaShoppingBag,
  FaTags,
} from "react-icons/fa";

const categoryIcons = {
  smartphones: <FaMobileAlt />,
  laptops: <FaLaptop />,
  furniture: <FaCouch />,
  mensshirts: <FaTshirt />,
  womensdresses: <FaShoppingBag />,
};

function Categories({ categories }) {
  return (
    <section className="categories-section">

      <div className="section-header">
        <span>Shop By Category</span>
        <h2>Browse Top Categories</h2>
        <p>
          Explore thousands of premium quality products from our
          most popular collections.
        </p>
      </div>

      <div className="categories-grid">

        {categories.map((category) => {

          const slug = category.slug || category.name;
          const title = category.name || category.slug;

          return (
            <Link
              key={category.id || slug}
              to={`/category/${encodeURIComponent(slug)}`}
              className="category-card"
            >

              <div className="category-icon">

                {categoryIcons[
                  slug.replace("-", "").toLowerCase()
                ] || <FaTags />}

              </div>

              <h3>{title}</h3>

              <p>Explore Collection</p>

            </Link>
          );
        })}

      </div>

    </section>
  );
}

export default Categories;