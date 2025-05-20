import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Dialog } from "@mui/material";

const AddClub = ({addClub,setAddClub}) => {
    const [formData, setFormData] = useState({
        clubName: "",
        clubDescription: "",
        contactEmail: "",
        headEmail: "",
        clubLogo: null,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDescriptionChange = (value) => {
        setFormData({ ...formData, clubDescription: value });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) setFormData({ ...formData, clubLogo: URL.createObjectURL(file) });
    };

    const handleClose = () => {
        setAddClub(false);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted successfully!");
        handleClose();
    };

    return (
        <section className=" flex items-center justify-center">
            {addClub && (
                <Dialog
                    open={addClub}
                    onClose={handleClose}
                    maxWidth="xl"
                    className="fixed inset-0 flex bg-blue-200 items-center justify-center bg-opacity-50 backdrop-blur-sm z-50"
                >
                    <div className="bg-white md:w-[900px] rounded-lg shadow-2xl w-full max-w-5xl p-6 relative animate-[fadeIn_0.3s_ease-out]">
                        <button
                            onClick={handleClose}
                            className="absolute top-0 right-2 text-gray-700 hover:text-gray-900 text-2xl font-bold"
                        >
                            &times;
                        </button>

                        <div className="flex flex-col-reverse sm:flex-row">
                            {/* Club Details Section */}
                            <div className="flex-1 p-5 max-h-[500px] overflow-hidden scrollbar-hide w-full">
                                <h4 className="text-3xl font-bold text-[#04101b] mb-6 text-center">
                                    Upload Club Details
                                </h4>
                                <form onSubmit={handleSubmit} className="scrollbar-hide">
                                    {/* Club Name */}
                                    <div className="mb-5">
                                        <label className="block text-sm font-bold uppercase text-gray-700 mb-1">
                                            Club Name
                                        </label>
                                        <input
                                            type="text"
                                            name="clubName"
                                            value={formData.clubName}
                                            onChange={handleChange}
                                            placeholder="Club Name"
                                            className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                                        />
                                    </div>

                                    {/* Contact Email */}
                                    <div className="mb-5">
                                        <label className="block text-sm font-bold uppercase text-gray-700 mb-1">
                                            Contact Email
                                        </label>
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            value={formData.contactEmail}
                                            onChange={handleChange}
                                            placeholder="Contact Email"
                                            className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                                        />
                                    </div>

                                    {/* Head Email */}
                                    <div className="mb-5">
                                        <label className="block text-sm font-bold uppercase text-gray-700 mb-1">
                                            Head Email
                                        </label>
                                        <input
                                            type="email"
                                            name="headEmail"
                                            value={formData.headEmail}
                                            onChange={handleChange}
                                            placeholder="Head Email"
                                            className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                                        />
                                    </div>

                                    {/* Club Description */}
                                    <div className="mb-5">
                                        <label className="block text-sm font-bold uppercase text-gray-700 mb-1">
                                            Club Description
                                        </label>
                                        <ReactQuill
                                            value={formData.clubDescription}
                                            onChange={handleDescriptionChange}
                                            placeholder="Describe the club"
                                            theme="snow"
                                            className="border-none outline-none bg-gray-100 shadow-none cursor-text"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full p-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:shadow-lg hover:opacity-90 transition-all"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>

                            {/* Poster Section */}
                            <div className="flex-1 flex min-h-[250px] flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 p-5 rounded-md max-h-[500px] overflow-auto w-full">
                                {formData.clubLogo ? (
                                    <img
                                        src={formData.clubLogo}
                                        alt="Club Logo"
                                        className="max-w-full max-h-[300px] object-contain rounded-lg shadow-lg"
                                    />
                                ) : (
                                    <label
                                        htmlFor="clubLogo"
                                        className="text-white text-lg font-bold cursor-pointer border-2 border-white p-4 rounded-md hover:bg-white hover:text-blue-700 transition-all"
                                    >
                                        Upload Club Logo
                                        <input
                                            type="file"
                                            id="clubLogo"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog>
            )}
        </section>
    );
};

export default AddClub;
