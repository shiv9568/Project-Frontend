import { useEffect } from "react";
import picture2 from "../../assets/picture1.png";
import picture3 from "../../assets/picture3.png";
import picture4 from "../../assets/picture4.png";
import picture6 from "../../assets/picture6.png";
import picture7 from "../../assets/picture7.png";
import ad1 from "../../assets/ad1.png";
import ad2 from "../../assets/ad2.png";
import ad5 from "../../assets/ad5.png";
import ad6 from "../../assets/ad6.png";
import ad7 from "../../assets/ad7.png";
import emoji1 from '../../assets/emoji1.jpeg';
import emoji3 from '../../assets/emoji3.jpeg';
import emoji4 from '../../assets/emoji3.jpeg';
import clubBg from '../../assets/clubBg.jpg';


import AOS from "aos";
import UniversityEventFooter from "../Footer/footer";

const Home = () => {
  const images = [picture6, picture3, picture2, picture4, picture7];
  const additionalImages = [ad5, ad1, ad7, ad6, ad2];
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const pairedImages = images.map((img, index) => ({
    mainImage: img,
    additionalImage: additionalImages[index],
  }));

  return (
    <>
      <div className=" w-screen pt-[100px] pb-[100px] bg-blue-100" style={{ backgroundImage: `url(${clubBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
       
        
        <div className="h-[250px] text-black flex justify-center overflow-hidden items-center">
          <div>
          
            
            <p className="text-[65px] font-bold tracking-wide text-center text-slate-600">
              Welcome To EventOra
            </p>
            <p className="text-[18px] font-bold text-center text-black  ">
              😉🤞Join thrilling events, connect with others, and make unforgettable memories😎🎶
            </p>
          </div>
        </div>
      
        <div className="w-full pb-[20px] flex justify-center items-center">
          <div className="w-[85%] flex justify-around gap-2">
            {pairedImages.map((pair, index) => (
              <div
                key={index}
                data-aos={
                  index === 2
                    ? `fade-up`
                    : index === 1 || index === 3
                      ? "fade-up-left"
                      : "fade-up-right"
                }
                className={`w-[19%] bg-white rounded-lg ${index === 2
                    ? "mt-[100px]"
                    : index === 1 || index === 3
                      ? "mt-[50px]"
                      : ""
                  }`}
              >
                <div className="w-[100%] h-[300px] mb-4 overflow-hidden rounded-md">
                  <img
                    src={pair.mainImage}
                    alt={`Main Event ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[100%] h-[300px] overflow-hidden rounded-md">
                  <img
                    src={pair.additionalImage}
                    alt={`Additional Event ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[100%] py-10 bg-gradient-to-r from-blue-50 to-gray-100">
        <div className="w-[85%] mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-600">Why Choose EventOra?</h2>
          <p className="text-gray-700 text-base mb-10">
            EventOra is your one-stop solution for discovering, joining, and managing university events with ease.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:-translate-y-2 shadow-blue-900/50"
              data-aos="fade-up"
            >
              <div className="w-full h-[150px] mb-4 overflow-hidden rounded-md">
                <img
                  src={picture2}
                  alt="Event Management"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-calendar-alt text-5xl text-blue-500"></i>
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Seamless Event Management</h3>
              <p className="text-gray-600 mt-2">
                Organize and keep track of all your university events with just a few clicks.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:-translate-y-2 shadow-blue-900/50"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="w-full h-[150px] mb-4 overflow-hidden rounded-md">
                <img
                  src={picture3}
                  alt="Social Connections"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-users text-5xl text-blue-500"></i>
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Social Connections</h3>
              <p className="text-gray-600 mt-2">
                Meet like-minded individuals and grow your network through engaging activities.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:-translate-y-2 shadow-blue-900/50"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-full h-[150px] mb-4 overflow-hidden rounded-md">
                <img
                  src={picture4}
                  alt="Event Notifications"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-bullhorn text-5xl text-blue-500"></i>
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Instant Notifications</h3>
              <p className="text-gray-600 mt-2">
                Stay in the loop with real-time updates on event schedules and announcements.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:-translate-y-2 shadow-blue-900/50"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="w-full h-[150px] mb-4 overflow-hidden rounded-md">
                <img
                  src={picture6}
                  alt="Exclusive Rewards"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-trophy text-5xl text-blue-500"></i>
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Exclusive Rewards</h3>
              <p className="text-gray-600 mt-2">
                Earn exciting rewards and certificates by participating in events.
              </p>
            </div>

            {/* Feature 5 */}
            <div
              className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:-translate-y-2 shadow-blue-900/50"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="w-full h-[150px] mb-4 overflow-hidden rounded-md">
                <img
                  src={picture7}
                  alt="Event Insights"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-chart-line text-5xl text-blue-500"></i>
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Event Insights</h3>
              <p className="text-gray-600 mt-2">
                Get detailed analytics about event performance and attendance.
              </p>
            </div>

            {/* Feature 6 */}
            <div
              className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:-translate-y-2 shadow-blue-900/50"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="w-full h-[150px] mb-4 overflow-hidden rounded-md">
                <img
                  src={ad1}
                  alt="Advanced Search"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-search text-5xl text-blue-500"></i>
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Advanced Search</h3>
              <p className="text-gray-600 mt-2">
                Quickly find events that match your interests using powerful filters.
              </p>
            </div>
          </div>
        </div>
      </div>



      <div className="w-[100%] py-10 bg-blue-50">
        <div className="w-[85%] mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-900">Have Questions? 🐾 We ve Got Answers!</h2>
          <p className="text-gray-700 text-base mb-10">
            EventOra is here to help you! Explore our FAQ section to find answers to common queries.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Question 1 */}
            <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 relative">
              <span className="absolute top-0 -mt-4 left-[50%] transform -translate-x-[50%] bg-white text-white text-sm font-bold rounded-full px-4 py-1 shadow-md">
                📝
              </span>
              <h3 className="text-lg font-semibold text-white mt-6">How do I register for an event?</h3>
              <p className="text-gray-200 mt-4">
                Signing up is easy! Browse through our events, and click the Register button on the event page.
              </p>
            </div>

            {/* Question 2 */}
            <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 relative">
              <span className="absolute top-0 -mt-4 left-[50%] transform -translate-x-[50%] bg-white text-white text-sm font-bold rounded-full px-4 py-1 shadow-md">
                💸
              </span>
              <h3 className="text-lg font-semibold text-white mt-6">Is EventOra free to use?</h3>
              <p className="text-gray-200 mt-4">
                Yes! EventOra is completely free for browsing and registering for events.
              </p>
            </div>

            {/* Question 3 */}
            <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 relative">
              <span className="absolute top-0 -mt-4 left-[50%] transform -translate-x-[50%] bg-white text-white text-sm font-bold rounded-full px-4 py-1 shadow-md">
                🎉
              </span>
              <h3 className="text-lg font-semibold text-white mt-6">Can I host my own event?</h3>
              <p className="text-gray-200 mt-4">
                Of course! Just create an account, and you’ll be able to host and manage your own events.
              </p>
            </div>

            {/* Question 4 */}
            <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 relative">
              <span className="absolute top-0 -mt-4 left-[50%] transform -translate-x-[50%] bg-white text-white text-sm font-bold rounded-full px-4 py-1 shadow-md">
                📬
              </span>
              <h3 className="text-lg font-semibold text-white mt-6">How do I get updates on events?</h3>
              <p className="text-gray-200 mt-4">
                Subscribe to notifications and newsletters to stay updated with new events.
              </p>
            </div>

            {/* Question 5 */}
            <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 relative">
              <span className="absolute top-0 -mt-4 left-[50%] transform -translate-x-[50%] bg-white text-white text-sm font-bold rounded-full px-4 py-1 shadow-md">
                🛡
              </span>
              <h3 className="text-lg font-semibold text-white mt-6">Is my data secure?</h3>
              <p className="text-gray-200 mt-4">
                Absolutely! We prioritize user privacy and ensure your data is safe and secure with us.
              </p>
            </div>

            {/* Question 6 */}
            <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 relative">
              <span className="absolute top-0 -mt-4 left-[50%] transform -translate-x-[50%] bg-white text-white text-sm font-bold rounded-full px-4 py-1 shadow-md">
                🔎
              </span>
              <h3 className="text-lg font-semibold text-white mt-6">Can I search for specific events?</h3>
              <p className="text-gray-200 mt-4">
                Yes, use our advanced filters to find events that match your preferences and interests.
              </p>
            </div>
          </div>
        </div>
      </div>
      <UniversityEventFooter />
    </>
  );
};

export default Home;