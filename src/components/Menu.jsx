import "./Menu.css";
import { AiFillPieChart, AiFillHome, AiFillFlag, AiOutlineMenu, AiFillMail, AiFillFileImage, AiFillCalendar, AiFillSetting } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import dashboard from "../pages/Dashboard";
import { Link } from "react-router-dom"


export default (props) => {

  

  
  
  
  return (
    <div id="menu-lateral">
      
      <Link className="link">
        <AiOutlineMenu/>
      </Link>
      <Link className="link">
        <FaSearch />
      </Link>
      <Link className="link">
        <AiFillHome  />
      </Link>
      <Link to={'/dashboard2'} >
        <AiFillFlag  />
      </Link>
      <Link className="link" id="icoDashboard" to={'/dashboard'}>
        <AiFillPieChart />
      </Link>
      <Link className="link">
        <AiFillMail />
      </Link>
      <Link className="link">
        <AiFillFileImage />
      </Link>
      <Link className="link">
        <AiFillCalendar/>
      </Link>
      <Link className="link">
        <HiUsers />
      </Link>
      <Link className="link">
        <AiFillSetting/>
      </Link>
    </div>
  );
};
