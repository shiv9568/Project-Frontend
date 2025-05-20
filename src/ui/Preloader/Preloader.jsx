import React, { useState, useEffect } from "react";
import "./Preloader.css";

const Preloader = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust time if needed
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading ? (
                <div className="preloader-container">
                    <div className="loader">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
            ) : (
                children
            )}
        </div>
    );
};

export default Preloader;