import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaArrowRight
} from "react-icons/fa";

import "./footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            Stock<span>Flow</span>
          </Link>

          <p>
            Your one-stop destination for premium electronics,
            fashion, furniture, beauty products, and much more.
            Shop confidently with secure payments and fast delivery.
          </p>

          <div className="footer-social">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaGithub />
            </a>

          </div>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/shop">Shop</Link>

          <Link to="/about">About</Link>

          <Link to="/cart">Cart</Link>

          <Link to="/contact">Contact</Link>

        </div>

        <div className="footer-links">

          <h3>Categories</h3>

          <Link to="/category/smartphones">
            Smartphones
          </Link>

          <Link to="/category/laptops">
            Laptops
          </Link>

          <Link to="/category/furniture">
            Furniture
          </Link>

          <Link to="/category/fragrances">
            Fragrances
          </Link>

          <Link to="/category/groceries">
            Groceries
          </Link>

        </div>

        <div className="footer-newsletter">

          <h3>Newsletter</h3>

          <p>
            Subscribe to receive exclusive offers,
            discounts and product updates.
          </p>

          <form>

            <input
              type="email"
              placeholder="Your Email"
            />

            <button>

              <FaArrowRight />

            </button>

          </form>

        </div>

      </div>

      <div className="footer-bottom">

        <p>

          © {year} StockFlow. All Rights Reserved.

        </p>

        <div>

          <Link to="#">Privacy Policy</Link>

          <Link to="#">Terms & Conditions</Link>

        </div>

      </div>

    </footer>
  );
}

export default Footer;