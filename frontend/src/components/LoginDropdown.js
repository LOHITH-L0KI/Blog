import React, { useState } from 'react';
import './LoginDropdown.css';

function LoginDropdown({ isLoggedIn, user, onLogin, onLogout, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await onLogin(username, password);
    setLoading(false);

    if (result.success) {
      setUsername('');
      setPassword('');
      onClose();
    } else {
      setError(result.error);
    }
  };

  const handleLogout = async () => {
    await onLogout();
    onClose();
  };

  return (
    <div className="login-dropdown">
      {isLoggedIn ? (
        <div className="logged-in-section">
          <p className="welcome-text">Welcome, {user?.username}!</p>
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && <div className="error-text">{error}</div>}
          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginDropdown;
