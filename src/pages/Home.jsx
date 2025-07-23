import React from "react";
import ProposalList from "../components/ProposalList";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-float absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20 top-20 left-10"></div>
        <div className="animate-float-slow absolute w-3 h-3 bg-blue-500 rounded-full opacity-20 bottom-30 right-16"></div>
        <div className="animate-float-fast absolute w-1 h-1 bg-purple-400 rounded-full opacity-20 top-60 left-60"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center mb-12 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          VoteSphere
        </h1>
        <nav className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            <li>
              <ConnectButton 
               
              />
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-semibold"
              >
                Exit App
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Proposals Section */}
      <section className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-100">
          Latest Proposals
        </h2>
        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-2 shadow-lg">
          <ProposalList />
        </div>
      </section>

      {/* Footer Info */}
      <footer className="relative z-10 mt-12 text-center text-gray-400 text-sm sm:text-base">
        <p>Join thousands shaping the future of DAOs with VoteSphere</p>
      </footer>
    </div>
  );
};

// Inline styles for animations
const style = document.createElement("style");
style.textContent = `
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  .animate-float-slow {
    animation: float 12s ease-in-out infinite;
  }
  .animate-float-fast {
    animation: float 5s ease-in-out infinite;
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
`;
document.head.appendChild(style);

export default Home;