import React, { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import snapshot from "@snapshot-labs/snapshot.js";
import { toast } from "react-toastify";

// Initialize Snapshot client
const snapshotClient = new snapshot.Client("https://hub.snapshot.org");

const VoteButton = ({ proposal, choiceIndex }) => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [loading, setLoading] = useState(false);

 const handleVote = async () => {
  if (!isConnected) {
    toast.error("Please connect your wallet to vote.");
    return;
  }

  if (!proposal?.id || !proposal?.space?.id) {
    toast.error("Invalid proposal data.");
    return;
  }

  setLoading(true);
  try {
    const space = proposal.space.id;
    const proposalId = proposal.id;
    const choice = choiceIndex + 1;

    const receipt = await snapshotClient.vote(
      address,
      space,
      proposalId,
      choice,
      async (message) => {
        const signature = await signMessageAsync({ message });
        console.log("Signature:", signature);

        // ✅ Return an object with BOTH signature and reason
        return {
          signature,
          reason: "", // Empty string allowed if no reason is needed
        };
      }
    );

    console.log("Vote success:", receipt);
    toast.success("Vote submitted successfully!");
  } catch (err) {
    console.error("Voting error:", err);
    toast.error("Failed to vote. " + (err?.message || "Unknown error"));
  }
  setLoading(false);
};




  return (
    <button
      onClick={handleVote}
      disabled={loading}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
    >
      {loading ? "Voting..." : "Vote"}
    </button>
  );
};

export default VoteButton;
