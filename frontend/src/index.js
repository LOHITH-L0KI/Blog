import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ConfigProvider } from "./ConfigContext";

async function startApp() {
  const response = await fetch("/config.json");

  if (!response.ok) {
    throw new Error("Failed to load config.json");
  }

  const config = await response.json();

  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <ConfigProvider config={config}>
      <App />
    </ConfigProvider>
  );
}

// Start the app
startApp();