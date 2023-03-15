
import Menu from "./Menu";
import Dashboard from "../pages/Dashboard";
import Dashboard2 from "../pages/Dashboard2";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import {Routes, Route, BrowserRouter} from "react-router-dom"

function App() {
  return (
  
 <BrowserRouter>
  <div className="App">
    <Menu />
    <Routes>
      <Route element={<Dashboard/>} path="/dashboard" />
      <Route element={<Dashboard2/>} path="/dashboard2" />
    </Routes>
    

  </div>
 </BrowserRouter>
  )
}

export default App;
