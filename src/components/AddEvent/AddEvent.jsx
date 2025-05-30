import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Dialog } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { getDownloadURL, ref, getStorage, uploadBytesResumable } from "firebase/storage";
import app from "../../firebase"; // Firebase config
import { createEvent } from "../api/api.js";

const AddEvent = ({ addEvent, setAddEvent }) => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventSpeaker: "",
    date: "",
    time: "",
    contactDetails: "",
    venue: "",
    description: "",
    eventPoster: null,
  });

  const [showProgress, setShowProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [posterUrl, setPosterUrl] = useState(null);
  const [tempPoster, setTempPoster] = useState(null); // For the selected image
  const [uploadFailed, setUploadFailed] = useState(false); // Upload failed status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setTempPoster(fileURL);
      setUploadFailed(false);
      uploadFileToFirebase(file);
    }
  };

  const uploadFileToFirebase = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setShowProgress(true);
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setShowProgress(false);
        setUploadFailed(true); // Set upload as failed
        alert("Image upload failed: " + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, eventPoster: downloadURL });
          setPosterUrl(downloadURL);
          setShowProgress(false);
          setUploadFailed(false); // Reset failed status
        });
      }
    );
  };

  const handleClose = () => {
    setAddEvent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!posterUrl) {
    //   alert("Please upload an event poster.");
    //   return;
    // }

    const eventData = { ...formData, eventPoster: posterUrl || null };
    try {
      const response = await createEvent(eventData);
      console.log(eventData);
      if (response.status) {
        setAddEvent(false);
      } else {
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <section className="bg-white">
      {addEvent && (
        <Dialog
          onClose={handleClose}
          open={addEvent}
          maxWidth="xl"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
        >
          <div className="bg-white md:max-w-[900px] md:w-[900px] rounded-lg shadow-2xl w-full max-w-5xl p-6 relative animate-[fadeIn_0.3s_ease-out]">
            <button
              onClick={() => setAddEvent(false)}
              className="absolute top-0 right-2 text-gray-700 hover:text-gray-900 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="flex flex-col sm:flex-row">
              {/* Event Details Section */}
              <div className="flex-1 p-5 max-h-[500px] overflow-auto w-full">
                <h4 className="text-3xl font-bold text-[#04101b] mb-6 text-center">
                  Upload Event Details
                </h4>
                <div >
                  {/* Event Name */}
                  <div className="mb-5">
                    <label className="block text-sm font-bold uppercase text-gray-700 mb-1">
                      Event Name
                    </label>
                    <input
                      type="text"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleChange}
                      placeholder="Event Name"
                      className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                    />
                  </div>

                  {/* Event Speaker */}
                  <div className="mb-5">
                    <label className="block text-sm font-bold uppercase text-gray-700 mb-1">
                      Event Speaker
                    </label>
                    <input
                      type="text"
                      name="eventSpeaker"
                      value={formData.eventSpeaker}
                      onChange={handleChange}
                      placeholder="Event Speaker"
                      className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                    />
                  </div>

                  {/* Event Date */}
                  <div className="flex gap-2 mb-5">
                    <div className="flex-1">
                      <label className="block text-sm font-bold uppercase text-gray-700 mb-1">
                        Event Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-bold uppercase text-gray-700 mb-1">
                        Event Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                      />
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="mb-5">
                    <label className="block text-sm font-bold uppercase text-gray-700 mb-1">
                      Contact Details
                    </label>
                    <input
                      type="text"
                      name="contactDetails"
                      value={formData.contactDetails}
                      onChange={handleChange}
                      placeholder="Contact Details"
                      className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                    />
                  </div>

                  {/* Venue */}
                  <div className="mb-5">
                    <label className="block text-sm font-bold uppercase text-gray-700 mb-1">
                      Venue
                    </label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="Venue"
                      className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                    />
                  </div>

                  {/* Event Description (Rich Text Editor) */}
                  <div className="mb-10">
                    <label className="block text-sm font-bold uppercase text-gray-700 mb-1">
                      Event Description
                    </label>
                    <ReactQuill
                      className="border-none outline-none bg-gray-100 shadow-none cursor-text"
                      theme="snow"
                      value={formData.description}
                      onChange={handleDescriptionChange}
                      placeholder="Describe your event"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full p-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:shadow-lg hover:opacity-90 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* Poster Section */}
              <div className="flex-1 m-3 flex min-h-[250px] flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 p-5 rounded-md max-h-[300px] sm:max-h-[500px] overflow-auto w-full relative">
                {showProgress ? (
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                    <CircularProgressbar
                      value={uploadProgress}
                      background
                      backgroundPadding={6}
                      styles={buildStyles({
                        backgroundColor: "none",
                        textColor: "#fff",
                        pathColor: "white",
                        trailColor: "transparent",
                        textAnchor: "middle",
                        alignmentBaseline: "middle",
                      })}
                      className="w-[80px] h-[80px] p-4 rounded-full cursor-pointer"
                    />
                  </div>
                ) : tempPoster ? (
                  <img
                    src={tempPoster}
                    alt="Event Poster"
                    className="w-full h-full object-cover rounded-lg bg-red-500 shadow-lg"
                  />
                ) : posterUrl ? (
                  <img
                    src={posterUrl}
                    alt="Event Poster"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <div>
                    <label
                      htmlFor="eventPoster"
                      className="text-white text-lg font-bold cursor-pointer border-2 border-white p-4 rounded-md hover:bg-white hover:text-blue-700 transition-all"
                    >
                      Upload Event Poster 
                      <input
                        type="file"
                        id="eventPoster"
                        accept="image/*"
                        onChange={handlePosterChange}
                        className="hidden"
                      />
                    </label>
                    {uploadFailed && (
                      <button
                        onClick={() => setUploadFailed(false)}
                        className="mt-4 p-2 bg-red-500 text-white rounded-md"
                      >
                        Koe nahi Bhai
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </section>
  );
};

export default AddEvent;
