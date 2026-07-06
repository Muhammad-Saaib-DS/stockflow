import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useTheme } from "../../context/ThemeContext";

import {
  FaBoxOpen,
  FaClipboardList,
  FaMoon,
  FaSignOutAlt,
  FaSun,
  FaTachometerAlt,
  FaTags,
  FaUserCircle,
} from "react-icons/fa";

import "./adminSidebar.css";

function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  const { user, role } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>
          Stock<span>Flow</span>
        </h2>
      </div>

      <nav className="sidebar-menu">

        <NavLink to="/dashboard">
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/products">
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        {(role === "admin" || role === "manager") && (
          <NavLink to="/categories">
            <FaTags />
            <span>Categories</span>
          </NavLink>
        )}

        <NavLink to="/profile">
          <FaUserCircle />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/orders">
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

      </nav>

      <div className="sidebar-footer">

        <div className="admin-info">

          <div className="avatar">
            {user?.username?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <div>

            <h4>{user?.username}</h4>

            <p>{role}</p>

          </div>

        </div>

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <>
              <FaMoon />
              Dark Mode
            </>
          ) : (
            <>
              <FaSun />
              Light Mode
            </>
          )}
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </aside>
  );
}

export default AdminSidebar;