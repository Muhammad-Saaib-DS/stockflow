import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingBag,
} from "react-icons/fa";

import {
  removeFromCart,
  updateQuantity,
} from "./cartSlice";

import "./cart.css";

function Cart() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section className="empty-cart">

        <FaShoppingBag />

        <h2>Your Cart Is Empty</h2>

        <p>
          Looks like you haven't added any products yet.
        </p>

        <Link to="/shop" className="shop-btn">
          Continue Shopping
        </Link>

      </section>
    );
  }

  return (
    <section className="cart-page">

      <div className="cart-left">

        <h1>Shopping Cart</h1>

        {items.map((item) => (

          <div className="cart-item" key={item.id}>

            <img
              src={item.thumbnail}
              alt={item.title}
            />

            <div className="cart-info">

              <h3>{item.title}</h3>

              <p>${item.price}</p>

              <div className="quantity-controls">

                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                >
                  <FaMinus />
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                >
                  <FaPlus />
                </button>

              </div>

            </div>

            <div className="cart-actions">

              <h3>
                $
                {(item.price * item.quantity).toFixed(2)}
              </h3>

              <button
                className="delete-btn"
                onClick={() =>
                  dispatch(removeFromCart(item.id))
                }
              >
                <FaTrash />
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="cart-summary">

        <h2>Order Summary</h2>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className="summary-row total">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <Link
          to="/checkout"
          className="checkout-btn"
        >
          Proceed To Checkout
        </Link>

      </div>

    </section>
  );
}

export default Cart;