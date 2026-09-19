import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  WalletCards,
  PiggyBank,
  Bot,
} from "lucide-react";

function Sidebar() {
  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: Receipt,
    },
    {
      name: "Budget",
      path: "/budget",
      icon: WalletCards,
    },
    {
      name: "Savings Goals",
      path: "/savings",
      icon: PiggyBank,
    },
    {
      name: "AI Finance Coach",
      path: "/ai-coach",
      icon: Bot,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">₹</div>

        <div>
          <h2>Finance</h2>
          <span>Coach</span>
        </div>
      </div>

      <nav>
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <Icon size={20} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <p>Your finances, simplified.</p>
      </div>
    </aside>
  );
}

export default Sidebar;