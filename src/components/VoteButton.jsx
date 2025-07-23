import React, { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import snapshot from "@snapshot-labs/snapshot.js"; // default import for v0.7.x
import { toast } from "react-toastify";

// ✅ Initialize Snapshot client with hub endpoint
const snapshotClient = new snapshot.Client712("https://hub.snapshot.org");

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
      const choice = choiceIndex + 1; // Snapshot choices are 1-indexed

      // use snapshot.js vote method
      const receipt = await snapshotClient.vote(
        address,
        space,
        proposalId,
        choice,
        async (message) => {
          const sig = await signMessageAsync({ message });
          return { sig, data: message };
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
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
    >
      {loading ? "Voting..." : "Vote"}
    </button>
  );
};

export default VoteButton;
