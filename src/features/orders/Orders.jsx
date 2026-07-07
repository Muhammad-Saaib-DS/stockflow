import { FaBoxOpen, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder } from "./ordersSlice";

import "./orders.css";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.items);

  function handleDelete(orderId) {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    if (confirmed) {
      dispatch(deleteOrder(orderId));
    }
  }

  if (orders.length === 0) {
    return (
      <section className="orders-empty">
        <FaBoxOpen />
        <h2>No Orders Yet</h2>
        <p>Your placed orders will appear here.</p>
      </section>
    );
  }

  return (
    <section className="orders-page">
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div className="order-card" key={order.id}>

          <div className="order-header">
            <div>
              <h2>Order #{order.id}</h2>
              <p>{new Date(order.date).toLocaleString()}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span className="status">{order.status}</span>

              <button
                onClick={() => handleDelete(order.id)}
                style={{
                  background: "none",
                  border: "1px solid #fca5a5",
                  color: "#dc2626",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.85rem",
                }}
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>

          <div className="order-items">
            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.thumbnail} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>

          <div className="order-total">
            Total
            <span>${order.total.toFixed(2)}</span>
          </div>

        </div>
      ))}
    </section>
  );
}

export default Orders;