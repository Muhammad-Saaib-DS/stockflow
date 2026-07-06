import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import "./navbar.css";

function CustomerNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [search, setSearch] = useState("");

  const cartItems = useSelector((state) => state.cart.items || []);

  const auth = useSelector((state) => state.auth);

  const user = auth?.user || null;
  const isAuthenticated = Boolean(auth?.token);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(search)}`);

    setSearch("");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <header className={`customer-navbar ${sticky ? "sticky" : ""}`}>

        <div className="nav-container">

          <Link className="logo" to="/">
            Stock<span>Flow</span>
          </Link>

          <nav className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>

          <div className="nav-icons">

            <Link to="/wishlist" className="icon-btn">
              <FaHeart />
            </Link>

            <Link to="/cart" className="icon-btn cart-btn">
              <FaShoppingCart />
              {cartItems.length > 0 && (
                <span className="cart-count">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="profile-dropdown">
                <button className="profile-btn">
                  <FaUser />
                  <span>{user?.username || "Profile"}</span>
                </button>

                <div className="dropdown-menu">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/orders">My Orders</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="login-btn">
                Login
              </Link>
            )}

          </div>

          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

      </header>

      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        <NavLink to="/cart" onClick={() => setMenuOpen(false)}>Cart</NavLink>

        {!isAuthenticated && (
          <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
        )}
      </div>
    </>
  );
}

export default CustomerNavbar;