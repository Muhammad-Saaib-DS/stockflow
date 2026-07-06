import { useSelector } from "react-redux";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaTags,
  FaDollarSign,
} from "react-icons/fa";

import "./dashboard.css";

function Dashboard() {
  const products = useSelector((state) => state.products.items);
  const categories = useSelector((state) => state.categories.items);
  const orders = useSelector((state) => state.orders.items);

  const revenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const cards = [
    {
      title: "Products",
      value: products.length,
      icon: <FaBoxOpen />,
    },
    {
      title: "Categories",
      value: categories.length,
      icon: <FaTags />,
    },
    {
      title: "Orders",
      value: orders.length,
      icon: <FaShoppingCart />,
    },
    {
      title: "Revenue",
      value: `$${revenue.toFixed(2)}`,
      icon: <FaDollarSign />,
    },
  ];

  return (
    <section className="dashboard-page">

      <div className="dashboard-header">

        <h1>Dashboard</h1>

        <p>
          Welcome back! Here's an overview of your store.
        </p>

      </div>

      <div className="stats-grid">

        {cards.map((card) => (

          <div
            className="stat-card"
            key={card.title}
          >

            <div className="stat-icon">

              {card.icon}

            </div>

            <h2>{card.value}</h2>

            <p>{card.title}</p>

          </div>

        ))}

      </div>

      <div className="dashboard-panels">

        <div className="panel">

          <h2>Recent Orders</h2>

          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            orders.slice(-5).reverse().map((order) => (
              <div
                key={order.id}
                className="panel-item"
              >
                <span>Order #{order.id}</span>

                <strong>
                  ${order.total.toFixed(2)}
                </strong>
              </div>
            ))
          )}

        </div>

        <div className="panel">

          <h2>Latest Products</h2>

          {products.slice(0, 5).map((product) => (

            <div
              key={product.id}
              className="panel-item"
            >

              <span>{product.title}</span>

              <strong>${product.price}</strong>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Dashboard;