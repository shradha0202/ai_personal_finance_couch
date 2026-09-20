import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">₹</div>

        <div className="logo-text">
          <h1>Finance Coach</h1>
          <span>Personal Finance</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">⌂</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">↕</span>
          <span>Transactions</span>
        </NavLink>

        <NavLink
          to="/budget"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">▣</span>
          <span>Budget</span>
        </NavLink>

        <NavLink
          to="/savings-goals"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">◎</span>
          <span>Savings Goals</span>
        </NavLink>

        <NavLink
          to="/ai-coach"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">✦</span>
          <span>AI Finance Coach</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="coach-card">
          <div className="coach-icon">✦</div>

          <div>
            <strong>Finance Coach</strong>
            <p>Manage your money smarter.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}