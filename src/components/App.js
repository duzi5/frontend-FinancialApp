import Menu from "./Menu";
import Dashboard from "../pages/Dashboard";
import Dashboard2 from "../pages/Dashboard2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Context from "../store/Context";

function App() {
  return (
    <Context.Provider>
      <BrowserRouter>
        <div className="App">
          <Menu />
          <Routes>
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Dashboard2 />} path="/dashboard2" />
            <Route element={<Login />} path="/login" />
          </Routes>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
