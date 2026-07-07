import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";
import { removeFromWishlist } from "./wishlistSlice";
import { addToCart } from "../cart/cartSlice";

import "./wishlist.css";

function Wishlist() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);

  if (items.length === 0) {
    return (
      <section className="wishlist-empty">
        <FaHeart size={40} />
        <h2>Your wishlist is empty</h2>
        <p>Tap the heart icon on any product to save it here.</p>
        <Link to="/shop" className="shop-btn">Browse Products</Link>
      </section>
    );
  }

  return (
    <section className="wishlist-page">
      <h1>My Wishlist</h1>

      <div className="wishlist-grid">
        {items.map((item) => (
          <div key={item.id} className="wishlist-card">
            <div className="wishlist-image">
              <img src={item.thumbnail} alt={item.title} />
            </div>

            <div className="wishlist-info">
              <span className="wishlist-category">{item.category}</span>
              <h3>{item.title}</h3>
              <div className="wishlist-price">${item.price}</div>

              <div className="wishlist-actions">
                <button
                  className="wishlist-add-btn"
                  onClick={() => dispatch(addToCart(item))}
                >
                  <FaShoppingCart /> Add To Cart
                </button>
                <button
                  className="wishlist-remove-btn"
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Wishlist;