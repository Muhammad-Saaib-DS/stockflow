import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { loginUser } from "./authSlice";

import "./login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, token } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(form));
  }

  return (
    <section className="login-page">

      <div className="login-left">
        <h1>StockFlow</h1>
        <h2>Inventory Management System</h2>
        <p>
          Manage products, categories, orders,
          customers and inventory with one
          professional dashboard.
        </p>
      </div>

      <div className="login-right">
        <form className="login-card" onSubmit={handleSubmit}>

          <h2>Welcome Back</h2>
          <p>Login to continue</p>

          <div className="input-box">
            <FaUser />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaLock />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn" disabled={status === "loading"}>
            {status === "loading" ? "Logging In..." : "Login"}
          </button>

        </form>
      </div>

    </section>
  );
}

export default Login;