import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { logout } from '../features/auth/authSlice';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { token, role, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">StockFlow</div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/products">Products</NavLink>
        {(role === 'manager' || role === 'admin') && (
          <NavLink to="/categories">Categories</NavLink>
        )}
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      {token && (
        <div className="sidebar-user">
          {user?.username} <span className={`role-badge ${role}`}>{role}</span>
        </div>
      )}

      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>

      {token && (
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      )}
    </aside>
  );
}

export default Navbar;