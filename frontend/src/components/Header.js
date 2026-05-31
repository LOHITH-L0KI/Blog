import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginDropdown from './LoginDropdown';
import './Header.css';

function Header({ isLoggedIn, user, onLogin, onLogout }) {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <h1>📚 Programming Blog</h1>
          </Link>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <div className="login-container">
                <button 
                  className="login-icon"
                  onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                  title={isLoggedIn ? `Logged in as ${user?.username}` : 'Login'}
                >
                  {isLoggedIn ? '👤' : '🔒'}
                </button>
                {showLoginDropdown && (
                  <LoginDropdown 
                    isLoggedIn={isLoggedIn}
                    user={user}
                    onLogin={onLogin}
                    onLogout={onLogout}
                    onClose={() => setShowLoginDropdown(false)}
                  />
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
