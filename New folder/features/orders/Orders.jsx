import { useSelector } from 'react-redux';

function Orders() {
  const { items } = useSelector((state) => state.orders);

  if (items.length === 0) {
    return (
      <div>
        <div className="page-header"><h1>My Orders</h1></div>
        <p className="state-message">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header"><h1>My Orders</h1></div>

      {items.map((order) => (
        <div key={order.id} className="card" style={{ marginBottom: '1rem' }}>
          <div className="detail-field" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'none' }}>
            <div>
              <div className="label">Order Date</div>
              <div className="value">{new Date(order.date).toLocaleString()}</div>
            </div>
            <span className="role-badge user">{order.status}</span>
          </div>

          <ul style={{ marginTop: '0.75rem' }}>
            {order.items.map((item) => (
              <li key={item.id} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                {item.title} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>

          <div className="detail-field" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'none', marginTop: '0.75rem' }}>
            <strong>Total</strong>
            <strong>${order.total.toFixed(2)}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;