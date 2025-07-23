import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      

      {/* Logo and Title */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 animate-pulse-slow">
          VoteSphere
        </h1>
        <p className="text-gray-200 text-lg sm:text-xl lg:text-2xl mb-10 max-w-lg mx-auto leading-relaxed">
          Empower your voice in DAOs. Connect your wallet and shape the future with seamless proposal voting.
        </p>

        {/* Call to Action */}
        <Link
          to="/home"
          className="relative inline-block px-8 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          <span className="relative z-10">Explore Proposals</span>
          <span className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 transition-opacity"></span>
        </Link>
      </div>

      {/* Responsive Design Enhancements */}
      <div className="mt-12 text-center text-gray-400 text-sm sm:text-base">
        <p>Trusted by thousands of DAO members worldwide</p>
        <div className="flex justify-center gap-4 mt-4">
          <span className="px-4 py-2 bg-gray-800 rounded-lg">Secure</span>
          <span className="px-4 py-2 bg-gray-800 rounded-lg">Transparent</span>
          <span className="px-4 py-2 bg-gray-800 rounded-lg">Decentralized</span>
        </div>
      </div>
    </div>
  );
};



export default Landing;