import Dashboard from "./pages/Metas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import Dashboard2 from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import UserForm from "./pages/UserForm";
import HomePage from "./pages/HomePage";
import MovesForm from "./pages/MovesForm";
import Metas from "./pages/Metas";
import AdminUserPage from "./pages/EditableUserList";
import { api } from "./api/axios";
import Logout from "./pages/Logout";
import {PrivateRoute, ManagerRoute} from "./pages/PrivateRoute";
import GoalsPage from "./pages/GoalsPage";
import EditPaymentMethodForm from "./pages/EditPaymentMethodForm";
import PaymentMethodsList from "./pages/PaymentMethodsList";
import MoveList from "./pages/MoveList";
import StatementPage from "./pages/StatementPage";
import  PaymentMethodsPage  from './pages/payment_methods/PaymentMethodsPage';
import {RecoilRoot} from 'recoil'


function App() {
  const fetchUser = async () => {
    const { data } = await api.get("/api/users/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return data;
  };

  return (
    <RecoilRoot>
      <BrowserRouter>
      <div className="App">
        <Sidebar/>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route
            element={<PrivateRoute element={<Dashboard />} />}
            path="/dashboard"
          />
          <Route element={<PrivateRoute element={<Metas />} />} path="/metas" />
          <Route element={<UserForm />} path="/signin" />
          <Route
            element={<PrivateRoute element={<MovesForm />} />}
            path="/add-move"
          />
          <Route
            element={<PrivateRoute element={<PaymentMethodsPage />} />}
            path="/payment-methods-page"
          />
          <Route
            element={<PrivateRoute element={<GoalsPage />} />}
            path="/goals-page"
          />
          <Route
            element={<PrivateRoute element={<AdminUserPage />} />}
            path="/admin-user-page"
          />
          <Route
            element={<PrivateRoute element={<StatementPage />} />}
            path="/extrato"
          />
          <Route
            element={<PrivateRoute element={<StatementPage />} />}
            path="/extrato"
          />
          <Route element={<Logout />} path="/logout" />
        </Routes>
      </div>
    </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
