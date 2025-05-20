import React, { useState } from "react";
import { SignUpUser } from "../api/api";

const SignupAuthority = () => {
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      setImageFile(file);
    }
  };

  const validateForm = () => {
    // if (!name || !email || !password || !confirmPassword) {
    //   alert("All fields are required.");
    //   return false;
    // }
    // if (password !== confirmPassword) {
    //   alert("Passwords do not match.");
    //   return false;
    // }
    // if (!imageFile) {
    //   alert("Please upload a profile picture.");
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("picture", imageFile);

    try {
      const response = await SignUpUser(data);
      if (response?.status) {
        alert(response.message);
        // Optionally reset the form
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setImageFile(null);
      } else {
        alert(response?.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Failed to sign up. Please try again later.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-yellow-50 overflow-hidden ">
      {/* Form Container */}
      <div className="p-10 rounded-2xl w-full max-w-4xl bg-white shadow-2xl">
        {/* Title & Quote */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-blue-800 mb-2">
            "Start your journey with us!"
          </h2>
          <p className="text-base text-gray-600">
            Sign up to join the best community for university students.
          </p>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Left Column */}
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700">Picture</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md h-32 flex items-center justify-center hover:border-blue-400 transition duration-300 overflow-hidden">
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer flex items-center justify-center w-full h-full"
                >
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile)}
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
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 rounded-md text-white font-semibold shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-300"
              >
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupAuthority;
