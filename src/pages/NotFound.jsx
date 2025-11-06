// src/pages/NotFound.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const NotFound = () => {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Go Back to Homepage
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default NotFound;
