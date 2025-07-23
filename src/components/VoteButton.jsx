import React, { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import axios from "axios";
import { toast } from "react-toastify";

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
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const msgPayload = {
      version: "0.1.4",
      timestamp,
      space,
      type: "vote",
      payload: {
        proposal: proposalId,
        choice,
        metadata: {},
      },
    };

    const signature = await signMessageAsync({
      message: JSON.stringify(msgPayload),
    });

    console.log("Signed payload:", { address, msgPayload, signature });

    const res = await axios.post("https://hub.snapshot.org/api/msg", {
      address,
      sig: signature,
      data: msgPayload,
    });

    console.log("Vote response:", res.data);
    toast.success("Vote submitted successfully!");
  } catch (err) {
    console.error("Voting error:", err);
    toast.error("Failed to vote. " + (err?.response?.data?.error_description || err.message));
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
