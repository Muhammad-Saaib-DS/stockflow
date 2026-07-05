import { useSelector } from 'react-redux';
import { useSelector as useSelectorAlias } from 'react-redux'; // (not used, just avoiding confusion below)

function Profile() {
  const { user, role } = useSelector((state) => state.auth);
  const { items: products } = useSelector((state) => state.products);

  const myProducts = products.filter((p) => p.isLocal);
  const lowStockCount = products.filter((p) => p.quantity <= p.lowStockThreshold).length;

  return (
    <div>
      <div className="page-header">
        <h1>Profile</h1>
      </div>

      <div className="card" style={{ maxWidth: '480px' }}>
        <div className="detail-field">
          <div className="label">Username</div>
          <div className="value">{user?.username}</div>
        </div>

        <div className="detail-field">
          <div className="label">Email</div>
          <div className="value">{user?.email || 'Not provided'}</div>
        </div>

        <div className="detail-field">
          <div className="label">Role</div>
          <div className="value">
            <span className={`role-badge ${role}`}>{role}</span>
          </div>
        </div>

        <div className="detail-field">
          <div className="label">Access Level</div>
          <div className="value">
            {role === 'admin' && 'Full access — manage products, categories, and view all data.'}
            {role === 'manager' && 'Can manage products and categories.'}
            {role === 'user' && 'View-only access to products and dashboard.'}
          </div>
        </div>
      </div>

      <div className="charts-row" style={{ marginTop: '1.5rem' }}>
        <div className="chart-card" style={{ minWidth: '200px' }}>
          <h3>Products You've Added</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
            {myProducts.length}
          </p>
        </div>

        <div className="chart-card" style={{ minWidth: '200px' }}>
          <h3>Total Products Visible</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {products.length}
          </p>
        </div>

        <div className="chart-card" style={{ minWidth: '200px' }}>
          <h3>Low Stock Items</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-danger)' }}>
            {lowStockCount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;