import "./Menu.css";
import { AiFillPieChart, AiFillHome, AiFillFlag, AiOutlineMenu, AiFillMail, AiFillFileImage, AiFillCalendar, AiFillSetting } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import dashboard from "../pages/Dashboard";
import { Link } from "react-router-dom"


export default (props) => {
  return (
    <div id="menu-lateral">
      
      <Link >
        <AiOutlineMenu/>
      </Link>
      <Link>
        <FaSearch />
      </Link>
      <Link>
        <AiFillHome to={'/dashboard2'}/>
      </Link>
      <Link>
        <AiFillFlag  />
      </Link>
      <Link to={'/dashboard'}>
        <AiFillPieChart />
      </Link>
      <Link>
        <AiFillMail />
      </Link>
      <Link>
        <AiFillFileImage />
      </Link>
      <Link>
        <AiFillCalendar/>
      </Link>
      <Link>
        <HiUsers />
      </Link>
      <Link>
        <AiFillSetting/>
      </Link>
    </div>
  );
};
