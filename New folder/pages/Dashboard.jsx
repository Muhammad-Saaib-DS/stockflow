import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { fetchProducts } from '../features/products/productsSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const { user, role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const stockByCategory = {};
  items.forEach((product) => {
    const cat = product.category || 'Uncategorized';
    stockByCategory[cat] = (stockByCategory[cat] || 0) + product.quantity;
  });
  const barChartData = Object.entries(stockByCategory).map(([category, totalStock]) => ({
    category,
    totalStock,
  }));

  const lowStockCount = items.filter((p) => p.quantity <= p.lowStockThreshold).length;
  const healthyStockCount = items.length - lowStockCount;
  const pieChartData = [
    { name: 'Healthy Stock', value: healthyStockCount },
    { name: 'Low Stock', value: lowStockCount },
  ];

  const lowStockProducts = items
    .filter((p) => p.quantity <= p.lowStockThreshold)
    .sort((a, b) => (a.quantity - a.lowStockThreshold) - (b.quantity - b.lowStockThreshold));

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <span>
          Welcome, {user?.username} <span className={`role-badge ${role}`}>{role}</span>
        </span>
      </div>

      {status === 'loading' && <p className="state-message">Loading dashboard data...</p>}

      {status === 'succeeded' && (
        <>
          <div className="charts-row">
            <div className="chart-card">
              <h3>Total Stock by Category</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
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
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={entry.name} fill={index === 0 ? '#059669' : '#dc2626'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ marginTop: '1.5rem' }}>
            <h3>⚠️ Low Stock Alerts ({lowStockProducts.length})</h3>
            <div className="alerts-list">
              {lowStockProducts.length === 0 ? (
                <p className="state-message">All products are sufficiently stocked.</p>
              ) : (
                lowStockProducts.map((product) => (
                  <div key={product.id} className="alert-item">
                    <strong>{product.title}</strong>
                    <span>{product.quantity} / {product.lowStockThreshold} threshold</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;