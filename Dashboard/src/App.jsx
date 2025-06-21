import axios from "axios";
import { useContext, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddNewAdmin from "./components/AddNewAdmin";
import AddNewDoctor from "./components/AddNewDoctor";
import Dashboard from "./components/Dashboard";
import Doctors from "./components/Doctor";
import Login from "./components/Login";
import Messages from "./components/Message";
import Sidebar from "./components/Sidebar";
import { Context } from "./main";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <Sidebar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;