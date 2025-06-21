import axios from "axios";
import { useContext, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdAddModerator } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("http://localhost:3000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navItems = [
    {
      icon: <TiHome size={28} />,
      label: "Home",
      path: "/",
      action: () => navigateTo("/"),
    },
    {
      icon: <FaUserDoctor size={28} />,
      label: "Doctors",
      path: "/doctors",
      action: () => navigateTo("/doctors"),
    },
    {
      icon: <MdAddModerator size={28} />,
      label: "Add Admin",
      path: "/admin/addnew",
      action: () => navigateTo("/admin/addnew"),
    },
    {
      icon: <IoPersonAddSharp size={28} />,
      label: "Add Doctor",
      path: "/doctor/addnew",
      action: () => navigateTo("/doctor/addnew"),
    },
    {
      icon: <AiFillMessage size={28} />,
      label: "Messages",
      path: "/messages",
      action: () => navigateTo("/messages"),
    },
    {
      icon: <RiLogoutBoxFill size={28} />,
      label: "Logout",
      action: handleLogout,
    },
  ];

  if (!isAuthenticated) return null;

  return (
    <>
      <nav className={`sidebar ${show ? "show" : ""}`}>
        <div className="links">
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => {
                item.action();
                setShow(false);
              }}
            >
              {item.icon}
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
      
      <div className="wrapper">
        <GiHamburgerMenu 
          className="hamburger" 
          size={28}
          onClick={() => setShow(!show)} 
        />
      </div>
    </>
  );
};

export default Sidebar;