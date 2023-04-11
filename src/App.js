import Dashboard from "./pages/Metas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Menu from "./components/Menu";
import LoginPage from "./pages/LoginPage";
import Dashboard2 from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import UserForm from "./pages/UserForm";
import HomePage from "./pages/HomePage";
import MovesForm from "./pages/MovesForm"
import Metas from "./pages/Metas";
import AdminUserPage from "./pages/EditableUserList";
import {api} from "./api/axios";
import Logout from "./pages/Logout";
import PrivateRoute from "./pages/PrivateRoute";
import GoalsPage from "./pages/GoalsPage";
import EditPaymentMethodForm from "./pages/EditPaymentMethodForm"
import PaymentMethodsList from './pages/PaymentMethodsList';
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
    <BrowserRouter>
      <div className="App">
        <Menu />
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route
            element={<PrivateRoute element={<Dashboard />} />}
            path="/dashboard"
          />
          <Route element={<PrivateRoute element={<Metas />} />} path="/metas" />
          <Route
            element={<UserForm />}
            path="/signin"
          />
          <Route
            element={<PrivateRoute element={<MovesForm />} />}
            path="/add-move"
          />
          <Route
            element={<PrivateRoute element={<PaymentMethodsList />} />}
            path="/payment-methods-list"
          />
          <Route
            element={<PrivateRoute element={<GoalsPage />} />}
            path="/goals-page"
          />
          <Route
            element={<PrivateRoute element={<AdminUserPage />} />}
            path="/admin-user-page"
          />
          <Route element={<Logout />} path="/logout" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
