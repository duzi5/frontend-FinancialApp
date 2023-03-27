import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MenuToggle from "./pages/MenuToggle";
import LoginPage from "./pages/LoginPage";
import Dashboard2 from "./pages/Dashboard2";
import { QueryClient, QueryClientProvider } from 'react-query';
import UserForm from "./pages/UserForm";
function App() {
  
  return (
  
      <BrowserRouter>
        <div className="App">
          <MenuToggle>
          </MenuToggle>
          <Routes>
            <Route element={<LoginPage /> } path="/login" />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Dashboard2 />} path="/dashboard2" />
            <Route element={<UserForm />} path="/user_form" />
          </Routes>

        </div>
      </BrowserRouter>
   
  );
}

export default App;
