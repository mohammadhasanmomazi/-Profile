import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin025096" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AppProvider>
  </React.StrictMode>
);
