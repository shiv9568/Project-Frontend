import React from "react";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md focus:outline-none transition-colors ${className}`}
    >
      {children}
    </button>
  );
};
