import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ExpenseList from "./components/expense/ExpenseList";
import ExpenseDetails from "./components/expense/ExpenseDetails";
import { AuthContextProvider } from "./contexts/AuthContext";
import Logout from "./components/logout/Logout";
import ExpenseEdit from "./components/expense/ExpenseEdit";
import ExpenseCreate from "./components/expense/ExpenseCreate";
import IsAuthenticatedGuard from "./components/common/IsAuthenticatedGuard";
import ChartList from "./components/chart/ChartList";
import ChartDetails from "./components/chart/ChartDetails";

function App() {
  return (
    <AuthContextProvider>
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route element={<IsAuthenticatedGuard />}>
              <Route
                path="/expenses/:expenseId/edit"
                element={<ExpenseEdit />}
              />
              <Route path="expenses/create" element={<ExpenseCreate />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/positions" element={<ExpenseList />} />
              <Route path="/monitor" element={<ChartList />} />
              <Route
                path="/expenses/:expenseId/details"
                element={<ExpenseDetails />}
              />
              <Route
                path="/charts/:chartId/details"
                element={<ChartDetails />}
              />
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </AuthContextProvider>
  );
}

export default App;
