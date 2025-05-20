import React, { useEffect, useState, useContext } from "react";
import ClubCard from "./ClubCard.jsx";
import { getAllClubs } from "../api/api.js";
import { Button } from '@mui/material';
import AOS from "aos";
import AddClub from "../AddClub/AddClub.jsx";
import { UserContext } from '../context/userContext';
import UpdateClub from "../UpdateClub/UpdateClub.jsx";
import { ToastContainer } from 'react-toastify';
import clubBg from '../../assets/clubBg.jpg';

const ClubList = () => {
  const [addClub, setAddClub] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [openUpdateClub, setOpenUpdateClub] = useState(false);
  const { user } = useContext(UserContext);

  const showAddClub = () => {
    setAddClub(!addClub);
  };

  const fetchAllClub = async () => {
    const response = await getAllClubs();
    if (response.status) {
      setJobs(response.data);
    }
    console.log(response.data);
  };

  useEffect(() => {
    if (selectedClubId !== null) {
      console.log("A club card was clicked with ID:", selectedClubId);
      setOpenUpdateClub(true); // Open the update dialog when a club is selected
    }
  }, [selectedClubId]);

  useEffect(() => {
    fetchAllClub();
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (<>
    <ToastContainer style={{ scale: '0.95', paddingTop: '60px' }} />
    <div
  className="w-screen h-screen pt-[100px] pb-[100px]"
  style={{
    backgroundImage: `url(${clubBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
      {localStorage.getItem('role') === 'Head' && <AddClub setAddClub={setAddClub} addClub={addClub} />}
      {localStorage.getItem('role') === 'Head' && (
        <div className="absolute bottom-4 right-4" variant="contained">
          <Button onClick={showAddClub} className="w-[130px] h-[40px]" variant="contained">
            Add Club
          </Button>
        </div>
      )}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center text-black">Clubs</h2>
      </div>
      <div className="w-[100%] flex justify-center pl-[20px] pr-[20px] overflow-auto no-scrollbar pt-6 h-[500px] min-h-[76vh]">
        <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 w-[90%] sm:w-[70%] h-[40%]">
          {jobs.map((job) => (
            <ClubCard key={job._id} job={job} setSelectedClubId={setSelectedClubId} />
          ))}
        </div>
      </div>
      {openUpdateClub && (
        <UpdateClub selectedClubId={selectedClubId} openUpdateClub={openUpdateClub} setOpenUpdateClub={setOpenUpdateClub} />
      )}
    </div>
  </>
  );
};

export default ClubList;
