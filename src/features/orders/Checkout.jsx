import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearCart } from "../cart/cartSlice";
import { placeOrder } from "./ordersSlice";

import "./checkout.css";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    payment: "Cash on Delivery",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city
    ) {
      alert("Please fill all fields.");
      return;
    }

    dispatch(
      placeOrder({
        items: cartItems,
        total,
        shippingInfo: form,
      })
    );

    dispatch(clearCart());

    alert("Order placed successfully!");

    navigate("/orders");
  }

  return (
    <section className="checkout-page">

      <div className="checkout-form">
        <h1>Checkout</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={form.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />

          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
          >
            <option>Cash on Delivery</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
          </select>

          <button type="submit">Place Order</button>

        </form>
      </div>

      <div className="checkout-summary">
        <h2>Order Summary</h2>

        {cartItems.map((item) => (
          <div className="summary-item" key={item.id}>
            <span>{item.title} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="summary-total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

    </section>
  );
}

export default Checkout;