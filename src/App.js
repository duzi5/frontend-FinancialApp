import Dashboard from "./pages/Metas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Menu from "./components/Menu"
import LoginPage from "./pages/LoginPage";
import Dashboard2 from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from 'react-query';
import UserForm from "./pages/UserForm";
import HomePage from './pages/HomePage';
import FormMovimentos from "./pages/FormMovimentos";
import Metas from "./pages/Metas";
import AdminUserPage from "./pages/EditableUserList"
function App() {

  
  return (
  
      <BrowserRouter>
        <div className="App">
          <Menu />
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<LoginPage /> } path="/login" />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Metas />} path="/metas" />
            <Route element={<UserForm />} path="/user_form" />
            <Route element={<FormMovimentos />} path="/add-move"/>
            <Route element={<AdminUserPage />} path="/admin-user-page"/>
          </Routes>

        </div>
      </BrowserRouter>
   
  );
}

export default App;
