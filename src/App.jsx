import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles
import Home from "./components/Home/Home.jsx";
import Navbar from "./components/Navbar/navbar";
import AddEvent from "./components/AddEvent/AddEvent.jsx";
import ProfilePage from "./components/Profile/ProfilePage.jsx";
import JobList from "./components/Event_Card/JobList.jsx";
import Event from "./components/Event/Event.jsx";
import Login from "./components/Login/Login.jsx";
import ClubList from "./components/Club_List/ClubList.jsx";
import AddClub from "./components/AddClub/AddClub.jsx";
import Preloader from "./ui/Preloader/Preloader.jsx";
import StudentSignup from "./components/Signup/SignupStudent.jsx";
import KnowMore from "./components/Club/KnowMore.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      AOS.init({ duration: 1000, once: true });
      AOS.refresh();
    }
  }, [loading]);

  const PrivateRoute = () => {
    return localStorage.getItem("role") ? (
      <Navigate replace to="/" />
    ) : (
      <>
        <Outlet />
      </>
    );
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Router>
      <div className="bg-white">
        {loading && <Preloader />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Event />} />
          <Route path="/club/:clubId" element={<KnowMore />} />
          <Route path="/events" element={<JobList />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/clubs" element={<ClubList />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/event/:eventId" element={<Event />} />
          <Route element={<PrivateRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<StudentSignup />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
