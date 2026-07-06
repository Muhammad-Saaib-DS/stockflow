import { useSelector } from "react-redux";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaShoppingBag,
  FaBoxOpen,
} from "react-icons/fa";

import "./profile.css";

function Profile() {
  const { user, role } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders.items);
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <section className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          <FaUser />
        </div>

        <h1>{user?.username || "Guest User"}</h1>

        <span className="role-badge-profile">
          {role || "Customer"}
        </span>

      </div>

      <div className="profile-details">

        <div className="info-card">

          <FaEnvelope />

          <div>
            <h3>Email</h3>
            <p>{user?.email || "Not Available"}</p>
          </div>

        </div>

        <div className="info-card">

          <FaUserShield />

          <div>
            <h3>Role</h3>
            <p>{role}</p>
          </div>

        </div>

      </div>

      <div className="profile-stats">

        <div className="stat-box">

          <FaShoppingBag />

          <h2>{orders.length}</h2>

          <p>Total Orders</p>

        </div>

        <div className="stat-box">

          <FaBoxOpen />

          <h2>{cartItems.length}</h2>

          <p>Items In Cart</p>

        </div>

      </div>

    </section>
  );
}

export default Profile;