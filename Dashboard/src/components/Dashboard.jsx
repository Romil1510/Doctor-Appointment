import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { GoCheckCircleFill } from "react-icons/go";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [appointmentsRes, doctorsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/v1/appoinment/getall", { 
            withCredentials: true 
          }),
          axios.get("http://localhost:3000/api/v1/user/doctors", {
            withCredentials: true,
          })
        ]);
        setAppointments(appointmentsRes.data.appointments);
        setDoctors(doctorsRes.data.doctors);
      } catch (error) {
        toast.error("Failed to fetch data");
        setAppointments([]);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/appoinment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments(prev => 
        prev.map(app => 
          app._id === appointmentId ? { ...app, status } : app
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="dashboard page">
      <h1>Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stats-card glass">
          <div className="stats-content">
            <h3>Welcome Back</h3>
            <h2>
              {admin && `${admin.firstName} ${admin.lastName}`}
            </h2>
            <p>Manage your hospital efficiently with our dashboard</p>
          </div>
          <div className="stats-icon">
            <img src="/doc.png" alt="Admin" className="floating" />
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon">
            <span>📅</span>
          </div>
          <div className="stats-content">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon">
            <span>👨‍⚕️</span>
          </div>
          <div className="stats-content">
            <p>Registered Doctors</p>
            <h3>{doctors.length}</h3>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="table-container glass">
        <div className="table-header">
          <h2>Recent Appointments</h2>
          <div className="table-actions">
            <button className="refresh-btn">Refresh Data</button>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : appointments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date & Time</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment._id}>
                  <td>
                    <div className="patient-info">
                      <span className="patient-name">
                        {`${appointment.firstName} ${appointment.lastName}`}
                      </span>
                    </div>
                  </td>
                  <td>
                    {new Date(appointment.appointment_date).toLocaleString()}
                  </td>
                  <td>
                    {appointment.doctor 
                      ? `${appointment.doctor.firstName} ${appointment.doctor.lastName}`
                      : 'N/A'}
                  </td>
                  <td>{appointment.department}</td>
                  <td>
                    <select
                      value={appointment.status}
                      onChange={(e) => 
                        handleUpdateStatus(appointment._id, e.target.value)
                      }
                      className={`status-select status-${appointment.status.toLowerCase()}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    {appointment.hasVisited ? (
                      <GoCheckCircleFill className="icon-success" />
                    ) : (
                      <AiFillCloseCircle className="icon-error" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">
            <p>No appointments found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;