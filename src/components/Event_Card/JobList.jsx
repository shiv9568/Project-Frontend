import React, { useState, useEffect, useContext } from "react";
import JobCard from "./JobCard.jsx";
import AOS from "aos";
import { getAllEvents } from "../api/api.js";
import { Button } from "@mui/material";
import AddEvent from "../AddEvent/AddEvent.jsx";
import { UserContext } from "../context/userContext";
import UpdateEvent from "../UpdateEvent/UpdateEvent.jsx";
import emoji1 from '../../assets/emoji1.jpeg';
import emoji2 from '../../assets/emoji2.jpeg';
import emoji3 from '../../assets/emoji3.jpeg';
import clubBg from '../../assets/clubBg.jpg';



const JobList = () => {
  const [addEvent, setAddEvent] = useState(false);
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [openUpdateEvent,setOpenUpdateEvent] = useState(false);
  const { user } = useContext(UserContext);

  const getEvents = async () => {
    const response = await getAllEvents();
    console.log(response.data);
    setJobs(response.data);
  };

  const openAddEvent = () => {
    setAddEvent(!addEvent);
  };

  useEffect(() => {
    getEvents();
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (selectedClubId !== null) {
      setOpenUpdateEvent(true);
    }
  }, [selectedClubId]);

  const isClubHead = user?.clubs?.some((club) => club.clubPost === "Head");

  return (<>
    {openUpdateEvent && <UpdateEvent selectedClubId={selectedClubId} openUpdateEvent={openUpdateEvent} setOpenUpdateEvent={setOpenUpdateEvent} />}
    <div
  className="w-[100vw] h-[100vh] pt-[100px] pb-[100px]"
  style={{
    backgroundImage: `url(${clubBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
    <img
    src={emoji1}
    alt="emoji1"
    className="absolute top-[10%] left-[5%] w-16 opacity-90 z-0 animate-bounce-slow"
  />
  
  <img
    src={emoji2}
    alt="emoji2"
    className="absolute bottom-[10%] right-[8%] w-20 opacity-90 z-0 animate-spin-slow"
  />
  <img
    src={emoji3}
    alt="emoji3"
    className="absolute top-[50%] left-[45%] w-12 opacity-90 z-0 animate-pulse"
  />
  
      {isClubHead && <AddEvent addEvent={addEvent} setAddEvent={setAddEvent} />}
      {isClubHead && (
        <div className="absolute bottom-4 right-4 ">
          <Button onClick={openAddEvent} variant="contained">
            Add Event
          </Button>
        </div>
      )}

      <div className="max-w-5xl mx-auto ">
    
        <h2 className="text-3xl mb-6 text-center text-black font-extrabold">
          Choose Events
        </h2>
        
      </div>

      <div className="w-[100%] flex justify-center pl-[20px] pr-[20px] overflow-auto no-scrollbar pt-4 h-[500px] min-h-[76vh] ">
      <img
    src={emoji1}
    alt="emoji1"
    className="absolute top-[10%] left-[5%] w-16 opacity-90 z-0 animate-bounce-slow"
  />
  
  <img
    src={emoji2}
    alt="emoji2"
    className="absolute bottom-[10%] right-[8%] w-20 opacity-90 z-0 animate-spin-slow"
  />
  <img
    src={emoji3}
    alt="emoji3"
    className="absolute top-[50%] left-[45%] w-12 opacity-90 z-0 animate-pulse"
  />
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:w-[100%] md:w-[85%] lg:w-[85%] xl:w-[70%] gap-4"
        >
          
          {jobs.map((job) => (
            <JobCard setSelectedClubId={setSelectedClubId} user={user} key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default JobList;
