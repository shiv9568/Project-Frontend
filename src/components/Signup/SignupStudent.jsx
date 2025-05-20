import React, { useState } from "react";
import { SignUpUser } from "../api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import clubBg from '../../assets/clubBg.jpg';



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

const StudentSignup = () => {
    const [formData, setFormData] = useState({
        image: null,
        name: "",
        rollNumber: "",
        email: "",
        password: "",
        phone: "",
        universityName: "",
        universityEmail: "",
        branch: "",
        graduationYear: "",
        address: "",
        roll:"Student"
    });
    console.log(formData);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formPayload = new FormData();
        for (const key in formData) {
         
            formPayload.append(key, formData[key]);
        }
        console.log("fuck"+formData);

        try {
            console.log("try hit");
            const response = await SignUpUser(formPayload);
            console.log("the response hit",response);
            console.log("the status code is ",response.status);
            if (!response.status) {
                
                toastSuccess();
                setTimeout(()=>{
                    Navigate('/');
                },1500);
                
                console.log(response);
            } else {
                toastFail();
                alert(response.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            alert("Something went wrong. Please try again later.");
        }
        return{
            message:"slow internet mc"
        }
    };

    return (
        <div
            className="">   
        <div className="min-h-14 flex items-center justify-center mt-8" >
            <div className="p-6 rounded-2xl w-full max-w-3xl pt-0" >
                
                <h2 className="text-2xl font-semibold text-blue-950 mb-2 text-center mt-9">
                    "Start your journey with us!"
                </h2>
                <p className="text-center text-gray-500 mb-6 font-bold text-2xl">
                    Sign up to join the best community for university students.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Picture</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-md h-20 flex items-center justify-center hover:border-blue-400 transition duration-300 overflow-hidden">
                                    <label
                                        htmlFor="imageUpload"
                                        className="cursor-pointer flex items-center justify-center w-full h-full"
                                    >
                                        {formData.image ? (
                                            <img
                                                src={URL.createObjectURL(formData.image)}
                                                alt="Uploaded"
                                                className="h-full w-full object-cover rounded-md"
                                            />
                                        ) : (
                                            <span className="text-gray-500 text-sm text-center">
                                                Drag & Drop or Click to Upload
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    className="w-full px-3 py-1.5 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Roll Number</label>
                                <input
                                    type="text"
                                    name="rollNumber"
                                    value={formData.rollNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter your roll number"
                                    className="w-full px-3 py-1.5 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-1.5 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    className="w-full px-3 py-1.5 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    className="w-full px-3 py-1.5 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">University Name</label>
                                <input
                                    type="text"
                                    name="universityName"
                                    value={formData.universityName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your university name"
                                    className="w-full px-3 py-1.5 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">University Email</label>
                                <input
                                    type="email"
                                    name="universityEmail"
                                    value={formData.universityEmail}
                                    onChange={handleInputChange}
                                    placeholder="Enter university email"
                                    className="w-full px-3 py-1.5 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Branch</label>
                                <input
                                    type="text"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleInputChange}
                                    placeholder="Enter your branch"
                                    className="w-full px-3 py-1.5 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Graduation Year</label>
                                <input
                                    type="number"
                                    name="graduationYear"
                                    value={formData.graduationYear}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 2025"
                                    className="w-full px-3 py-1.5 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter your address"
                                    className="w-full px-3 py-1.5 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
        </div>
    );
};

export default StudentSignup;
