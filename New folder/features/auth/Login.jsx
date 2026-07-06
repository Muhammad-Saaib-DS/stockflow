import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './authSlice';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  }

  return (
    <div className="auth-page-pro">
      <div className="card auth-card-pro">
        <div className="auth-logo-pro">
          <div className="icon-box">📦</div>
          <h2>StockFlow</h2>
          <p className="subtitle">Sign in to manage your inventory</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={status === 'loading'} style={{ width: '100%' }}>
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>

        <div className="auth-hint-pro">
          <p>Test Accounts</p>
          <div className="account-row"><span>Admin</span><span><b>emilys</b> / emilyspass</span></div>
          <div className="account-row"><span>Manager</span><span><b>michaelw</b> / michaelwpass</span></div>
          <div className="account-row"><span>User</span><span><b>sophiab</b> / sophiabpass</span></div>
        </div>
      </div>
    </div>
  );
}

export default Login;