import React from "react";

const ProposalDetail = ({ proposal }) => {
  return (
    <div className="mt-6 border rounded p-4 bg-gray-50">
      <h2 className="text-xl font-bold mb-2">{proposal.title}</h2>
      <p className="mb-2">{proposal.body}</p>
      <p className="mb-4 text-sm text-gray-500">
        State: {proposal.state} | Start: {new Date(proposal.start * 1000).toLocaleString()} | End: {new Date(proposal.end * 1000).toLocaleString()}
      </p>

      <h3 className="font-semibold mb-2">Choices:</h3>
      <ul className="space-y-2">
        {proposal.choices.map((choice, index) => (
          <li key={index} className="border p-2 rounded">
            {choice}
            {/* <VoteButton proposalId={proposal.id} choiceIndex={index + 1} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProposalDetail;
