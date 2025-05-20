import { useState, useEffect,useContext} from "react";
import { useParams } from "react-router-dom";
import ad1 from "../../assets/ad1.png";
import clubLogo from "../../assets/ad1.png";
import { getEventById, enrollStudent, checkEnrollment } from "../api/api";
import { UserContext } from '../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


const Event = () => {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [enrolled,setEnrolled] = useState();
    const { user, isUser } = useContext(UserContext);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }
    const fetchStudentEnroll = async () => {
        const response = await checkEnrollment(eventId, user._id);
        setEnrolled(response.enrolled);
        console.log("not enrolled",response.enrolled);
    }

    useEffect(() => {
        // Fetch event details based on eventId
        const fetchEvent = async () => {
            const response = await getEventById(eventId);
            setEventDetails(response.data);
            console.log(response);
        };
        fetchStudentEnroll();
        fetchEvent();
    }, [eventId]);

    if (!eventDetails) return <div>Loading...</div>; // Show loading while event details are being fetched

    const handleApplyNow = async () => {
        const response = await enrollStudent(eventId, user._id);
        if (response.status) {
            toast.success('Student is Enrolled');
            console.log(response.data);
            setEnrolled(true);
        }
    }

    return (
        <>
        <ToastContainer style={{scale:'0.95',paddingTop:'60px'}}/>
        <div className="flex justify-center min-h-screen p-4 pt-[100px] ">
            <div className="max-w-5xl md:w-[900px] rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <div style={{ backgroundImage: `url(${eventDetails.eventPoster})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="w-[400px] h-[300px] rounded-lg sm:h-full shadow-lg overflow-hidden">
                        </div>
                    </div>
                    {/* Right Section - Event Details */}
                    <div className="w-full lg:w-1/2 p-6">
                        <h2 className="text-3xl font-bold text-blue-700 mb-4">
                            {eventDetails.eventName}
                        </h2>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                Date & Time
                            </h3>
                            <p className="text-gray-700 text-base">
                                📅 {eventDetails.date && formatDate(eventDetails.date)}
                            </p>
                            <p className="text-gray-700 text-base">
                                ⏱️ {eventDetails.time}
                            </p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                📍 Location
                            </h3>
                            <p className="text-gray-700 text-base">
                                {eventDetails.venue}
                            </p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Organized By
                            </h3>
                            <div className="flex items-center gap-3">
                                <img
                                    src={eventDetails.club.clubLogo}
                                    className="w-12 h-12 rounded-full shadow-md"
                                />
                                <span className="text-gray-800 text-base font-medium">
                                </span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button onClick={handleApplyNow} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition duration-300">
                                {enrolled?'Already Enrolled':'Apply Now'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <h2 className="text-[25px] text-center font-bold text-gray-800 mb-3">
                        About This Event
                    </h2>
                    <div className="text-base text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: eventDetails.description }}>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Event;
