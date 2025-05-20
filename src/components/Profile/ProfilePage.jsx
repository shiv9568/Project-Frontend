import React ,{useContext, useEffect, useState} from "react";
import UserTable from "./UserTable.jsx";
import { getStudentById } from "../api/api.js";
import { UserContext } from '../context/userContext';


const achievementsData = {
    UniversityName: "Chitkara University",
    EventsAttended: "15",
    HackathonsAttended: "6",
    HackathonsWon: "3",
};

const membershipData = [
    {
        clubName: "Design Thinking Club",
        role: "Vice Chairman",
        logo: "https://via.placeholder.com/100",
    },
    {
        clubName: "Open Source Chandigarh",
        role: "Discipline Head",
        logo: "https://via.placeholder.com/100",
    },
    {
        clubName: "AI Club",
        role: "Core Member",
        logo: "https://via.placeholder.com/100",
    },
    {
        clubName: "Robotics Club",
        role: "Team Leader",
        logo: "https://via.placeholder.com/100",
    }
];

const ProfilePage =  () => {
    const { user, isUser } = useContext(UserContext);
    const [profileData,setProfileData] = useState();
    const [membership,setMembership] = useState([]);
    const [events,setEvents] = useState();

    const getStudentData = async ()=>{
        const response = await getStudentById(user._id);
        setProfileData(response.data);
        setEvents(response.data.events);
        setMembership(response.data.clubs);
        console.log("image is here", profileData.image);
    }
    useEffect(()=>{
        getStudentData();
    },[])
    return (
        <>
            { profileData && <div className="lg:bg-white-900 text-white mt-[10vh] h-[90vh] flex flex-col lg:flex-row hello">
                {/* Left Sidebar */}
                <div className="w-full lg:w-1/4 bg-gradient-to-r bg-black to-indigo-500 p-6 rounded-lg lg:sticky lg:top-0">
                    <div className="text-center mb-[50px]">
                        <img
                            src={profileData.image}
                            alt="Profile"
                            className="rounded-full mx-auto mb-2 w-32 h-32 sm:w-40 sm:h-40 object-cover border-4 border-white shadow-lg"
                        />
                        <h2 className="text-3xl sm:text-4xl font-semibold text-white">
                            {profileData.name}
                        </h2>
                        <p className="text-gray-300 text-lg sm:text-xl">
                            {profileData.rollNo}
                        </p>
                    </div>
                    <div className="space-y-5">
                        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                            <p className="font-semibold">Email:</p>
                            <p className="text-gray-300">{profileData.email}</p>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                            <p className="font-semibold">
                                Branch & Graduation Year:
                            </p>
                            <p className="text-gray-300">
                                {profileData.branch},{" "}
                                {profileData.graduationYear}
                            </p>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                            <p className="font-semibold">D.O.B:</p>
                            <p className="text-gray-300">{profileData.dateOfBirth || '09-07-2004'}</p>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                            <p className="font-semibold">Phone:</p>
                            <p className="text-gray-300">{profileData.phone}</p>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                            <p className="font-semibold">Country:</p>
                            <p className="text-gray-300">
                                {profileData.country}
                            </p>
                        </div>
                        {/* Address */}
                        {/* <div className="flex justify-between items-start border-b border-gray-700 pb-4 bg-blue-400">
                            <p className="font-semibold">Address:</p>
                            <div className="text-gray-300 max-w-[250px] break-words overflow-hidden text-ellipsis">
                                {profileData.address}
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-3/4 p-4 space-y-6 lg:overflow-y-scroll " >
                    {/* Top Side of the right side */}
                    <div className="w-full bg-white p-6 rounded-lg shadow-md flex flex-col gap-6 md:flex-row justify-between mt-0 ">
                        {/* Achievements and Experiences Section */}
                        <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold text-center text-gray-700 mb-4">
                                Achievements and Experiences
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                                {/* University Name */}
                                <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-700 p-4 rounded-lg shadow-lg w-full">
                                    <span className="text-3xl text-white">
                                        🏫
                                    </span>
                                    <div>
                                        <span className="block font-bold text-lg text-white">
                                            University:
                                        </span>
                                        <span className="text-base text-gray-300">
                                            {profileData.university}
                                        </span>
                                    </div>
                                </div>


                                <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-lg shadow-lg w-full">
                                    <span className="text-3xl text-white">
                                        👥
                                    </span>
                                    <div>
                                        <span className="block font-bold text-lg text-white">
                                            Events Attended
                                        </span>
                                        <span className="text-base text-gray-300">
                                            {profileData.eventCount===0?'4':profileData.eventCount}
                                        </span>
                                    </div>
                                </div>

                                {/* Hackathons Attended */}
                                <div className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-700 p-4 rounded-lg shadow-lg w-full">
                                    <span className="text-3xl text-white">
                                        🚀
                                    </span>
                                    <div>
                                        <span className="block font-bold text-lg text-white">
                                            Hackathons Attended
                                        </span>
                                        <span className="text-base text-gray-300">
                                            {
                                                0   
                                            }
                                        </span>
                                    </div>
                                </div>

                                {/* Hackathons Won */}
                                <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-700 p-4 rounded-lg shadow-lg w-full">
                                    <span className="text-3xl text-white">
                                        🏆
                                    </span>
                                    <div>
                                        <span className="block font-bold text-lg text-white">
                                            Hackathons Won
                                        </span>
                                        <span className="text-base text-gray-300">
                                            0
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Membership Overview Card */}
                        <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold text-center text-gray-700 mb-6">
                                Membership Overview
                            </h2>
                            <div className="flex gap-6 overflow-x-auto whitespace-nowrap p-2">
                                {membership.map((member, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md min-w-[200px] group transition flex-grow cursor-pointer"
                                    >
                                        <img
                                            src={member.clubId?.clubLogo}
                                            alt={membership.clubName}
                                            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg mb-2"
                                        />
                                        <p className="font-semibold text-gray-700 text-center">
                                            {member.clubId?.clubName}
                                        </p>
                                        <p className="text-sm text-gray-600 text-center">
                                            {member.clubPost}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <UserTable events={events}/>
                </div>
            </div>
            }
        </>
    );
};

export default ProfilePage;
