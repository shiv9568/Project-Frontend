import React from "react";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from '@mui/icons-material/EditNote';  // Importing the EditNoteIcon
import { toast } from 'react-toastify';

const ClubCard = ({ job, user, setSelectedClubId }) => {
  const navigate = useNavigate();  // Initialize useNavigate hook
  function convertToInitials(str) {
    // Split the string into words
    const words = str.split(' ');

    // Get the first letter of each word and convert it to uppercase
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');

    return initials;
  }
  const handleClick = () => {
    // Navigate to the club details page using the clubId
    navigate(`/club/${job._id}`);
  };
  const toastSuccess = () => {
    toast.success("User Login Successfull", {
      position: 'top-center',
      autoClose: 1500
    });
  }

  const toastFail = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 1500
    });
  }


  const isHeadAndMatch = user?.clubs?.some(
    (club) => club.clubId.toString() === job?._id.toString() && club.clubPost === "Head"
  );

  return (
    <div className="group relative flex cursor-pointer  shadow-sm rounded-lg overflow-hidden w-full max-w-[500px] h-[135px] transition-all duration-300 hover:shadow-xl border border-black hover:translate-y-1 shadow-gray-900 group-hover:shadow-none bg-white rounded-3xl" >
      <div className="w-[40%] h-full flex justify-center items-center  transition-transform duration-300 group-hover:scale-105 ">
        <img
          src={job.clubLogo}
          alt={`${job.clubName} logo`}
          className="h-[70%] w-[70%] object-contain transition-transform duration-300 group-hover:scale-110 rounded-3xl "
        />
      </div>
      <div className="w-[60%] h-full flex flex-col justify-center items-start p-1 relative">
        <h3 className="text-xl font-bold text-gray-800 transition-all duration-300 group-hover:text-gray-900 mb-1 ml-0">
          {convertToInitials(job.clubName)}
        </h3>
        <div
          className="text-sm font-semibold text-gray-600 transition-all duration-300 group-hover:text-gray-700 mb-2 ml-0">
          {job.clubName}
        </div>
        <button onClick={handleClick} className="absolute bottom-2 right-2 text-blue-400 mx-2 my-1 rounded transition-all duration-300 shadow-gray-900  hover:border-white bg-blue-200 p-2 rounded-2xl font-bold text-slate-800">
          Know More
        </button>
      </div>

      {/* Show the EditNoteIcon only if the user is the head of the club */}
      {localStorage.getItem("role") === "Head" && (
        <div className="absolute top-2 right-2">
          <EditNoteIcon onClick={() => setSelectedClubId(job._id)} className="text-black" sx={{ fontSize: "32px" }} />
        </div>
      )}
    </div>
  );
};

export default ClubCard;
