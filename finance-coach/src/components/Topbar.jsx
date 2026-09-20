import { Bell } from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">
      <div>
        <p className="welcome">Welcome back 👋</p>
        <h1>Personal Finance Dashboard</h1>
      </div>

      <button className="notification">
        <Bell size={20} />
      </button>
    </header>
  );
}

export default Topbar;