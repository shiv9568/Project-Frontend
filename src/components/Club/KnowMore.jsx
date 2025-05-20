import React, { useEffect, useState } from "react";
import clubLogo from "../../assets/ad1.png"; // Club logo image
import backgroundImage from "../../assets/background.jpeg"; // Background image
import { getClub } from "../api/api";
import { useParams } from "react-router-dom";
// import JobList from "../Event_Card/JobList.jsx";
import JobCard from "./JobCard";

const KnowMore = () => {
    const { clubId } = useParams();
    const [jobs, setJobs] = useState({});
    const [loading, setLoading] = useState(true); // To handle loading state

    const fetchClub = async () => {
        const response = await getClub(clubId);
        if (response.status) {
            setJobs(response.data);
        }
        setLoading(false);
        console.log(response.data);
    };

    useEffect(() => {
        fetchClub();
    }, [clubId]);

    if (loading) {
        return <div>Loading...</div>; // Simple loading state
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center mx-auto overflow-x-hidden p-2 pb-4">
            {/* Club Header */}
            <div className="relative w-full cursor-pointer max-w-6xl h-24 mx-auto mt-[6rem] p-4 flex items-center border-b-2 border-transparent rounded-2xl justify-center shadow-md hover:shadow-2xl transition-shadow duration-500 ease-in-out">
                <img
                    src={jobs.clubLogo || clubLogo} // Use fallback image if jobs.clubLogo is not available
                    alt="Club Logo"
                    className="w-20 h-20 md:w-[75px] md:h-[75px] object-cover rounded-full border-4 border-white shadow-lg transition-transform duration-300 ease-in-out transform md:hover:scale-110"
                />
                <h1 className="ml-5 font-extrabold text-gray-800 text-2xl md:text-3xl tracking-wide">
                    {jobs.clubName || "Club Name"}
                </h1>
            </div>

            <div
                className="relative w-full max-w-6xl h-[40vh] mt-6 bg-cover bg-center rounded-2xl shadow-md transition-opacity duration-700 hover:opacity-90"
                style={{
                    backgroundImage: `url(${backgroundImage})`, // Default background image if none available
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>

            {/* About and Club Head Details Section (Flex Layout) */}
            <div className="w-full max-w-6xl mx-auto p-8 mt-6 flex flex-col lg:flex-row gap-8">
                {/* Club Head Details (1/3 width) */}
                <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
                    {/* Title: Club Head Details */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Club Head Details
                    </h3>
                    <img
                        src={jobs.heads?.image || clubLogo}
                        alt="Club Head"
                        className="w-40 h-40 cursor-pointer lg:w-52 lg:h-52 object-cover rounded-xl border-4 p-4 border-blue-500 shadow-lg my-4"
                    />
                    {/* Club Head Info */}
                    <div className="flex flex-col items-center mt-5">
                        <p className="text-gray-700 mb-2">
                            <strong className="font-medium">Name:</strong>{" "}
                            {jobs.heads?.name || "Head Name"}
                        </p>
                        <p className="text-gray-700">
                            <strong className="font-medium">Email:</strong>{" "}
                            {jobs.heads?.email || "head@example.com"}
                        </p>
                    </div>
                </div>

                {/* About Section (2/3 width) */}
                <div className="w-full lg:w-2/3 p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-4xl font-extrabold text-gray-800 mb-6 text-left font-serif tracking-wide">
                        About{" "}
                        <span className="text-blue-600">
                            {jobs.clubName || "Club Name"}
                        </span>
                    </h3>
                    <p className="text-gray-600 text-left text-lg font-light leading-relaxed">
                        {jobs.clubDescription || "Club description not available."}
                    </p>
                </div>
            </div>

            {/* Events Heading */}
            <div className="w-full max-w-6xl h-[10vh] mt-8 p-4 bg-white rounded-md text-center shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Club Event Highlights
                </h2>
            </div>

            <div className="w-[75%] flex justify-center pl-6 pr-6 overflow-auto mt-10">
                {jobs.events && jobs.events.length > 0 ? (
                    <div className="grid p-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {jobs.events.map((job) => (
                            <JobCard jobs={jobs} key={job._id} job={job} />
                        ))}
                    </div>
                ) : (
                    <p className="text-xl text-gray-700">
                        Upcoming events will be displayed here.
                    </p>
                )}
            </div>
        </div>
    );
};

export default KnowMore;
