import React, { useState } from "react";
import { Button } from "../../ui/Button.jsx";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from '@mui/icons-material/EditNote';

const JobCard = ({ job,jobs, user,setSelectedClubId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVisitEvent = () => {
    navigate(`/event/${job?._id}`);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const isHeadAndMatch = user?.clubs?.some(
    (club) => club.clubId.toString() === job?.club?._id.toString() && club.clubPost === "Head"
  );

  return (
    <div className="w-[100%] relative min-w-[280px] max-h-[290px] cursor-pointer p-7 rounded-lg shadow-custom hover:shadow-customHover shadow-[1px_1px_9px_#bebebe,0px_0px_0px_#ffffff] transition-transform duration-300 hover:translate-y-0">
      <div className="flex items-center gap-3 mb-4">
        <div className="transition-transform duration-300">
          <img
            src={jobs?.clubLogo || "https://via.placeholder.com/40"}
            alt="Company Logo"
            className="h-10 w-10 rounded-full object-cover shadow-md"
          />
        </div>
        <div>
          <h1 className="font-semibold text-base text-gray-800">
            {jobs?.clubName}
          </h1>
          <p className="text-xs text-gray-500">{job?.venue}</p>
        </div>
      </div>
      <h1 className="font-bold text-lg text-gray-800 mb-1 leading-tight line-clamp-1 tracking-wide py-2">
        {job?.eventName}
      </h1>
      <p className="text-sm h-[20px] overflow-hidden text-gray-600 leading-tight line-clamp-2" dangerouslySetInnerHTML={{ __html: job?.description }} />
      <div className="flex items-center gap-2 mt-3">
        <span className="text-blue-700 bg-blue-100 px-2 py-2 rounded-md font-semibold text-xs">
          {job?.eventSpeaker}
        </span>
        <span className="text-red-700 bg-red-100 px-2 py-2 rounded-md font-semibold text-xs">
          {job && formatDate(job.date)}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Button
          variant="outline"
          className="bg-gray-400 border-gray-300 text-white hover:bg-gray-700 hover:text-white transition-colors text-sm py-2 px-4"
          onClick={handleOpenModal}
        >
          View Poster!
        </Button>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm py-2 px-4 ml-10"
          onClick={handleVisitEvent}
        >
          Visit Event!
        </Button>
      </div>

      <Dialog onClose={handleCloseModal} open={isModalOpen} maxWidth="sm" fullWidth>
        <div className="relative p-6">
          <img src={job?.eventPoster} alt="Poster" className="rounded-md w-full h-auto" />
        </div>
      </Dialog>

      {/* Show the EditNoteIcon only if the user is the head and the club ID matches the job's club ID */}
      {isHeadAndMatch && (
        <div className="absolute top-2 right-2">
          <EditNoteIcon onClick={()=>setSelectedClubId(job._id)} className="text-black" sx={{ fontSize: "32px" }} />
        </div>
      )}
    </div>
  );
};

export default JobCard;
