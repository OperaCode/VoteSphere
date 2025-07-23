
import React from "react";

const ProposalCard = ({ proposal }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-4 hover:scale-105 transition transform">
      <h3 className="text-xl font-bold text-cyan-400 mb-2">{proposal.title}</h3>
      <p className="text-gray-300 mb-4">{proposal.body.slice(0, 100)}...</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {proposal.choices.slice(0,3).map((choice, i) => (
          <span key={i} className="bg-cyan-600 px-2 py-1 rounded text-sm">
            {choice}
          </span>
        ))}
      </div>
      <button className="bg-cyan-500 text-black px-4 py-2 rounded hover:bg-cyan-400 transition">
        View & Vote
      </button>
    </div>
  );
};

export default ProposalCard;
