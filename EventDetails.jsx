import React, { useState } from 'react';
import ad1 from '../assets/ad7.png';
import organizer1 from '../assets/ad1.png';
import organizer2 from '../assets/ad7.png';
import organizer3 from '../assets/ad7.png';
import clubLogo from '../assets/ad3.png';  // Add the club logo here

const EventCard = () => {
    const [eventDetails, setEventDetails] = useState({
        title: 'Code & Connect: WTM x SheBuilds',
        date: 'Saturday, March 18, 2023',
        time: '10:00 AM - 5:00 PM IST',
        location: 'Chennai, India',
        organizingClub: {
            name: 'Women Techmakers Chennai',
            logo: clubLogo,
        },
        organizers: [
            { name: 'Organizer 1', image: organizer1 },
            { name: 'Organizer 2', image: organizer2 },
            { name: 'Organizer 3', image: organizer3 },
        ],
        aboutEvent: 'This event brings together passionate women in technology to discuss and share experiences in a collaborative environment.'
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-6">
            <div className="max-w-5xl bg-white rounded-xl shadow-xl p-8 flex flex-col lg:flex-row items-center gap-8 border-t-4 border-blue-500 hover:scale-105 transition-all duration-300">
                {/* Left Section - Image */}
                <div className="flex-shrink-0">
                    <img
                        src={ad1}
                        alt="Event Poster"
                        className="w-48 h-64 md:w-64 md:h-80 lg:w-80 lg:h-96 object-cover rounded-lg shadow-lg hover:opacity-80 transition-opacity duration-300"
                    />
                </div>

                {/* Right Section - Content */}
                <div className="flex flex-col w-full lg:w-2/3">
                    {/* Event Title */}
                    <h2 className="text-3xl font-bold text-blue-600 mb-4 hover:text-blue-800 transition-colors duration-300">{eventDetails.title}</h2>

                    {/* Event Details */}
                    <div className="space-y-4 mb-4">
                        {/* Date and Time */}
                        <div className="flex items-center">
                            <span className="text-blue-600 mr-2 text-3xl">📅</span>
                            <div>
                                <h3 className="text-xl font-semibold">{eventDetails.date}</h3>
                                <p className="text-gray-600">{eventDetails.time}</p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center">
                            <span className="text-blue-600 mr-2 text-3xl">📍</span>
                            <div>
                                <h3 className="text-xl font-semibold">Location</h3>
                                <p className="text-gray-600">{eventDetails.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* About This Event */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">About This Event</h3>
                        <p className="text-gray-700">{eventDetails.aboutEvent}</p>
                    </div>

                    {/* Organizers Section */}
                    <div className="flex flex-wrap justify-between items-center mt-4 gap-6">
                        <div className="flex items-center gap-6">
                            <h3 className="text-xl font-semibold text-gray-700">Organizers:</h3>
                            {eventDetails.organizers.map((organizer, index) => (
                                <img
                                    key={index}
                                    src={organizer.image}
                                    alt={organizer.name}
                                    className="w-16 h-16 rounded-full border-4 border-blue-300 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                />
                            ))}
                        </div>

                        {/* Apply Button (Reverted) */}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all duration-300">
                            Apply Now
                        </button>
                    </div>

                    {/* Organizing Club Section */}
                    <div className="flex items-center gap-6 mt-6">
                        <h3 className="text-xl font-semibold text-gray-700">Organized by:</h3>
                        <div className="flex items-center gap-2">
                            <img
                                src={eventDetails.organizingClub.logo}
                                alt={eventDetails.organizingClub.name}
                                className="w-16 h-16 rounded-full shadow-lg ring-2 ring-blue-300"
                            />
                            <span className="text-gray-700 font-semibold">{eventDetails.organizingClub.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
