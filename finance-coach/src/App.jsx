import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import SavingsGoals from "./pages/SavingsGoals";
import AICoach from "./pages/AICoach";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budget" element={<Budget />} />
          <Route path="savings" element={<SavingsGoals />} />
          <Route path="ai-coach" element={<AICoach />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;