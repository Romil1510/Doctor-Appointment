import { useContext, useEffect } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import Appointment from "../src/pages/Appointment"
import './App.css'
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { Context } from "./main"
import AboutUs from "./pages/AboutUs"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {

   const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/user/me", {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      setUser(data.user);
    } catch (err) {
      setIsAuthenticated(false);
      setUser({});
    }
  };
  fetchUser();
}, []);


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      <Footer/>
        <ToastContainer position="top-center" />

      </Router>
      
    </>
  );
}

export default App
