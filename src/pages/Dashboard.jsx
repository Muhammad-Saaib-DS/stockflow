import { useSelector } from "react-redux";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaTags,
  FaDollarSign,
} from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

import "./dashboard.css";

function Dashboard() {
  const products = useSelector((state) => state.products.items);
  const categories = useSelector((state) => state.categories.items);
  const orders = useSelector((state) => state.orders.items);

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  const cards = [
    { title: "Products", value: products.length, icon: <FaBoxOpen /> },
    { title: "Categories", value: categories.length, icon: <FaTags /> },
    { title: "Orders", value: orders.length, icon: <FaShoppingCart /> },
    { title: "Revenue", value: `$${revenue.toFixed(2)}`, icon: <FaDollarSign /> },
  ];

  // ---- Stock by category (bar chart) ----
  const stockByCategory = {};
  products.forEach((product) => {
    const cat = product.category || "Uncategorized";
    stockByCategory[cat] = (stockByCategory[cat] || 0) + (product.quantity ?? product.stock ?? 0);
  });
  const barChartData = Object.entries(stockByCategory).map(([category, totalStock]) => ({
    category,
    totalStock,
  }));

  // ---- Low stock health (pie chart) ----
  const lowStockProducts = products.filter(
    (p) => (p.quantity ?? p.stock ?? 0) <= (p.lowStockThreshold ?? 10)
  );
  const healthyCount = products.length - lowStockProducts.length;
  const pieChartData = [
    { name: "Healthy Stock", value: healthyCount },
    { name: "Low Stock", value: lowStockProducts.length },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's an overview of your store.</p>
      </div>

      <div className="stats-grid">
        {cards.map((card) => (
          <div className="stat-card" key={card.title}>
            <div className="stat-icon">{card.icon}</div>
            <h2>{card.value}</h2>
            <p>{card.title}</p>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>Total Stock by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalStock" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Stock Health Overview</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {pieChartData.map((entry, index) => (
                  <Cell key={entry.name} fill={index === 0 ? "#059669" : "#dc2626"} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="chart-card" style={{ marginTop: "1.5rem" }}>
          <h3>⚠️ Low Stock Alerts ({lowStockProducts.length})</h3>
          <div className="alerts-list">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="alert-item">
                <strong>{product.title}</strong>
                <span>{product.quantity ?? product.stock} / {product.lowStockThreshold ?? 10} threshold</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-panels">
        <div className="panel">
          <h2>Recent Orders</h2>
          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            orders.slice(-5).reverse().map((order) => (
              <div key={order.id} className="panel-item">
                <span>Order #{order.id}</span>
                <strong>${order.total.toFixed(2)}</strong>
              </div>
            ))
          )}
        </div>

        <div className="panel">
          <h2>Latest Products</h2>
          {products.slice(0, 5).map((product) => (
            <div key={product.id} className="panel-item">
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