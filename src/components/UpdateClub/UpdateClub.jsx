import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { getDownloadURL, ref, getStorage, uploadBytesResumable } from "firebase/storage";
import app from "../../firebase";
import { createClub ,getClub} from "../api/api";

const UpdateClub = ({ selectedClubId, setOpenUpdateClub }) => {
    const [formData, setFormData] = useState({
        clubName: "",
        clubDescription: "",
        contactEmail: "",
        headEmail: "",
        clubLogo: null,
    });

    const [showProgress, setShowProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [tempImage, setTempImage] = useState(null); // For the selected image
    const [uploadFailed, setUploadFailed] = useState(false); // Upload failed status

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setTempImage(fileURL); // Show the image immediately

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
                    setFormData({ ...formData, clubLogo: downloadURL });
                    setImageUrl(downloadURL);
                    setShowProgress(false);
                    setUploadFailed(false); // Reset failed status
                });
            }
        );
    };

    const handleClose = () => {
        setOpenUpdateClub(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted successfully!");
        handleClose();
    };
    const fetchClubData = async ()=>{
        const response = await getClub(selectedClubId);
        setFormData(response.data);
    }
    useEffect(()=>{
        fetchClubData();
    },[]);
    const handleUpdateClub = async () => {
        const response = await createClub(formData);
        console.log(response.data);
        if (response.status) {
            alert("Club Created Successfully");
            handleClose();
        }
    };

    return (
        <section className="flex items-center justify-center">
            {selectedClubId && (
                <Dialog
                    open={selectedClubId}
                    onClose={handleClose}
                    maxWidth="xl"
                    className="fixed inset-0 flex bg-blue-200 items-center justify-center bg-opacity-50 backdrop-blur-sm z-50"
                >
                    <div className="bg-white md:w-[900px] rounded-lg shadow-2xl w-full max-w-5xl p-4 sm:p-6 relative animate-[fadeIn_0.3s_ease-out]">
                        <button
                            onClick={handleClose}
                            className="absolute top-0 right-2 text-gray-700 hover:text-gray-900 text-2xl font-bold"
                        >
                            &times;
                        </button>

                        <div className="flex flex-col-reverse md:flex-row">
                            {/* Club Details Section */}
                            <div className="flex-1 p-5 max-h-[500px] overflow-y-auto scrollbar-hide w-full">
                                <h4 className="text-3xl font-bold text-[#04101b] mb-6 text-center">Update Club</h4>
                                <div className="scrollbar-hide">
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
                                        <textarea
                                            name="clubDescription"
                                            value={formData.clubDescription}
                                            onChange={handleChange}
                                            placeholder="Describe the club"
                                            className="w-full p-2 border rounded-md bg-gray-100 text-sm min-h-[150px]"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        onClick={handleUpdateClub}
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
                                ) : tempImage ? (
                                    <img
                                        src={tempImage}
                                        alt="Club Logo"
                                        className="w-full h-full object-cover rounded-lg bg-red-500 shadow-lg"
                                    />
                                ) : (
                                    <div>
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

export default UpdateClub;
